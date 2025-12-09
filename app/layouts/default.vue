<template>
  <div>
    <header>
      <Header></Header>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
import Header from "@/components/layout/Header.vue";
</script>

<style scoped lang="scss">
// header {
//   position: sticky;
//   top: 0;
//   left: 0;
//   right: 0;
// }

main {
  max-width: 1216px;
  margin: 0 auto;
}
</style>
