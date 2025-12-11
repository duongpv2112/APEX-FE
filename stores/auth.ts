import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string | null>(null)
  const isLoggedIn = computed(() => !!token.value)

  return { user, token, isLoggedIn }
})
