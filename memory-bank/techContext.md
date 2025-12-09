# techContext.md

## Ngữ cảnh công nghệ & thiết lập phát triển (APEX-FE)

### Ngôn ngữ & Framework

- Vue 3
- Nuxt 4 (Nitro) với SSR bật (ssr: true)
- TypeScript support (dự án có tsconfig.json)

### Thư viện chính & Dependencies

- Dependencies:
  - nuxt ^4.2.1
  - vue ^3.5.25
  - vue-router ^4.6.3
  - naive-ui ^2.43.2 (UI library)
  - better-sqlite3 ^12.5.0 (được cài, có thể dùng bởi server-side nếu cần)
  - sass ^1.95.0 (SCSS)

- DevDependencies:
  - @nuxt/content
  - @nuxtjs/robots
  - @nuxtjs/sitemap
  - @pinia/nuxt
  - @types/node
  - @vueuse/nuxt
  - nuxt-schema-org
  - vite-tsconfig-paths

### Thiết lập môi trường phát triển

- Chạy local dev: npm install && npm run dev (mở http://localhost:3000)
- Build: npm run build; Preview: npm run preview
- Nuxt config: alias @ -> ./app, css chính tại app/assets/scss/main.scss
- Runtime config: runtimeConfig được khai báo trống (nuxt.config.ts) — cần bổ sung public config (siteUrl, API endpoints) nếu cần.

### Ràng buộc kỹ thuật

- SSR: composables/stores phải tương thích với SSR (tránh dùng window trực tiếp trong code chạy trên server).
- CSS naming rule (apex-mma- prefix) phải được tuân thủ để tránh xung đột.
- Auth hiện tại là scaffold giả lập (cookie 'auth_token') — cần thay thế bằng flow bảo mật thực tế.

### Phụ thuộc & cách quản lý

- Sử dụng npm để quản lý package (package.json hiện đang cấu hình)
- Khuyến nghị bổ sung file .env.example với các biến môi trường: SITE_URL, API_BASE, NODE_ENV

### Quy tắc & công cụ

- Coding style: TypeScript, SFC (Single File Components) với <script setup lang="ts">.
- SCSS dùng biến và mixins trong app/assets/scss.
- Tuân thủ quy tắc CSS prefix apex-mma-.
- Nếu cần tests: thêm Vitest hoặc Jest, và cài husky/CI để kiểm soát chất lượng.

## Ghi chú

Tài liệu này được tạo tự động từ các file cấu hình và package.json. Nếu muốn, tôi có thể thêm file env.example hoặc cập nhật runtimeConfig trong nuxt.config.ts.
