import { computed } from 'vue'

export interface ApexCommunityItem {
  title: string
  image: string
  href: string
}

interface ApexCommunityPayload {
  total: number
  list: ApexCommunityItem[]
}

function getMockCommunity(): ApexCommunityPayload {
  return {
    total: 95,
    list: [
      {
        title: 'IFA 2025',
        image: 'https://i.imgur.com/8Q1Z1Zm.jpg',
        href: '#',
      },
      {
        title: 'Vinalink AI Trainer',
        image: 'https://i.imgur.com/1Q9Z1Zm.jpg',
        href: '#',
      },
      {
        title: 'BAC Training',
        image: 'https://i.imgur.com/2nCt3Sbl.jpg',
        href: '#',
      },
      {
        title: 'Tinh tế AI',
        image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
        href: '#',
      },
    ],
  }
}

/**
 * Composable cung cấp dữ liệu cho khối "Cộng đồng" (communityTotal + communityList).
 * - SSR-safe (useAsyncData)
 * - Hiện tại dùng mock local; sau này chỉ cần thay fetcher.
 */
export const useCommunity = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexCommunityPayload>(
    'apex-community',
    async () => {
      // Phase 1: mock local
      // Phase 2: thay bằng `$fetch('/api/community')`
      return getMockCommunity()
    }
  )

  const communityTotal = computed<number>(() => data.value?.total ?? 0)
  const communityList = computed<ApexCommunityItem[]>(() => data.value?.list ?? [])

  return { communityTotal, communityList, pending, error, refresh }
}
