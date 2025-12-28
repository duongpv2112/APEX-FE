<template>
  <header class="apex-mma-header">
    <div class="apex-mma-header__left">
      <div class="apex-mma-header__logo apex-mma-logo-brand"></div>
      <div class="apex-mma-header__brand">APEX</div>
      <!-- <n-input
        class="apex-mma-header__search"
        secondary
        type="text"
        placeholder="Tìm sản phẩm công nghệ, cộng đồng, bạn bè..."
        round
      /> -->
    </div>
    <div class="apex-mma-header__right">
      <!-- Nút chính (ví dụ: Viết bài chia sẻ) -->
      <!-- <template v-for="(btn, idx) in actionButtons" :key="idx">
        <ClientOnly>
          <n-button
            v-if="btn.show === 'main'"
            :class="btn.class"
            :type="btn.type"
            :color="btn.color"
            round
            @click="btn.action"
          >
            {{ btn.label }}
          </n-button>
        </ClientOnly>
      </template> -->

      <div class="apex-mma-header__icon-group">
        <template
          v-for="(btn, idx) in actionButtons.filter((b) => b.show === 'icon')"
          :key="'icon-' + idx"
        >
          <ClientOnly>
            <n-button :class="btn.class" secondary circle @click="btn.action">
              {{ btn.icon }}
            </n-button>
          </ClientOnly>
        </template>
      </div>

      <div ref="avatarWrapRef" class="apex-mma-header__avatar-wrap">
        <div
          class="apex-mma-header__avatar"
          role="button"
          tabindex="0"
          @click="toggleMenu"
          @keydown.enter.prevent="toggleMenu"
          @keydown.space.prevent="toggleMenu"
        >
          <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="18" fill="#1CCFC9" />
            <path
              d="M18 19.5c2.485 0 4.5-2.015 4.5-4.5S20.485 10.5 18 10.5 13.5 12.515 13.5 15s2.015 4.5 4.5 4.5Zm0 1.5c-3.038 0-9 1.522-9 4.5V27h18v-1.5c0-2.978-5.962-4.5-9-4.5Z"
              fill="#fff"
            />
          </svg>
        </div>

        <!-- Desktop/Tablet dropdown (gắn vào avatar) -->
        <div
          v-if="isMenuOpen && !isMobile"
          class="apex-mma-header__avatar-menu"
          role="menu"
        >
          <template
            v-for="(item, idx) in menuItems"
            :key="item.type === 'divider' ? `div-${idx}` : item.key"
          >
            <div
              v-if="item.type === 'divider'"
              class="apex-mma-header__avatar-menu-divider"
              role="separator"
            ></div>
            <button
              v-else
              class="apex-mma-header__avatar-menu-item"
              type="button"
              @click="onMenuItemClick(item.key)"
            >
              <span
                class="apex-mma-header__avatar-menu-icon"
                aria-hidden="true"
              >
                <span :class="item.iconClass"></span>
              </span>
              <span class="apex-mma-header__avatar-menu-label">{{
                item.label
              }}</span>
              <span
                v-if="item.hasChevron"
                class="apex-mma-header__avatar-menu-chevron"
                aria-hidden="true"
              >
                ›
              </span>
            </button>
          </template>
        </div>
      </div>

      <!-- Mobile dropdown (full width) -->
      <ClientOnly>
        <Teleport to="body">
          <div
            v-if="isMenuOpen && isMobile"
            class="apex-mma-header__avatar-menu-mobile"
          >
            <div
              class="apex-mma-header__avatar-menu-mobile__backdrop"
              @click="closeMenu"
            ></div>
            <div class="apex-mma-header__avatar-menu-mobile__panel" role="menu">
              <template
                v-for="(item, idx) in menuItems"
                :key="
                  item.type === 'divider' ? `m-div-${idx}` : `m-${item.key}`
                "
              >
                <div
                  v-if="item.type === 'divider'"
                  class="apex-mma-header__avatar-menu-divider"
                  role="separator"
                ></div>
                <button
                  v-else
                  class="apex-mma-header__avatar-menu-item apex-mma-header__avatar-menu-item--mobile"
                  type="button"
                  @click="onMenuItemClick(item.key)"
                >
                  <span
                    class="apex-mma-header__avatar-menu-icon"
                    aria-hidden="true"
                  >
                    <span :class="item.iconClass"></span>
                  </span>
                  <span class="apex-mma-header__avatar-menu-label">{{
                    item.label
                  }}</span>
                  <span
                    v-if="item.hasChevron"
                    class="apex-mma-header__avatar-menu-chevron"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>
              </template>
            </div>
          </div>
        </Teleport>
      </ClientOnly>
    </div>
  </header>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useDisplay } from "@/composables/useDisplay";

const { isMobile } = useDisplay();

const isMenuOpen = ref(false);
const avatarWrapRef = ref<HTMLElement | null>(null);

type MenuKey =
  | "profile"
  | "profileInfo"
  | "bookmark"
  | "draft"
  | "notify"
  | "password"
  | "settings"
  | "theme"
  | "feedback"
  | "logout";

type MenuItem =
  | {
      type: "action";
      key: MenuKey;
      label: string;
      iconClass: string;
      hasChevron?: boolean;
    }
  | { type: "divider" };

const menuItems = computed<MenuItem[]>(() => [
  {
    type: "action",
    key: "profile",
    label: "Trang cá nhân",
    iconClass: "apex-mma-icon-user",
  },
  {
    type: "action",
    key: "profileInfo",
    label: "Thông tin cá nhân",
    iconClass: "apex-mma-icon-user-edit",
  },
  { type: "divider" },
  {
    type: "action",
    key: "bookmark",
    label: "Bookmark",
    iconClass: "apex-mma-icon-bookmark",
  },
  {
    type: "action",
    key: "draft",
    label: "Bài viết nháp",
    iconClass: "apex-mma-icon-draft",
  },
  { type: "divider" },
  {
    type: "action",
    key: "notify",
    label: "Tuỳ chọn thông báo",
    iconClass: "apex-mma-icon-bell",
  },
  {
    type: "action",
    key: "password",
    label: "Thay đổi mật khẩu",
    iconClass: "apex-mma-icon-lock",
  },
  {
    type: "action",
    key: "settings",
    label: "Cài đặt khác",
    iconClass: "apex-mma-icon-setting",
  },
  {
    type: "action",
    key: "theme",
    label: "Giao diện: Sáng",
    iconClass: "apex-mma-icon-moon",
    hasChevron: true,
  },
  { type: "divider" },
  {
    type: "action",
    key: "feedback",
    label: "Góp ý giao diện 8.11.3",
    iconClass: "apex-mma-icon-chat",
  },
  {
    type: "action",
    key: "logout",
    label: "Đăng xuất",
    iconClass: "apex-mma-icon-logout",
  },
]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const onDocumentMouseDown = (e: MouseEvent) => {
  if (!isMenuOpen.value) return;
  const root = avatarWrapRef.value;
  if (!root) return;
  const target = e.target as Node | null;
  if (target && !root.contains(target)) closeMenu();
};

const onDocumentKeyDown = (e: KeyboardEvent) => {
  if (!isMenuOpen.value) return;
  if (e.key === "Escape") closeMenu();
};

onMounted(() => {
  document.addEventListener("mousedown", onDocumentMouseDown);
  document.addEventListener("keydown", onDocumentKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onDocumentMouseDown);
  document.removeEventListener("keydown", onDocumentKeyDown);
});

const onMenuItemClick = (key: MenuKey) => {
  // TODO: thay bằng router navigation / action thực tế.
  console.log("menu click:", key);
  closeMenu();
};

// Danh sách nút chức năng cho Header
const actionButtons = [
  // {
  //   label: "Viết bài chia sẻ",
  //   type: "info",
  //   color: "#2176ff",
  //   class: "apex-mma-header__post-btn",
  //   action: () => {
  //     // TODO: Thay thế bằng logic thực tế (emit, router, ...)
  //     console.log("Viết bài chia sẻ");
  //   },
  //   show: "main",
  // },
  // 3 nút icon, có thể thay icon bằng số hoặc icon thực tế nếu cần
  {
    icon: "1",
    type: "default",
    class: "apex-mma-header__icon-btn",
    action: () => {
      console.log("Icon 1");
    },
    show: "icon",
  },
  {
    icon: "1",
    type: "default",
    class: "apex-mma-header__icon-btn",
    action: () => {
      console.log("Icon 2");
    },
    show: "icon",
  },
  {
    icon: "1",
    type: "default",
    class: "apex-mma-header__icon-btn",
    action: () => {
      console.log("Icon 3");
    },
    show: "icon",
  },
];
</script>

<style scoped lang="scss">
.apex-mma-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);

  .apex-mma-header__left {
    display: flex;
    align-items: center;
    flex: 1 1 0;
    min-width: 0;

    .apex-mma-header__logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 8px;
      cursor: pointer;
    }

    .apex-mma-header__brand {
      min-width: 80px;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .apex-mma-header__right {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 24px;
  }

  .apex-mma-header__icon-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .apex-mma-header__avatar-wrap {
    position: relative;
    user-select: none;

    .apex-mma-header__avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      background: #1ccfc9;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .apex-mma-header__avatar-menu {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 280px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      padding: 6px 0;
      z-index: 2000;

      .apex-mma-header__avatar-menu-divider {
        height: 1px;
        background: #e6e9f0;
        margin: 6px 0;
      }

      .apex-mma-header__avatar-menu-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border: 0;
        background: transparent;
        cursor: pointer;
        text-align: left;
        font-size: 15px;
        color: #25324b;

        &:hover {
          background: rgba(37, 50, 75, 0.06);
        }

        &.apex-mma-header__avatar-menu-item--mobile {
          padding: 14px 16px;
        }

        .apex-mma-header__avatar-menu-icon {
          width: 24px;
          min-width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;

          > span {
            width: 22px;
            height: 22px;
            display: inline-block;
            background: #2d3a55;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: center;
            -webkit-mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
            mask-size: contain;
          }
        }

        .apex-mma-header__avatar-menu-label {
          flex: 1 1 auto;
        }

        .apex-mma-header__avatar-menu-chevron {
          font-size: 22px;
          line-height: 1;
          color: #25324b;
          opacity: 0.6;
        }
      }
    }
  }
}

// Icon masks cho menu avatar
.apex-mma-icon-user {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-user-edit {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M11 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Zm-7 8v-1c0-2.761 3.582-5 8-5c.69 0 1.36.055 2 .158V20H4Zm16.707-9.293l-7.414 7.414L10 19l.879-3.293l7.414-7.414l2.414 2.414Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M11 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Zm-7 8v-1c0-2.761 3.582-5 8-5c.69 0 1.36.055 2 .158V20H4Zm16.707-9.293l-7.414 7.414L10 19l.879-3.293l7.414-7.414l2.414 2.414Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-bookmark {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M6 2h12a2 2 0 0 1 2 2v20l-8-5l-8 5V4a2 2 0 0 1 2-2Zm12 2H6v16.382l6-3.75l6 3.75V4Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M6 2h12a2 2 0 0 1 2 2v20l-8-5l-8 5V4a2 2 0 0 1 2-2Zm12 2H6v16.382l6-3.75l6 3.75V4Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-draft {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L19.5 10H14V4.5ZM6 4h6v8h8v8H6V4Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L19.5 10H14V4.5ZM6 4h6v8h8v8H6V4Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-bell {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-lock {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2ZM10 6a2 2 0 0 1 4 0v2h-4V6Zm7 14H7V10h10v10Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2ZM10 6a2 2 0 0 1 4 0v2h-4V6Zm7 14H7V10h10v10Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-setting {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M19.14 12.936a7.955 7.955 0 0 0 .06-.936a7.955 7.955 0 0 0-.06-.936l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.62-.936l-.36-2.54A.5.5 0 0 0 14.42 2h-3.84a.5.5 0 0 0-.49.42l-.36 2.54c-.58.23-1.12.54-1.62.936l-2.39-.96a.5.5 0 0 0-.6.22L2.2 8.5a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.62-.06.94c0 .32.02.63.06.94L2.32 14.2a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.5.39 1.04.71 1.62.94l.36 2.54c.04.24.25.42.49.42h3.84c.24 0 .45-.18.49-.42l.36-2.54c.58-.23 1.12-.54 1.62-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5a3.5 3.5 0 1 1 0-7a3.5 3.5 0 0 1 0 7Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M19.14 12.936a7.955 7.955 0 0 0 .06-.936a7.955 7.955 0 0 0-.06-.936l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.62-.936l-.36-2.54A.5.5 0 0 0 14.42 2h-3.84a.5.5 0 0 0-.49.42l-.36 2.54c-.58.23-1.12.54-1.62.936l-2.39-.96a.5.5 0 0 0-.6.22L2.2 8.5a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.62-.06.94c0 .32.02.63.06.94L2.32 14.2a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.5.39 1.04.71 1.62.94l.36 2.54c.04.24.25.42.49.42h3.84c.24 0 .45-.18.49-.42l.36-2.54c.58-.23 1.12-.54 1.62-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5a3.5 3.5 0 1 1 0-7a3.5 3.5 0 0 1 0 7Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-moon {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-chat {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M4 4h16v12H5.17L4 17.17V4Zm1 2v9.17L6.17 14H18V6H5Zm3 10h10v2H8v-2Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M4 4h16v12H5.17L4 17.17V4Zm1 2v9.17L6.17 14H18V6H5Zm3 10h10v2H8v-2Z'/%3E%3C/svg%3E");
}

.apex-mma-icon-logout {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M10 17v-2h4v-2h-4v-2l-4 3l4 3Zm9-14H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M10 17v-2h4v-2h-4v-2l-4 3l4 3Zm9-14H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z'/%3E%3C/svg%3E");
}
</style>
<style lang="scss">
.apex-mma-header__avatar-menu-mobile {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;

  .apex-mma-header__avatar-menu-mobile__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
  }

  .apex-mma-header__avatar-menu-mobile__panel {
    position: absolute;
    top: 64px; // xấp xỉ chiều cao header
    left: 0;
    right: 0;
    background: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    overflow: hidden;
    padding: 4px 0;

    .apex-mma-header__avatar-menu-divider {
      height: 1px;
      background: #e6e9f0;
      margin: 6px 0;
    }

    .apex-mma-header__avatar-menu-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border: 0;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-size: 15px;
      color: #25324b;

      &:hover {
        background: rgba(37, 50, 75, 0.06);
      }

      &.apex-mma-header__avatar-menu-item--mobile {
        padding: 14px 16px;
      }

      .apex-mma-header__avatar-menu-icon {
        width: 24px;
        min-width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        > span {
          width: 22px;
          height: 22px;
          display: inline-block;
          background: #2d3a55;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
          -webkit-mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
          mask-size: contain;
        }
      }

      .apex-mma-header__avatar-menu-label {
        flex: 1 1 auto;
      }

      .apex-mma-header__avatar-menu-chevron {
        font-size: 22px;
        line-height: 1;
        color: #25324b;
        opacity: 0.6;
      }
    }
  }
}
</style>
