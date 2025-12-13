<template>
  <section class="apex-mma-news-detail-section">
    <div class="apex-mma-news-detail-container">
      <div class="apex-mma-news-detail-breadcrumb">
        <NuxtLink class="apex-mma-news-detail-breadcrumb-link" to="/">
          Trang chủ
        </NuxtLink>
        <span class="apex-mma-news-detail-breadcrumb-sep">/</span>
        <span class="apex-mma-news-detail-breadcrumb-current">Tin tức</span>
      </div>

      <div v-if="pending" class="apex-mma-news-detail-loading">
        Đang tải bài viết...
      </div>

      <div v-else-if="error || !newsDetail" class="apex-mma-news-detail-error">
        Bài viết không tồn tại hoặc đã bị xoá.
      </div>

      <template v-else>
        <h1 class="apex-mma-news-detail-title">
          {{ newsDetail.title }}
        </h1>

        <div class="apex-mma-news-detail-meta">
          <span class="apex-mma-news-detail-author">{{ newsDetail.author }}</span>
          <span class="apex-mma-news-detail-dot">•</span>
          <span class="apex-mma-news-detail-date">
            {{ newsDetail.publishedAt }}
          </span>
          <template v-if="newsDetail.readingTime">
            <span class="apex-mma-news-detail-dot">•</span>
            <span class="apex-mma-news-detail-reading">
              {{ newsDetail.readingTime }}
            </span>
          </template>
        </div>

        <div v-if="newsDetail.image" class="apex-mma-news-detail-cover-wrap">
          <NuxtImg
            :src="newsDetail.image"
            :alt="newsDetail.title"
            class="apex-mma-news-detail-cover"
          />
        </div>

        <article class="apex-mma-news-detail-content">
          <p
            v-for="(para, idx) in paragraphs"
            :key="idx"
            class="apex-mma-news-detail-paragraph"
          >
            {{ para }}
          </p>
        </article>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NuxtImg } from "#components";
import type { ApexNewsDetail } from "../../../shared/newsMock";

const route = useRoute();

const slug = computed(() => route.params.slug as string);

const { newsDetail, pending, error } = useNewsDetail(slug);

const paragraphs = computed(() => {
  if (!newsDetail.value?.content) return [];
  return newsDetail.value.content.split("\n\n").filter(Boolean);
});

useSeoMeta({
  title: computed(
    () => newsDetail.value?.title ?? "Chi tiết bài viết | APEX MMA"
  ),
  ogTitle: computed(
    () => newsDetail.value?.title ?? "Chi tiết bài viết | APEX MMA"
  ),
  description: computed(() => newsDetail.value?.desc ?? ""),
  ogDescription: computed(() => newsDetail.value?.desc ?? ""),
  ogImage: computed(() => newsDetail.value?.image ?? ""),
});
</script>

<style scoped lang="scss">
.apex-mma-news-detail-section {
  padding: 16px 12px 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.apex-mma-news-detail-container {
  width: 100%;
  max-width: 860px;
}

.apex-mma-news-detail-breadcrumb {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.apex-mma-news-detail-breadcrumb-link {
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.apex-mma-news-detail-breadcrumb-sep {
  color: #9ca3af;
}

.apex-mma-news-detail-breadcrumb-current {
  color: #4b5563;
}

.apex-mma-news-detail-title {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.3;
  color: #111827;
  margin-bottom: 12px;
}

.apex-mma-news-detail-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.apex-mma-news-detail-author {
  font-weight: 600;
}

.apex-mma-news-detail-dot {
  color: #d1d5db;
}

.apex-mma-news-detail-reading {
  font-style: italic;
}

.apex-mma-news-detail-cover-wrap {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}

.apex-mma-news-detail-cover {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.apex-mma-news-detail-content {
  font-size: 15px;
  line-height: 1.7;
  color: #111827;
}

.apex-mma-news-detail-paragraph {
  margin-bottom: 14px;
}

.apex-mma-news-detail-loading,
.apex-mma-news-detail-error {
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 14px;
}

.apex-mma-news-detail-loading {
  background: #eff6ff;
  color: #1d4ed8;
}

.apex-mma-news-detail-error {
  background: #fef2f2;
  color: #b91c1c;
}

@media (min-width: 768px) {
  .apex-mma-news-detail-section {
    padding-top: 24px;
  }

  .apex-mma-news-detail-title {
    font-size: 30px;
  }

  .apex-mma-news-detail-content {
    font-size: 16px;
  }
}
</style>
