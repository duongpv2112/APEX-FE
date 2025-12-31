# activeContext.md

## Bối cảnh hoạt động hiện tại

### Trạng thái hiện tại
- Project APEX-FE là Nuxt 4 SSR (Vue 3 + TypeScript), tổ chức theo `app/` (pages/components/composables/assets) và `server/api/` (Nitro endpoints).
- Hiện đã bắt đầu chuẩn hoá luồng dữ liệu **User Profile** theo hướng “data source -> store -> composable -> UI” thay vì mock cứng trong page.

### Thay đổi gần nhất (tính đến 13/12/2025)
- **User Profile flow (mock API + Pinia + composable, SSR-safe):**
  - Thêm Nitro endpoint: `server/api/user.get.ts` trả về mock user profile tại `GET /api/user`.
  - Thêm Pinia store: `stores/user.ts`
    - State: `profile`, `pending`, `error`
    - Getter/computed: `hasProfile`, `safeProfile`
    - Action: `fetchProfile(force?: boolean)` dùng `$fetch('/api/user')`
  - Thêm composable UI: `app/composables/useUserInfo.ts`
    - Dùng `onServerPrefetch` để fetch trên SSR nếu thiếu dữ liệu
    - Dùng `onMounted` làm fallback trên client
    - Trả về `userInfo`, `pending`, `error`, `refresh()`
  - Cập nhật `app/pages/index.vue`:
    - Bỏ object `userInfo` mock tại page
    - Dùng `const { userInfo } = useUserInfo()` để render card user

- Đang triển khai UI revamp theo template Newsy (pixel-perfect) cho **Home** trước (Mobile First).
- Tiếp tục chuẩn hoá pattern lấy dữ liệu cho các khối nội dung ở trang chủ (facts/news/featured/quicklist/community/...) theo hướng:
  1) server/api (mock hoặc thật) -> 2) store (Pinia) -> 3) composable cấp UI -> 4) page/component.
- Rà soát lại các composable hiện có (`useFacts`, `usePosts`, `useFeaturedList`, `useQuickList`, `useCommunity`, `useDisplay`, v.v.) để đảm bảo chúng phù hợp với SSR và có thể dần hội tụ về cùng pattern với `useUserInfo` (ít nhất là về cách xử lý pending/error và nơi đặt logic fetch).
- Đảm bảo các composable/stores **SSR-compatible** (không dùng trực tiếp `window`, dùng `onServerPrefetch` khi phù hợp, hoặc `process.client` khi cần phân nhánh).

### Thay đổi gần nhất (30/12/2025)
- **Bắt đầu implement “Home Pixel-Perfect” theo template Newsy:**
  - Refactor `app/layouts/default.vue` để dùng các component layout mới:
    - `ApexMmaSiteHeader`, `ApexMmaOffCanvasNav`, `ApexMmaSiteFooter`, `ApexMmaBackToTop`
  - Thêm các component Home mới:
    - `app/components/home/ApexMmaHomeHeroGrid.vue`
    - `app/components/home/ApexMmaHomeHeroCard.vue`
    - `app/components/home/ApexMmaHomeSidebarLatestNews.vue`
    - `app/components/home/ApexMmaHomeSidebarPostItem.vue`
  - Cập nhật `app/assets/scss/main.scss`:
    - `.apex-mma-container` Mobile First
    - `.apex-mma-layout__grid` + `.apex-mma-layout__sidebar` sticky (desktop)
  - Refactor `app/pages/index.vue` (Home):
    - Thêm hero grid phía trên
    - Bọc layout 2 cột (main + sidebar)
    - Sidebar widget “Latest News” UI-only (tabs placeholder)
    - Fix padding: dùng container thay vì padding 12px trong từng section
    - Đổi `<script setup lang="ts">` để hỗ trợ logic canonical
  - SEO: bổ sung `ogType`, `ogUrl` (nếu có siteUrl)
  - Runtime config: thêm `runtimeConfig.public.siteUrl` trong `nuxt.config.ts`
  - Đã chạy `npm run build` thành công sau khi fix TypeScript trong page.
- Đảm bảo các composable/stores **SSR-compatible** (không dùng trực tiếp `window`, dùng `onServerPrefetch` khi phù hợp, hoặc `process.client` khi cần phân nhánh).

### Quyết định & cân nhắc quan trọng
- SSR ưu tiên SEO: mọi luồng fetch cần cân nhắc chạy được cả server & client.
- Tên class CSS/SCSS tiếp tục tuân thủ rule prefix `apex-mma-` (xem `.clinerules/css-naming-conventions.md`).
- Store `user` hiện fetch từ endpoint mock `/api/user`; khi tích hợp backend thật cần:
  - đổi base URL / thêm auth header nếu cần
  - xử lý lỗi (401/403) và trạng thái chưa đăng nhập
- Cần thống nhất convention import store/composable để tránh relative path phức tạp, ưu tiên:
  - alias chuẩn của Nuxt (`~/stores/user`), hoặc
  - cơ chế auto-import stores/composables nếu được bật.

### Next steps (ngắn hạn)
1. Viết/chuẩn hoá thêm các endpoint mock cần thiết cho homepage (facts, news, featured list, quick list, community, ...) nếu có, tương ứng với stores/composables.
2. Kiểm thử manual SSR/hydration cho `useUserInfo` (refresh page, hard reload, kiểm tra console) để xác nhận user card hiển thị ổn định, không lỗi.
3. (Tuỳ chọn) Chuẩn hoá lại import path của `stores/user` trong `useUserInfo.ts` theo convention Nuxt (alias `~/stores/user` hoặc auto-import), tránh dùng relative sâu như `../../stores/user`.
4. Ghi nhận pattern chuẩn ("server/api -> store -> composable -> UI") thành tài liệu ngắn trong thư mục `plans/` hoặc cập nhật thêm vào `systemPatterns.md` nếu pattern này được áp dụng rộng rãi cho các luồng dữ liệu khác.

### Ghi chú
- Memory Bank trước đó có nhắc tới auth endpoints; hiện trong repo (theo trạng thái đang thấy) chỉ có `server/api/user.get.ts`.
  - Nếu auth flow tồn tại ở branch/commit khác, cần đồng bộ lại tài liệu khi merge/rebase.
- Luồng User Profile hiện vẫn đang mock; chưa có quyết định cuối cùng về việc:
  - tiếp tục mock để demo,
  - hay tích hợp backend thật,
  - hay triển khai full auth flow trước rồi mới fetch profile.
