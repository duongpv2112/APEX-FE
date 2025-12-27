import { computed } from "vue";
import { mockQuickList } from "~~/shared/quickMock";

export interface ApexQuickItem {
  title: string;
  image?: string;
}

function getMockQuickList(): ApexQuickItem[] {
  if (!mockQuickList?.length) return [];

  // Map (để sau này thay DTO -> UI model vẫn giữ pattern)
  return mockQuickList.map((item) => ({
    title: item.title,
    image: item.image,
  }));
}

/**
 * Composable cung cấp dữ liệu cho khối "Xem nhanh" (quickList).
 * - SSR-safe (useAsyncData)
 * - Hiện tại dùng mock local; sau này chỉ cần thay fetcher.
 */
export const useQuickList = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexQuickItem[]>(
    "apex-quick-list",
    async () => {
      // Phase 1: mock local
      // Phase 2: thay bằng `$fetch('/api/quick')`
      return getMockQuickList();
    }
  );

  const quickList = computed<ApexQuickItem[]>(() => data.value ?? []);

  return { quickList, pending, error, refresh };
};
