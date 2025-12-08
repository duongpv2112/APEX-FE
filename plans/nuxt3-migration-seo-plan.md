# Kế hoạch nâng cấp lên Nuxt 3 tối ưu SEO (Blog + E‑commerce nhẹ)

Tài liệu này trình bày chiến lược, kiến trúc, các bước migrate, SEO, kiểm thử, triển khai và rủi ro/rollback khi chuyển dự án hiện tại (Vue + Vite) sang Nuxt 3 với mục tiêu SEO-first, phục vụ blog và mở rộng e‑commerce nhẹ.

---

## 1) Mục tiêu & nguyên tắc
- Mục tiêu: Tối ưu SEO (SSR/SSG/ISR), hiệu năng, trải nghiệm, sẵn sàng cho nội dung blog và e‑commerce.
- Nguyên tắc:
  - Tách bạch content (blog) và dữ liệu sản phẩm (e‑com) để dễ mở rộng và cache.
  - Ưu tiên SSG/ISR cho trang tĩnh (blog), SSR/SWR cho trang động (product, cart/checkout).
  - Chuẩn hóa CSS: toàn bộ selector class/id phải có tiền tố `apex-mma-` (thiết lập Stylelint để enforce).

## 2) Kiến trúc Nuxt 3 dự kiến
- Rendering:
  - Blog: SSG + ISR (pre-render toàn bộ bài; revalidate theo chu kỳ).
  - E‑com: SSR + SWR/Cache ngắn cho product list/detail; Cart/Checkout thuần SSR.
- Modules/Plugins đề xuất:
  - `@nuxt/content` (blog Markdown + search cơ bản)
  - `@pinia/nuxt` (state management)
  - `@nuxtjs/sitemap` + `@nuxtjs/robots` (SEO crawl)
  - `@nuxtjs/i18n` (nếu cần đa ngôn ngữ; xuất `hreflang`)
  - `@nuxt/image` (tối ưu ảnh)
  - `nuxt-schema-org` + `useSeoMeta` (structured data + meta)
  - `@vueuse/nuxt` (tiện ích frontend)
  - `ofetch` hoặc `$fetch` (thay/bao axios, SSR-friendly)
- Cấu trúc thư mục:
  - `app.vue`, `nuxt.config.ts`
  - `pages/` (thay thế router thủ công bằng file-based routing)
  - `layouts/` (map từ src/layouts)
  - `components/` (map từ src/components)
  - `server/api/` (API trung gian, auth, proxy, webhook)
  - `composables/` (useAuth, useTheme, useApi, useSiteMeta, …)
  - `content/` (bài blog `.md`)
  - `assets/` (scss, images cần xử lý), `public/` (tĩnh)

## 3) Lộ trình migrate (theo phần)
- Router → Pages:
  - Chuyển các route từ `src/router/*` thành file-based trong `pages/`.
  - `guards.js` → `route middleware` (`defineNuxtRouteMiddleware`), meta auth → middleware + `useAuth`.
- Store (Pinia):
  - Dùng `@pinia/nuxt`, auto-import `defineStore`. Di chuyển store sang `stores/` hoặc giữ trong `src/store` rồi cấu hình tương ứng.
- API layer:
  - Thay `axiosInstance` bằng `$fetch`/`ofetch`, gom tại `composables/useApi.ts` dùng `useRuntimeConfig().public.apiBase`.
  - Nếu giữ axios: tạo plugin `~/plugins/axios.ts`, inject và chỉnh interceptor SSR-safe.
  - Auth refresh & trao đổi token nên đặt ở `server/api/*` và dùng cookie `HTTPOnly`.
- Auth:
  - Chuyển từ `localStorage` token → cookie `HTTPOnly` (SSR-friendly).
  - Flow: `POST /api/auth/login` → setCookie(access/refresh); client giữ state nhẹ trong Pinia.
  - Middleware: bảo vệ `/admin`, `/account` bằng route middleware + server-side auth check.
- Styles & CSS:
  - Giữ SCSS, import global qua `nuxt.config.ts` (`css: ['@/styles/main.scss']`).
  - Bắt buộc tiền tố `apex-mma-` cho class/id; thêm Stylelint rule `selector-class-pattern: ^apex-mma-`.
  - Dùng `@nuxt/image` cho ảnh, preload font, tránh CLS.
- Layouts/Components:
  - `DefaultLayout.vue` → `layouts/default.vue`; `AdminLayout.vue` → `layouts/admin.vue`.
  - Bật auto-import components (Nuxt `components: true`).
- Env & Config:
  - `.env` → `runtimeConfig`: private (secrets), public (`apiBase`, `siteUrl`).
  - `routeRules` trong `nuxt.config` để set SSR/SSG/ISR theo route pattern.

## 4) Chiến lược SEO toàn diện
- Meta & Head:
  - Dùng `useSeoMeta` và `app/head`. Tạo `useSiteMeta()` đặt default title, description, OG/Twitter.
- Sitemap & Robots:
  - `@nuxtjs/sitemap`: trộn nguồn từ `@nuxt/content` (blog) + API sản phẩm → sinh sitemap động.
  - `@nuxtjs/robots`: allow production; disallow staging; đặt đường dẫn sitemap.
- Canonical & i18n:
  - Tạo canonical link từ `siteUrl + path`. Nếu i18n: xuất `hreflang` qua `@nuxtjs/i18n`.
- Structured Data:
  - `nuxt-schema-org`: `Article` (blog), `Product` (chi tiết sản phẩm), `BreadcrumbList`.
- Media & Hiệu năng:
  - `@nuxt/image` (responsive, AVIF/WebP, lazy), preload critical assets, font-display `swap`.
- Theo dõi SEO:
  - Lighthouse CI, Nuxt Analyze; mục tiêu Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

## 5) Kiến trúc Blog
- Nguồn nội dung: `@nuxt/content` (thư mục `content/blog/*.md`) để khởi động nhanh, dễ chuyển sang headless CMS sau.
- Tính năng:
  - Trang danh sách `/blog` (paginate, filter theo tag/category).
  - Trang chi tiết `/blog/[slug]` (MD, code highlight, TOC).
  - Frontmatter: `title`, `description`, `date`, `tags`, `cover`.
  - ISR: `revalidate 300–900s`; rebuild khi commit nội dung.
- SEO blog:
  - `Article` schema, OG image tự động (có thể dùng `nuxt-og-image`), canonical, entries trong sitemap.

## 6) E‑commerce MVP (nhẹ)
- Phạm vi MVP:
  - Product catalog (list/detail), Cart (client + server sync), Checkout (Stripe Checkout hoặc COD ban đầu).
- Backend phương án:
  - Ngắn hạn: dùng API hiện có qua `server/api` proxy + cookies auth.
  - Trung hạn: tích hợp headless (Shopify Storefront, Medusa, Saleor) tùy nhu cầu.
- Flow kỹ thuật:
  - `server/api/products/*`: list, detail (SSR/SWR 60s)
  - `server/api/cart`: add/remove/update, trả trạng thái cart theo cookie session
  - `server/api/checkout`: tạo session thanh toán (Stripe) → redirect URL
- SEO product:
  - `Product` schema, breadcrumb, review aggregate (nếu có); sitemap entries động.

## 7) Cấu hình `nuxt.config.ts` (mẫu rút gọn)
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-schema-org'
  ],
  routeRules: {
    '/blog/**': { prerender: true, isr: 600 },
    '/product/**': { ssr: true, swr: 60 },
    '/': { ssr: true }
  },
  runtimeConfig: {
    apiSecret: process.env.API_SECRET, // private
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL
    }
  },
  css: ['@/styles/main.scss'],
  nitro: {
    // adapters: 'vercel' | 'netlify' | 'cloudflare' | 'node'
  },
  components: true
})
```

## 8) CI/CD & Triển khai
- Adapter Nitro: Node (PM2/Docker), Vercel/Netlify/Cloudflare (ưu tiên edge nếu phù hợp).
- Environments: dev, staging (robots disallow), prod (robots allow).
- Pipeline:
  - Lint (ESLint/Stylelint), Type check (nếu TS), Unit/E2E Test (Vitest/Playwright), Build, Lighthouse CI.
  - Preview deploy để kiểm tra SEO/a11y trước khi merge.

## 9) Kiểm thử & Chất lượng
- Unit: Vitest cho composables, stores.
- E2E: Playwright cho luồng chính (đọc blog, thêm giỏ, checkout).
- SEO & A11y:
  - axe (a11y), snapshot meta tags, validate sitemap/robots, kiểm tra structured data (Rich Results Test).

## 10) Lộ trình thực thi (4–6 tuần)
- Tuần 1: Khởi tạo Nuxt 3, modules, runtimeConfig, Stylelint rule `apex-mma-`, `routeRules`, scaffold pages/layouts.
- Tuần 2: Port components/layouts, Pinia, `useApi` ($fetch/ofetch), auth cookie + `server/api/auth`.
- Tuần 3: Migrate blog với `@nuxt/content`, tạo list/detail, SEO meta + schema, sitemap entries.
- Tuần 4: E‑com MVP: products list/detail SSR+SWR, cart server-side, checkout Stripe/COD.
- Tuần 5: Hoàn thiện SEO (schema, og-image), i18n (nếu cần), tối ưu ảnh, Lighthouse CI, a11y.
- Tuần 6: Hardening, test E2E, monitoring, tài liệu, switch domain.

## 11) Rủi ro & giảm thiểu (kèm rollback)
- SEO tụt hạng tạm thời: giữ URL structure/canonical; 301 từ URL cũ; kiểm tra sitemap/robots trước release.
- Auth SSR: tránh `localStorage` token; dùng cookie `HTTPOnly`, set `SameSite=Lax`, `Secure` trên prod.
- Hiệu năng: tránh chặn render; lazyload, split vendor, tối ưu ảnh.
- Nội dung blog: quy trình xuất bản; nếu dùng CMS, thêm webhook revalidate.
- Rollback: triển khai song song nhánh `nuxt-migrate`; giữ bản Vite hiện tại; switch DNS sau smoke test; có plan rollback < 30 phút.

## 12) Việc cần chuẩn bị (đầu việc cụ thể)
- Tạo nhánh `nuxt-migrate`, khởi tạo dự án Nuxt 3.
- Cài modules: `@nuxt/content`, `@pinia/nuxt`, `@nuxtjs/sitemap`, `@nuxtjs/robots`, `@nuxt/image`, `@vueuse/nuxt`, `nuxt-schema-org`.
- Thiết lập Stylelint với `selector-class-pattern: ^apex-mma-` để enforce naming.
- Viết composables: `useApi`, `useAuth`, `useSiteMeta`.
- Tạo `server/api`: `auth`, `products`, `cart`, `checkout` (Stripe/COD) hoặc proxy backend hiện có.
- Migrate `pages/` & `layouts/`; bật route middleware bảo vệ.
- Cấu hình `sitemap/robots`, `routeRules`, `runtimeConfig`.
- Thiết lập Lighthouse CI, thêm kiểm thử E2E tối thiểu.

## 13) Phụ lục: Mapping từ Vite project sang Nuxt 3
- `src/router/*` → `pages/` + `middleware/` (route guards)
- `src/layouts/*` → `layouts/*`
- `src/components/*` → `components/*`
- `src/store/*` → `@pinia/nuxt` (có thể `stores/*`)
- `src/styles/*` → `assets/styles/*` (import global)
- `public/*` → giữ nguyên
- `src/api/*` → `composables/useApi.*` + `server/api/*`
- `src/directives/*` → `plugins/*` (qua `defineNuxtPlugin`)
- `router/guards.js` → `middleware/*`

## 14) Snippets tham khảo
- `useSeoMeta` mặc định:
```ts
// composables/useSiteMeta.ts
export const useSiteMeta = () => {
  const siteUrl = useRuntimeConfig().public.siteUrl
  useSeoMeta({
    titleTemplate: (title) => title ? `${title} | My Site` : 'My Site',
    description: 'Mô tả mặc định trang',
    ogSiteName: 'My Site',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  })
  useHead({ link: [{ rel: 'canonical', href: siteUrl + useRoute().path }] })
}
```
- Stylelint rule cho tiền tố `apex-mma-`:
```json
{
  "rules": {
    "selector-class-pattern": [
      "^apex-mma-",
      {
        "resolveNestedSelectors": true,
        "message": "Tất cả class phải bắt đầu bằng 'apex-mma-'"
      }
    ]
  }
}
```

---

Nếu đồng ý, bước tiếp theo: khởi tạo skeleton Nuxt 3 (trong nhánh `nuxt-migrate`), thêm modules & cấu hình SEO, rồi bắt đầu port từng phần từ dự án hiện tại theo mapping ở trên.
