import { storeToRefs } from 'pinia'
import { onMounted, onServerPrefetch } from 'vue'
import { useUserStore } from '../../stores/user'

/**
 * Composable cấp UI: lấy userInfo từ Pinia store.
 *
 * Hành vi:
 * - Nếu store chưa có profile => tự gọi `fetchProfile()` để lấy từ API.
 * - SSR-safe: dùng `onServerPrefetch` để fetch trên server (nếu cần).
 */
export const useUserInfo = () => {
  const userStore = useUserStore()
  const { safeProfile: userInfo, hasProfile, pending, error } = storeToRefs(userStore)

  const ensure = async () => {
    if (!hasProfile.value) {
      await userStore.fetchProfile()
    }
  }

  // SSR: chạy trước khi render HTML
  onServerPrefetch(async () => {
    await ensure()
  })

  // Client: fallback nếu hydrate mà vẫn thiếu data
  onMounted(() => {
    if (!hasProfile.value && !pending.value) {
      userStore.fetchProfile().catch(() => {
        // giữ error trong store, không throw để tránh crash UI
      })
    }
  })

  return {
    userInfo,
    pending,
    error,
    refresh: () => userStore.fetchProfile(true),
  }
}
