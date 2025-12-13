import { computed } from "vue";
import { mockNewsList } from "../../shared/newsMock";

export interface ApexMainNews {
  image: string;
  title: string;
  author: string;
  slug: string;
}

export interface ApexSubNewsItem {
  image: string;
  title: string;
  author: string;
  desc?: string;
  slug: string;
}

interface ApexNewsPayload {
  mainNews: ApexMainNews;
  subNews: ApexSubNewsItem[];
}

function getMockNews(): ApexNewsPayload {
  const first = mockNewsList[0];

  if (!first) {
    return {
      mainNews: {
        image: "",
        title: "",
        author: "",
        slug: "",
      },
      subNews: [],
    };
  }

  const rest = mockNewsList.slice(1);

  const mainNews: ApexMainNews = {
    image: first.image,
    title: first.title,
    author: first.author,
    slug: first.slug,
  };

  const subNews: ApexSubNewsItem[] = rest.map((item) => ({
    image: item.image,
    title: item.title,
    author: item.author,
    desc: item.desc,
    slug: item.slug,
  }));

  return {
    mainNews,
    subNews,
  };
}

/**
 * Composable cung cấp dữ liệu cho News section trên trang home.
 * - SSR-safe (dùng useAsyncData)
 * - Hiện tại dùng mock data; sau này chỉ cần thay fetcher sang `$fetch()`.
 */
export const useNews = () => {
  const { data, pending, error, refresh } = useAsyncData<ApexNewsPayload>(
    "apex-news",
    async () => {
      // Phase 1: mock local
      // Phase 2: thay bằng `$fetch('/api/news')` và map DTO -> UI model
      return getMockNews();
    }
  );

  const mainNews = computed<ApexMainNews>(() => {
    return (
      data.value?.mainNews ?? {
        image: "",
        title: "",
        author: "",
        slug: "",
      }
    );
  });

  const subNews = computed<ApexSubNewsItem[]>(() => {
    return data.value?.subNews ?? [];
  });

  return {
    mainNews,
    subNews,
    pending,
    error,
    refresh,
  };
};
