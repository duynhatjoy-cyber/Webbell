export const NEWS_ARTICLES = [
  {
    id: 0,
    slug: 'chien-luoc-toi-uu-adr-va-revpar',
    featured: true,
    catKey: 'rev',
    cat: 'Quản lý Doanh thu',
    tag: 'Tiêu điểm · Quản lý Doanh thu',
    title: 'Chiến lược tối ưu ADR và RevPAR: Làm sao để khách sạn không rơi vào bẫy "Kín phòng nhưng vẫn lỗ"?',
    desc: 'Phân tích bài toán quản trị doanh thu thực chiến cho khách sạn 2-4 sao. Cách điều chỉnh khung giá linh động theo ngày trong tuần, công suất phòng và cơ cấu kênh bán để tối đa hóa lợi nhuận ròng thay vì chỉ mải mê chạy theo công suất phòng ảo.',
    date: '26 Tháng 10, 2026',
    readTime: '6 phút đọc',
    author: 'Chuyên gia Doanh thu Lifrooms',
    authorRole: 'Ban Cố vấn Tăng trưởng Khách sạn',
    authorInitials: 'LR',
    image: '/assets/63e0d2bfe1224291a4be1d6730facb48.jpg',
    keyTakeaways: [
      'Công suất phòng (OCC) 90% nhưng giá bán trung bình (ADR) thấp hơn điểm hòa vốn vẫn khiến khách sạn lỗ ròng sau khi trừ chi phí biến đổi và hoa hồng OTA.',
      'RevPAR = ADR × OCC là thước đo chính xác nhất hiệu quả khai thác quỹ phòng, nhưng cần đi kèm GOPPAR để nhìn rõ lợi nhuận thực.',
      'Áp dụng định giá linh động (Dynamic Pricing) theo 3 ngưỡng công suất: <45%, 45–75% và >75% kết hợp kéo khách đặt trực tiếp qua Booking Engine để giữ biên lợi nhuận.',
    ],
    sections: [
      {
        heading: '1. Vì sao nhiều khách sạn đạt 85–90% công suất nhưng cuối tháng vẫn không có lãi?',
        paragraphs: [
          'Đây là tình trạng rất phổ biến tại các khách sạn 2–4 sao và boutique hotel ở Việt Nam: chủ cơ sở thấy phòng sáng đèn gần như kín cả tuần, lễ tân liên tục check-in/check-out, nhưng khi kế toán tổng hợp thu chi cuối tháng thì lợi nhuận lại mỏng hoặc âm.',
          'Nguyên nhân cốt lõi nằm ở việc định giá cố định quá thấp để cạnh tranh trên các sàn OTA, dẫn đến giá bán phòng bình quân (ADR) không đủ bù đắp chi phí biến đổi (giặt ủi, điện nước, đồ amenities, nhân công dọn phòng) cộng với 15–25% hoa hồng OTA.',
        ],
        image: '/assets/d8e97cd43f9f645eec6abba0f8eee195.png',
        imageCaption: 'Theo dõi danh sách đặt phòng và cơ cấu nguồn khách trực tiếp so với OTA ngay trên Bellhop PMS',
        callout: {
          title: 'Ví dụ thực tế tại khách sạn 30 phòng',
          text: 'Nếu bán giá 550.000đ qua OTA (trừ 18% hoa hồng còn 451.000đ) và chi phí biến đổi mỗi lượt phòng là 160.000đ, phần đóng góp gộp chỉ còn 291.000đ/đêm. Trong khi đó, bán ở mức 720.000đ với 70% công suất (trực tiếp + OTA cân bằng) lại mang về lợi nhuận ròng cao hơn hẳn mà ít hao mòn cơ sở vật chất.',
        },
      },
      {
        heading: '2. Hiểu đúng bộ 3 chỉ số: OCC, ADR và RevPAR',
        paragraphs: [
          'Thay vì chỉ nhìn vào tỷ lệ lấp đầy (OCC), người quản lý cần theo dõi đồng thời 3 chỉ số trên báo cáo doanh thu mỗi ngày:',
        ],
        subsections: [
          {
            title: '2.1. OCC & ADR – Tỷ lệ lấp đầy và Giá bán bình quân',
            bullets: [
              'OCC (Occupancy Rate): Tỷ lệ phòng có khách trên tổng số phòng khả dụng, phản ánh sức hút về lượng.',
              'ADR (Average Daily Rate): Doanh thu tiền phòng chia cho tổng số phòng đã bán, phản ánh sức mạnh về giá.',
            ],
            paragraphs: [
              'Nếu chỉ tập trung kéo OCC lên cao bằng cách giảm giá sâu, ADR sẽ tụt dưới ngưỡng an toàn và làm biên lợi nhuận sụt giảm nhanh chóng.',
            ],
            image: '/assets/1feca9cfcb63e1777de6b728389ffe5a.jpg',
            imageCaption: 'Cân bằng giữa tỷ lệ lấp đầy (OCC) và giá phòng trung bình (ADR) giúp tối ưu doanh thu thực',
          },
          {
            title: '2.2. RevPAR – Thước đo hiệu quả khai thác quỹ phòng',
            bullets: [
              'Công thức: RevPAR = Doanh thu phòng ÷ Tổng số phòng hiện có (= OCC × ADR).',
              'Mục tiêu: Tối đa hóa RevPAR theo từng ngày trong tuần thay vì chạy theo 100% công suất giá rẻ.',
            ],
            paragraphs: [
              'Một khách sạn bán 70% phòng với giá 800.000đ (RevPAR = 560.000đ) sẽ có lợi nhuận ròng cao hơn nhiều so với bán 95% phòng với giá 550.000đ (RevPAR = 522.500đ) vì tiết kiệm được chi phí dọn phòng, giặt là và khấu hao.',
            ],
          },
        ],
      },
      {
        heading: '3. Công thức điều chỉnh giá linh động theo 3 ngưỡng công suất',
        paragraphs: [
          'Với Bellhop CMS và Bellhop PMS, bạn không cần ngồi tính tay mỗi sáng. Chỉ cần thiết lập quy tắc giá theo nhịp đặt phòng (Booking Pace) cho từng hạng phòng:',
        ],
        bullets: [
          'Giai đoạn mở bán sớm / Công suất < 45%: Giữ mức giá nền cạnh tranh, ưu tiên gói Early Bird trên website trực tiếp kèm ưu đãi nhận phòng sớm hoặc nâng hạng phòng nhẹ.',
          'Công suất đạt 45% – 75%: Tăng giá bậc 1 (+10% đến +15%), đóng dần các hạng phòng giá rẻ trên OTA để nhường tồn phòng cho kênh trực tiếp.',
          'Công suất vượt 75% hoặc cận ngày lễ: Tăng giá bậc 2 (+20% đến +35%), áp dụng điều kiện lưu trú tối thiểu (MinLOS 2 đêm) để tối đa hóa RevPAR.',
        ],
        image: '/assets/de8ede5a8ea84f4225237b7fd9aebf2d.png',
        imageCaption: 'Cấu hình bảng giá và tồn phòng linh động theo từng giai đoạn công suất',
      },
      {
        heading: '4. Giảm phụ thuộc OTA bằng Booking Engine gắn ngay trên website',
        paragraphs: [
          'Mỗi đơn đặt phòng chuyển dịch từ OTA về website riêng giúp khách sạn giữ lại ngay 15–22% doanh thu vốn phải trả cho hoa hồng. Khi website tích hợp sẵn Bellhop Booking Engine, khách xem được giá theo ngày, phòng trống thực tế từ PMS và thanh toán cọc online qua Bellhop Payment chỉ trong 60 giây.',
        ],
      },
    ],
  },
  {
    id: 1,
    slug: '7-nguyen-nhan-gay-overbooking-va-giai-phap-dong-bo-2-chieu',
    catKey: 'ota',
    cat: 'Kênh bán OTA',
    title: '7 Nguyên nhân hàng đầu gây Overbooking và giải pháp đồng bộ 2 chiều tự động',
    desc: 'Cách xử lý triệt để bài toán trùng phòng giữa Booking.com, Agoda và khách đặt tại quầy vào mùa cao điểm du lịch bằng hệ thống Channel Manager.',
    date: '24 Tháng 10, 2026',
    readTime: '5 phút đọc',
    author: 'Lifrooms OTA Team',
    authorRole: 'Đội ngũ Kết nối Kênh bán OTA',
    authorInitials: 'LO',
    image: '/assets/184ed4c8d5b0f118849e24490114f4af.jpg',
    keyTakeaways: [
      'Overbooking xảy ra chủ yếu do cập nhật tồn phòng thủ công giữa các extranet OTA và sổ/Excel tại quầy lễ tân.',
      'Đồng bộ 2 chiều qua Channel Manager giúp trừ tồn phòng tức thì trên mọi kênh ngay khi có đơn mới.',
    ],
    sections: [
      {
        heading: '1. Khi tồn phòng trên OTA và quầy lễ tân không khớp nhau',
        paragraphs: [
          'Vào cuối tuần hoặc dịp lễ, chỉ cần lễ tân quên khóa phòng trên một kênh OTA sau khi nhận khách walk-in, hai khách khác nhau hoàn toàn có thể đặt cùng một phòng cuối cùng chỉ cách nhau vài phút.',
          'Hậu quả của Overbooking không chỉ là chi phí chuyển khách sang khách sạn lân cận, mà còn là đánh giá 1 sao và bị tụt hạng hiển thị trên Booking.com, Agoda.',
        ],
        image: '/assets/184ed4c8d5b0f118849e24490114f4af.jpg',
        imageCaption: 'Kiểm soát đồng bộ phòng trống giữa quầy lễ tân và các kênh OTA',
      },
      {
        heading: '2. Giải pháp đồng bộ 2 chiều tự động với Bellhop CMS',
        paragraphs: [
          'Thay vì mở 4–5 tab extranet để sửa số lượng phòng trống, toàn bộ tồn phòng được quản lý tập trung tại Bellhop PMS và tự động đẩy ra các kênh qua Bellhop CMS:',
        ],
        bullets: [
          'Khách đặt trên Agoda -> PMS tự động tạo booking và trừ 1 phòng trên Booking.com, Traveloka, Expedia và Website.',
          'Khách hủy phòng -> tồn phòng tự động mở lại ngay lập tức để không mất cơ hội bán.',
          'Quản lý giá và điều kiện bán (đóng/mở ngày, MinLOS) từ một màn hình duy nhất.',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'bang-tinh-diem-hoa-von-break-even-point-cho-khach-san',
    catKey: 'rev',
    cat: 'Quản lý Doanh thu',
    title: 'Bảng tính điểm hòa vốn (Break-even Point) cho khách sạn từ 15 đến 50 phòng',
    desc: 'Hướng dẫn chi tiết cách xác định chi phí cố định, chi phí biến đổi trên mỗi đêm phòng để xây dựng khung giá bán an toàn và sinh lời bền vững.',
    date: '22 Tháng 10, 2026',
    readTime: '7 phút đọc',
    author: 'Nguyễn Minh Tuấn (Lifrooms)',
    authorRole: 'Chuyên gia Tài chính Lưu trú',
    authorInitials: 'MT',
    image: '/assets/1feca9cfcb63e1777de6b728389ffe5a.jpg',
    keyTakeaways: [
      'Tách bạch rõ chi phí cố định (thuê mặt bằng, lương cứng, khấu hao) và chi phí biến đổi (giặt là, điện nước, hoa hồng OTA).',
      'Xác định được giá sàn (Floor Rate) để không bao giờ bán dưới mức hòa vốn.',
    ],
    sections: [
      {
        heading: '1. Công thức tính điểm hòa vốn theo số đêm phòng',
        paragraphs: [
          'Điểm hòa vốn (Break-even Point) là ngưỡng doanh thu hoặc số đêm phòng cần bán trong tháng để tổng thu vừa đủ bù đắp tổng chi phí. Mọi đêm phòng bán vượt ngưỡng này sẽ tạo ra lợi nhuận ròng thực sự.',
        ],
        callout: {
          title: 'Công thức chuẩn',
          text: 'Số đêm phòng hòa vốn/tháng = Tổng chi phí cố định tháng ÷ (Giá bán bình quân sau hoa hồng − Chi phí biến đổi trên 1 đêm phòng).',
        },
      },
      {
        heading: '2. Theo dõi chi phí thực tế ngay trên Bellhop PMS & Finance',
        paragraphs: [
          'Khi thu chi, minibar và hóa đơn được ghi nhận trực tiếp trên hệ thống thay vì rời rạc trên giấy, chủ cơ sở dễ dàng đối chiếu chi phí biến đổi thực tế từng tháng và đồng bộ sang phần mềm kế toán.',
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'quy-trinh-8-buoc-ban-giao-ca-truc-va-doi-soat-quy-tien-mat',
    catKey: 'ops',
    cat: 'Vận hành Lễ tân',
    title: 'Quy trình 8 bước bàn giao ca trực và đối soát quỹ tiền mặt lễ tân chuẩn chỉnh',
    desc: 'Loại bỏ sai sót thất thoát tiền phòng, kiểm soát các khoản đặt cọc và tiền dịch vụ F&B minibar chính xác, minh bạch giữa các ca làm việc.',
    date: '20 Tháng 10, 2026',
    readTime: '4 phút đọc',
    author: 'Bellhop Operations',
    authorRole: 'Đội ngũ Tư vấn Vận hành',
    authorInitials: 'BO',
    image: '/assets/974345ba46df058cd714c647e9882095.jpg',
    keyTakeaways: [
      'Mọi giao dịch tiền mặt, chuyển khoản, đặt cọc và chi lặt vặt phải gắn với mã đặt phòng và tài khoản nhân viên thực hiện.',
      'Chốt ca trên Bellhop PMS chỉ mất 3 phút với báo cáo thu chi tự động phân tách theo phương thức thanh toán.',
    ],
    sections: [
      {
        heading: '1. Những lỗ hổng phổ biến khi bàn giao ca bằng sổ tay',
        paragraphs: [
          'Khi giao ca bằng miệng hoặc sổ giấy, lễ tân ca sau thường không nắm được khách nào đã cọc trước, khách nào hẹn trả phòng muộn có phụ thu, hay khoản chi mua đồ khẩn cấp chưa có chứng từ.',
        ],
      },
      {
        heading: '2. 8 bước bàn giao ca chuẩn trên Bellhop PMS',
        bullets: [
          'Kiểm tra danh sách khách sắp đến (Arrivals) và khách sắp trả phòng (Departures) trong ca tiếp theo.',
          'Rà soát trạng thái buồng phòng (đã dọn, đang dọn, cần kiểm tra).',
          'Đối soát tổng thu tiền mặt, chuyển khoản, thẻ và quỹ tiền lẻ tại quầy.',
          'Ghi chú các yêu cầu đặc biệt của khách ngay trên hồ sơ đặt phòng để ca sau xử lý liền mạch.',
        ],
      },
    ],
  },
  {
    id: 4,
    slug: 'tu-dong-hoa-cham-soc-khach-voi-ai-concierge',
    catKey: 'tech',
    cat: 'Công nghệ & AI',
    title: 'Tự động hóa chăm sóc khách với AI Concierge: Tăng gấp 3 lần tỷ lệ chốt phòng',
    desc: 'Kinh nghiệm thực chiến triển khai trợ lý AI tự động báo giá, tư vấn tiện ích và chốt đơn đặt phòng cho khách qua Zalo, Facebook Fanpage 24/7.',
    date: '18 Tháng 10, 2026',
    readTime: '6 phút đọc',
    author: 'Đội ngũ Công nghệ Bellhop',
    authorRole: 'Bellhop AI & Product Team',
    authorInitials: 'BA',
    image: '/assets/f9b413eecd76fd2b46b3d6174eabbf3b.jpg',
    keyTakeaways: [
      '72% khách nhắn tin hỏi phòng ngoài giờ hành chính sẽ đặt ở nơi khác nếu phải chờ quá 15 phút.',
      'AI Concierge trả lời dựa trên dữ liệu kiến thức riêng của khách sạn và chuyển giao mượt cho lễ tân khi cần chốt cọc hoặc xử lý yêu cầu đặc biệt.',
    ],
    sections: [
      {
        heading: '1. Phản hồi trong 5 giây quyết định tỷ lệ chốt đơn',
        paragraphs: [
          'Khách du lịch thường tìm phòng vào buổi tối (20h–23h) trên Facebook, Zalo OA hoặc Website. Nếu đội lễ tân bận check-in hoặc nghỉ ca đêm, tin nhắn bị trôi đồng nghĩa mất khách.',
        ],
      },
      {
        heading: '2. Kết hợp Bellhop Message và AI Concierge',
        paragraphs: [
          'Toàn bộ tin nhắn từ Zalo OA, Messenger, Website được gom về một hộp thư chung. AI Concierge tự động trả lời các câu hỏi lặp lại như giờ check-in, bãi đỗ xe, ăn sáng, chính sách trẻ em và gửi link đặt phòng trực tiếp.',
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'thuat-toan-xep-hang-ota-2026-len-top-hien-thi',
    catKey: 'ota',
    cat: 'Kênh bán OTA',
    title: 'Thuật toán xếp hạng OTA 2026: Cách đưa khách sạn lên Top hiển thị tự nhiên',
    desc: 'Bí quyết cải thiện điểm chất lượng nội dung (Content Score), tối ưu tỷ lệ chuyển đổi phòng và chiến lược phản hồi đánh giá Review từ khách du lịch.',
    date: '15 Tháng 10, 2026',
    readTime: '8 phút đọc',
    author: 'Lifrooms OTA Team',
    authorRole: 'Đội ngũ Kết nối Kênh bán OTA',
    authorInitials: 'LO',
    image: '/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg',
    keyTakeaways: [
      'Content Score đạt 100%, tốc độ phản hồi tin nhắn và tỷ lệ hủy thấp là 3 yếu tố trọng số cao nhất.',
      'Giữ giá đồng nhất (Rate Parity) hoặc ưu đãi nhẹ trên kênh trực tiếp giúp bảo vệ thương hiệu dài hạn.',
    ],
    sections: [
      {
        heading: '1. Tối ưu Content Score và hình ảnh chuẩn',
        paragraphs: [
          'Các OTA ưu tiên hiển thị những cơ sở lưu trú có ảnh độ phân giải cao, mô tả tiện ích đầy đủ theo từng hạng phòng và chính sách hủy phòng rõ ràng.',
        ],
      },
      {
        heading: '2. Không để đứt gãy tồn phòng vào cuối tuần',
        paragraphs: [
          'Việc mở bán tồn phòng liên tục và chính xác thông qua Bellhop CMS giúp tăng tỷ lệ chuyển đổi (Conversion Rate), từ đó thuật toán OTA tự động đẩy thứ hạng cơ sở lên cao hơn.',
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'checklist-15-tieu-chi-buong-phong-sach-chuan',
    catKey: 'ops',
    cat: 'Vận hành Lễ tân',
    title: 'Checklist 15 tiêu chí buồng phòng sạch chuẩn trước giờ đón khách Check-in',
    desc: 'Bảng kiểm tra tiêu chuẩn buồng phòng dành riêng cho nhân viên Housekeeping giúp khách sạn đạt điểm đánh giá sạch sẽ tuyệt đối trên các nền tảng.',
    date: '12 Tháng 10, 2026',
    readTime: '5 phút đọc',
    author: 'Bellhop Operations',
    authorRole: 'Đội ngũ Tư vấn Vận hành',
    authorInitials: 'BO',
    image: '/assets/e187e247863c141ccd5e7314ed8cff87.jpg',
    keyTakeaways: [
      'Chuẩn hóa quy trình kiểm phòng giúp giảm 90% phản hồi tiêu cực về vệ sinh.',
      'Phân hệ Buồng phòng miễn phí trên Bellhop PMS giúp lễ tân và buồng phòng cập nhật trạng thái theo thời gian thực.',
    ],
    sections: [
      {
        heading: '1. Nhóm tiêu chí phòng ngủ & phòng tắm',
        bullets: [
          'Ga trải giường phẳng, không vết ố, không tóc sót.',
          'Kiểm tra điều hòa, TV, Wi-Fi, đèn ngủ và ổ cắm hoạt động bình thường.',
          'Gương kính, vòi sen và bồn rửa khô ráo, đủ bộ amenities theo tiêu chuẩn.',
        ],
      },
      {
        heading: '2. Cập nhật trạng thái phòng ngay trên điện thoại',
        paragraphs: [
          'Ngay khi nhân viên buồng phòng bấm "Sẵn sàng" trên điện thoại, sơ đồ phòng tại quầy lễ tân tự động chuyển màu để lễ tân đón khách ngay lập tức.',
        ],
      },
    ],
  },
  {
    id: 7,
    slug: 'chien-luoc-ban-phong-ngay-le-va-mua-cao-diem',
    catKey: 'rev',
    cat: 'Quản lý Doanh thu',
    title: 'Chiến lược bán phòng ngày lễ và mùa cao điểm: Đừng chốt giá quá sớm!',
    desc: 'Cách kiểm soát nhịp đặt phòng (Booking Pace), giữ phòng có chọn lọc và điều chỉnh thang giá từng giai đoạn để đạt mức doanh thu kỷ lục.',
    date: '10 Tháng 10, 2026',
    readTime: '6 phút đọc',
    author: 'Ban Cố vấn Lifrooms',
    authorRole: 'Ban Cố vấn Tăng trưởng Khách sạn',
    authorInitials: 'LR',
    image: '/assets/22f6499965f3db2b47bc485b36dc9d03.jpg',
    keyTakeaways: [
      'Bán hết phòng quá sớm với giá thấp đồng nghĩa đánh mất phần doanh thu chênh lệch lớn khi nhu cầu đạt đỉnh.',
      'Kết hợp điều kiện MinLOS (số đêm tối thiểu) cho các ngày cao điểm để tránh tình trạng "lỗ đêm kẹp".',
    ],
    sections: [
      {
        heading: '1. Đọc đúng Booking Pace trước kỳ nghỉ lễ 30–45 ngày',
        paragraphs: [
          'Nếu tốc độ đặt phòng tăng nhanh hơn cùng kỳ năm trước, đó là tín hiệu rõ ràng để nâng thang giá sớm thay vì giữ giá cũ đến khi hết phòng.',
        ],
      },
    ],
  },
  {
    id: 8,
    slug: 'dong-bo-phan-mem-khach-san-voi-ke-toan-misa',
    catKey: 'tech',
    cat: 'Công nghệ & AI',
    title: 'Đồng bộ phần mềm khách sạn với kế toán MISA: Tiết kiệm 80% thời gian chốt sổ',
    desc: 'Quy trình kết nối tự động dữ liệu doanh thu, phiếu thu chi từ Bellhop PMS sang MISA SME và MISA AMIS Kế toán mà không cần nhập liệu tay.',
    date: '08 Tháng 10, 2026',
    readTime: '5 phút đọc',
    author: 'Bellhop Finance Team',
    authorRole: 'Đội ngũ Giải pháp Tài chính',
    authorInitials: 'BF',
    image: '/assets/64926e3c4de0e78477dae7aae6277f1f.jpg',
    keyTakeaways: [
      'Loại bỏ hoàn toàn việc nhập lại từng hóa đơn và phiếu thu từ Excel sang phần mềm kế toán.',
      'Đảm bảo số liệu doanh thu giữa lễ tân, thu ngân và kế toán khớp nhau 100%.',
    ],
    sections: [
      {
        heading: '1. Dữ liệu đi thẳng từ vận hành sang sổ sách kế toán',
        paragraphs: [
          'Với Bellhop Finance, các chứng từ doanh thu phòng, dịch vụ, F&B và thu chi hằng ngày được tổng hợp, đối soát và đồng bộ sang MISA chỉ với vài thao tác, giúp kế toán tập trung vào phân tích tài chính thay vì gõ lại số liệu.',
        ],
      },
    ],
  },
  {
    id: 9,
    slug: 'bo-hop-dong-thue-phong-va-quy-che-khach-san-2026',
    catKey: 'ebook',
    cat: 'Mẫu biểu & Ebook',
    title: 'Tải bộ hợp đồng thuê phòng dài hạn và mẫu quy chế nội quy khách sạn 2026',
    desc: 'Trọn bộ văn bản pháp lý, mẫu thỏa thuận đặt cọc khách đoàn và cam kết lưu trú được cập nhật mới nhất theo quy định của pháp luật Việt Nam.',
    date: '05 Tháng 10, 2026',
    readTime: '3 phút đọc',
    author: 'Lifrooms Legal',
    authorRole: 'Bộ phận Pháp chế & Vận hành',
    authorInitials: 'LL',
    image: '/assets/184ed4c8d5b0f118849e24490114f4af.jpg',
    keyTakeaways: [
      'Chuẩn hóa điều khoản đặt cọc, hủy phòng, bồi thường hư hỏng tài sản cho khách lẻ và khách đoàn.',
      'Dễ dàng tùy chỉnh theo quy mô khách sạn, homestay hoặc villa.',
    ],
    sections: [
      {
        heading: '1. Những điều khoản bắt buộc trong thỏa thuận lưu trú',
        paragraphs: [
          'Một mẫu xác nhận đặt phòng và nội quy rõ ràng ngay từ bước check-in giúp giảm thiểu tranh chấp về giờ trả phòng muộn, phụ thu thêm người hoặc hư hại thiết bị trong phòng.',
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug) {
  return NEWS_ARTICLES.find((a) => a.slug === slug) || NEWS_ARTICLES[0];
}
