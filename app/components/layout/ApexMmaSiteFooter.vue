<template>
  <footer class="apex-mma-site-footer" role="contentinfo">
    <div class="apex-mma-container apex-mma-site-footer__inner">
      <NuxtLink class="apex-mma-site-footer__logo" to="/" aria-label="Home">
        <NuxtImg
          class="apex-mma-site-footer__logo-img"
          src="/images/logo-brand.svg"
          alt="APEX MMA"
          width="150"
          height="36"
        />
      </NuxtLink>

      <nav class="apex-mma-site-footer__menu" aria-label="Footer navigation">
        <a class="apex-mma-site-footer__menu-item" href="#">Buy Now</a>
        <a class="apex-mma-site-footer__menu-item" href="#">Documentation</a>
        <a class="apex-mma-site-footer__menu-item" href="#">Support</a>
        <a class="apex-mma-site-footer__menu-item" href="#">Contact</a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.apex-mma-site-footer {
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.apex-mma-site-footer__inner {
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.apex-mma-site-footer__logo {
  display: inline-flex;
  align-items: center;
}

.apex-mma-site-footer__logo-img {
  width: 150px;
  height: auto;
}

.apex-mma-site-footer__menu {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.apex-mma-site-footer__menu-item {
  color: #111827;
  font-weight: 700;
  font-size: 13px;
}

.apex-mma-site-footer__menu-item:hover {
  color: #1a73e8;
}

@media (max-width: 767px) {
  .apex-mma-site-footer__inner {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .apex-mma-site-footer__menu {
    justify-content: flex-start;
  }
}
</style>

