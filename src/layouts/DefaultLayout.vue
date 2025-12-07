<template>
  <div>
    <header>
      <Header />
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
import Header from '../components/layout/Header.vue'
// Layout mặc định
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
