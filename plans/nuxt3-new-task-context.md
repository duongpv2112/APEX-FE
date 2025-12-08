Context cho Task mới — Migrate sang Nuxt 3 (tổng hợp cuộc hội thoại đến hiện tại)

1) Current Work (đã làm trước khi tạo task mới)
- Soạn kế hoạch chi tiết chuyển từ dự án Vue+Vite sang Nuxt 3 tối ưu SEO (plans/nuxt3-migration-seo-plan.md).
- Ghi nhớ cấu trúc project và cách mapping (plans/nuxt3-migration-seo-plan-extended.md).
- Tạo nhánh git `nuxt-migrate`.
- Khởi tạo skeleton Nuxt 3 bằng `npm init nuxt@latest` tạo thư mục `nuxt-app/`.
- Cài các module chính: @pinia/nuxt, @nuxt/content, @nuxt/image-edge, @nuxtjs/robots, @nuxtjs/sitemap, nuxt-schema-org, @vueuse/nuxt.
- Scaffold một số file cơ bản trong `nuxt-app/`:
  - plugins/app-provider.client.ts
  - composables/useToast.ts
  - composables/useTheme.ts
  - middleware/auth.ts
- Cập nhật `nuxt-app/nuxt.config.ts` với modules, routeRules, runtimeConfig, css.
- Commit & push nhánh `nuxt-migrate` (đã push lên remote).

2) Key Technical Concepts
- Nuxt 3 features: SSR, SSG, ISR (routeRules), Nitro server, plugins, auto-import composables, server/api routes.
- SEO: useSeoMeta/useHead, sitemap, robots, schema.org, OG images, canonical, hreflang (i18n).
- State: Pinia via @pinia/nuxt.
- Authentication: server-side cookie HTTPOnly, server/api endpoints for auth/session.
- Static content: @nuxt/content for Markdown blog.
- Styling: SCSS global import, enforce prefix apex-mma- via Stylelint.
- Providers & plugins: inject $toast, $dialog, $theme using defineNuxtPlugin.

3) Relevant Files (created/modified)
- plans/nuxt3-migration-seo-plan.md
- plans/nuxt3-migration-seo-plan-extended.md
- plans/migration_progress.md
- plans/nuxt3-next-task.md
- nuxt-app/nuxt.config.ts (updated)
- nuxt-app/package.json (modules added)
- nuxt-app/plugins/app-provider.client.ts
- nuxt-app/composables/useToast.ts
- nuxt-app/composables/useTheme.ts
- nuxt-app/middleware/auth.ts
- nuxt-app/ (full skeleton created by create-nuxt)

4) Problem Solving / Issues encountered
- TypeScript editor warnings: missing types for '#app' imports and process types; recommend adding @types/node or switching plugin/composables to .ts with types or adding tsconfig types.
- Need to port existing router guards (src/router/guards.js) to Nuxt middleware.
- Auth flow must be made SSR-friendly: move token to HTTPOnly cookie and implement server/api endpoints.
- Ensure CSS naming convention apex-mma- is enforced via Stylelint.

5) Pending Tasks & Next Steps (quoted from recent conversation)
- Pending tasks are listed in plans/nuxt3-next-task.md. Key next steps:
  - "Scaffold providers bổ sung (toast, dialog) — client-only nếu cần DOM"
  - "Tạo layouts/default.vue và port Header/Footer/Sidebar từ src/components/layout/"
  - "Migrate router guards (src/router/guards.js) thành Nuxt middleware (nuxt-app/middleware/)"
  - "Migrate Pinia stores (src/store/*) vào nuxt-app/stores/ và tích hợp @pinia/nuxt"
  - "Thiết lập auth SSR: tạo nuxt-app/server/api/auth endpoints, chuyển token sang cookie HTTPOnly"
  - "Tối ưu SEO: cấu hình sitemap/robots, thiết lập useSiteMeta và schema.org cho blog/product"
  - "Chạy npm run dev trong nuxt-app, fix SSR/hydration warnings và lỗi build"

6) Commands useful to continue work
- git checkout nuxt-migrate
- cd nuxt-app
- npm run dev
- npm run build
- git add . && git commit -m "..." && git push

---

Sẵn sàng tạo task mới với context trên. Bạn có muốn tôi khởi tạo task mới bây giờ không?
