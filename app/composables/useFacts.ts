import { computed } from 'vue'

/**
 * UI model cho Fact item đang dùng ở `app/pages/index.vue`.
 *
 * Ghi chú:
 * - `isCreate` đại diện cho card CTA “Tạo Fact mới” (local-only).
 * - Khi chuyển sang API thật, phần fetch chỉ cần thay trong composable này,
 *   UI không cần đổi.
 */
export interface ApexFactItem {
  avatar: string
  image: string
  username: string
  isCreate?: boolean
}

const createCard: ApexFactItem = {
  avatar: 'https://i.imgur.com/0y8Ftya.png',
  image: 'https://i.imgur.com/1Q9Z1Zm.jpg',
  username: 'seal2002',
  isCreate: true,
}

function getMockFacts(): ApexFactItem[] {
  return [
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/1Q9Z1Zm.jpg',
      username: 'seal2002',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/2nCt3Sbl.jpg',
      username: 'TRUNGKIEN...',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/2nCt3Sbl.jpg',
      username: 'TRUNGKIEN...',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/2nCt3Sbl.jpg',
      username: 'TRUNGKIEN...',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
    {
      avatar: 'https://i.imgur.com/0y8Ftya.png',
      image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
      username: 'xecata',
    },
  ]
}

export const useFacts = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexFactItem[]>(
    'apex-facts',
    async () => {
      // Phase 1 (hiện tại): mock data cục bộ
      // Phase 2 (sau này): thay bằng `$fetch('/api/facts')` và map DTO -> UI model
      return getMockFacts()
    }
  )

  const factList = computed<ApexFactItem[]>(() => {
    return [createCard, ...(data.value ?? [])]
  })

  return {
    factList,
    pending,
    error,
    refresh,
  }
}
