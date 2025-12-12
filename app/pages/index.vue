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
          <div class="apex-mma-featured-title">Bài nổi bật</div>
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
        <!-- Bên phải: Thông tin user -->
        <div class="apex-mma-featured-right">
          <div class="apex-mma-featured-user-card">
            <div class="apex-mma-featured-user-avatar">
              <img :src="userInfo.avatar" alt="avatar" />
            </div>
            <div class="apex-mma-featured-user-name">{{ userInfo.name }}</div>
            <div class="apex-mma-featured-user-label">Tuổi tinhte</div>
            <div class="apex-mma-featured-user-age">{{ userInfo.age }}</div>
            <div class="apex-mma-featured-user-progress">
              <span
                class="apex-mma-featured-user-rank apex-mma-featured-user-rank--active"
                >Trứng</span
              >
              <span class="apex-mma-featured-user-point"
                >{{ userInfo.point }} điểm</span
              >
              <span class="apex-mma-featured-user-rank">GÀ</span>
            </div>
            <div class="apex-mma-featured-user-progress-bar">
              <div
                class="apex-mma-featured-user-progress-bar-inner"
                :style="{ width: userInfo.progress + '%' }"
              ></div>
            </div>
            <div class="apex-mma-featured-user-desc">
              Bạn cần hoạt động nhiều để lên hạng
            </div>
            <div class="apex-mma-featured-user-stats">
              <div>
                <div class="apex-mma-featured-user-stat-label">Bài đã đăng</div>
                <div class="apex-mma-featured-user-stat-value">
                  {{ userInfo.posts }}
                </div>
              </div>
              <div>
                <div class="apex-mma-featured-user-stat-label">Lượt thích</div>
                <div class="apex-mma-featured-user-stat-value">
                  {{ userInfo.likes }}
                </div>
              </div>
              <div>
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
          <div class="apex-mma-compact-title">Tin mới nhất</div>
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
          <div class="apex-mma-featured-user-card">
            <div class="apex-mma-featured-user-avatar">
              <img :src="userInfo.avatar" alt="avatar" />
            </div>
            <div class="apex-mma-featured-user-name">{{ userInfo.name }}</div>
            <div class="apex-mma-featured-user-label">Tuổi tinhte</div>
            <div class="apex-mma-featured-user-age">{{ userInfo.age }}</div>
            <div class="apex-mma-featured-user-progress">
              <span
                class="apex-mma-featured-user-rank apex-mma-featured-user-rank--active"
                >Trứng</span
              >
              <span class="apex-mma-featured-user-point"
                >{{ userInfo.point }} điểm</span
              >
              <span class="apex-mma-featured-user-rank">GÀ</span>
            </div>
            <div class="apex-mma-featured-user-progress-bar">
              <div
                class="apex-mma-featured-user-progress-bar-inner"
                :style="{ width: userInfo.progress + '%' }"
              ></div>
            </div>
            <div class="apex-mma-featured-user-desc">
              Bạn cần hoạt động nhiều để lên hạng
            </div>
            <div class="apex-mma-featured-user-stats">
              <div>
                <div class="apex-mma-featured-user-stat-label">Bài đã đăng</div>
                <div class="apex-mma-featured-user-stat-value">
                  {{ userInfo.posts }}
                </div>
              </div>
              <div>
                <div class="apex-mma-featured-user-stat-label">Lượt thích</div>
                <div class="apex-mma-featured-user-stat-value">
                  {{ userInfo.likes }}
                </div>
              </div>
              <div>
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
    <!-- KẾT THÚC: apex-mma-compact-list-section -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "~/composables/useDisplay";
import { NCarousel, NCarouselItem } from "naive-ui";

// Dữ liệu cho fact section (giữ nguyên)
const factList = ref([
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/1Q9Z1Zm.jpg",
    username: "seal2002",
    isCreate: true,
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/1Q9Z1Zm.jpg",
    username: "seal2002",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
    username: "TRUNGKIEN...",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
    username: "TRUNGKIEN...",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
    username: "TRUNGKIEN...",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
  {
    avatar: "https://i.imgur.com/0y8Ftya.png",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    username: "xecata",
  },
]);

// Dữ liệu cho news section
const mainNews = ref({
  image: "https://i.imgur.com/8Q1Z1Zm.jpg",
  title:
    "TinhteDIY : Dạo triển lãm SECC trên tay nhanh bộ ba máy pin ETOP giá hợp lý cho anh em DIY",
  author: "Bảo Long.",
});

const subNews = ref([
  {
    image: "https://i.imgur.com/1Q9Z1Zm.jpg",
    title: "Đánh Giá Chi Tiết: Redmi Note 14 Pro+ 5G sau hơn 10 tháng sử dụng",
    author: "Cáo - Foxtek",
    desc: "Mình đã có hơn 10 tháng gắn bó cùng chiếc Redmi Note 14 Pro+ 5G và cách đây 6 tháng thì mình đã có bài Đánh Giá Chi Tiết đầu tiên. Tính đến hiện tại, đã có những khía cạnh thay đổi nhưng cũng có những yếu tố vẫn còn...",
  },
  {
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    title:
      "Johny Srouji, người đứng đầu mảng chip của Apple nói với Tim Cook ông muốn rời Apple.",
    author: "cuhiep",
    desc: "",
  },
  {
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
    title: "iPhone Air mất giá nhanh hơn các mẫu iPhone 17 khác sau 10 tuần",
    author: "Anh Tú.",
    desc: "",
  },
  {
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    title:
      "TinhteLookBack: Sự cố Y2K và thế giới ứng phó với tận thế công nghệ như thế nào",
    author: "Nam Air",
    desc: "",
  },
]);

const quickList = ref([
  {
    title:
      "Razer Joro là một chiếc bàn phím di động ngon, xài kiểu gì cũng được",
    image: "https://i.imgur.com/1Q9Z1Zm.jpg",
  },
  {
    title: "Project Talon: thiết kế UAV chiến đấu mới của Northrop Grumman",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
  {
    title: "Tổng hợp thay đổi đáng chú ý của One UI 8.5 Beta trên Samsung...",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
  },
  {
    title: "Cách mà máy khoan hoạt động",
    image: "https://i.imgur.com/1Q9Z1Zm.jpg",
  },
  {
    title: "Chuyện gì đang xảy ra ở Apple?",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
  {
    title: "Thương hiệu RAM yêu thích của mình, anh em thì sao?",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
  },
]);

const featuredList = ref([
  {
    title: "Hàng loạt giám đốc cao cấp rời Apple qua công ty khác",
    author: "cuhiep",
  },
  {
    title:
      "TasteAtlas: Phở và Bún Bò VN trong top 100 món ăn ngon nhất thế giới",
    author: "Nam Air",
  },
  {
    title:
      "[QC] MINI 3-Cửa và MINI Countryman thuần điện hoàn toàn mới chính thức ra mắt tại Việt Nam",
    author: "TTKM",
  },
  {
    title: "Mời xem trailer Avatar 3: Fire and Ash - ra rạp 19/12",
    author: "Nam Air",
  },
  {
    title: "Mời bình chọn kênh nội dung công nghệ yêu thích",
    author: "cuhiep",
  },
  {
    title: "Máy giặt sấy 2 trong 1 và riêng lẻ cái nào tốt hơn?",
    author: "Bảo Long.",
  },
]);

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

// Dữ liệu cho section mới: compact list (mobile-first)
const compactList = ref([
  {
    image: "https://i.imgur.com/8Q1Z1Zm.jpg",
    title:
      "Roborock giới thiệu Qrevo Curv 2 Flow: Giẻ lau con lăn, nhận diện hơn 200 vật thể",
    excerpt:
      "Roborock vừa công bố những thông tin chi tiết về mẫu robot hút bụi lau nhà flagship sắp ra mắt của mình, mang tên Qrevo Curv 2 Flow. Đây là một sản phẩm đánh dấu hướng đi mới của hãng khi lần đầu tiên trang bị công nghệ giẻ lau dạng con lăn...",
    author: "Anh Tú.",
    authorAvatar: "https://i.imgur.com/0y8Ftya.png",
  },
  {
    image: "https://i.imgur.com/1Q9Z1Zm.jpg",
    title: "Sự thật là uống nước cam ép và canxi ban đêm không gây ra sỏi thận",
    excerpt:
      "Nếu anh em hoặc người thân thích uống nước cam (nước ép cam tươi) và đang uống viên bổ sung canxi thì 2 loại này đều an toàn cho sức khỏe*, miễn là uống đúng liều lượng**, thậm chí là uống canxi hoặc uống nước cam...",
    author: "Nam Air",
    authorAvatar: "https://i.imgur.com/0y8Ftya.png",
  },
  {
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
    title:
      "Global 8000: máy bay tư nhân nhanh nhất thế giới của Canada, giá hơn 2 ngàn tỷ đồng",
    excerpt:
      "Từ khi các máy bay Concorde lui vào dĩ vãng thì trong thế giới máy bay dân dụng, mà đặc biệt là máy bay tư nhân thì hiếm có chiếc nào đạt tới tốc độ âm thanh (Mach 1, hay 1234 km/giờ) nữa. Một số chiếc nổi bật như Falcon 7X hay Gulfstream G650 đều...",
    author: "Frozen Cat",
    authorAvatar: "https://i.imgur.com/3Q1Z1Zm.jpg",
  },
  {
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    title: "SpaceX có thể IPO trong năm 2026 và thành cty 1.000 tỷ đô",
    excerpt:
      "Tỷ phú Elon Musk hé lộ trên X rằng SpaceX có thể sẽ được IPO trong năm 2026, bằng cách bình luận câu “cơ bản thì Eric thường nói đúng” về bài báo của Eric Berger đăng trên Ars Technica rằng SpaceX sẽ sớm được cổ phần hóa.",
    author: "Nam Air",
    authorAvatar: "https://i.imgur.com/0y8Ftya.png",
  },
]);

const { _, isMobile, isTablet, isDesktop } = useDisplay();

const styleCarouselItem = computed(() => {
  return {
    width: isDesktop.value ? "10%" : "30%",
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
      font-size: 16px;
      text-decoration: none;
      font-weight: 500;
    }
  }

  .apex-mma-fact-carousel {
    width: 100%;

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
    }

    .apex-mma-fact-create {
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
    }

    .apex-mma-news-main-title {
      font-size: 22px;
      font-weight: 700;
      color: #222;
      margin-bottom: 8px;
      line-height: 1.3;
      padding-top: 12px;
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
      }

      .apex-mma-news-sub-content {
        padding: 12px 0;

        .apex-mma-news-sub-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
          line-height: 1.3;
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
        color: #1976d2;
      }

      .apex-mma-news-quick-viewall {
        color: #1976d2;
        font-size: 15px;
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

      .apex-mma-featured-title {
        font-size: 22px;
        font-weight: 700;
        color: #222;
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
        border: 1px solid #e5e6ed;
        border-radius: 12px;
        padding: 24px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

        .apex-mma-featured-user-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 8px;
          background: #e5e6ed;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }

        .apex-mma-featured-user-name {
          font-size: 18px;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 2px;
          text-align: center;
        }

        .apex-mma-featured-user-label {
          font-size: 14px;
          color: #888;
          margin-bottom: 2px;
          text-align: center;
        }

        .apex-mma-featured-user-age {
          font-size: 15px;
          color: #222;
          font-weight: 500;
          margin-bottom: 8px;
          text-align: center;
        }
      }

      .apex-mma-featured-user-progress {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
        width: 100%;
        justify-content: center;

        .apex-mma-featured-user-rank {
          font-size: 15px;
          color: #bdbdbd;
          font-weight: 600;

          &.apex-mma-featured-user-rank--active {
            color: #1976d2;
          }
        }

        .apex-mma-featured-user-point {
          font-size: 15px;
          color: #1976d2;
          font-weight: 700;
          background: #f1f2f4;
          border-radius: 8px;
          padding: 2px 10px;
          margin: 0 4px;
        }

        .apex-mma-featured-user-progress-bar {
          width: 100%;
          height: 6px;
          background: #e5e6ed;
          border-radius: 4px;
          margin-bottom: 8px;
          overflow: hidden;

          .apex-mma-featured-user-progress-bar-inner {
            height: 100%;
            background: linear-gradient(90deg, #1ec8c8 0%, #1e90e8 100%);
            border-radius: 4px;
            transition: width 0.3s;
            width: 0%;
          }
        }

        .apex-mma-featured-user-desc {
          font-size: 14px;
          color: #888;
          margin-bottom: 12px;
          text-align: center;
        }

        .apex-mma-featured-user-stats {
          display: flex;
          width: 100%;
          justify-content: space-between;
          gap: 8px;
          margin-top: 8px;

          .apex-mma-featured-user-stat-label {
            font-size: 13px;
            color: #888;
            text-align: center;
          }

          .apex-mma-featured-user-stat-value {
            font-size: 16px;
            color: #1976d2;
            font-weight: 700;
            text-align: center;
          }
        }
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

      .apex-mma-compact-title {
        font-size: 20px;
        font-weight: 700;
        color: #222;
        margin-bottom: 12px;
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

            .apex-mma-compact-title {
              font-size: 18px;
              font-weight: 700;
              color: #222;
              line-height: 1.25;
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

      .apex-mma-featured-user-card {
        width: 100%;
        background: #fff;
        border: 1px solid #e5e6ed;
        border-radius: 12px;
        padding: 24px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

        .apex-mma-featured-user-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 8px;
          background: #e5e6ed;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }

        .apex-mma-featured-user-name {
          font-size: 18px;
          font-weight: 700;
          color: #1976d2;
          margin-bottom: 2px;
          text-align: center;
        }

        .apex-mma-featured-user-label {
          font-size: 14px;
          color: #888;
          margin-bottom: 2px;
          text-align: center;
        }

        .apex-mma-featured-user-age {
          font-size: 15px;
          color: #222;
          font-weight: 500;
          margin-bottom: 8px;
          text-align: center;
        }
      }

      .apex-mma-featured-user-progress {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
        width: 100%;
        justify-content: center;

        .apex-mma-featured-user-rank {
          font-size: 15px;
          color: #bdbdbd;
          font-weight: 600;

          &.apex-mma-featured-user-rank--active {
            color: #1976d2;
          }
        }

        .apex-mma-featured-user-point {
          font-size: 15px;
          color: #1976d2;
          font-weight: 700;
          background: #f1f2f4;
          border-radius: 8px;
          padding: 2px 10px;
          margin: 0 4px;
        }

        .apex-mma-featured-user-progress-bar {
          width: 100%;
          height: 6px;
          background: #e5e6ed;
          border-radius: 4px;
          margin-bottom: 8px;
          overflow: hidden;

          .apex-mma-featured-user-progress-bar-inner {
            height: 100%;
            background: linear-gradient(90deg, #1ec8c8 0%, #1e90e8 100%);
            border-radius: 4px;
            transition: width 0.3s;
            width: 0%;
          }
        }

        .apex-mma-featured-user-desc {
          font-size: 14px;
          color: #888;
          margin-bottom: 12px;
          text-align: center;
        }

        .apex-mma-featured-user-stats {
          display: flex;
          width: 100%;
          justify-content: space-between;
          gap: 8px;
          margin-top: 8px;

          .apex-mma-featured-user-stat-label {
            font-size: 13px;
            color: #888;
            text-align: center;
          }

          .apex-mma-featured-user-stat-value {
            font-size: 16px;
            color: #1976d2;
            font-weight: 700;
            text-align: center;
          }
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
