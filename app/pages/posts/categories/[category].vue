<template>
  <section class="apex-mma-posts-category-page">
    <div class="apex-mma-posts-category-page__container">
      <ApexMmaPostsNavbar
        :categories="categories"
        :active-slug="categorySlug"
      />

      <h1 class="apex-mma-posts-category-page__title">
        {{ activeCategory?.label ?? "Bài viết" }}
      </h1>
      <p v-if="activeCategory?.description" class="apex-mma-posts-category-page__desc">
        {{ activeCategory.description }}
      </p>

      <div v-if="pendingList" class="apex-mma-posts-category-page__loading">
        Đang tải danh sách bài viết...
      </div>

      <div v-else-if="errorList" class="apex-mma-posts-category-page__error">
        Không tải được danh sách bài viết.
      </div>

      <div v-else class="apex-mma-posts-category-page__list">
        <NuxtLink
          v-for="item in listItems"
          :key="item.slug"
          class="apex-mma-posts-category-page__card"
          :to="{ name: 'posts-slug', params: { slug: item.slug } }"
        >
          <div class="apex-mma-posts-category-page__card-body">
            <h3 class="apex-mma-posts-category-page__card-title">{{ item.title }}</h3>
            <p v-if="item.desc" class="apex-mma-posts-category-page__card-desc">
              {{ item.desc }}
            </p>
            <div class="apex-mma-posts-category-page__card-meta">
              <span v-if="item.author" class="apex-mma-posts-category-page__card-author">
                {{ item.author }}
              </span>
              <span v-if="item.publishedAt" class="apex-mma-posts-category-page__card-date">
                {{ formatDateTime(item.publishedAt) }}
              </span>
            </div>
          </div>
        </NuxtLink>

        <div v-if="!listItems.length" class="apex-mma-posts-category-page__empty">
          Chưa có bài viết cho mục này.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatDateTime } from "@/utils";
import ApexMmaPostsNavbar from "~/components/posts/ApexMmaPostsNavbar.vue";

const route = useRoute();
const categorySlug = computed(() => route.params.category as string);

const { categories, getBySlug, isCategorySlug } = usePostCategories();
const activeCategory = computed(() => getBySlug(categorySlug.value));

// Nếu slug không thuộc category fix cứng, trả 404 để tránh url rác.
if (!isCategorySlug(categorySlug.value)) {
  throw createError({ statusCode: 404, statusMessage: "Category not found" });
}

const {
  items: listItems,
  pending: pendingList,
  error: errorList,
} = usePostsByCategory(categorySlug);

useSeoMeta({
  title: computed(
    () => `${activeCategory.value?.label ?? "Bài viết"} | APEX MMA`
  ),
  ogTitle: computed(
    () => `${activeCategory.value?.label ?? "Bài viết"} | APEX MMA`
  ),
  description: computed(() => activeCategory.value?.description ?? ""),
  ogDescription: computed(() => activeCategory.value?.description ?? ""),
});
</script>

<style scoped lang="scss">
.apex-mma-posts-category-page {
  padding: 16px 12px 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.apex-mma-posts-category-page__container {
  width: 100%;
  max-width: 860px;
}

.apex-mma-posts-category-page__breadcrumb {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.apex-mma-posts-category-page__breadcrumb-link {
  color: #2563eb;
  text-decoration: none;
}

.apex-mma-posts-category-page__breadcrumb-link:hover {
  text-decoration: underline;
}

.apex-mma-posts-category-page__breadcrumb-sep {
  color: #9ca3af;
}

.apex-mma-posts-category-page__breadcrumb-current {
  color: #4b5563;
}

.apex-mma-posts-category-page__title {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.3;
  color: #111827;
  margin: 4px 0 8px;
}

.apex-mma-posts-category-page__desc {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 14px;
}

.apex-mma-posts-category-page__loading,
.apex-mma-posts-category-page__error,
.apex-mma-posts-category-page__empty {
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 14px;
}

.apex-mma-posts-category-page__loading {
  background: #eff6ff;
  color: #1d4ed8;
}

.apex-mma-posts-category-page__error {
  background: #fef2f2;
  color: #b91c1c;
}

.apex-mma-posts-category-page__empty {
  background: #f9fafb;
  color: #6b7280;
  margin-top: 12px;
}

.apex-mma-posts-category-page__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.apex-mma-posts-category-page__card {
  display: block;
  text-decoration: none;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 14px;
  background: #ffffff;
  color: inherit;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.apex-mma-posts-category-page__card:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.apex-mma-posts-category-page__card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #111827;
}

.apex-mma-posts-category-page__card-desc {
  font-size: 14px;
  margin: 0 0 10px;
  color: #4b5563;
}

.apex-mma-posts-category-page__card-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6b7280;
}

@media (min-width: 768px) {
  .apex-mma-posts-category-page {
    padding-top: 24px;
  }

  .apex-mma-posts-category-page__title {
    font-size: 30px;
  }
}
</style>

