<template>
  <section class="apex-mma-posts-detail-page">
    <div class="apex-mma-container">
      <div class="apex-mma-layout__grid">
        <!-- MAIN -->
        <div class="apex-mma-posts-detail-main">
          <div class="apex-mma-posts-detail-page__breadcrumb">
            <NuxtLink class="apex-mma-posts-detail-page__breadcrumb-link" to="/">
              Trang chủ
            </NuxtLink>
            <template v-if="detailCategory">
              <span class="apex-mma-posts-detail-page__breadcrumb-sep">/</span>
              <NuxtLink
                class="apex-mma-posts-detail-page__breadcrumb-link"
                :to="`/posts/categories/${detailCategory.slug}`"
              >
                {{ detailCategory.label }}
              </NuxtLink>
            </template>
          </div>

          <div v-if="pending" class="apex-mma-posts-detail-loading">
            Đang tải bài viết...
          </div>

          <div v-else-if="error || !newsDetail" class="apex-mma-posts-detail-error">
            Bài viết không tồn tại hoặc đã bị xoá.
          </div>

          <template v-else>
            <div class="apex-mma-posts-detail-chips" aria-label="Categories">
              <NuxtLink
                v-if="detailCategory"
                class="apex-mma-posts-detail-chip"
                :to="`/posts/categories/${detailCategory.slug}`"
              >
                {{ detailCategory.label }}
              </NuxtLink>
            </div>

            <h1 class="apex-mma-posts-detail-title apex-mma-title">
              {{ newsDetail.title }}
            </h1>

            <p v-if="newsDetail.desc" class="apex-mma-posts-detail-excerpt apex-mma-text">
              {{ newsDetail.desc }}
            </p>

            <div class="apex-mma-posts-detail-meta-row">
              <div class="apex-mma-posts-detail-authorbox">
                <NuxtImg
                  v-if="newsDetail.authorAvatar"
                  class="apex-mma-posts-detail-authorbox__avatar"
                  :src="newsDetail.authorAvatar"
                  :alt="newsDetail.author ? `Ảnh đại diện của ${newsDetail.author}` : 'Ảnh đại diện tác giả'"
                  width="42"
                  height="42"
                  sizes="42px"
                  format="webp"
                  fit="cover"
                  loading="lazy"
                />
                <div v-else class="apex-mma-posts-detail-authorbox__avatar apex-mma-posts-detail-authorbox__avatar--placeholder" />

                <div class="apex-mma-posts-detail-authorbox__info">
                  <div class="apex-mma-posts-detail-authorbox__name">
                    {{ newsDetail.author ?? 'APEX MMA' }}
                  </div>
                  <div class="apex-mma-posts-detail-authorbox__sub">
                    <span>{{ publishedAtText }}</span>
                    <template v-if="newsDetail.readingTime">
                      <span class="apex-mma-posts-detail-authorbox__dot">•</span>
                      <span>{{ newsDetail.readingTime }}</span>
                    </template>
                  </div>
                </div>
              </div>

              <div class="apex-mma-posts-detail-stats" aria-label="Stats">
                <div class="apex-mma-posts-detail-stat" title="Lượt thích">
                  <svg class="apex-mma-posts-detail-stat__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 21s-7-4.35-9.33-8.06C.34 9.32 2.1 5.5 6 5.5c2 0 3.33 1.2 4 2.1.67-.9 2-2.1 4-2.1 3.9 0 5.66 3.82 3.33 7.44C19 16.65 12 21 12 21z"
                      fill="currentColor"
                    />
                  </svg>
                  <span class="apex-mma-posts-detail-stat__value">{{ formatNumber(newsDetail.likeCount) }}</span>
                </div>

                <div class="apex-mma-posts-detail-stat" title="Bình luận">
                  <svg class="apex-mma-posts-detail-stat__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M21 6.5c0-1.93-1.57-3.5-3.5-3.5h-11C4.57 3 3 4.57 3 6.5v7C3 15.43 4.57 17 6.5 17H8v4l5.2-4h4.3c1.93 0 3.5-1.57 3.5-3.5v-7z"
                      fill="currentColor"
                    />
                  </svg>
                  <span class="apex-mma-posts-detail-stat__value">{{ formatNumber(newsDetail.commentCount) }}</span>
                </div>

                <div class="apex-mma-posts-detail-stat" title="Lượt xem">
                  <svg class="apex-mma-posts-detail-stat__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                      fill="currentColor"
                    />
                  </svg>
                  <span class="apex-mma-posts-detail-stat__value">{{ formatNumber(newsDetail.viewCount) }}</span>
                </div>
              </div>
            </div>

            <div v-if="coverImageSrc" class="apex-mma-posts-detail-hero">
              <NuxtImg
                class="apex-mma-posts-detail-hero__img"
                :src="coverImageSrc"
                :alt="newsDetail.title"
                width="860"
                height="520"
                sizes="(max-width: 991px) 100vw, 860px"
                format="webp"
                fit="cover"
                loading="lazy"
              />
            </div>

            <div class="apex-mma-posts-detail-share" aria-label="Share">
              <div class="apex-mma-posts-detail-share__count">0 Shares</div>
              <div class="apex-mma-posts-detail-share__buttons">
                <button class="apex-mma-posts-detail-share__btn apex-mma-posts-detail-share__btn--facebook" type="button">
                  Facebook
                </button>
                <button class="apex-mma-posts-detail-share__btn apex-mma-posts-detail-share__btn--twitter" type="button">
                  Twitter
                </button>
                <button class="apex-mma-posts-detail-share__btn apex-mma-posts-detail-share__btn--pinterest" type="button">
                  Pinterest
                </button>
              </div>
            </div>

            <article class="apex-mma-posts-detail-content apex-mma-text">
              <!-- BẮT BUỘC dùng v-html vì contentHtml từ backend có thể có nhiều thẻ <p>, <img>, ... -->
              <div class="apex-mma-posts-detail-content__html" v-html="newsDetail.content" />
            </article>

            <section class="apex-mma-posts-detail-reactions" aria-label="Reactions">
              <h3 class="apex-mma-posts-detail-reactions__title">Reaction</h3>
              <p class="apex-mma-posts-detail-reactions__desc apex-mma-text">
                Bạn thấy bài viết này thế nào?
              </p>

              <div class="apex-mma-posts-detail-reactions__list">
                <button
                  v-for="r in reactions"
                  :key="r.key"
                  class="apex-mma-posts-detail-reaction"
                  :class="{ 'apex-mma-posts-detail-reaction--active': activeReaction === r.key }"
                  type="button"
                  @click="toggleReaction(r.key)"
                >
                  <span class="apex-mma-posts-detail-reaction__emoji" aria-hidden="true">{{ r.emoji }}</span>
                  <span class="apex-mma-posts-detail-reaction__label">{{ r.label }}</span>
                  <span class="apex-mma-posts-detail-reaction__count">{{ r.count }}</span>
                </button>
              </div>
            </section>

            <section class="apex-mma-posts-detail-comments" aria-label="Comments">
              <h3 class="apex-mma-posts-detail-comments__title">Leave A Reply</h3>
              <p class="apex-mma-posts-detail-comments__note apex-mma-text">
                Your email address will not be published. Required fields are marked
                <span class="apex-mma-posts-detail-comments__req">*</span>
              </p>

              <form class="apex-mma-posts-detail-comments__form" @submit.prevent="onSubmitComment">
                <div class="apex-mma-posts-detail-field">
                  <label class="apex-mma-posts-detail-field__label" for="apex-mma-comment">
                    Comment <span class="apex-mma-posts-detail-comments__req">*</span>
                  </label>
                  <textarea
                    id="apex-mma-comment"
                    v-model="commentForm.comment"
                    class="apex-mma-posts-detail-field__textarea"
                    rows="6"
                    required
                  />
                </div>

                <div class="apex-mma-posts-detail-comments__grid">
                  <div class="apex-mma-posts-detail-field">
                    <label class="apex-mma-posts-detail-field__label" for="apex-mma-name">
                      Name <span class="apex-mma-posts-detail-comments__req">*</span>
                    </label>
                    <input
                      id="apex-mma-name"
                      v-model="commentForm.name"
                      class="apex-mma-posts-detail-field__input"
                      type="text"
                      required
                    />
                  </div>

                  <div class="apex-mma-posts-detail-field">
                    <label class="apex-mma-posts-detail-field__label" for="apex-mma-email">
                      Email <span class="apex-mma-posts-detail-comments__req">*</span>
                    </label>
                    <input
                      id="apex-mma-email"
                      v-model="commentForm.email"
                      class="apex-mma-posts-detail-field__input"
                      type="email"
                      required
                    />
                  </div>
                </div>

                <label class="apex-mma-posts-detail-comments__save">
                  <input
                    v-model="commentForm.saveInfo"
                    class="apex-mma-posts-detail-comments__checkbox"
                    type="checkbox"
                  />
                  Save my name, email, and website in this browser for the next time I comment.
                </label>

                <button class="apex-mma-posts-detail-comments__submit" type="submit">
                  Post Comment
                </button>
              </form>
            </section>
          </template>
        </div>

        <!-- SIDEBAR -->
        <aside class="apex-mma-layout__sidebar apex-mma-posts-detail-sidebar" aria-label="Trending">
          <section class="apex-mma-posts-detail-widget">
            <div class="apex-mma-posts-detail-widget__header">
              <h4 class="apex-mma-posts-detail-widget__title">Trending Right Now!</h4>
            </div>

            <div class="apex-mma-posts-detail-widget__body">
              <ApexMmaHomeSidebarPostItem
                v-for="(p, idx) in sidebarItems"
                :key="p.slug || idx"
                :item="p"
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { formatDateTime } from "@/utils";
import ApexMmaHomeSidebarPostItem from "~/components/home/ApexMmaHomeSidebarPostItem.vue";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { getBySlug } = usePostCategories();

const { newsDetail, pending, error } = usePostsDetail(slug);

const { subNews } = usePosts();

const detailCategory = computed(() => getBySlug(newsDetail.value?.categorySlug));

const publishedAtText = computed(() => {
  const raw = newsDetail.value?.publishedAt;
  if (!raw) return "";
  return formatDateTime(raw);
});

const coverImageSrc = computed(() => {
  const prefer = newsDetail.value?.coverImage?.trim();
  if (prefer) return prefer;

  const html = newsDetail.value?.content ?? "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? "";
});

const sidebarItems = computed(() => {
  const items = subNews.value ?? [];
  // tránh hiển thị item trùng slug (nếu API trả về trùng)
  const uniq = new Map<string, (typeof items)[number]>();
  for (const it of items) {
    if (!it?.slug) continue;
    if (!uniq.has(it.slug)) uniq.set(it.slug, it);
  }
  return Array.from(uniq.values()).slice(0, 6);
});

const formatNumber = (n?: number) => {
  const val = typeof n === "number" ? n : 0;
  return new Intl.NumberFormat("vi-VN").format(val);
};

// Nếu backend trả lỗi 404 cho slug không hợp lệ => trả 404 page.
watchEffect(() => {
  const err: any = error.value;
  const statusCode = err?.statusCode ?? err?.status ?? err?.response?.status;
  if (statusCode === 404) {
    throw createError({ statusCode: 404, statusMessage: "Post not found" });
  }
});

useSeoMeta({
  title: computed(() => newsDetail.value?.title ?? "Chi tiết bài viết | APEX MMA"),
  ogTitle: computed(() => newsDetail.value?.title ?? "Chi tiết bài viết | APEX MMA"),
  description: computed(() => newsDetail.value?.desc ?? ""),
  ogDescription: computed(() => newsDetail.value?.desc ?? ""),
});

type ReactionKey = "love" | "wow" | "laugh" | "sad";
const activeReaction = ref<ReactionKey | null>(null);

const reactions = ref(
  [
    { key: "love" as const, emoji: "😍", label: "Love", count: 0 },
    { key: "wow" as const, emoji: "😮", label: "Wow", count: 0 },
    { key: "laugh" as const, emoji: "😂", label: "Haha", count: 0 },
    { key: "sad" as const, emoji: "😢", label: "Sad", count: 0 },
  ]
);

const toggleReaction = (key: ReactionKey) => {
  const current = activeReaction.value;

  // Bỏ chọn
  if (current === key) {
    activeReaction.value = null;
    const idx = reactions.value.findIndex((r) => r.key === key);
    if (idx >= 0 && reactions.value[idx].count > 0) reactions.value[idx].count -= 1;
    return;
  }

  // Nếu đang chọn cái khác thì trừ count của cái trước
  if (current) {
    const prevIdx = reactions.value.findIndex((r) => r.key === current);
    if (prevIdx >= 0 && reactions.value[prevIdx].count > 0) reactions.value[prevIdx].count -= 1;
  }

  activeReaction.value = key;
  const idx = reactions.value.findIndex((r) => r.key === key);
  if (idx >= 0) reactions.value[idx].count += 1;
};

const commentForm = ref({
  comment: "",
  name: "",
  email: "",
  saveInfo: false,
});

const onSubmitComment = () => {
  // Phase UI-only: chưa integrate API.
  // eslint-disable-next-line no-console
  console.log("comment submit", commentForm.value);
  commentForm.value.comment = "";
};
</script>

<style scoped lang="scss">
.apex-mma-posts-detail-page {
  padding: 16px 0 40px;
}

.apex-mma-posts-detail-main {
  min-width: 0;
}

.apex-mma-posts-detail-page__breadcrumb {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.apex-mma-posts-detail-page__breadcrumb-link {
  color: #2563eb;
  text-decoration: none;
}

.apex-mma-posts-detail-page__breadcrumb-link:hover {
  text-decoration: underline;
}

.apex-mma-posts-detail-page__breadcrumb-sep {
  color: #9ca3af;
}

.apex-mma-posts-detail-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 10px 0 10px;
}

.apex-mma-posts-detail-chip {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #111827;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Detail styles */
.apex-mma-posts-detail-title {
  font-size: 30px;
  font-weight: 900;
  line-height: 1.3;
  color: #111827;
  margin: 0 0 10px;
}

.apex-mma-posts-detail-excerpt {
  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 14px;
}

.apex-mma-posts-detail-meta-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 14px;
}

.apex-mma-posts-detail-authorbox {
  display: flex;
  align-items: center;
  gap: 10px;
}

.apex-mma-posts-detail-authorbox__avatar {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  object-fit: cover;
  background: #e5e7eb;
}

.apex-mma-posts-detail-authorbox__avatar--placeholder {
  background: linear-gradient(135deg, #e5e7eb 0%, #f3f4f6 100%);
}

.apex-mma-posts-detail-authorbox__name {
  font-weight: 900;
  font-size: 15px;
  line-height: 1.2;
  color: #111827;
}

.apex-mma-posts-detail-authorbox__sub {
  margin-top: 2px;
  font-size: 13px;
  color: #6b7280;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.apex-mma-posts-detail-authorbox__dot {
  color: #d1d5db;
}

.apex-mma-posts-detail-stats {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #6b7280;
  font-size: 13px;
  flex-shrink: 0;
}

.apex-mma-posts-detail-stat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.apex-mma-posts-detail-stat__icon {
  width: 16px;
  height: 16px;
  opacity: 0.75;
}

.apex-mma-posts-detail-stat__value {
  font-weight: 700;
}

.apex-mma-posts-detail-hero {
  margin: 10px 0 14px;
  border-radius: 6px;
  overflow: hidden;
  background: #f3f4f6;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.apex-mma-posts-detail-hero__img {
  width: 100%;
  height: auto;
}

.apex-mma-posts-detail-share {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 14px;
}

.apex-mma-posts-detail-share__count {
  font-weight: 900;
  color: #1f2937;
}

.apex-mma-posts-detail-share__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.apex-mma-posts-detail-share__btn {
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  border-radius: 3px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.apex-mma-posts-detail-share__btn--facebook {
  border-color: rgba(59, 89, 152, 0.35);
  color: #3b5998;
}

.apex-mma-posts-detail-share__btn--twitter {
  border-color: rgba(29, 161, 242, 0.35);
  color: #1da1f2;
}

.apex-mma-posts-detail-share__btn--pinterest {
  border-color: rgba(189, 8, 28, 0.35);
  color: #bd081c;
}

.apex-mma-posts-detail-content {
  color: #111827;
}

.apex-mma-posts-detail-content__html {
  font-size: 15px;
  line-height: 1.75;
}

.apex-mma-posts-detail-content__html :deep(p) {
  margin: 0 0 16px;
  color: #374151;
}

.apex-mma-posts-detail-content__html :deep(h2) {
  font-size: 26px;
  line-height: 1.25;
  font-weight: 900;
  margin: 28px 0 12px;
  color: #111827;
}

.apex-mma-posts-detail-content__html :deep(h3) {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 900;
  margin: 24px 0 10px;
  color: #111827;
}

.apex-mma-posts-detail-content__html :deep(a) {
  color: #1a73e8;
  text-decoration: underline;
}

.apex-mma-posts-detail-content__html :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 14px auto;
  border-radius: 6px;
}

.apex-mma-posts-detail-content__html :deep(figure) {
  margin: 16px 0;
}

.apex-mma-posts-detail-content__html :deep(figcaption) {
  margin-top: 6px;
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
}

.apex-mma-posts-detail-content__html :deep(blockquote) {
  border-left: 3px solid #e5e7eb;
  padding-left: 12px;
  margin: 16px 0;
  color: #4b5563;
  font-style: italic;
}

.apex-mma-posts-detail-content__html :deep(ul),
.apex-mma-posts-detail-content__html :deep(ol) {
  margin-left: 20px;
  margin-bottom: 16px;
  color: #374151;
}

.apex-mma-posts-detail-content__html :deep(li) {
  margin-bottom: 8px;
}

.apex-mma-posts-detail-loading,
.apex-mma-posts-detail-error {
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 14px;
}

.apex-mma-posts-detail-loading {
  background: #eff6ff;
  color: #1d4ed8;
}

.apex-mma-posts-detail-error {
  background: #fef2f2;
  color: #b91c1c;
}

.apex-mma-posts-detail-widget {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  overflow: hidden;
}

.apex-mma-posts-detail-widget__header {
  padding: 12px;
  border-left: 3px solid #22c55e;
}

.apex-mma-posts-detail-widget__title {
  font-size: 18px;
  font-weight: 900;
  line-height: 1.2;
  color: #111827;
}

.apex-mma-posts-detail-widget__body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.apex-mma-posts-detail-reactions {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;
}

.apex-mma-posts-detail-reactions__title {
  font-size: 18px;
  font-weight: 900;
  color: #111827;
  margin-bottom: 4px;
}

.apex-mma-posts-detail-reactions__desc {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
}

.apex-mma-posts-detail-reactions__list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.apex-mma-posts-detail-reaction {
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 999px;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
}

.apex-mma-posts-detail-reaction:hover {
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.apex-mma-posts-detail-reaction--active {
  border-color: rgba(26, 115, 232, 0.45);
  background: rgba(26, 115, 232, 0.06);
}

.apex-mma-posts-detail-reaction__emoji {
  font-size: 18px;
}

.apex-mma-posts-detail-reaction__label {
  font-weight: 800;
  font-size: 13px;
  color: #111827;
}

.apex-mma-posts-detail-reaction__count {
  font-weight: 800;
  font-size: 13px;
  color: #6b7280;
}

.apex-mma-posts-detail-comments {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;
}

.apex-mma-posts-detail-comments__title {
  font-size: 22px;
  font-weight: 900;
  color: #111827;
  margin-bottom: 8px;
}

.apex-mma-posts-detail-comments__note {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 14px;
}

.apex-mma-posts-detail-comments__req {
  color: #ef4444;
  font-weight: 900;
}

.apex-mma-posts-detail-comments__form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.apex-mma-posts-detail-field__label {
  display: block;
  font-size: 14px;
  font-weight: 800;
  color: #374151;
  margin-bottom: 6px;
}

.apex-mma-posts-detail-field__input,
.apex-mma-posts-detail-field__textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.apex-mma-posts-detail-field__textarea {
  resize: vertical;
}

.apex-mma-posts-detail-field__input:focus,
.apex-mma-posts-detail-field__textarea:focus {
  border-color: rgba(37, 99, 235, 0.55);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.apex-mma-posts-detail-comments__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.apex-mma-posts-detail-comments__save {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #4b5563;
}

.apex-mma-posts-detail-comments__checkbox {
  margin-top: 3px;
}

.apex-mma-posts-detail-comments__submit {
  width: fit-content;
  min-width: 160px;
  border: 0;
  background: #3b5998;
  color: #fff;
  font-weight: 900;
  font-size: 14px;
  padding: 12px 16px;
  border-radius: 3px;
  cursor: pointer;
}

.apex-mma-posts-detail-comments__submit:hover {
  filter: brightness(0.95);
}

.apex-mma-posts-detail-sidebar {
  margin-top: 12px;
}

@media (min-width: 768px) {
  .apex-mma-posts-detail-page {
    padding-top: 24px;
  }
}

@media (max-width: 991px) {
  .apex-mma-posts-detail-stats {
    display: none;
  }
}

@media (min-width: 992px) {
  .apex-mma-posts-detail-sidebar {
    margin-top: 0;
  }

  .apex-mma-posts-detail-content__html {
    font-size: 16px;
  }

  .apex-mma-posts-detail-comments__grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
</style>
