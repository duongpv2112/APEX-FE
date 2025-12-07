// Custom hook: useTheme
import { ref, watchEffect } from 'vue';

const theme = ref('light');

export function useTheme() {
  const setTheme = (newTheme) => {
    theme.value = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.value);
  });

  return {
    theme,
    setTheme,
  };
}
