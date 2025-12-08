# Tiếp tục task: Migrate sang Nuxt 3 — Next steps

Mục tiêu: Tiếp tục quá trình migrate sang Nuxt 3 trên nhánh `nuxt-migrate` đã tạo — scaffold providers, port components/layouts, migrate middleware/store, tích hợp SSR-auth, kiểm thử, và chuẩn bị PR để merge.

Checklist (chi tiết các bước sẽ thực hiện tiếp theo):

- [x] Tạo nhánh `nuxt-migrate`
- [x] Khởi tạo skeleton Nuxt 3 (thư mục `nuxt-app`)
- [x] Cài modules cơ bản và cập nhật `nuxt.config.ts` (content, pinia, image, sitemap, robots, schema-org)
- [x] Scaffold plugin cơ bản, composables, middleware (đã tạo: `app-provider`, `useToast`, `useTheme`, `middleware/auth`)
- [ ] Scaffold providers bổ sung (toast, dialog) — client-only nếu cần DOM
- [ ] Tạo `layouts/default.vue` và port Header/Footer/Sidebar từ `src/components/layout/`
- [ ] Migrate router guards (`src/router/guards.js`) thành Nuxt middleware (`nuxt-app/middleware/`)
- [ ] Migrate Pinia stores (`src/store/*`) vào `nuxt-app/stores/` và tích hợp `@pinia/nuxt`
- [ ] Thiết lập auth SSR: tạo `nuxt-app/server/api/auth` endpoints, chuyển token sang cookie HTTPOnly
- [ ] Tối ưu SEO: cấu hình sitemap/robots, thiết lập `useSiteMeta` và schema.org cho blog/product
- [ ] Chạy `npm run dev` trong `nuxt-app`, fix SSR/hydration warnings và lỗi build
- [ ] Viết test tối thiểu: unit cho composables, E2E cho luồng đọc blog + giỏ hàng
- [ ] Commit các thay đổi còn lại và push lên `nuxt-migrate` -> Tạo Pull Request
- [ ] Go-live checklist: smoke tests, sitemap, canonical, redirect (nếu có), rollback plan

Ghi chú:
- Tôi đã scaffold một phần (plugin, composables, middleware) và push branch `nuxt-migrate` lên GitHub.
- Nếu bạn đồng ý, tôi sẽ tiếp tục tự động scaffold providers, port layout, migrate stores và chạy dev local để kiểm tra, commit/push các thay đổi và mở PR.

Xác nhận bước tiếp theo bạn muốn tôi thực hiện (tôi sẽ tiếp tục theo lựa chọn bạn trả lời):
- A: Tiếp tục tự động scaffold & commit/push (recommend)
- B: Chỉ scaffold files (không commit)
- C: Dừng chờ bạn kiểm tra
