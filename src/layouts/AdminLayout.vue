<template>
  <div class="admin-layout">
    <aside>
      <slot name="sidebar"></slot>
    </aside>
    <div class="admin-content">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
// Layout cho trang Admin
</script>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  min-height: 100vh;
}
aside {
  width: 220px;
  background: #f5f5f5;
}
.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1;
}
</style>
