<template>
  <button
    v-show="isVisible"
    class="apex-mma-back-to-top"
    type="button"
    aria-label="Back to top"
    @click="backToTop"
  >
    ↑
  </button>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const isVisible = ref(false);

const onScroll = () => {
  isVisible.value = window.scrollY > 400;
};

const backToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped lang="scss">
.apex-mma-back-to-top {
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 0;
  background: #1a73e8;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  line-height: 1;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  z-index: 2400;
}

.apex-mma-back-to-top:hover {
  background: #155fbe;
}
</style>

