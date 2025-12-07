<template>
  <header class="apex-mma-header">
    <div class="apex-mma-header__left">
      <div class="apex-mma-header__logo apex-mma-logo-brand"></div>
      <div class="apex-mma-header__brand">APEX</div>
      <n-input
        class="apex-mma-header__search"
        secondary
        type="text"
        placeholder="Tìm sản phẩm công nghệ, cộng đồng, bạn bè..."
        round
      />
    </div>
    <div class="apex-mma-header__right">
      <!-- Nút chính (ví dụ: Viết bài chia sẻ) -->
      <template v-for="(btn, idx) in actionButtons" :key="idx">
        <n-button
          v-if="btn.show === 'main'"
          :class="btn.class"
          :type="btn.type"
          :color="btn.color"
          round
          @click="btn.action"
        >
          {{ btn.label }}
        </n-button>
      </template>
      <div class="apex-mma-header__icon-group">
        <template
          v-for="(btn, idx) in actionButtons.filter((b) => b.show === 'icon')"
          :key="'icon-' + idx"
        >
          <n-button
            :class="btn.class"
            :type="btn.type"
            secondary
            circle
            @click="btn.action"
          >
            {{ btn.icon }}
          </n-button>
        </template>
      </div>
      <div class="apex-mma-header__avatar">
        <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="18" fill="#1CCFC9" />
          <path
            d="M18 19.5c2.485 0 4.5-2.015 4.5-4.5S20.485 10.5 18 10.5 13.5 12.515 13.5 15s2.015 4.5 4.5 4.5Zm0 1.5c-3.038 0-9 1.522-9 4.5V27h18v-1.5c0-2.978-5.962-4.5-9-4.5Z"
            fill="#fff"
          />
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>
import { NButton, NInput } from "naive-ui";
import { ref } from "vue";

// Danh sách nút chức năng cho Header
const actionButtons = [
  {
    label: "Viết bài chia sẻ",
    type: "info",
    color: "#2176ff",
    class: "apex-mma-header__post-btn",
    action: () => {
      // TODO: Thay thế bằng logic thực tế (emit, router, ...)
      console.log("Viết bài chia sẻ");
    },
    show: "main",
  },
  // 3 nút icon, có thể thay icon bằng số hoặc icon thực tế nếu cần
  {
    icon: "1",
    type: "default",
    class: "apex-mma-header__icon-btn",
    action: () => {
      console.log("Icon 1");
    },
    show: "icon",
  },
  {
    icon: "1",
    type: "default",
    class: "apex-mma-header__icon-btn",
    action: () => {
      console.log("Icon 2");
    },
    show: "icon",
  },
  {
    icon: "1",
    type: "default",
    class: "apex-mma-header__icon-btn",
    action: () => {
      console.log("Icon 3");
    },
    show: "icon",
  },
];
</script>

<style scoped lang="scss">
.apex-mma-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);

  .apex-mma-header__left {
    display: flex;
    align-items: center;
    flex: 1 1 0;
    min-width: 0;

    .apex-mma-header__logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 8px;
      cursor: pointer;
    }

    .apex-mma-header__brand {
      min-width: 80px;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .apex-mma-header__search {
    flex: 1 1 0;
    max-width: 400px;
    padding: 4px 16px;
    border: none;
    border-radius: 50px;
    background: #f1f2f6;
    font-size: 14px;
    color: #2d3a4a;
    outline: none;
    margin-left: 8px;

    &:deep(.n-input-wrapper) {
      padding-left: 0;
      padding-right: 0;
    }

    &:deep(.n-input__input-el) {
      height: 24px;
      line-height: 24px;
    }
  }

  .apex-mma-header__right {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 24px;
  }

  .apex-mma-header__icon-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .apex-mma-header__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: #1ccfc9;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
