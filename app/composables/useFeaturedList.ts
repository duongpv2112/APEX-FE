import { computed } from "vue";
import { mockFeaturedList } from "~~/shared/featuredMock";

export interface ApexFeaturedItem {
  title: string;
  author: string;
}

function getMockFeaturedList(): ApexFeaturedItem[] {
  if (!mockFeaturedList?.length) return [];

  return mockFeaturedList.map((item) => ({
    title: item.title,
    author: item.author,
  }));
}

/**
 * Composable cung cấp dữ liệu cho khối "Bài nổi bật" (featuredList).
 * - SSR-safe (useAsyncData)
 * - Hiện tại dùng mock local; sau này chỉ cần thay fetcher.
 */
export const useFeaturedList = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexFeaturedItem[]>(
    "apex-featured-list",
    async () => {
      // Phase 1: mock local
      // Phase 2: thay bằng `$fetch('/api/featured')`
      return getMockFeaturedList();
    }
  );

  const featuredList = computed<ApexFeaturedItem[]>(() => data.value ?? []);

  return { featuredList, pending, error, refresh };
};
