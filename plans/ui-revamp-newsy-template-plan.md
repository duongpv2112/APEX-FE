# Kế hoạch: Refactor UI APEX-FE theo template `template/template-demo.html` (Newsy – ViralBuzz)

> Mục tiêu: Thiết kế lại **toàn bộ giao diện** project Nuxt (APEX-FE) theo cấu trúc/UX của template Newsy ViralBuzz, ưu tiên **Mobile First**, **SEO chuẩn**, **tối ưu hiệu suất**; đồng thời **giữ kiến trúc Nuxt SSR + composables/stores hiện tại**.

---

## 1) Bối cảnh dự án hiện tại (baseline)

### Tech stack & rule đang áp dụng
- Nuxt 4 SSR, Vue 3, TypeScript.
- Có module `@nuxt/image` ⇒ ảnh trong template Vue ưu tiên `<NuxtImg>`.
- Rule SEO pages: **mỗi page trong `app/pages` phải gọi `useSeoMeta`** (đang làm đúng trên `index.vue`, `posts/*`).
- Rule CSS: **tất cả class/id phải có prefix `apex-mma-`**.

### Tình trạng UI hiện tại
- `app/layouts/default.vue`: layout tối giản, `main` bị giới hạn `max-width: 1216px`.
- `app/components/layout/Header.vue`: header đơn giản (logo + group icon + avatar menu).
- `app/pages/index.vue`: homepage có các section kiểu “magazine”: Fact carousel, News, Featured, Compact list, Community.
- `app/pages/posts/*`: category list & detail đang hoạt động với SEO meta.

**Nhận xét nhanh:** UI hiện tại đã có nền tảng “content/news style”, nhưng chưa có các khối “magazine” phức tạp như template Newsy (top bar, mega menu, off-canvas, hero grid, sidebar sticky + tabs + ads + load more…).

---

## 2) Phân rã template Newsy thành các khối (mapping sang Nuxt)

### 2.1. Layout tổng thể
Template Newsy có cấu trúc chính:
- `ak-header-wrap` (desktop): top bar + mid bar + main menu.
- `ak-header-mobile-wrap`: mobile bar (hamburger + logo + user).
- `ak-content-wrap`: container content (grid + list + sidebar).
- `ak-footer-wrap`: footer bar.
- `ak_off_canvas`: off-canvas mobile nav.
- “Back to top”, modals (login/register),…

**Mapping đề xuất trong Nuxt:**
- `app/layouts/default.vue`
  - `<ApexMmaSiteHeader />`
  - `<main class="apex-mma-site-main"> <NuxtPage/> </main>`
  - `<ApexMmaSiteFooter />`
  - `<ApexMmaBackToTop />`
  - `<ApexMmaOffCanvasNav />` (Teleport to body)

### 2.2. Header theo Newsy (Desktop/Mobile)
Các phần chính:
1) **Top bar**: menu nhỏ (Trending/Hot/Popular), search, social icons, dark mode toggle, user/login icon.
2) **Mid bar**: logo.
3) **Main navigation**: menu category + mega-menu (tabbed posts / multi-column posts).
4) **Mobile bar**: hamburger, logo, user.
5) **Off-canvas**: menu mobile + social + copyright.

**Mapping component:**
- `app/components/layout/ApexMmaSiteHeader.vue`
  - `ApexMmaHeaderTopBar.vue`
  - `ApexMmaHeaderMainBar.vue`
  - `ApexMmaHeaderNavBar.vue` (menu + mega)
  - `ApexMmaHeaderMobileBar.vue`

### 2.3. Homepage “Magazine blocks”
Template có nhiều “block/module”: grid hero, list medium, list small, video module, sidebar sticky “Latest News” tabs, trending, trend videos, ads, load more.

**Mapping hiện tại vs template:**
- `Fact carousel` ≈ có thể coi như “story”/“top strip” (giữ hoặc thay bằng “trending strip”).
- `News section` ≈ tương ứng một số module list/grid.
- `Featured + user card` ≈ tương tự sidebar widgets.
- `Compact list` ≈ list medium.

**Đề xuất tổ chức lại homepage theo template:**
- Hero grid (4 items, 1 big + 1 wide + 2 small)
- Main column: list medium (n items)
- Secondary column: video module (n items)
- Sidebar sticky:
  - Latest News tabs (All/Popular/Most Shared/Most Liked/Weekly)
  - Ad widget
  - Trending widget
  - Trend Videos widget

### 2.4. Post/category pages
Template Newsy có các page kiểu:
- category archive (list + sidebar)
- post detail (breadcrumb + title + meta + share/vote/reaction)

**Mapping:**
- `app/pages/posts/categories/[category].vue`: bổ sung layout 2 cột + sidebar widgets.
- `app/pages/posts/[slug].vue`: bổ sung “hero image”, share bar, related posts, sticky sidebar (tuỳ scope).

---

## 3) Phạm vi thực hiện (Scope) 

> **Scope đã chốt theo feedback:**
> 1) **Giống từng pixel** (pixel-perfect)
> 2) **Áp dụng cho trang Home trước** (`/`)
> 3) Mega menu tabs / Dark mode / Login-Register modal / Vote-Reaction-Share-Bookmark: **chưa làm ở phase 1**, chỉ note để phase sau.

### 3.1. Scope “Home Pixel-Perfect” (giai đoạn 1)
Mục tiêu: **pixel-perfect trang Home** theo template Newsy ViralBuzz (bố cục + spacing + typography + states), ưu tiên Mobile First, đảm bảo SSR/SEO/perf.

Bao gồm:
- Header (chỉ phần cần để Home pixel-perfect): top bar + main bar + mobile bar + off-canvas.
- Homepage: hero grid + các block list/grid + sidebar widgets + sticky behaviour (theo mức cần để giống template).
- Footer (nếu xuất hiện trong template phần dưới của Home) + back-to-top.
- SEO & perf baseline (xem mục 6) áp dụng cho Home.

Không bao gồm (để phase sau):
- Mega menu “tabbed posts” chuẩn như WP (phức tạp dữ liệu + interaction).
- Dark mode toggle.
- Login/Register modal.
- Vote/Reaction/Share/Bookmark.
- Infinite load/pagination kiểu template (nếu backend chưa support).

### 3.2. Scope “Full parity” (tuỳ chọn)
Mục tiêu: mô phỏng đầy đủ module + interaction.
- Mega menu đầy đủ (tabs + load posts per tab).
- Widgets: social counter, quiz blocks, video widgets.
- Load more/infinite scroll.
- Share/reaction/vote, bookmark.
- Modal auth UI.

---

## 4) Danh sách công việc chi tiết (Work Breakdown)

### Phase 0 — Chuẩn bị & thống nhất thiết kế (0.5–1 ngày)
- [ ] Chốt “độ giống template”: pixel-perfect hay chỉ lấy layout/UX.
- [ ] Chốt danh sách page phải áp dụng: chỉ `/`, `/posts/*` hay “toàn bộ site”.
- [ ] Chốt dữ liệu có sẵn: category list, “popular/trending”, “most shared”… có API chưa?
- [ ] Chốt guideline UI: màu, font, spacing, dark mode (có làm thật không?).

### Phase 1 — Thiết kế hệ thống layout & CSS foundation (1–2 ngày)
- [ ] Refactor `app/layouts/default.vue` theo layout Newsy:
  - container theo breakpoint (mobile full width; desktop max-width)
  - main layout có thể 2 cột (content + sidebar)
- [ ] Xây “grid system” bằng SCSS utilities (không dùng class của template vì phải prefix `apex-mma-`).
- [ ] Chuẩn hoá typography cho content (h1-h6, p, ul/ol, figure, blockquote) để post detail đẹp.

**Deliverable:** CSS foundation + layout skeleton chạy được, không vỡ responsive.

### Phase 2 — Header (Desktop/Mobile/Off-canvas) (2–5 ngày)
- [ ] Xây `ApexMmaSiteHeader` tách thành 3 bar + mobile bar.
- [ ] Implement search UI (tối thiểu: input + submit; nâng cao: suggest).
- [ ] Social icons list.
- [ ] Menu categories (dùng `usePostCategories()` làm data source).
- [ ] Off-canvas nav (Teleport + body scroll lock + focus trap cơ bản).
- [ ] (Tuỳ chọn) Dark mode toggle: đồng bộ với `useColorMode` hoặc tự làm class `dark`.

**Deliverable:** Header giống template về bố cục, mobile UX tốt.

### Phase 3 — Footer + Back-to-top (0.5–1 ngày)
- [ ] Footer bar + footer menu.
- [ ] Copyright.
- [ ] Back-to-top button (chỉ render khi scroll > ngưỡng; throttle).

### Phase 4 — Homepage theo “blocks/modules” (pixel-perfect) (6–12 ngày)
- [ ] Hero grid module (4 cards): 1 big + 1 wide + 2 small.
- [ ] Card components:
  - `ApexMmaPostCardGridBig`
  - `ApexMmaPostCardGridWide`
  - `ApexMmaPostCardGridSmall`
  - `ApexMmaPostCardListMedium`
  - `ApexMmaPostCardListSmall`
- [ ] Sidebar widgets (MVP):
  - Latest posts list
  - Trending list
  - Ad placeholder (static)
- [ ] Mapping dữ liệu:
  - Dùng `usePosts()` cho “latest”
  - Thêm query/endpoint mới nếu cần cho “trending/popular”
- [ ] Responsive:
  - Mobile: stack theo thứ tự (hero -> list -> sidebar widgets)
  - Desktop: 2 cột (main + sidebar sticky)

### Phase 5 — Category page & Post detail (2–5 ngày)
- [ ] Category page (`/posts/categories/[category]`):
  - Layout 2 cột + sidebar widgets
  - Card list hiển thị ảnh + meta
  - Pagination (nếu có)
- [ ] Post detail (`/posts/[slug]`):
  - Cover image + meta UI
  - Content typography & images (từ `v-html`)
  - Related posts (tuỳ chọn)

---

## 5) SEO chuẩn (theo yêu cầu + rule hiện tại)

### Bắt buộc
- [ ] Tất cả pages trong `app/pages/**` đảm bảo có `useSeoMeta`.
- [ ] Canonical URL:
  - Hiện `useSiteMeta` có `runtime.public.siteUrl` nhưng `nuxt.config.ts` chưa khai báo.
  - Bổ sung `runtimeConfig.public.siteUrl` (hoặc env) để generate canonical chính xác.
- [ ] OpenGraph image dùng URL tuyệt đối (khi share).
- [ ] Breadcrumb semantics:
  - UI breadcrumb đã có, thêm `aria-label` và có thể thêm schema.org.

### Khuyến nghị thêm (nên làm trong MVP nếu có thời gian)
- [ ] Cấu hình `@nuxtjs/sitemap` + `@nuxtjs/robots` (hiện có dependency nhưng chưa thấy config):
  - `robots.txt` cho production
  - sitemap routes: `/`, `/posts/categories/*`, `/posts/*`
- [ ] Schema.org:
  - `Article` cho post detail
  - `BreadcrumbList` cho breadcrumb
  - `WebSite` + `Organization` global

---

## 6) Hiệu suất (Performance) — Mobile First

### Bắt buộc
- [ ] Không đưa jQuery/plugins của template WP vào Nuxt; viết bằng Vue + CSS.
- [ ] Ảnh:
  - Dùng `<NuxtImg>` (đang có) + set `width/height` khi biết để giảm CLS.
  - Dùng `sizes` theo breakpoint.
  - Ưu tiên format webp/avif (Nuxt Image).
- [ ] CSS:
  - Mobile-first styles, chỉ mở rộng ở breakpoint.
  - Hạn chế scoped quá lớn ở page (cân nhắc tách thành component + SCSS module) để dễ maintain.
- [ ] JS:
  - Hạn chế `ClientOnly` trừ khi bắt buộc.
  - Lazy components cho các widget ít quan trọng (sidebar widgets, carousel).

### Khuyến nghị
- [ ] Tối ưu font:
  - Hiện đang load Google Fonts trong `nuxt.config.ts`.
  - Cân nhắc self-host + subset để giảm blocking.
- [ ] Lighthouse target (mobile):
  - Performance ≥ 85
  - SEO ≥ 95
  - Best Practices ≥ 95
  - Accessibility ≥ 90

---

## 7) Ước lượng thời gian (Effort / Timeline)

> Ước lượng theo **1 dev** (full-time), chưa tính thời gian chờ feedback/duyệt UI.

### Option A — Home Pixel-Perfect (scope đã chốt)
| Hạng mục | Effort |
|---|---:|
| Phase 0: chuẩn bị + đo đạc pixel (spacing/typography/breakpoints) | 1–2 ngày |
| Phase 1: layout + CSS foundation | 2–4 ngày |
| Phase 2: header + off-canvas | 2–5 ngày |
| Phase 3: footer + back-to-top | 0.5–1 ngày |
| Phase 4: homepage blocks (pixel-perfect) | 6–12 ngày |
| SEO/perf hardening + QA (Home) | 2–4 ngày |
| **Tổng** | **13.5–28 ngày làm việc** (~3–6 tuần) |

### Option B — Mở rộng từ Home sang Full Site / Full parity (phase sau)
| Nhóm tính năng | Effort |
|---|---:|
| Mega menu (tabbed + load content) | +4–7 ngày |
| Vote/reaction/share/bookmark | +4–8 ngày |
| Infinite load/pagination nâng cao | +2–5 ngày |
| Auth modal UI + flow | +3–7 ngày |
| QA/regression + perf tuning | +3–6 ngày |
| **Tổng cộng thêm** | **+16–33 ngày** |
| **Grand total** | **27–57 ngày** (~6–12 tuần) |

---

## 8) Rủi ro & phụ thuộc

### Phụ thuộc dữ liệu/API
- Template có nhiều loại feed: latest, popular, most shared, trending, video…
- Nếu backend chưa có endpoint/fields tương ứng (views/shareCount/tags/videoDuration), UI sẽ phải:
  - dùng mock,
  - hoặc giảm scope,
  - hoặc bổ sung server/api + store/composable.

### Rủi ro kỹ thuật
- `v-html` content: nếu content có `<img>` thì không thể tự động dùng `<NuxtImg>`.
  - Cần chiến lược: sanitize, hoặc transform HTML server-side (phức tạp).
- Sticky sidebar + off-canvas + menu interaction cần đảm bảo accessibility (focus/keyboard).
- Nếu muốn dark mode thật: cần unify theme tokens + kiểm thử toàn site.

---

## 9) Tiêu chí hoàn thành (Definition of Done)

- [ ] UI Mobile First: từ 360px vẫn đọc tốt, không overflow.
- [ ] Desktop layout giống template về cấu trúc (header 3 tầng, content 2 cột, sidebar widgets, footer).
- [ ] Không vi phạm rule:
  - class/id có prefix `apex-mma-`
  - ảnh trong template Vue dùng `<NuxtImg>`
  - pages có `useSeoMeta`
- [ ] Lighthouse mobile đạt các target mục 6.
- [ ] SSR không lỗi hydration.

---

## 10) Câu hỏi cần bạn xác nhận (để chốt scope & timeline chính xác)

1) Bạn muốn mức độ giống template ở mức nào?
- (A) Lấy layout/UX + style gần giống
- (B) Pixel-perfect (tăng effort)

2) Phạm vi “toàn bộ giao diện” gồm những page nào?
- (A) Chỉ `/` + `/posts/*`
- (B) Tất cả page hiện có (about, wix-example, v.v.)

3) Các tính năng này có cần làm ở phase 1 không?
- Mega menu tabs
- Dark mode
- Login/Register modal
- Vote/Reaction/Share/Bookmark

---

## 11) Đề xuất lộ trình triển khai thực tế

- Tuần 1: Phase 0–2 (layout + header + off-canvas)
- Tuần 2: Phase 3–4 (footer + homepage blocks MVP)
- Tuần 3: Phase 5 + SEO/perf + QA
- Tuần 4+: mở rộng full parity (nếu cần)

***

Nếu bạn trả lời 3 câu hỏi ở mục 10, mình sẽ chốt lại timeline 1 con số (ví dụ 3 tuần) và convert checklist thành milestone/issue cụ thể theo từng component/page.
