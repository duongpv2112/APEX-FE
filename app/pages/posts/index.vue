<script setup lang="ts">
const { categories } = usePostCategories();

useSeoMeta({
  title: "Bài viết | APEX MMA",
  ogTitle: "Bài viết | APEX MMA",
  description: "Danh sách bài viết theo từng chủ đề tại APEX MMA.",
  ogDescription: "Danh sách bài viết theo từng chủ đề tại APEX MMA.",
});

// Redirect SSR-safe sang tab đầu tiên.
const first = categories[0];
if (first) {
  await navigateTo(`/posts/categories/${first.slug}`, { redirectCode: 302 });
}
</script>
