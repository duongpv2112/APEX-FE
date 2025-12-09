<template>
  <header class="apex-mma-header">
    <div class="apex-mma-header__left">
      <div class="apex-mma-header__logo apex-mma-logo-brand"></div>
      <div class="apex-mma-header__brand">APEX</div>
    </div>
    <div class="apex-mma-header__right">
      <div class="apex-mma-header__icon-group">
        <button class="apex-mma-header__icon-btn">1</button>
        <button class="apex-mma-header__icon-btn">1</button>
        <button class="apex-mma-header__icon-btn">1</button>
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

<script setup lang="ts">
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
