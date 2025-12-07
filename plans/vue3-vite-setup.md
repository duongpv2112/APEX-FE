# Kế hoạch từng bước cấu hình khởi tạo project Vue 3 chạy trên nền tảng Vite

## 1. Kiểm tra hiện trạng project
- Kiểm tra package.json: xác định các dependencies đã có (axios, naive-ui, pinia, sass, vue-router).
- Chưa có vue, vite, @vitejs/plugin-vue.

## 2. Cài đặt các package cần thiết
- Cài đặt vue, vite, @vitejs/plugin-vue:
  ```
  npm install vue@3 vite @vitejs/plugin-vue --save-dev
  ```

## 3. Tạo file cấu hình Vite
- Tạo file `vite.config.js` với nội dung cơ bản:
  ```js
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'

  export default defineConfig({
    plugins: [vue()],
    server: {
      port: 3000
    }
  })
  ```

## 4. Cập nhật scripts trong package.json
- Thêm các script:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  }
  ```

## 5. Kiểm tra/cập nhật entry point
- Đảm bảo có file `src/main.js` hoặc `src/main.ts` với nội dung:
  ```js
  import { createApp } from 'vue'
  import App from './App.vue'
  import router from './router'
  import { createPinia } from 'pinia'

  const app = createApp(App)
  app.use(router)
  app.use(createPinia())
  app.mount('#app')
  ```

## 6. Kiểm tra/cập nhật index.html
- Đảm bảo file `index.html` nằm ở thư mục gốc (root), có thẻ `<div id="app"></div>` và import script đúng chuẩn Vite:
  ```html
  <script type="module" src="/src/main.js"></script>
  ```

## 7. Kiểm thử
- Chạy lệnh:
  ```
  npm run dev
  ```
- Truy cập http://localhost:3000 để kiểm tra project hoạt động.

## 8. Ghi chú bổ sung
- Nếu project cũ dùng Vue CLI, cần loại bỏ các file cấu hình cũ như vue.config.js, babel.config.js, v.v.
- Kiểm tra lại các import, alias, cấu trúc thư mục cho phù hợp với Vite.

---

## Checklist thực hiện

- [ ] Cài đặt vue, vite, @vitejs/plugin-vue
- [ ] Tạo/cập nhật vite.config.js
- [ ] Cập nhật scripts trong package.json
- [ ] Kiểm tra/cập nhật src/main.js
- [ ] Kiểm tra/cập nhật index.html
- [ ] Xóa/loại bỏ cấu hình cũ (nếu có)
- [ ] Chạy thử và kiểm tra kết quả
