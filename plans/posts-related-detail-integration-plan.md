# Kế hoạch tích hợp API Related Posts vào màn hình Chi tiết bài viết

## 1) Mục tiêu

Tích hợp API backend để hiển thị **“Bài viết liên quan”** trên màn hình **xem chi tiết bài viết**.

- Backend API (gốc):
  - `GET https://localhost:44389/api/public/posts/{postId}/related?limit=3`
- Frontend sẽ gọi qua Nitro proxy để tránh CORS:
  - `GET /api/posts/related/{id}?limit=3`

**Kỳ vọng UI**
- Hiển thị tối đa 3 bài viết liên quan.
- Có trạng thái loading/error.
- Nếu rỗng thì ẩn section.
- SSR-safe.

---

## 2) Hiện trạng code liên quan

### 2.1 Page detail
- File: `app/pages/posts/[slug].vue`
- Đang dùng composable:
  - `usePostsDetail(slug)` để lấy chi tiết bài viết.
- Đang có `useSeoMeta` theo `newsDetail.title` và `newsDetail.desc`.

### 2.2 Pattern gọi backend qua Nitro proxy
Đang có 2 route proxy tương tự:
- `server/api/posts/slug/[slug].get.ts`
  - FE gọi `/api/posts/slug/:slug` → backend `.../api/public/posts/{slug}`
- `server/api/posts/home/posts.get.ts`
  - FE gọi `/api/posts/home/posts` → backend `.../api/public/posts/home`

Common pattern:
- Lấy `apiBaseUrl` từ `runtimeConfig.apiBaseUrl` (default: `https://localhost:44389`).
- Dev-only bypass TLS self-signed khi gọi localhost bằng cách tạm set `NODE_TLS_REJECT_UNAUTHORIZED=0` theo phạm vi từng request.
- Dùng `ofetch` `$fetch.raw` + `ignoreResponseError: true` rồi tự throw `createError` nếu status >= 400.

---

## 3) Thiết kế tích hợp (đề xuất)

### 3.1 Thêm Nitro proxy endpoint: related

**File đề xuất:** `server/api/posts/related/[id].get.ts`

**FE gọi:**
- `GET /api/posts/related/{id}?limit=3`

**Proxy tới backend:**
- `GET {apiBaseUrl}/api/public/posts/{id}/related?limit=3`

**Chi tiết xử lý:**
- Validate `id` (`getRouterParam(event, "id")`). Nếu thiếu → 400.
- Lấy `limit` từ `getQuery(event)`:
  - Nếu có `limit` và là số > 0 thì forward sang backend.
  - Nếu không có thì backend tự default.
- Dùng cùng pattern error handling + TLS bypass như các file posts hiện tại.

### 3.2 Bổ sung types (để lấy được postId)

Hiện tại:
- `PostsDetailDto` (server dto) có `id: string`.
- `PostsDetail` (UI model) **chưa có `id`**.

**Thay đổi đề xuất:**
1. `app/types/posts/posts.ui.ts`
   - Thêm `id: string` vào interface `PostsDetail`.
2. `app/composables/usePostsDetail.ts`
   - Trong `mapClientPostDetailToNewsDetail`, map `id: dto.id`.

Lý do: API related cần `{postId}` để gọi.

### 3.3 Related DTO + mapping

Hiện chưa có endpoint related trong codebase, nên cần xác nhận response shape backend.

**Đề xuất 2 phương án:**

**A) Backend trả về cùng shape với `HomePostsDto[]`**
- Thêm type alias trong `app/types/posts/posts.server.ts`:
  - `export type RelatedPostsDto = HomePostsDto[]`
- Mapping: reuse mapper `mapHomePostToListItem` (đang có trong `usePostsByCategory.ts`).

**B) Backend trả về shape riêng**
- Tạo interface `RelatedPostDto` và mapping tương ứng.

**Khuyến nghị:** tách mapper dùng chung ra một file utility (nếu dự định reuse nhiều nơi):
- `app/utils/postsMappers.ts` export `mapHomePostToListItem(dto: HomePostsDto): PostsListItem`

### 3.4 Thêm composable: useRelatedPosts

**File đề xuất:** `app/composables/useRelatedPosts.ts`

API:
```ts
export const useRelatedPosts = (
  postId: MaybeRef<string | null | undefined>,
  options?: {
    enabled?: MaybeRef<boolean>
    limit?: MaybeRef<number | undefined>
  }
) => {
  // return { items, pending, error, refresh }
}
```

Key useAsyncData:
- `apex-posts-related:${id}:limit=${limit}`

Fetch:
- `$fetch<RelatedPostsDto>(`/api/posts/related/${encodeURIComponent(id)}?limit=3`)`

Output:
- `items: ComputedRef<PostsListItem[]>`

### 3.5 UI/Component: hiển thị “Bài viết liên quan”

**Vị trí đề xuất trong trang:**
- Sau phần `<article class="apex-mma-posts-detail-content">` và trước `reactions/comments`.

**Component đề xuất:** `app/components/posts/ApexMmaRelatedPosts.vue`

Props:
- `items: PostsListItem[]`
- `pending: boolean`
- `error: unknown`
- `onRetry: () => void`

UI states:
- `pending`: hiển thị "Đang tải bài viết liên quan..."
- `error`: hiển thị message + nút "Thử lại" → gọi `refresh()`
- empty: ẩn section (không render)

**Lưu ý conventions project:**
- Class CSS/SCSS bắt buộc prefix `apex-mma-`.
- Ảnh trong template dùng `<NuxtImg>`.

---

## 4) Tích hợp vào `app/pages/posts/[slug].vue`

### 4.1 Kích hoạt fetch related khi đã có `newsDetail.id`

Pseudo:
```ts
const postId = computed(() => newsDetail.value?.id)
const { items: relatedItems, pending: relatedPending, error: relatedError, refresh: refreshRelated } =
  useRelatedPosts(postId, {
    enabled: computed(() => !!postId.value),
    limit: 3,
  })
```

### 4.2 Render component

```vue
<ApexMmaRelatedPosts
  :items="relatedItems"
  :pending="relatedPending"
  :error="relatedError"
  @retry="refreshRelated"
/>
```

Gợi ý: nếu backend chưa loại bỏ bài hiện tại khỏi related list, FE có thể filter thêm:
- Lọc `item.slug !== route.params.slug` hoặc `item.id !== newsDetail.id` (tuỳ model).

---

## 5) SSR & Performance

- Vì `related` phụ thuộc `newsDetail.id`, sẽ có 2 request theo chuỗi:
  1) fetch detail
  2) fetch related
- Với limit=3, chi phí chấp nhận được.
- Nếu cần tối ưu mạnh hơn trong tương lai:
  - Backend có thể trả related ngay trong payload detail.

---

## 6) SEO

- `useSeoMeta` đã có cho detail.
- Related posts tạo thêm internal links (tốt cho crawl).
- Không bắt buộc đổi meta.

---

## 7) Checklist verify (sau khi implement)

1. Mở trang `/posts/[slug]`:
   - Detail hiển thị OK.
   - Related hiển thị tối đa 3 item.
2. Network:
   - FE gọi `/api/posts/related/{id}?limit=3`.
   - Nitro proxy gọi đúng backend `.../api/public/posts/{id}/related?limit=3`.
3. States:
   - Backend trả `[]` → section ẩn.
   - Backend lỗi 500/404 → error state + retry.
4. SSR:
   - Xem “View Page Source” có HTML related (nếu SSR fetch được).
5. UI conventions:
   - Tất cả class prefix `apex-mma-`.
   - Ảnh dùng `<NuxtImg>`.

---

## 8) Cần bạn xác nhận (để khi implement không sai)

1) `route.params.slug` hiện là **slug string** hay thực tế là **id (GUID)**?
   - Vì endpoint related dùng `{postId}` (GUID) trong URL.
2) Bạn muốn đặt block “Bài viết liên quan” ở đâu?
   - (A) Trong main content (dưới nội dung bài viết)
   - (B) Trong sidebar (dưới Trending)
   - (C) Cả hai (không khuyến nghị)

