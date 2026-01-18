import type { HomePostsDto } from "~/types/posts/posts.server";
import type { PostsListItem } from "~/types/posts/posts.ui";

/**
 * Map item dạng post list (HomePostsDto) sang model UI PostsListItem.
 * Dùng chung cho list theo category / related / các list khác.
 */
export const mapHomePostToListItem = (dto: HomePostsDto): PostsListItem => {
  return {
    slug: dto.slug ?? "",
    title: dto.title ?? "",
    desc: dto.excerpt ?? "",
    author: dto.author?.fullName ?? null,
    authorAvatar: dto.author?.profilePhoto ?? null,
    categories: (dto.categories ?? []).map((c) => ({
      name: c.name,
      slug: c.slug,
    })),
    image: dto.thumbnail ?? "",
    publishedAt: dto.publishedAt ?? undefined,
  };
};

