import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

export default class AboutPage extends DCLogic {
  componentDidMount() {
    document.title = 'Về Bellhop & Lifrooms – Nền tảng quản lý khách sạn từ kinh nghiệm thực tế';
  }

  renderVals() {
    const marks = this.props.reviewMarks ?? true;
    return {
      markCls: marks ? '' : 'no-marks',
      marks,
    };
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <div className={`bh ${v.markCls ?? ''}`}>
        <Header active="about" startOpen={false} />

        {/* 1. HERO SECTION */}
        <section className="about-hero-sec">
          <div className="wrap">
            {/* HERO CARD */}
            <div className="about-hero-card">
              <div
                className="hero-bg-img"
                style={{
                  backgroundImage: "url('/assets/184ed4c8d5b0f118849e24490114f4af.jpg')",
                }}
              ></div>
              <div className="hero-bg-overlay"></div>

              <div className="hero-card-body">
                <nav className="hero-breadcrumb" aria-label="Breadcrumb">
                  <a href="/">Trang chủ</a>
                  <span className="sep">/</span>
                  <span>Về Bellhop &amp; Lifrooms</span>
                </nav>

                <span className="hero-eyebrow">— VỀ BELLHOP &amp; LIFROOMS</span>
                <h1 className="hero-title">
                  Phần mềm quản lý khách sạn được xây dựng từ kinh nghiệm vận hành thực tế
                </h1>
                <p className="hero-desc">
                  Bellhop được phát triển bởi đội ngũ Lifrooms, đơn vị tư vấn và vận hành cho các
                  khách sạn vừa và nhỏ tại Việt Nam. Những yêu cầu từ quầy lễ tân, bộ phận buồng
                  phòng và kế toán là cơ sở để thiết kế từng tính năng của Bellhop.
                </p>

                <div className="hero-btns">
                  <a className="hero-btn-blue" href="#form">
                    Dùng thử miễn phí <span className="arr" style={{ marginLeft: '6px' }}>→</span>
                  </a>
                  <a className="hero-btn-glass" href="#hop-tac">
                    Tìm hiểu giải pháp Lifrooms
                  </a>
                </div>
              </div>
            </div>

            {/* FLOATING STATS BAR */}
            <div className="hero-stats-bar">
              <div className="stat-col">
                <div className="stat-num">150+</div>
                <div className="stat-desc">Khách sạn trong bộ dữ liệu phân tích</div>
              </div>
              <div className="stat-col">
                <div className="stat-num">13+</div>
                <div className="stat-desc">Thị trường đang hoạt động</div>
              </div>
              <div className="stat-col">
                <div className="stat-num">95%+</div>
                <div className="stat-desc">Khách hàng tiếp tục hợp tác</div>
              </div>
              <div className="stat-col">
                <div className="stat-num">20%+</div>
                <div className="stat-desc">Tăng trưởng OCC sau 3 tháng</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CÂU CHUYỆN CỦA BELLHOP */}
        <section className="story-sec">
          <div className="wrap">
            <div className="story-grid">
              <div className="story-media-box">
                <img
                  src="/assets/974345ba46df058cd714c647e9882095.jpg"
                  alt="Đội ngũ Lifrooms & Bellhop"
                />
              </div>
              <div className="story-content">
                <span className="story-eyebrow">— CÂU CHUYỆN THƯƠNG HIỆU</span>
                <h2 className="story-title">Câu chuyện của Bellhop</h2>
                <p className="story-text">
                  Trong khách sạn, bellhop là người hỗ trợ hành lý, dẫn khách lên phòng và giúp
                  hành trình lưu trú bắt đầu thuận lợi hơn. Từ ý nghĩa đó, Bellhop ra đời với mong
                  muốn trở thành người đồng hành của các cơ sở lưu trú, giúp công việc vận hành trở
                  nên đơn giản và nhẹ nhàng hơn.
                </p>
                <p className="story-text">
                  Từ đặt phòng, quản lý buồng phòng đến cập nhật OTA và theo dõi doanh thu, nhiều
                  công việc vẫn đang được xử lý trên những công cụ riêng lẻ, khiến việc vận hành mất
                  thời gian và dễ xảy ra sai sót.
                </p>
                <p className="story-text">
                  Bellhop kết nối các nghiệp vụ trên cùng một hệ thống, giúp thông tin liền mạch,
                  công việc phối hợp dễ dàng và hoạt động quản lý trở nên đơn giản hơn. Với các tính
                  năng lễ tân và vận hành cốt lõi miễn phí, Bellhop giúp khách sạn bắt đầu chuyển
                  đổi mà không phải lo thêm chi phí ban đầu.
                </p>
                <p className="story-text">
                  Chúng tôi tin rằng công nghệ tốt không nhất thiết phải xuất hiện ở trung tâm. Đôi
                  khi, giá trị lớn nhất là giúp mọi việc phía sau vận hành trơn tru, để người làm
                  khách sạn có thêm thời gian chăm sóc khách hàng.
                </p>
                <div className="story-quote">
                  <p>
                    “Mỗi khách sạn có một thị trường, một nguồn lực và một bài toán riêng. Giải pháp
                    của chúng tôi bắt đầu từ sự thấu hiểu thực tế đó.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BELLHOP VÀ LIFROOMS (Tạm thời ẩn theo yêu cầu) */}
        <section className="comp-pair-sec" id="hop-tac" style={{ display: 'none' }}>
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                MÔ HÌNH KẾT NỐI TOÀN DIỆN
              </span>
              <h2 className="h2" style={{ fontWeight: 800, textAlign: 'center' }}>
                Bellhop và Lifrooms
              </h2>
              <p className="lead" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
                Bellhop là nền tảng phần mềm do Lifrooms phát triển và vận hành.
              </p>
            </div>

            <div className="comp-pair-grid">
              {/* CỘT 1: BELLHOP */}
              <div className="pair-card bellhop">
                <span className="pair-badge">BELLHOP – NỀN TẢNG PHẦN MỀM</span>
                <h3 className="pair-title">Hệ sinh thái phần mềm quản lý khách sạn</h3>
                <p className="pair-desc">
                  Phần mềm quản lý vận hành, phân phối, chăm sóc khách hàng và kế toán cho cơ sở
                  lưu trú. Khách sạn tự sử dụng.
                </p>

                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#122745', marginTop: '4px' }}>
                  Sản phẩm tích hợp:
                </div>
                <div className="pair-chips">
                  <span className="pair-chip">Bellhop PMS</span>
                  <span className="pair-chip">Booking Engine</span>
                  <span className="pair-chip">Channel Manager (CMS)</span>
                  <span className="pair-chip">Bellhop Website</span>
                  <span className="pair-chip">Bellhop Message</span>
                  <span className="pair-chip">AI Concierge</span>
                  <span className="pair-chip">Bellhop Payment</span>
                  <span className="pair-chip">Bellhop Finance</span>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <a className="btn btn-primary btn-block" href="#form">
                    Dùng thử Bellhop →
                  </a>
                </div>
              </div>

              {/* CỘT 2: LIFROOMS */}
              <div className="pair-card lifrooms">
                <span className="pair-badge">LIFROOMS – DỊCH VỤ TƯ VẤN &amp; VẬN HÀNH</span>
                <h3 className="pair-title">Đội ngũ chuyên gia đồng hành cùng khách sạn</h3>
                <p className="pair-desc">
                  Đội ngũ chuyên môn trực tiếp thực hiện các phần việc cho khách sạn: tư vấn set up,
                  quản lý và tối ưu OTA, marketing, sales, hành chính &amp; kế toán.
                </p>

                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#122745', marginTop: '4px' }}>
                  Dịch vụ chuyên sâu:
                </div>
                <div className="pair-chips">
                  <span className="pair-chip" style={{ background: '#f8fafc' }}>
                    Tư vấn Setup khai trương
                  </span>
                  <span className="pair-chip" style={{ background: '#f8fafc' }}>
                    Quản trị Doanh thu (Revenue)
                  </span>
                  <span className="pair-chip" style={{ background: '#f8fafc' }}>
                    Vận hành &amp; Tối ưu OTA
                  </span>
                  <span className="pair-chip" style={{ background: '#f8fafc' }}>
                    Marketing &amp; Bán phòng
                  </span>
                  <span className="pair-chip" style={{ background: '#f8fafc' }}>
                    Kế toán &amp; Hành chính
                  </span>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <a
                    className="btn btn-outline btn-block"
                    href="https://lifrooms.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tìm hiểu dịch vụ Lifrooms ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="pair-bottom-notice">
              <span>💡</span>
              <span>
                Khách sạn có thể dùng Bellhop độc lập, hoặc kết hợp với dịch vụ Lifrooms khi cần
                thêm nguồn lực chuyên môn.
              </span>
            </div>
          </div>
        </section>

        {/* 4. TẦM NHÌN VÀ SỨ MỆNH */}
        <section className="vision-sec">
          <div className="wrap">
            <div className="vision-grid">
              <div className="vision-cards">
                <h2
                  className="story-title"
                  style={{ fontSize: '32px', fontWeight: 800, color: '#122745', margin: '0 0 12px' }}
                >
                  Điều Lifrooms hướng tới
                </h2>

                {/* Card 1: Tầm nhìn */}
                <div className="vm-card">
                  <div className="vm-icon vm-icon-dark">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3>Tầm nhìn</h3>
                    <p>
                      Trở thành đối tác vận hành được tin tưởng bởi khách sạn vừa và nhỏ trên khắp
                      Việt Nam, nơi chủ đầu tư có thể tập trung vào việc phát triển kinh doanh, thay
                      vì bị cuốn vào từng việc vận hành hàng ngày.
                    </p>
                  </div>
                </div>

                {/* Card 2: Sứ mệnh */}
                <div className="vm-card">
                  <div className="vm-icon vm-icon-blue">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3>Sứ mệnh</h3>
                    <p>
                      Giúp khách sạn 10–100 phòng tại Việt Nam vận hành như một hệ thống chuyên
                      nghiệp, không phụ thuộc vào một người, không phụ thuộc vào may rủi thị trường.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Card */}
              <div className="vision-road-frame">
                <div className="vision-road-inner">
                  <img
                    src="/assets/22f6499965f3db2b47bc485b36dc9d03.jpg"
                    alt="Tầm nhìn và sứ mệnh Lifrooms"
                    className="vision-road-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. NHỮNG NGUYÊN TẮC CHÚNG TÔI THEO ĐUỔI */}
        <section className="principles-sec">
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                GIÁ TRỊ CỐT LÕI
              </span>
              <h2 className="h2" style={{ fontWeight: 800, textAlign: 'center' }}>
                Những nguyên tắc chúng tôi theo đuổi
              </h2>
            </div>

            <div className="principles-grid">
              {/* NGUYÊN TẮC 1 */}
              <div className="principle-card">
                <div className="principle-icon-wrap">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                    <circle cx="16" cy="15" r="1"></circle>
                  </svg>
                </div>
                <h3 className="principle-title">Bắt đầu không có rào cản chi phí</h3>
                <p className="principle-desc">
                  Phân hệ lễ tân và vận hành được cung cấp miễn phí; khách sạn chỉ trả phí cho phần
                  thực sự cần.
                </p>
              </div>

              {/* NGUYÊN TẮC 2 */}
              <div className="principle-card">
                <div className="principle-icon-wrap">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                </div>
                <h3 className="principle-title">Xây dựng theo nghiệp vụ Việt Nam</h3>
                <p className="principle-desc">
                  Hóa đơn điện tử, kết nối MISA, kênh nhắn tin phổ biến với khách Việt (Zalo,
                  Facebook Messenger).
                </p>
              </div>

              {/* NGUYÊN TẮC 3 */}
              <div className="principle-card">
                <div className="principle-icon-wrap">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="principle-title">Dữ liệu thuộc về khách sạn</h3>
                <p className="principle-desc">
                  Cam kết về quyền sở hữu dữ liệu, khả năng xuất báo cáo linh hoạt và lưu trữ bảo
                  mật tiêu chuẩn cao.
                </p>
              </div>

              {/* NGUYÊN TẮC 4 */}
              <div className="principle-card">
                <div className="principle-icon-wrap">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 className="principle-title">Minh bạch về tính năng và chi phí</h3>
                <p className="principle-desc">
                  Chỉ giới thiệu những tính năng đã hoạt động thực tế; công khai bảng giá minh bạch,
                  không phí ẩn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ĐỘI NGŨ ĐỒNG HÀNH CÙNG KHÁCH SẠN */}
        <section className="team-sec">
          <div className="wrap">
            <div className="team-head">
              <span className="team-eyebrow">— PHỐI HỢP TOÀN DIỆN</span>
              <h2 className="team-title">Đội ngũ đồng hành cùng khách sạn</h2>
              <p className="team-desc">
                Bellhop được phát triển và vận hành bởi các bộ phận chuyên trách, phối hợp cùng
                khách sạn từ khi bắt đầu sử dụng đến vận hành hằng ngày.
              </p>
            </div>

            <div className="team-diagram-container">
              {/* CỘT TRÁI: SẢN PHẨM & TRIỂN KHAI */}
              <div className="team-col">
                <div className="team-card">
                  <div className="team-card-icon prod">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                  </div>
                  <div className="team-card-content">
                    <h3>Sản phẩm</h3>
                    <p>
                      Nghiên cứu nghiệp vụ lưu trú, thiết kế tính năng dựa trên phản hồi từ khách
                      sạn.
                    </p>
                  </div>
                </div>

                <div className="team-card">
                  <div className="team-card-icon impl">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                    </svg>
                  </div>
                  <div className="team-card-content">
                    <h3>Triển khai</h3>
                    <p>
                      Hỗ trợ cài đặt, chuyển dữ liệu và đào tạo nhân sự khách sạn.{' '}
                      <i className="tbc">Hỗ trợ trực tiếp &amp; từ xa</i>
                    </p>
                  </div>
                </div>
              </div>

              {/* TÂM SƠ ĐỒ: KHÁCH SẠN CỦA BẠN & ĐẦU MỐI PHỤ TRÁCH */}
              <div className="team-center-hub">
                <div className="hub-orbit"></div>
                <div className="hub-core">
                  <svg
                    className="hub-core-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21h18"></path>
                    <path d="M19 21v-4"></path>
                    <path d="M19 11V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
                    <path d="M9 7h1"></path>
                    <path d="M9 11h1"></path>
                    <path d="M9 15h1"></path>
                    <path d="M14 7h1"></path>
                    <path d="M14 11h1"></path>
                    <path d="M14 15h1"></path>
                  </svg>
                  <span className="hub-core-text">Khách sạn của bạn</span>
                </div>
                <div className="hub-badge">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Đầu mối chuyên trách</span>
                </div>
              </div>

              {/* CỘT PHẢI: KỸ THUẬT & CHĂM SÓC KHÁCH HÀNG */}
              <div className="team-col">
                <div className="team-card">
                  <div className="team-card-icon tech">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <div className="team-card-content">
                    <h3>Kỹ thuật</h3>
                    <p>
                      Phát triển, vận hành hệ thống, bảo mật và kết nối với đối tác (OTA, Kovena,
                      MISA).
                    </p>
                  </div>
                </div>

                <div className="team-card">
                  <div className="team-card-icon cs">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                  </div>
                  <div className="team-card-content">
                    <h3>Chăm sóc khách hàng</h3>
                    <p>
                      Tiếp nhận và xử lý yêu cầu qua Zalo, hotline, email.{' '}
                      <i className="tbc">[giờ hỗ trợ: 8:00 – 22:00]</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FORM CTA */}
        <section className="sec" id="form">
          <div className="wrap">
            <LeadForm
              title="Vận hành khách sạn thông minh hơn cùng Bellhop"
              desc="Đăng ký dùng thử miễn phí ngay hôm nay hoặc trao đổi cùng đội ngũ chuyên gia Lifrooms để nhận tư vấn mô hình vận hành phù hợp nhất."
              product="about"
              source="/ve-bellhop"
              marks={v.marks}
            />
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    );
  }
}
