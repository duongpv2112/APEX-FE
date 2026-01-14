import { computed, unref, type MaybeRef } from "vue";
import type { PostsDetailDto } from "~/types/posts/posts.server";
import type { PostsDetail } from "~/types/posts/posts.ui";

type UsePostsDetailOptions = {
  /**
   * Cho phép bật/tắt fetch (tránh gọi API khi route `/posts/[slug]` đang là category page).
   */
  enabled?: MaybeRef<boolean>;
};

export const usePostsDetail = (slug: MaybeRef<string>, options: UsePostsDetailOptions = {}) => {
  const slugRef = computed(() => unref(slug));
  const enabledRef = computed(() => unref(options.enabled) !== false);

  // Key phải phụ thuộc vào slug để tránh Nuxt cache sai giữa các bài.
  // Nếu dùng key cố định, lần đầu fetch ra `null` có thể bị cache và các lần sau không fetch lại.
  const asyncKey = computed(() => `apex-posts-detail:${slugRef.value || ""}`);

  const { data, pending, error, refresh } = useAsyncData<PostsDetail | null>(
    asyncKey,
    async () => {
      const s = slugRef.value?.trim();
      if (!s) return null;
      if (!enabledRef.value) return null;

      const dto = await $fetch<PostsDetailDto>(
        `/api/posts/slug/${encodeURIComponent(s)}`
      );

      return mapClientPostDetailToNewsDetail(dto);
    },
    {
      watch: [slugRef, enabledRef],
    }
  );

  const newsDetail = computed(() => data.value);

  // Very small html -> text helper, đủ dùng để hiển thị paragraph text.
  // (Khi backend có plainContent chuẩn, ta ưu tiên plainContent và không cần bước này.)
  const htmlToText = (html: string) => {
    return html
      .replace(/<\/?p[^>]*>/gi, "\n\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/<[^>]+>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  /**
   * Map DTO từ backend (client post detail) sang model đang dùng cho UI news detail.
   * - author: tạm thời cố định theo yêu cầu.
   * - content: ưu tiên plainContent, fallback richContent.
   */
  const mapClientPostDetailToNewsDetail = (
    dto: PostsDetailDto
  ): PostsDetail => {
    const rawContent = dto.contentHtml ?? "";
    // const content = htmlToText(rawContent);
    const content = rawContent;
    return {
      title: dto.title ?? "",
      author: dto.author?.fullName ?? null,
      authorAvatar: dto.author?.profilePhoto ?? null,
      desc: dto.excerpt ?? undefined,
      content,
      publishedAt: dto.publishedAt ?? "",
      readingTime: dto.timeToRead ? `${dto.timeToRead} phút đọc` : undefined,
      tags: undefined,
      categorySlug: dto.category?.slug ?? undefined,
      coverImage: dto.coverImage ?? dto.thumbnail ?? null,
      viewCount: dto.viewCount ?? 0,
      likeCount: dto.likeCount ?? 0,
      commentCount: dto.commentCount ?? 0,
    };
  };

  return {
    newsDetail,
    pending,
    error,
    refresh,
  };
};
