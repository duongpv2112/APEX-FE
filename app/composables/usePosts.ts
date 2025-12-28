import { computed } from "vue";
import type { HomePostsDto } from "~/types/posts/posts.server";
import type {
  HomeMainPosts,
  HomePostsPayload,
  HomeSubPostsItem,
} from "~/types/posts/posts.ui";

/**
 * Composable cung cấp dữ liệu cho News section trên trang home.
 * - SSR-safe (dùng useAsyncData)
 * - Hiện tại lấy data thật qua Nitro proxy `/api/client/posts`.
 */
export const usePosts = () => {
  const { data, pending, error, refresh } = useAsyncData<HomePostsPayload>(
    "apex-posts-home",
    async () => {
      const res = await $fetch<HomePostsDto[]>("/api/posts/home/posts");

      return mapHomePostsToHomeNewsPayload(res ?? []);
    }
  );

  const mainNews = computed<HomeMainPosts>(() => {
    return (
      data.value?.mainNews ?? {
        image: "",
        title: "",
        author: "",
        slug: "",
      }
    );
  });

  const subNews = computed<HomeSubPostsItem[]>(() => {
    return data.value?.subNews ?? [];
  });

  const emptyMainNews = (): HomeMainPosts => ({
    image: "",
    title: "",
    author: "",
    slug: "",
  });

  const mapHomePostToSubNewsItem = (dto: HomePostsDto): HomeSubPostsItem => {
    return {
      image: dto.thumbnail ?? "",
      title: dto.title ?? "",
      author: dto.author?.fullName ?? null,
      desc: dto.excerpt ?? "",
      slug: dto.slug ?? "",
    };
  };

  const mapHomePostsToHomeNewsPayload = (
    items: HomePostsDto[]
  ): HomePostsPayload => {
    const first = items?.[0];
    if (!first) {
      return { mainNews: emptyMainNews(), subNews: [] };
    }

    const mainNews: HomeMainPosts = {
      image: first.thumbnail ?? "",
      title: first.title ?? "",
      author: first.author?.fullName ?? null,
      slug: first.slug ?? "",
    };

    const subNews = (items.slice(1) ?? []).map(mapHomePostToSubNewsItem);

    return { mainNews, subNews };
  };

  return {
    mainNews,
    subNews,
    pending,
    error,
    refresh,
  };
};
