# Kế hoạch triển khai State Management bằng Pinia cho APEX-FE

## Mục tiêu
- Thêm cơ chế quản lý trạng thái trung tâm bằng Pinia (Nuxt 4 + Vue 3 + TypeScript).
- Di cư/chuẩn hoá các stores hiện có (stores/auth.ts, stores/user.ts) sang Pinia.
- Cập nhật middleware, composable và component để dùng Pinia.
- Đảm bảo hoạt động đúng trong môi trường SSR của Nuxt 4.

## Giả định
- Dự án dùng Nuxt 4 (server-side rendering enabled).
- Typescript đã được bật trong project.
- Thư mục stores/ đã tồn tại và có các file hiện tại (stores/auth.ts, stores/user.ts).

## Phụ thuộc cần cài
- pinia
- @pinia/nuxt
- (Tùy chọn) pinia-plugin-persistedstate, pinia logger

Cài đặt (terminal):

npm install pinia @pinia/nuxt

(Tùy chọn nếu cần persist)

npm install pinia-plugin-persistedstate

## Tổng quan các bước
1. Phân tích hiện trạng codebase — kiểm tra stores hiện có, middleware, composables và nơi đang dùng state.
2. Thiết kế cấu trúc store Pinia (các module stores, tên và scope state/actions/getters).
3. Cấu hình Nuxt để tích hợp Pinia.
4. Triển khai store mẫu (ví dụ: useAuthStore, useUserStore).
5. Di cư logic từ stores hiện có sang Pinia (bảo đảm types & API tương tự hoặc tốt hơn).
6. Cập nhật middleware và composables để sử dụng useXStore() thay vì các cơ chế cũ.
7. Kiểm thử (SSR hydration, login flow, truy cập user data trong pages/layouts).
8. Viết hướng dẫn sử dụng cho team và cập nhật memory-bank.

## Chi tiết các bước và checklist kỹ thuật

1) Phân tích hiện trạng
- Tìm mọi nơi đang dùng state cũ: stores/, middleware/, composables/, components/
- Ghi chú API hiện tại của stores/auth và stores/user để chuyển đổi dễ dàng.

2) Thiết kế cấu trúc store
- stores/
  - auth.ts -> defineStore('auth', { state, getters, actions })
  - user.ts -> defineStore('user', { ... })
  - (nếu cần) ui.ts, settings.ts, cart.ts ... theo scope dự án
- Quy ước đặt tên: useAuthStore, useUserStore
- Kiểm soát side-effects và async trong actions

3) Cấu hình Nuxt
- Thêm module @pinia/nuxt vào nuxt.config.ts
  Ví dụ:

  export default defineNuxtConfig({
    modules: ['@pinia/nuxt'],
    pinia: {
      autoImports: ['defineStore', 'storeToRefs']
    }
  })

- Lưu ý SSR: @pinia/nuxt xử lý tạo/rehydrate Pinia trên server; nếu dùng plugin persist phải cấu hình cẩn thận để không lưu dữ liệu nhạy cảm trên client.

4) Triển khai store mẫu
- Ví dụ cơ bản (TypeScript):

  import { defineStore } from 'pinia'

  export const useAuthStore = defineStore('auth', {
    state: () => ({ token: '' as string, isLoggedIn: false }),
    getters: {
      getToken: (state) => state.token
    },
    actions: {
      setToken(t: string) { this.token = t; this.isLoggedIn = !!t },
      logout() { this.token = ''; this.isLoggedIn = false }
    }
  })

- Đặt file ở stores/auth.ts, stores/user.ts
- Dùng types cho state và payloads để tận dụng TypeScript

5) Di cư stores hiện có
- Mở stores/auth.ts và stores/user.ts hiện tại (backup trước khi thay đổi)
- Chuyển state, getters, actions sang cấu trúc defineStore
- Nếu các store hiện tại export functions hoặc singleton objects, refactor thành defineStore để tận dụng DI và HMR
- Kiểm tra/điều chỉnh nơi gọi: ví dụ trước đây có thể dùng import { auth } from '...' — chuyển sang const auth = useAuthStore(); trong setup hoặc các composable

6) Cập nhật middleware & composables
- Thay thế mọi chỗ đang dùng global state cũ bằng useAuthStore()/useUserStore().
- Ví dụ middleware auth: trước đây dùng req.session hoặc useState; bây giờ lấy token từ auth store.
- Nếu middleware chạy trên server (server-side), dùng const pinia = createPinia() không cần — @pinia/nuxt sẽ inject; trong middleware client useNuxtApp() và useAuthStore() là đủ.

7) Kiểm thử
- Manual test cases:
  - SSR rendering trang index/home có dependency vào user state (trước và sau đăng nhập)
  - Login flow: gọi API auth, lưu token vào store, reload trang, đảm bảo state được duy trì theo mong muốn
  - Middleware: truy cập trang protected, redirect khi chưa login
  - HMR: sửa store, kiểm tra hot-reload không mất state trên client dev
- Kiểm tra console lỗi trên server và client

8) Documentation
- Viết README ngắn trong plans/ và cập nhật memory-bank/activeContext.md và progress.md
- Thêm ví dụ sử dụng store trong app/components/layout/Header.vue và app/pages/index.vue

## Lưu ý quan trọng
- Không lưu token nhạy cảm trong client-persisted storage nếu không mã hoá hoặc có lý do rõ ràng.
- Khi sử dụng plugin persist, filter các field nhạy cảm.
- Đảm bảo typization: export type AuthState = ReturnType<typeof useAuthStore['$state']> hoặc định nghĩa interface rõ ràng.

## Kế hoạch triển khai theo sprint (ước lượng)
- Sprint 1 (1 ngày): Cài đặt Pinia, cấu hình Nuxt, tạo store mẫu, kiểm thử cơ bản
- Sprint 2 (1-2 ngày): Di cư stores/auth và stores/user, cập nhật middleware
- Sprint 3 (1 ngày): Kiểm thử toàn diện, document và cleanup

---

Checklist (task_progress):
- [x] Đọc file memory-bank/projectbrief.md
- [ ] Đọc file memory-bank/productContext.md
- [ ] Đọc file memory-bank/systemPatterns.md
- [ ] Đọc file memory-bank/techContext.md
- [ ] Đọc file memory-bank/activeContext.md
- [ ] Đọc file memory-bank/progress.md
- [ ] Phân tích codebase hiện tại (stores, middleware, composables)
- [ ] Thiết kế cấu trúc store Pinia
- [ ] Cập nhật cấu hình (cài Pinia / Nuxt config)
- [ ] Triển khai các store mới
- [ ] Di cư stores hiện có (stores/auth.ts, stores/user.ts)
- [ ] Cập nhật middleware và composables để dùng Pinia
- [ ] Cập nhật components/pages để dùng Pinia
- [ ] Viết hướng dẫn kiểm thử/manual test cases
- [ ] Cập nhật documentation và memory-bank
- [x] Tạo file kế hoạch (plans/pinia-state-management-plan.md)
- [ ] Hoàn tất và báo cáo cho người dùng


Nếu bạn đồng ý với kế hoạch này, tôi sẽ lần lượt thực hiện: đọc thêm các file memory-bank còn lại và kiểm tra stores hiện có trước khi bắt đầu cài đặt và di cư. Nếu muốn ưu tiên bước nào (ví dụ: chỉ làm auth trước), cho tôi biết để tôi điều chỉnh kế hoạch.
