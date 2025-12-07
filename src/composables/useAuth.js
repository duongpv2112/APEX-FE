// Custom hook: useAuth
import { computed } from 'vue';
import { useAuthStore } from '../store/auth';

export function useAuth() {
  const authStore = useAuthStore();

  const isAuthenticated = computed(() => !!authStore.token);
  const user = computed(() => authStore.user);

  return {
    isAuthenticated,
    user,
    setUser: authStore.setUser,
    setToken: authStore.setToken,
    logout: authStore.logout,
  };
}
