import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class NewsPage extends DCLogic {
  constructor(p) {
    super(p);
    this.state = {
      selectedCat: 'all',
    };
  }

  componentDidMount() {
    document.title = 'Tin tức & Kiến thức Quản trị Khách sạn – Lifrooms & Bellhop';
  }

  renderVals() {
    const marks = this.props.reviewMarks ?? true;
    const cat = this.state.selectedCat;

    const allArticles = [
      {
        id: 1,
        catKey: 'ota',
        cat: 'Kênh bán OTA',
        title: '7 Nguyên nhân hàng đầu gây Overbooking và giải pháp đồng bộ 2 chiều tự động',
        desc: 'Cách xử lý triệt để bài toán trùng phòng giữa Booking.com, Agoda và khách đặt tại quầy vào mùa cao điểm du lịch bằng hệ thống Channel Manager.',
        date: '24 Tháng 10, 2026',
        readTime: '5 phút đọc',
        author: 'Lifrooms OTA Team',
        image: '/assets/184ed4c8d5b0f118849e24490114f4af.jpg',
      },
      {
        id: 2,
        catKey: 'rev',
        cat: 'Quản lý Doanh thu',
        title: 'Bảng tính điểm hòa vốn (Break-even Point) cho khách sạn từ 15 đến 50 phòng',
        desc: 'Hướng dẫn chi tiết cách xác định chi phí cố định, chi phí biến đổi trên mỗi đêm phòng để xây dựng khung giá bán an toàn và sinh lời bền vững.',
        date: '22 Tháng 10, 2026',
        readTime: '7 phút đọc',
        author: 'Nguyễn Minh Tuấn (Lifrooms)',
        image: '/assets/1feca9cfcb63e1777de6b728389ffe5a.jpg',
      },
      {
        id: 3,
        catKey: 'ops',
        cat: 'Vận hành Lễ tân',
        title: 'Quy trình 8 bước bàn giao ca trực và đối soát quỹ tiền mặt lễ tân chuẩn chỉnh',
        desc: 'Loại bỏ sai sót thất thoát tiền phòng, kiểm soát các khoản đặt cọc và tiền dịch vụ F&B minibar chính xác, minh bạch giữa các ca làm việc.',
        date: '20 Tháng 10, 2026',
        readTime: '4 phút đọc',
        author: 'Bellhop Operations',
        image: '/assets/974345ba46df058cd714c647e9882095.jpg',
      },
      {
        id: 4,
        catKey: 'tech',
        cat: 'Công nghệ & AI',
        title: 'Tự động hóa chăm sóc khách với AI Concierge: Tăng gấp 3 lần tỷ lệ chốt phòng',
        desc: 'Kinh nghiệm thực chiến triển khai trợ lý AI tự động báo giá, tư vấn tiện ích và chốt đơn đặt phòng cho khách qua Zalo, Facebook Fanpage 24/7.',
        date: '18 Tháng 10, 2026',
        readTime: '6 phút đọc',
        author: 'Đội ngũ Công nghệ Bellhop',
        image: '/assets/f9b413eecd76fd2b46b3d6174eabbf3b.jpg',
      },
      {
        id: 5,
        catKey: 'ota',
        cat: 'Kênh bán OTA',
        title: 'Thuật toán xếp hạng OTA 2026: Cách đưa khách sạn lên Top hiển thị tự nhiên',
        desc: 'Bí quyết cải thiện điểm chất lượng nội dung (Content Score), tối ưu tỷ lệ chuyển đổi phòng và chiến lược phản hồi đánh giá Review từ khách du lịch.',
        date: '15 Tháng 10, 2026',
        readTime: '8 phút đọc',
        author: 'Lifrooms OTA Team',
        image: '/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg',
      },
      {
        id: 6,
        catKey: 'ops',
        cat: 'Vận hành Lễ tân',
        title: 'Checklist 15 tiêu chí buồng phòng sạch chuẩn trước giờ đón khách Check-in',
        desc: 'Bảng kiểm tra tiêu chuẩn buồng phòng dành riêng cho nhân viên Housekeeping giúp khách sạn đạt điểm đánh giá sạch sẽ tuyệt đối trên các nền tảng.',
        date: '12 Tháng 10, 2026',
        readTime: '5 phút đọc',
        author: 'Bellhop Operations',
        image: '/assets/e187e247863c141ccd5e7314ed8cff87.jpg',
      },
      {
        id: 7,
        catKey: 'rev',
        cat: 'Quản lý Doanh thu',
        title: 'Chiến lược bán phòng ngày lễ và mùa cao điểm: Đừng chốt giá quá sớm!',
        desc: 'Cách kiểm soát nhịp đặt phòng (Booking Pace), giữ phòng có chọn lọc và điều chỉnh thang giá từng giai đoạn để đạt mức doanh thu kỷ lục.',
        date: '10 Tháng 10, 2026',
        readTime: '6 phút đọc',
        author: 'Ban Cố vấn Lifrooms',
        image: '/assets/22f6499965f3db2b47bc485b36dc9d03.jpg',
      },
      {
        id: 8,
        catKey: 'tech',
        cat: 'Công nghệ & AI',
        title: 'Đồng bộ phần mềm khách sạn với kế toán MISA: Tiết kiệm 80% thời gian chốt sổ',
        desc: 'Quy trình kết nối tự động dữ liệu doanh thu, phiếu thu chi từ Bellhop PMS sang MISA SME và MISA AMIS Kế toán mà không cần nhập liệu tay.',
        date: '08 Tháng 10, 2026',
        readTime: '5 phút đọc',
        author: 'Bellhop Finance Team',
        image: '/assets/64926e3c4de0e78477dae7aae6277f1f.jpg',
      },
      {
        id: 9,
        catKey: 'ebook',
        cat: 'Mẫu biểu & Ebook',
        title: 'Tải bộ hợp đồng thuê phòng dài hạn và mẫu quy chế nội quy khách sạn 2026',
        desc: 'Trọn bộ văn bản pháp lý, mẫu thỏa thuận đặt cọc khách đoàn và cam kết lưu trú được cập nhật mới nhất theo quy định của pháp luật Việt Nam.',
        date: '05 Tháng 10, 2026',
        readTime: '3 phút đọc',
        author: 'Lifrooms Legal',
        image: '/assets/184ed4c8d5b0f118849e24490114f4af.jpg',
      },
    ];

    const filteredArticles = cat === 'all' ? allArticles : allArticles.filter((a) => a.catKey === cat);

    return {
      markCls: marks ? '' : 'no-marks',
      marks,
      showFeatured: cat === 'all' || cat === 'rev',
      articles: filteredArticles,
      catAllClass: cat === 'all' ? 'active' : '',
      catRevClass: cat === 'rev' ? 'active' : '',
      catOtaClass: cat === 'ota' ? 'active' : '',
      catOpsClass: cat === 'ops' ? 'active' : '',
      catTechClass: cat === 'tech' ? 'active' : '',
      catEbookClass: cat === 'ebook' ? 'active' : '',
      setCatAll: () => this.setState({ selectedCat: 'all' }),
      setCatRev: () => this.setState({ selectedCat: 'rev' }),
      setCatOta: () => this.setState({ selectedCat: 'ota' }),
      setCatOps: () => this.setState({ selectedCat: 'ops' }),
      setCatTech: () => this.setState({ selectedCat: 'tech' }),
      setCatEbook: () => this.setState({ selectedCat: 'ebook' }),
      handleNewsletter: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        alert('Cảm ơn bạn đã đăng ký nhận bản tin từ Lifrooms & Bellhop!');
      },
    };
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <div className={`bh t ${v.markCls ?? ''}`}>
        <Header active="news" startOpen={false} />

        <div className="wrap" style={{ paddingTop: '20px' }}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Trang chủ</a>
            <span>›</span>
            <b>Tin tức &amp; Blog</b>
          </nav>
        </div>

        {/* HERO HEADER */}
        <section className="news-hero">
          <div className="wrap">
            <div className="news-hero-head">
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                LIFROOMS &amp; BELLHOP · BLOG &amp; KIẾN THỨC CHUYÊN SÂU
              </span>
              <h1 className="h1" style={{ fontSize: '42px', lineHeight: '1.25' }}>
                Cẩm nang Vận hành &amp; Quản trị Doanh thu Khách sạn
              </h1>
              <p className="lead" style={{ maxWidth: '760px', margin: '0', fontSize: '16.5px' }}>
                Tổng hợp các bài viết chuyên sâu về chiến lược tối ưu giá phòng (Revenue Management), phân bổ kênh OTA, kỹ năng lễ tân và công nghệ lưu trú thực chiến từ chuyên gia Lifrooms.
              </p>
            </div>

            {/* CATEGORY FILTER BUTTONS */}
            <div className="news-cats">
              <button type="button" className={`news-cat-btn ${v.catAllClass ?? ''}`} onClick={v.setCatAll}>
                Tất cả bài viết
              </button>
              <button type="button" className={`news-cat-btn ${v.catRevClass ?? ''}`} onClick={v.setCatRev}>
                Quản lý Doanh thu
              </button>
              <button type="button" className={`news-cat-btn ${v.catOtaClass ?? ''}`} onClick={v.setCatOta}>
                Kênh bán phòng OTA
              </button>
              <button type="button" className={`news-cat-btn ${v.catOpsClass ?? ''}`} onClick={v.setCatOps}>
                Vận hành Lễ tân
              </button>
              <button type="button" className={`news-cat-btn ${v.catTechClass ?? ''}`} onClick={v.setCatTech}>
                Công nghệ &amp; AI
              </button>
              <button type="button" className={`news-cat-btn ${v.catEbookClass ?? ''}`} onClick={v.setCatEbook}>
                Mẫu biểu &amp; Ebook
              </button>
            </div>

            {/* FEATURED HERO POST */}
            {Boolean(v.showFeatured) && (
              <div className="featured-post-wrap">
                <article className="featured-post-card">
                  <div className="featured-media">
                    <img
                      src="/assets/63e0d2bfe1224291a4be1d6730facb48.jpg"
                      alt="Chiến lược tối ưu ADR và RevPAR cho khách sạn"
                    />
                    <span className="featured-badge">Tiêu điểm · Quản lý Doanh thu</span>
                  </div>
                  <div className="featured-body">
                    <div className="post-meta">
                      <span>26 Tháng 10, 2026</span>
                      <span className="dot-sep"></span>
                      <span>6 phút đọc</span>
                      <span className="dot-sep"></span>
                      <span style={{ color: '#1f7a84' }}>Revenue Management</span>
                    </div>
                    <h2 className="featured-title">
                      Chiến lược tối ưu ADR và RevPAR: Làm sao để khách sạn không rơi vào bẫy &quot;Kín phòng nhưng vẫn lỗ&quot;?
                    </h2>
                    <p className="featured-desc">
                      Phân tích bài toán quản trị doanh thu thực chiến cho khách sạn 2-4 sao. Cách điều chỉnh khung giá linh động theo ngày trong tuần, công suất phòng và cơ cấu kênh bán để tối đa hóa lợi nhuận ròng thay vì chỉ mải mê chạy theo công suất phòng ảo.
                    </p>
                    <div className="post-author-row">
                      <div className="author-avatar">LR</div>
                      <div>
                        <div className="author-name">Chuyên gia Doanh thu Lifrooms</div>
                        <div className="author-role">Ban Cố vấn Tăng trưởng Khách sạn</div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="news-grid-sec">
          <div className="wrap">
            <div className="news-grid">
              {(v.articles || []).map((item, $index) => (
                <article className="article-card" key={item.id || $index}>
                  <div className="article-thumb">
                    <img src={item.image} alt={item.title} />
                    <span className="article-cat-tag">{item.cat}</span>
                  </div>
                  <div className="article-content">
                    <div className="post-meta" style={{ fontSize: '12px' }}>
                      <span>{item.date}</span>
                      <span className="dot-sep"></span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="article-title">{item.title}</h3>
                    <p className="article-excerpt">{item.desc}</p>
                    <div className="article-footer">
                      <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500 }}>
                        Tác giả: {item.author}
                      </span>
                      <span className="article-readmore">Đọc tiếp →</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* NEWSLETTER BANNER */}
            <div className="newsletter-banner">
              <div className="newsletter-head">
                <h2>Nhận bản tin kiến thức khách sạn hàng tuần</h2>
                <p>
                  Cập nhật số liệu thị trường du lịch, bí quyết tối ưu kênh OTA và các biểu mẫu quản lý mới nhất trực tiếp vào hộp thư của bạn.
                </p>
              </div>
              <form className="newsletter-form" onSubmit={v.handleNewsletter}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Nhập địa chỉ email của bạn..."
                  required
                />
                <button type="submit" className="btn btn-teal btn-lg" style={{ whiteSpace: 'nowrap' }}>
                  Đăng ký ngay
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FREE RESOURCES & EBOOKS SECTION */}
        <section className="resources-sec" id="ebook">
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                TÀI NGUYÊN MIỄN PHÍ
              </span>
              <h2 className="h2" style={{ fontWeight: 800, textAlign: 'center' }}>
                Bộ biểu mẫu &amp; Ebook thực chiến dành cho chủ khách sạn
              </h2>
              <p className="lead" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
                Được biên soạn độc quyền bởi đội ngũ Lifrooms &amp; Bellhop để hỗ trợ các khách sạn vừa và nhỏ chuẩn hóa vận hành ngay hôm nay.
              </p>
            </div>

            <div className="resources-grid">
              <div className="resource-card">
                <span className="resource-badge">File Excel (.xlsx)</span>
                <h3 className="resource-title">Mẫu Bảng tính Điểm hòa vốn &amp; Lợi nhuận phòng</h3>
                <p className="resource-desc">
                  Công cụ tự động tính toán chi phí định phí, biến phí và giá bán tối thiểu cho từng hạng phòng để đảm bảo lợi nhuận ròng.
                </p>
                <a className="btn btn-outline btn-block resource-btn" href="/#cong-cu">
                  Tải biểu mẫu miễn phí
                </a>
              </div>

              <div className="resource-card">
                <span className="resource-badge">Ebook (.PDF)</span>
                <h3 className="resource-title">Cẩm nang Tối ưu Kênh bán OTA từ A–Z</h3>
                <p className="resource-desc">
                  Tài liệu 60 trang hướng dẫn thiết lập chiến lược hiển thị, xử lý Overbooking và bí quyết đàm phán hoa hồng với Booking.com, Agoda.
                </p>
                <a className="btn btn-outline btn-block resource-btn" href="/#cong-cu">
                  Tải Ebook ngay
                </a>
              </div>

              <div className="resource-card">
                <span className="resource-badge">Checklist (.PDF)</span>
                <h3 className="resource-title">Quy trình Bàn giao ca &amp; Kiểm phòng chuẩn 4★</h3>
                <p className="resource-desc">
                  Bảng kiểm tra 15 tiêu chí buồng phòng và biên bản đối soát tiền mặt lễ tân giúp loại bỏ 100% rủi ro thất thoát doanh thu.
                </p>
                <a className="btn btn-outline btn-block resource-btn" href="/#cong-cu">
                  Tải Checklist thực chiến
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}
