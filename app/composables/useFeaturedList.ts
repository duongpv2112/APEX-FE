import { computed } from 'vue'

export interface ApexFeaturedItem {
  title: string
  author: string
}

function getMockFeaturedList(): ApexFeaturedItem[] {
  return [
    {
      title: 'Hàng loạt giám đốc cao cấp rời Apple qua công ty khác',
      author: 'cuhiep',
    },
    {
      title: 'TasteAtlas: Phở và Bún Bò VN trong top 100 món ăn ngon nhất thế giới',
      author: 'Nam Air',
    },
    {
      title:
        '[QC] MINI 3-Cửa và MINI Countryman thuần điện hoàn toàn mới chính thức ra mắt tại Việt Nam',
      author: 'TTKM',
    },
    {
      title: 'Mời xem trailer Avatar 3: Fire and Ash - ra rạp 19/12',
      author: 'Nam Air',
    },
    {
      title: 'Mời bình chọn kênh nội dung công nghệ yêu thích',
      author: 'cuhiep',
    },
    {
      title: 'Máy giặt sấy 2 trong 1 và riêng lẻ cái nào tốt hơn?',
      author: 'Bảo Long.',
    },
  ]
}

/**
 * Composable cung cấp dữ liệu cho khối "Bài nổi bật" (featuredList).
 * - SSR-safe (useAsyncData)
 * - Hiện tại dùng mock local; sau này chỉ cần thay fetcher.
 */
export const useFeaturedList = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexFeaturedItem[]>(
    'apex-featured-list',
    async () => {
      // Phase 1: mock local
      // Phase 2: thay bằng `$fetch('/api/featured')`
      return getMockFeaturedList()
    }
  )

  const featuredList = computed<ApexFeaturedItem[]>(() => data.value ?? [])

  return { featuredList, pending, error, refresh }
}
