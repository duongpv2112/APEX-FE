## Brief overview
- Rule này áp dụng cho tất cả các page trong thư mục `app/pages` của project APEX-FE.
- Mỗi page phải thiết lập SEO meta thông qua composable `useSeoMeta` thay vì bỏ trống hoặc cấu hình rải rác.
- Mục tiêu: chuẩn hóa `title`/`description` và các thẻ social (Open Graph), tối ưu SEO và trải nghiệm chia sẻ link.

## General principles
- `title` phải mô tả đúng nội dung chính của page, ngắn gọn, dễ hiểu.
- `description` nên tóm tắt nội dung page trong 1–2 câu, ưu tiên mô tả giá trị cho người dùng.
- Tránh dùng các text quá chung chung kiểu: "Trang chủ", "Chi tiết tin tức" mà không có ngữ cảnh bổ sung.
- Các trường như `ogTitle`, `ogDescription`, `ogImage` (nếu dùng) nên phản ánh đúng nội dung hiển thị chính trên page.

## Implementation guidelines
- Mỗi file page `.vue` cần gọi `useSeoMeta` trong `<script setup>` hoặc trong `setup()` của component cấp page.
- Ưu tiên lấy dữ liệu cho `title`/`description` từ nguồn data thực tế của page (API, props, content), hạn chế hard-code lặp lại.
- Với page có URL động (ví dụ: `/news/[slug]`), meta phải thay đổi tương ứng theo dữ liệu của slug hiện tại.
- Khi cập nhật nội dung hiển thị chính trên page (heading, summary…), cần xem xét cập nhật meta để giữ mô tả đồng nhất.

## Page patterns & examples
- **Trang tĩnh (About, Landing, giới thiệu):**
  - `title`: nêu rõ chức năng/mục đích trang.
  - `description`: mô tả đối tượng hướng tới và lợi ích chính khi xem trang.
- **Trang danh sách tin tức / bài viết:**
  - `title`: nhấn mạnh chủ đề (ví dụ: tin tức MMA, lịch sự kiện...).
  - `description`: nói rõ loại nội dung người dùng sẽ thấy (tin mới, cập nhật, recap sự kiện...).
- **Trang chi tiết tin tức / bài viết:**
  - `title`: dùng tiêu đề bài viết hoặc biến thể rất gần với tiêu đề.
  - `description`: dùng excerpt/summary hoặc phần mở đầu bài viết được rút gọn.

## Project context
- Rule `useSeoMeta` này kết hợp với các rule khác trong `.clinerules` (ví dụ: sử dụng `<NuxtImg>`, prefix class CSS `apex-mma-`) để đảm bảo chuẩn SEO và UI/UX thống nhất.
- Khi tạo page mới, developer cần thiết lập `useSeoMeta` ngay từ đầu, không để trống để "sẽ bổ sung sau".

## Other guidelines
- Trong code review, cần kiểm tra:
  - Page mới đã có `useSeoMeta` chưa.
  - `title`/`description` có mô tả đúng nội dung page hay không.
- Khi refactor page cũ:
  - Nếu đang dùng `useHead` hoặc meta inline kiểu khác, ưu tiên chuẩn hóa về `useSeoMeta` cho đồng nhất.
- Nếu có page đặc biệt không thể thiết lập meta đúng chuẩn (ví dụ: render nội dung trong iframe của bên thứ ba), phải ghi rõ lý do bằng comment ngay trong file page đó.
