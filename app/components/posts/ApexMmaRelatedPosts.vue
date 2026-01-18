<template>
  <section v-if="shouldRender" class="apex-mma-related-posts">
    <div class="apex-mma-related-posts__header">
      <h3 class="apex-mma-related-posts__title">Bài viết liên quan</h3>
    </div>

    <div v-if="pending" class="apex-mma-related-posts__state apex-mma-related-posts__loading">
      Đang tải bài viết liên quan...
    </div>

    <div v-else-if="error" class="apex-mma-related-posts__state apex-mma-related-posts__error">
      <span>Không tải được bài viết liên quan.</span>
      <button class="apex-mma-related-posts__retry" type="button" @click="onRetry">
        Thử lại
      </button>
    </div>

    <div v-else class="apex-mma-related-posts__list">
      <article
        v-for="(item, idx) in items"
        :key="item.slug || idx"
        class="apex-mma-related-posts__item"
      >
        <NuxtLink class="apex-mma-related-posts__thumb" :to="`/posts/${item.slug}`">
          <NuxtImg
            class="apex-mma-related-posts__thumb-img"
            :src="item.image || ''"
            :alt="item.title"
            width="220"
            height="140"
            sizes="(max-width: 767px) 100vw, 220px"
            format="webp"
            fit="cover"
            loading="lazy"
          />
        </NuxtLink>

        <div class="apex-mma-related-posts__body">
          <div class="apex-mma-related-posts__tags" aria-label="Chuyên mục">
            <NuxtLink
              v-for="(tag, tagIdx) in (item.categories ?? [])"
              :key="`${idx}-${tagIdx}`"
              class="apex-mma-related-posts__tag"
              :to="{ path: `/posts/categories/${tag.slug}` }"
            >
              {{ tag.name }}
            </NuxtLink>
          </div>

          <NuxtLink class="apex-mma-related-posts__item-title" :to="`/posts/${item.slug}`">
            {{ item.title }}
          </NuxtLink>

          <p v-if="item.desc" class="apex-mma-related-posts__excerpt">
            {{ item.desc }}
          </p>

          <div v-if="item.author" class="apex-mma-related-posts__author">
            {{ item.author }}
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PostsListItem } from "~/types/posts/posts.ui";

const props = withDefaults(
  defineProps<{
    items: PostsListItem[];
    pending: boolean;
    error: unknown;
  }>(),
  {
    items: () => [],
    pending: false,
    error: null,
  }
);

const emit = defineEmits<{
  (e: "retry"): void;
}>();

const onRetry = () => emit("retry");

/**
 * Ẩn section nếu không có items.
 * Vẫn render trong trạng thái loading/error để user có feedback.
 */
const shouldRender = computed(() => {
  if (props.pending) return true;
  if (props.error) return true;
  return (props.items?.length ?? 0) > 0;
});
</script>

<style scoped lang="scss">
.apex-mma-related-posts {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;
}

.apex-mma-related-posts__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.apex-mma-related-posts__title {
  font-size: 18px;
  font-weight: 900;
  color: #111827;
  margin: 0;
}

.apex-mma-related-posts__state {
  width: 100%;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 14px;
}

.apex-mma-related-posts__loading {
  background: #eff6ff;
  color: #1d4ed8;
}

.apex-mma-related-posts__error {
  background: #fef2f2;
  color: #b91c1c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.apex-mma-related-posts__retry {
  appearance: none;
  border: 1px solid #fecaca;
  background: #fff;
  color: #b91c1c;
  padding: 6px 10px;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
}

.apex-mma-related-posts__retry:hover {
  background: #fff5f5;
}

.apex-mma-related-posts__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.apex-mma-related-posts__item {
  display: flex;
  gap: 14px;
  align-items: stretch;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  padding: 12px;
}

.apex-mma-related-posts__thumb {
  width: 220px;
  max-width: 220px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f3f4f6;
}

.apex-mma-related-posts__thumb-img {
  width: 100%;
  height: 100%;
}

.apex-mma-related-posts__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.apex-mma-related-posts__tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.apex-mma-related-posts__tag {
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
  color: #2563eb;
}

.apex-mma-related-posts__tag:hover {
  text-decoration: underline;
}

.apex-mma-related-posts__item-title {
  font-size: 18px;
  font-weight: 900;
  color: #111827;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apex-mma-related-posts__item-title:hover {
  color: #2563eb;
}

.apex-mma-related-posts__excerpt {
  margin: 0;
  font-size: 14px;
  line-height: 1.45;
  color: #4b5563;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apex-mma-related-posts__author {
  margin-top: auto;
  font-size: 13px;
  font-weight: 800;
  color: #6b7280;
}

@media (max-width: 767px) {
  .apex-mma-related-posts__item {
    flex-direction: column;
  }

  .apex-mma-related-posts__thumb {
    width: 100%;
    max-width: none;
    aspect-ratio: 16 / 9;
  }
}
</style>
