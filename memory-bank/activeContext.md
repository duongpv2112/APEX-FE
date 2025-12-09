# activeContext.md

## Bối cảnh hoạt động hiện tại

- Trạng thái hiện tại: Đã có một scaffold frontend Nuxt 4 (SSR=true) với cấu trúc cơ bản: layouts, components, composables, stores, assets, và một vài API endpoint tối thiểu trong server/api (ví dụ auth). Dự án sẵn sàng để phát triển tính năng UI và tích hợp API thực.

- Thay đổi gần nhất:
  - Thêm endpoint server/api/auth.ts cung cấp các route giả lập: /api/auth/login, /api/auth/logout, /api/auth/session.
  - Cấu hình nuxt.config.ts: bật SSR, alias @ -> ./app, thêm css chính và module @vueuse/nuxt.
  - Thư mục composables chứa useSeoMeta, useSiteMeta, useTheme, useToast (commented) để quản lý metadata, theme và toasts.
  - Component Header.vue với tên class tuân thủ quy tắc đặt tên apex-mma- (đã có ví dụ naming convention).
  - Cấu trúc SCSS cơ bản đặt tại app/assets/scss với biến, mixins và main.scss.

- Kế hoạch tiếp theo (ngắn hạn):
  1. Xác định & chuẩn hoá runtime public config (siteUrl, theme defaults) trong nuxt runtimeConfig hoặc .env.
  2. Triển khai flow xác thực thực tế: kết nối với backend thực hoặc hoàn thiện logic lưu/đọc token (hiện đang dùng cookie giả lập).
  3. Hoàn thiện các composable (useToast cung cấp API rõ ràng), và tích hợp Naive UI cho các thành phần tương tác nếu cần.
  4. Viết tài liệu nhỏ về cách chạy dev/build, patterns CSS (áp dụng tiền tố apex-mma-), và cách thêm route/APIs mới.
  5. Thêm tests cơ bản / smoke tests nếu cần.

- Kế hoạch tiếp theo (dài hạn):
  - Xây dựng dashboard quản trị (nếu có), pages cho quản lý người dùng, và hệ thống roles/permissions.
  - Tối ưu hoá SEO: schema.org (nuxt-schema-org đã cài), sitemap, robots (gói đã có trong devDependencies).
  - Chuẩn hoá CI/CD để deploy (build, lint, test).

- Quyết định & cân nhắc quan trọng:
  - SSR được bật (ssr: true) để ưu tiên SEO và performance; mọi composable cần đảm bảo hoạt động trong môi trường SSR (sử dụng useState, useRuntimeConfig, v.v.).
  - Sử dụng cookie HTTPOnly cho auth token (server API hiện tạo cookie giả lập). Nếu cần SPA token, cân nhắc bảo mật XSS vs CSRF.
  - Quy tắc đặt tên CSS: mọi class phải bắt đầu bằng "apex-mma-" (xem .clinerules/css-naming-conventions.md). Khi thêm CSS/SCSS mới phải tuân thủ.

- Bài học & insight:
  - Repository là một starter Nuxt tối giản nhưng đã bố trí các thành phần cần thiết để mở rộng: composables, stores, server/api.
  - Nhiều file là scaffold/placeholder (ví dụ useToast bị comment); cần hoàn thiện để phục vụ UX.
  - Cần thêm README project-specific, cấu hình env.example và checklist deploy.

## Ghi chú

Tài liệu này được tạo tự động từ phân tích mã nguồn hiện tại. Nếu bạn muốn tôi viết các thay đổi trực tiếp vào file tiến độ (progress.md) hoặc áp dụng cập nhật khác trong memory-bank, hãy cho biết tiếp theo.
