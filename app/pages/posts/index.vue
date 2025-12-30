<template>
  <!-- Page này chỉ làm nhiệm vụ redirect sang category đầu tiên -->
  <section class="apex-mma-posts-redirect-page apex-mma-text">
    <div v-if="pending" class="apex-mma-posts-redirect-page__loading">
      Đang tải danh mục...
    </div>
    <div v-else-if="error" class="apex-mma-posts-redirect-page__error">
      Không tải được danh mục bài viết.
    </div>
  </section>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";

const { categories, pending, error } = usePostCategories();

useSeoMeta({
  title: "Bài viết | APEX MMA",
  ogTitle: "Bài viết | APEX MMA",
  description: "Danh sách bài viết theo từng chủ đề tại APEX MMA.",
  ogDescription: "Danh sách bài viết theo từng chủ đề tại APEX MMA.",
});

// Redirect SSR-safe sang tab đầu tiên.
watchEffect(async () => {
  if (pending.value) return;
  if (error.value) return;

  const first = categories.value?.[0];
  if (first) {
    await navigateTo(`/posts/categories/${first.slug}`, { redirectCode: 302 });
  }
});
</script>
