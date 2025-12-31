<template>
  <div class="apex-mma-header-topbar">
    <div class="apex-mma-container apex-mma-header-topbar__inner">
      <nav class="apex-mma-header-topbar__menu" aria-label="Top navigation">
        <a class="apex-mma-header-topbar__menu-item" href="#">Trending</a>
        <a class="apex-mma-header-topbar__menu-item" href="#">Hot</a>
        <a class="apex-mma-header-topbar__menu-item" href="#">Popular</a>
      </nav>

      <div class="apex-mma-header-topbar__right">
        <form class="apex-mma-header-topbar__search" role="search" @submit.prevent>
          <input
            class="apex-mma-header-topbar__search-input"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <button class="apex-mma-header-topbar__search-btn" type="submit" aria-label="Search">
            <span class="apex-mma-header-topbar__search-icon">⌕</span>
          </button>
        </form>

        <span class="apex-mma-header-topbar__divider" aria-hidden="true" />

        <div class="apex-mma-header-topbar__social" aria-label="Social links">
          <a class="apex-mma-header-topbar__social-link" href="#" aria-label="Facebook">f</a>
          <a class="apex-mma-header-topbar__social-link" href="#" aria-label="Twitter">x</a>
          <a class="apex-mma-header-topbar__social-link" href="#" aria-label="Youtube">▶</a>
          <a class="apex-mma-header-topbar__social-link" href="#" aria-label="Instagram">⌁</a>
        </div>

        <span class="apex-mma-header-topbar__divider" aria-hidden="true" />

        <!-- Dark mode: NOTE scope phase 1 chưa làm. -->
        <button
          class="apex-mma-header-topbar__icon-btn"
          type="button"
          aria-label="Dark mode (not implemented)"
          disabled
        >
          ☾
        </button>

        <span class="apex-mma-header-topbar__divider" aria-hidden="true" />

        <!-- Login/Register modal: NOTE scope phase 1 chưa làm. -->
        <button
          class="apex-mma-header-topbar__icon-btn"
          type="button"
          aria-label="Login (not implemented)"
          disabled
        >
          ⌂
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.apex-mma-header-topbar {
  background: #1b1b1b;
  color: #fff;
  font-size: 13px;
}

.apex-mma-header-topbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
}

.apex-mma-header-topbar__menu {
  display: flex;
  align-items: center;
  gap: 18px;
}

.apex-mma-header-topbar__menu-item {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-decoration: none;
  line-height: 1;
}

.apex-mma-header-topbar__menu-item:hover {
  color: #fff;
}

.apex-mma-header-topbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.apex-mma-header-topbar__search {
  display: flex;
  align-items: center;
  height: 28px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 3px;
  overflow: hidden;
}

.apex-mma-header-topbar__search-input {
  width: 180px;
  padding: 0 10px;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: #fff;
  font-size: 13px;
}

.apex-mma-header-topbar__search-input::placeholder {
  color: rgba(255, 255, 255, 0.55);
}

.apex-mma-header-topbar__search-btn {
  width: 32px;
  height: 100%;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.apex-mma-header-topbar__divider {
  width: 1px;
  height: 18px;
  background: rgba(255, 255, 255, 0.14);
}

.apex-mma-header-topbar__social {
  display: flex;
  align-items: center;
  gap: 10px;
}

.apex-mma-header-topbar__social-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 700;
  line-height: 1;
}

.apex-mma-header-topbar__social-link:hover {
  color: #fff;
}

.apex-mma-header-topbar__icon-btn {
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  line-height: 1;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>

