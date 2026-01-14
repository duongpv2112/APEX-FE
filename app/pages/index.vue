<template>
  <div>
    <ApexMmaHomeHeroGrid :items="heroItems" />

    <section class="apex-mma-home-main">
      <div class="apex-mma-container">
        <div class="apex-mma-layout__grid">
          <div class="apex-mma-layout__main">
            <ApexMmaCompactSection
              category-slug="ufc"
              :limit="6"
            />

            <ApexMmaCompactSection
              category-slug="lion-championship"
              :limit="6"
            />

            <ApexMmaCompactSection
              category-slug="pfl"
              :limit="6"
            />
          </div>

          <aside class="apex-mma-layout__sidebar">
            <ApexMmaHomeSidebarLatestNews :items="sidebarLatest" />
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRuntimeConfig } from "#imports";
import { usePosts } from "~/composables/usePosts";
import ApexMmaCompactSection from "~/components/posts/ApexMmaCompactSection.vue";
import ApexMmaHomeHeroGrid from "~/components/home/ApexMmaHomeHeroGrid.vue";
import ApexMmaHomeSidebarLatestNews from "~/components/home/ApexMmaHomeSidebarLatestNews.vue";
const {
  mainNews,
  subNews,
} = usePosts();

// Hero grid lấy 4 bài đầu (main + 3 sub) để mimic Newsy hero.
const heroItems = computed(() => {
  const items = [
    {
      image: mainNews.value?.image ?? "",
      title: mainNews.value?.title ?? "",
      author: mainNews.value?.author ?? null,
      desc: "",
      slug: mainNews.value?.slug ?? "",
    },
    ...(subNews.value ?? []),
  ];
  return items.filter((x) => Boolean(x.slug)).slice(0, 4);
});

const sidebarLatest = computed(() => {
  return (subNews.value ?? []).filter((x) => Boolean(x.slug)).slice(0, 6);
});

const config = useRuntimeConfig();
const canonicalUrl = computed(() => {
  const base = (config.public as any)?.siteUrl as string;
  if (!base) return "";
  return new URL("/", base).toString();
});

useSeoMeta({
  title: "Trang chủ | APEX MMA",
  ogTitle: "Trang chủ | APEX MMA",
  description:
    "Trang chủ APEX MMA - Tin tức, cộng đồng, bài viết nổi bật và nội dung mới nhất.",
  ogDescription:
    "Trang chủ APEX MMA - Cập nhật tin tức, bài viết nổi bật và hoạt động cộng đồng.",
  ogImage: computed(() => mainNews.value?.image || ""),
  ogType: "website",
  ogUrl: canonicalUrl,
});
</script>

<style lang="scss" scoped>
.apex-mma-home-main {
  padding: 20px 0 40px;
}

.apex-mma-fact-section {
  margin: 16px 0;
  padding: 0;

  .apex-mma-fact-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .apex-mma-fact-title {
      font-size: 22px;
      font-weight: 700;
      color: #222;
    }

    .apex-mma-fact-viewall {
      color: #1976d2;
      font-size: 14px;
      text-decoration: none;
      font-weight: 500;
    }
  }

  .apex-mma-fact-carousel {
    width: 100%;
    user-select: none;

    .apex-mma-fact-item {
      height: 180px;
      background: #222;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      cursor: pointer;

      .apex-mma-fact-avatar-wrap {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 2;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #fff;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .apex-mma-fact-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }

      .apex-mma-fact-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-top: 0;
        opacity: 0.8;
        transition: scale ease-in 0.25s;

        &:hover {
          scale: 1.1;
        }
      }

      .apex-mma-fact-username {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: #fff;
        font-size: 15px;
        font-weight: 500;
        padding: 0 9px 8px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &.apex-mma-fact-create {
        background: linear-gradient(135deg, #1ec8c8 0%, #1e90e8 100%);
        justify-content: center;

        .apex-mma-fact-create-icon {
          margin-bottom: 8px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .apex-mma-fact-create-icon img {
          width: 100%;
          height: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 50%;
        }

        .apex-mma-fact-create-label {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-align: center;
        }
      }
    }
  }
}

.apex-mma-news-section {
  margin: 24px 0 0 0;
  padding: 0;
  width: 100%;

  .apex-mma-news-state {
    width: 100%;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 14px;
    margin-bottom: 12px;
  }

  .apex-mma-news-loading {
    background: #eff6ff;
    color: #1d4ed8;
  }

  .apex-mma-news-empty {
    background: #f3f4f6;
    color: #374151;
  }

  .apex-mma-news-error {
    background: #fef2f2;
    color: #b91c1c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .apex-mma-news-error-retry {
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

  .apex-mma-news-container {
    display: flex;
    gap: 24px;
    width: 100%;
    align-items: flex-start;
  }

  .apex-mma-news-img-placeholder {
    width: 100%;
    border-radius: 8px;
    background: linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%);
    aspect-ratio: 16/9;
  }

  .apex-mma-news-main {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .apex-mma-news-main-top {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 16px;
    min-height: 260px;
  }

  .apex-mma-news-main-top-left {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .apex-mma-news-main-img {
      width: 100%;
      aspect-ratio: 18/9;
      object-fit: cover;
      border-radius: 8px;
      cursor: pointer;
    }

    .apex-mma-news-main-title {
      font-size: 22px;
      font-weight: 700;
      color: #222;
      margin-bottom: 8px;
      line-height: 1.3;
      padding-top: 12px;
      cursor: pointer;

      &:hover {
        color: #3986ee;
      }
    }

    .apex-mma-news-main-author {
      font-size: 15px;
      color: #666;
      font-weight: 400;
    }
  }

  .apex-mma-news-main-top-right {
    flex: 1;
    background: linear-gradient(
      180deg,
      #e5e6ed 41.65%,
      #f1f2f4 80.57%,
      #ffffff 96.86%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 220px;
    max-width: 260px;
    overflow: hidden;
    border-radius: 8px 8px 0 0;

    .apex-mma-news-main-top-right-img-link {
      width: 100%;
    }

    .apex-mma-news-main-top-right-img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .apex-mma-news-main-top-right-content {
      padding: 8px 12px 12px 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      .apex-mma-news-main-top-right-title {
        font-size: 16px;
        font-weight: 600;
        color: #222;
        margin-bottom: 4px;
        line-height: 1.3;
        cursor: pointer;

        &:hover {
          color: #3986ee;
        }
      }

      .apex-mma-news-main-top-right-author {
        font-size: 14px;
        color: #666;
        font-weight: 500;
        margin-bottom: 4px;
      }

      .apex-mma-news-main-top-right-desc {
        font-size: 14px;
        color: #222;
        font-weight: 400;
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 60px;
      }
    }
  }

  .apex-mma-news-main-bottom {
    display: flex;
    gap: 12px;
    width: 100%;

    .apex-mma-news-sub-item {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .apex-mma-news-sub-img {
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
        border-radius: 5px;
        cursor: pointer;
      }

      .apex-mma-news-sub-content {
        padding: 12px 0;

        .apex-mma-news-sub-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
          line-height: 1.3;
          cursor: pointer;

          &:hover {
            color: #3986ee;
          }
        }

        .apex-mma-news-sub-author {
          font-size: 14px;
          color: #666;
          font-weight: 400;
        }
      }
    }
  }

  .apex-mma-news-quick {
    flex: 1;
    padding: 16px 0 0;
    min-width: 260px;
    max-width: 340px;
    display: none;
    flex-direction: column;
    gap: 8px;

    .apex-mma-news-quick-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .apex-mma-news-quick-title {
        font-size: 18px;
        font-weight: 700;
      }

      .apex-mma-news-quick-viewall {
        color: #1976d2;
        font-size: 14px;
        text-decoration: none;
        font-weight: 500;
      }
    }

    .apex-mma-news-quick-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 12px 16px 32px;
      border-left: 1px dashed #1570ef;
      border-bottom: 1px dashed #1570ef;
      border-bottom-left-radius: 30px;

      .apex-mma-news-quick-item {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        position: relative;
        min-height: 38px;

        &::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #1570ef;
          position: absolute;
          left: -23px;
          transform: translateX(50%);
        }

        .apex-mma-news-quick-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          width: 100%;

          .apex-mma-news-quick-title2 {
            font-size: 15px;
            color: #222;
            font-weight: 600;
            line-height: 1.3;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;

            &:hover {
              color: #3986ee;
            }
          }

          .apex-mma-news-quick-thumb {
            width: 120px;
            height: 100%;
            max-height: 68px;
            overflow: hidden;
            flex-shrink: 0;
            background: #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .apex-mma-news-quick-thumb img {
            width: 100%;
            aspect-ratio: 16/9;
            object-fit: cover;
            border-radius: 5px;
          }
        }
      }
    }
  }
}

.apex-mma-featured-section {
  margin: 16px 0 0 0;
  padding: 0;
  width: 100%;

  .apex-mma-featured-container {
    display: flex;
    gap: 24px;
    width: 100%;
    align-items: flex-start;

    .apex-mma-featured-left {
      flex: 2;
      display: flex;
      flex-direction: column;

      .apex-mma-featured-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .apex-mma-featured-title {
          font-size: 20px;
          font-weight: 700;
          color: #222;
        }

        .apex-mma-featured-viewall {
          color: #1976d2;
          font-size: 14px;
          text-decoration: none;
          font-weight: 500;
        }
      }

      .apex-mma-featured-list {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -12px;

        .apex-mma-featured-item {
          display: flex;
          align-items: flex-start;
          flex: 0 0 50%;
          padding: 16px 12px 0;

          .apex-mma-featured-rank {
            font-size: 38px;
            font-weight: 700;
            color: #8a94a6;
            margin-right: 16px;
            min-width: 56px;
            line-height: 1;
          }

          .apex-mma-featured-content {
            display: flex;
            flex-direction: column;
            gap: 2px;

            .apex-mma-featured-headline {
              font-size: 18px;
              font-weight: 700;
              color: #222;
              margin-bottom: 2px;
              line-height: 1.3;
              cursor: pointer;

              &:hover {
                color: #3986ee;
              }
            }

            .apex-mma-featured-author {
              font-size: 15px;
              color: #666;
              font-weight: 400;
            }
          }
        }
      }
    }

    .apex-mma-featured-right {
      flex: 1;
      min-width: 260px;
      max-width: 340px;
      display: none;
      flex-direction: column;
      align-items: center;

      .apex-mma-featured-user-card {
        width: 100%;
        background: #fff;
        border: 1px solid #eef1f6;
        border-radius: 12px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
      }

      .apex-mma-featured-user-header {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
      }

      .apex-mma-featured-user-avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        overflow: hidden;
        background: linear-gradient(180deg, #23d7d7 0%, #1e90e8 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid #fff;
        box-shadow: 0 2px 6px rgba(30, 144, 232, 0.12);
      }

      .apex-mma-featured-user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .apex-mma-featured-user-meta {
        display: flex;
        flex-direction: column;
      }

      .apex-mma-featured-user-name {
        font-size: 18px;
        font-weight: 700;
        color: #1e7ad9;
        letter-spacing: 0.2px;
      }

      .apex-mma-featured-user-label {
        font-size: 13px;
        color: #8b95a6;
        margin-top: 2px;
      }

      .apex-mma-featured-user-age {
        font-size: 13px;
        color: #6b7280;
        margin-top: 2px;
      }

      .apex-mma-featured-divider {
        width: 100%;
        height: 1px;
        background: #f4f6f8;
        margin: 14px 0;
        border-radius: 1px;
      }

      .apex-mma-featured-level-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 12px;
      }

      .apex-mma-level-icon {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #eaf8ff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(30, 144, 232, 0.06);
      }

      .apex-mma-level-icon-inner {
        width: 22px;
        height: 22px;
        background: #fff;
        border-radius: 50%;
      }

      .apex-mma-level-center {
        flex: 1;
        display: flex;
        justify-content: center;
      }

      .apex-mma-level-chip {
        background: #f1f4f9;
        color: #1e7ad9;
        padding: 6px 14px;
        border-radius: 18px;
        font-weight: 700;
        box-shadow: inset 0 0 0 1px rgba(30, 122, 217, 0.06);
      }

      .apex-mma-featured-user-progress-bar.apex-mma-featured-progress-large {
        width: 100%;
        height: 6px;
        background: linear-gradient(90deg, #dfeffa 0%, #f1f6fb 100%);
        border-radius: 6px;
        overflow: hidden;
        margin-top: 12px;
      }

      .apex-mma-featured-user-progress-bar-inner {
        height: 100%;
        background: linear-gradient(90deg, #1ec8c8 0%, #1e90e8 100%);
        width: 0%;
        transition: width 0.3s ease;
      }

      .apex-mma-featured-level-labels {
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: #8b95a6;
        font-weight: 700;
        margin-top: 8px;
        font-size: 13px;
      }

      .apex-mma-featured-user-desc {
        font-size: 14px;
        color: #222;
        margin-top: 12px;
        text-align: center;
        font-weight: 700;
      }

      .apex-mma-stats-card {
        display: flex;
        gap: 8px;
        width: 100%;
        margin-top: 14px;
        justify-content: space-between;
        border-top: 1px solid #f0f3f6;
        padding-top: 14px;
      }

      .apex-mma-stats-col {
        flex: 1;
        text-align: center;
        border-left: 1px solid transparent;
      }

      .apex-mma-stats-col + .apex-mma-stats-col {
        border-left: 1px solid #eef4fb;
      }

      .apex-mma-featured-user-stat-label {
        font-size: 13px;
        color: #98a0ad;
      }

      .apex-mma-featured-user-stat-value {
        font-size: 18px;
        color: #1976d2;
        font-weight: 700;
        margin-top: 6px;
      }
    }
  }
}


@media (max-width: 600px) {
  .apex-mma-featured-section {
    .apex-mma-featured-container {
      .apex-mma-featured-left {
        .apex-mma-featured-list {
          .apex-mma-featured-item {
            flex: 0 0 100%;
          }
        }
      }
    }
  }
}

/* Mobile overrides already exist in file - keep consistency */
@media (max-width: 767px) {
  .apex-mma-news-section {
    .apex-mma-news-main-top-left {
      .apex-mma-news-main-img {
        aspect-ratio: 16/9;
      }
    }

    .apex-mma-news-main-top-right {
      display: none;
    }

    /* Sub items: 2 columns x 2 rows grid on mobile (4 items visible as 2x2) */
    .apex-mma-news-main-bottom {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .apex-mma-news-sub-item {
        flex-basis: calc(50% - 8px);
        overflow: hidden;
      }

      .apex-mma-news-sub-item .apex-mma-news-sub-content {
        padding: 8px 4px 12px 4px;

        .apex-mma-news-sub-title {
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 6px;
          overflow: hidden;
        }

        .apex-mma-news-sub-author {
          font-size: 13px;
          color: #666;
          font-weight: 400;
        }
      }
    }
  }


}

/* Tablet */
@media (min-width: 768px) and (max-width: 991px) {
  .apex-mma-news-section {
    .apex-mma-news-main {
      .apex-mma-news-main-top-left {
        .apex-mma-news-main-img {
        }
      }

      .apex-mma-news-main-top-right {
        display: block;
      }

      /* Sub items: 2 columns x 2 rows grid on mobile (4 items visible as 2x2) */
      .apex-mma-news-main-bottom {
        .apex-mma-news-sub-item {
        }

        .apex-mma-news-sub-item .apex-mma-news-sub-content {
          .apex-mma-news-sub-title {
          }

          .apex-mma-news-sub-author {
          }
        }
      }
    }
  }


}

/* Tablet lớn -> Desktop */
@media (min-width: 992px) {
  .apex-mma-fact-section {
    .apex-mma-fact-carousel {
      .apex-mma-fact-item {
        // height: 230px;
      }
    }
  }

  .apex-mma-news-section {
    .apex-mma-news-quick {
      display: flex;
    }
  }

  .apex-mma-featured-section {
    .apex-mma-featured-container {
      .apex-mma-featured-right {
        display: flex;
      }
    }
  }


}
</style>
