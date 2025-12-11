# progress.md

## Tiến độ dự án & trạng thái cập nhật (tính đến 10/12/2025 22:06 GMT+7)

- Tổng quan: Đã triển khai Pinia vào dự án Nuxt 4, chuẩn hoá một số stores (auth, user, ui), thêm actions login/logout trong auth store, cập nhật middleware và một số component để sử dụng store. Dev server đã được khởi động lại và đang chạy (Nuxt dev).

## Đã hoàn thành
- Scaffold & kế hoạch:
  - Tạo file kế hoạch: plans/pinia-state-management-plan.md
- Cài đặt & cấu hình:
  - Cài pinia & @pinia/nuxt
  - Cập nhật nuxt.config.ts để tích hợp @pinia/nuxt
- Stores & composables:
  - Chuẩn hoá stores: stores/auth.ts (defineStore, thêm isLoggedIn, login, logout, initFromCookie), stores/user.ts (thêm helper), stores/ui.ts (theme store)
  - Cập nhật composable useTheme để dùng store ui
- Ứng dụng và middleware:
  - Cập nhật app/middleware/auth.ts để đồng bộ cookie -> auth store
  - Cập nhật app/components/layout/Header.vue để gọi auth.login/logout (demo)
- API server-side:
  - Thêm route server/api/auth/[...all].ts để xử lý các đường dẫn /api/auth/* (login/logout/session)
- Khác:
  - Đổi tên composable useSeoMeta -> useAppSeo để tránh xung đột với auto-import của Nuxt
  - Khởi động lại dev server (Nuxt dev) và nhận HMR update

## Việc cần làm (todo)
- [ ] Kiểm thử manual: flow đăng nhập/đăng xuất (login -> cookie set -> store.initFromCookie -> middleware & UI phản hồi)
- [ ] Hoàn thiện phản hồi UI: thêm nút Login/Logout rõ ràng trên Header để demo
- [ ] (Tùy chọn) Thêm pinia-plugin-persistedstate với filter cho token nếu muốn persist
- [ ] Viết hướng dẫn sử dụng và test cases ngắn (plans/ và memory-bank)
- [ ] Tạo commit/branch/PR với các thay đổi để review

## Ghi chú kỹ thuật & cảnh báo
- Sau khi đổi tên useSeoMeta, Nuxt cần regen auto-imports — tôi đã restart dev server để áp dụng.
- Dev server hiện đang chạy, tuy nhiên khi kiểm thử curl có thể gặp vấn đề về đường dẫn nếu file api chưa được nhận bởi Nitro (đã thêm server/api/auth/[...all].ts và HMR đã kích hoạt).
- Tránh persist token không mã hoá trong localStorage nếu không có chiến lược bảo mật rõ ràng; ưu tiên cookie HTTPOnly như scaffold hiện tại.

## Yêu cầu từ bạn
- Bạn muốn tôi tiếp tục với bước nào: (1) kiểm thử manual login/logout, (2) thêm persisted plugin, (3) tạo PR để bạn review, hoặc (4) khác?
