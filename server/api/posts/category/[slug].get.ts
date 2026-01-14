import { createError, defineEventHandler, getQuery, getRouterParam } from "h3";
import { $fetch } from "ofetch";

/**
 * Nitro proxy (BFF) cho backend: GET https://localhost:44389/api/public/posts/category/{slug}
 * - Client sẽ gọi: GET /api/posts/category/{slug} (tránh CORS)
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing category slug" });
  }

  const query = getQuery(event);
  const limit = query.limit;

  const config = useRuntimeConfig();
  const apiBaseUrl = (config.apiBaseUrl as string) || "";
  const search = new URLSearchParams();
  if (limit !== undefined && limit !== null && String(limit).trim() !== "") {
    search.set("limit", String(limit));
  }

  const url = `${apiBaseUrl}/api/public/posts/category/${encodeURIComponent(slug)}${search.toString() ? `?${search.toString()}` : ""}`;

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
