<template>
  <div class="apex-mma-header-midbar">
    <div class="apex-mma-container apex-mma-header-midbar__inner">
      <NuxtLink class="apex-mma-header-midbar__logo" to="/" aria-label="Home">
        <NuxtImg
          class="apex-mma-header-midbar__logo-img"
          src="/images/logo-brand.svg"
          alt="APEX MMA"
          width="180"
          height="44"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.apex-mma-header-midbar {
  background: #ffffff;
}

.apex-mma-header-midbar__inner {
  display: flex;
  align-items: center;
  height: 84px;
}

.apex-mma-header-midbar__logo {
  display: inline-flex;
  align-items: center;
}

.apex-mma-header-midbar__logo-img {
  display: block;
  width: 180px;
  height: auto;
}
</style>

