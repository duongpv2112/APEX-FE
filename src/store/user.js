// Store module: User
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    info: null,
  }),
  actions: {
    setInfo(info) {
      this.info = info;
    },
    clearInfo() {
      this.info = null;
    },
  },
});
