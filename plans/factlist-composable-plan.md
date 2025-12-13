# Kế hoạch: Tách `factList` (hard-code) trong `app/pages/index.vue` thành Composable

## 1) Mục tiêu
- **Hiện tại**: `factList` đang được fix cứng trong `app/pages/index.vue`.
- **Mục tiêu ngắn hạn**: đưa dữ liệu `factList` vào **một composable** để:
  - `index.vue` chỉ còn phần UI (render), không chứa dữ liệu mock.
  - Khi cần sửa dữ liệu mock thì sửa **một chỗ**.
- **Mục tiêu dài hạn**: chuẩn bị sẵn kiến trúc để về sau chuyển sang **gọi API** (SSR-friendly) mà không phải sửa UI nhiều.

## 2) Deliverables
1. Tạo composable mới:
   - `app/composables/useFacts.ts` (tên có thể điều chỉnh theo convention team)
2. Refactor `app/pages/index.vue`:
   - Bỏ `const factList = ref([...])`.
   - Thay bằng `const { factList, pending, error, refresh } = useFacts()` (hoặc API tương đương).
3. (Tuỳ chọn để chuẩn bị API): định nghĩa type rõ ràng + layer mapping DTO -> UI model.
4. (Tuỳ chọn khi bắt đầu tích hợp API thật): thêm endpoint Nitro mock:
   - `server/api/facts.get.ts` (hoặc `server/api/facts/index.get.ts`) trả dữ liệu JSON.

## 3) Success Criteria (tiêu chí hoàn thành)
- `index.vue` không còn dữ liệu fix cứng cho `factList`.
- UI carousel Fact vẫn render đúng như hiện tại.
- Composable chạy tốt trong SSR (không dùng `window`/DOM trực tiếp).
- Có đường nâng cấp rõ ràng: chỉ cần thay `fetcher` trong composable để gọi API thật.

## 4) Phạm vi thay đổi
- **Trong scope**: chỉ tách `factList` sang composable (các section khác của index hiện vẫn mock, không đụng tới).
- **Ngoài scope**: chưa cần làm API thật / auth / phân trang / route “Xem tất cả”.

## 5) Thiết kế Composable (API + Types)

### 5.1. Định nghĩa data model
Tạo type cho UI model, giữ cấu trúc đang dùng trong template:

```ts
export interface ApexFactItem {
  avatar: string
  image: string
  username: string
  /** Card “Tạo Fact mới” */
  isCreate?: boolean
}
```

Về sau khi có API thật, nên có DTO riêng để tách biệt:

```ts
export interface ApexFactDto {
  id: string
  userName: string
  userAvatarUrl: string
  coverImageUrl: string
}
```

Và hàm map:

```ts
function mapDtoToFactItem(dto: ApexFactDto): ApexFactItem {
  return {
    avatar: dto.userAvatarUrl,
    image: dto.coverImageUrl,
    username: dto.userName,
  }
}
```

### 5.2. “Create card” là local-only hay từ API?
Hiện tại item đầu tiên có `isCreate: true`.

Khuyến nghị:
- **Giữ create card là local-only** trong composable, vì đây là UI action (CTA) và thường không thuộc data từ backend.
- Khi fetch dữ liệu thật, ta luôn prepend create card:

```ts
const createCard: ApexFactItem = {
  avatar: 'https://i.imgur.com/0y8Ftya.png',
  image: 'https://i.imgur.com/1Q9Z1Zm.jpg',
  username: 'seal2002',
  isCreate: true,
}

const factList = computed(() => [createCard, ...factsFromApi.value])
```

### 5.3. Chọn cơ chế state: `useAsyncData` vs `useState`
Vì dự án dùng Nuxt SSR, mình đề xuất:
- Dùng **`useAsyncData`** (giống `useWixContent.ts`) để:
  - Fetch được trong SSR.
  - Có sẵn `pending/error/refresh`.
  - Có cache key rõ ràng.

Ngoài ra có thể wrap thêm `useState` nếu muốn chia sẻ state xuyên page, nhưng trong bài toán này chỉ cần `useAsyncData` là đủ.

### 5.4. API đề xuất cho composable
**File**: `app/composables/useFacts.ts`

Proposed signature:

```ts
export const useFacts = () => {
  // 1) fetch (mock hiện tại, API sau)
  // 2) trả về data đã chuẩn hoá cho UI
  return {
    factList,   // ComputedRef<ApexFactItem[]>
    pending,    // Ref<boolean>
    error,      // Ref<any>
    refresh,    // () => Promise<void>
  }
}
```

### 5.5. Chiến lược fetch (mock -> API)
#### Giai đoạn 1 (ngay bây giờ): mock data trong composable
- Viết 1 hàm `getMockFacts()` trả mảng giống dữ liệu hiện tại (trừ create card nếu ta tách riêng).
- `useAsyncData` có thể trả ngay `Promise.resolve(getMockFacts())` để vẫn giữ API thống nhất.

#### Giai đoạn 2 (khi có API): thay fetcher
- Thay hàm fetch bằng `$fetch('/api/facts')` (hoặc base URL từ `runtimeConfig.public`).
- Giữ nguyên output shape (ApexFactItem) để UI không đổi.

Ví dụ:

```ts
const { data, pending, error, refresh } = useAsyncData(
  'apex-facts',
  async () => {
    const dto = await $fetch<ApexFactDto[]>('/api/facts')
    return dto.map(mapDtoToFactItem)
  }
)
```

## 6) Kế hoạch refactor `app/pages/index.vue`

### 6.1. Thay đổi trong `<script setup>`
- Xoá block `const factList = ref([...])`.
- Import và dùng composable:

```ts
import { useFacts } from '~/composables/useFacts'

const { factList } = useFacts()
```

Nếu muốn hiển thị trạng thái loading/error (tuỳ chọn):

```ts
const { factList, pending, error, refresh } = useFacts()
```

### 6.2. Template
- Không cần đổi nhiều: `v-for="(item, idx) in factList"` giữ nguyên.
- Tuỳ chọn: hiển thị skeleton hoặc placeholder nếu `pending`.

## 7) File/đường dẫn dự kiến thay đổi
- **Mới**: `app/composables/useFacts.ts`
- **Sửa**: `app/pages/index.vue`
- **Tuỳ chọn** (khi cần mock API qua Nitro): `server/api/facts.get.ts`

## 8) Checklist triển khai (theo thứ tự)
1. [ ] Tạo file `app/composables/useFacts.ts`:
   - [ ] Khai báo `ApexFactItem`.
   - [ ] Tạo `createCard`.
   - [ ] Implement fetch mock bằng `useAsyncData('apex-facts', ...)`.
   - [ ] Trả ra `factList` (computed: prepend create card) + `pending/error/refresh`.
2. [ ] Refactor `app/pages/index.vue`:
   - [ ] Import `useFacts`.
   - [ ] Xoá mock `factList` cũ.
   - [ ] Đảm bảo template không lỗi types.
3. [ ] Chạy kiểm tra thủ công:
   - [ ] `npm run dev`, vào trang home, carousel render đủ items.
   - [ ] Resize mobile/tablet/desktop xem `styleCarouselItem` vẫn hoạt động.
4. [ ] (Tuỳ chọn) Chuẩn bị endpoint mock `server/api/facts.get.ts` và chuyển composable sang `$fetch`.

## 9) Lưu ý SSR & conventions
- Không dùng `window` trong composable (trừ khi bọc trong `onMounted`). Với fetch data thì không cần.
- `useAsyncData` là SSR-safe.
- Naming CSS không bị ảnh hưởng (vì chỉ tách logic data). Nếu sau này thêm UI loading/error, nhớ tuân thủ prefix `apex-mma-`.

## 10) Gợi ý mở rộng sau này (không bắt buộc làm ngay)
- Thêm param cho `useFacts({ limit, cursor })` để hỗ trợ phân trang.
- Thêm cache strategy:
  - dùng key phụ thuộc params: `apex-facts-${limit}-${cursor}`.
- Chuẩn hoá lỗi:
  - map lỗi API sang message UI.
- Nếu fact dùng lại nhiều nơi: cân nhắc đưa về Pinia store (nhưng composable là đủ cho scope hiện tại).
