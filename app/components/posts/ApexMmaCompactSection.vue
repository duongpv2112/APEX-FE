<template>
  <section v-if="shouldRender" class="apex-mma-compact-section">
    <div class="apex-mma-compact-container">
      <div class="apex-mma-compact-left">
        <div class="apex-mma-compact-header">
          <span class="apex-mma-compact-title apex-mma-title">{{ titleText }}</span>
          <NuxtLink
            class="apex-mma-compact-viewall"
            :to="{ path: `/posts/categories/${categorySlug}` }"
          >
            Xem tất cả
          </NuxtLink>
        </div>

        <div v-if="pending" class="apex-mma-compact-state apex-mma-compact-loading">
          Đang tải bài viết...
        </div>

        <div
          v-else-if="error"
          class="apex-mma-compact-state apex-mma-compact-error"
        >
          <span>Không tải được dữ liệu.</span>
          <button
            class="apex-mma-compact-error-retry"
            type="button"
            @click="onRetry"
          >
            Thử lại
          </button>
        </div>

        <!-- Nếu không có item thì component sẽ tự ẩn (không render section) -->

        <div v-else class="apex-mma-compact-list">
          <article
            v-for="(item, idx) in compactItems"
            :key="item.slug || idx"
            class="apex-mma-compact-item"
          >
            <NuxtLink class="apex-mma-compact-thumb" :to="`/posts/${item.slug}`">
              <NuxtImg :src="item.thumbnail" :alt="item.title" />
            </NuxtLink>

            <div class="apex-mma-compact-body">
              <div class="apex-mma-compact-tags" aria-label="Chuyên mục">
                <NuxtLink
                  v-for="(tag, tagIdx) in item.tags"
                  :key="`${idx}-${tagIdx}`"
                  class="apex-mma-compact-tag"
                  :to="{ path: `/posts/categories/${tag.slug}` }"
                >
                  {{ tag.name }}
                </NuxtLink>
              </div>

              <NuxtLink
                class="apex-mma-compact-title apex-mma-title"
                :to="`/posts/${item.slug}`"
              >
                {{ item.title }}
              </NuxtLink>
              <div class="apex-mma-compact-excerpt">{{ item.excerpt }}</div>

              <div class="apex-mma-compact-author">
                <div
                  v-if="item.authorAvatar"
                  class="apex-mma-compact-author-avatar"
                >
                  <NuxtImg :src="item.authorAvatar" :alt="item.authorName || 'Tác giả'" />
                </div>
                <div v-if="item.authorName" class="apex-mma-compact-author-name">
                  {{ item.authorName }}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePostsByCategory } from "~/composables/usePostsByCategory";
import type { PostsListItem } from "~/types/posts/posts.ui";

type CompactUiItem = {
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  authorName: string | null;
  authorAvatar: string | null;
  tags: Array<{ name: string; slug: string }>;
};

const props = withDefaults(
  defineProps<{
    categorySlug: string;
    title?: string;
    limit?: number;
    /** Fallback tags (chỉ dùng khi backend không trả categories) */
    tags?: Array<{ name: string; slug: string }>;
    enabled?: boolean;
  }>(),
  {
    title: undefined,
    limit: 6,
    tags: () => [],
    enabled: true,
  }
);

const { items, category, pending, error, refresh } = usePostsByCategory(
  computed(() => props.categorySlug),
  {
    enabled: computed(() => props.enabled),
    limit: computed(() => props.limit),
  }
);

const onRetry = () => {
  // refresh() nhận AsyncDataExecuteOptions (optional) -> bọc lại để khớp type handler của click.
  refresh();
};

// Map PostsListItem -> UI item của compact section.
// NOTE: PostsListItem hiện chưa chứa avatar => authorAvatar tạm null.
const compactItems = computed<CompactUiItem[]>(() => {
  return (items.value ?? []).map((x: PostsListItem) => ({
    slug: x.slug,
    title: x.title,
    excerpt: x.desc ?? "",
    thumbnail: x.image ?? "",
    authorName: x.author ?? null,
    authorAvatar: x.authorAvatar ?? null,
    tags: (x.categories?.length ? x.categories : props.tags) ?? [],
  }));
});

const titleText = computed(() => {
  // Ưu tiên title từ props. Nếu không có thì lấy theo tên category từ API.
  return (
    props.title ||
    category.value?.name ||
    // Fallback cuối: hiển thị theo slug (tránh text hard-code "Bài nổi bật")
    props.categorySlug.toUpperCase()
  );
});
const categorySlug = computed(() => props.categorySlug);
// NOTE: tags per item đã được map trong compactItems

/**
 * Ẩn hoàn toàn section nếu không có bài viết (theo yêu cầu).
 * Vẫn render trong trạng thái loading/error để user có feedback.
 */
const shouldRender = computed(() => {
  if (pending.value) return true;
  if (error.value) return true;
  return (items.value?.length ?? 0) > 0;
});
</script>

<style lang="scss" scoped>
/* Compact list section - mobile first */
.apex-mma-compact-section {
  margin-bottom: 24px;
  padding: 0;
  width: 100%;

  .apex-mma-compact-container {
    display: flex;
    gap: 24px;
    width: 100%;
    align-items: flex-start;

    .apex-mma-compact-left {
      flex: 2;
      display: flex;
      flex-direction: column;

      .apex-mma-compact-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .apex-mma-compact-title {
          font-size: 20px;
          font-weight: 700;
          color: #222;
        }

        .apex-mma-compact-viewall {
          color: #1976d2;
          font-size: 14px;
          text-decoration: none;
          font-weight: 500;
        }
      }

      .apex-mma-compact-state {
        width: 100%;
        border-radius: 10px;
        padding: 12px 14px;
        font-size: 14px;
        margin-top: 12px;
      }

      .apex-mma-compact-loading {
        background: #eff6ff;
        color: #1d4ed8;
      }

      .apex-mma-compact-empty {
        background: #f3f4f6;
        color: #374151;
      }

      .apex-mma-compact-error {
        background: #fef2f2;
        color: #b91c1c;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .apex-mma-compact-error-retry {
        appearance: none;
        border: 1px solid #fecaca;
        background: #fff;
        color: #b91c1c;
        padding: 6px 10px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;

        &:hover {
          background: #fff5f5;
        }
      }

      .apex-mma-compact-list {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .apex-mma-compact-item {
          display: flex;
          gap: 18px;
          align-items: stretch;

          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          padding: 18px;

          .apex-mma-compact-thumb {
            width: 260px;
            max-width: 260px;
            border-radius: 3px;
            overflow: hidden;
            flex-shrink: 0;
            cursor: pointer;

            /* đảm bảo ảnh luôn cùng chiều cao như template */
            aspect-ratio: 16 / 10;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .apex-mma-compact-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;

            .apex-mma-compact-tags {
              display: flex;
              align-items: center;
              gap: 12px;
              flex-wrap: wrap;
            }

            .apex-mma-compact-tag {
              font-size: 12px;
              font-weight: 700;
              text-decoration: none;
              color: #2563eb;
              line-height: 1;

              &:hover {
                text-decoration: underline;
              }
            }

            .apex-mma-compact-title {
              font-size: 26px;
              font-weight: 800;
              color: #222;
              line-height: 1.18;
              text-decoration: none;

              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;

              &:hover {
                color: #3986ee;
              }
            }

            .apex-mma-compact-excerpt {
              font-size: 14px;
              color: #666;
              line-height: 1.4;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .apex-mma-compact-author {
              margin-top: auto;
              display: flex;
              align-items: center;
              gap: 8px;

              color: #8b95a6;

              .apex-mma-compact-author-avatar {
                width: 32px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                overflow: hidden;

                img {
                  width: 100%;
                  aspect-ratio: 1/1;
                  object-fit: cover;
                }
              }

              .apex-mma-compact-author-name {
                font-size: 13px;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
}

/* Mobile overrides already exist in file - keep consistency */
@media (max-width: 767px) {
  .apex-mma-compact-section {
    .apex-mma-compact-container {
      .apex-mma-compact-left {
        .apex-mma-compact-list {
          .apex-mma-compact-item {
            padding: 14px;
            gap: 12px;

            .apex-mma-compact-thumb {
              width: 36%;
              min-width: 150px;
              max-width: 180px;
            }

            .apex-mma-compact-body {
              gap: 6px;

              .apex-mma-compact-title {
                font-size: 16px;
                -webkit-line-clamp: 3;
              }

              .apex-mma-compact-excerpt {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 991px) {
  .apex-mma-compact-section {
    .apex-mma-compact-container {
      .apex-mma-compact-left {
        .apex-mma-compact-list {
          .apex-mma-compact-item {
            .apex-mma-compact-thumb {
              width: 240px;
              max-width: 240px;
            }

            .apex-mma-compact-body {
              .apex-mma-compact-title {
                font-size: 22px;
              }

              .apex-mma-compact-excerpt {
                -webkit-line-clamp: 2;
              }
            }
          }
        }
      }
    }
  }
}

/* Tablet lớn -> Desktop */
@media (min-width: 992px) {
  .apex-mma-compact-section {
    .apex-mma-compact-container {
      .apex-mma-compact-left {
        .apex-mma-compact-list {
          .apex-mma-compact-item {
            gap: 24px;

            .apex-mma-compact-thumb {
              width: 260px;
              max-width: 260px;
            }

            .apex-mma-compact-body {
              .apex-mma-compact-title {
                font-size: 26px;
              }

              .apex-mma-compact-excerpt {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
