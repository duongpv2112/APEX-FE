<template>
  <div class="apex-mma-page">
    <ApexMmaSiteHeader />
    <ApexMmaOffCanvasNav />

    <main class="apex-mma-page__main apex-mma-site-main">
      <NuxtPage />
    </main>

    <ApexMmaSiteFooter />
    <ApexMmaBackToTop />
  </div>
</template>

<script setup>
import ApexMmaSiteHeader from "~/components/layout/ApexMmaSiteHeader.vue";
import ApexMmaOffCanvasNav from "~/components/layout/ApexMmaOffCanvasNav.vue";
import ApexMmaSiteFooter from "~/components/layout/ApexMmaSiteFooter.vue";
import ApexMmaBackToTop from "~/components/layout/ApexMmaBackToTop.vue";
</script>

<style scoped lang="scss">
.apex-mma-site-main {
  width: 100%;
}
</style>
