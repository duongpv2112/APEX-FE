<template>
  <div class="apex-mma-wix-example">
    <h1>Wix Content Example</h1>

    <div v-if="!error && items.length">
      <ul>
        <li v-for="item in items" :key="item._id">
          {{ item.displayName || item._id }}
        </li>
      </ul>
    </div>

    <div v-else>
      <p v-if="error">Error: {{ error }}</p>
      <p v-else>No data</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  data, // Dữ liệu trả về từ API
  pending, // Trạng thái loading (true/false)
  error, // Thông tin lỗi nếu thất bại
  refresh, // Hàm gọi lại để fetch lại dữ liệu
} = await useWixContent("Articles");
const items = data?.value?.items ?? [];
</script>

<style scoped>
.apex-mma-wix-example {
  padding: 16px;
}
</style>
