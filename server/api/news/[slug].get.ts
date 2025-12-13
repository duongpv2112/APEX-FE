import { defineEventHandler, getRouterParam, createError } from "h3";
import { mockNewsList } from "~~/shared/newsMock";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing slug parameter",
    });
  }

  const item = mockNewsList.find((news) => news.slug === slug);

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "News not found" });
  }

  return item;
});
