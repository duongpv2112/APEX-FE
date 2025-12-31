# progress.md

## Tiến độ dự án & trạng thái cập nhật (tính đến 30/12/2025)

- Tổng quan: Dự án Nuxt 4 SSR đang được phát triển theo hướng chuẩn hoá luồng dữ liệu: **Nitro endpoint (server/api) -> Pinia store (stores/) -> composable UI (app/composables) -> page/component**.
- Trong giai đoạn hiện tại, đã bổ sung luồng **User Profile** (mock) và áp dụng vào `app/pages/index.vue`, đồng thời cập nhật Memory Bank để phản ánh pattern này và các bước tiếp theo.

## Đã hoàn thành
- API (Nitro):
  - Thêm endpoint `server/api/user.get.ts` trả về mock user profile tại `GET /api/user`.
- Store (Pinia):
  - Thêm `stores/user.ts` để quản lý user profile.
    - `profile`, `pending`, `error`
    - `hasProfile`, `safeProfile`
    - `fetchProfile(force?: boolean)` dùng `$fetch('/api/user')`
- Composable:
  - Thêm `app/composables/useUserInfo.ts` để UI dùng user profile theo kiểu SSR-safe.
    - `onServerPrefetch` để fetch khi render SSR
    - `onMounted` fallback khi hydrate
    - API trả về: `userInfo`, `pending`, `error`, `refresh()`
- UI / Page:
  - Cập nhật `app/pages/index.vue`:
    - bỏ mock userInfo cứng tại page
    - dùng `useUserInfo()` để render card user.
- Tài liệu / Memory Bank:
  - Cập nhật `activeContext.md` để mô tả rõ pattern dữ liệu User Profile và focus mở rộng pattern này cho các khối nội dung khác.
  - Cập nhật `progress.md` (file hiện tại) để ghi nhận trạng thái mới nhất và các todo liên quan.

### UI Revamp Home (Newsy template) – Phase khởi đầu
- Refactor layout để dùng các component layout mới:
  - `app/layouts/default.vue` -> `ApexMmaSiteHeader`, `ApexMmaOffCanvasNav`, `ApexMmaSiteFooter`, `ApexMmaBackToTop`
- Thêm foundation SCSS Mobile First:
  - `app/assets/scss/main.scss`: `.apex-mma-container`, `.apex-mma-layout__grid`, sticky sidebar (desktop)
- Thêm các component Home mới (hero + sidebar widget):
  - `app/components/home/ApexMmaHomeHeroGrid.vue`
  - `app/components/home/ApexMmaHomeHeroCard.vue`
  - `app/components/home/ApexMmaHomeSidebarLatestNews.vue`
  - `app/components/home/ApexMmaHomeSidebarPostItem.vue`
- Cập nhật Home page:
  - `app/pages/index.vue` bọc layout 2 cột + hero grid
  - Đổi `<script setup lang="ts">` để hỗ trợ SEO canonical logic
- SEO runtime config:
  - `nuxt.config.ts` thêm `runtimeConfig.public.siteUrl` (đọc từ `NUXT_PUBLIC_SITE_URL`)
- Build:
  - `npm run build` pass.

## Việc cần làm (todo)
- [ ] UI Revamp Home: tiếp tục triển khai các block còn lại theo template (pixel-perfect) và tách dần SCSS/page thành component.
- [ ] Map dữ liệu cho các block Home mới (hero/sidebar/latest/...) theo pattern server/api -> store -> composable -> UI.
- [ ] Tối ưu hiệu suất Home: `<NuxtImg>` sizes/width/height, hạn chế `ClientOnly`, kiểm tra Lighthouse.
- [ ] QA responsive (mobile/tablet/desktop) và chỉnh pixel so với template.
- [ ] Kiểm thử manual trang chủ (SSR/hydration): hard reload nhiều lần để xác nhận user card + các block Home hiển thị ổn định, không lỗi console.
- [ ] Chuẩn hoá import path trong `useUserInfo.ts` theo convention Nuxt (alias `~/stores/user` hoặc auto-import store nếu được bật).
- [ ] Quyết định strategy dữ liệu: tiếp tục mock endpoints khác hay kết nối backend thật.

## Ghi chú kỹ thuật
- `git status` (ở lần quét trước) cho thấy working tree có:
  - `M app/pages/index.vue`
  - `?? app/composables/useUserInfo.ts`
  - `?? stores/user.ts`
  - `?? server/api/user.get.ts`
- Thay đổi chính trong `index.vue` là chuyển từ mock data sang dùng composable `useUserInfo()`.
- Khi hoàn tất test manual và thống nhất strategy (mock vs backend thật vs auth-first), cần cập nhật lại Memory Bank (đặc biệt là `activeContext.md` và `systemPatterns.md`) để phản ánh quyết định cuối cùng.

## Yêu cầu từ bạn
- Bạn muốn luồng user profile này tiếp tục theo hướng nào?
  1) Chỉ mock để demo UI
  2) Tích hợp API thật (cần base URL + auth)
  3) Hoàn thiện auth trước rồi mới fetch profile
