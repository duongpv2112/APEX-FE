Tiến độ Migration sang Nuxt 3

Ngày cập nhật: 2025-12-08

Tóm tắt những việc đã thực hiện (theo context & yêu cầu):

- Đã tạo nhánh: `nuxt-migrate`.
- Đã khởi tạo skeleton Nuxt 3 trong `nuxt-app/`.
- Đã cài các modules cơ bản và cập nhật `nuxt-app/nuxt.config.ts`.
- Đã scaffold một số plugin/composables/middleware ban đầu: `app-provider.client.ts`, `useToast.ts`, `useTheme.ts`, `middleware/auth.ts`.
- Đã port Header từ `src/components/layout/Header.vue` vào `nuxt-app/components/layout/Header.vue`.
- Đã tạo `nuxt-app/layouts/default.vue` và import Header.
- Đã scaffold provider dialog (client-only): `nuxt-app/plugins/dialog.client.ts`.
- Đã migrate store auth sang Pinia composition store: `nuxt-app/stores/auth.ts`.
- Đã scaffold API endpoints tối thiểu cho auth: `nuxt-app/server/api/auth.ts` (login/logout/session).
- Đã migrate store user sang nuxt-app/stores/user.ts.
- Đã scaffold provider toast (client-only): `nuxt-app/plugins/toast.client.ts`.
- Đã scaffold SEO composable: `nuxt-app/composables/useSiteMeta.ts`.
- Đã commit & push nhánh `nuxt-migrate` (theo conversation trước đó).
- Đã thêm types vào nuxt-app/tsconfig.json và cài @types/node.
- Đã chạy dev server và fix module resolution for styles (added nuxt-app/styles/main.scss and updated nuxt.config.ts).

Vấn đề/ghi chú kỹ thuật:

- Editor/TypeScript có thể báo nhiều cảnh báo như "Cannot find module '#app'" hay "Cannot find name 'useBody'", "ref"... Đây là vấn đề types/tsconfig — đã thêm types vào tsconfig và cài @types/node.
- Nuxt 4 đang được dùng, một vài module (e.g., @nuxt/image) báo không tương thích với Nuxt 4 — cần kiểm tra và nâng cấp các module hoặc thay thế.
- Auth endpoint hiện là scaffold mẫu (dùng fake token). Cần implement validation thật, bảo mật cookie (httpOnly, secure), CSRF, và kiểm tra server-side.

Các việc còn lại (đã lên kế hoạch):

- [ ] Migrate các Pinia stores còn lại (`src/store/*`) vào `nuxt-app/stores/` (đã migrate auth + user).
- [ ] Hoàn thiện auth SSR: validate credentials, sử dụng JWT/session thật, set secure HTTPOnly cookie, endpoints server-side an toàn.
- [ ] Tối ưu SEO: cấu hình `nuxt-schema-org`, sitemap/robots chi tiết, thiết lập canonical/hreflang khi cần.
- [ ] Chạy `npm run dev` trong `nuxt-app`, fix SSR/hydration warnings và lỗi build.
- [ ] Viết test tối thiểu: unit cho composables (useToast/useTheme), E2E cho luồng đọc blog và luồng auth/giỏ hàng.
- [ ] Cập nhật memory bank (`memory-bank/activeContext.md`, `progress.md`) và các plans liên quan.
- [ ] Khi bạn approve: commit & push các thay đổi còn lại lên `nuxt-migrate` và tạo Pull Request.

Lời khuyên cho việc tiếp theo:
- Kiểm tra compatibility của các module với Nuxt 4 (hoặc hạ Nuxt trả về 3.x nếu muốn giữ các module hiện tại).
- Hoàn thiện auth server-side và test bằng smoke tests.
- Tối ưu SEO & tạo PR khi mọi thứ ổn.
