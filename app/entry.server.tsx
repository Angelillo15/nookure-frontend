import { ServerRouter, type EntryContext } from 'react-router';
import { isbot } from 'isbot';
import pkg from 'react-dom/server';
import { p } from 'framer-motion/client';
import MemoryWritable from './api/memory-writable';

const ABORT_DELAY = 5000;

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    entryContext: EntryContext
) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);
    const { renderToReadableStream } = pkg;
    
    if (renderToReadableStream === undefined) {
        const { renderToPipeableStream } = pkg;
    
        const { pipe } = renderToPipeableStream(
            <ServerRouter context={entryContext} url={request.url} />,
            {
                onShellError(error: unknown) {
                    console.error(error);
                    responseStatusCode = 500;
                    responseHeaders.set('Content-Type', 'text/plain');
                    return new Response('Internal Server Error', {
                        status: responseStatusCode,
                        headers: Object.fromEntries(responseHeaders),
                    });
                },
                onError(error: unknown) {
                    console.error(error);
                    responseStatusCode = 500;
                },
            }
        );
    
        responseHeaders.set('Content-Type', 'text/html');
        let memory = new MemoryWritable();
        await pipe(memory);

        return new Response(memory.getMemory(), {
            headers: responseHeaders,
            status: responseStatusCode,
        });
    }

    const body = await renderToReadableStream(<ServerRouter context={entryContext} url={request.url} />, {
        signal: controller.signal,
        onError(error: unknown) {
            if (!controller.signal.aborted) {
                // Log streaming rendering errors from inside the shell
                console.error(error);
            }
            responseStatusCode = 500;
        },
    });

    body.allReady.then(() => clearTimeout(timeoutId));

    if (isbot(request.headers.get('user-agent') || '')) {
        await body.allReady;
    }

    responseHeaders.set('Content-Type', 'text/html');
    return new Response(body, {
        headers: responseHeaders,
        status: responseStatusCode,
    });
}
