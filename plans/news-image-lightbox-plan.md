# Kế hoạch tính năng phóng to ảnh dùng chung với Naive UI (`n-image-preview`) và tích hợp vào trang tin tức (`app/pages/news/[slug].vue`)

## 1. Mục tiêu & phạm vi

- **Mục tiêu tổng quát**
  - Xây dựng **một component lightbox/preview ảnh dùng chung** (ví dụ: `ApexMmaImagePreview`) dựa trên Naive UI `<n-image-preview>` để:
    - Dùng cho trang chi tiết tin tức hiện tại (`/news/[slug]`).
    - Có thể tái sử dụng cho các tab/page Bài viết khác trong tương lai (blog, gallery, v.v.).
  - Hành vi: khi người dùng nhấn vào ảnh ở UI, component hiển thị overlay phóng to ảnh; khi người dùng nhấn ra ngoài ảnh (close overlay) thì preview đóng lại.

- **Phạm vi code**
  - Tạo **component dùng chung** trong `app/components/common/`, ví dụ: `app/components/common/ApexMmaImagePreview.vue`.
  - Tích hợp component này vào `app/pages/news/[slug].vue` cho ảnh cover (`newsDetail.image`).

- **Công nghệ sử dụng**
  - Naive UI `<n-image-preview>` làm nền tảng overlay/preview.
  - Có thể kết hợp **composable** và/hoặc **Pinia store** nếu muốn mở rộng thành preview dùng chung cho toàn app.

- **Giới hạn giai đoạn này**
  - Xử lý **một ảnh đơn** (single image preview) cho trang news detail.
  - Gallery nhiều ảnh, navigation trái/phải sẽ là phase sau.

---

## 2. Hành vi UX/UI mong muốn (ở cấp người dùng cuối)

1. Ở trang `/news/[slug]`, khi hover vào ảnh cover, con trỏ cho thấy có thể click (cursor dạng `zoom-in` hoặc `pointer`).
2. Khi click ảnh cover:
   - Overlay preview ảnh xuất hiện (do `<n-image-preview>` render).
   - Ảnh được phóng to, hiển thị giữa màn hình, có nền tối phía sau (theo style của Naive UI).
3. Khi người dùng đóng preview (click ra ngoài / click nút close của Naive UI):
   - Overlay đóng lại.
   - State ở page/component sync đúng, không bị kẹt ở trạng thái mở.
4. Nếu bài viết không có `newsDetail.image`:
   - Không hiển thị ảnh cover, không có behavior preview.
5. Preview hoạt động tốt trên mobile & desktop; không gây lỗi SSR/hydration.

Vì sử dụng `<n-image-preview>` nên phần lớn UX overlay, animation, accessibility do Naive UI xử lý; ta tập trung vào **API dùng chung + quản lý state**.

---

## 3. Thiết kế kỹ thuật cấp component dùng chung (`ApexMmaImagePreview`)

### 3.1. Vị trí & tên component

- File: `app/components/common/ApexMmaImagePreview.vue`.
- Nuxt auto-import từ thư mục `app/components`, nên có thể dùng `<ApexMmaImagePreview />` trong mọi page.

### 3.2. API component (props, v-model, events)

#### Props

1. `visible` (boolean)
   - Điều khiển trạng thái mở/đóng preview.
   - Sử dụng pattern `v-model:visible` để thống nhất với phần còn lại của app.

2. `imageSrc` (string)
   - URL ảnh cần preview (truyền vào cho `<n-image-preview src="..." />`).

3. `imageAlt` (string, optional)
   - Alt text (chủ yếu dùng cho SEO khi ảnh hiển thị ở UI ngoài, còn overlay của Naive UI không quá phụ thuộc alt).

4. (Tùy chọn tương lai) `title` hoặc `description`
   - Nếu sau này muốn hiển thị caption/tiêu đề trong overlay.

#### Emits

- `update:visible`
  - Được emit khi `<n-image-preview>` thay đổi trạng thái `show`.
  - Phục vụ cho `v-model:visible` ở parent.

### 3.3. Mapping giữa `visible` và `n-image-preview`

Naive UI dùng API:

```vue
<n-image-preview
  v-model:show="showRef"
  :src="..."
  @update:show="handleUpdateShow"
/>
```

Ta thiết kế wrapper như sau (pseudo-code):

```vue
<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  imageSrc: string
  imageAlt?: string
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>();

const showRef = ref(false);

watch(
  () => props.visible,
  (val) => {
    showRef.value = val;
  },
  { immediate: true }
);

const handleUpdateShow = (val: boolean) => {
  showRef.value = val;
  emit('update:visible', val);
};
</script>

<template>
  <n-image-preview
    v-if="imageSrc"
    v-model:show="showRef"
    :src="imageSrc"
    @update:show="handleUpdateShow"
  />
</template>
```

Giải thích:
- `props.visible` là nguồn truth từ parent (page, component khác).
- `showRef` là state nội bộ sync với `visible`.
- Khi `<n-image-preview>` thay đổi `show` (user đóng/mở overlay), `handleUpdateShow` emit `update:visible` để báo ra ngoài.
- `v-if="imageSrc"` đảm bảo không render preview nếu không có ảnh.

> Lưu ý: Nếu project đã dùng Vue 3.4+ có `defineModel`, ta **có thể** đơn giản hoá sang `const visible = defineModel<boolean>('visible', { default: false })` và bind trực tiếp, nhưng để an toàn ta mô tả theo kiểu props+emits truyền thống.

### 3.4. Style & CSS

- `<n-image-preview>` tự lo phần overlay & styling nên **không bắt buộc** phải thêm CSS.
- Nếu cần custom nhẹ (ví dụ bọc thêm container), class phải vẫn tuân theo prefix `apex-mma-`.
- Kế hoạch hiện tại: **không thêm CSS mới ở component này**, để tận dụng tối đa style mặc định của Naive UI.

---

## 4. Tích hợp vào `app/pages/news/[slug].vue`

### 4.1. State & logic trong page

Trong `<script setup lang="ts">` của file `news/[slug].vue`:

- Hiện đã import `computed` từ `vue`. Cần bổ sung `ref`:

```ts
import { computed, ref } from 'vue';
```

- Khai báo state điều khiển preview ảnh cover:

```ts
const isCoverPreviewVisible = ref(false);
```

- Hàm mở preview khi click vào ảnh cover:

```ts
const openCoverPreview = () => {
  if (newsDetail.value?.image) {
    isCoverPreviewVisible.value = true;
  }
};
```

### 4.2. Thay đổi trong `<template>` của page

#### 4.2.1. Click vào ảnh cover để mở preview

Đoạn hiện tại:

```vue
<div v-if="newsDetail.image" class="apex-mma-news-detail-cover-wrap">
  <NuxtImg
    :src="newsDetail.image"
    :alt="newsDetail.title"
    class="apex-mma-news-detail-cover"
  />
</div>
```

Kế hoạch chỉnh sửa:

```vue
<div
  v-if="newsDetail.image"
  class="apex-mma-news-detail-cover-wrap"
  @click="openCoverPreview"
>
  <NuxtImg
    :src="newsDetail.image"
    :alt="newsDetail.title"
    class="apex-mma-news-detail-cover"
  />
</div>
```

- Bổ sung `cursor: zoom-in` hoặc `pointer` trong CSS cho `.apex-mma-news-detail-cover-wrap` (xem mục 4.3).

#### 4.2.2. Thêm component preview dùng chung

Ở gần cuối template (sau `article`, vẫn trong container/section), thêm:

```vue
<ApexMmaImagePreview
  v-if="newsDetail?.image"
  v-model:visible="isCoverPreviewVisible"
  :image-src="newsDetail.image"
  :image-alt="newsDetail.title"
/>
```

Giải thích:
- `v-model:visible` bind với `isCoverPreviewVisible` trong page.
- `ApexMmaImagePreview` bên trong sẽ dùng `<n-image-preview>` và sync state ra ngoài.
- `v-if="newsDetail?.image"` tránh render component khi không có ảnh cover.

### 4.3. Điều chỉnh SCSS trong page

Trong `<style scoped lang="scss">` của `news/[slug].vue`, cập nhật:

```scss
.apex-mma-news-detail-cover-wrap {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: zoom-in; // cho user biết có thể click để xem lớn
}
```

Các phần style khác giữ nguyên.

---

## 5. Phương án mở rộng với composable / Pinia (tương lai gần)

Ngoài cách dùng state cục bộ ở từng page, có thể thiết kế **global image preview** để mọi nơi trong app gọi thống nhất:

### 5.1. Pinia store `useImagePreviewStore`

- File gợi ý: `stores/imagePreview.ts`.
- State:
  - `visible: boolean` – overlay đang mở hay không.
  - `src: string | null` – ảnh hiện tại.
  - `alt: string | null` – mô tả.
- Actions:
  - `open(src: string, alt?: string)` – set `src`, `alt`, `visible = true`.
  - `close()` – `visible = false`.

### 5.2. Composable `useImagePreview`

- File gợi ý: `app/composables/useImagePreview.ts`.
- Bên trong dùng store `useImagePreviewStore()`.
- Trả ra API đơn giản cho UI:

```ts
const { openPreview, closePreview, visible, src, alt } = useImagePreview();
```

### 5.3. Global preview component

- File gợi ý: `app/components/common/ApexMmaGlobalImagePreview.vue`.
- Dùng `useImagePreview()` để lấy state.
- Render:

```vue
<ApexMmaImagePreview
  v-model:visible="visible"
  :image-src="src || ''"
  :image-alt="alt || ''"
/>
```

- Mount component này ở layout gốc `app/layouts/default.vue`.
- Khi đó, mọi page chỉ cần gọi `openPreview(src, alt)` mà không phải đặt component preview trong mỗi page.

> **Trong phạm vi kế hoạch hiện tại**, ta ưu tiên **cách đơn giản**: state cục bộ ở `news/[slug].vue`. Phương án Pinia + composable được mô tả sẵn để dễ mở rộng sau.

---

## 6. Kế hoạch test & tiêu chí hoàn thành

### 6.1. Test component `ApexMmaImagePreview`

1. Mount standalone với `visible = true`, `imageSrc` hợp lệ:
   - Kỳ vọng: `<n-image-preview>` hiển thị overlay và ảnh.
2. Thay đổi prop `visible` từ `false` -> `true`:
   - Kỳ vọng: overlay mở.
3. Đóng overlay từ UI của Naive UI (click close / vùng ngoài):
   - Kỳ vọng: gọi handler `@update:show`, emit `update:visible(false)` ra ngoài.
4. Truyền `imageSrc` rỗng:
   - Kỳ vọng: component không render preview, không lỗi.

### 6.2. Test tích hợp `/news/[slug]`

1. **Case cơ bản**:
   - Mở một bài có `newsDetail.image`.
   - Click vào ảnh cover.
   - Kỳ vọng: overlay preview của Naive UI xuất hiện, ảnh lớn hiển thị.
2. **Đóng overlay**:
   - Dùng cách đóng mặc định của `<n-image-preview>` (click vùng tối / nút close).
   - Kỳ vọng: overlay biến mất, `isCoverPreviewVisible` trở thành `false`.
3. **Bài không có ảnh cover**:
   - Vào bài không có `newsDetail.image` (nếu có data).
   - Kỳ vọng: không có ảnh cover, không mount component preview.
4. **Responsive**:
   - Test trên mobile & desktop.
   - Đảm bảo overlay hoạt động bình thường, không tràn.
5. **SSR/hydration**:
   - Hard reload trang chi tiết.
   - Mở/đóng preview vài lần.
   - Kỳ vọng: không có warning/error về SSR mismatch trong console.

### 6.3. Tiêu chí hoàn thành

- `ApexMmaImagePreview` hoạt động ổn định, API rõ ràng, dễ tái sử dụng.
- Trang `/news/[slug]` dùng component này để phóng to ảnh cover mà không phá vỡ logic hiện tại.
- Code tuân thủ:
  - Quy tắc CSS prefix `apex-mma-` (nếu có class mới).
  - Quy tắc dùng `NuxtImg` hoặc component ảnh phù hợp (ở đây sử dụng `<n-image-preview>` từ Naive UI, không dùng `<img>` thô trong page).
- Không có lỗi console sau khi thao tác mở/đóng preview.

---

## 7. Các bước triển khai cụ thể trong repo

1. **Tạo component `ApexMmaImagePreview`**
   - File: `app/components/common/ApexMmaImagePreview.vue`.
   - Cấu trúc:
     - `<template>`: render `<n-image-preview>` với `v-model:show="showRef"`, `:src="imageSrc"`, `@update:show="handleUpdateShow"`.
     - `<script setup lang="ts">`: định nghĩa `props`, `emits`, `showRef`, `watch` sync với `visible`.
     - `<style scoped>`: không bắt buộc, trừ khi cần custom nhẹ.

2. **Cập nhật `app/pages/news/[slug].vue`**
   - Import `ref` trong script.
   - Khai báo `isCoverPreviewVisible` và hàm `openCoverPreview`.
   - Thêm `@click="openCoverPreview"` vào wrapper ảnh cover.
   - Thêm component `<ApexMmaImagePreview ... />` ở cuối template.
   - Cập nhật SCSS `.apex-mma-news-detail-cover-wrap` với `cursor: zoom-in`.

3. **(Tuỳ chọn) Thiết kế phase 2 với Pinia/composable**
   - Tạo `stores/imagePreview.ts`, `useImagePreview.ts`, `ApexMmaGlobalImagePreview.vue` nếu muốn global preview.
   - Mount global preview ở `app/layouts/default.vue`.

4. **Chạy project & test manual**
   - `npm run dev`.
   - Truy cập `/news/[slug]`, test tất cả case ở mục 6.

5. **Commit** (khi tính năng ổn định)
   - Gợi ý message: `feat(ui): add reusable image preview component based on naive ui and integrate into news detail`.
