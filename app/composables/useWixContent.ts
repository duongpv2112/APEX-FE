export const useWixContent = (collection: string) => {
  return useAsyncData<{ items?: any[] }>(
    `wix-${collection}`, // Tên để nhận diện cache
    () => $fetch(`/api/wix/content?collection=${collection}`) // Hàm async trả về dữ liệu
  );
};
