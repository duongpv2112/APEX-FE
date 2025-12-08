# Mở rộng: Hỗ trợ cấu trúc /app, plugins, middleware, types khi migrate sang Nuxt 3

Ngắn gọn: Có — cần đáp ứng. Các folder bạn mô tả (/app, /plugins, /middleware, /types) là phù hợp với Nuxt 3 và thực tế cần tận dụng để tổ chức logic toàn cục (layout, providers, state, config, middleware). Dưới đây là phân tích chi tiết, mapping và các bước cần làm khi migrate.

1) Vai trò /app trong Nuxt 3
- Nuxt 3 có file `app.vue` (root component), `error.vue` và `app.html` nếu cần. Folder `/app` trong dự án hiện tại có thể map trực tiếp:
  - /app/layout-frame (header/footer/sidebar/loading/toast/dialog) → di chuyển/hoặc giữ trong `components/` và sử dụng trong `layouts/default.vue` hoặc `app.vue`.
  - Logic nền tảng (app-level state, theme, i18n config) → đưa vào `composables/` (ví dụ `useAppState`, `useTheme`) và provider bằng `defineNuxtPlugin` để inject global.
  - Provider toàn cục: viết plugin (~/plugins/app-provider.client.ts / .server.ts hoặc chung) sử dụng `defineNuxtPlugin` để inject các context: $theme, $toast, $dialog, $appConfig.

2) Plugins
- Nuxt 3 plugin pattern phù hợp để register:
  - Third-party libs (mixin, i18n init, analytics)
  - Global providers (toast, modal manager, auth wrapper)
- Ví dụ plugin:
  - `~/plugins/provider.ts`
    - export default defineNuxtPlugin(nuxtApp => { nuxtApp.provide('toast', toastInstance) })
  - Dùng `const toast = useNuxtApp().$toast` hoặc `const { $toast } = useNuxtApp()` trong setup.
- Lưu ý SSR: tách client-only khi phụ thuộc DOM (suffixed .client.ts) và server-only nếu cần.

3) Middleware
- Mapping router guards.js → Nuxt middleware:
  - `src/router/guards.js` logic control → `middleware/auth.global.ts` hoặc `middleware/auth.ts` và sử dụng `defineNuxtRouteMiddleware`.
  - Middleware có thể chạy server-side trước render; để SSR-check token, gọi `/server/api/session` trong middleware.
- Ví dụ:
  - `// middleware/auth.ts`
    - export default defineNuxtRouteMiddleware(async (to) => { const user = useAuthStore(); if (to.meta.requiresAuth && !user.logged) return navigateTo('/login') })

4) Types (TypeScript)
- Nếu dùng TS: tạo `types/` với interfaces cho `AppConfig`, `User`, `Product`, `Theme`.
- Nếu không dùng TS: vẫn giữ `types/` để chứa JSDoc typedefs hoặc d.ts cho IDE.
- Đăng ký path trong `tsconfig.json` nếu cần.

5) Providers toàn cục & state
- Các provider (dark mode, config, session) nên implement như:
  - Composables: `useTheme()`, `useAppConfig()`, `useToast()`, `useDialog()` — giữ interface giống hiện tại để giảm thay đổi code.
  - Nuxt plugin inject: expose bằng `nuxtApp.provide('theme', themeApi)` và `useNuxtApp().$theme`.
  - Pinia store cho trạng thái chung (auth, loading global) — dùng `@pinia/nuxt`.

6) Mapping UI khung (header/footer/sidebar/loading bar/toast/dialog)
- Giữ các component hiện tại trong `components/layout/` và dùng trong `layouts/default.vue` hoặc `app.vue`.
- Loading bar: implement via plugin + composable, hoặc dùng nuxt `app.router` hooks để bật/tắt.
- Toast/Dialog: manager singleton inject qua plugin; đảm bảo client-only render cho DOM portals.

7) SSR & hydration caveats
- Các provider cần SSR-safe: tránh trạng thái phụ thuộc localStorage trong server render. Sử dụng cookie hoặc server-session cho auth.
- Nếu cần restore client-only state (ví dụ theme từ localStorage), đọc trong `onMounted` hoặc plugin `.client.ts`.

8) Tổ chức files gợi ý trong Nuxt 3
- /app (tập trung file cấu hình UI toàn cục) → nội dung được phân rã như sau:
  - app.vue (nếu cần) — đặt global layout wrapper
  - layouts/default.vue — import Header/Footer/Sidebar từ components/layout/
  - components/layout/Header.vue, Footer.vue, Sidebar.vue
- /plugins
  - plugins/app-provider.client.ts (toast, dialog)
  - plugins/i18n.ts
  - plugins/axios.ts (nếu cần)
- /middleware
  - middleware/auth.ts
  - middleware/guest.ts
- /composables
  - useAuth.ts, useTheme.ts, useToast.ts, useAppConfig.ts
- /server/api
  - api endpoints for auth/session/cart
- /types
  - index.d.ts, app.d.ts, product.d.ts

9) Những thay đổi cần bổ sung vào kế hoạch migrate
- Thêm bước chuyển/thiết kế providers + plugins (bao gồm phân tách client/server)
- Thêm middleware migration task (map guards -> middleware)
- Thêm task tạo composables tương thích Nuxt (vẫn giữ API cũ để giảm thay đổi)
- Đảm bảo Type declarations/tsconfig nếu dùng TypeScript
- Thêm kiểm thử SSR cho providers (smoke test login, theme persistence, toast)

10) Next steps đề xuất (cụ thể, hành động)
- [ ] Khảo sát /app hiện tại: liệt kê các providers, component toàn cục, logic phụ thuộc DOM
- [ ] Thiết kế plugin API (danh sách inject: $toast, $dialog, $theme, $config)
- [ ] Viết composables wrappers (useToast, useDialog, useTheme)
- [ ] Migrate router guards -> middleware
- [ ] Viết plugin `.client.ts` cho DOM-only libs
- [ ] Test SSR hydration & restore client state

Nếu bạn muốn, tôi sẽ:
- Tạo một file mở rộng trong plans (đã tạo file này), hoặc
- Bắt đầu tạo skeleton Nuxt 3 và scaffold plugin + middleware + composables theo cấu trúc trên (yêu cầu bạn xác nhận để chạy các lệnh tạo nhánh và cài package).

---

Ghi chú: tôi đã thêm nội dung này vào `plans/nuxt3-migration-seo-plan-extended.md`. Hãy cho biết bạn muốn tôi bắt đầu bước nào tiếp theo (tạo plugin scaffold, migrate middleware, hoặc khởi tạo nhánh nuxt-migrate).
