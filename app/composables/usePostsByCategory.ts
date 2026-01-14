import { computed, unref, type MaybeRef } from "vue";
import type { HomePostsDto, PostsByCategoryDto } from "~/types/posts/posts.server";
import type { PostsListItem } from "~/types/posts/posts.ui";

type UsePostsByCategoryOptions = {
  /**
   * Cho phép bật/tắt fetch tuỳ theo context page.
   * (Giữ lại để linh hoạt trong tương lai.)
   */
  enabled?: MaybeRef<boolean>;

  /**
   * Giới hạn số lượng bài viết (forward xuống backend qua query string).
   * Nếu không truyền, backend sẽ dùng mặc định của nó.
   */
  limit?: MaybeRef<number | undefined>;
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
  const limitRef = computed(() => unref(options.limit));

  const asyncKey = computed(() => {
    const slug = categorySlugRef.value || "";
    const limit = limitRef.value;
    return `apex-posts-category:${slug}:limit=${limit ?? "default"}`;
  });

  type UsePostsByCategoryData = {
    category: { name: string; slug: string } | null;
    items: PostsListItem[];
  };

  const { data, pending, error, refresh } = useAsyncData<UsePostsByCategoryData>(
    asyncKey,
    async () => {
      const slug = categorySlugRef.value?.trim();
      if (!slug) return { category: null, items: [] };
      if (!enabledRef.value) return { category: null, items: [] };

      const limit = limitRef.value;
      const search = new URLSearchParams();
      if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
        search.set("limit", String(limit));
      }

      const res = await $fetch<PostsByCategoryDto>(
        `/api/posts/category/${encodeURIComponent(slug)}${search.toString() ? `?${search.toString()}` : ""}`
      );

      return {
        category: res?.category ? { name: res.category.name, slug: res.category.slug } : null,
        items: (res?.items ?? []).map(mapHomePostToListItem),
      };
    },
    {
      watch: [categorySlugRef, enabledRef, limitRef],
    }
  );

  const items = computed(() => data.value?.items ?? []);
  const category = computed(() => data.value?.category ?? null);

  return {
    items,
    category,
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
    authorAvatar: dto.author?.profilePhoto ?? null,
    categories: (dto.categories ?? []).map((c) => ({
      name: c.name,
      slug: c.slug,
    })),
    image: dto.thumbnail ?? "",
    publishedAt: dto.publishedAt ?? undefined,
  };
};
