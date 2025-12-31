<template>
  <section class="apex-mma-sidebar-widget" aria-label="Latest news">
    <div class="apex-mma-sidebar-widget__header">
      <h4 class="apex-mma-sidebar-widget__title">Latest News</h4>
      <div class="apex-mma-sidebar-widget__tabs" role="tablist" aria-label="Latest news tabs">
        <button
          v-for="t in tabs"
          :key="t.key"
          class="apex-mma-sidebar-widget__tab"
          :class="{ 'apex-mma-sidebar-widget__tab--active': t.key === activeKey }"
          type="button"
          role="tab"
          :aria-selected="t.key === activeKey"
          @click="activeKey = t.key"
        >
          {{ t.label }}
        </button>
      </div>
    </div>

    <div class="apex-mma-sidebar-widget__body" role="tabpanel">
      <ApexMmaHomeSidebarPostItem
        v-for="(p, idx) in items"
        :key="p.slug || idx"
        :item="p"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { HomeSubPostsItem } from "~/types/posts/posts.ui";
import ApexMmaHomeSidebarPostItem from "~/components/home/ApexMmaHomeSidebarPostItem.vue";

defineProps<{ items: HomeSubPostsItem[] }>();

// NOTE: Phase 1 chỉ làm UI/pixel; chưa có API popular/share/liked/week.
const tabs = [
  { key: "all", label: "All" },
  { key: "popular", label: "Popular" },
  { key: "shared", label: "Most Shared" },
  { key: "liked", label: "Most Liked" },
  { key: "weekly", label: "Weekly" },
];

const activeKey = ref<(typeof tabs)[number]["key"]>("all");
</script>

<style scoped lang="scss">
.apex-mma-sidebar-widget {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  overflow: hidden;
}

.apex-mma-sidebar-widget__header {
  background: #111827;
  color: #fff;
  padding: 12px 12px 0;
}

.apex-mma-sidebar-widget__title {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 10px;
}

.apex-mma-sidebar-widget__tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-bottom: 12px;
}

.apex-mma-sidebar-widget__tab {
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  padding: 6px 0;
}

.apex-mma-sidebar-widget__tab--active {
  color: #fff;
  border-bottom: 2px solid rgba(255, 255, 255, 0.6);
}

.apex-mma-sidebar-widget__body {
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

