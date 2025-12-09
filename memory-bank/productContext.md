# productContext.md

## Mục tiêu sản phẩm & giá trị cốt lõi

APEX-FE là frontend cho ứng dụng APEX MMA, mục tiêu chính là hiển thị nội dung, hỗ trợ quản lý tài khoản người dùng và cung cấp trải nghiệm truy cập nhanh, thân thiện với SEO.

## Vấn đề sản phẩm giải quyết

- Cung cấp giao diện public và một số chức năng quản lý nhẹ cho người dùng.
- Tối ưu SEO bằng SSR để tăng khả năng hiển thị tìm kiếm cho nội dung site.

## Đối tượng người dùng

- Người xem nội dung công khai (khán giả, khách truy cập).
- Người dùng đã đăng ký (xem thông tin cá nhân, thao tác cần xác thực).
- Quản trị viên hoặc người quản lý nội dung (nếu có dashboard quản lý trong tương lai).

## Giá trị cốt lõi

- SEO-first: SSR và cấu trúc meta tốt (sử dụng composable useSeoMeta).
- Tốc độ: CSS/JS tối ưu, lazy load khi cần.
- Dễ bảo trì: tổ chức code theo composables, components, stores.

## Kịch bản sử dụng chính

- Truy cập trang chủ (index) để xem nội dung chính.
- Người dùng đăng nhập (flow auth qua server/api/auth.ts) — lưu trữ token trong store auth.
- Thay đổi theme, hiển thị toast thông báo.

## Mục tiêu UX

- Giao diện responsive, rõ ràng, tối giản.
- Header cố định, điều hướng rõ ràng.
- Thông báo và feedback cho người dùng (toasts).

## Ghi chú

Nội dung được suy luận tự động từ repository. Vui lòng bổ sung yêu cầu sản phẩm cụ thể nếu cần.
