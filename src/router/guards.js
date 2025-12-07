// Navigation guards (middleware kiểm tra quyền truy cập)
import { useAuthStore } from '../store/auth';

export function setupRouterGuards(router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  });
}
