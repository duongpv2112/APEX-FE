<template>
  <section class="apex-mma-posts-detail-page">
    <div class="apex-mma-posts-detail-page__container">
      <div class="apex-mma-posts-detail-page__breadcrumb">
        <NuxtLink class="apex-mma-posts-detail-page__breadcrumb-link" to="/">
          Trang chủ
        </NuxtLink>
        <template v-if="detailCategory">
          <span class="apex-mma-posts-detail-page__breadcrumb-sep">/</span>
          <NuxtLink
            class="apex-mma-posts-detail-page__breadcrumb-link"
            :to="`/posts/categories/${detailCategory.slug}`"
          >
            {{ detailCategory.label }}
          </NuxtLink>
        </template>
      </div>

      <div v-if="pending" class="apex-mma-posts-detail-loading">
        Đang tải bài viết...
      </div>

      <div v-else-if="error || !newsDetail" class="apex-mma-posts-detail-error">
        Bài viết không tồn tại hoặc đã bị xoá.
      </div>

      <template v-else>
        <h1 class="apex-mma-posts-detail-title apex-mma-title">
          {{ newsDetail.title }}
        </h1>

        <div class="apex-mma-posts-detail-meta apex-mma-text">
          <span class="apex-mma-posts-detail-author">{{ newsDetail.author }}</span>
          <span class="apex-mma-posts-detail-dot">•</span>
          <span class="apex-mma-posts-detail-date">
            {{ publishedAtText }}
          </span>
          <template v-if="newsDetail.readingTime">
            <span class="apex-mma-posts-detail-dot">•</span>
            <span class="apex-mma-posts-detail-reading">
              {{ newsDetail.readingTime }}
            </span>
          </template>
        </div>

        <article class="apex-mma-posts-detail-content apex-mma-text">
          <!-- contentHtml từ backend có thể là nhiều thẻ <p>, <img>, ... => render thẳng để tránh mismatch SSR/hydration -->
          <div class="apex-mma-posts-detail-paragraph" v-html="newsDetail.content" />
        </article>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatDateTime } from "@/utils";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { getBySlug } = usePostCategories();

const { newsDetail, pending, error } = usePostsDetail(slug);

const detailCategory = computed(() => getBySlug(newsDetail.value?.categorySlug));

const publishedAtText = computed(() => {
  const raw = newsDetail.value?.publishedAt;
  if (!raw) return "";
  return formatDateTime(raw);
});

useSeoMeta({
  title: computed(() => newsDetail.value?.title ?? "Chi tiết bài viết | APEX MMA"),
  ogTitle: computed(() => newsDetail.value?.title ?? "Chi tiết bài viết | APEX MMA"),
  description: computed(() => newsDetail.value?.desc ?? ""),
  ogDescription: computed(() => newsDetail.value?.desc ?? ""),
});
</script>

<style scoped lang="scss">
.apex-mma-posts-detail-page {
  padding: 16px 12px 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.apex-mma-posts-detail-page__container {
  width: 100%;
  max-width: 860px;
}

.apex-mma-posts-detail-page__breadcrumb {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.apex-mma-posts-detail-page__breadcrumb-link {
  color: #2563eb;
  text-decoration: none;
}

.apex-mma-posts-detail-page__breadcrumb-sep {
  color: #9ca3af;
}

/* (breadcrumb category link render qua breadcrumb) */

/* Detail styles (copy từ page cũ, đổi prefix) */
.apex-mma-posts-detail-title {
  font-size: 26px;
  font-weight: 600;
  line-height: 1.3;
  color: #111827;
  margin-bottom: 12px;
}

.apex-mma-posts-detail-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.apex-mma-posts-detail-author {
  font-weight: 600;
}

.apex-mma-posts-detail-dot {
  color: #d1d5db;
}

.apex-mma-posts-detail-reading {
  font-style: italic;
}

.apex-mma-posts-detail-content {
  font-size: 15px;
  line-height: 1.7;
  color: #111827;
}

.apex-mma-posts-detail-paragraph {
  margin-bottom: 14px;
}

.apex-mma-posts-detail-loading,
.apex-mma-posts-detail-error {
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 14px;
}

.apex-mma-posts-detail-loading {
  background: #eff6ff;
  color: #1d4ed8;
}

.apex-mma-posts-detail-error {
  background: #fef2f2;
  color: #b91c1c;
}

@media (min-width: 768px) {
  .apex-mma-posts-detail-page {
    padding-top: 24px;
  }

  .apex-mma-posts-detail-title {
    font-size: 30px;
  }

  .apex-mma-posts-detail-content {
    font-size: 16px;
  }
}
</style>
