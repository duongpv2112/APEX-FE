import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string | null>(null)

  function setUser(u: any) {
    user.value = u
  }

  function setToken(t: string | null) {
    token.value = t
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return { user, token, setUser, setToken, logout }
})
