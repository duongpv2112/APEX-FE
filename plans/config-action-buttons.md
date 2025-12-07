# Kế hoạch cấu hình danh sách các nút chức năng vào biến

## 1. Phân tích yêu cầu & bối cảnh sử dụng
- Hiện tại các nút chức năng ở Header.vue đang hard-code.
- Mục tiêu: cấu hình động danh sách nút, dễ mở rộng, dễ bảo trì, có thể tái sử dụng.
- Đảm bảo tuân thủ quy tắc đặt tên class/id: apex-mma-...

## 2. Đề xuất cấu trúc biến
- Sử dụng mảng object, mỗi object mô tả 1 nút:
  ```js
  const actionButtons = [
    {
      label: "Viết bài chia sẻ",
      type: "info",
      color: "#2176ff",
      class: "apex-mma-header__post-btn",
      action: "post"
    },
    {
      icon: "bell",
      type: "default",
      class: "apex-mma-header__icon-btn",
      action: "notification"
    },
    ...
  ]
  ```
- Có thể mở rộng thêm thuộc tính: icon, tooltip, visible, v.v.

## 3. Vị trí lưu trữ biến
- Nếu chỉ dùng cho Header: khai báo trực tiếp trong <script setup> Header.vue.
- Nếu dùng lại nhiều nơi: tách ra file src/config/actionButtons.js hoặc src/constants/actionButtons.js.

## 4. Các bước cập nhật code
- [ ] Định nghĩa biến cấu hình danh sách nút.
- [ ] Thay thế code hard-code nút bằng render động (v-for).
- [ ] Gán action cho từng nút (emit, router, v.v.).
- [ ] Đảm bảo class/id đúng chuẩn apex-mma-.
- [ ] Refactor nếu cần tách file cấu hình.
- [ ] Test UI và logic.

## 5. Phương án kiểm thử & xác nhận kết quả
- Kiểm tra giao diện: các nút hiển thị đúng, style đúng.
- Kiểm tra logic: click nút thực hiện đúng action.
- Thử thêm/xóa/sửa nút trong biến, UI cập nhật đúng.
- Đảm bảo không có lỗi console, không ảnh hưởng các thành phần khác.

---
**Checklist thực hiện:**
- [ ] Định nghĩa biến cấu hình danh sách nút
- [ ] Render động các nút trong Header.vue
- [ ] Gán action cho từng nút
- [ ] Đảm bảo chuẩn hóa class/id apex-mma-
- [ ] Test UI & logic
