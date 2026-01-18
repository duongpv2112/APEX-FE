import { createError, defineEventHandler, getQuery, getRouterParam } from "h3";
import { $fetch } from "ofetch";

/**
 * Nitro proxy (BFF) cho backend related posts:
 * GET https://localhost:44389/api/public/posts/{postId}/related?limit=3
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing post id" });
  }

  const query = getQuery(event);
  const limitRaw = typeof query.limit === "string" ? query.limit : undefined;
  const limit = limitRaw ? Number(limitRaw) : undefined;

  const config = useRuntimeConfig();
  const apiBaseUrl = (config.apiBaseUrl as string) || "";
  const url = `${apiBaseUrl}/api/public/posts/${encodeURIComponent(id)}/related`;

  const search = new URLSearchParams();
  if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
    search.set("limit", String(limit));
  }
  const finalUrl = `${url}${search.toString() ? `?${search.toString()}` : ""}`;

  const isDev = process.env.NODE_ENV !== "production";
  const shouldBypassTls = isDev && /^https:\/\/localhost(?::\d+)?/i.test(apiBaseUrl);

  const prevTls = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  if (shouldBypassTls) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const res = await (async () => {
    try {
      return await $fetch.raw(finalUrl, {
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

