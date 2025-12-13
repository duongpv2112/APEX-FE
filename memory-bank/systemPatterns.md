# systemPatterns.md

## Mẫu kiến trúc hệ thống & quyết định kỹ thuật (APEX-FE)

### Kiến trúc tổng quan

- Frontend SSR: Nuxt 4 (Nitro) chạy SSR để phục vụ HTML cho client, tối ưu SEO.
- Module server-side tối giản (server/api) cho các endpoints nhẹ (hiện có `GET /api/user` mock profile). Nitro/h3 dùng để xử lý request.
- Frontend code đặt trong thư mục /app: components, layouts, pages (Nuxt Page Router), composables, stores.
- Assets bao gồm SCSS (app/assets/scss) và hình ảnh tĩnh (public, app/assets/images).

### Mẫu thiết kế chính

- Composables: logic tái sử dụng (useSeoMeta, useSiteMeta, useTheme, useToast).
- Store (Pinia style via @pinia/nuxt): stores/auth.ts, stores/user.ts (scaffold có sẵn).
- Component-based UI: components/layout/Header.vue tuân thủ naming convention apex-mma-.
- Server API: Ngắn gọn, hiện mock user profile qua `server/api/user.get.ts` (GET `/api/user`). Nếu bổ sung auth sau, cân nhắc cookie HTTPOnly cho security.

### Quan hệ thành phần

- Pages -> Layouts -> Components (Header, shared components)
- Pages sử dụng composables để thiết lập meta và trạng thái (useSeoMeta, useSiteMeta)
- Stores chứa state (ví dụ `stores/user.ts` quản lý profile), được component và composable sử dụng
- server/api cung cấp các route backend nhỏ (ví dụ `GET /api/user`) để mock dữ liệu phục vụ UI/SSR

### Quyết định kỹ thuật then chốt

- SSR bật (ssr: true) để ưu tiên SEO.
- Sử dụng cookie HTTPOnly cho auth token (server-side). Nếu cần SPA token, cân nhắc thay đổi thiết kế bảo mật.
- Tên class CSS cần có tiền tố `apex-mma-` (xem .clinerules/css-naming-conventions.md) để tránh xung đột.
- Chọn Naive UI (đã cài trong dependencies) để tiết kiệm thời gian xây dựng UI nếu cần.
- Nuxt modules: @vueuse/nuxt, nuxt-schema-org (devDependency) hỗ trợ meta/schema.

### Luồng triển khai chính

1. Dev: npm install -> npm run dev (Nuxt 4).
2. Xây dựng features: thêm pages, components; sử dụng composables + stores.
3. Tích hợp API thực: kết nối với backend hoặc mở rộng server/api.
4. Test & tối ưu: kiểm tra SSR, meta tags, sitemap, robots.
5. CI/CD: build -> preview -> deploy.

## Ghi chú

Tài liệu trên được sinh tự động từ cấu trúc code hiện tại. Nếu có quyết định kiến trúc khác (ví dụ micro-frontends, BFF tách rời), hãy cập nhật phần này.
