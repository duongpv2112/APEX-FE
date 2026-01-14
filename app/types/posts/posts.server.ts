export interface HomePostsDto {
  id: string
  title: string
  slug: string
  thumbnail: string
  excerpt: string | null
  coverImage: string | null
  publishedAt: string | null
  categories?: PostsCategoryRefDto[]
  author: AuthorPostsDto | null
}

export interface PostsCategoryRefDto {
  name: string
  slug: string
}

export interface AuthorPostsDto {
  id: string,
  fullName: string,
  slug: string,
  profilePhoto: string,
}

export interface PostsDetailDto {
  author: AuthorPostsDto | null
  contentHtml: string | null
  excerpt?: string | null
  thumbnail?: string | null
  coverImage?: string | null
  timeToRead: number | null
  id: string
  title: string
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt: string | null
  category?: PostsCategoryDto | null
}

export interface PostsCategoryDto {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
}

export interface PostsByCategoryDto {
  category: {
    name: string;
    slug: string;
  };
  items: HomePostsDto[];
}
