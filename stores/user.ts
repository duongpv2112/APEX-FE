import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const info = ref<any>(null)

  function setInfo(i: any) {
    info.value = i
  }

  function clearInfo() {
    info.value = null
  }

  return { info, setInfo, clearInfo }
})
