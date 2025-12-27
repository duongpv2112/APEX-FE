export interface ApexCompactMockItem {
  image: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
}

// Danh sách mock cho khối "Tin mới nhất" (compact list)
export const mockCompactList: ApexCompactMockItem[] = [
  {
    image: "https://i.imgur.com/8Q1Z1Zm.jpg",
    title:
      "Roborock giới thiệu Qrevo Curv 2 Flow: Giẻ lau con lăn, nhận diện hơn 200 vật thể",
    excerpt:
      "Roborock vừa công bố những thông tin chi tiết về mẫu robot hút bụi lau nhà flagship sắp ra mắt của mình, mang tên Qrevo Curv 2 Flow. Đây là một sản phẩm đánh dấu hướng đi mới của hãng khi lần đầu tiên trang bị công nghệ giẻ lau dạng con lăn...",
    author: "Anh Tú.",
    authorAvatar: "https://i.imgur.com/0y8Ftya.png",
  },
  {
    image: "https://i.imgur.com/1Q9Z1Zm.jpg",
    title: "Sự thật là uống nước cam ép và canxi ban đêm không gây ra sỏi thận",
    excerpt:
      "Nếu anh em hoặc người thân thích uống nước cam (nước ép cam tươi) và đang uống viên bổ sung canxi thì 2 loại này đều an toàn cho sức khỏe*, miễn là uống đúng liều lượng**, thậm chí là uống canxi hoặc uống nước cam...",
    author: "Nam Air",
    authorAvatar: "https://i.imgur.com/0y8Ftya.png",
  },
  {
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
    title:
      "Global 8000: máy bay tư nhân nhanh nhất thế giới của Canada, giá hơn 2 ngàn tỷ đồng",
    excerpt:
      "Từ khi các máy bay Concorde lui vào dĩ vãng thì trong thế giới máy bay dân dụng, mà đặc biệt là máy bay tư nhân thì hiếm có chiếc nào đạt tới tốc độ âm thanh (Mach 1, hay 1234 km/giờ) nữa. Một số chiếc nổi bật như Falcon 7X hay Gulfstream G650 đều...",
    author: "Frozen Cat",
    authorAvatar: "https://i.imgur.com/3Q1Z1Zm.jpg",
  },
  {
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    title: "SpaceX có thể IPO trong năm 2026 và thành cty 1.000 tỷ đô",
    excerpt:
      "Tỷ phú Elon Musk hé lộ trên X rằng SpaceX có thể sẽ được IPO trong năm 2026, bằng cách bình luận câu “cơ bản thì Eric thường nói đúng” về bài báo của Eric Berger đăng trên Ars Technica rằng SpaceX sẽ sớm được cổ phần hóa.",
    author: "Nam Air",
    authorAvatar: "https://i.imgur.com/0y8Ftya.png",
  },
];

