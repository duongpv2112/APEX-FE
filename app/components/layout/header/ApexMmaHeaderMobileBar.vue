<template>
  <div class="apex-mma-header-mobilebar">
    <div class="apex-mma-container apex-mma-header-mobilebar__inner">
      <button
        class="apex-mma-header-mobilebar__burger"
        type="button"
        aria-label="Open menu"
        @click="$emit('open-off-canvas')"
      >
        <span class="apex-mma-header-mobilebar__burger-line" />
        <span class="apex-mma-header-mobilebar__burger-line" />
        <span class="apex-mma-header-mobilebar__burger-line" />
      </button>

      <NuxtLink class="apex-mma-header-mobilebar__logo" to="/" aria-label="Home">
        <NuxtImg
          class="apex-mma-header-mobilebar__logo-img"
          src="/images/logo-brand.svg"
          alt="APEX MMA"
          width="140"
          height="34"
        />
      </NuxtLink>

      <button
        class="apex-mma-header-mobilebar__user"
        type="button"
        aria-label="User (not implemented)"
        disabled
      >
        <span class="apex-mma-header-mobilebar__user-icon">👤</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e: "open-off-canvas"): void }>();
</script>

<style scoped lang="scss">
.apex-mma-header-mobilebar {
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.apex-mma-header-mobilebar__inner {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.apex-mma-header-mobilebar__burger {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
}

.apex-mma-header-mobilebar__burger-line {
  width: 22px;
  height: 2px;
  background: #111827;
  border-radius: 2px;
}

.apex-mma-header-mobilebar__logo {
  display: inline-flex;
  align-items: center;
}

.apex-mma-header-mobilebar__logo-img {
  width: 140px;
  height: auto;
}

.apex-mma-header-mobilebar__user {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 22px;
  background: #1ccfc9;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: not-allowed;
  opacity: 0.9;
}

.apex-mma-header-mobilebar__user-icon {
  font-size: 18px;
  line-height: 1;
}
</style>

