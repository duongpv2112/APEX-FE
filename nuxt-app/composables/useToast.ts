export const useToast = () => {
  const nuxtApp = useNuxtApp()
  const toast = (msg: string) => {
    // useNuxtApp().$toast is the public API after provide
    // @ts-ignore
    (nuxtApp as any).$toast?.toast?.(msg) || (nuxtApp as any)._context?.provides?.toast?.toast?.(msg)
  }

  return { toast }
}
