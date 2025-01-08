import { ServerRouter, type EntryContext } from 'react-router';
import { isbot } from 'isbot';

const ABORT_DELAY = 5000;

const getDevelopment = () => {
    if (typeof window !== 'undefined') {
        return import.meta.env.DEV;
    } else {
        return process.env.NODE_ENV === 'development';
    }
};

const isWebEnvironment = typeof window !== 'undefined' || getDevelopment();

let server: (request: Request, responseStatusCode: number, responseHeaders: Headers, entryContext: EntryContext) => Promise<Response>;

if (isWebEnvironment) {
    server = async function handleRequest(
        request: Request,
        responseStatusCode: number,
        responseHeaders: Headers,
        entryContext: EntryContext
    ) {
        const { renderToReadableStream } = await import('react-dom/server');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);

        let body = await renderToReadableStream(<ServerRouter context={entryContext} url={request.url} />, {
            signal: controller.signal,
            onError(error: unknown) {
                if (!controller.signal.aborted) {
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
    };
} else {
    server = async function handleRequest(
        request: Request,
        responseStatusCode: number,
        responseHeaders: Headers,
        entryContext: EntryContext
    ) {
        const { default: handleRequestNode } = await import('@/entry.server.node');
        return handleRequestNode(request, responseStatusCode, responseHeaders, entryContext, {}) as Promise<Response>;
    };
}

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    entryContext: EntryContext
) {
    return server(request, responseStatusCode, responseHeaders, entryContext);
}