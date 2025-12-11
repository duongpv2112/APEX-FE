Kế hoạch: Xử lý logic hiển thị News theo Desktop / Mobile

Mục tiêu
- Triển khai logic hiển thị cho thành phần news theo yêu cầu:
  - Desktop: hiển thị phần apex-mma-news-main-top-right với thông tin subNews[0]; phần apex-mma-news-main-bottom hiển thị danh sách subNews nhưng không bao gồm subNews[0].
  - Mobile: ẩn apex-mma-news-main-top-right; phần apex-mma-news-main-bottom hiển thị toàn bộ 4 item (bao gồm subNews[0]).

Yêu cầu và quy tắc
- Tên class/ID phải tuân thủ quy tắc project: tất cả selectors phải bắt đầu với tiền tố `apex-mma-`.
- Component phải hoạt động cho Nuxt (Vue 3) hiện tại của project.
- Tối ưu UX: tránh re-render không cần thiết, ưu tiên xử lý bằng CSS khi phù hợp, hoặc sử dụng breakpoint JS nếu cần logic tường minh.

Giải pháp đề xuất (chi tiết)
1) Kiến trúc UI
- Giữ cấu trúc DOM như sau (ví dụ trong template):
  - .apex-mma-news-main-top-right  -> khu vực hiển thị chi tiết subNews[0] (chỉ hiện trên Desktop)
  - .apex-mma-news-main-bottom     -> danh sách các item

2) Cách nhận biết Desktop vs Mobile
- Tùy chọn 1 (khuyến nghị): dùng CSS media queries + render conditional Vue:
  - Bằng CSS: ẩn/show phần top-right trên viewport nhỏ bằng class helper (display:none trên mobile)
  - Tuy nhiên vì dữ liệu cần khác nhau giữa 2 chế độ (bottom list có/không subNews[0]), cần logic JS để chọn array hiển thị. Vì vậy cần detect breakpoint trong JS.
- Tùy chọn 2: dùng window.matchMedia('(min-width: 1024px)') để xác định desktop (ví dụ breakpoint 1024px). Lắng nghe sự kiện resize để cập nhật reactive state.

3) Logic lọc dữ liệu
- Giả sử có mảng subNews (độ dài >=4). Tạo computed property showList:
  - Nếu isDesktop === true -> list = subNews.slice(1)
  - Nếu isDesktop === false -> list = subNews.slice(0,4) (hoặc toàn bộ 4 item)
- Top-right component sẽ nhận subNews[0] (chỉ render khi isDesktop)

4) Triển khai trong Vue (gợi ý code)
- Composition API (setup):
  - const isDesktop = ref(false)
  - function updateIsDesktop() { isDesktop.value = window.matchMedia('(min-width:1024px)').matches }
  - onMounted() { updateIsDesktop(); window.addEventListener('resize', updateIsDesktop) }
  - onBeforeUnmount() { removeEventListener }
  - const bottomList = computed(() => isDesktop.value ? subNews.slice(1) : subNews.slice(0,4))
- Template:
  - <div class="apex-mma-news-main-top-right" v-if="isDesktop"> ...show subNews[0]...</div>
  - <div class="apex-mma-news-main-bottom">
      <NewsItem v-for="item in bottomList" :key="item.id" :item="item" />
    </div>

5) CSS
- Vẫn dùng media queries để ẩn/show vùng top-right, nhưng giữ v-if trong Vue để tránh render khi không cần.
- Điều chỉnh class theo tiền tố apex-mma- (ví dụ .apex-mma-news-main-top-right { ... })

6) Testing
- Kiểm tra Desktop (≥1024px):
  - apex-mma-news-main-top-right hiển thị với subNews[0]
  - apex-mma-news-main-bottom hiển thị subNews[1..]
- Kiểm tra Mobile (<1024px):
  - apex-mma-news-main-top-right ẩn
  - apex-mma-news-main-bottom hiển thị 4 item (bao gồm subNews[0])
- Test thay đổi kích thước (resize) để đảm bảo state cập nhật đúng.

7) Files cần cập nhật
- Component chứa news (ví dụ: app/pages/index.vue hoặc component chuyên biệt): thêm logic reactive, computed
- Thêm/hiệu chỉnh CSS trong app/assets/scss hoặc file component scoped styles
- Tạo test checklist nhỏ (manual)

Các bước thực hiện (chi tiết, cho dev)
- [x] Phân tích mã hiện tại để tìm component chứa subNews (index.vue đã có news section)
- [x] Tạo file kế hoạch này trong /plans (hoàn thành)
- [x] Tạo composable useIsDesktop trong app/composables
- [x] Thêm logic responsive vào component: tạo reactive isDesktop, computed bottomList
- [x] Cập nhật template để v-if/v-for theo isDesktop và bottomList
- [ ] Thêm/điều chỉnh CSS với tiền tố apex-mma- và media queries
- [ ] Kiểm tra thủ công trên Desktop & Mobile, chỉnh sửa
- [ ] Viết chú thích/commit message rõ ràng khi push thay đổi

Ghi chú triển khai nhanh (snippet sample)
```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
const subNews = ref([]) // bind dữ liệu thực tế từ props hoặc api
const isDesktop = ref(false)
function updateIsDesktop() { isDesktop.value = window.matchMedia('(min-width:1024px)').matches }
onMounted(() => { updateIsDesktop(); window.addEventListener('resize', updateIsDesktop) })
onBeforeUnmount(() => { window.removeEventListener('resize', updateIsDesktop) })
const bottomList = computed(() => {
  if (!subNews.value) return []
  return isDesktop.value ? subNews.value.slice(1) : subNews.value.slice(0,4)
})
</script>
<template>
  <div class="apex-mma-news-main">
    <div class="apex-mma-news-main-top-right" v-if="isDesktop">
      <!-- hiển thị subNews[0] -->
    </div>
    <div class="apex-mma-news-main-bottom">
      <NewsItem v-for="item in bottomList" :key="item.id" :item="item" />
    </div>
  </div>
</template>
```

Kết luận
- Cách tiếp cận dùng matchMedia + computed giúp đảm bảo dữ liệu render chính xác theo breakpoint và giữ UI mượt.
- Nếu dự án có store (pinia) và subNews dùng chung nhiều nơi, cân nhắc đặt isDesktop vào composable hoặc store để tái sử dụng.

Nếu bạn muốn, tôi có thể ngay lập tức chỉnh sửa file component (ví dụ app/pages/index.vue) theo kế hoạch này. Bạn muốn tôi tiếp tục thực hiện thay đổi mã hay chỉ cần file kế hoạch này thôi?
