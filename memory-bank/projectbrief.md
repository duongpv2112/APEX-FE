# projectbrief.md

## Tên dự án

APEX-FE (mã gốc: nuxt-app)

## Mục tiêu chính

- Xây dựng phần frontend cho sản phẩm APEX MMA — một ứng dụng web SSR dùng Nuxt (Nuxt 4 / Vue 3) để hiển thị thông tin, quản lý người dùng và giao tiếp với API server.
- Cung cấp trải nghiệm người dùng tối ưu: SEO tốt (server-side rendering), responsive, dễ bảo trì và mở rộng.

## Yêu cầu cốt lõi

- SSR với Nuxt 4 (ssr: true) để tối ưu SEO và performance.
- Sử dụng Vue 3, TypeScript (dự án có tsconfig), Pinia cho state management, Naive UI cho component library.
- Hệ thống composable (app/composables) và stores để tái sử dụng logic.
- CSS/SCSS có cấu trúc và biến toàn cục (app/assets/scss).
- Một số endpoint server-side nằm trong server/api (ví dụ auth) để xử lý authentication.

## Phạm vi

- Giao diện chính: trang chủ, about, header, layout mặc định.
- Các composable: SEO, theme, toast, site meta.
- Stores: auth, user.
- Backend nhỏ tích hợp qua server/api (ví dụ auth endpoints) — phần backend có thể dùng better-sqlite3.

## Các bên liên quan

- Product owner / Team phát triển frontend
- Backend/API team (khi cần đồng bộ endpoints)
- DevOps / Người đánh giá deploy và cấu hình runtime

## Ghi chú

Thông tin trên được rút ra tự động từ repository hiện tại (package.json, nuxt.config.ts, cấu trúc thư mục). Vui lòng kiểm tra và bổ sung chi tiết nếu cần.
