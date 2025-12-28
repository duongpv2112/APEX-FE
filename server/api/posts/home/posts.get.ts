import { createError, defineEventHandler, getQuery } from "h3";
import { $fetch } from "ofetch";

/**
 * Nitro proxy (BFF) cho backend: GET https://localhost:44389/api/client/posts?skip=0&take=4
 * - Client sẽ gọi: GET /api/client/posts?skip=0&take=4 (tránh CORS)
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const skip = typeof query.skip === "string" ? query.skip : "0";
  const take = typeof query.take === "string" ? query.take : "4";

  const apiBaseUrl = (config.apiBaseUrl as string) || "";
  const url = `${apiBaseUrl}/api/public/posts/home`;

  // Dev-only: backend localhost thường dùng cert self-signed -> Node sẽ fail TLS.
  // Chỉ bypass khi chạy dev + gọi tới localhost.
  const isDev = process.env.NODE_ENV !== "production";
  const shouldBypassTls =
    isDev && /^https:\/\/localhost(?::\d+)?/i.test(apiBaseUrl);

  // Dùng $fetch (Nuxt-native).
  // Dev-only: nếu backend localhost dùng cert self-signed, Node sẽ fail TLS.
  // Ở đây bypass theo phạm vi *từng lần gọi* bằng env var, rồi restore lại ngay sau đó.
  // Lưu ý: đây vẫn là cấu hình cấp process, nhưng rủi ro chấp nhận được trong môi trường dev.
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
        if (prevTls === undefined)
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
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
