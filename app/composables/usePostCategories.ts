import { computed } from "vue";
import type { PostsCategory } from "~/types/posts/posts.ui";
import type { PostsCategoryDto } from "~/types/posts/posts.server";

/**
 * Danh sách loại bài viết.
 * - Lấy từ backend qua Nitro proxy `/api/posts/categories`.
 */
export const usePostCategories = () => {
  const { data, pending, error, refresh } = useAsyncData<PostsCategory[]>(
    "apex-posts-categories",
    async () => {
      const res = await $fetch<PostsCategoryDto[]>("/api/posts/categories");

      return (res ?? []).map((x) => ({
        slug: x.slug,
        label: x.title,
        description: x.description ?? undefined,
      }));
    }
  );

  const categories = computed(() => data.value ?? []);

  const getBySlug = (slug: string | null | undefined) => {
    if (!slug) return undefined;
    return categories.value.find((c) => c.slug === slug);
  };

  const isCategorySlug = (slug: string | null | undefined) => {
    return Boolean(getBySlug(slug));
  };

  return {
    categories,
    pending,
    error,
    refresh,
    getBySlug,
    isCategorySlug,
  };
};
