# Kế hoạch triển khai trang chi tiết bài viết (News Detail) theo slug

## 1. Mục tiêu

- Tạo trang **xem chi tiết bài viết** với URL theo **slug**.
- Điều hướng sang trang chi tiết khi người dùng **nhấn vào ảnh hoặc tên bài viết** trong khối `apex-mma-news-section` trên trang chủ (`app/pages/index.vue`).
- Giữ đúng kiến trúc đang dùng: **SSR + composable + (tuỳ chọn) store + server/api**.

---
## 2. Làm rõ yêu cầu & phạm vi

### 2.1. Đường dẫn & routing
- Định dạng URL: `/news/[slug]` (ví dụ: `/news/redmi-note-14-pro-5g-review`).
- Sử dụng Nuxt Page Router:
  - Tạo file: `app/pages/news/[slug].vue`.

### 2.2. Nguồn dữ liệu
- Giai đoạn đầu (demo / mock):
  - Dùng dữ liệu mock tương tự `app/composables/useNews.ts`.
  - Có thể:
    - Hoặc mock trực tiếp trong composable `useNewsDetail`.
    - Hoặc tạo endpoint mock `server/api/news/[slug].get.ts` để trả dữ liệu theo slug.
- Giai đoạn sau (khi có backend thật):
  - Thay body của endpoint `/api/news/[slug]` để gọi API backend.
  - Giữ nguyên interface + luồng trên frontend.

### 2.3. Điểm kích hoạt từ UI
- Khối liên quan: **`apex-mma-news-section`** trong `app/pages/index.vue`.
- Các chỗ cần gắn điều hướng sang trang chi tiết:
  - Ảnh và tiêu đề của **tin chính** (`mainNews`).
  - Ảnh và tiêu đề của **tin phụ đầu tiên** hiển thị trong `apex-mma-news-main-top-right`.
  - Ảnh và tiêu đề của các item trong danh sách **`bottomList`** (subNews còn lại).
- CSS hiện tại đã có prefix `apex-mma-`, không thay đổi class, chỉ thêm behavior (`@click` / `<NuxtLink>`).

---
## 3. Thiết kế mô hình dữ liệu & slug

### 3.1. Bổ sung slug vào model News hiện tại

File: `app/composables/useNews.ts`

```ts
export interface ApexMainNews {
  image: string
  title: string
  author: string
  slug: string
}

export interface ApexSubNewsItem {
  image: string
  title: string
  author: string
  desc?: string
  slug: string
}
```

### 3.2. Cập nhật mock data `getMockNews()`

Bổ sung trường `slug` cho từng bài:

```ts
mainNews: {
  image: 'https://i.imgur.com/8Q1Z1Zm.jpg',
  title:
    'TinhteDIY : Dạo triển lãm SECC trên tay nhanh bộ ba máy pin ETOP giá hợp lý cho anh em DIY',
  author: 'Bảo Long.',
  slug: 'tinhte-diy-trien-lam-secc-may-pin-etop',
},
subNews: [
  {
    image: 'https://i.imgur.com/1Q9Z1Zm.jpg',
    title: 'Đánh Giá Chi Tiết: Redmi Note 14 Pro+ 5G sau hơn 10 tháng sử dụng',
    author: 'Cáo - Foxtek',
    desc: 'Mình đã có hơn 10 tháng gắn bó cùng chiếc Redmi Note 14 Pro+ 5G...',
    slug: 'redmi-note-14-pro-plus-5g-review-10-thang',
  },
  // ... các item khác, mỗi item có slug riêng
]
```

### 3.3. Model cho trang chi tiết bài viết

Khi cần nhiều thông tin hơn cho trang detail:

```ts
export interface ApexNewsDetail {
  slug: string
  title: string
  author: string
  image: string
  desc?: string
  content: string        // nội dung bài viết (text hoặc HTML/ markdown)
  publishedAt: string    // ngày xuất bản
  tags?: string[]
  readingTime?: string   // ví dụ: "5 phút đọc"
}
```

Có thể tái sử dụng một phần từ `ApexSubNewsItem` nếu muốn.

---
## 4. Thiết kế route & trang `/news/[slug].vue`

### 4.1. Tạo page mới

- File: `app/pages/news/[slug].vue`.
- Sử dụng `<script setup lang="ts">`.

### 4.2. Lấy slug từ route & fetch dữ liệu

Giai đoạn đơn giản (chỉ dùng useAsyncData + endpoint mock):

```ts
<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: newsDetail, pending, error } = await useAsyncData(
  () => $fetch<ApexNewsDetail>(`/api/news/${slug.value}`),
  { watch: [slug] }
)
</script>
```

Hoặc (khi đã có composable `useNewsDetail` – mô tả ở phần 5):

```ts
const route = useRoute()
const { newsDetail, pending, error } = useNewsDetail(route.params.slug as string)
```

### 4.3. Template & layout cơ bản

Bố cục gợi ý cho UI detail:

```vue
<template>
  <section class="apex-mma-news-detail-section">
    <div class="apex-mma-news-detail-container">
      <div class="apex-mma-news-detail-breadcrumb">
        Trang chủ / Tin tức / <span>{{ newsDetail?.title }}</span>
      </div>

      <h1 class="apex-mma-news-detail-title">
        {{ newsDetail?.title }}
      </h1>

      <div class="apex-mma-news-detail-meta" v-if="newsDetail">
        <span class="apex-mma-news-detail-author">{{ newsDetail.author }}</span>
        <span class="apex-mma-news-detail-dot">•</span>
        <span class="apex-mma-news-detail-date">{{ newsDetail.publishedAt }}</span>
        <template v-if="newsDetail.readingTime">
          <span class="apex-mma-news-detail-dot">•</span>
          <span class="apex-mma-news-detail-reading">
            {{ newsDetail.readingTime }}
          </span>
        </template>
      </div>

      <div class="apex-mma-news-detail-cover-wrap" v-if="newsDetail?.image">
        <img :src="newsDetail.image" alt="" class="apex-mma-news-detail-cover" />
      </div>

      <article class="apex-mma-news-detail-content" v-if="newsDetail">
        <p v-for="(para, idx) in paragraphs" :key="idx">
          {{ para }}
        </p>
      </article>

      <div v-if="pending" class="apex-mma-news-detail-loading">Đang tải...</div>
      <div v-if="error" class="apex-mma-news-detail-error">Không tải được bài viết.</div>
    </div>
  </section>
</template>
```

- `paragraphs` có thể là `computed` tách từ `newsDetail.content` (split theo `\n\n`), tuỳ cách mock.

### 4.4. Style & responsive

- Thêm `<style lang="scss" scoped>` trong `news/[slug].vue`.
- Đảm bảo **tất cả class** dùng prefix `apex-mma-`.
- Mobile first:
  - Container width ~ 100%, max-width ~ 760–960px, căn giữa.
  - Padding 12–16px, font-size 15–16px, line-height 1.5–1.7.

---
## 5. Luồng dữ liệu cho news detail (theo pattern hệ thống)

> Áp dụng pattern đang dùng: **server/api → store (Pinia) → composable → page**.

### 5.1. Endpoint mock `/api/news/[slug]`

- File: `server/api/news/[slug].get.ts`.
- Logic cơ bản:
  - Đọc `const { slug } = getRouterParams(event)` hoặc `event.context.params`.
  - Tìm bài tương ứng trong một danh sách mock (có thể trùng với danh sách ở `useNews` hoặc một mock riêng cho detail).
  - Nếu tìm thấy: trả về `ApexNewsDetail`.
  - Nếu không: trả về 404 (hoặc null + message).

Pseudo-code:

```ts
export default defineEventHandler((event) => {
  const { slug } = getRouterParams(event)
  const item = mockNewsDetailList.find((n) => n.slug === slug)

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  return item
})
```

### 5.2. Store Pinia `stores/news.ts` (tuỳ chọn nhưng tốt)

Mục đích: cache chi tiết bài viết, dùng lại ở nhiều nơi.

Cấu trúc state gợi ý:

```ts
interface NewsState {
  details: Record<string, ApexNewsDetail | undefined> // key: slug
  pending: boolean
  error: string | null
}
```

Action:

```ts
async function fetchNewsDetail(slug: string) {
  this.pending = true
  this.error = null
  try {
    const data = await $fetch<ApexNewsDetail>(`/api/news/${slug}`)
    this.details[slug] = data
    return data
  } catch (err: any) {
    this.error = err?.message || 'Lỗi tải dữ liệu'
    throw err
  } finally {
    this.pending = false
  }
}
```

Getter:

```ts
getBySlug: (state) => (slug: string) => state.details[slug]
```

### 5.3. Composable `useNewsDetail(slug)`

File: `app/composables/useNewsDetail.ts`.

Ý tưởng:

```ts
export const useNewsDetail = (slug: MaybeRef<string>) => {
  const _slug = computed(() => unref(slug))
  const newsStore = useNewsStore()

  const { data, pending, error } = useAsyncData(
    () => newsStore.fetchNewsDetail(_slug.value),
    {
      watch: [_slug],
      // key có thể là `apex-news-detail-${_slug.value}`
    }
  )

  const newsDetail = computed(() => data.value)

  return { newsDetail, pending, error }
}
```

Trang `/news/[slug].vue` chỉ cần gọi composable này để lấy dữ liệu.

---
## 6. Gắn hành vi click từ `apex-mma-news-section`

File: `app/pages/index.vue`.

### 6.1. Khai báo router & hàm điều hướng

Trong `<script setup>`:

```ts
const router = useRouter()

const goToNewsDetail = (slug: string) => {
  if (!slug) return
  router.push({ name: 'news-slug', params: { slug } })
  // hoặc: router.push(`/news/${slug}`)
}
```

> Với Nuxt, route động `[slug].vue` thường có name dạng `news-slug`.

### 6.2. Gắn vào mainNews

```html
<img
  class="apex-mma-news-main-img"
  :src="mainNews.image"
  alt=""
  @click="goToNewsDetail(mainNews.slug)"
/>
<div
  class="apex-mma-news-main-title"
  @click="goToNewsDetail(mainNews.slug)"
>
  {{ mainNews.title }}
</div>
```

### 6.3. Gắn vào tin phụ trên phải (`subNews[0]`)

```html
<img
  class="apex-mma-news-main-top-right-img"
  :src="subNews[0].image"
  alt=""
  @click="goToNewsDetail(subNews[0].slug)"
/>
<div
  class="apex-mma-news-main-top-right-title"
  @click="goToNewsDetail(subNews[0].slug)"
>
  <b>{{ subNews[0].title }}</b>
</div>
```

### 6.4. Gắn vào danh sách `bottomList` (sub items)

```html
<div
  v-for="(item, idx) in bottomList"
  :key="idx"
  class="apex-mma-news-sub-item"
>
  <img
    class="apex-mma-news-sub-img"
    :src="item.image"
    alt=""
    @click="goToNewsDetail(item.slug)"
  />
  <div class="apex-mma-news-sub-content">
    <div
      class="apex-mma-news-sub-title"
      @click="goToNewsDetail(item.slug)"
    >
      {{ item.title }}
    </div>
    <div class="apex-mma-news-sub-author">{{ item.author }}</div>
  </div>
</div>
```

### 6.5. (Tuỳ chọn) Dùng `<NuxtLink>` thay vì `@click`

- Ưu điểm: SEO/HTML semantics tốt hơn, có `a` tag rõ ràng.
- Ví dụ với mainNews:

```html
<NuxtLink
  class="apex-mma-news-main-img-link"
  :to="{ name: 'news-slug', params: { slug: mainNews.slug } }"
>
  <img class="apex-mma-news-main-img" :src="mainNews.image" alt="" />
</NuxtLink>
```

> Nếu tạo thêm class wrapper như `apex-mma-news-main-img-link`, vẫn phải tuân thủ prefix `apex-mma-`.

---
## 7. SEO & meta cho trang chi tiết

### 7.1. Dùng composable SEO hiện tại

Trong `news/[slug].vue`:

```ts
useSeoMeta({
  title: newsDetail.value?.title ?? 'Chi tiết bài viết',
  ogTitle: newsDetail.value?.title,
  description: newsDetail.value?.desc ?? '',
  ogDescription: newsDetail.value?.desc ?? '',
  ogImage: newsDetail.value?.image,
})
```

- Có thể kết hợp `useSiteMeta` nếu project đang dùng để set default.

### 7.2. Schema.org Article (tuỳ chọn)

- Nếu đã dùng `nuxt-schema-org`, có thể khai báo `defineArticle()` cho bài viết.

### 7.3. Heading & nội dung

- Đảm bảo có duy nhất một `h1` cho tiêu đề bài viết.
- Các heading khác (nếu nội dung dài) dùng `h2`, `h3` hợp lý.

---
## 8. Kiểm thử & hoàn thiện

### 8.1. Case test chính

- Click **ảnh hoặc tiêu đề** của `mainNews` →
  - Điều hướng đến `/news/[slug-main]`.
  - Hiển thị đúng tiêu đề, ảnh, nội dung tương ứng.
- Click **ảnh hoặc tiêu đề** của từng item ở `bottomList` và `subNews[0]` →
  - Điều hướng đến slug tương ứng.
- Nhập URL trực tiếp `/news/[slug]` trên trình duyệt →
  - SSR trả về HTML đầy đủ (xem page source).
- Trường hợp slug không tồn tại →
  - Nhận 404 hoặc thông báo "Bài viết không tồn tại".

### 8.2. Responsive

- Mobile (<= 767px):
  - Text dễ đọc, không bị tràn, ảnh cover co dãn hợp lý.
- Tablet / Desktop:
  - Container căn giữa, max-width hợp lý, whitespace đủ rộng.

### 8.3. SEO cơ bản

- Kiểm tra `<title>` và `<meta name="description">` trong HTML SSR.
- Kiểm tra thẻ OpenGraph (`og:title`, `og:description`, `og:image`).

---
## 9. Checklist thực thi

- [ ] Bổ sung trường `slug` vào model `ApexMainNews`, `ApexSubNewsItem` trong `useNews.ts`.
- [ ] Cập nhật mock data `getMockNews()` để mỗi bài có slug.
- [ ] (Tuỳ chọn) Tạo model `ApexNewsDetail` dùng cho detail page.
- [ ] (Tuỳ chọn) Tạo endpoint mock `server/api/news/[slug].get.ts` trả về `ApexNewsDetail`.
- [ ] (Tuỳ chọn) Tạo `stores/news.ts` để cache detail theo slug.
- [ ] (Tuỳ chọn) Tạo composable `useNewsDetail(slug)` để page dùng.
- [ ] Tạo page `app/pages/news/[slug].vue` với layout chi tiết bài viết, responsive.
- [ ] Thiết lập SEO meta cho trang detail bằng `useSeoMeta` / `useSiteMeta`.
- [ ] Gắn sự kiện điều hướng từ `apex-mma-news-section` (click ảnh/tiêu đề → điều hướng theo slug).
- [ ] Test toàn bộ luồng: click từ home, nhập URL trực tiếp, slug sai, responsive, SSR + meta.
