import { createError, defineEventHandler } from "h3";
import { $fetch } from "ofetch";

/**
 * Nitro proxy (BFF) cho backend: GET https://localhost:44389/api/public/posts/categories
 * - Client sẽ gọi: GET /api/posts/categories (tránh CORS)
 */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiBaseUrl = (config.apiBaseUrl as string) || "";
  const url = `${apiBaseUrl}/api/public/posts/categories`;

  // Dev-only: backend localhost thường dùng cert self-signed -> Node sẽ fail TLS.
  const isDev = process.env.NODE_ENV !== "production";
  const shouldBypassTls = isDev && /^https:\/\/localhost(?::\d+)?/i.test(apiBaseUrl);

  const prevTls = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  if (shouldBypassTls) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const res = await (async () => {
    try {
      return await $fetch.raw(url, {
        method: "GET",
        ignoreResponseError: true,
      });
    } finally {
      if (shouldBypassTls) {
        if (prevTls === undefined) delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
        else process.env.NODE_TLS_REJECT_UNAUTHORIZED = prevTls;
      }
    }
  })();

  const statusCode = res.status ?? 500;
  const json: any = (res as any)._data ?? null;

  if (statusCode >= 400) {
    throw createError({
      statusCode,
      statusMessage:
        (json && (json.message || json.title)) || `Backend error ${statusCode}`,
      data: json,
    });
  }

  return json;
});

