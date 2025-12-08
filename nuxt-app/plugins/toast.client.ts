import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'

export default defineNuxtPlugin(() => {
  const toasts = ref<Array<{ id: number; message: string }>>([])

  const show = (message: string) => {
    const id = Date.now()
    toasts.value.push({ id, message })
    // auto remove after 3s
    setTimeout(() => {
      const idx = toasts.value.findIndex((t) => t.id === id)
      if (idx !== -1) toasts.value.splice(idx, 1)
    }, 3000)
    return id
  }

  const remove = (id: number) => {
    const idx = toasts.value.findIndex((t) => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  return {
    provide: {
      toast: {
        toasts,
        show,
        remove,
      },
    },
  }
})
