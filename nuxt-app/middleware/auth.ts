import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  // simple guard: nếu route meta yêu cầu auth và không có session -> redirect tới /login
  const requiresAuth = (to.meta as any)?.requiresAuth
  const runtime = useRuntimeConfig()
  // TODO: check cookie/session via server API hoặc useCookie('auth_token')
  const token = useCookie('auth_token')?.value

  if (requiresAuth && !token) {
    return navigateTo('/login')
  }
})
