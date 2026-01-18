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
      <div v-else class="apex-mma-hero-card__img apex-mma-hero-card__img--placeholder"></div>
      <div class="apex-mma-hero-card__overlay"></div>
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

  /* animation tokens (dùng transform/opacity để mượt + tối ưu GPU) */
  /* mượt hơn: dùng ease-out nhẹ (vừa mượt vừa “đã”) */
  --apex-mma-hero-card-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --apex-mma-hero-card-dur: 360ms;
}

.apex-mma-hero-card__media,
.apex-mma-hero-card__img {
  width: 100%;
  height: 100%;
}

.apex-mma-hero-card__img {
  object-fit: cover;

  /* translateZ(0) để ép GPU compositing, giảm cảm giác giật khi hover */
  transform: translateZ(0) scale(1);
  transition: transform var(--apex-mma-hero-card-dur) var(--apex-mma-hero-card-ease);
  will-change: transform;
  backface-visibility: hidden;
  transform-origin: center;
}

.apex-mma-hero-card__img--placeholder {
  background: linear-gradient(135deg, #2b2b2b 0%, #111 100%);
}

.apex-mma-hero-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 35%, rgba(0, 0, 0, 0.75) 100%);

  /* Giữ overlay ở 1 composited layer để fade mượt hơn */
  transform: translateZ(0);
  backface-visibility: hidden;

  /* chuẩn bị lớp tint khi hover giống ảnh mẫu */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity var(--apex-mma-hero-card-dur) var(--apex-mma-hero-card-ease);
    will-change: opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
    background: linear-gradient(
      180deg,
      rgba(255, 92, 141, 0.18) 0%,
      rgba(255, 92, 141, 0.25) 45%,
      rgba(255, 60, 120, 0.52) 100%
    );
  }
}

.apex-mma-hero-card__content {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  z-index: 2;

  /* content đứng yên như template, chỉ title/meta trượt */
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

  transition: transform var(--apex-mma-hero-card-dur) var(--apex-mma-hero-card-ease);
  will-change: transform;
}

.apex-mma-hero-card__meta {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: 600;

  transition:
    opacity var(--apex-mma-hero-card-dur) ease,
    transform var(--apex-mma-hero-card-dur) ease;
  will-change: opacity, transform;
}

/* Chỉ áp dụng behavior hover khi thiết bị có hover (desktop/laptop). */
@media (hover: hover) and (pointer: fine) {
  /*
    Yêu cầu:
    - Không hover: chỉ hiện title
    - Hover: title trượt lên + author trượt lên và hiện
    - Unhover: title trượt xuống + author trượt xuống và ẩn
    - Overlay đổi màu + ảnh scale: đều transition 2 chiều
  */

  /* state mặc định */
  .apex-mma-hero-card__title {
    transform: translate3d(0, 0, 0);
  }

  .apex-mma-hero-card__meta {
    opacity: 0;
    transform: translate3d(0, 12px, 0);
  }

  .apex-mma-hero-card:hover .apex-mma-hero-card__img,
  .apex-mma-hero-card:focus-visible .apex-mma-hero-card__img {
    transform: translateZ(0) scale(1.08);
  }

  .apex-mma-hero-card:hover .apex-mma-hero-card__overlay::after,
  .apex-mma-hero-card:focus-visible .apex-mma-hero-card__overlay::after {
    opacity: 0.55;
  }

  .apex-mma-hero-card:hover .apex-mma-hero-card__title,
  .apex-mma-hero-card:focus-visible .apex-mma-hero-card__title {
    transform: translate3d(0, -14px, 0);
  }

  .apex-mma-hero-card:hover .apex-mma-hero-card__meta,
  .apex-mma-hero-card:focus-visible .apex-mma-hero-card__meta {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
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
