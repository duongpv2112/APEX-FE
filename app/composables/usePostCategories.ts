import type { PostsCategory } from "~/types/posts/posts.ui";

/**
 * Danh sách loại bài viết (tạm thời fix cứng theo yêu cầu).
 *
 * NOTE: Khi backend có API categories, ta thay thế phần này bằng fetch + cache.
 */
export const usePostCategories = () => {
  const categories: PostsCategory[] = [
    {
      slug: "tin-cap-nhat",
      label: "Tin cập nhật",
      description: "Các cập nhật mới nhất từ APEX MMA.",
    },
    {
      slug: "su-kien",
      label: "Sự kiện",
      description: "Lịch, recap và thông tin các sự kiện liên quan.",
    },
    {
      slug: "ky-thuat",
      label: "Kỹ thuật",
      description: "Bài viết chia sẻ kỹ thuật, kinh nghiệm tập luyện.",
    },
    {
      slug: "dinh-duong",
      label: "Dinh dưỡng",
      description: "Kiến thức dinh dưỡng hỗ trợ tập luyện và hồi phục.",
    },
  ];

  const getBySlug = (slug: string | null | undefined) => {
    if (!slug) return undefined;
    return categories.find((c) => c.slug === slug);
  };

  const isCategorySlug = (slug: string | null | undefined) => {
    return Boolean(getBySlug(slug));
  };

  /**
   * Fake category cho 1 bài viết dựa theo post slug.
   * - Mục tiêu: mô phỏng sẵn field `categorySlug` như backend sẽ trả về.
   * - Khi có API thật, bỏ hàm này và đọc trực tiếp từ DTO.
   */
  const getFakeCategorySlugForPostSlug = (
    postSlug: string | null | undefined
  ): string | undefined => {
    const s = (postSlug ?? "").trim();
    if (!s) return undefined;

    // Hash đơn giản dựa theo charCode để phân phối đều vào các category.
    let sum = 0;
    for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i);
    const idx = sum % categories.length;
    return categories[idx]?.slug;
  };

  return {
    categories,
    getBySlug,
    isCategorySlug,
    getFakeCategorySlugForPostSlug,
  };
};
