<template>
  <ClientOnly>
    <NImagePreview
      v-if="imageSrc"
      v-model:show="showRef"
      :src="imageSrc"
      @update:show="handleUpdateShow"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { NImagePreview } from "naive-ui";

interface Props {
  visible: boolean;
  imageSrc: string;
  imageAlt?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const showRef = ref(false);

watch(
  () => props.visible,
  (val) => {
    showRef.value = val;
  },
  { immediate: true }
);

const handleUpdateShow = (val: boolean) => {
  showRef.value = val;
  emit("update:visible", val);
};
</script>

<style scoped>
/* Hiện tại sử dụng style mặc định của Naive UI cho overlay preview. */
</style>
