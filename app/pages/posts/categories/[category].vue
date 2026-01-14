<template>
  <section class="apex-mma-posts-category-page">
    <div class="apex-mma-container">
      <div class="apex-mma-layout__grid">
        <!-- MAIN -->
        <div class="apex-mma-posts-category-main">
          <div class="apex-mma-posts-category-page__breadcrumb">
            <NuxtLink class="apex-mma-posts-category-page__breadcrumb-link" to="/">
              Trang chủ
            </NuxtLink>
            <span class="apex-mma-posts-category-page__breadcrumb-sep">/</span>
            <span class="apex-mma-posts-category-page__breadcrumb-current">
              {{ activeCategory?.label ?? "Bài viết" }}
            </span>
          </div>

          <h1 class="apex-mma-posts-category-page__title apex-mma-title">
            {{ activeCategory?.label ?? "Bài viết" }}
          </h1>
          <p v-if="activeCategory?.description" class="apex-mma-posts-category-page__desc apex-mma-text">
            {{ activeCategory.description }}
          </p>

          <div v-if="pendingList" class="apex-mma-posts-category-page__loading apex-mma-text">
            Đang tải danh sách bài viết...
          </div>

          <div v-else-if="errorList" class="apex-mma-posts-category-page__error apex-mma-text">
            Không tải được danh sách bài viết.
          </div>

          <div v-else class="apex-mma-posts-category-page__list">
            <NuxtLink
              v-for="item in listItems"
              :key="item.slug"
              class="apex-mma-posts-category-page__card"
              :to="{ name: 'posts-slug', params: { slug: item.slug } }"
            >
              <div class="apex-mma-posts-category-page__card-thumb">
                <NuxtImg
                  v-if="item.image"
                  class="apex-mma-posts-category-page__card-thumb-img"
                  :src="item.image"
                  :alt="item.title"
                  width="280"
                  height="200"
                  sizes="(max-width: 991px) 120px, 280px"
                  format="webp"
                  fit="cover"
                  loading="lazy"
                />
                <div
                  v-else
                  class="apex-mma-posts-category-page__card-thumb-img apex-mma-posts-category-page__card-thumb-img--placeholder"
                />
              </div>

              <div class="apex-mma-posts-category-page__card-body">
                <div class="apex-mma-posts-category-page__card-chips" aria-label="Categories">
                  <span class="apex-mma-posts-category-page__card-chip">
                    {{ activeCategory?.label ?? "Bài viết" }}
                  </span>
                </div>

                <h3 class="apex-mma-posts-category-page__card-title apex-mma-title">
                  {{ item.title }}
                </h3>
                <p v-if="item.desc" class="apex-mma-posts-category-page__card-desc apex-mma-text">
                  {{ item.desc }}
                </p>
                <div class="apex-mma-posts-category-page__card-meta apex-mma-text">
                  <span v-if="item.publishedAt" class="apex-mma-posts-category-page__card-date">
                    <span class="apex-mma-posts-category-page__card-date-icon" aria-hidden="true">⏱</span>
                    {{ formatDateTime(item.publishedAt) }}
                  </span>
                  <span v-if="item.author" class="apex-mma-posts-category-page__card-author">
                    <span class="apex-mma-posts-category-page__card-author-icon" aria-hidden="true">👤</span>
                    {{ item.author }}
                  </span>
                </div>
              </div>
            </NuxtLink>

            <div v-if="!listItems.length" class="apex-mma-posts-category-page__empty apex-mma-text">
              Chưa có bài viết cho mục này.
            </div>
          </div>
        </div>

        <!-- SIDEBAR -->
        <aside class="apex-mma-layout__sidebar apex-mma-posts-category-sidebar" aria-label="Sidebar">
          <section class="apex-mma-posts-category-follow" aria-label="Follow">
            <a class="apex-mma-posts-category-follow__item apex-mma-posts-category-follow__item--instagram" href="#" rel="nofollow noopener">
              <span class="apex-mma-posts-category-follow__left">
                <span class="apex-mma-posts-category-follow__icon" aria-hidden="true">◎</span>
                <span class="apex-mma-posts-category-follow__count">59k</span>
                <span class="apex-mma-posts-category-follow__label">Followers</span>
              </span>
              <span class="apex-mma-posts-category-follow__cta">Follow Us</span>
            </a>

            <a class="apex-mma-posts-category-follow__item apex-mma-posts-category-follow__item--facebook" href="#" rel="nofollow noopener">
              <span class="apex-mma-posts-category-follow__left">
                <span class="apex-mma-posts-category-follow__icon" aria-hidden="true">f</span>
                <span class="apex-mma-posts-category-follow__count">23k</span>
                <span class="apex-mma-posts-category-follow__label">Likes</span>
              </span>
              <span class="apex-mma-posts-category-follow__cta">Like our page</span>
            </a>

            <a class="apex-mma-posts-category-follow__item apex-mma-posts-category-follow__item--twitter" href="#" rel="nofollow noopener">
              <span class="apex-mma-posts-category-follow__left">
                <span class="apex-mma-posts-category-follow__icon" aria-hidden="true">𝕏</span>
                <span class="apex-mma-posts-category-follow__count">69k</span>
                <span class="apex-mma-posts-category-follow__label">Followers</span>
              </span>
              <span class="apex-mma-posts-category-follow__cta">Follow Us</span>
            </a>

            <a class="apex-mma-posts-category-follow__item apex-mma-posts-category-follow__item--youtube" href="#" rel="nofollow noopener">
              <span class="apex-mma-posts-category-follow__left">
                <span class="apex-mma-posts-category-follow__icon" aria-hidden="true">▶</span>
                <span class="apex-mma-posts-category-follow__count">143k</span>
                <span class="apex-mma-posts-category-follow__label">Subscribers</span>
              </span>
              <span class="apex-mma-posts-category-follow__cta">Subscribe</span>
            </a>
          </section>

          <section class="apex-mma-posts-category-widget" aria-label="Trending">
            <div class="apex-mma-posts-category-widget__header">
              <h4 class="apex-mma-posts-category-widget__title">Trending Right Now!</h4>
            </div>

            <div class="apex-mma-posts-category-widget__body">
              <ApexMmaHomeSidebarPostItem
                v-for="(p, idx) in sidebarItems"
                :key="p.slug || idx"
                :item="p"
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatDateTime } from "@/utils";
import ApexMmaPostsNavbar from "~/components/posts/ApexMmaPostsNavbar.vue";
import ApexMmaHomeSidebarPostItem from "~/components/home/ApexMmaHomeSidebarPostItem.vue";

const route = useRoute();
const categorySlug = computed(() => route.params.category as string);

const {
  categories,
  pending: pendingCategories,
  error: errorCategories,
  getBySlug,
} = usePostCategories();
const activeCategory = computed(() => getBySlug(categorySlug.value));

const {
  items: listItems,
  pending: pendingList,
  error: errorList,
} = usePostsByCategory(categorySlug);

const { subNews } = usePosts();

const sidebarItems = computed(() => {
  const items = subNews.value ?? [];
  // tránh hiển thị item trùng slug (nếu API trả về trùng)
  const uniq = new Map<string, (typeof items)[number]>();
  for (const it of items) {
    if (!it?.slug) continue;
    if (!uniq.has(it.slug)) uniq.set(it.slug, it);
  }
  return Array.from(uniq.values()).slice(0, 6);
});

// Nếu backend trả lỗi 404 cho slug không hợp lệ => trả 404 page.
watchEffect(() => {
  const err: any = errorList.value;
  const statusCode = err?.statusCode ?? err?.status ?? err?.response?.status;
  if (statusCode === 404) {
    throw createError({ statusCode: 404, statusMessage: "Category not found" });
  }
});

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
  padding: 16px 0 40px;
}

.apex-mma-posts-category-main {
  min-width: 0;
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
  font-size: 30px;
  font-weight: 900;
  line-height: 1.3;
  color: #111827;
  margin: 0 0 8px;
}

.apex-mma-posts-category-page__desc {
  font-size: 15px;
  line-height: 1.7;
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
  gap: 16px;
}

.apex-mma-posts-category-page__card {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 12px;
  text-decoration: none;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  background: #ffffff;
  color: inherit;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.apex-mma-posts-category-page__card:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.apex-mma-posts-category-page__card-thumb {
  border-radius: 6px;
  overflow: hidden;
  background: #f3f4f6;
}

.apex-mma-posts-category-page__card-thumb-img {
  width: 120px;
  height: 86px;
  object-fit: cover;
}

.apex-mma-posts-category-page__card-thumb-img--placeholder {
  background: linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%);
}

.apex-mma-posts-category-page__card-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0 0 6px;
}

.apex-mma-posts-category-page__card-chip {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #111827;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.apex-mma-posts-category-page__card-title {
  font-size: 22px;
  font-weight: 900;
  line-height: 1.25;
  margin: 0 0 8px;
  color: #111827;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apex-mma-posts-category-page__card-desc {
  font-size: 14px;
  line-height: 1.65;
  margin: 0 0 10px;
  color: #4b5563;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apex-mma-posts-category-page__card-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6b7280;
}

.apex-mma-posts-category-page__card-date,
.apex-mma-posts-category-page__card-author {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.apex-mma-posts-category-page__card-date-icon,
.apex-mma-posts-category-page__card-author-icon {
  opacity: 0.75;
}

.apex-mma-posts-category-sidebar {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.apex-mma-posts-category-follow {
  display: grid;
  gap: 8px;
}

.apex-mma-posts-category-follow__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 3px;
  color: #fff;
  font-weight: 800;
  font-size: 13px;
}

.apex-mma-posts-category-follow__left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.apex-mma-posts-category-follow__icon {
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
}

.apex-mma-posts-category-follow__count {
  font-weight: 900;
}

.apex-mma-posts-category-follow__label {
  opacity: 0.85;
}

.apex-mma-posts-category-follow__cta {
  font-weight: 900;
}

.apex-mma-posts-category-follow__item--instagram {
  background: linear-gradient(90deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.apex-mma-posts-category-follow__item--facebook {
  background: #3b5998;
}

.apex-mma-posts-category-follow__item--twitter {
  background: #1da1f2;
}

.apex-mma-posts-category-follow__item--youtube {
  background: #ff0000;
}

.apex-mma-posts-category-widget {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  overflow: hidden;
}

.apex-mma-posts-category-widget__header {
  padding: 12px;
  border-left: 3px solid #22c55e;
}

.apex-mma-posts-category-widget__title {
  font-size: 18px;
  font-weight: 900;
  line-height: 1.2;
  color: #111827;
}

.apex-mma-posts-category-widget__body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 768px) {
  .apex-mma-posts-category-page {
    padding-top: 24px;
  }
}

@media (max-width: 991px) {
  .apex-mma-posts-category-page__card-desc {
    display: none;
  }
}

@media (min-width: 992px) {
  .apex-mma-posts-category-page__card {
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 16px;
    padding: 16px;
  }

  .apex-mma-posts-category-page__card-thumb-img {
    width: 280px;
    height: 200px;
  }

  .apex-mma-posts-category-sidebar {
    margin-top: 0;
  }
}
</style>
