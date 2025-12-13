# progress.md

## Tiến độ dự án & trạng thái cập nhật (tính đến 13/12/2025 20:28 GMT+7)

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

## Việc cần làm (todo)
- [ ] Kiểm thử manual trang chủ (SSR/hydration): hard reload nhiều lần để xác nhận user card hiển thị ổn định, không lỗi console.
- [ ] Chuẩn hoá import path trong `useUserInfo.ts` (hiện đang import store bằng relative `../../stores/user`) theo convention của project/Nuxt (ví dụ alias `~/stores/user` hoặc auto-import store nếu được bật).
- [ ] Quyết định strategy dữ liệu: tiếp tục mock endpoints khác hay kết nối backend thật cho User Profile và các khối nội dung trên homepage.
- [ ] (Nếu có auth) rà soát lại `server/api` và `stores` để đồng bộ tài liệu (Memory Bank trước đó có nhắc auth nhưng hiện chưa thấy trong trạng thái working tree).
- [ ] Tạo commit/PR cho thay đổi user profile flow (endpoint + store + composable + cập nhật index.vue).
- [ ] Chuẩn hoá luồng dữ liệu cho các khối homepage khác (`useFacts`, `useNews`, `useFeaturedList`, `useQuickList`, `useCommunity`, ...) theo pattern: server/api -> store -> composable -> UI (nếu phù hợp với yêu cầu sản phẩm).

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
