<template>
  <header class="apex-mma-site-header" role="banner">
    <div class="apex-mma-site-header__desktop">
      <ApexMmaHeaderTopBar />
      <ApexMmaHeaderMidBar />
      <ApexMmaHeaderNavBar />
    </div>

    <div class="apex-mma-site-header__mobile">
      <ApexMmaHeaderMobileBar @open-off-canvas="toggle" />
    </div>
  </header>
</template>

<script setup lang="ts">
import ApexMmaHeaderTopBar from "~/components/layout/header/ApexMmaHeaderTopBar.vue";
import ApexMmaHeaderMidBar from "~/components/layout/header/ApexMmaHeaderMidBar.vue";
import ApexMmaHeaderNavBar from "~/components/layout/header/ApexMmaHeaderNavBar.vue";
import ApexMmaHeaderMobileBar from "~/components/layout/header/ApexMmaHeaderMobileBar.vue";
import { useOffCanvasNav } from "~/composables/useOffCanvasNav";

const { toggle } = useOffCanvasNav();
</script>

<style scoped lang="scss">
.apex-mma-site-header {
  width: 100%;

  .apex-mma-site-header__desktop {
    display: none;
  }

  .apex-mma-site-header__mobile {
    display: block;
  }
}

@media (min-width: 992px) {
  .apex-mma-site-header {
    .apex-mma-site-header__desktop {
      display: block;
    }

    .apex-mma-site-header__mobile {
      display: none;
    }
  }
}
</style>

