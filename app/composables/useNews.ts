import { computed } from 'vue'

export interface ApexMainNews {
  image: string
  title: string
  author: string
}

export interface ApexSubNewsItem {
  image: string
  title: string
  author: string
  desc?: string
}

interface ApexNewsPayload {
  mainNews: ApexMainNews
  subNews: ApexSubNewsItem[]
}

function getMockNews(): ApexNewsPayload {
  return {
    mainNews: {
      image: 'https://i.imgur.com/8Q1Z1Zm.jpg',
      title:
        'TinhteDIY : Dạo triển lãm SECC trên tay nhanh bộ ba máy pin ETOP giá hợp lý cho anh em DIY',
      author: 'Bảo Long.',
    },
    subNews: [
      {
        image: 'https://i.imgur.com/1Q9Z1Zm.jpg',
        title: 'Đánh Giá Chi Tiết: Redmi Note 14 Pro+ 5G sau hơn 10 tháng sử dụng',
        author: 'Cáo - Foxtek',
        desc: 'Mình đã có hơn 10 tháng gắn bó cùng chiếc Redmi Note 14 Pro+ 5G và cách đây 6 tháng thì mình đã có bài Đánh Giá Chi Tiết đầu tiên. Tính đến hiện tại, đã có những khía cạnh thay đổi nhưng cũng có những yếu tố vẫn còn...',
      },
      {
        image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
        title:
          'Johny Srouji, người đứng đầu mảng chip của Apple nói với Tim Cook ông muốn rời Apple.',
        author: 'cuhiep',
        desc: '',
      },
      {
        image: 'https://i.imgur.com/2nCt3Sbl.jpg',
        title: 'iPhone Air mất giá nhanh hơn các mẫu iPhone 17 khác sau 10 tuần',
        author: 'Anh Tú.',
        desc: '',
      },
      {
        image: 'https://i.imgur.com/3Q1Z1Zm.jpg',
        title:
          'TinhteLookBack: Sự cố Y2K và thế giới ứng phó với tận thế công nghệ như thế nào',
        author: 'Nam Air',
        desc: '',
      },
    ],
  }
}

/**
 * Composable cung cấp dữ liệu cho News section trên trang home.
 * - SSR-safe (dùng useAsyncData)
 * - Hiện tại dùng mock data; sau này chỉ cần thay fetcher sang `$fetch()`.
 */
export const useNews = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexNewsPayload>(
    'apex-news',
    async () => {
      // Phase 1: mock local
      // Phase 2: thay bằng `$fetch('/api/news')` và map DTO -> UI model
      return getMockNews()
    }
  )

  const mainNews = computed<ApexMainNews>(() => {
    return (
      data.value?.mainNews ?? {
        image: '',
        title: '',
        author: '',
      }
    )
  })

  const subNews = computed<ApexSubNewsItem[]>(() => {
    return data.value?.subNews ?? []
  })

  return {
    mainNews,
    subNews,
    pending,
    error,
    refresh,
  }
}
