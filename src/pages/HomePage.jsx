import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class HomePage extends DCLogic {
  constructor(p) {
    super(p);
    this.state = {
      tab: 0, pick: 'ai',
      seg: { hotel: 0, home: 0, chain: 0 },
      calc: { b: 120, a: 1200000, r: 15, s: 20 },
      cat: 'all',
      f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', consent: false },
      prods: [], err: {}, sent: false
    };
  }
  renderVals() {
    const T = [
      { label: 'Đặt phòng mọi nguồn', url: 'app.bellhop.vn/dat-phong', src: '/assets/d8e97cd43f9f645eec6abba0f8eee195.png', alt: 'Màn hình Danh sách đặt phòng của Bellhop', cap: 'Booking từ website, OTA, điện thoại và khách vãng lai về chung một danh sách.' },
      { label: 'Phòng & giá', url: 'app.bellhop.vn/phong-gia', src: '/assets/de8ede5a8ea84f4225237b7fd9aebf2d.png', alt: 'Màn hình Cấu hình phòng và giá của Bellhop', cap: 'Khai báo hạng phòng, giá thường – dùng chung cho mọi kênh bán.' },
      { label: 'Buồng phòng', url: 'app.bellhop.vn/buong-phong', src: '/assets/d967b787263d4b619b118217c8635099.png', alt: 'Màn hình Buồng phòng của Bellhop', cap: 'Theo dõi thời gian thực tiến độ vệ sinh và phân công dọn phòng.' }
    ];
    const tab = this.state.tab;
    const tabs = T.map((t, i) => ({ label: t.label, cls: i === tab ? 'on' : '', pressed: i === tab ? 'true' : 'false', pick: () => this.setState({ tab: i }) }));
    const P = [
      { key: 'ai', title: 'Bellhop AI Concierge', isNew: true, desc: 'Trả lời câu hỏi thường gặp của khách, kể cả ngoài giờ, dựa trên cơ sở kiến thức của chính cơ sở bạn.' },
      { key: 'msg', title: 'Hộp thư chung Bellhop Message', isNew: false, desc: 'Gom tin nhắn từ các kênh về một nơi; nhiều nhân viên cùng xử lý, xem lại lịch sử trao đổi.' },
      { key: 'link', title: 'Link đặt phòng trong hội thoại', isNew: false, desc: 'Gửi đường dẫn đặt phòng cho khách ngay trong cuộc trò chuyện, khách tự chọn phòng và xác nhận.' }
    ];
    const pk = this.state.pick;
    const picks = P.map((k) => ({ title: k.title, desc: k.desc, isNew: k.isNew, cls: k.key === pk ? 'on' : '', pressed: k.key === pk ? 'true' : 'false', pick: () => this.setState({ pick: k.key }) }));

    // Ảnh mô hình (carousel)
    const IM = {
      hotel: [['/assets/63e0d2bfe1224291a4be1d6730facb48.jpg', 'Quầy lễ tân khách sạn'], ['/assets/974345ba46df058cd714c647e9882095.jpg', 'Tòa nhà khách sạn'], ['/assets/184ed4c8d5b0f118849e24490114f4af.jpg', 'Phòng khách sạn']],
      home: [['/assets/1feca9cfcb63e1777de6b728389ffe5a.jpg', 'Villa có hồ bơi'], ['/assets/e187e247863c141ccd5e7314ed8cff87.jpg', 'Homestay'], ['/assets/22f6499965f3db2b47bc485b36dc9d03.jpg', 'Homestay trên núi']],
      chain: [['/assets/64926e3c4de0e78477dae7aae6277f1f.jpg', 'Khu nghỉ dưỡng ven biển'], ['/assets/f9b413eecd76fd2b46b3d6174eabbf3b.jpg', 'Dãy khách sạn phố cổ'], ['/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg', 'Khách sạn ven biển']]
    };
    const sg = this.state.seg;
    const mk = (k) => {
      const list = IM[k], i = sg[k], n = list.length;
      const go = (d) => () => this.setState({ seg: Object.assign({}, this.state.seg, { [k]: (this.state.seg[k] + d + n) % n }) });
      return { img: list[i][0], alt: list[i][1], prev: go(-1), next: go(1), dots: list.map((x, j) => ({ cls: j === i ? 'on' : '' })) };
    };

    // Công cụ tính
    const c = this.state.calc;
    const fmt = (n) => Math.round(n).toLocaleString('vi-VN');
    const short = (n) => n >= 1e9 ? (n / 1e9).toFixed(2).replace('.', ',') + ' tỷ đồng' : (n / 1e6).toFixed(1).replace('.', ',') + ' triệu đồng';
    const num = (e) => Number(String(e.target.value).replace(/[^\d]/g, '')) || 0;
    const setC = (o) => this.setState({ calc: Object.assign({}, this.state.calc, o) });
    const annual = c.b * c.a * (c.r / 100) * 12;
    const keep = annual * (c.s / 100);
    const calc = {
      b: fmt(c.b), a: fmt(c.a), r: String(c.r), s: c.s,
      annual: fmt(annual) + 'đ', keep: fmt(keep) + 'đ', annualShort: short(annual), keepShort: short(keep),
      onB: (e) => setC({ b: num(e) }), onA: (e) => setC({ a: num(e) }),
      onR: (e) => { const x = parseFloat(String(e.target.value).replace(',', '.')); setC({ r: isNaN(x) ? 0 : Math.min(x, 100) }); },
      onS: (e) => setC({ s: Number(e.target.value) })
    };

    // Blog
    const POSTS = [
      { cat: 'doanhthu', tag: 'Doanh thu · 6 phút đọc', title: 'Cách tính công suất phòng, ADR, RevPAR', desc: 'Ba chỉ số nền tảng để biết khách sạn đang bán tốt đến đâu, và nên điều chỉnh giá thế nào.', img: '/assets/974345ba46df058cd714c647e9882095.jpg' },
      { cat: 'marketing', tag: 'Marketing · 8 phút đọc', title: 'Giảm phụ thuộc hoa hồng OTA: bắt đầu từ đâu?', desc: 'Những bước đầu tiên để tăng tỷ trọng đặt phòng trực tiếp mà không bỏ kênh OTA.', img: '/assets/64926e3c4de0e78477dae7aae6277f1f.jpg' },
      { cat: 'nghiepvu', tag: 'Nghiệp vụ · 5 phút đọc', title: 'Quy trình nhận – trả phòng cho khách sạn mini', desc: 'Checklist từng bước cho lễ tân để giao ca không thất lạc thông tin.', img: '/assets/63e0d2bfe1224291a4be1d6730facb48.jpg' },
      { cat: 'vanhanh', tag: 'Ebook & mẫu biểu', title: 'Mẫu quy trình lễ tân, checklist buồng phòng', desc: 'Bảng theo dõi công suất và các mẫu biểu miễn phí cho chủ cơ sở lưu trú.', img: '/assets/184ed4c8d5b0f118849e24490114f4af.jpg' }
    ];
    const CATS = [['all', 'Tất cả'], ['vanhanh', 'Vận hành'], ['doanhthu', 'Doanh thu'], ['marketing', 'Marketing'], ['nghiepvu', 'Nghiệp vụ']];
    const cat = this.state.cat;
    const cats = CATS.map(([k, label]) => ({ label, cls: k === cat ? 'on' : '', pressed: k === cat ? 'true' : 'false', pick: () => this.setState({ cat: k }) }));
    const posts = POSTS.filter((p) => cat === 'all' || p.cat === cat).slice(0, 3);

    // Form đăng ký
    const s = this.state, f = s.f;
    const setF = (k, v) => this.setState({ f: Object.assign({}, this.state.f, { [k]: v }) });
    const on = {};
    ['name', 'phone', 'email', 'org', 'type', 'rooms'].forEach((k) => { on[k] = (e) => setF(k, e.target.value); });
    on.consent = (e) => setF('consent', e.target.checked);
    const PR = ['Bellhop PMS', 'Booking Engine', 'CMS', 'Website', 'Message', 'AI Concierge', 'Payment', 'Finance'];
    const prods = PR.map((label) => {
      const sel = s.prods.indexOf(label) >= 0;
      return { label, cls: sel ? 'on' : '', pressed: sel ? 'true' : 'false', toggle: () => this.setState({ prods: sel ? this.state.prods.filter((x) => x !== label) : this.state.prods.concat([label]) }) };
    });
    const submit = (e) => {
      e.preventDefault();
      const ph = (f.phone || '').replace(/[\s.\-]/g, '');
      const err = { name: !f.name.trim(), phone: !/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(ph), consent: !f.consent };
      if (err.name || err.phone || err.consent) { this.setState({ err }); return; }
      this.setState({ sent: true, err: {} });
    };
    const form = {
      f, on, prods, submit, err: s.err,
      nameCls: s.err.name ? 'err' : '', phoneCls: s.err.phone ? 'err' : '',
      sent: s.sent, notSent: !s.sent, reset: () => this.setState({ sent: false })
    };

    return { tabs, shot: T[tab], picks, isAi: pk === 'ai', isMsg: pk === 'msg', isLink: pk === 'link', hotel: mk('hotel'), home: mk('home'), chain: mk('chain'), calc, cats, posts, form };
  }

  componentDidMount() {
    document.title = "Bellhop – Nền tảng quản lý khách sạn thông minh";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="home" startOpen={false} /><section className="hero-t">
  <img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="" className="layer" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 45%", opacity: "0.16", display: "block" }} />
  <div className="layer glow"></div>
  <div className="layer grid"></div>
  <div className="wrap stack" style={{ position: "relative", gap: "28px", alignItems: "center" }}>
    <span className="eyebrow">Nền tảng quản lý khách sạn</span>
    <h1 className="display" style={{ maxWidth: "1000px" }}>Mọi việc của khách sạn, <span className="hl">gọn trên một nền tảng</span></h1>
    <p className="lead">Bellhop kết nối lễ tân, buồng phòng, kênh OTA, website đặt phòng, tin nhắn khách và kế toán trong cùng một hệ thống. Dùng miễn phí phần mềm lễ tân và vận hành, thêm tính năng khi cơ sở của bạn cần.</p>
    <div className="btns" style={{ justifyContent: "center" }}><a className="btn btn-primary" href="#dang-ky">Dùng thử miễn phí</a><a className="btn btn-outline" href="#dang-ky">Đặt lịch demo</a></div>
    <span className="small">Phần mềm lễ tân &amp; vận hành <b style={{ color: "#8BE3E8" }}>0đ</b> · Dùng trên web và điện thoại</span>
    <div className="tabs" style={{ marginTop: "28px" }}>
      
              {(v.tabs || []).map((t, $index) => (
                <React.Fragment key={$index}><button className={`tab ${t.cls ?? ''}`} type="button" aria-pressed={t.pressed} onClick={t.pick}>{t.label}</button>
                </React.Fragment>
              ))}
    </div>
    <div className="stage" style={{ marginTop: "8px" }}>
      <div className="frame">
        <div className="frame-bar"><i></i><i></i><i></i><span>{v.shot.url}</span></div>
        <img src={v.shot.src} alt={v.shot.alt} />
      </div>
      <div className="float" style={{ left: "-64px", top: "120px" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><span><b>Booking mới từ website</b><span>Deluxe · 2 đêm · Minh họa</span></span></div>
      <div className="float" style={{ right: "-56px", top: "64px" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b>Giá đã đồng bộ lên các kênh</b><span>Qua Bellhop CMS</span></span></div>
      <div className="float" style={{ right: "-40px", bottom: "120px" }}><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b>Phòng 203 đã dọn xong</b><span>Sẵn sàng đón khách</span></span></div>
    </div>
    <p className="small" style={{ marginBottom: "88px" }}>{v.shot.cap}</p>
  </div>
  <div className="fade"></div></section><section className="sec-sm">
  <div className="wrap stack" style={{ gap: "28px" }}>
    <p className="center h4" style={{ color: "#4A5873", fontWeight: "600" }}>Được các cơ sở lưu trú tại Việt Nam tin dùng</p>
    <div className="logos">
      <div className="ph-box">Logo khách hàng</div><div className="ph-box">Logo khách hàng</div><div className="ph-box">Logo khách hàng</div><div className="ph-box">Logo khách hàng</div><div className="ph-box">Logo khách hàng</div><div className="ph-box">Logo khách hàng</div>
    </div>
    <p className="center note">Chỉ hiển thị logo khi khách hàng đồng ý giới thiệu</p>
  </div></section><section className="sec" id="tong-quan">
  <div className="wrap stack" style={{ gap: "120px" }}>
    <div className="stack center" style={{ gap: "18px", alignItems: "center", maxWidth: "860px", margin: "0 auto" }}>
      <span className="eyebrow">Một nền tảng · bốn nhóm công việc</span>
      <h2 className="h2">Bellhop lo phần việc phía sau, để bạn tập trung vào khách</h2>
      <p className="lead">Dùng riêng từng sản phẩm hoặc kết hợp – tất cả chạy trên cùng một dữ liệu, không nhập lại, không lệch số.</p>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Vận hành · Bellhop PMS</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Lễ tân, buồng phòng, kho và F&amp;B trên cùng một màn hình</h3>
        <p className="p">Nắm tình trạng từng phòng theo thời gian thực; nhận, đổi, trả phòng chỉ trong vài thao tác.</p>
        <ul className="ticks">
          <li><span><b>Lễ tân &amp; đặt phòng</b> – miễn phí</span></li>
          <li><span><b>Sơ đồ phòng &amp; timeline</b>: phòng trống, đang ở, cần dọn trong một cái nhìn – miễn phí</span></li>
          <li><span><b>Buồng phòng</b>: giao việc, cập nhật trạng thái dọn – miễn phí</span></li>
          <li><span><b>Kho &amp; F&amp;B, báo cáo chuyên sâu</b> – gói nâng cao</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms">Tìm hiểu Bellhop PMS <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/d967b787263d4b619b118217c8635099.png" alt="Màn hình Buồng phòng của Bellhop" style={{ display: "block", width: "100%", height: "auto" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-28px 0 0 auto", width: "260px", padding: "16px 18px", display: "flex", gap: "12px", alignItems: "center" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Phòng 203 đã dọn xong</b><span className="small">Sẵn sàng đón khách</span></span></div>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Bán phòng &amp; Doanh thu</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Bán đúng giá trên mọi kênh, tăng đặt phòng trực tiếp</h3>
        <p className="p">Giá và phòng trống quản lý từ một nơi; khách đặt ngay trên website của bạn, đặt phòng tự vào PMS.</p>
        <ul className="ticks">
          <li><span><b>Booking Engine</b>: khách xem phòng trống, giá theo ngày và đặt ngay trên website</span></li>
          <li><span><b>CMS</b>: đồng bộ giá và phòng trống lên các OTA, định giá linh động theo mùa vụ</span></li>
          <li><span><b>Website</b>: mẫu cho khách sạn, homestay &amp; villa, chuỗi – tích hợp sẵn Booking Engine</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-booking-engine">Booking Engine <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-cms">CMS <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-website">Website <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/de8ede5a8ea84f4225237b7fd9aebf2d.png" alt="Màn hình Cấu hình phòng và giá của Bellhop" style={{ display: "block", width: "100%", height: "auto" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-36px auto 0 24px", width: "min(360px, 90%)", padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <b style={{ fontSize: "15px" }}>Đặt phòng trên website của bạn</b>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px", fontSize: "13px" }}><span style={{ padding: "10px 12px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "12px" }}>Nhận phòng</span><br /><b>Th 6, 23/10</b></span><span style={{ padding: "10px 12px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "12px" }}>Trả phòng</span><br /><b>CN, 25/10</b></span></div>
          <span className="btn btn-primary btn-sm" style={{ width: "100%" }}>Đặt phòng</span>
        </div>
      </div>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Chăm sóc khách hàng</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Trả lời khách nhanh hơn, không bỏ sót tin nhắn nào</h3>
        <p className="p">Mọi cuộc trò chuyện về một nơi, cả đội lễ tân cùng xử lý – kể cả những câu hỏi lặp lại ngoài giờ.</p>
        <ul className="ticks">
          <li><span><b>Message</b>: gom tin nhắn từ các kênh mạng xã hội về một hộp thư chung, xem lại lịch sử trao đổi</span></li>
          <li><span><b>AI Concierge</b>: trả lời câu hỏi thường gặp – giờ nhận/trả phòng, tiện ích, đường đi – dựa trên cơ sở kiến thức của chính cơ sở bạn</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-message">Bellhop Message <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-ai-concierge">AI Concierge <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-tint-c">
        <div className="card" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)", overflow: "hidden", minHeight: "340px" }}>
          <div style={{ borderRight: "1px solid #E3E8F2", padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <b style={{ fontSize: "13px", padding: "6px 8px" }}>Hộp thư chung</b>
            <div style={{ padding: "10px", borderRadius: "10px", background: "#EAF1FF" }}><b style={{ fontSize: "13px", display: "block" }}>Thu Hà · Zalo</b><span className="small" style={{ fontSize: "12px" }}>Còn phòng đôi tối thứ 7 không ạ?</span></div>
            <div style={{ padding: "10px" }}><b style={{ fontSize: "13px", display: "block" }}>Jun Kim · Messenger</b><span className="small" style={{ fontSize: "12px" }}>Is breakfast included?</span></div>
            <div style={{ padding: "10px" }}><b style={{ fontSize: "13px", display: "block" }}>Minh Phúc · Zalo</b><span className="small" style={{ fontSize: "12px" }}>Cho mình xin địa chỉ</span></div>
            <div style={{ padding: "10px" }}><b style={{ fontSize: "13px", display: "block" }}>Lan Anh · Website</b><span className="small" style={{ fontSize: "12px" }}>Có chỗ đậu ô tô không?</span></div>
          </div>
          <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "flex-end", background: "#FAFCFF" }}>
            <span style={{ alignSelf: "flex-start", maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#fff", boxShadow: "0 0 0 1px #E3E8F2", fontSize: "14px" }}>Còn phòng đôi tối thứ 7 không ạ?</span>
            <span style={{ alignSelf: "flex-end", maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "#1B45C4", color: "#fff", fontSize: "14px" }}>Dạ còn ạ. Phòng Deluxe giường đôi giá 890.000đ/đêm, chị muốn em giữ phòng không ạ?</span>
            <span className="small" style={{ alignSelf: "flex-end", fontSize: "12px" }}>Lễ tân Ngọc · Minh họa</span>
          </div>
        </div>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Thanh toán &amp; Kế toán</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3vw, 40px)", textWrap: "nowrap" }}>Thu tiền gọn, sổ sách khớp</h3>
        <p className="p">Dữ liệu tài chính chạy thẳng từ quầy lễ tân đến phần mềm kế toán – kế toán không phải nhập lại.</p>
        <ul className="ticks">
          <li><span><b>Payment</b>: nhận thanh toán online qua cổng dành riêng cho ngành lưu trú</span></li>
          <li><span><b>Finance</b>: đồng bộ doanh thu, thu chi sang phần mềm kế toán</span></li>
          <li><span><b>PMS gói Tài chính</b>: hóa đơn, hóa đơn điện tử, sổ sách, quỹ tiền mặt và tiền gửi</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="/san-pham/bellhop-payment">Bellhop Payment <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-finance">Bellhop Finance <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-soft">
        <div className="stack" style={{ gap: "14px", maxWidth: "420px", margin: "0 auto" }}>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><span><b style={{ display: "block" }}>Bellhop PMS</b><span className="small">Hóa đơn · thu chi · quỹ tại quầy</span></span></div>
          <span style={{ alignSelf: "center", fontSize: "22px", color: "#1B45C4" }}>↓</span>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center", boxShadow: "0 0 0 2px #2E9AA5, 0 24px 50px -28px rgba(46,154,165,.5)" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block" }}>Bellhop Finance</b><span className="small">Tự động đồng bộ, không nhập lại</span></span></div>
          <span style={{ alignSelf: "center", fontSize: "22px", color: "#1B45C4" }}>↓</span>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center" }}><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><span><b style={{ display: "block" }}>Phần mềm kế toán</b><span className="small">Kế toán hạch toán, lập báo cáo</span></span></div>
        </div>
      </div>
    </div>
    <div className="try-pill"><span>Dùng thử miễn phí</span><a href="#dang-ky">Đăng ký ngay</a></div>
  </div></section><section className="sec dark">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px" }}>
      <span className="eyebrow">Mới trên Bellhop</span>
      <h2 className="h2" style={{ color: "#fff", fontSize: "clamp(26px, 3.2vw, 44px)", textWrap: "nowrap" }}>Trợ lý AI và hộp thư chung cho đội lễ tân</h2>
    </div>
    <div className="picker">
      <div className="pick-list">
        
                {(v.picks || []).map((k, $index) => (
                  <React.Fragment key={$index}>
          <button className={`pick ${k.cls ?? ''}`} type="button" aria-pressed={k.pressed} onClick={k.pick}><b>{k.title} 
                        {Boolean(k.isNew) && (
                          <><span className="new">Mới</span>
                          </>
                        )}</b><span>{k.desc}</span></button>
        
                  </React.Fragment>
                ))}
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-ai-concierge" style={{ color: "#8BE3E8", margin: "16px 0 0 22px" }}>Tìm hiểu AI Concierge <span className="arr">→</span></a>
      </div>
      <div style={{ borderRadius: "28px", padding: "36px", background: "radial-gradient(420px 300px at 85% 10%, rgba(27,69,196,.55), transparent 70%), linear-gradient(160deg, #1B3A5C, #122745)", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
                {Boolean(v.isAi) && (
                  <>
          <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px", color: "#0B1B3F" }}>
            <div className="row" style={{ gap: "10px" }}><img src="/assets/0e8369a376638069fb965d8bf187dceb.png" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%" }} /><span><b style={{ display: "block", fontSize: "15px" }}>AI Concierge</b><span className="small" style={{ fontSize: "12px" }}>Trả lời từ cơ sở kiến thức của khách sạn</span></span></div>
            <span style={{ alignSelf: "flex-end", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "#EAF1FF", fontSize: "14px" }}>Mấy giờ nhận phòng ạ?</span>
            <span style={{ alignSelf: "flex-start", maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#1B45C4", color: "#fff", fontSize: "14px" }}>Giờ nhận phòng từ 14:00, trả phòng trước 12:00 ạ.</span>
            <span style={{ alignSelf: "flex-end", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "#EAF1FF", fontSize: "14px" }}>Khách sạn có chỗ đậu ô tô không?</span>
            <span style={{ alignSelf: "flex-start", maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#1B45C4", color: "#fff", fontSize: "14px" }}><span className="ph" style={{ fontWeight: "500" }}>[Câu trả lời theo cơ sở kiến thức của khách sạn]</span></span>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isMsg) && (
                  <>
          <div className="card" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "8px", color: "#0B1B3F" }}>
            <b style={{ fontSize: "15px", padding: "4px 6px" }}>Hộp thư chung · 4 cuộc trò chuyện</b>
            <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#EAF1FF" }}><span className="tile t-blue" style={{ fontSize: "13px", fontWeight: "800" }}>TH</span><span style={{ flex: "1" }}><b style={{ fontSize: "14px" }}>Thu Hà</b> <span className="chip" style={{ height: "22px", fontSize: "11px" }}>Zalo</span><br /><span className="small" style={{ fontSize: "13px" }}>Còn phòng đôi tối thứ 7 không ạ?</span></span><span className="small" style={{ fontSize: "12px" }}>09:12</span></div>
            <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-sky" style={{ fontSize: "13px", fontWeight: "800" }}>JK</span><span style={{ flex: "1" }}><b style={{ fontSize: "14px" }}>Jun Kim</b> <span className="chip" style={{ height: "22px", fontSize: "11px" }}>Messenger</span><br /><span className="small" style={{ fontSize: "13px" }}>Is breakfast included?</span></span><span className="small" style={{ fontSize: "12px" }}>09:05</span></div>
            <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-navy" style={{ fontSize: "13px", fontWeight: "800" }}>MP</span><span style={{ flex: "1" }}><b style={{ fontSize: "14px" }}>Minh Phúc</b> <span className="chip" style={{ height: "22px", fontSize: "11px" }}>Zalo</span><br /><span className="small" style={{ fontSize: "13px" }}>Cho mình xin địa chỉ</span></span><span className="small" style={{ fontSize: "12px" }}>08:41</span></div>
            <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-orange" style={{ fontSize: "13px", fontWeight: "800" }}>LA</span><span style={{ flex: "1" }}><b style={{ fontSize: "14px" }}>Lan Anh</b> <span className="chip" style={{ height: "22px", fontSize: "11px" }}>Website</span><br /><span className="small" style={{ fontSize: "13px" }}>Có chỗ đậu ô tô không?</span></span><span className="small" style={{ fontSize: "12px" }}>Hôm qua</span></div>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isLink) && (
                  <>
          <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px", color: "#0B1B3F" }}>
            <span style={{ alignSelf: "flex-end", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "#EAF1FF", fontSize: "14px" }}>Cho em đặt 1 phòng đôi 23–25/10 nhé</span>
            <div style={{ alignSelf: "flex-start", width: "min(320px, 90%)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 0 0 1px #E3E8F2" }}>
              <img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="" style={{ display: "block", width: "100%", height: "120px", objectFit: "cover" }} />
              <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}><b style={{ fontSize: "15px" }}>Đặt phòng trực tiếp · 23–25/10</b><span className="small" style={{ fontSize: "13px" }}>Xem phòng trống, giá và xác nhận ngay</span><span className="btn btn-primary btn-sm">Mở link đặt phòng</span></div>
            </div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
      </div>
    </div>
  </div></section><section className="sec seg-sec" id="giai-phap">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "18px", alignItems: "center" }}><span className="kick">Phù hợp mô hình của bạn</span><h2 className="h2" style={{ maxWidth: "760px" }}>Phù hợp với khách sạn, homestay, villa và chuỗi</h2></div>
    <div className="seg-grid">
      <div className="seg-card">
        <div className="seg-media">
          <img src={v.hotel.img} alt={v.hotel.alt} />
          <button className="seg-nav l" type="button" aria-label="Ảnh trước" onClick={v.hotel.prev}>‹</button>
          <button className="seg-nav r" type="button" aria-label="Ảnh sau" onClick={v.hotel.next}>›</button>
          <div className="seg-dots">
                    {(v.hotel.dots || []).map((d, $index) => (
                      <React.Fragment key={$index}><i className={d.cls}></i>
                      </React.Fragment>
                    ))}</div>
        </div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V6l8-3 8 3v14M9 20v-5h6v5M8 9h1M15 9h1M8 12h1M15 12h1" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h3"><a href="/giai-phap/khach-san">Khách sạn</a></h3></div>
          <p className="p">Nhiều ca lễ tân, nhiều hạng phòng, bán trên nhiều OTA.</p>
          <span className="seg-label">Gợi ý</span>
          <div className="seg-chips"><span className="seg-chip">PMS</span><span className="seg-chip">CMS</span><span className="seg-chip">Booking Engine</span></div>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo cho mô hình này <span>→</span></a>
        </div>
      </div>
      <div className="seg-card">
        <div className="seg-media">
          <img src={v.home.img} alt={v.home.alt} />
          <button className="seg-nav l" type="button" aria-label="Ảnh trước" onClick={v.home.prev}>‹</button>
          <button className="seg-nav r" type="button" aria-label="Ảnh sau" onClick={v.home.next}>›</button>
          <div className="seg-dots">
                    {(v.home.dots || []).map((d, $index) => (
                      <React.Fragment key={$index}><i className={d.cls}></i>
                      </React.Fragment>
                    ))}</div>
        </div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h3"><a href="/giai-phap/homestay-villa">Homestay &amp; Villa</a></h3></div>
          <p className="p">Ít nhân sự, chủ tự vận hành qua điện thoại, khách hỏi nhiều qua mạng xã hội.</p>
          <span className="seg-label">Gợi ý</span>
          <div className="seg-chips"><span className="seg-chip t">PMS miễn phí</span><span className="seg-chip">Message</span><span className="seg-chip">Website</span></div>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo cho mô hình này <span>→</span></a>
        </div>
      </div>
      <div className="seg-card">
        <div className="seg-media">
          <img src={v.chain.img} alt={v.chain.alt} />
          <button className="seg-nav l" type="button" aria-label="Ảnh trước" onClick={v.chain.prev}>‹</button>
          <button className="seg-nav r" type="button" aria-label="Ảnh sau" onClick={v.chain.next}>›</button>
          <div className="seg-dots">
                    {(v.chain.dots || []).map((d, $index) => (
                      <React.Fragment key={$index}><i className={d.cls}></i>
                      </React.Fragment>
                    ))}</div>
        </div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20V9l5-3 5 3v11M13 20V5l4-2 4 2v15M6 12h4M6 16h4M16 9h2M16 13h2" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h3"><a href="/giai-phap/chuoi-luu-tru">Chuỗi lưu trú</a></h3></div>
          <p className="p">Nhiều cơ sở, cần phân quyền, báo cáo tập trung, kế toán thống nhất.</p>
          <span className="seg-label">Gợi ý</span>
          <div className="seg-chips"><span className="seg-chip n">PMS nâng cao</span><span className="seg-chip">CMS</span><span className="seg-chip">Finance</span></div>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo cho mô hình này <span>→</span></a>
        </div>
      </div>
    </div>
  </div></section><section className="sec" id="cong-cu">
  <div className="wrap">
    <div className="calc2">
      <div className="stack" style={{ gap: "22px" }}>
        <span className="kick lt">Công cụ miễn phí</span>
        <h2 className="h2" style={{ fontSize: "clamp(26px, 2.6vw, 38px)", textWrap: "nowrap" }}>Mỗi năm bạn đang trả bao nhiêu<br />hoa hồng cho OTA?</h2>
        <p className="sub">Nhập vài con số để ước tính khoản có thể giữ lại khi chuyển một phần đặt phòng sang kênh trực tiếp.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}>
          <div className="calc-f"><label htmlFor="c-b">Số đặt phòng qua OTA / tháng</label><input id="c-b" className="calc-in" inputMode="numeric" value={v.calc.b ?? ''} onChange={v.calc.onB} /></div>
          <div className="calc-f"><label htmlFor="c-a">Giá trị TB / đặt phòng (đ)</label><input id="c-a" className="calc-in" inputMode="numeric" value={v.calc.a ?? ''} onChange={v.calc.onA} /></div>
        </div>
        <div className="calc-f" style={{ maxWidth: "200px" }}><label htmlFor="c-r">% hoa hồng OTA</label><input id="c-r" className="calc-in" inputMode="decimal" value={v.calc.r ?? ''} onChange={v.calc.onR} /></div>
        <div className="calc-f">
          <label htmlFor="c-s" style={{ display: "flex", justifyContent: "space-between" }}><span>% đặt phòng có thể chuyển sang trực tiếp</span><b style={{ color: "#5FB9C2", fontSize: "17px" }}>{v.calc.s}%</b></label>
          <input id="c-s" className="calc-range" type="range" min="10" max="30" step="1" value={v.calc.s ?? ''} onChange={v.calc.onS} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#8FA3BB" }}><span>10%</span><span>30%</span></div>
        </div>
      </div>
      <div className="calc-res" aria-live="polite">
        <div className="row" style={{ gap: "12px" }}><span className="seg-ic" style={{ width: "40px", height: "40px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h10l4 4v12H5zM9 12h6M9 16h4" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span className="lab">Kết quả ước tính</span></div>
        <div className="stack" style={{ gap: "6px" }}><span className="small">Hoa hồng đang trả mỗi năm</span><span className="big">{v.calc.annual}</span><span className="small" style={{ fontSize: "13px" }}>≈ {v.calc.annualShort}</span></div>
        <div className="div"></div>
        <div className="stack" style={{ gap: "6px" }}><span className="small">Ước tính có thể giữ lại mỗi năm</span><span className="big t">{v.calc.keep}</span><span className="small" style={{ fontSize: "13px" }}>≈ {v.calc.keepShort} · khi chuyển {v.calc.s}% sang kênh trực tiếp</span></div>
        <p className="nb">Kết quả chỉ là ước tính, chưa trừ chi phí vận hành kênh trực tiếp, không phải cam kết.</p>
        <a className="btn btn-navy" href="https://bellhop.vn/san-pham/bellhop-booking-engine" style={{ alignSelf: "flex-start" }}>Tìm hiểu Booking Engine <span>→</span></a>
      </div>
    </div>
  </div></section><section className="sec soft-grid" id="bang-gia">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Bảng giá</span><h2 className="h2">Bắt đầu miễn phí. Nâng cấp khi khách sạn của bạn cần.</h2></div>
    <div className="plans">
      <div className="plan hi">
        <span className="chip" style={{ alignSelf: "flex-start" }}>Miễn phí</span>
        <h3 className="h3">Bellhop PMS</h3>
        <div className="row" style={{ gap: "8px", alignItems: "baseline" }}><span className="price">0đ</span><span className="small">/ <span className="ph">[thời hạn · giới hạn phòng/người dùng]</span></span></div>
        <ul className="ticks">
          <li>Cài đặt cơ sở: sơ đồ phòng, phòng &amp; giá, dịch vụ, thuế/phí, mẫu in, phân quyền</li>
          <li>Lễ tân &amp; đặt phòng · Sơ đồ phòng, timeline · Buồng phòng</li>
          <li>Kho cơ bản · Tạo hóa đơn · Thu chi cơ bản · Thống kê</li>
        </ul>
        <a className="btn btn-primary" href="#dang-ky" style={{ marginTop: "auto" }}>Dùng thử miễn phí</a>
      </div>
      <div className="plan">
        <span className="chip" style={{ alignSelf: "flex-start", background: "#E6F6F7", color: "#1E6E76" }}>Nâng cao</span>
        <h3 className="h3">Cộng thêm theo module</h3>
        <div className="row" style={{ gap: "8px", alignItems: "baseline" }}><span className="price"><span className="ph" style={{ fontSize: "0.5em" }}>[giá]</span></span><span className="small">/ tháng hoặc Liên hệ</span></div>
        <ul className="ticks">
          <li><b>Vận hành nâng cao</b>: F&amp;B, kho chuyên sâu, email marketing</li>
          <li><b>Tài chính</b>: hóa đơn điện tử, sổ sách, quỹ tiền mặt &amp; tiền gửi</li>
          <li><b>AI Concierge &amp; Phân tích</b>: trợ lý AI, phân tích doanh thu, báo cáo</li>
        </ul>
        <a className="btn btn-outline" href="#" style={{ marginTop: "auto" }}>So sánh các gói</a>
      </div>
    </div>
  </div></section><section className="sec" id="blog">
  <div className="wrap stack" style={{ gap: "36px" }}>
    <div className="blog-head">
      <div className="stack" style={{ gap: "14px" }}><span className="kick">Blog &amp; tài nguyên</span><h2 className="h2">Kiến thức vận hành và bán phòng cho chủ cơ sở lưu trú</h2></div>
      <div className="fchips">
        
                {(v.cats || []).map((c, $index) => (
                  <React.Fragment key={$index}><button className={`fchip ${c.cls ?? ''}`} type="button" aria-pressed={c.pressed} onClick={c.pick}>{c.label}</button>
                  </React.Fragment>
                ))}
      </div>
    </div>
    <div className="cards3">
      
              {(v.posts || []).map((p, $index) => (
                <React.Fragment key={$index}>
        <a className="rcard bpost" href="#"><div className="thumb"><img src={p.img} alt="" /></div><div className="body"><span className="btag">{p.tag}</span><h3 className="h4">{p.title}</h3><p className="small">{p.desc}</p></div></a>
      
                </React.Fragment>
              ))}
    </div>
  </div></section><section className="sec" id="dang-ky" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="lead2">
      <div className="stack" style={{ gap: "22px" }}>
        <span className="kick lt" style={{ color: "#8BE3E8" }}>Bắt đầu cùng Bellhop</span>
        <h2 className="h2">Sẵn sàng vận hành gọn hơn?</h2>
        <p className="sub">Để lại thông tin, đội Bellhop sẽ liên hệ tư vấn và demo theo đúng mô hình cơ sở của bạn.</p>
        <div className="ct">
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" style={{ fill: "none", stroke: "#8BE3E8", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg>Hotline/Zalo: <b>0972 096 499</b></span>
          <span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" style={{ fill: "none", stroke: "#8BE3E8", strokeWidth: "2" }}></rect><path d="M3 7l9 6 9-6" style={{ fill: "none", stroke: "#8BE3E8", strokeWidth: "2" }}></path></svg>Email: <b>admin@bellhop.vn</b></span>
        </div>
      </div>
      <form className="lform" onSubmit={v.form.submit} noValidate="novalidate">
        
                {Boolean(v.form.sent) && (
                  <>
          <div className="stack center" style={{ gap: "14px", padding: "40px 8px", alignItems: "center" }}>
            <span className="seg-ic" style={{ width: "56px", height: "56px", background: "#E6F6F7", color: "#1F7A84" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span>
            <h3 className="h3">Cảm ơn bạn!</h3>
            <p className="p">Đội Bellhop sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
            <button className="btn btn-outline btn-sm" type="button" onClick={v.form.reset}>Gửi thông tin khác</button>
          </div>
        
                  </>
                )}
        
                {Boolean(v.form.notSent) && (
                  <>
          <div className="row" style={{ justifyContent: "space-between", gap: "12px" }}><h3 className="h3">Đăng ký tư vấn &amp; demo</h3><span className="small" style={{ fontSize: "12px" }}><span style={{ color: "#C2410C" }}>*</span> bắt buộc</span></div>
          <div className="fgrid2">
            <div className="fld"><label htmlFor="f-name">Họ tên <span className="req">*</span></label><input id="f-name" className={`inp2 ${v.form.nameCls ?? ''}`} value={v.form.f.name ?? ''} onChange={v.form.on.name} autoComplete="name" placeholder="Nguyễn Văn A" />
                      {Boolean(v.form.err.name) && (
                        <><span className="ferr2">Vui lòng nhập họ tên.</span>
                        </>
                      )}</div>
            <div className="fld"><label htmlFor="f-phone">Số điện thoại/Zalo <span className="req">*</span></label><input id="f-phone" className={`inp2 ${v.form.phoneCls ?? ''}`} value={v.form.f.phone ?? ''} onChange={v.form.on.phone} type="tel" inputMode="numeric" autoComplete="tel" placeholder="09xx xxx xxx" />
                      {Boolean(v.form.err.phone) && (
                        <><span className="ferr2">Số điện thoại chưa đúng (vd: 0912 345 678).</span>
                        </>
                      )}</div>
            <div className="fld"><label htmlFor="f-email">Email</label><input id="f-email" className="inp2" value={v.form.f.email ?? ''} onChange={v.form.on.email} type="email" autoComplete="email" placeholder="ban@khachsan.vn" /></div>
            <div className="fld"><label htmlFor="f-org">Tên cơ sở</label><input id="f-org" className="inp2" value={v.form.f.org ?? ''} onChange={v.form.on.org} placeholder="Khách sạn …" /></div>
            <div className="fld"><label htmlFor="f-type">Loại hình</label><select id="f-type" className="inp2" value={v.form.f.type ?? ''} onChange={v.form.on.type}><option value="">Chọn loại hình</option><option>Khách sạn</option><option>Homestay &amp; Villa</option><option>Chuỗi lưu trú</option></select></div>
            <div className="fld"><label htmlFor="f-rooms">Số phòng</label><select id="f-rooms" className="inp2" value={v.form.f.rooms ?? ''} onChange={v.form.on.rooms}><option value="">Chọn số phòng</option><option>Dưới 10</option><option>10–30</option><option>31–100</option><option>Trên 100</option></select></div>
          </div>
          <div className="stack" style={{ gap: "8px" }}><span className="flab">Sản phẩm quan tâm <span className="small" style={{ fontSize: "12px", fontWeight: "400" }}>(chọn nhiều)</span></span><div className="row" style={{ gap: "8px", flexWrap: "wrap" }}>
                      {(v.form.prods || []).map((p, $index) => (
                        <React.Fragment key={$index}><button className={`pchip ${p.cls ?? ''}`} type="button" aria-pressed={p.pressed} onClick={p.toggle}>{p.label}</button>
                        </React.Fragment>
                      ))}</div></div>
          <label className="cons"><input type="checkbox" checked={Boolean(v.form.f.consent)} onChange={v.form.on.consent} /><span>Tôi đồng ý để Bellhop xử lý thông tin trên nhằm liên hệ tư vấn, theo <a href="/chinh-sach/bao-ve-du-lieu-ca-nhan" style={{ color: "#1450F0", textDecoration: "underline" }}>Chính sách bảo vệ và xử lý dữ liệu cá nhân</a>.</span></label>
          
                  {Boolean(v.form.err.consent) && (
                    <><span className="ferr2">Vui lòng đồng ý để Bellhop liên hệ tư vấn.</span>
                    </>
                  )}
          <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>Đăng ký ngay <span>→</span></button>
        
                  </>
                )}
      </form>
    </div>
  </div></section>
        <Footer /></div>
      </>
    );
  }
}
