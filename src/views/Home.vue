<template>
  <section class="apex-mma-fact-section">
    <div class="apex-mma-fact-header">
      <span class="apex-mma-fact-title">APEX Fact</span>
      <a class="apex-mma-fact-viewall" href="#">Xem tất cả</a>
    </div>
    <n-carousel
      class="apex-mma-fact-carousel"
      slides-per-view="auto"
      :space-between="12"
      :loop="false"
    >
      <template v-for="(item, idx) in factList" :key="idx">
        <n-carousel-item style="width: 30%">
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
  </section>
</template>

<script setup>
import { ref } from "vue";
import { NCarousel, NCarouselItem } from "naive-ui";

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
]);
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
  }

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

  .apex-mma-fact-carousel {
    width: 100%;
  }

  .apex-mma-fact-item {
    height: 180px;
    background: #222;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .apex-mma-fact-create {
    background: linear-gradient(135deg, #1ec8c8 0%, #1e90e8 100%);
    justify-content: center;
  }

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
    height: 120px;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
    margin-top: 0;
  }

  .apex-mma-fact-username {
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    margin-top: auto;
    margin-bottom: 12px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/* Điện thoại nhỏ */
@media (max-width: 375px) {
}
/* Điện thoại phổ thông */
@media (max-width: 480px) {
}
/* Phablet */
@media (max-width: 600px) {
}
/* Tablet */
@media (max-width: 768px) {
}
/* Tablet lớn hoặc laptop nhỏ */
@media (max-width: 992px) {
}
/* Laptop/máy tính */
@media (max-width: 1200px) {
}
</style>
