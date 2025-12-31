<template>
  <NuxtLink
    class="apex-mma-hero-card"
    :class="`apex-mma-hero-card--${size}`"
    :to="{ name: 'posts-slug', params: { slug: item.slug } }"
  >
    <div class="apex-mma-hero-card__media">
      <NuxtImg
        v-if="item.image"
        class="apex-mma-hero-card__img"
        :src="item.image"
        :alt="item.title"
        width="900"
        height="600"
        sizes="(max-width: 767px) 100vw, (max-width: 1200px) 60vw, 720px"
        format="webp"
        fit="cover"
        loading="lazy"
      />
      <div v-else class="apex-mma-hero-card__img apex-mma-hero-card__img--placeholder" />
      <div class="apex-mma-hero-card__overlay" />
    </div>

    <div class="apex-mma-hero-card__content">
      <h3 class="apex-mma-hero-card__title">
        {{ item.title }}
      </h3>
      <div v-if="item.author" class="apex-mma-hero-card__meta">
        <span class="apex-mma-hero-card__author">{{ item.author }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { HomeSubPostsItem } from "~/types/posts/posts.ui";

defineProps<{
  item: HomeSubPostsItem;
  size: "big" | "wide" | "small";
}>();
</script>

<style scoped lang="scss">
.apex-mma-hero-card {
  display: block;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background: #111;
  text-decoration: none;
  height: 220px;
}

.apex-mma-hero-card__media,
.apex-mma-hero-card__img {
  width: 100%;
  height: 100%;
}

.apex-mma-hero-card__img {
  object-fit: cover;
}

.apex-mma-hero-card__img--placeholder {
  background: linear-gradient(135deg, #2b2b2b 0%, #111 100%);
}

.apex-mma-hero-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 35%, rgba(0, 0, 0, 0.75) 100%);
}

.apex-mma-hero-card__content {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  z-index: 2;
}

.apex-mma-hero-card__title {
  color: #fff;
  font-family: var(--apex-mma-font-heading, inherit);
  font-weight: 800;
  line-height: 1.18;
  font-size: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apex-mma-hero-card__meta {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: 600;
}

@media (min-width: 992px) {
  .apex-mma-hero-card--big {
    height: 100%;
  }

  .apex-mma-hero-card--big .apex-mma-hero-card__title {
    font-size: 28px;
  }

  .apex-mma-hero-card--wide,
  .apex-mma-hero-card--small {
    height: 100%;
  }

  .apex-mma-hero-card--wide .apex-mma-hero-card__title {
    font-size: 18px;
  }

  .apex-mma-hero-card--small .apex-mma-hero-card__title {
    font-size: 16px;
  }
}
</style>

