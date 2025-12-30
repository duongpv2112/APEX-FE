import { computed, unref, type MaybeRef } from "vue";
import type { HomePostsDto, PostsByCategoryDto } from "~/types/posts/posts.server";
import type { PostsListItem } from "~/types/posts/posts.ui";

type UsePostsByCategoryOptions = {
  /**
   * Cho phép bật/tắt fetch tuỳ theo context page.
   * (Giữ lại để linh hoạt trong tương lai.)
   */
  enabled?: MaybeRef<boolean>;
};

/**
 * Lấy danh sách bài viết theo loại.
 * - Lấy từ backend qua Nitro proxy `/api/posts/category/{slug}`.
 */
export const usePostsByCategory = (
  categorySlug: MaybeRef<string>,
  options: UsePostsByCategoryOptions = {}
) => {
  const categorySlugRef = computed(() => unref(categorySlug));
  const enabledRef = computed(() => unref(options.enabled) !== false);

  const asyncKey = computed(
    () => `apex-posts-category:${categorySlugRef.value || ""}`
  );

  const { data, pending, error, refresh } = useAsyncData<PostsListItem[]>(
    asyncKey,
    async () => {
      const slug = categorySlugRef.value?.trim();
      if (!slug) return [];
      if (!enabledRef.value) return [];

      const res = await $fetch<PostsByCategoryDto>(
        `/api/posts/category/${encodeURIComponent(slug)}`
      );

      return (res?.items ?? []).map(mapHomePostToListItem);
    },
    {
      watch: [categorySlugRef, enabledRef],
    }
  );

  const items = computed(() => data.value ?? []);

  return {
    items,
    pending,
    error,
    refresh,
  };
};

const mapHomePostToListItem = (dto: HomePostsDto): PostsListItem => {
  return {
    slug: dto.slug ?? "",
    title: dto.title ?? "",
    desc: dto.excerpt ?? "",
    author: dto.author?.fullName ?? null,
    image: dto.thumbnail ?? "",
    publishedAt: dto.publishedAt ?? undefined,
  };
};
