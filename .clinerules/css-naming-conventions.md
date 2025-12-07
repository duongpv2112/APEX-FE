## Brief overview
- Quy tắc đặt tên class và id cho toàn bộ project này: luôn phải có tiền tố `apex-mma` ở phía trước.
- Áp dụng cho tất cả các selector CSS/SCSS, bao gồm cả class và id trong file style, template, và khi thao tác DOM.

## CSS/SCSS class & id naming
- Mọi class hoặc id đều phải bắt đầu bằng `apex-mma-`, ví dụ: `.apex-mma-header`, `#apex-mma-main`.
- Không sử dụng class/id chung chung hoặc không có tiền tố này.
- Khi tạo component mới, các class bên trong cũng phải tuân thủ quy tắc này.
- Ví dụ:
  - Đúng: `<div class="apex-mma-header__left">...</div>`
  - Sai: `<div class="header__left">...</div>`

## Lý do & mục tiêu
- Đảm bảo tính nhất quán, tránh xung đột style với thư viện ngoài hoặc các module khác.
- Dễ dàng tìm kiếm, bảo trì và refactor code.

## Áp dụng
- Khi viết mới hoặc refactor code, luôn kiểm tra lại tên class/id.
- Nếu sử dụng thư viện ngoài, cần custom lại selector nếu override style.
