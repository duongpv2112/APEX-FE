# progress.md

## Tiến độ dự án & trạng thái hiện tại (cập nhật tự động)

- Đã hoàn thành:
  - Scaffold Nuxt 4 (SSR) với cấu trúc app/ (layouts, components, composables, stores).
  - Thêm server/api/auth.ts với endpoints giả lập (login, logout, session).
  - Cấu hình nuxt.config.ts với alias @, main.scss và module @vueuse/nuxt.
  - Tạo composables: useSeoMeta, useSiteMeta, useTheme; useToast đang comment.
  - Tạo components/layout/Header.vue và layout mặc định.
  - Cài đặt dependencies cơ bản trong package.json (Naive UI, Pinia, schema-org, robots, sitemap).

- Còn lại (todo):
  - Hoàn thiện flow auth thực tế (thay cookie giả bằng backend thực hoặc xác thực an toàn).
  - Chuẩn hoá runtime public config (siteUrl, API_BASE) trong nuxt.config.ts hoặc .env.example.
  - Hoàn thiện useToast và tích hợp hệ thống toast global.
  - Thêm README project-specific và hướng dẫn dev/build chi tiết.
  - Thiết lập CI/CD và tests cơ bản.

- Trạng thái hiện tại:
  - Dự án ở trạng thái starter/thử nghiệm, sẵn sàng để phát triển các feature UI và tích hợp API thực.

- Vấn đề tồn đọng:
  - Auth hiện là giả lập.
  - Thiếu file env.example và cấu hình runtime public.
  - Một số composable chưa hoàn thiện (ví dụ useToast comment).

- Lịch sử quyết định:
  - Chọn Nuxt 4 + SSR cho SEO.
  - Sử dụng tiền tố CSS apex-mma- (tham chiếu từ .clinerules).

## Ghi chú

- Tài liệu này được sinh tự động từ phân tích source. Nếu bạn muốn tôi mở PR sửa file này hoặc tiếp tục cập nhật memory-bank với thông tin chi tiết hơn, cho tôi biết.
