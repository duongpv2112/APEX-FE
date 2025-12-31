<template>
  <NuxtLink
    class="apex-mma-sidebar-post"
    :to="{ name: 'posts-slug', params: { slug: item.slug } }"
  >
    <div class="apex-mma-sidebar-post__thumb">
      <NuxtImg
        v-if="item.image"
        class="apex-mma-sidebar-post__thumb-img"
        :src="item.image"
        :alt="item.title"
        width="120"
        height="86"
        sizes="120px"
        format="webp"
        fit="cover"
        loading="lazy"
      />
      <div v-else class="apex-mma-sidebar-post__thumb-img apex-mma-sidebar-post__thumb-img--placeholder" />
    </div>
    <div class="apex-mma-sidebar-post__info">
      <div class="apex-mma-sidebar-post__title">{{ item.title }}</div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { HomeSubPostsItem } from "~/types/posts/posts.ui";

defineProps<{ item: HomeSubPostsItem }>();
</script>

<style scoped lang="scss">
.apex-mma-sidebar-post {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 12px;
  text-decoration: none;
  color: inherit;
  align-items: start;
}

.apex-mma-sidebar-post__thumb {
  border-radius: 6px;
  overflow: hidden;
  background: #f3f4f6;
}

.apex-mma-sidebar-post__thumb-img {
  width: 120px;
  height: 86px;
  object-fit: cover;
}

.apex-mma-sidebar-post__thumb-img--placeholder {
  background: linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%);
}

.apex-mma-sidebar-post__title {
  font-weight: 800;
  font-size: 14px;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apex-mma-sidebar-post:hover .apex-mma-sidebar-post__title {
  color: #1a73e8;
}
</style>

