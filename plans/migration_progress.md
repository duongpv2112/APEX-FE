Tiến độ migrate sang Nuxt 3 (tóm tắt cập nhật)

Hiện trạng: đã soạn kế hoạch chính và phần mở rộng; đã tạo nhánh `nuxt-migrate`; đã khởi tạo skeleton Nuxt 3 trong thư mục `nuxt-app`; đã scaffold một số file cơ bản (plugin, composables, middleware); đã cài các module đề xuất và cập nhật nuxt.config.ts; đã commit và push nhánh `nuxt-migrate`.

- [x] Soạn kế hoạch chi tiết Nuxt 3
- [x] Tạo file plans/nuxt3-migration-seo-plan.md với nội dung kế hoạch
- [x] Xác nhận người dùng mở/duyệt file và phản hồi nếu cần chỉnh sửa
- [x] Phân tích cấu trúc /app, plugins, middleware, types và đề xuất thích ứng cho Nuxt 3
- [x] Thêm phần mở rộng vào plans/nuxt3-migration-seo-plan-extended.md
- [x] Người dùng duyệt phần mở rộng
- [x] Tạo nhánh nuxt-migrate
- [x] Khởi tạo skeleton Nuxt 3 (npm init nuxt@latest) — hoàn tất (thư mục: nuxt-app)
- [x] Scaffold folder cơ bản: plugins/, middleware/, composables/, types/, layouts/, pages/ — (đã tạo plugin `plugins/app-provider.client.ts`, middleware `middleware/auth.ts`, composables `useToast.ts`, `useTheme.ts`)
- [x] Cài modules: @pinia/nuxt, @nuxt/content, @nuxt/image-edge, @nuxtjs/robots, @nuxtjs/sitemap, nuxt-schema-org, @vueuse/nuxt
- [x] Cập nhật nuxt.config.ts (modules, routeRules, runtimeConfig)
- [ ] Scaffold plugin providers bổ sung
- [ ] Di chuyển components/layouts cơ bản (Header, Footer, Sidebar) và tạo layouts/default.vue
- [ ] Migrate router guards -> middleware (map `src/router/guards.js`)
- [ ] Migrate Pinia store / tích hợp `@pinia/nuxt`
- [ ] Kiểm tra build cục bộ, fix lỗi SSR/hydration
- [ ] Commit scaffold & push nhánh nuxt-migrate (đã push cơ bản)

Các hành động tiếp theo tôi sẽ thực hiện nếu bạn đồng ý:
- Scaffold thêm providers (toast, dialog) và client-only plugin; migrate router guards; port Header/Footer vào layouts/default.vue; tích hợp Pinia stores; chạy `npm run dev` trong `nuxt-app` để kiểm tra.

Bạn muốn tôi tiếp tục tự động thực hiện các bước trên không? (có thể tốn thêm vài phút để cài và chạy)
