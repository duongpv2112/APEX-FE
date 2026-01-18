export interface HomeMainPosts {
  image: string;
  title: string;
  author: string | null;
  slug: string;
}

export interface HomeSubPostsItem {
  image: string;
  title: string;
  author: string | null;
  desc?: string;
  slug: string;
}

export interface HomePostsPayload {
  mainNews: HomeMainPosts;
  subNews: HomeSubPostsItem[];
}

export interface PostsDetail {
  id: string
  title: string
  author: string | null
  authorAvatar?: string | null
  desc?: string
  content: string
  coverImage?: string | null
  publishedAt: string
  tags?: string[]
  readingTime?: string
  viewCount?: number
  likeCount?: number
  commentCount?: number
  /**
   * Category slug của bài viết (để render breadcrumb + list theo loại).
   * Hiện tại được fake ở FE, về sau backend sẽ trả về thật.
   */
  categorySlug?: string
}

export interface PostsCategory {
  slug: string
  label: string
  description?: string
}

export interface PostsListItem {
  slug: string
  title: string
  desc?: string
  author: string | null
  authorAvatar?: string | null
  categories?: Array<{ name: string; slug: string }>
  image?: string
  publishedAt?: string
  categorySlug?: string
}
