import { computed, unref, type MaybeRef } from "vue";
import type { ApexNewsDetail } from "~~/shared/newsMock";

export const useNewsDetail = (slug: MaybeRef<string>) => {
  const slugRef = computed(() => unref(slug));

  const { data, pending, error, refresh } = useAsyncData<
    ApexNewsDetail | null
  >(
    () =>
      $fetch<ApexNewsDetail>(`/api/news/${slugRef.value}`).catch(() => null),
    {
      watch: [slugRef],
    }
  );

  const newsDetail = computed(() => data.value);

  return {
    newsDetail,
    pending,
    error,
    refresh,
  };
};
