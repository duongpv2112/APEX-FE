<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </div>
</template>

<script setup>
import Header from '~/components/layout/Header.vue'
</script>

<style scoped>
main {
  max-width: 1216px;
  margin: 0 auto;
}
</style>
