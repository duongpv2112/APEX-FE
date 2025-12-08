import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Simple toast provider example
  const toasts: string[] = []
  const toast = (msg: string) => toasts.push(msg)
  nuxtApp.provide('toast', {
    toasts,
    toast
  })
})
