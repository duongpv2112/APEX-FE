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

        <aside class="apex-mma-off-canvas__panel">
          <button
            class="apex-mma-off-canvas__close"
            type="button"
            aria-label="Close"
            @click="close"
          >
            ×
          </button>

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
              {{ c.label }}
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
  background: rgba(0, 0, 0, 0.45);
}

.apex-mma-off-canvas__panel {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: min(86vw, 360px);
  background: #111827;
  color: #fff;
  padding: 18px 16px 16px;
  overflow-y: auto;
}

.apex-mma-off-canvas__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.apex-mma-off-canvas__header {
  padding: 12px 0 16px;
}

.apex-mma-off-canvas__brand {
  display: inline-flex;
  align-items: center;
}

.apex-mma-off-canvas__brand-img {
  width: 150px;
  height: auto;
}

.apex-mma-off-canvas__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 0 18px;
}

.apex-mma-off-canvas__nav-item {
  padding: 12px 10px;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-weight: 700;
}

.apex-mma-off-canvas__nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.apex-mma-off-canvas__footer {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding-top: 12px;
}

.apex-mma-off-canvas__social {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0 10px;
}

.apex-mma-off-canvas__social-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 800;
}

.apex-mma-off-canvas__social-link:hover {
  color: #fff;
}

.apex-mma-off-canvas__copyright {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
</style>

