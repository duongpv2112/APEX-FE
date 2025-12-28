export interface HomePostsDto {
  id: string
  title: string
  slug: string
  thumbnail: string
  excerpt: string | null
  coverImage: string | null
  publishedAt: string | null
  author: AuthorPostsDto | null
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
  timeToRead: number | null
  id: string
  title: string
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt: string | null
}