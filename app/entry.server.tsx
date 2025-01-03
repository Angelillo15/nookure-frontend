/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext } from "@react-router/cloudflare";
import { ServerRouter, type EntryContext } from "react-router";import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext,
) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);
  
    const body = await renderToReadableStream(
      <ServerRouter
        context={entryContext}
        url={request.url}
      />,
      {
        signal: controller.signal,
        onError(error: unknown) {
          if (!controller.signal.aborted) {
            // Log streaming rendering errors from inside the shell
            console.error(error);
          }
          responseStatusCode = 500;
        },
      }
    );
  
    body.allReady.then(() => clearTimeout(timeoutId));
  
    if (isbot(request.headers.get("user-agent") || "")) {
      await body.allReady;
    }
  
    responseHeaders.set("Content-Type", "text/html");
    return new Response(body, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
}