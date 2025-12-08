import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'

export default defineNuxtPlugin(() => {
  // Simple client-only dialog provider
  const dialogs = ref<Array<any>>([])

  const open = (payload: any) => {
    // payload can be { id?, component?, props? } or simple string/message
    const id = Date.now()
    dialogs.value.push({ id, ...payload })
    return id
  }

  const close = (id?: number) => {
    if (typeof id === 'undefined') {
      dialogs.value.pop()
      return
    }
    const idx = dialogs.value.findIndex((d) => d.id === id)
    if (idx !== -1) dialogs.value.splice(idx, 1)
  }

  const clear = () => (dialogs.value = [])

  // Provide under $dialog (nuxtApp.$dialog) and inject with useNuxtApp().$dialog
  return {
    provide: {
      dialog: {
        dialogs,
        open,
        close,
        clear,
      },
    },
  }
})
