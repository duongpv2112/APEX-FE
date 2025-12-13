export interface ApexNewsDetail {
  slug: string
  title: string
  author: string
  image: string
  desc?: string
  content: string
  publishedAt: string
  tags?: string[]
  readingTime?: string
}

// Danh sách mock news dùng chung cho homepage (summary) và trang chi tiết
export const mockNewsList: ApexNewsDetail[] = [
  {
    slug: "tinhte-diy-trien-lam-secc-may-pin-etop",
    title:
      "TinhteDIY : Dạo triển lãm SECC trên tay nhanh bộ ba máy pin ETOP giá hợp lý cho anh em DIY",
    author: "Bảo Long.",
    image: "https://i.imgur.com/8Q1Z1Zm.jpg",
    desc:
      "Dạo một vòng triển lãm SECC và trên tay nhanh bộ ba máy pin ETOP với mức giá dễ tiếp cận cho anh em thích làm DIY.",
    content:
      "Dạo triển lãm SECC năm nay, khu vực trưng bày các sản phẩm DIY và dụng cụ cầm tay thu hút rất nhiều anh em. Trong đó, ETOP mang tới bộ ba máy pin với cấu hình và ngoại hình khá ấn tượng trong tầm giá.\n\nBài viết này chia sẻ nhanh cảm nhận trên tay, độ hoàn thiện, trải nghiệm thực tế ở khu demo, cũng như vài gợi ý nếu anh em đang tìm một bộ máy pin để bắt đầu hành trình DIY của mình.",
    publishedAt: "2024-12-01",
    tags: ["DIY", "ETOP", "SECC"],
    readingTime: "7 phút đọc",
  },
  {
    slug: "redmi-note-14-pro-plus-5g-review-10-thang",
    title:
      "Đánh Giá Chi Tiết: Redmi Note 14 Pro+ 5G sau hơn 10 tháng sử dụng",
    author: "Cáo - Foxtek",
    image: "https://i.imgur.com/1Q9Z1Zm.jpg",
    desc:
      "Sau hơn 10 tháng gắn bó, Redmi Note 14 Pro+ 5G thay đổi như thế nào so với bài đánh giá chi tiết đầu tiên?",
    content:
      "Mình đã có hơn 10 tháng gắn bó cùng chiếc Redmi Note 14 Pro+ 5G. Khoảng 6 tháng trước mình từng có một bài đánh giá chi tiết, nhưng đến hiện tại vẫn có nhiều điểm thay đổi, cả tích cực lẫn hạn chế mới bộc lộ.\n\nTrong bài viết này, mình sẽ tập trung vào pin, hiệu năng thực tế trong game, chất lượng camera sau nhiều lần cập nhật phần mềm, cũng như độ bền tổng thể sau thời gian dài sử dụng mỗi ngày.",
    publishedAt: "2024-11-15",
    tags: ["Redmi", "Android", "Đánh giá"],
    readingTime: "10 phút đọc",
  },
  {
    slug: "johny-srouji-va-quyet-dinh-o-lai-apple",
    title:
      "Johny Srouji, người đứng đầu mảng chip của Apple nói với Tim Cook ông muốn rời Apple.",
    author: "cuhiep",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    desc:
      "Câu chuyện hậu trường về người đứng sau thành công của dòng chip Apple Silicon và quyết định ở lại.",
    content:
      "Ít người dùng phổ thông biết đến Johny Srouji, nhưng với anh em theo dõi ngành bán dẫn, đây là cái tên gắn liền với sự chuyển mình mạnh mẽ của Apple trên mảng chip tự thiết kế.\n\nBài viết kể lại câu chuyện khi ông từng bày tỏ ý định rời Apple với Tim Cook, những lý do phía sau, và vì sao cuối cùng ông quyết định ở lại để tiếp tục dẫn dắt đội ngũ Apple Silicon.",
    publishedAt: "2024-10-02",
    tags: ["Apple", "Chip", "Nhân vật"],
    readingTime: "6 phút đọc",
  },
  {
    slug: "iphone-air-mat-gia-nhanh-hon-iphone-17",
    title: "iPhone Air mất giá nhanh hơn các mẫu iPhone 17 khác sau 10 tuần",
    author: "Anh Tú.",
    image: "https://i.imgur.com/2nCt3Sbl.jpg",
    desc:
      "Thống kê thị trường cho thấy iPhone Air giảm giá mạnh hơn các phiên bản iPhone 17 sau 10 tuần mở bán.",
    content:
      "Sau 10 tuần mở bán, số liệu từ các hệ thống bán lẻ lớn cho thấy giá iPhone Air đã giảm sâu hơn đáng kể so với các mẫu iPhone 17 còn lại.\n\nBài viết phân tích nguyên nhân: chiến lược định vị sản phẩm, mức độ đón nhận của người dùng, cũng như tác động của việc giảm giá tới thị trường máy cũ.",
    publishedAt: "2024-09-20",
    tags: ["iPhone", "Thị trường", "Apple"],
    readingTime: "5 phút đọc",
  },
  {
    slug: "tinhte-lookback-su-co-y2k-va-tan-the-cong-nghe",
    title:
      "TinhteLookBack: Sự cố Y2K và thế giới ứng phó với tận thế công nghệ như thế nào",
    author: "Nam Air",
    image: "https://i.imgur.com/3Q1Z1Zm.jpg",
    desc:
      "Nhìn lại sự cố Y2K và cách thế giới chuẩn bị cho một kịch bản tận thế công nghệ vào năm 2000.",
    content:
      "Vào cuối thập niên 90, cụm từ Y2K xuất hiện dày đặc trên mặt báo, gắn liền với nỗi lo hệ thống máy tính toàn cầu sẽ " +
      "sụp đổ khi bước sang năm 2000.\n\nTrong bài viết này, chúng ta cùng nhìn lại bối cảnh lịch sử, những kịch bản được đặt ra khi đó, và cách mà các kỹ sư phần mềm, hệ thống tài chính, hàng không, viễn thông... đã âm thầm chuẩn bị để thế giới không rơi vào hỗn loạn như nhiều người từng lo sợ.",
    publishedAt: "2024-08-10",
    tags: ["Y2K", "Lịch sử công nghệ"],
    readingTime: "12 phút đọc",
  },
];
