<template>
  <section class="apex-mma-home-hero" aria-label="Top stories">
    <div class="apex-mma-container">
      <div class="apex-mma-home-hero__grid">
        <!-- 1) Big -->
        <article class="apex-mma-home-hero__item apex-mma-home-hero__item--big">
          <ApexMmaHomeHeroCard
            v-if="items[0]"
            :item="items[0]"
            size="big"
          />
        </article>

        <!-- 2) Wide -->
        <article class="apex-mma-home-hero__item apex-mma-home-hero__item--wide">
          <ApexMmaHomeHeroCard
            v-if="items[1]"
            :item="items[1]"
            size="wide"
          />
        </article>

        <!-- 3) Small -->
        <article class="apex-mma-home-hero__item apex-mma-home-hero__item--small1">
          <ApexMmaHomeHeroCard
            v-if="items[2]"
            :item="items[2]"
            size="small"
          />
        </article>
        <article class="apex-mma-home-hero__item apex-mma-home-hero__item--small2">
          <ApexMmaHomeHeroCard
            v-if="items[3]"
            :item="items[3]"
            size="small"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HomeSubPostsItem } from "~/types/posts/posts.ui";
import ApexMmaHomeHeroCard from "~/components/home/ApexMmaHomeHeroCard.vue";

defineProps<{
  items: HomeSubPostsItem[];
}>();
</script>

<style scoped lang="scss">
.apex-mma-home-hero {
  padding: 12px 0 0;
}

.apex-mma-home-hero__grid {
  display: grid;
  /* Mobile/tablet theo layout mẫu:
    - Big: full width
    - Wide: full width
    - 2 Small: 2 cột
  */
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 5px;
}

.apex-mma-home-hero__item--big,
.apex-mma-home-hero__item--wide {
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .apex-mma-home-hero__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Desktop layout: 2 columns x 2 rows with a big tile */
@media (min-width: 992px) {
  .apex-mma-home-hero__grid {
    /* Layout A:
      - Big: 2 cột x 2 hàng (bên trái)
      - Right: 2 cột
        - Wide: span 2 cột (hàng trên)
        - 2 Small: mỗi cái 1 cột (hàng dưới)
    */
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(2, 250px);
  }

  /* reset span full-width ở mobile/tablet */
  .apex-mma-home-hero__item--big,
  .apex-mma-home-hero__item--wide {
    grid-column: auto;
  }

  .apex-mma-home-hero__item--big {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
  }

  .apex-mma-home-hero__item--wide {
    grid-column: 3 / span 2;
    grid-row: 1;
  }

  .apex-mma-home-hero__item--small1 {
    grid-column: 3;
    grid-row: 2;
  }

  .apex-mma-home-hero__item--small2 {
    grid-column: 4;
    grid-row: 2;
  }
}
</style>

