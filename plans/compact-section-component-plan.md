# Kế hoạch tách `apex-mma-compact-section` thành component + fetch posts theo category slug

> Mục tiêu: tách UI section `.apex-mma-compact-section` đang nằm trong `app/pages/index.vue` thành 1 component tái sử dụng. Mỗi instance của component nhận `categorySlug` (vd: `ufc`) và tự fetch dữ liệu từ backend thông qua Nitro proxy `/api/posts/category/:slug?limit=6`.

## 1) Deliverables

1. **Component mới** (UI + logic fetch):
   - `app/components/posts/ApexMmaCompactSection.vue` (tên gợi ý; có thể đặt trong `components/home/` nếu chỉ dùng cho Home)
2. **Composable (khuyến nghị)** để chuẩn hoá fetch theo category + limit:
   - Update `app/composables/usePostsByCategory.ts` để hỗ trợ query `limit`
   - Hoặc tạo mới `app/composables/usePostsByCategoryLimit.ts` (nếu muốn giữ backward-compatible 100%)
3. **Cập nhật Nitro proxy** để forward query string `limit` xuống backend:
   - Update `server/api/posts/category/[slug].get.ts`
4. **Refactor Home**:
   - `app/pages/index.vue`: thay khối `<section class="apex-mma-compact-section">...</section>` bằng `<ApexMmaCompactSection category-slug="ufc" ... />`
   - Di chuyển SCSS liên quan sang component (scoped hoặc module SCSS tuỳ pattern)
5. (Tuỳ chọn) **Các component con** để giảm size SFC:
   - `ApexMmaCompactPostItem.vue`

## 2) Success criteria

- Home vẫn render đúng layout (pixel tương đương hiện tại).
- Khi truyền `categorySlug="ufc"` component gọi API (thông qua proxy):
  - Client gọi: `GET /api/posts/category/ufc?limit=6`
  - Proxy gọi backend: `GET https://localhost:44389/api/public/posts/category/ufc?limit=6`
- SSR-safe: refresh page (hard reload) không lỗi hydration, data có thể render server-side.
- Tuân thủ conventions:
  - **CSS class/id có prefix `apex-mma-`**
  - Ảnh dùng `<NuxtImg>`

## 3) Hiện trạng liên quan (đã khảo sát)

- UI section hiện ở: `app/pages/index.vue` với class `.apex-mma-compact-section` và SCSS khá dài nằm trong `<style scoped>` của page.
- Hiện đang dùng mock data từ `useCompactList()` (`app/composables/useCompactList.ts`).
- Dự án đã có composable fetch theo category: `app/composables/usePostsByCategory.ts`
  - Hiện call: `$fetch('/api/posts/category/:slug')`
  - Chưa hỗ trợ `limit`.
- Nitro proxy hiện có: `server/api/posts/category/[slug].get.ts`
  - Forward tới backend `.../api/public/posts/category/:slug`
  - Chưa forward query `limit`.

## 4) Thiết kế component mới (API contract)

### 4.1 Props

Đề xuất props (tối thiểu + mở rộng hợp lý):

```ts
type ApexMmaCompactSectionProps = {
  /** Bắt buộc: slug category, ví dụ "ufc" */
  categorySlug: string

  /** Tiêu đề hiển thị bên trái, ví dụ "Bài nổi bật" */
  title?: string

  /** Số lượng items, mặc định 6 (theo yêu cầu) */
  limit?: number

  /** Hiển thị tags trên từng item: hiện đang placeholder (Featured/Amazing/Funny) */
  tags?: string[]

  /** Bật/tắt auto fetch (trường hợp render condition) */
  enabled?: boolean
}
```

### 4.2 Output/State trong component

- `items: PostsListItem[]`
- `pending: boolean`
- `error: unknown | null`
- `refresh()`

### 4.3 Routing “Xem tất cả”

Theo yêu cầu của bạn: link tới `/posts/categories/[category]`.

Trong template component:

```vue
<NuxtLink
  class="apex-mma-compact-viewall"
  :to="{ path: `/posts/categories/${categorySlug}` }"
>
  Xem tất cả
</NuxtLink>
```

> Lưu ý: dùng `NuxtLink` thay vì `<a href="#">` để giữ SPA navigation.

## 5) Luồng data fetch & mapping

### 5.1 Endpoint mục tiêu

Backend server posts cung cấp:

`GET https://localhost:44389/api/public/posts/category/{slug}?limit=6`

Trong FE ta sẽ gọi qua Nitro proxy để tránh CORS:

`GET /api/posts/category/{slug}?limit=6`

### 5.2 Update Nitro proxy `server/api/posts/category/[slug].get.ts`

**Việc cần làm:** đọc query `limit` từ request hiện tại rồi forward xuống backend.

Pseudo:

```ts
import { getQuery } from 'h3'

const { limit } = getQuery(event)
const search = new URLSearchParams()
if (limit) search.set('limit', String(limit))

const url = `${apiBaseUrl}/api/public/posts/category/${encodeURIComponent(slug)}${search.toString() ? `?${search}` : ''}`
```

### 5.3 Update composable `usePostsByCategory`

Hiện composable đã dùng `useAsyncData` + key theo slug (SSR-safe). Ta mở rộng:

1) Thêm `limit?: MaybeRef<number>` vào options.
2) Append query `?limit=...` khi `$fetch`.
3) Sửa `asyncKey` để include limit (tránh cache sai):

```ts
const asyncKey = computed(() => `apex-posts-category:${slug}:${limit}`)
```

> Backward compatibility: `limit` optional, nếu không truyền sẽ không có query.

### 5.4 Mapping DTO -> UI model

Hiện `usePostsByCategory.ts` map sang `PostsListItem` (posts.ui). Component compact cần thêm author avatar (nếu UI vẫn hiển thị avatar) => cần quyết định:

- **Option A (khuyến nghị):** cập nhật mapping trong `usePostsByCategory` để trả về model mới phù hợp compact (vd: `ApexCompactPostItem`) thay vì `PostsListItem`.
- **Option B:** giữ `usePostsByCategory` trả `PostsListItem`, component compact tự map tiếp dựa trên dữ liệu có.

Vì DTO `HomePostsDto.author.profilePhoto` đã có, nên ta có thể tạo model UI riêng:

```ts
type ApexCompactPostItem = {
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  authorName: string | null
  authorAvatar: string | null
}
```

Kế hoạch implement sẽ ưu tiên Option B để ít ảnh hưởng các nơi khác, trừ khi project đang muốn unify UI model.

## 6) Tách UI/SCSS thành component

### 6.1 Vị trí file

Đề xuất:

- `app/components/posts/ApexMmaCompactSection.vue`

Lý do: section này là “posts list theo category”, có thể tái dùng ở nhiều page.

### 6.2 Nội dung component

- Template giữ nguyên cấu trúc DOM và class names hiện tại để đảm bảo style không đổi.
- Đổi các `<a href="#">` thành `NuxtLink`.
- Thay `compactList` (mock) bằng `items` từ API.
- Ảnh tiếp tục dùng `<NuxtImg>`.

### 6.3 Di chuyển SCSS

Chuyển toàn bộ block:

- `.apex-mma-compact-section { ... }`
- media queries liên quan `.apex-mma-compact-section ...`

Từ `app/pages/index.vue` sang `<style scoped lang="scss">` trong component.

> Lưu ý: vì hiện `index.vue` đang dùng `scoped`, khi tách ra nếu vẫn `scoped` thì selector không bị ảnh hưởng. Nếu muốn share style global, cân nhắc tách SCSS ra file riêng trong `app/assets/scss/components/_compact-section.scss` rồi import vào `main.scss`.

## 7) Tích hợp vào Home

### 7.1 Thay thế trong `app/pages/index.vue`

1) Xoá phần template cũ:

```vue
<section class="apex-mma-compact-section"> ... </section>
```

2) Thêm component:

```vue
<ApexMmaCompactSection
  category-slug="ufc"
  title="Bài nổi bật"
  :limit="6"
  :tags="['Featured','Amazing','Funny']"
/>
```

3) Xoá import `useCompactList` và biến `compactList` tại `index.vue`.

4) Xoá SCSS phần compact khỏi `index.vue` để tránh duplicate.

## 8) Loading / Empty / Error states (khuyến nghị)

Trong component, thêm 3 state UI tối thiểu (giống pattern news section đã có):

- Loading: hiển thị skeleton đơn giản (3-6 row placeholder) hoặc message.
- Empty: `Không có bài viết trong chuyên mục này.`
- Error: hiển thị message + nút `Thử lại` gọi `refresh()`.

Class naming vẫn theo prefix `apex-mma-`:

- `.apex-mma-compact-state`, `.apex-mma-compact-loading`, `.apex-mma-compact-error`...

## 9) SSR/caching considerations

- `useAsyncData` mặc định sẽ cache theo key trên server trong vòng đời request; trên client sẽ reuse payload.
- Key phải include `categorySlug` + `limit` để tránh reuse sai giữa các instance.
- Nếu Home render nhiều compact sections cho nhiều category, key khác nhau sẽ tự tách.

## 10) Test/QA checklist

### 10.1 Manual

- Mở Home, kiểm tra list hiển thị đúng 6 items.
- Click “Xem tất cả” chuyển tới `/posts/categories/ufc` đúng.
- Hard reload Home nhiều lần:
  - Không lỗi console
  - Không mismatch hydration
- Test responsive:
  - < 767px: thumb 36%, title nhỏ, excerpt ẩn (như hiện tại)
  - 768–991px: thumb 240px, title 22px
  - >= 992px: layout desktop như hiện tại

### 10.2 API

- Verify network:
  - FE gọi `/api/posts/category/ufc?limit=6`
  - Proxy gọi backend đúng query string.

## 11) Các bước thực hiện (implementation steps)

1. **Update Nitro proxy** `server/api/posts/category/[slug].get.ts` để forward `limit`.
2. **Update composable** `usePostsByCategory.ts` để nhận `limit` và update asyncKey.
3. **Tạo component** `ApexMmaCompactSection.vue`:
   - props + gọi `usePostsByCategory(categorySlug, { limit, enabled })`
   - render list theo layout hiện tại
   - thêm states loading/empty/error
4. **Refactor Home** `app/pages/index.vue`:
   - thay section cũ -> component
   - xoá `useCompactList` usage
   - di chuyển SCSS compact sang component
5. **Manual QA** theo checklist.

---

## Ghi chú kỹ thuật quan trọng

- Backend đang ở `https://localhost:44389` và có thể dùng cert self-signed; proxy hiện đã có logic bypass TLS trong dev.
- Mọi `<img>` trong Vue phải dùng `<NuxtImg>` (đang tuân thủ).
- CSS class đã có prefix `apex-mma-` (giữ nguyên).

