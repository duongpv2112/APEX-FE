<template>
  <div>
    <header>
      <slot name="header"></slot>
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
// Layout mặc định
</script>

<style scoped lang="scss">
main {
  min-height: 60vh;
}
</style>
