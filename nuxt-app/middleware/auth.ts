import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // simple example: redirect if route requires auth
  const requiresAuth = to.meta?.requiresAuth
  // @ts-ignore
  const user = useState('user')
  if (requiresAuth && !user?.value?.loggedIn) return navigateTo('/login')
})
