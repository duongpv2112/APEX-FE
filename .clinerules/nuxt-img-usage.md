## Brief overview
- Rule này áp dụng cho toàn bộ project Nuxt hiện tại (APEX-FE).
- Khi hiển thị hình ảnh trong template Vue/Nuxt, phải ưu tiên sử dụng component `<NuxtImg>` thay vì thẻ HTML thuần `<img>`.
- Mục tiêu chính: tối ưu SEO, tối ưu hiệu năng tải trang (lazy-load, responsive images, CDN), và chuẩn hóa cách dùng image trong codebase.

## Coding best practices
- Không dùng trực tiếp thẻ `<img>` trong các file `.vue` (pages, components, layouts) trừ khi có lý do kỹ thuật đặc biệt.
  - Ví dụ sai:
    - `<img src="/images/banner.png" alt="Banner" />`
  - Ví dụ đúng:
    - `<NuxtImg src="/images/banner.png" alt="Banner" />`
- Không cần `import` thủ công `<NuxtImg>` trong script vì đây là global component từ module image của Nuxt (nếu đã cấu hình trong `nuxt.config.ts`).
- Khi bắt buộc phải dùng `<img>` (ví dụ: nội dung HTML nhúng từ bên thứ ba, template email, nội dung WYSIWYG raw HTML):
  - Giữ nguyên `<img>` nhưng phải thêm comment rõ ràng lý do không dùng `<NuxtImg>`.
  - Ví dụ:
    - `<!-- BẮT BUỘC dùng <img> do nội dung email HTML tĩnh, không render qua NuxtImg -->`
    - `<img src="..." alt="..." />`

## SEO & performance guidelines
- Luôn đặt thuộc tính `alt` mô tả nội dung ảnh rõ ràng để hỗ trợ SEO và accessibility.
  - Ví dụ: `alt="Học viên MMA tập luyện tại phòng gym"` thay vì `alt="image"`.
- Sử dụng các thuộc tính của `<NuxtImg>` để tối ưu:
  - `width` / `height` khi có kích thước cố định, giúp tránh layout shift.
  - `sizes` cho layout responsive (ví dụ: `sizes="(max-width: 768px) 100vw, 50vw"`).
  - Ưu tiên định dạng modern (WebP, AVIF) thông qua cấu hình module image, không cần hard-code phần đuôi file.
- Tận dụng lazy-load mặc định của `<NuxtImg>` (không tắt trừ khi có lý do cụ thể về UX).

## Development workflow
- Khi phát triển feature mới:
  - Mọi ảnh trong template phải dùng `<NuxtImg>` ngay từ đầu, không code nhanh với `<img>` rồi "sẽ sửa sau".
  - Kiểm tra lại tất cả component/layout liên quan đến UI mới để đảm bảo không còn `<img>` thô.
- Khi refactor code cũ:
  - Tìm kiếm toàn bộ các thẻ `<img` trong `app/pages`, `app/components`, `app/layouts`.
  - Thay thế lần lượt bằng `<NuxtImg>` và kiểm tra UI trên trình duyệt.
- Đối với ảnh logo/asset tĩnh:
  - Dùng `<NuxtImg src="/path/to/image.svg" ... />` hoặc cấu hình alias assets theo convention của project.

## Project context & consistency
- Rule này được áp dụng chung cùng với các rule khác trong `.clinerules` (ví dụ: quy tắc đặt tên class CSS với tiền tố `apex-mma-`).
- Khi dùng `<NuxtImg>`, nếu cần thêm class cho styling thì vẫn tuân theo quy tắc đặt tên CSS hiện có:
  - Ví dụ đúng: `<NuxtImg class="apex-mma-hero-banner__image" ... />`.
- Không tự ý bỏ qua rule này cho tiện, trừ khi có lý do kỹ thuật rõ ràng và được comment lại ngay tại chỗ.

## Other guidelines
- Khi review code (PR, merge request):
  - Reviewer cần kiểm tra xem UI mới có dùng `<img>` không; nếu có thì yêu cầu chuyển sang `<NuxtImg>`.
- Khi phát hiện đoạn code cũ đang dùng `<img>`:
  - Có thể tạo task nhỏ để refactor dần sang `<NuxtImg>` thay vì để tồn đọng lâu.
- Nếu về sau thay đổi module/image solution (ví dụ đổi config hoặc dùng module khác):
  - Vẫn giữ nguyên nguyên tắc chung: dùng image component của Nuxt/module thay vì `<img>` thuần để đảm bảo việc tối ưu được thực hiện tập trung ở một chỗ (config module).
