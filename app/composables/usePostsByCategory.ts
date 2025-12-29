import { computed, unref, type MaybeRef } from "vue";
import type { HomePostsDto } from "~/types/posts/posts.server";
import type { PostsListItem } from "~/types/posts/posts.ui";
import { usePostCategories } from "~/composables/usePostCategories";

type UsePostsByCategoryOptions = {
  /**
   * Cho phép bật/tắt fetch tuỳ theo context page.
   * (Giữ lại để linh hoạt trong tương lai.)
   */
  enabled?: MaybeRef<boolean>;
};

/**
 * Lấy danh sách bài viết theo loại.
 * Hiện tại CHƯA có API thật => tạm thời dùng endpoint home để có data hiển thị.
 *
 * TODO: Khi backend có API, thay thế fetcher bằng:
 * - GET `${apiBaseUrl}/api/public/posts?categorySlug=${categorySlug}&skip=0&take=...`
 * hoặc endpoint tương đương mà bạn cung cấp.
 */
export const usePostsByCategory = (
  categorySlug: MaybeRef<string>,
  options: UsePostsByCategoryOptions = {}
) => {
  const categorySlugRef = computed(() => unref(categorySlug));
  const enabledRef = computed(() => unref(options.enabled) !== false);

  const { isCategorySlug, getFakeCategorySlugForPostSlug } = usePostCategories();

  const asyncKey = computed(
    () => `apex-posts-category:${categorySlugRef.value || ""}`
  );

  const { data, pending, error, refresh } = useAsyncData<PostsListItem[]>(
    asyncKey,
    async () => {
      const slug = categorySlugRef.value?.trim();
      if (!slug) return [];
      if (!enabledRef.value) return [];
      if (!isCategorySlug(slug)) return [];

      // Tạm thời reuse endpoint home để có list hiển thị.
      const res = await $fetch<HomePostsDto[]>("/api/posts/home/posts", {
        query: { skip: 0, take: 12 },
      });

      // Fake categorySlug và lọc theo category page.
      const items = (res ?? [])
        .map((dto) => mapHomePostToListItem(dto, getFakeCategorySlugForPostSlug))
        .filter((x) => x.categorySlug === slug);

      return items;
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

const mapHomePostToListItem = (
  dto: HomePostsDto,
  getFakeCategorySlugForPostSlug: (postSlug: string | null | undefined) =>
    | string
    | undefined
): PostsListItem => {
  return {
    slug: dto.slug ?? "",
    title: dto.title ?? "",
    desc: dto.excerpt ?? "",
    author: dto.author?.fullName ?? null,
    image: dto.thumbnail ?? "",
    publishedAt: dto.publishedAt ?? undefined,
    categorySlug: getFakeCategorySlugForPostSlug(dto.slug),
  };
};
