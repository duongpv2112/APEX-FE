import { computed } from "vue";
import { mockCompactList } from "~~/shared/compactMock";

export interface ApexCompactItem {
  image: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
}

function getMockCompactList(): ApexCompactItem[] {
  // Dùng nguồn mock dùng riêng cho compact list
  if (!mockCompactList?.length) return [];

  // Map (để sau này thay DTO -> UI model vẫn giữ pattern)
  return mockCompactList.map((item) => ({
    image: item.image,
    title: item.title,
    excerpt: item.excerpt,
    author: item.author,
    authorAvatar: item.authorAvatar,
  }));
}

/**
 * Composable cung cấp dữ liệu cho khối "Tin mới nhất" (compactList).
 * - SSR-safe (dùng useAsyncData)
 * - Hiện tại dùng mock data; sau này chỉ cần thay fetcher sang `$fetch()`.
 */
export const useCompactList = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexCompactItem[]>(
    "apex-compact-list",
    async () => {
      // Phase 1: mock local
      // Phase 2: thay bằng `$fetch('/api/compact')` và map DTO -> UI model
      return getMockCompactList();
    }
  );

  const compactList = computed<ApexCompactItem[]>(() => data.value ?? []);

  return {
    compactList,
    pending,
    error,
    refresh,
  };
};
