import { onBeforeUnmount, onMounted, watch } from "vue";

/**
 * Global state cho Off-canvas navigation (SSR-safe).
 */
export const useOffCanvasNav = () => {
  const isOpen = useState<boolean>("apex-mma-offcanvas-open", () => false);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  // Body scroll lock (client only)
  const lockBodyScroll = () => {
    if (!process.client) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const unlockBodyScroll = () => {
    if (!process.client) return;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!isOpen.value) return;
    if (e.key === "Escape") close();
  };

  onMounted(() => {
    watch(
      isOpen,
      (v) => {
        if (v) lockBodyScroll();
        else unlockBodyScroll();
      },
      { immediate: true }
    );

    document.addEventListener("keydown", onKeyDown);
  });

  onBeforeUnmount(() => {
    if (process.client) {
      document.removeEventListener("keydown", onKeyDown);
      unlockBodyScroll();
    }
  });

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

