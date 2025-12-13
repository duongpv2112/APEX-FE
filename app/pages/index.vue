<template>
  <div>
    <section class="apex-mma-fact-section">
      <div class="apex-mma-fact-header">
        <span class="apex-mma-fact-title">APEX Fact</span>
        <a class="apex-mma-fact-viewall" href="#">Xem tất cả</a>
      </div>
      <ClientOnly>
        <n-carousel
          class="apex-mma-fact-carousel"
          slides-per-view="auto"
          :space-between="12"
          :loop="false"
          :draggable="true"
          :show-dots="false"
        >
          <template v-for="(item, idx) in factList" :key="idx">
            <n-carousel-item :style="styleCarouselItem">
              <div
                class="apex-mma-fact-item"
                :class="{ 'apex-mma-fact-create': item.isCreate }"
              >
                <template v-if="item.isCreate">
                  <div class="apex-mma-fact-create-icon">
                    <img src="https://i.imgur.com/0y8Ftya.png" alt="Tạo Fact" />
                  </div>
                  <div class="apex-mma-fact-create-label">Tạo Fact mới</div>
                </template>
                <template v-else>
                  <div class="apex-mma-fact-avatar-wrap">
                    <img class="apex-mma-fact-avatar" :src="item.avatar" />
                  </div>
                  <img class="apex-mma-fact-img" :src="item.image" />
                  <div class="apex-mma-fact-username">{{ item.username }}</div>
                </template>
              </div>
            </n-carousel-item>
          </template>
        </n-carousel>
      </ClientOnly>
    </section>
    <!-- BẮT ĐẦU: apex-mma-news-section -->
    <section class="apex-mma-news-section">
      <div class="apex-mma-news-container">
        <!-- Cột trái: Tin chính -->
        <div class="apex-mma-news-main">
          <div class="apex-mma-news-main-top">
            <!-- Khối trái: Tin chính -->
            <div class="apex-mma-news-main-top-left">
              <img
                class="apex-mma-news-main-img"
                :src="mainNews.image"
                alt=""
              />
              <div class="apex-mma-news-main-content">
                <div class="apex-mma-news-main-title">{{ mainNews.title }}</div>
                <div class="apex-mma-news-main-author">
                  {{ mainNews.author }}
                </div>
              </div>
            </div>
            <!-- Khối phải: Tin phụ đầu tiên -->
            <div
              class="apex-mma-news-main-top-right"
              v-if="!isMobile && subNews.length > 0"
            >
              <img
                class="apex-mma-news-main-top-right-img"
                :src="subNews[0].image"
                alt=""
              />
              <div class="apex-mma-news-main-top-right-content">
                <div class="apex-mma-news-main-top-right-title">
                  <b>{{ subNews[0].title }}</b>
                </div>
                <div class="apex-mma-news-main-top-right-author">
                  {{ subNews[0].author }}
                </div>
                <div class="apex-mma-news-main-top-right-desc">
                  {{ subNews[0].desc || "..." }}
                </div>
              </div>
            </div>
          </div>
          <div class="apex-mma-news-main-bottom">
            <div
              v-for="(item, idx) in bottomList"
              :key="idx"
              class="apex-mma-news-sub-item"
            >
              <img class="apex-mma-news-sub-img" :src="item.image" alt="" />
              <div class="apex-mma-news-sub-content">
                <div class="apex-mma-news-sub-title">{{ item.title }}</div>
                <div class="apex-mma-news-sub-author">{{ item.author }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Cột phải: Xem nhanh -->
        <div class="apex-mma-news-quick">
          <div class="apex-mma-news-quick-header">
            <span class="apex-mma-news-quick-title">Xem nhanh</span>
            <a class="apex-mma-news-quick-viewall" href="#">Xem tất cả</a>
          </div>
          <div class="apex-mma-news-quick-list">
            <div
              v-for="(item, idx) in quickList"
              :key="idx"
              class="apex-mma-news-quick-item"
            >
              <div class="apex-mma-news-quick-info">
                <div class="apex-mma-news-quick-title2">{{ item.title }}</div>
                <div v-if="item.image" class="apex-mma-news-quick-thumb">
                  <img :src="item.image" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- KẾT THÚC: apex-mma-news-section -->

    <!-- BẮT ĐẦU: apex-mma-featured-section -->
    <section class="apex-mma-featured-section">
      <div class="apex-mma-featured-container">
        <!-- Bên trái: Bài nổi bật -->
        <div class="apex-mma-featured-left">
          <div class="apex-mma-featured-header">
            <span class="apex-mma-featured-title">Bài nổi bật</span>
            <a class="apex-mma-featured-viewall" href="#">Xem tất cả</a>
          </div>
          <div class="apex-mma-featured-list">
            <div
              v-for="(item, idx) in featuredList"
              :key="idx"
              class="apex-mma-featured-item"
            >
              <div class="apex-mma-featured-rank">#{{ idx + 1 }}</div>
              <div class="apex-mma-featured-content">
                <div class="apex-mma-featured-headline">{{ item.title }}</div>
                <div class="apex-mma-featured-author">{{ item.author }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Bên phải: Thông tin user (cập nhật giao diện giống mockup) -->
        <div class="apex-mma-featured-right">
          <div class="apex-mma-featured-user-card">
            <div class="apex-mma-featured-user-header">
              <div class="apex-mma-featured-user-avatar">
                <img :src="userInfo.avatar" alt="avatar" />
              </div>
              <div class="apex-mma-featured-user-meta">
                <div class="apex-mma-featured-user-name">
                  {{ userInfo.name }}
                </div>
                <div class="apex-mma-featured-user-label">Tuổi tinhte</div>
                <div class="apex-mma-featured-user-age">{{ userInfo.age }}</div>
              </div>
            </div>

            <div class="apex-mma-featured-divider" />

            <div class="apex-mma-featured-level-row">
              <div class="apex-mma-level-icon">
                <div class="apex-mma-level-icon-inner"></div>
              </div>

              <div class="apex-mma-level-center">
                <div class="apex-mma-level-chip">{{ userInfo.point }} điểm</div>
              </div>

              <div class="apex-mma-level-icon">
                <div class="apex-mma-level-icon-inner"></div>
              </div>
            </div>

            <div
              class="apex-mma-featured-user-progress-bar apex-mma-featured-progress-large"
            >
              <div
                class="apex-mma-featured-user-progress-bar-inner"
                :style="{ width: userInfo.progress + '%' }"
              ></div>
            </div>

            <div class="apex-mma-featured-level-labels">
              <span class="apex-mma-level-left">Trứng</span>
              <span class="apex-mma-level-right">GÀ</span>
            </div>

            <div class="apex-mma-featured-user-desc">
              Bạn cần hoạt động nhiều để lên hạng
            </div>

            <div class="apex-mma-featured-user-stats apex-mma-stats-card">
              <div class="apex-mma-stats-col">
                <div class="apex-mma-featured-user-stat-label">Bài đã đăng</div>
                <div class="apex-mma-featured-user-stat-value">
                  {{ userInfo.posts }}
                </div>
              </div>
              <div class="apex-mma-stats-col">
                <div class="apex-mma-featured-user-stat-label">Lượt thích</div>
                <div class="apex-mma-featured-user-stat-value">
                  {{ userInfo.likes }}
                </div>
              </div>
              <div class="apex-mma-stats-col">
                <div class="apex-mma-featured-user-stat-label">
                  Lượt theo dõi
                </div>
                <div class="apex-mma-featured-user-stat-value">
                  {{ userInfo.follows }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- KẾT THÚC: apex-mma-featured-section -->

    <!-- BẮT ĐẦU: apex-mma-compact-section (mới) -->
    <section class="apex-mma-compact-section">
      <div class="apex-mma-compact-container">
        <!-- Bên phải: Thông tin user -->
        <div class="apex-mma-compact-left">
          <div class="apex-mma-compact-header">
            <span class="apex-mma-compact-title">Tin mới nhất</span>
            <a class="apex-mma-compact-viewall" href="#">Xem tất cả</a>
          </div>
          <div class="apex-mma-compact-list">
            <div
              v-for="(item, idx) in compactList"
              :key="idx"
              class="apex-mma-compact-item"
            >
              <div class="apex-mma-compact-thumb">
                <img :src="item.image" alt="" />
              </div>
              <div class="apex-mma-compact-body">
                <div class="apex-mma-compact-title">{{ item.title }}</div>
                <div class="apex-mma-compact-excerpt" v-if="!isMobile">
                  {{ item.excerpt }}
                </div>
                <div class="apex-mma-compact-author">
                  <div class="apex-mma-compact-author-avatar">
                    <img :src="item.authorAvatar" alt="" />
                  </div>
                  <div class="apex-mma-compact-author-name">
                    {{ item.author }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Bên phải: Thông tin user -->
        <div class="apex-mma-compact-right">
          <div class="apex-mma-community-card">
            <div class="apex-mma-community-header">
              <div class="apex-mma-community-title">Cộng đồng</div>
            </div>

            <div class="apex-mma-community-grid">
              <a
                v-for="(item, idx) in communityList"
                :key="idx"
                class="apex-mma-community-item"
                :href="item.href"
              >
                <div class="apex-mma-community-thumb">
                  <img :src="item.image" :alt="item.title" />
                </div>
                <div class="apex-mma-community-name">{{ item.title }}</div>
              </a>
            </div>

            <a class="apex-mma-community-viewall" href="#">
              Xem tất cả ({{ communityTotal }})
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- KẾT THÚC: apex-mma-compact-list-section -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "~/composables/useDisplay";
import { useFacts } from "~/composables/useFacts";
import { useNews } from "~/composables/useNews";
import { useQuickList } from "~/composables/useQuickList";
import { useFeaturedList } from "~/composables/useFeaturedList";
import { useCompactList } from "~/composables/useCompactList";
import { useCommunity } from "~/composables/useCommunity";
import { NCarousel, NCarouselItem } from "naive-ui";

const { factList } = useFacts();
const { mainNews, subNews } = useNews();
const { quickList } = useQuickList();
const { featuredList } = useFeaturedList();
const { compactList } = useCompactList();
const { communityTotal, communityList } = useCommunity();
const { _, isMobile, isTablet, isDesktop } = useDisplay();

// Dữ liệu user
const userInfo = ref({
  avatar: "https://i.imgur.com/0y8Ftya.png",
  name: "Dương Phạm 2112",
  age: "6h",
  point: 0,
  progress: 0,
  posts: 0,
  likes: 0,
  follows: 0,
});

const styleCarouselItem = computed(() => {
  let widthCarousel = "30%";

  switch (true) {
    case isDesktop.value:
      widthCarousel = "15%";
      break;
    case isTablet.value:
      widthCarousel = "20%";
      break;
    case isMobile.value:
      widthCarousel = "30%";
      break;
    default:
      break;
  }
  return {
    width: widthCarousel,
  };
});

const bottomList = computed(() => {
  if (!subNews.value) return [];
  return isMobile.value ? subNews.value.slice(0, 4) : subNews.value.slice(1);
});
</script>

<style lang="scss" scoped>
.apex-mma-fact-section {
  margin: 16px 0;
  padding: 0 12px;

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
          margin-top: 28px;
          margin-bottom: 12px;
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
          border-radius: 50%;
        }

        .apex-mma-fact-create-label {
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          margin-top: 8px;
        }
      }
    }
  }
}

.apex-mma-news-section {
  margin: 24px 0 0 0;
  padding: 0 12px;
  width: 100%;

  .apex-mma-news-container {
    display: flex;
    gap: 24px;
    width: 100%;
    align-items: flex-start;
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

    .apex-mma-news-main-top-right-img {
      width: 100%;
      aspect-ratio: 16/9;
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
        font-weight: 700;
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
            font-weight: 500;
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
            border-radius: 5px;
          }
        }
      }
    }
  }
}

.apex-mma-featured-section {
  margin: 16px 0 0 0;
  padding: 0 12px;
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
            font-weight: 800;
            color: #8a94a6;
            margin-right: 16px;
            min-width: 56px;
            line-height: 1;
            font-family: "Montserrat", Arial, sans-serif;
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

/* Compact list section - mobile first */
.apex-mma-compact-section {
  margin: 16px 0 40px;
  padding: 0 12px;
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

      .apex-mma-compact-list {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .apex-mma-compact-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 12px 0;

          .apex-mma-compact-thumb {
            width: 240px;
            aspect-ratio: 16/9;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
            cursor: pointer;

            img {
              width: 100%;
              aspect-ratio: 16/9;
            }
          }

          .apex-mma-compact-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 8px;
            cursor: pointer;

            .apex-mma-compact-title {
              font-size: 18px;
              font-weight: 700;
              color: #222;
              line-height: 1.25;

              &:hover {
                color: #3986ee;
              }
            }

            .apex-mma-compact-excerpt {
              font-size: 14px;
              color: #666;
              line-height: 1.4;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .apex-mma-compact-author {
              display: flex;
              align-items: center;
              gap: 8px;

              .apex-mma-compact-author-avatar {
                width: 32px;
                aspect-ratio: 1/1;
                border-radius: 50%;
                overflow: hidden;

                img {
                  width: 100%;
                  aspect-ratio: 1/1;
                }
              }

              .apex-mma-compact-author-name {
                font-size: 14px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }

    .apex-mma-compact-right {
      flex: 1;
      min-width: 260px;
      max-width: 340px;
      display: none;
      flex-direction: column;
      align-items: center;

      .apex-mma-community-card {
        width: 100%;
        background: #fff;
        border: 1px solid #eef1f6;
        border-radius: 12px;
        padding: 14px;
        box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
      }

      .apex-mma-community-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      .apex-mma-community-title {
        font-size: 20px;
        font-weight: 700;
        color: #222;
      }

      .apex-mma-community-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 12px;
      }

      .apex-mma-community-item {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        transition:
          transform 0.18s ease,
          box-shadow 0.18s ease;

        &:hover {
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .apex-mma-community-thumb {
        width: 100%;
        aspect-ratio: 16/9;
        border-radius: 8px;
        overflow: hidden;
        background: #f1f2f4;
        border: 1px solid #eef1f6;
        box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
      }

      .apex-mma-community-thumb img {
        width: 100%;
        aspect-ratio: 16/9;
      }

      .apex-mma-community-name {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #222;
        line-height: 1.25;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 34px;
      }

      .apex-mma-community-viewall {
        display: block;
        width: 100%;
        text-align: center;
        padding: 8px 10px;
        border-radius: 8px;
        background: #e9edf3;
        border: 1px solid #e1e6ee;
        color: #0f172a;
        font-weight: 700;
        text-decoration: none;
        transition:
          background 0.2s ease,
          border-color 0.2s ease;

        &:hover {
          background: #dde3ec;
          border-color: #d4dbe7;
        }
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

  .apex-mma-compact-section {
    .apex-mma-compact-container {
      .apex-mma-compact-left {
        .apex-mma-compact-list {
          .apex-mma-compact-item {
            .apex-mma-compact-thumb {
              width: 30%;
              min-width: 140px;
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
      .apex-mma-compact-right {
        display: flex;
      }
    }
  }

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

  .apex-mma-compact-section {
    .apex-mma-compact-container {
      .apex-mma-compact-left {
        .apex-mma-compact-list {
          .apex-mma-compact-item {
            .apex-mma-compact-title {
              font-size: 20px;
            }

            .apex-mma-compact-excerpt {
              -webkit-line-clamp: 3;
            }
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
        height: 230px;
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

  .apex-mma-compact-section {
    .apex-mma-compact-container {
      .apex-mma-compact-left {
        .apex-mma-compact-list {
          .apex-mma-compact-item {
            gap: 24px;

            .apex-mma-compact-title {
              font-size: 22px;
            }

            .apex-mma-compact-excerpt {
              font-size: 15px;
            }

            .apex-mma-compact-author-name {
              font-size: 15px;
            }
          }
        }
      }

      .apex-mma-compact-right {
        display: flex;
      }
    }
  }
}
</style>
