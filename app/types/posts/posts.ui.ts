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
  title: string
  author: string | null
  desc?: string
  content: string
  publishedAt: string
  tags?: string[]
  readingTime?: string
}