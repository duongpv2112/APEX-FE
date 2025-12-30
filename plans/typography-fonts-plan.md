# Kế hoạch chuẩn hoá Typography (3 fonts) – APEX-FE

## 1) Mục tiêu

Project cần sử dụng 3 font với vai trò rõ ràng và có **class dùng chung (global)** để tái sử dụng khi dựng UI trên **toàn bộ website**:

- **Tiêu đề (Heading):** `Be Vietnam Pro` **700**
- **Nội dung (Body):** `Inter` **400**
- **Quote / Highlight:** `Roboto Slab` **400**

Kế hoạch này chuẩn hoá theo hướng:
- Load font đúng cách (SSR-friendly, tối ưu performance)
- Tạo **SCSS variables** làm “single source of truth”
- Tạo **utility classes** có prefix `apex-mma-` (theo rule `.clinerules/css-naming-conventions.md`)

---

## 2) Deliverables

1. Cấu hình load fonts (Google Fonts) cho 3 font + đúng weight cần dùng.
2. Chuẩn hoá biến SCSS cho font family & font weight.
3. Tạo các class typography dùng chung:
   - Heading (tiêu đề)
   - Body (nội dung)
   - Quote/Highlight
   - (Tuỳ chọn) set size theo hệ thống hiện có: sm/base/lg.
4. Tài liệu ngắn (đây là file) + checklist kiểm thử.

---

## 3) Success criteria (tiêu chí hoàn thành)

- Site load đủ 3 font và render đúng:
  - Tiêu đề dùng Be Vietnam Pro 700
  - Nội dung dùng Inter 400
  - Quote dùng Roboto Slab
- Không vi phạm quy tắc prefix class: **tất cả class mới phải bắt đầu bằng `apex-mma-`**
- Không tạo style rải rác; các biến và class dùng chung nằm trong SCSS global.

---

## 4) Ràng buộc / Lưu ý theo codebase

- Global SCSS đang được load qua: `nuxt.config.ts -> css: ["@/assets/scss/main.scss"]`.
- Font base hiện tại trong `app/assets/scss/_variables.scss`:
  - `$font-family-base: 'Inter', sans-serif;`
- Trong code có dấu vết font khác (ví dụ `Montserrat` trong `app/pages/index.vue`). Khi chuẩn hoá typography, cần audit dần để tránh “loạn font”.

---

## 5) Phương án load fonts (khuyến nghị)

### Option A (Khuyến nghị): Thêm `<link>` Google Fonts trong `nuxt.config.ts` (head)
**Ưu điểm:** SSR-friendly, không phụ thuộc SCSS `@import`, dễ tối ưu preload/preconnect.

Thêm vào `app.head` (hoặc `head`) trong `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?' +
            'family=Be+Vietnam+Pro:wght@700&' +
            'family=Inter:wght@400&' +
            'family=Roboto+Slab:wght@400&' +
            'display=swap'
        }
      ]
    }
  }
})
```

> Ghi chú: quote/highlight chốt dùng **Roboto Slab 400**.

### Option B: Import trong SCSS (`main.scss`)
**Không khuyến nghị** cho dự án SSR dài hạn (vì mix concerns vào CSS), nhưng vẫn chạy:

```scss
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700&family=Inter:wght@400&family=Roboto+Slab:wght@400&display=swap');
```

---

## 6) Thiết kế SCSS variables (single source of truth)

### 6.1. Cập nhật `app/assets/scss/_variables.scss`

Đề xuất tách rõ 3 nhóm font:

```scss
// Font families
$apex-mma-font-family-body: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
$apex-mma-font-family-heading: 'Be Vietnam Pro', $apex-mma-font-family-body;
$apex-mma-font-family-quote: 'Roboto Slab', 'Times New Roman', serif;

// Font weights
$apex-mma-font-weight-body: 400;
$apex-mma-font-weight-heading: 700;
$apex-mma-font-weight-quote: 400;
```

> Lưu ý: hiện `body` đang set `font-family: $font-family-base !important;`. Có thể giữ `$font-family-base` như alias:
```scss
$font-family-base: $apex-mma-font-family-body;
```

---

## 7) Tạo class dùng chung (utilities) – tuân thủ prefix `apex-mma-`

### 7.1. Vị trí đặt code

Khuyến nghị tạo thêm file partial để dễ maintain:

- `app/assets/scss/_typography.scss`
- Và import trong `app/assets/scss/main.scss`:
  ```scss
  @use "@/assets/scss/_typography.scss" as *;
  ```

### 7.2. Bộ class tối thiểu cần có (global utilities)

Naming được chốt theo hướng ngắn gọn, dùng chung toàn site:

- `apex-mma-title` (tiêu đề)
- `apex-mma-text` (nội dung/body)
- `apex-mma-quote-text` (quote/highlight)

```scss
// Tiêu đề / Title
.apex-mma-title {
  font-family: $apex-mma-font-family-heading;
  font-weight: $apex-mma-font-weight-heading;
}

// Nội dung / Content
.apex-mma-text {
  font-family: $apex-mma-font-family-body;
  font-weight: $apex-mma-font-weight-body;
}

// Quote / Highlight
.apex-mma-quote-text {
  font-family: $apex-mma-font-family-quote;
  font-weight: $apex-mma-font-weight-quote;
}
```

Gợi ý cách dùng (kết hợp với utility size đang có):

```html
<h2 class="apex-mma-title apex-mma-text-lg">Tiêu đề block</h2>
<p class="apex-mma-text apex-mma-text-base">Nội dung…</p>
<blockquote class="apex-mma-quote-text apex-mma-text-base apex-mma-text-muted">Trích dẫn…</blockquote>
```

### 7.3. Gợi ý mở rộng (tuỳ chọn, nếu cần nhiều “role” hơn)

Nếu về sau cần thêm các vai trò chữ khác (không gắn với H1/H2/H3), có thể bổ sung các class theo “role”, ví dụ:

```scss
.apex-mma-subtitle { @extend .apex-mma-title; font-weight: 700; }
.apex-mma-caption  { @extend .apex-mma-text;  font-size: $font-size-sm; }
.apex-mma-highlight-text { @extend .apex-mma-quote-text; }
```

---

## 8) Kế hoạch triển khai theo bước (đề xuất)

1. **Chọn phương án load fonts** (Option A khuyến nghị).
2. Thêm cấu hình load fonts vào `nuxt.config.ts`.
3. Chuẩn hoá biến font trong `app/assets/scss/_variables.scss`.
4. Tạo `app/assets/scss/_typography.scss` và thêm các utility classes.
5. Import `_typography.scss` vào `main.scss`.
6. **Audit nhanh** các nơi đang set font riêng (ví dụ Montserrat trong `app/pages/index.vue`) và thay thế dần bằng class chuẩn.
7. Verify trên browser + Lighthouse/DevTools.

---

## 9) Checklist kiểm thử

- [ ] Mở trang chủ, kiểm tra `Computed -> font-family` của:
  - Title sample (`.apex-mma-title`) là **Be Vietnam Pro**, weight **700**
  - Text/body (`body` hoặc `.apex-mma-text`) là **Inter**, weight **400**
  - Quote (`.apex-mma-quote-text`) là **Roboto Slab**, weight **400**
- [ ] Hard reload nhiều lần: font không bị FOUT/FOIT quá nặng (display=swap).
- [ ] Build/SSR: `npm run build` không lỗi.
- [ ] Không có class mới vi phạm prefix `apex-mma-`.

---

## 10) Ghi chú triển khai

- Roboto Slab chốt **400**.
- Không tạo class theo `h1/h2/h3`; ưu tiên class global theo **role nội dung** (`apex-mma-title / apex-mma-text / apex-mma-quote-text`) và kết hợp utilities size hiện có (`apex-mma-text-sm/base/lg`).
