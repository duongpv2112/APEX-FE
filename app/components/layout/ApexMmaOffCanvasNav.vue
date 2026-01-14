<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="apex-mma-off-canvas"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <button
          class="apex-mma-off-canvas__overlay"
          type="button"
          aria-label="Close menu"
          @click="close"
        />

        <!-- Close button nằm ngoài panel để giống layout mẫu (X ở góc phải phía trên) -->
        <button
          class="apex-mma-off-canvas__close"
          type="button"
          aria-label="Close"
          @click="close"
        >
          ×
        </button>

        <aside class="apex-mma-off-canvas__panel">
          <div class="apex-mma-off-canvas__header">
            <NuxtLink class="apex-mma-off-canvas__brand" to="/" @click="close">
              <NuxtImg
                class="apex-mma-off-canvas__brand-img"
                src="/images/logo-brand.svg"
                alt="APEX MMA"
                width="150"
                height="36"
              />
            </NuxtLink>
          </div>

          <nav class="apex-mma-off-canvas__nav" aria-label="Mobile navigation">
            <NuxtLink
              v-for="c in categories"
              :key="c.slug"
              class="apex-mma-off-canvas__nav-item"
              :to="{ name: 'posts-categories-category', params: { category: c.slug } }"
              @click="close"
            >
              <span class="apex-mma-off-canvas__nav-item-label">{{ c.label }}</span>
              <span class="apex-mma-off-canvas__nav-item-icon" aria-hidden="true">›</span>
            </NuxtLink>
          </nav>

          <div class="apex-mma-off-canvas__footer">
            <div class="apex-mma-off-canvas__social" aria-label="Social links">
              <a class="apex-mma-off-canvas__social-link" href="#" aria-label="Facebook">f</a>
              <a class="apex-mma-off-canvas__social-link" href="#" aria-label="Twitter">x</a>
              <a class="apex-mma-off-canvas__social-link" href="#" aria-label="Youtube">▶</a>
              <a class="apex-mma-off-canvas__social-link" href="#" aria-label="Instagram">⌁</a>
            </div>
            <div class="apex-mma-off-canvas__copyright">
              © {{ new Date().getFullYear() }} APEX MMA
            </div>
          </div>
        </aside>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useOffCanvasNav } from "~/composables/useOffCanvasNav";
import { usePostCategories } from "~/composables/usePostCategories";

const { isOpen, close } = useOffCanvasNav();
const { categories } = usePostCategories();
</script>

<style scoped lang="scss">
.apex-mma-off-canvas {
  position: fixed;
  inset: 0;
  z-index: 2500;
}

.apex-mma-off-canvas__overlay {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(0, 0, 0, 0.55);
}

.apex-mma-off-canvas__panel {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: min(86vw, 360px);
  background: #ffffff;
  color: #111827;
  padding: 18px 0 16px;
  overflow-y: auto;
  box-shadow: 18px 0 44px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
}

.apex-mma-off-canvas__close {
  position: fixed;
  top: 14px;
  right: 14px;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 0;
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.apex-mma-off-canvas__close:hover {
  background: rgba(0, 0, 0, 0.38);
}

.apex-mma-off-canvas__header {
  padding: 4px 22px 18px;
}

.apex-mma-off-canvas__brand {
  display: inline-flex;
  align-items: center;
}

.apex-mma-off-canvas__brand-img {
  width: 50px;
  height: auto;
}

.apex-mma-off-canvas__nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
}

.apex-mma-off-canvas__nav-item {
  padding: 14px 22px;
  color: #111827;
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.apex-mma-off-canvas__nav-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.apex-mma-off-canvas__nav-item-label {
  line-height: 1.1;
}

.apex-mma-off-canvas__nav-item-icon {
  color: rgba(17, 24, 39, 0.55);
  font-weight: 800;
  font-size: 18px;
  line-height: 1;
}

.apex-mma-off-canvas__footer {
  margin-top: auto;
  padding: 18px 22px 0;
}

.apex-mma-off-canvas__social {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0 18px;
}

.apex-mma-off-canvas__social-link {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  color: rgba(17, 24, 39, 0.9);
  text-decoration: none;
  font-weight: 800;
  line-height: 1;
}

.apex-mma-off-canvas__social-link:hover {
  background: rgba(0, 0, 0, 0.04);
}

.apex-mma-off-canvas__copyright {
  font-size: 12px;
  color: rgba(17, 24, 39, 0.55);
}

@media (prefers-reduced-motion: reduce) {
  .apex-mma-off-canvas__overlay,
  .apex-mma-off-canvas__panel,
  .apex-mma-off-canvas__close {
    transition: none;
  }
}
</style>

