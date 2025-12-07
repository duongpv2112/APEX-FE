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
main {
  min-height: 60vh;
}
</style>
