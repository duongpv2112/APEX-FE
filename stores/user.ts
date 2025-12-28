import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface UserInfo {
  avatar: string
  name: string
  age: string
  point: number
  progress: number
  posts: number
  likes: number
  follows: number
}

const emptyUserInfo = (): UserInfo => ({
  avatar: '',
  name: '',
  age: '',
  point: 0,
  progress: 0,
  posts: 0,
  likes: 0,
  follows: 0,
})

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserInfo | null>(null)
  const pending = ref(false)
  const error = ref<unknown>(null)

  const hasProfile = computed(() => !!profile.value && !!profile.value.name)
  const safeProfile = computed<UserInfo>(() => profile.value ?? emptyUserInfo())

  function setProfile(next: UserInfo | null) {
    profile.value = next
  }

  /**
   * Lấy lại thông tin user từ API.
   * - Mặc định không gọi lại nếu đã có profile (trừ khi force = true)
   */
  async function fetchProfile(force = false) {
    if (pending.value) return
    if (!force && hasProfile.value) return

    pending.value = true
    error.value = null

    try {
      const data = await $fetch<UserInfo>('/api/users/user')
      profile.value = data
    } catch (e) {
      error.value = e
      throw e
    } finally {
      pending.value = false
    }
  }

  return {
    profile,
    safeProfile,
    hasProfile,
    pending,
    error,
    setProfile,
    fetchProfile,
  }
})
