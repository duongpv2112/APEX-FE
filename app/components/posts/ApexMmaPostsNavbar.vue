<template>
  <nav class="apex-mma-posts-navbar" aria-label="Loại bài viết">
    <NuxtLink
      v-for="item in categories"
      :key="item.slug"
      :to="`/posts/categories/${item.slug}`"
      class="apex-mma-posts-navbar__item"
      :class="{ 'apex-mma-posts-navbar__item--active': item.slug === activeSlug }"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import type { PostsCategory } from "~/types/posts/posts.ui";

defineProps<{
  categories: PostsCategory[];
  activeSlug?: string;
}>();
</script>

<style scoped lang="scss">
.apex-mma-posts-navbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 8px 0 14px;
}

.apex-mma-posts-navbar__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.apex-mma-posts-navbar__item:hover:not(.apex-mma-posts-navbar__item--active) {
  background: #e5e7eb;
}

.apex-mma-posts-navbar__item--active {
  background: #111827;
  border-color: #111827;
  color: #ffffff;
}
</style>
