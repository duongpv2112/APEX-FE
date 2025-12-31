<template>
  <div class="apex-mma-header-navbar">
    <div class="apex-mma-container apex-mma-header-navbar__inner">
      <nav class="apex-mma-header-navbar__menu" aria-label="Main navigation">
        <NuxtLink
          v-for="c in categories"
          :key="c.slug"
          class="apex-mma-header-navbar__item"
          :to="{ name: 'posts-categories-category', params: { category: c.slug } }"
        >
          <span class="apex-mma-header-navbar__dot" aria-hidden="true" />
          <span class="apex-mma-header-navbar__label">{{ c.label }}</span>
        </NuxtLink>

        <!-- Mega menu tabs: NOTE scope phase 1 chưa làm -->
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostCategories } from "~/composables/usePostCategories";

const { categories } = usePostCategories();
</script>

<style scoped lang="scss">
.apex-mma-header-navbar {
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.apex-mma-header-navbar__inner {
  height: 54px;
  display: flex;
  align-items: center;
}

.apex-mma-header-navbar__menu {
  display: flex;
  align-items: center;
  gap: 18px;
  overflow: hidden;
}

.apex-mma-header-navbar__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #111827;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
  padding: 10px 0;
}

.apex-mma-header-navbar__item:hover {
  color: #1a73e8;
}

.apex-mma-header-navbar__dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: #1a73e8;
  opacity: 0.6;
}
</style>

