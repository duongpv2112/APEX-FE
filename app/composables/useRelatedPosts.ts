import { computed, unref, type MaybeRef } from "vue";
import type { RelatedPostsDto } from "~/types/posts/posts.server";
import type { PostsListItem } from "~/types/posts/posts.ui";
import { mapHomePostToListItem } from "~/utils/postsMappers";

type UseRelatedPostsOptions = {
  enabled?: MaybeRef<boolean>;
  limit?: MaybeRef<number | undefined>;
};

/**
 * Lấy danh sách bài viết liên quan theo postId.
 * - SSR-safe (useAsyncData)
 * - Client gọi qua Nitro proxy `/api/posts/related/:id` để tránh CORS.
 */
export const useRelatedPosts = (
  postId: MaybeRef<string | null | undefined>,
  options: UseRelatedPostsOptions = {}
) => {
  const postIdRef = computed(() => unref(postId));
  const enabledRef = computed(() => unref(options.enabled) !== false);
  const limitRef = computed(() => unref(options.limit));

  const asyncKey = computed(() => {
    const id = postIdRef.value || "";
    const limit = limitRef.value;
    return `apex-posts-related:${id}:limit=${limit ?? "default"}`;
  });

  const { data, pending, error, refresh } = useAsyncData<PostsListItem[]>(
    asyncKey,
    async () => {
      const id = postIdRef.value?.trim();
      if (!id) return [];
      if (!enabledRef.value) return [];

      const limit = limitRef.value;
      const search = new URLSearchParams();
      if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
        search.set("limit", String(limit));
      }

      const res = await $fetch<RelatedPostsDto>(
        `/api/posts/related/${encodeURIComponent(id)}${search.toString() ? `?${search.toString()}` : ""}`
      );

      return (res ?? []).map(mapHomePostToListItem);
    },
    {
      watch: [postIdRef, enabledRef, limitRef],
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

