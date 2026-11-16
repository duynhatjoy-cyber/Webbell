import React from 'react';

const LANG_KEY = 'bellhop_lang';
const CACHE_KEY = 'bellhop_i18n_cache_v2';

let currentLang = 'vi';
try {
  currentLang = localStorage.getItem(LANG_KEY) || 'vi';
} catch {}

const listeners = new Set();

export function getCurrentLang() {
  return currentLang;
}

export function setGlobalLang(lang) {
  if (lang !== 'vi' && lang !== 'en') return;
  currentLang = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
  listeners.forEach((fn) => {
    try {
      fn(lang);
    } catch {}
  });
}

export function subscribeLang(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Persistent cache for dynamic / long text translations
let dynamicCache = {};
try {
  const raw = localStorage.getItem(CACHE_KEY);
  if (raw) dynamicCache = JSON.parse(raw) || {};
} catch {}

function saveCache() {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(dynamicCache));
  } catch {}
}

// Comprehensive Vietnamese -> English dictionary
const EXACT_DICT = {
  // Navigation & Common UI
  'Trang chủ': 'Home',
  'Sản phẩm': 'Products',
  'Giải pháp': 'Solutions',
  'Tin tức': 'News',
  'Tin tức & Blog': 'News & Blog',
  'Bảng giá': 'Pricing',
  'Về chúng tôi': 'About Us',
  'Về Bellhop': 'About Bellhop',
  'Đăng nhập': 'Sign in',
  'Dùng thử': 'Free Trial',
  'Dùng thử miễn phí': 'Start Free Trial',
  'Đặt lịch demo': 'Book a Demo',
  'Đặt lịch Demo': 'Book a Demo',
  'Đặt lịch tư vấn': 'Book a Consultation',
  'Đăng ký ngay': 'Register Now',
  'Tìm hiểu': 'Learn more',
  'Xem': 'View',
  'Xem tổng quan': 'View Overview',
  'Tổng quan nền tảng': 'Platform Overview',
  'Vận hành': 'Operations',
  'Bán phòng & Doanh thu': 'Distribution & Revenue',
  'Chăm sóc khách hàng': 'Guest Care',
  'Thanh toán & Kế toán': 'Payments & Accounting',
  'Khách sạn': 'Hotels',
  'Homestay & Villa': 'Homestay & Villa',
  'Homestay và Villa': 'Homestay & Villa',
  'Homestay & villa': 'Homestay & Villa',
  'Chuỗi lưu trú': 'Hotel Chains',
  'Chuỗi': 'Chains',
  'Công ty': 'Company',
  'Chính sách': 'Policies',
  'Liên hệ': 'Contact',
  'Bảo vệ và xử lý dữ liệu cá nhân': 'Personal Data Protection Policy',
  'Chính sách bảo vệ và xử lý dữ liệu cá nhân': 'Personal Data Protection Policy',
  'Điều khoản và bảo mật': 'Terms & Security',
  'Chính sách thanh toán': 'Payment Policy',
  'Nền tảng quản lý khách sạn, homestay và villa tại Việt Nam.': 'Smart management platform for hotels, homestays, and villas in Vietnam.',
  '© 2026 Bellhop. Tất cả các quyền được bảo lưu.': '© 2026 Bellhop. All rights reserved.',
  'Nền tảng quản lý lưu trú thông minh': 'Smart Hospitality Management Platform',
  'Minh họa': 'Illustration',
  'Dữ liệu minh họa': 'Illustrative data',
  'Giao diện minh họa': 'Illustrative interface',
  'Mới': 'New',
  'Miễn phí': 'Free',
  'Nâng cao': 'Advanced',
  '+ Module': '+ Module',
  'Sắp ra mắt': 'Coming soon',
  'Đã cập nhật': 'Updated',
  'Đã đồng bộ': 'Synced',
  'Chờ đồng bộ': 'Pending sync',
  'Đã đồng bộ lên các kênh': 'Synced to all channels',
  'Thành công': 'Success',
  'Cần xử lý': 'Action needed',
  'Đang xử lý': 'In progress',
  'Đã xong': 'Resolved',
  'Sẵn sàng': 'Ready',
  'Cần dọn': 'Dirty',
  'Đang dọn': 'Cleaning',
  'Có khách': 'Occupied',
  'Trống': 'Available',
  'Đặt trước': 'Reserved',
  'Đang ở': 'In-house',
  'Trực tiếp': 'Direct',
  'Website / trực tiếp': 'Website / Direct',
  'Gọi điện': 'Phone',
  'Khách sạn ven biển': 'Coastal Hotel',
  'Quầy lễ tân khách sạn': 'Hotel Front Desk',
  'Tòa nhà khách sạn': 'Hotel Building',
  'Phòng khách sạn': 'Hotel Room',
  'Villa có hồ bơi': 'Pool Villa',
  'Homestay trên núi': 'Mountain Homestay',
  'Khu nghỉ dưỡng ven biển': 'Coastal Resort',
  'Dãy khách sạn phố cổ': 'Old Quarter Hotel',
  'Logo khách hàng': 'Customer Logo',

  // Header & Footer descriptions
  'Lễ tân, buồng phòng, kho & F&B, báo cáo': 'Front desk, housekeeping, inventory & F&B, reports',
  'Nhận đặt phòng trực tiếp trên website': 'Accept direct bookings on your website',
  'Đồng bộ kênh OTA, định giá linh động': 'OTA channel sync & dynamic pricing',
  'Website cho khách sạn, homestay, villa': 'Websites for hotels, homestays & villas',
  'Gom tin nhắn mọi kênh về một nơi': 'Unified inbox for all messaging channels',
  'Trợ lý AI trả lời khách': 'AI assistant for guest inquiries',
  'Nhận thanh toán online cho cơ sở': 'Online payment solutions for properties',
  'Đồng bộ dữ liệu sang phần mềm kế toán': 'Sync data to accounting software',

  // HomePage
  'Nền tảng quản lý khách sạn': 'Hotel Management Platform',
  'Mọi việc của khách sạn, ': 'Everything your hotel needs, ',
  'gọn trên một nền tảng': 'all in one platform',
  'Bellhop kết nối lễ tân, buồng phòng, kênh OTA, website đặt phòng, tin nhắn khách và kế toán trong cùng một hệ thống. Dùng miễn phí phần mềm lễ tân và vận hành, thêm tính năng khi cơ sở của bạn cần.':
    'Bellhop connects front desk, housekeeping, OTA channels, booking website, guest messaging, and accounting in a single system. Use core front desk & operations for free, and add modules as your property grows.',
  'Phần mềm lễ tân & vận hành ': 'Front desk & operations software ',
  ' · Dùng trên web và điện thoại': ' · Available on web and mobile',
  'Đặt phòng mọi nguồn': 'All-source Bookings',
  'Phòng & giá': 'Rooms & Rates',
  'Buồng phòng': 'Housekeeping',
  'Booking từ website, OTA, điện thoại và khách vãng lai về chung một danh sách.': 'Bookings from your website, OTAs, phone, and walk-ins flow into one unified list.',
  'Khai báo hạng phòng, giá thường – dùng chung cho mọi kênh bán.': 'Configure room types and base rates once — shared across all sales channels.',
  'Theo dõi thời gian thực tiến độ vệ sinh và phân công dọn phòng.': 'Track real-time room cleaning status and housekeeping assignments.',
  'Booking mới từ website': 'New website booking',
  'Deluxe · 2 đêm · Minh họa': 'Deluxe · 2 nights · Sample',
  'Giá đã đồng bộ lên các kênh': 'Rates synced to all channels',
  'Qua Bellhop CMS': 'Via Bellhop CMS',
  'Phòng 203 đã dọn xong': 'Room 203 is clean',
  'Sẵn sàng đón khách': 'Ready for check-in',
  'Được các cơ sở lưu trú tại Việt Nam tin dùng': 'Trusted by hospitality properties across Vietnam',
  'Chỉ hiển thị logo khi khách hàng đồng ý giới thiệu': 'Logos displayed with customer permission',
  'Một nền tảng · bốn nhóm công việc': 'One platform · Four core workflows',
  'Bellhop lo phần việc phía sau, để bạn tập trung vào khách': 'Bellhop handles the back-office so you can focus on your guests',
  'Dùng riêng từng sản phẩm hoặc kết hợp – tất cả chạy trên cùng một dữ liệu, không nhập lại, không lệch số.': 'Use each product standalone or together — all running on unified data with zero re-entry or discrepancies.',
  'Vận hành · Bellhop PMS': 'Operations · Bellhop PMS',
  'Lễ tân, buồng phòng, kho và F&B trên cùng một màn hình': 'Front desk, housekeeping, inventory & F&B on a single screen',
  'Nắm tình trạng từng phòng theo thời gian thực; nhận, đổi, trả phòng chỉ trong vài thao tác.': 'See real-time room status; check in, move rooms, and check out in just a few clicks.',
  'Tìm hiểu Bellhop PMS ': 'Explore Bellhop PMS ',
  'Bán đúng giá trên mọi kênh, tăng đặt phòng trực tiếp': 'Sell at the right price on every channel & boost direct bookings',
  'Giá và phòng trống quản lý từ một nơi; khách đặt ngay trên website của bạn, đặt phòng tự vào PMS.': 'Manage rates and availability from one place; guests book directly on your website and reservations flow straight into PMS.',
  'Đặt phòng trên website của bạn': 'Direct booking on your website',
  'Nhận phòng': 'Check-in',
  'Trả phòng': 'Check-out',
  'Đặt phòng': 'Book now',
  'Đặt ngay': 'Book now',
  'Trả lời khách nhanh hơn, không bỏ sót tin nhắn nào': 'Reply to guests faster without missing a single message',
  'Mọi cuộc trò chuyện về một nơi, cả đội lễ tân cùng xử lý – kể cả những câu hỏi lặp lại ngoài giờ.': 'All conversations in one inbox so your whole front-desk team can collaborate — even on after-hours FAQs.',
  'Hộp thư chung': 'Unified Inbox',
  'Thu tiền gọn, sổ sách khớp': 'Streamlined payments, accurate books',
  'Dữ liệu tài chính chạy thẳng từ quầy lễ tân đến phần mềm kế toán – kế toán không phải nhập lại.': 'Financial data flows straight from the front desk to your accounting software — no manual re-entry.',
  'Phần mềm kế toán': 'Accounting Software',
  'Kế toán hạch toán, lập báo cáo': 'Bookkeeping & financial reporting',
  'Tự động đồng bộ, không nhập lại': 'Auto-synced, no manual re-entry',
  'Hóa đơn · thu chi · quỹ tại quầy': 'Invoices · cashbook · front-desk funds',
  'Mới trên Bellhop': 'New on Bellhop',
  'Trợ lý AI và hộp thư chung cho đội lễ tân': 'AI Concierge and unified inbox for your front-desk team',
  'Tìm hiểu AI Concierge ': 'Explore AI Concierge ',
  'Phù hợp mô hình của bạn': 'Tailored to your property type',
  'Phù hợp với khách sạn, homestay, villa và chuỗi': 'Built for hotels, homestays, villas, and hospitality chains',
  'Nhiều ca lễ tân, nhiều hạng phòng, bán trên nhiều OTA.': 'Multi-shift front desk, multiple room categories, selling across multiple OTAs.',
  'Ít nhân sự, chủ tự vận hành qua điện thoại, khách hỏi nhiều qua mạng xã hội.': 'Lean team, owner-operated via mobile, high inquiry volume from social channels.',
  'Nhiều cơ sở, cần phân quyền, báo cáo tập trung, kế toán thống nhất.': 'Multi-property operations requiring role permissions, centralized reports, and unified accounting.',
  'Gợi ý': 'Recommended',
  'PMS miễn phí': 'Free PMS',
  'PMS nâng cao': 'Advanced PMS',
  'Đặt lịch demo cho mô hình này ': 'Book a demo for this model ',
  'Công cụ miễn phí': 'Free Tool',
  'Nhập vài con số để ước tính khoản có thể giữ lại khi chuyển một phần đặt phòng sang kênh trực tiếp.': 'Enter a few numbers to estimate how much commission you can retain by shifting a portion of bookings to direct channels.',
  'Số đặt phòng qua OTA / tháng': 'OTA bookings / month',
  'Giá trị TB / đặt phòng (đ)': 'Avg. booking value (VND)',
  '% hoa hồng OTA': 'OTA commission (%)',
  '% đặt phòng có thể chuyển sang trực tiếp': '% of bookings shifted to direct',
  'Kết quả ước tính': 'Estimated Results',
  'Hoa hồng đang trả mỗi năm': 'Annual OTA commission paid',
  'Hoa hồng đang trả mỗi tháng': 'Monthly OTA commission paid',
  'Ước tính có thể giữ lại mỗi năm': 'Estimated annual savings',
  'Ước tính có thể giữ lại mỗi tháng': 'Estimated monthly savings',
  'Kết quả chỉ là ước tính, chưa trừ chi phí vận hành kênh trực tiếp, không phải cam kết.': 'Results are estimates only, before direct channel operating costs, and are not a guarantee.',
  'Tìm hiểu Booking Engine ': 'Explore Booking Engine ',
  'Bắt đầu miễn phí. Nâng cấp khi khách sạn của bạn cần.': 'Start for free. Upgrade as your property grows.',
  'Cộng thêm theo module': 'Modular Add-ons',
  '/ tháng hoặc Liên hệ': '/ month or Contact us',
  'So sánh các gói': 'Compare plans',
  'Blog & tài nguyên': 'Blog & Resources',
  'Kiến thức vận hành và bán phòng cho chủ cơ sở lưu trú': 'Operations & distribution insights for hospitality owners',
  'Tất cả': 'All',
  'Doanh thu': 'Revenue',
  'Nghiệp vụ': 'Operations',
  'Ebook & mẫu biểu': 'Ebooks & Templates',

  // Lead Form (shared across pages)
  'Bắt đầu cùng Bellhop': 'Get Started with Bellhop',
  'Sẵn sàng vận hành gọn hơn?': 'Ready for smoother operations?',
  'Để lại thông tin, đội Bellhop sẽ liên hệ tư vấn và demo theo đúng mô hình cơ sở của bạn.': 'Leave your details and the Bellhop team will reach out with a tailored consultation and live demo for your property.',
  'Đăng ký tư vấn & demo': 'Request a Consultation & Demo',
  'Đặt lịch tư vấn website': 'Book a Website Consultation',
  ' bắt buộc': ' required',
  'Họ tên ': 'Full Name ',
  'Số điện thoại/Zalo ': 'Phone / Zalo ',
  'Tên cơ sở': 'Property Name',
  'Loại hình': 'Property Type',
  'Chọn loại hình': 'Select property type',
  'Số phòng': 'Number of Rooms',
  'Chọn số phòng': 'Select room count',
  'Dưới 10': 'Under 10',
  'Trên 100': 'Over 100',
  'Đang quản lý bằng': 'Currently managing with',
  'Chọn cách quản lý': 'Select current method',
  'Sổ tay / Excel': 'Notebook / Excel',
  'Phần mềm khác': 'Other software',
  'Website hiện tại (nếu có)': 'Current Website (if any)',
  'Sản phẩm quan tâm ': 'Products of Interest ',
  '(chọn nhiều)': '(select multiple)',
  'Tôi đồng ý để Bellhop xử lý thông tin trên nhằm liên hệ tư vấn, theo ': 'I agree for Bellhop to process the information above to contact me for consultation, in accordance with the ',
  'Vui lòng nhập họ tên.': 'Please enter your full name.',
  'Số điện thoại chưa đúng (vd: 0912 345 678).': 'Invalid phone number (e.g., 0912 345 678).',
  'Vui lòng đồng ý để Bellhop liên hệ tư vấn.': 'Please agree to allow Bellhop to contact you.',
  'Cảm ơn bạn!': 'Thank you!',
  'Đội Bellhop sẽ liên hệ với bạn trong thời gian sớm nhất.': 'The Bellhop team will contact you shortly.',
  'Gửi thông tin khác': 'Submit another request',

  // FAQ Help box
  'Câu hỏi thường gặp': 'Frequently Asked Questions',
  'Câu hỏi thường gặp về Bellhop PMS': 'Frequently Asked Questions about Bellhop PMS',
  'Câu hỏi thường gặp về Bellhop CMS': 'Frequently Asked Questions about Bellhop CMS',
  'Câu hỏi thường gặp về Bellhop Website': 'Frequently Asked Questions about Bellhop Website',
  'Câu hỏi thường gặp về Bellhop Message': 'Frequently Asked Questions about Bellhop Message',
  'Câu hỏi thường gặp về AI Concierge': 'Frequently Asked Questions about AI Concierge',
  'Câu hỏi thường gặp về Bellhop Payment': 'Frequently Asked Questions about Bellhop Payment',
  'Câu hỏi thường gặp về Bellhop Finance': 'Frequently Asked Questions about Bellhop Finance',
  'Câu hỏi thường gặp của khách sạn': 'Frequently Asked Questions for Hotels',
  'Câu hỏi thường gặp của homestay & villa': 'Frequently Asked Questions for Homestays & Villas',
  'Câu hỏi thường gặp của chuỗi lưu trú': 'Frequently Asked Questions for Hotel Chains',
  'Chưa thấy câu trả lời?': 'Still have questions?',
  'Chưa thấy câu trả lời bạn cần? Đội Bellhop sẵn sàng tư vấn theo đúng mô hình của bạn.': 'Did not find the answer you need? Our team is ready to advise based on your property model.',
  'Chưa thấy câu trả lời bạn cần? Đội Bellhop sẵn sàng tư vấn theo đúng mô hình cơ sở của bạn.': 'Did not find the answer you need? Our team is ready to advise based on your property model.',
  'Nhắn Zalo hoặc gọi trực tiếp cho đội Bellhop.': 'Message us on Zalo or call the Bellhop team directly.',
  'Chat Zalo': 'Chat on Zalo',
  'Gọi 0972 096 499': 'Call 0972 096 499',
  'Kết nối hệ sinh thái': 'Ecosystem Connectivity',
  'Hệ sinh thái': 'Ecosystem',
  'Kết nối với các sản phẩm Bellhop': 'Connect with the Bellhop Ecosystem',
  'Xem bảng giá': 'View Pricing',
  'Xem bảng giá đầy đủ ': 'View full pricing ',

  // NewsPage
  'LIFROOMS & BELLHOP · BLOG & KIẾN THỨC CHUYÊN SÂU': 'LIFROOMS & BELLHOP · BLOG & HOSPITALITY INSIGHTS',
  'Cẩm nang Vận hành & Quản trị Doanh thu Khách sạn': 'Hotel Operations & Revenue Management Handbook',
  'Tổng hợp các bài viết chuyên sâu về chiến lược tối ưu giá phòng (Revenue Management), phân bổ kênh OTA, kỹ năng lễ tân và công nghệ lưu trú thực chiến từ chuyên gia Lifrooms.':
    'In-depth articles on room pricing optimization (Revenue Management), OTA channel distribution, front-desk excellence, and practical hospitality technology from Lifrooms experts.',
  'Tất cả bài viết': 'All Articles',
  'Quản lý Doanh thu': 'Revenue Management',
  'Kênh bán phòng OTA': 'OTA Channels',
  'Kênh bán OTA': 'OTA Channels',
  'Vận hành Lễ tân': 'Front Desk Ops',
  'Công nghệ & AI': 'Technology & AI',
  'Mẫu biểu & Ebook': 'Templates & Ebooks',
  'Tiêu điểm · Quản lý Doanh thu': 'Featured · Revenue Management',
  'Chiến lược tối ưu ADR và RevPAR: Làm sao để khách sạn không rơi vào bẫy "Kín phòng nhưng vẫn lỗ"?':
    'Optimizing ADR & RevPAR: How to Avoid the "High Occupancy, Low Profit" Trap',
  'Phân tích bài toán quản trị doanh thu thực chiến cho khách sạn 2-4 sao. Cách điều chỉnh khung giá linh động theo ngày trong tuần, công suất phòng và cơ cấu kênh bán để tối đa hóa lợi nhuận ròng thay vì chỉ mải mê chạy theo công suất phòng ảo.':
    'Practical revenue management analysis for 2–4 star hotels: how to adjust dynamic pricing by day of week, occupancy, and channel mix to maximize net profit rather than chasing vanity occupancy.',
  'Chuyên gia Doanh thu Lifrooms': 'Lifrooms Revenue Experts',
  'Ban Cố vấn Tăng trưởng Khách sạn': 'Hotel Growth Advisory Board',
  'Đọc tiếp →': 'Read more →',
  'Nhận bản tin kiến thức khách sạn hàng tuần': 'Subscribe to our weekly hospitality newsletter',
  'Cập nhật số liệu thị trường du lịch, bí quyết tối ưu kênh OTA và các biểu mẫu quản lý mới nhất trực tiếp vào hộp thư của bạn.':
    'Get travel market data, OTA optimization tips, and the latest management templates delivered straight to your inbox.',
  'Nhập địa chỉ email của bạn...': 'Enter your email address...',
  'TÀI NGUYÊN MIỄN PHÍ': 'FREE RESOURCES',
  'Bộ biểu mẫu & Ebook thực chiến dành cho chủ khách sạn': 'Practical Templates & Ebooks for Hoteliers',
  'Được biên soạn độc quyền bởi đội ngũ Lifrooms & Bellhop để hỗ trợ các khách sạn vừa và nhỏ chuẩn hóa vận hành ngay hôm nay.':
    'Exclusively compiled by the Lifrooms & Bellhop team to help small and medium properties standardize operations today.',
  'Mẫu Bảng tính Điểm hòa vốn & Lợi nhuận phòng': 'Break-even Point & Room Profitability Spreadsheet',
  'Công cụ tự động tính toán chi phí định phí, biến phí và giá bán tối thiểu cho từng hạng phòng để đảm bảo lợi nhuận ròng.':
    'Automatically calculate fixed costs, variable costs, and minimum room rates for each category to guarantee net profit.',
  'Tải biểu mẫu miễn phí': 'Download Free Template',
  'Cẩm nang Tối ưu Kênh bán OTA từ A–Z': 'A–Z OTA Channel Optimization Guide',
  'Tài liệu 60 trang hướng dẫn thiết lập chiến lược hiển thị, xử lý Overbooking và bí quyết đàm phán hoa hồng với Booking.com, Agoda.':
    'A 60-page guide on visibility strategies, preventing overbookings, and negotiating commissions with Booking.com and Agoda.',
  'Tải Ebook ngay': 'Download Ebook Now',
  'Quy trình Bàn giao ca & Kiểm phòng chuẩn 4★': '4★ Standard Shift Handover & Room Inspection Checklist',
  'Bảng kiểm tra 15 tiêu chí buồng phòng và biên bản đối soát tiền mặt lễ tân giúp loại bỏ 100% rủi ro thất thoát doanh thu.':
    '15-point housekeeping inspection checklist and front-desk cash reconciliation sheet to eliminate revenue leakage.',
  'Tải Checklist thực chiến': 'Download Checklist',
  '7 Nguyên nhân hàng đầu gây Overbooking và giải pháp đồng bộ 2 chiều tự động':
    'Top 7 Causes of Overbooking and Automated 2-Way Sync Solutions',
  'Cách xử lý triệt để bài toán trùng phòng giữa Booking.com, Agoda và khách đặt tại quầy vào mùa cao điểm du lịch bằng hệ thống Channel Manager.':
    'How to permanently eliminate double bookings between Booking.com, Agoda, and walk-in guests during peak seasons using a Channel Manager.',
  'Bảng tính điểm hòa vốn (Break-even Point) cho khách sạn từ 15 đến 50 phòng':
    'Break-even Point Calculation for 15 to 50-Room Hotels',
  'Hướng dẫn chi tiết cách xác định chi phí cố định, chi phí biến đổi trên mỗi đêm phòng để xây dựng khung giá bán an toàn và sinh lời bền vững.':
    'Step-by-step guide to calculating fixed and variable costs per room night to build a safe, sustainably profitable pricing structure.',
  'Quy trình 8 bước bàn giao ca trực và đối soát quỹ tiền mặt lễ tân chuẩn chỉnh':
    '8-Step Standard Front Desk Shift Handover & Cash Reconciliation Process',
  'Loại bỏ sai sót thất thoát tiền phòng, kiểm soát các khoản đặt cọc và tiền dịch vụ F&B minibar chính xác, minh bạch giữa các ca làm việc.':
    'Eliminate room revenue discrepancies and track deposits, F&B, and minibar charges accurately across shifts.',
  'Tự động hóa chăm sóc khách với AI Concierge: Tăng gấp 3 lần tỷ lệ chốt phòng':
    'Automating Guest Care with AI Concierge: Triple Your Booking Conversion Rate',
  'Kinh nghiệm thực chiến triển khai trợ lý AI tự động báo giá, tư vấn tiện ích và chốt đơn đặt phòng cho khách qua Zalo, Facebook Fanpage 24/7.':
    'Practical experience deploying an AI assistant to quote rates, answer amenity questions, and close bookings on Zalo and Facebook 24/7.',
  'Thuật toán xếp hạng OTA 2026: Cách đưa khách sạn lên Top hiển thị tự nhiên':
    '2026 OTA Ranking Algorithm: How to Boost Your Hotel to Top Organic Visibility',
  'Bí quyết cải thiện điểm chất lượng nội dung (Content Score), tối ưu tỷ lệ chuyển đổi phòng và chiến lược phản hồi đánh giá Review từ khách du lịch.':
    'Secrets to improving your Content Score, optimizing conversion rates, and responding effectively to guest reviews.',
  'Checklist 15 tiêu chí buồng phòng sạch chuẩn trước giờ đón khách Check-in':
    '15-Point Housekeeping Cleanliness Checklist Before Guest Check-in',
  'Bảng kiểm tra tiêu chuẩn buồng phòng dành riêng cho nhân viên Housekeeping giúp khách sạn đạt điểm đánh giá sạch sẽ tuyệt đối trên các nền tảng.':
    'Dedicated housekeeping inspection standards to help your property achieve top cleanliness ratings across booking platforms.',
  'Chiến lược bán phòng ngày lễ và mùa cao điểm: Đừng chốt giá quá sớm!':
    'Holiday & Peak Season Room Sales Strategy: Don’t Lock In Rates Too Early!',
  'Cách kiểm soát nhịp đặt phòng (Booking Pace), giữ phòng có chọn lọc và điều chỉnh thang giá từng giai đoạn để đạt mức doanh thu kỷ lục.':
    'How to monitor booking pace, manage selective inventory holds, and adjust tiered pricing to achieve record revenue.',
  'Đồng bộ phần mềm khách sạn với kế toán MISA: Tiết kiệm 80% thời gian chốt sổ':
    'Syncing Hotel Software with MISA Accounting: Save 80% of Month-End Closing Time',
  'Quy trình kết nối tự động dữ liệu doanh thu, phiếu thu chi từ Bellhop PMS sang MISA SME và MISA AMIS Kế toán mà không cần nhập liệu tay.':
    'Automated workflow for syncing revenue and cash vouchers from Bellhop PMS to MISA SME and MISA AMIS Accounting without manual entry.',
  'Tải bộ hợp đồng thuê phòng dài hạn và mẫu quy chế nội quy khách sạn 2026':
    'Download 2026 Long-Term Room Lease Contracts & Hotel House Rules Templates',
  'Trọn bộ văn bản pháp lý, mẫu thỏa thuận đặt cọc khách đoàn và cam kết lưu trú được cập nhật mới nhất theo quy định của pháp luật Việt Nam.':
    'Complete set of legal templates, group deposit agreements, and guest stay commitments updated for Vietnamese regulations.',

  // Policy Pages Titles
  'THỎA THUẬN CHẤP THUẬN BẢO VỆ VÀ XỬ LÝ DỮ LIỆU CÁ NHÂN': 'PERSONAL DATA PROTECTION AND PROCESSING AGREEMENT',
  '(Theo Nghị định số 13/2023/NĐ-CP của chính phủ về Bảo vệ Dữ liệu cá nhân, có hiệu lực từ ngày 01/07/2023)':
    '(Pursuant to Government Decree No. 13/2023/ND-CP on Personal Data Protection, effective July 1, 2023)',
  'ĐIỀU KHOẢN DỊCH VỤ VÀ BẢO MẬT HỆ THỐNG': 'TERMS OF SERVICE AND SYSTEM SECURITY POLICY',
  '(Quy chế sử dụng dịch vụ nền tảng phần mềm quản lý lưu trú Bellhop)':
    '(Regulations on using the Bellhop hospitality management software platform)',
  'CHÍNH SÁCH VÀ QUY ĐỊNH THANH TOÁN': 'PAYMENT POLICY AND REGULATIONS',
  '(Áp dụng cho các giao dịch thuê bao phần mềm Bellhop và dịch vụ thanh toán trực tuyến)':
    '(Applicable to Bellhop software subscriptions and online payment services)',
  'ĐẠI DIỆN KHÁCH HÀNG': 'CUSTOMER REPRESENTATIVE',
  'BÊN CUNG CẤP / KHÁCH HÀNG': 'PROVIDER / CUSTOMER',
  '(Xác nhận điện tử khi đăng ký và sử dụng dịch vụ)': '(Electronic confirmation upon registration and service use)',
  '(Xác nhận khi đăng ký hoặc ký hợp đồng)': '(Confirmed upon registration or contract signing)',
  '(Xác nhận khi thanh toán dịch vụ)': '(Confirmed upon service payment)',

  // About Page (Về Bellhop & Lifrooms)
  'Về Bellhop & Lifrooms': 'About Bellhop & Lifrooms',
  '— VỀ BELLHOP & LIFROOMS': '— ABOUT BELLHOP & LIFROOMS',
  'Phần mềm quản lý khách sạn được xây dựng từ kinh nghiệm vận hành thực tế':
    'Hotel management software built from real-world operational experience',
  'Bellhop được phát triển bởi đội ngũ Lifrooms, đơn vị tư vấn và vận hành cho các khách sạn vừa và nhỏ tại Việt Nam. Những yêu cầu từ quầy lễ tân, bộ phận buồng phòng và kế toán là cơ sở để thiết kế từng tính năng của Bellhop.':
    'Bellhop is developed by the Lifrooms team, a consulting and operations firm for small and medium-sized hotels in Vietnam. Real requirements from the front desk, housekeeping, and accounting form the foundation for every Bellhop feature.',
  'Tìm hiểu giải pháp Lifrooms': 'Explore Lifrooms Solutions',
  'Khách sạn trong bộ dữ liệu phân tích': 'Hotels in our analytics dataset',
  'Thị trường đang hoạt động': 'Active markets across Vietnam',
  'Khách hàng tiếp tục hợp tác': 'Client retention rate',
  'Tăng trưởng OCC sau 3 tháng': 'Occupancy growth after 3 months',
  '— CÂU CHUYỆN THƯƠNG HIỆU': '— BRAND STORY',
  'Câu chuyện của Bellhop': 'The Story of Bellhop',
  'Trong khách sạn, bellhop là người hỗ trợ hành lý, dẫn khách lên phòng và giúp hành trình lưu trú bắt đầu thuận lợi hơn. Từ ý nghĩa đó, Bellhop ra đời với mong muốn trở thành người đồng hành của các cơ sở lưu trú, giúp công việc vận hành trở nên đơn giản và nhẹ nhàng hơn.':
    'In a hotel, a bellhop assists with luggage, guides guests to their rooms, and ensures every stay begins smoothly. Inspired by this role, Bellhop was created to be a trusted companion for hospitality properties — making daily operations simpler and lighter.',
  'Từ đặt phòng, quản lý buồng phòng đến cập nhật OTA và theo dõi doanh thu, nhiều công việc vẫn đang được xử lý trên những công cụ riêng lẻ, khiến việc vận hành mất thời gian và dễ xảy ra sai sót.':
    'From reservations and housekeeping to OTA updates and revenue tracking, many tasks are still handled across disconnected tools, making operations time-consuming and prone to errors.',
  'Bellhop kết nối các nghiệp vụ trên cùng một hệ thống, giúp thông tin liền mạch, công việc phối hợp dễ dàng và hoạt động quản lý trở nên đơn giản hơn. Với các tính năng lễ tân và vận hành cốt lõi miễn phí, Bellhop giúp khách sạn bắt đầu chuyển đổi mà không phải lo thêm chi phí ban đầu.':
    'Bellhop connects every workflow on a single platform, ensuring seamless information, effortless team coordination, and simpler management. With free core front-desk and operational features, Bellhop helps hotels digitize without upfront cost barriers.',
  'Chúng tôi tin rằng công nghệ tốt không nhất thiết phải xuất hiện ở trung tâm. Đôi khi, giá trị lớn nhất là giúp mọi việc phía sau vận hành trơn tru, để người làm khách sạn có thêm thời gian chăm sóc khách hàng.':
    'We believe great technology doesn’t need to take center stage. Often, its greatest value is keeping everything running smoothly behind the scenes so hoteliers have more time to care for their guests.',
  '“Mỗi khách sạn có một thị trường, một nguồn lực và một bài toán riêng. Giải pháp của chúng tôi bắt đầu từ sự thấu hiểu thực tế đó.”':
    '“Every hotel has its own market, resources, and unique challenges. Our solutions begin with understanding that reality.”',
  'Điều Lifrooms hướng tới': 'What Lifrooms Strives For',
  'Tầm nhìn': 'Vision',
  'Trở thành đối tác vận hành được tin tưởng bởi khách sạn vừa và nhỏ trên khắp Việt Nam, nơi chủ đầu tư có thể tập trung vào việc phát triển kinh doanh, thay vì bị cuốn vào từng việc vận hành hàng ngày.':
    'To become the trusted operations partner for small and medium-sized hotels across Vietnam, empowering owners to focus on growing their business rather than getting caught up in day-to-day tasks.',
  'Sứ mệnh': 'Mission',
  'Giúp khách sạn 10–100 phòng tại Việt Nam vận hành như một hệ thống chuyên nghiệp, không phụ thuộc vào một người, không phụ thuộc vào may rủi thị trường.':
    'To help 10–100 room hotels in Vietnam operate as a professional system — independent of any single individual and resilient against market uncertainty.',
  'GIÁ TRỊ CỐT LÕI': 'CORE VALUES',
  'Những nguyên tắc chúng tôi theo đuổi': 'The Principles We Stand By',
  'Bắt đầu không có rào cản chi phí': 'Zero Cost Barrier to Start',
  'Phân hệ lễ tân và vận hành được cung cấp miễn phí; khách sạn chỉ trả phí cho phần thực sự cần.':
    'Core front-desk and operations modules are provided free of charge; hotels only pay for advanced modules they truly need.',
  'Xây dựng theo nghiệp vụ Việt Nam': 'Built for Vietnamese Hospitality Workflows',
  'Hóa đơn điện tử, kết nối MISA, kênh nhắn tin phổ biến với khách Việt (Zalo, Facebook Messenger).':
    'E-invoicing, MISA accounting integration, and messaging channels popular with Vietnamese guests (Zalo, Facebook Messenger).',
  'Dữ liệu thuộc về khách sạn': 'Your Data Belongs to Your Hotel',
  'Cam kết về quyền sở hữu dữ liệu, khả năng xuất báo cáo linh hoạt và lưu trữ bảo mật tiêu chuẩn cao.':
    'Full commitment to data ownership, flexible report exports, and enterprise-grade security storage.',
  'Minh bạch về tính năng và chi phí': 'Transparent Features & Pricing',
  'Chỉ giới thiệu những tính năng đã hoạt động thực tế; công khai bảng giá minh bạch, không phí ẩn.':
    'We only showcase production-ready features and publish transparent pricing with zero hidden fees.',
  '— PHỐI HỢP TOÀN DIỆN': '— COMPREHENSIVE COLLABORATION',
  'Đội ngũ đồng hành cùng khách sạn': 'The Team Standing Behind Your Hotel',
  'Bellhop được phát triển và vận hành bởi các bộ phận chuyên trách, phối hợp cùng khách sạn từ khi bắt đầu sử dụng đến vận hành hằng ngày.':
    'Bellhop is developed and operated by specialized teams working alongside your property from onboarding to daily operations.',
  'Nghiên cứu nghiệp vụ lưu trú, thiết kế tính năng dựa trên phản hồi từ khách sạn.':
    'Researches hospitality workflows and designs features based on direct hotel feedback.',
  'Triển khai': 'Implementation',
  'Hỗ trợ cài đặt, chuyển dữ liệu và đào tạo nhân sự khách sạn.':
    'Assists with setup, data migration, and hotel staff training.',
  'Hỗ trợ trực tiếp & từ xa': 'On-site & remote support',
  'Khách sạn của bạn': 'Your Hotel',
  'Đầu mối chuyên trách': 'Dedicated Account Lead',
  'Kỹ thuật': 'Engineering',
  'Phát triển, vận hành hệ thống, bảo mật và kết nối với đối tác (OTA, Kovena, MISA).':
    'Develops and operates the platform, security, and partner integrations (OTAs, Kovena, MISA).',
  'Tiếp nhận và xử lý yêu cầu qua Zalo, hotline, email.':
    'Receives and resolves support requests via Zalo, hotline, and email.',
  '[giờ hỗ trợ: 8:00 – 22:00]': '[Support hours: 8:00 – 22:00]',
  'Vận hành khách sạn thông minh hơn cùng Bellhop': 'Operate Your Hotel Smarter with Bellhop',
  'Đăng ký dùng thử miễn phí ngay hôm nay hoặc trao đổi cùng đội ngũ chuyên gia Lifrooms để nhận tư vấn mô hình vận hành phù hợp nhất.':
    'Sign up for a free trial today or speak with Lifrooms experts for a tailored operational consultation.',
  'Đang quản lý bằng': 'Currently managed with',
  'Chọn cách quản lý hiện tại': 'Select current management method',
  'Sổ tay/Excel': 'Notebook / Excel',
  'Phần mềm khác': 'Other software',
  'Tên phần mềm đang dùng': 'Current software name',
  'Chính sách xử lý dữ liệu cá nhân': 'Personal Data Processing Policy',

  // Pricing Page & Pricing FAQ
  'BẢNG BÁO GIÁ GIẢI PHÁP KHÁCH SẠN BELLHOP': 'BELLHOP HOSPITALITY SOLUTION PRICING',
  'Chi phí minh bạch, linh hoạt theo mô hình lưu trú':
    'Transparent, flexible pricing tailored to your property',
  'Khởi đầu hoàn toàn miễn phí cho vận hành lễ tân cơ bản; nâng cấp kết nối OTA, quản trị đa kênh và tích hợp tài chính khi cơ sở sẵn sàng bứt phá doanh thu.':
    'Start 100% free for core front-desk operations; upgrade to OTA sync, omnichannel management, and accounting integration as your property scales.',
  'Thanh toán theo năm': 'Annual Billing',
  'Tiết kiệm 20%': 'Save 20%',
  'Thanh toán theo tháng': 'Monthly Billing',
  'Dùng thử & Cơ sở nhỏ': 'Starter & Small Properties',
  'Dành cho homestay, hostel, nhà nghỉ nhỏ quản lý cơ bản tại quầy.':
    'For homestays, hostels, and small inns managing essential front-desk operations.',
  '/ tháng': '/ month',
  'Miễn phí trọn đời': 'Free forever',
  'Không giới hạn người dùng': 'Unlimited users',
  'Sơ đồ phòng trực quan thời gian thực': 'Real-time visual room rack',
  'Check-in, Check-out, đặt cọc': 'Check-in, check-out & deposits',
  'Bàn giao ca & thu chi tiền mặt': 'Shift handover & cashbook',
  'Không giới hạn': 'Unlimited',
  'tài khoản nhân viên': 'staff accounts',
  'Mobile App quản lý từ xa': 'Mobile App for remote management',
  'Hỗ trợ tài liệu & video hướng dẫn': 'Documentation & video guides',
  'Dùng miễn phí ngay': 'Start Free Now',
  '1–2 sao & Nghỉ giờ': '1–2 Star & Hourly Stays',
  'Cơ bản': 'Standard',
  'Vận hành khách sạn chuyên nghiệp, buồng phòng, minibar và khóa từ.':
    'Professional hotel operations with housekeeping, minibar, and keycard integration.',
  '/ phòng / tháng': '/ room / month',
  'Tiết kiệm 20% khi đóng cả năm': 'Save 20% with annual billing',
  'Thanh toán linh hoạt theo tháng': 'Flexible month-to-month billing',
  'Tối thiểu 10 phòng / cơ sở': 'Minimum 10 rooms / property',
  'Toàn bộ tính năng gói Miễn Phí': 'Everything in Free',
  'Quản lý buồng phòng, dọn phòng': 'Housekeeping & room cleaning management',
  'Kho hàng hóa, F&B, minibar tại phòng': 'Inventory, F&B & in-room minibar',
  'Chính sách giá giờ, đêm, ngày, tuần': 'Hourly, overnight, daily & weekly rate rules',
  'Tích hợp khóa thẻ từ ngoại vi': 'Peripheral keycard lock integration',
  'Báo cáo doanh thu & ca trực chuyên sâu': 'In-depth revenue & shift reports',
  'Hỗ trợ Hotline & Zalo 24/7': '24/7 Hotline & Zalo support',
  'Đăng ký gói Cơ Bản': 'Choose Standard',
  'Phổ biến nhất · Bán phòng OTA': 'Most Popular · OTA Distribution',
  '2–3 sao & Đa kênh': '2–3 Star & Omnichannel',
  'Tự động hóa bán phòng OTA, đồng bộ 2 chiều và chống overbooking 100%.':
    'Automate OTA distribution with real-time 2-way sync and 100% overbooking protection.',
  'Toàn bộ tính năng gói Cơ Bản': 'Everything in Standard',
  'Quản lý kênh OTA (Bellhop CMS)': 'OTA Channel Manager (Bellhop CMS)',
  'Kết nối 50+ OTA: Booking, Agoda, Traveloka...': 'Connect 50+ OTAs: Booking, Agoda, Traveloka...',
  'Đồng bộ 2 chiều tự động trong 2s': 'Automated 2-way sync in 2 seconds',
  'Chống Overbooking (trùng phòng) 100%': '100% Overbooking protection',
  'Quy tắc định giá linh động theo mùa': 'Seasonal dynamic pricing rules',
  'Chuyên viên đồng hành kết nối OTA': 'Dedicated OTA onboarding specialist',
  'Dùng thử 7 ngày miễn phí': 'Start 7-Day Free Trial',
  '3–5 sao & Chuỗi': '3–5 Star & Hotel Chains',
  'Cao cấp': 'Enterprise',
  'Giải pháp all-in-one toàn diện: Booking Engine, Payment, Finance & AI.':
    'Complete all-in-one suite: Booking Engine, Payment, Finance & AI Concierge.',
  'Toàn bộ tính năng gói Nâng Cao': 'Everything in Advanced',
  'Booking Engine website & Fanpage': 'Website & Fanpage Booking Engine',
  'Cổng thanh toán online (Bellhop Payment)': 'Online payment gateway (Bellhop Payment)',
  'Đồng bộ kế toán MISA (Bellhop Finance)': 'MISA accounting sync (Bellhop Finance)',
  'Trợ lý AI Concierge phản hồi 24/7': '24/7 AI Concierge guest assistant',
  'Quản trị chuỗi nhiều chi nhánh': 'Multi-property chain management',
  'Đào tạo trực tiếp & SLA cam kết': 'On-site training & guaranteed SLA',
  'Nhận tư vấn giải pháp': 'Request Solution Consultation',
  'CÔNG CỤ TÍNH PHÍ THỰC TẾ': 'INTERACTIVE COST CALCULATOR',
  'Dự toán chi phí theo quy mô khách sạn của bạn':
    'Estimate costs based on your property size',
  'Kéo chọn số lượng phòng và gói giải pháp phù hợp để nhận ngay bảng dự toán chi phí chi tiết.':
    'Slide to select your room count and preferred plan for an instant cost breakdown.',
  'Quy mô số phòng của khách sạn:': 'Number of rooms at your property:',
  '10 phòng (tối thiểu)': '10 rooms (minimum)',
  '50 phòng': '50 rooms',
  '100 phòng': '100 rooms',
  '150+ phòng': '150+ rooms',
  'Chọn gói tính năng:': 'Select feature tier:',
  'Vận hành nội bộ': 'Internal operations',
  'Nâng cao ★': 'Advanced ★',
  'Bán phòng OTA': 'OTA distribution',
  'Toàn diện All-in-one': 'All-in-one suite',
  'Thời hạn thanh toán:': 'Billing cycle:',
  '1 năm (12 tháng)': '1 year (12 months)',
  'Giảm 20%': '20% Off',
  '2 năm (24 tháng)': '2 years (24 months)',
  'Tặng thêm 3 tháng': '+3 Months Free',
  'Theo tháng': 'Monthly',
  'Linh hoạt': 'Flexible',
  'Dự toán chi phí Bellhop': 'Bellhop Cost Estimate',
  'Quy mô áp dụng:': 'Property scale:',
  'Gói giải pháp:': 'Selected plan:',
  'Đơn giá mỗi phòng:': 'Rate per room:',
  'Chu kỳ thanh toán:': 'Billing period:',
  'Tổng thanh toán:': 'Total amount:',
  'Đăng ký tư vấn theo cấu hình này →': 'Request consultation for this quote →',
  'Cam kết không phát sinh bất kỳ khoản phí ẩn nào': 'Guaranteed zero hidden fees',
  'BẢNG SO SÁNH CHI TIẾT TÍNH NĂNG': 'DETAILED FEATURE COMPARISON',
  'Chi tiết tính năng giữa các gói giải pháp': 'Compare features across all plans',
  'Xem đối chiếu đầy đủ các nhóm nghiệp vụ để chọn chính xác gói phù hợp nhất với nhu cầu khách sạn.':
    'Review every operational module side-by-side to choose the best fit for your property.',
  'Tính năng & Nghiệp vụ': 'Features & Modules',
  '1. Quản lý Lễ tân & Vận hành (PMS)': '1. Front Desk & Operations (PMS)',
  '2. Kênh bán phòng & Phân phối (Channel Manager)': '2. OTA Distribution (Channel Manager)',
  '3. Đặt phòng trực tiếp & Trải nghiệm khách': '3. Direct Booking & Guest Experience',
  '4. Thanh toán & Kế toán': '4. Payments & Accounting',
  '5. Báo cáo & Quản trị chuỗi': '5. Reporting & Chain Management',
  '6. Tài khoản & Dịch vụ hỗ trợ': '6. Accounts & Support Services',
  'Tùy chọn': 'Add-on',
  'Chi tiết': 'Detailed',
  'Chuyên sâu': 'Advanced',
  'Hợp nhất': 'Consolidated',
  'FAQ BẢNG GIÁ': 'PRICING FAQ',
  'Câu hỏi thường gặp về Bảng giá': 'Frequently Asked Questions About Pricing',
  'Cần tư vấn gói cước phù hợp?': 'Need help choosing the right plan?',
  'Chuyên viên tư vấn Bellhop sẽ tính toán phương án chi phí tối ưu nhất cho quy mô cơ sở của bạn.':
    'Bellhop specialists will calculate the most cost-effective package for your property scale.',
  'Nhận báo giá': 'Get a Quote',
  'Nhận báo giá & Tư vấn gói cước phù hợp nhất': 'Get a Quote & Tailored Plan Consultation',
  'Đăng ký dùng thử miễn phí ngay hôm nay hoặc để lại thông tin để chuyên viên Bellhop tính toán phương án chi phí tối ưu cho cơ sở của bạn.':
    'Start your free trial today or leave your details so a Bellhop specialist can prepare an optimal cost quote for your property.',
};

// Batched async translation queue so an entire page translates in 1 request
const pendingStrings = new Set();
const inFlightStrings = new Set();
let batchTimer = null;
let notifyScheduled = false;

function scheduleNotify() {
  if (notifyScheduled) return;
  notifyScheduled = true;
  setTimeout(() => {
    notifyScheduled = false;
    listeners.forEach((fn) => {
      try {
        fn(currentLang);
      } catch {}
    });
  }, 60);
}

function flushBatchQueue() {
  batchTimer = null;
  if (pendingStrings.size === 0) return;

  const batch = Array.from(pendingStrings).slice(0, 35);
  batch.forEach((s) => {
    pendingStrings.delete(s);
    inFlightStrings.add(s);
  });

  if (pendingStrings.size > 0) {
    batchTimer = setTimeout(flushBatchQueue, 40);
  }

  const joined = batch.join('\n');
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=' +
    encodeURIComponent(joined);

  fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const fullTranslated = data[0].map((part) => (Array.isArray(part) ? part[0] : '')).join('');
        const lines = fullTranslated.split('\n');
        if (lines.length === batch.length) {
          batch.forEach((orig, idx) => {
            const tr = (lines[idx] || '').trim();
            if (tr) dynamicCache[orig] = tr;
          });
          saveCache();
          if (currentLang === 'en') scheduleNotify();
        } else if (batch.length === 1 && fullTranslated.trim()) {
          dynamicCache[batch[0]] = fullTranslated.trim();
          saveCache();
          if (currentLang === 'en') scheduleNotify();
        }
      }
    })
    .catch(() => {})
    .finally(() => {
      batch.forEach((s) => inFlightStrings.delete(s));
    });
}

function queueAsyncTranslation(viText) {
  const norm = viText.replace(/\s+/g, ' ').trim();
  if (!norm || dynamicCache[norm] || pendingStrings.has(norm) || inFlightStrings.has(norm)) return;
  pendingStrings.add(norm);
  if (!batchTimer) {
    batchTimer = setTimeout(flushBatchQueue, 25);
  }
}

const VIETNAMESE_CHAR_RE = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

export function translateText(raw, lang = currentLang) {
  if (lang !== 'en' || typeof raw !== 'string') return raw;
  const trimmed = raw.trim();
  if (!trimmed) return raw;

  const leadMatch = raw.match(/^\s*/);
  const trailMatch = raw.match(/\s*$/);
  const lead = leadMatch ? leadMatch[0] : '';
  const trail = trailMatch ? trailMatch[0] : '';
  const norm = trimmed.replace(/\s+/g, ' ');

  if (EXACT_DICT[raw]) return EXACT_DICT[raw];
  if (EXACT_DICT[trimmed]) return lead + EXACT_DICT[trimmed] + trail;
  if (EXACT_DICT[norm]) return lead + EXACT_DICT[norm] + trail;
  if (dynamicCache[norm]) return lead + dynamicCache[norm] + trail;

  // Pattern rules for dates, read times, currencies, etc.
  let m;
  if ((m = norm.match(/^(\d+)\s+Tháng\s+(\d+),\s*(\d{4})$/i))) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mIdx = Math.max(0, Math.min(11, parseInt(m[2], 10) - 1));
    return `${lead}${months[mIdx]} ${m[1]}, ${m[3]}${trail}`;
  }
  if ((m = norm.match(/^(\d+)\s*phút đọc$/i))) {
    return `${lead}${m[1]} min read${trail}`;
  }
  if ((m = norm.match(/^Tác giả:\s*(.+)$/i))) {
    return `${lead}Author: ${m[1]}${trail}`;
  }
  if (norm.includes('triệu đồng') || norm.includes('tỷ đồng')) {
    return (
      lead +
      norm
        .replace(/tỷ đồng/g, 'billion VND')
        .replace(/triệu đồng/g, 'million VND')
        .replace(/khi chuyển/g, 'when shifting')
        .replace(/sang kênh trực tiếp/g, 'to direct channels')
        .replace(/mỗi năm/g, 'per year') +
      trail
    );
  }

  // Queue batched translation for any remaining Vietnamese text
  if (VIETNAMESE_CHAR_RE.test(norm)) {
    queueAsyncTranslation(norm);
  }

  return raw;
}

export function translateReactNode(node, lang = currentLang) {
  if (lang !== 'en' || node == null || typeof node === 'boolean' || typeof node === 'number') {
    return node;
  }
  if (typeof node === 'string') {
    return translateText(node, lang);
  }
  if (Array.isArray(node)) {
    return node.map((child) => translateReactNode(child, lang));
  }
  if (React.isValidElement(node)) {
    const props = node.props || {};
    let newProps = null;

    for (const attr of ['placeholder', 'alt', 'title', 'aria-label']) {
      if (typeof props[attr] === 'string' && props[attr]) {
        const tr = translateText(props[attr], lang);
        if (tr !== props[attr]) {
          if (!newProps) newProps = { ...props };
          newProps[attr] = tr;
        }
      }
    }

    if (props.children !== undefined) {
      const newChildren = translateReactNode(props.children, lang);
      if (newChildren !== props.children) {
        if (!newProps) newProps = { ...props };
        newProps.children = newChildren;
      }
    }

    return newProps ? React.cloneElement(node, newProps) : node;
  }
  return node;
}
