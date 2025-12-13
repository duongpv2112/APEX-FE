import { computed } from 'vue'

export interface ApexQuickItem {
  title: string
  image?: string
}

function getMockQuickList(): ApexQuickItem[] {
  return [
    {
      title: 'Razer Joro là một chiếc bàn phím di động ngon, xài kiểu gì cũng được',
      image: 'https://i.imgur.com/1Q9Z1Zm.jpg',
    },
    {
      title: 'Project Talon: thiết kế UAV chiến đấu mới của Northrop Grumman',
      image: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
    {
      title: 'Tổng hợp thay đổi đáng chú ý của One UI 8.5 Beta trên Samsung...',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
    },
    {
      title: 'Cách mà máy khoan hoạt động',
      image: 'https://i.imgur.com/1Q9Z1Zm.jpg',
    },
    {
      title: 'Chuyện gì đang xảy ra ở Apple?',
      image: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
    {
      title: 'Thương hiệu RAM yêu thích của mình, anh em thì sao?',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
    },
  ]
}

/**
 * Composable cung cấp dữ liệu cho khối "Xem nhanh" (quickList).
 * - SSR-safe (useAsyncData)
 * - Hiện tại dùng mock local; sau này chỉ cần thay fetcher.
 */
export const useQuickList = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexQuickItem[]>(
    'apex-quick-list',
    async () => {
      // Phase 1: mock local
      // Phase 2: thay bằng `$fetch('/api/quick')`
      return getMockQuickList()
    }
  )

  const quickList = computed<ApexQuickItem[]>(() => data.value ?? [])

  return { quickList, pending, error, refresh }
}
