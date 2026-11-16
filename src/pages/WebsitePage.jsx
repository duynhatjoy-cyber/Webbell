import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class WebsitePage extends DCLogic {
  constructor(p) { super(p); this.state = { t: 0, faq: 0, f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', mgmt: '', site: '', consent: false }, prods: ['Website'], err: {}, sent: false }; }
  renderVals() {
    const mk = (name, note, brand, head, tone) => ({ name, note, brand, head, tone });
    const T = [
      { label: 'Khách sạn', ic: 'M4 21V5l7-2v18M11 9h9v12M7 8h1M7 12h1M7 16h1M14 13h3M14 17h3M3 21h18', desc: 'Ưu tiên thông tin hạng phòng, tiện ích, vị trí và dịch vụ đi kèm (nhà hàng, hội nghị).', items: [
        mk('Mẫu Harbor', 'Khách sạn thành phố', 'HARBOR', 'Khách sạn trung tâm thành phố', 't-blue'),
        mk('Mẫu Lantern', 'Khách sạn phố cổ', 'LANTERN', 'Lưu trú giữa lòng phố cổ', 't-navy'),
        mk('Mẫu Breeze', 'Khách sạn biển', 'BREEZE', 'Nghỉ dưỡng sát biển', 't-sky')] },
      { label: 'Homestay & Villa', ic: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-5h4v5', desc: 'Ưu tiên hình ảnh không gian và trải nghiệm địa phương.', items: [
        mk('Mẫu Garden', 'Homestay vườn', 'GARDEN', 'Homestay ấm cúng giữa vườn', 't-navy'),
        mk('Mẫu Hillside', 'Villa nghỉ dưỡng', 'HILLSIDE', 'Villa trên đồi, view núi', 't-blue'),
        mk('Mẫu Atelier', 'Căn hộ dịch vụ', 'ATELIER', 'Căn hộ dịch vụ đầy đủ tiện nghi', 't-sky')] },
      { label: 'Chuỗi', ic: 'M3 21V9l5-3 5 3v12M13 21V5l4-2 4 2v16M6 12h4M6 16h4M16 9h2M16 13h2', desc: 'Danh sách cơ sở, tìm theo điểm đến, thương hiệu thống nhất, đặt phòng tập trung.', items: [
        mk('Mẫu Network', 'Chuỗi đa điểm đến', 'NETWORK', 'Một thương hiệu, nhiều điểm đến', 't-navy'),
        mk('Mẫu Collection', 'Bộ sưu tập boutique', 'COLLECTION', 'Bộ sưu tập villa boutique', 't-sky'),
        mk('Mẫu Metro', 'Chuỗi khách sạn thành phố', 'METRO', 'Chuỗi khách sạn thành phố', 't-blue')] }
    ];
    const i = this.state.t;
    const tabs = T.map((t, k) => ({ label: t.label, ic: t.ic, cls: k === i ? 'on' : '', pressed: k === i ? 'true' : 'false', pick: () => this.setState({ t: k }) }));
    const fq = this.state.faq;
    const fo = {}, fe = {}, ft = {}, fs = {};
    for (let n = 0; n < 7; n++) {
      const k = 'q' + n;
      fo[k] = fq === n;
      fe[k] = fq === n ? 'true' : 'false';
      fs[k] = fq === n ? '−' : '+';
      ft[k] = () => this.setState({ faq: fq === n ? -1 : n });
    }
    // Form đăng ký
    const s = this.state, f = s.f;
    const setF = (k, v) => this.setState({ f: Object.assign({}, this.state.f, { [k]: v }) });
    const on = {};
    ['name', 'phone', 'email', 'org', 'type', 'rooms', 'mgmt', 'site'].forEach((k) => { on[k] = (e) => setF(k, e.target.value); });
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

    return { tabs, tpl: T[i], isChain: i === 2, fo, fe, ft, fs, form };
  }

  componentDidMount() {
    document.title = "Bellhop Website – Website cho cơ sở lưu trú";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="website" startOpen={false} /><section className="p-hero">
  <div className="wrap p-hero-in">
    <div className="stack" style={{ gap: "24px" }}>
      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0" }}><a href="/">Trang chủ</a><span>›</span><a href="/#tong-quan">Sản phẩm</a><span>›</span><b style={{ color: "#0B1B3F" }}>Bellhop Website</b></nav>
      <span className="eyebrow">Bellhop Website · Website cho cơ sở lưu trú</span>
      <h1 className="display" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>Website chuyên nghiệp cho khách sạn, homestay và villa, <span className="hl">tích hợp sẵn đặt phòng trực tiếp</span></h1>
      <p className="lead">Chọn mẫu theo loại hình, thêm hình ảnh và giá phòng của bạn. Website kết nối sẵn Bellhop Booking Engine và Bellhop PMS: khách xem phòng, chọn ngày và đặt trực tiếp.</p>
      <div className="btns"><a className="btn btn-primary" href="#mau">Xem mẫu website</a><a className="btn btn-outline" href="#dang-ky">Đặt lịch tư vấn</a></div>
      <span className="small">Mẫu riêng cho từng loại hình · Tích hợp đặt phòng · Đặt phòng vào thẳng Bellhop PMS</span>
    </div>
    <div style={{ position: "relative" }}>
      <div className="frame">
        <div className="frame-bar"><i></i><i></i><i></i><span>www.breezehotel.vn</span></div>
        <div style={{ position: "relative" }}>
          <img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="Website mẫu khách sạn" style={{ display: "block", width: "100%", height: "210px", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg, rgba(7,26,77,.55), rgba(7,26,77,.15) 45%, rgba(7,26,77,.7))", color: "#fff", padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", fontSize: "13px" }}><b style={{ letterSpacing: ".14em" }}>BREEZE HOTEL</b><span>Phòng · Tiện ích · Ưu đãi · Liên hệ</span></div>
            <div><b style={{ display: "block", fontSize: "28px", lineHeight: "1.15", letterSpacing: "-.02em" }}>Nghỉ dưỡng sát biển,<br />đặt phòng trực tiếp</b><span style={{ fontSize: "12px", color: "#D6E2FF" }}>Mẫu Breeze · Minh họa</span></div>
          </div>
        </div>
        <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr)) auto", gap: "8px", alignItems: "center", fontSize: "13px" }}>
          <span style={{ padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "11px" }}>Nhận phòng</span><br /><b>Th 6, 23/10</b></span>
          <span style={{ padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "11px" }}>Trả phòng</span><br /><b>CN, 25/10</b></span>
          <span style={{ padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "11px" }}>Khách</span><br /><b>2 người lớn</b></span>
          <span className="btn btn-primary btn-sm">Đặt phòng</span>
        </div>
      </div>
      <div className="card" style={{ position: "relative", margin: "-28px 24px 0 auto", width: "290px", padding: "16px 18px", display: "flex", gap: "12px", alignItems: "center" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Đặt phòng mới từ website</b><span className="small">Deluxe hướng biển · 2 đêm</span></span></div>
    </div>
  </div></section><section className="sec" id="van-de">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "640px", margin: "0 auto" }}>
      <span className="eyebrow">Vấn đề</span>
      <h2 className="h2">Những hạn chế thường gặp ở website cơ sở lưu trú</h2>
    </div>
    <div className="vs">
      <div className="vs-col bad">
        <div className="vs-head"><span className="vs-tag">Website thông thường</span></div>
        <div className="vs-shot vs-old"><img src="/assets/974345ba46df058cd714c647e9882095.jpg" alt="" /><div className="vs-cap"><b>Khách sạn ABC</b><span>Liên hệ đặt phòng: 09xx xxx xxx</span></div></div>
        <ul><li><span className="vs-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12h10" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><span><b>Chưa có website riêng hoặc chỉ có fanpage</b><span>Thông tin nằm rải rác trên OTA và mạng xã hội.</span></span></li><li><span className="vs-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12h10" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><span><b>Không đặt phòng được</b><span>Khách phải gọi điện, nhắn tin rồi chờ phản hồi.</span></span></li><li><span className="vs-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12h10" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><span><b>Khó xem trên điện thoại</b><span>Tải chậm, chữ nhỏ, bố cục vỡ.</span></span></li><li><span className="vs-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12h10" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><span><b>Muốn sửa giá, ảnh phải nhờ bên thiết kế</b><span>Ưu đãi mới chậm lên website.</span></span></li></ul>
      </div>
      <div className="vs-col good">
        <div className="vs-head"><span className="vs-tag">Bellhop Website</span><span className="vs-pill">Có đặt phòng</span></div>
        <div className="vs-shot vs-new"><img src="/assets/1feca9cfcb63e1777de6b728389ffe5a.jpg" alt="" /><div className="vs-cap"><b>Hillside Villa</b><span>Còn 2 căn cho 23–25/10</span></div><em>Đặt ngay</em></div>
        <ul><li><span className="vs-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b>Website riêng theo mẫu cho loại hình của bạn</b><span>Khách sạn, homestay &amp; villa, chuỗi.</span></span></li><li><span className="vs-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b>Đặt phòng ngay trên website</b><span>Booking Engine tích hợp sẵn, đặt phòng vào thẳng Bellhop PMS.</span></span></li><li><span className="vs-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b>Đẹp trên điện thoại</b><span>Bố cục tự co giãn theo màn hình.</span></span></li><li><span className="vs-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b>Tự cập nhật ảnh, ưu đãi, bài viết</b><span>Giá phòng lấy tự động từ Bellhop PMS.</span></span></li></ul>
      </div>
    </div>
  </div></section><section className="soft-grid sec" id="mau">
  <div className="wrap stack" style={{ gap: "32px" }}>
    <div className="stack" style={{ gap: "14px" }}>
      <span className="eyebrow">Mẫu website</span>
      <h2 className="h2">Mẫu website theo từng loại hình lưu trú</h2>
      <p className="p" style={{ fontSize: "17px" }}>{v.tpl.desc}</p>
    </div>
    <div className="tpl-tabs" role="tablist">
      
              {(v.tabs || []).map((t, $index) => (
                <React.Fragment key={$index}><button className={`tpl-tab ${t.cls ?? ''}`} type="button" role="tab" aria-pressed={t.pressed} onClick={t.pick}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={t.ic} style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg>{t.label}</button>
                </React.Fragment>
              ))}
    </div>
    <div className="grid3">
      
              {(v.tpl.items || []).map((m, $index) => (
                <React.Fragment key={$index}>
        <div className="tpl-card">
          <div className="tpl-view">
            <div className="tpl-page">
              <div className={`tpl-hero ${m.tone ?? ''}`}><div className="row" style={{ justifyContent: "space-between", gap: "8px", fontSize: "10px" }}><b style={{ letterSpacing: ".14em" }}>{m.brand}</b><span>Phòng · Tiện ích · Ưu đãi</span></div><b style={{ fontSize: "17px", lineHeight: "1.2" }}>{m.head}</b></div>
              <div className="tpl-bk"><span>Nhận phòng · Trả phòng · 2 khách</span><em>Đặt phòng</em></div>
              <div className="tpl-tiles"><i></i><i></i><i></i></div>
              <div className="tpl-ln"><i style={{ width: "46%" }}></i><i style={{ width: "72%" }}></i></div>
              <div className={`tpl-wide ${m.tone ?? ''}`}></div>
              <div className="tpl-tiles"><i></i><i></i><i></i></div>
              <div className="tpl-ln"><i style={{ width: "60%" }}></i><i style={{ width: "40%" }}></i></div>
              <div className="tpl-foot"></div>
            </div>
            <span className="tpl-hint">Rê chuột để xem toàn trang</span>
          </div>
          <div className="tpl-meta"><b>{m.name}</b><span>{m.note}</span></div>
          <a className="tpl-btn" href="#dang-ky">Chọn mẫu này</a>
        </div>
      
                </React.Fragment>
              ))}
    </div>
    
            {Boolean(v.isChain) && (
              <>
      <div className="row" style={{ gap: "10px", flexWrap: "wrap", justifyContent: "center" }}><b style={{ fontSize: "15px" }}>Riêng mẫu Chuỗi:</b><span className="chip">Danh sách cơ sở</span><span className="chip">Trang từng cơ sở</span><span className="chip">Tìm theo điểm đến</span></div>
    
              </>
            )}
    <p className="small center">Hình thu nhỏ minh họa bố cục mẫu; nội dung mẫu là giả định.</p>
  </div></section><section className="sec" id="cau-truc">
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Cấu trúc trang</span>
      <h2 className="h2">Đầy đủ các trang cần thiết cho website lưu trú</h2>
      <p className="lead">Thiết kế đẹp, dễ quản lý, vận hành ổn định và bảo mật – giúp tăng đặt phòng trực tiếp.</p>
    </div>
    <div className="mods2">
      <div className="mod2"><span className="mod2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H4zM9 20h6M12 16v4" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Trang chủ chuyên nghiệp &amp; chuẩn UX/UI</h3><p>Giao diện hiện đại, tối ưu tốc độ tải trang, hình ảnh ấn tượng và tích hợp thanh tìm kiếm, kiểm tra phòng trống trực tiếp.</p></div>
      <div className="mod2"><span className="mod2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M7 10V7h4v3" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Hạng phòng &amp; Giá thời gian thực</h3><p>Trình bày chi tiết từng loại phòng kèm hình ảnh, tiện nghi, sức chứa; giá đồng bộ tức thời với Bellhop PMS.</p></div>
      <div className="mod2"><span className="mod2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M12 8l1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5z" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Giới thiệu Tiện ích &amp; Dịch vụ gia tăng</h3><p>Nhà hàng, hồ bơi, spa, đưa đón sân bay và trải nghiệm – giúp tăng doanh thu trên mỗi lượt khách.</p></div>
      <div className="mod2"><span className="mod2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12l-8 8-8-8V4h8zM8 8h.01" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Chính sách Ưu đãi &amp; Gói Combo</h3><p>Combo nghỉ dưỡng, mã giảm giá, ưu đãi đặt sớm – kích cầu khách đặt trực tiếp thay vì qua OTA.</p></div>
    </div>
    <div className="be-band" id="dat-phong">
      <div className="stack" style={{ gap: "14px", maxWidth: "520px" }}>
        <span className="be-tag">Điểm khác biệt</span>
        <h3 className="h2" style={{ fontSize: "clamp(26px, 2.6vw, 34px)", color: "#fff" }}>Tích hợp sẵn Bellhop Booking Engine</h3>
        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#C3D2F2" }}>Khách đặt phòng ngay trên website – không chuyển sang OTA, không qua tin nhắn. Đặt phòng được ghi vào sơ đồ phòng Bellhop PMS.</p>
        <a className="btn btn-primary" href="https://bellhop.vn/san-pham/bellhop-booking-engine" style={{ alignSelf: "flex-start", marginTop: "6px" }}>Xem Booking Engine →</a>
      </div>
      <div className="be-widget">
        <b style={{ fontSize: "15px" }}>Hillside Villa · Đặt phòng</b>
        <div className="be-row"><span>23/10 → 25/10</span><b>2 đêm</b></div>
        <div className="be-row"><span>Villa 2 phòng ngủ</span><b>6.400.000đ</b></div>
        <span className="be-btn">Xác nhận đặt phòng</span>
        <span className="small center" style={{ fontSize: "12px" }}>Minh họa</span>
      </div>
    </div>
    <div className="mods2">
      <div className="mod2"><span className="mod2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4zM4 15l5-5 5 5 3-3 3 3" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Thư viện hình ảnh sắc nét &amp; chân thực</h3><p>Ảnh chất lượng cao phân loại theo khuôn viên, phòng ngủ, ẩm thực, hoạt động – khách dễ hình dung trước khi đặt.</p></div>
      <div className="mod2"><span className="mod2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Vị trí &amp; Hướng dẫn di chuyển thông minh</h3><p>Tích hợp Google Maps, chỉ đường chi tiết và gợi ý điểm tham quan, ăn uống lân cận.</p></div>
      <div className="mod2"><span className="mod2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Tin tức &amp; Bài viết chuẩn SEO Google</h3><p>Cấu trúc bài viết chuẩn on-page SEO, giúp website lên top tìm kiếm mà không tốn chi phí quảng cáo.</p></div>
      <div className="mod2"><span className="mod2-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3z" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Kênh liên hệ &amp; Đặt phòng trực tiếp 24/7</h3><p>Hotline, Zalo, Messenger cùng công cụ đặt phòng tự động xác nhận, hoạt động liên tục.</p></div>
    </div>
  </div></section><section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="feat rev" id="gia-tu-dong">
      <div className="feat-txt">
        <span className="eyebrow">Giá cập nhật tự động</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Giá trên website luôn khớp với hệ thống</h3>
        <p className="p">Giá và phòng trống lấy từ Bellhop PMS/CMS – khách thấy đúng giá bạn đang bán.</p>
        <ul className="ticks">
          <li><span>Giá và phòng trống lấy từ Bellhop PMS/CMS</span></li>
          <li><span>Giá trên website thống nhất với quy tắc giá các kênh</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms">Bellhop PMS <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-cms">Bellhop CMS <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-tint">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/de8ede5a8ea84f4225237b7fd9aebf2d.png" alt="Màn hình Cấu hình phòng và giá của Bellhop" style={{ display: "block", width: "100%", height: "auto" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-28px 0 0 auto", width: "280px", padding: "16px 18px", display: "flex", gap: "12px", alignItems: "center" }}><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 9h18M7 6.5h.01M10 6.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Deluxe hướng biển</b><span className="small">Trên website · từ 1.290.000đ · Minh họa</span></span></div>
      </div>
    </div>
  </div></section><section className="sec" id="quy-trinh" style={{ paddingTop: "0" }}>
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Triển khai</span><h2 className="h2">Quy trình triển khai website</h2></div>
    <div className="proc">
      <div className="proc-img"><img src="/assets/1feca9cfcb63e1777de6b728389ffe5a.jpg" alt="Villa có hồ bơi" /></div>
      <div className="proc-list">
        <details className="proc-it" name="proc" open={true}>
          <summary><span className="n">01</span><b>Chọn mẫu &amp; tư vấn định hướng</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Chọn phong cách mẫu, được tư vấn định hướng nội dung phù hợp loại hình và SEO.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">02</span><b>Cung cấp nội dung &amp; hình ảnh</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Hình ảnh, mô tả cơ sở, hạng phòng, giá và chính sách.</p><a className="lnk" href="#" style={{ fontSize: "14px", marginTop: "auto" }}>Tải danh sách cần chuẩn bị <span className="arr">→</span></a></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">03</span><b>Cấu hình &amp; đồng bộ hệ thống</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Gắn tên miền riêng, màu sắc và logo thương hiệu; kết nối Booking Engine và Bellhop PMS.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">04</span><b>Kiểm tra &amp; chính thức ra mắt</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Kiểm tra luồng đặt phòng, thanh toán và thông báo trên mọi thiết bị trước khi ra mắt.</p></div>
        </details>
        <p className="small" style={{ marginTop: "16px" }}>Triển khai nhanh, đội Bellhop hỗ trợ trong suốt quá trình.</p>
      </div>
    </div>
  </div></section><section className="soft-grid sec" id="he-sinh-thai">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "820px" }}>
      <span className="eyebrow">Hệ sinh thái</span>
      <h2 className="h2">Kết nối với các sản phẩm Bellhop</h2>
    </div>
    <div className="grid4">
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-booking-engine"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Booking Engine</h3><p className="small">Chức năng đặt phòng có sẵn trên website.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-pms"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Bellhop PMS</h3><p className="small">Đặt phòng từ website được ghi nhận vào sơ đồ phòng.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-cms"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop CMS</h3><p className="small">Giá trên website thống nhất với quy tắc giá các kênh.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-message"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop Message</h3><p className="small">Gom tin nhắn mọi kênh về một nơi.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-ai-concierge"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "1.8", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">AI Concierge</h3><p className="small">Trợ lý AI trả lời khách.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="/san-pham/bellhop-payment"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 10h18M7 15h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Payment</h3><p className="small">Nhận thanh toán online cho cơ sở.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-finance"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Finance</h3><p className="small">Đồng bộ dữ liệu sang phần mềm kế toán.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="/#tong-quan" style={{ background: "#EAF1FF", boxShadow: "none" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Tổng quan nền tảng</h3><p className="small">Dùng riêng từng sản phẩm hoặc kết hợp – tất cả chạy trên cùng một dữ liệu.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Xem tổng quan <span className="arr">→</span></span></a>
    </div>
  </div></section><section className="sec" id="bang-gia" style={{ background: "#fff" }}>
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Gói &amp; giá</span><h2 className="h2">Chi phí Bellhop Website</h2></div>
    <div className="wp-grid">
      <div className="wp-card">
        <div className="wp-head">
        <span className="wp-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5l7-2v18M11 9h9v12M7 8h1M7 12h1M7 16h1M14 13h3M14 17h3M3 21h18" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Khách sạn</h3></div>
        <ul><li>Mẫu ưu tiên hạng phòng, tiện ích</li><li>Booking Engine tích hợp sẵn</li></ul>
        <a className="wp-btn" href="#dang-ky">Đặt lịch tư vấn</a>
      </div>
      <div className="wp-card hi">
        <div className="wp-head">
        <span className="wp-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-5h4v5" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Homestay &amp; Villa</h3></div>
        <ul><li>Mẫu ưu tiên hình ảnh không gian</li><li>Đặt phòng hoặc nguyên căn</li></ul>
        <a className="wp-btn" href="#dang-ky">Đặt lịch tư vấn</a>
      </div>
      <div className="wp-card">
        <div className="wp-head">
        <span className="wp-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V9l5-3 5 3v12M13 21V5l4-2 4 2v16M6 12h4M6 16h4M16 9h2M16 13h2" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Chuỗi</h3></div>
        <ul><li>Danh sách cơ sở, tìm theo điểm đến</li><li>Đặt phòng tập trung</li></ul>
        <a className="wp-btn" href="#dang-ky">Đặt lịch tư vấn</a>
      </div>
    </div>
  </div></section><section className="sec" id="faq">
  <div className="wrap">
    <div className="feat" style={{ alignItems: "start" }}>
      <div className="feat-txt">
        <span className="eyebrow">FAQ</span>
        <h2 className="h2">Câu hỏi thường gặp về Bellhop Website</h2>
        <p className="p">Chưa thấy câu trả lời bạn cần? Đội Bellhop sẵn sàng tư vấn mẫu website phù hợp với cơ sở của bạn.</p>
        <div className="faq-help">
          <b>Chưa thấy câu trả lời?</b>
          <span>Nhắn Zalo hoặc gọi trực tiếp cho đội Bellhop.</span>
          <div className="btns"><a className="btn btn-primary btn-sm" href="#">Chat Zalo</a><a className="btn btn-outline btn-sm" href="tel:0972096499">Gọi 0972 096 499</a></div>
        </div>
      </div>
      <div className="faq">
        <button className="faq-q" type="button" aria-expanded={v.fe.q0} onClick={v.ft.q0}>Có dùng tên miền riêng của khách sạn được không?<span aria-hidden="true">{v.fs.q0}</span></button>
        
                {Boolean(v.fo.q0) && (
                  <><div className="faq-a"><span className="ph">[Câu trả lời]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q1} onClick={v.ft.q1}>Khách sạn có tự chỉnh sửa nội dung website được không?<span aria-hidden="true">{v.fs.q1}</span></button>
        
                {Boolean(v.fo.q1) && (
                  <><div className="faq-a"><span className="ph">[Phạm vi khách tự chỉnh sửa]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q2} onClick={v.ft.q2}>Quyền sở hữu website và tên miền thuộc về ai?<span aria-hidden="true">{v.fs.q2}</span></button>
        
                {Boolean(v.fo.q2) && (
                  <><div className="faq-a"><span className="ph">[Quy định trong hợp đồng]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q3} onClick={v.ft.q3}>Đang có website, có chuyển sang Bellhop Website được không?<span aria-hidden="true">{v.fs.q3}</span></button>
        
                {Boolean(v.fo.q3) && (
                  <><div className="faq-a"><span className="ph">[Hỗ trợ chuyển nội dung, giữ tên miền]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q4} onClick={v.ft.q4}>Chi phí duy trì hằng năm gồm những gì?<span aria-hidden="true">{v.fs.q4}</span></button>
        
                {Boolean(v.fo.q4) && (
                  <><div className="faq-a"><span className="ph">[Hosting, tên miền, bảo trì]</span>. Xem <a className="lnk" href="#bang-gia" style={{ fontSize: "17px" }}>Bảng giá</a>.</div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q5} onClick={v.ft.q5}>Website có hỗ trợ nhiều ngôn ngữ không?<span aria-hidden="true">{v.fs.q5}</span></button>
        
                {Boolean(v.fo.q5) && (
                  <><div className="faq-a"><span className="ph">[Câu trả lời]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q6} onClick={v.ft.q6}>Có thể chỉ gắn Booking Engine vào website hiện tại thay vì làm website mới không?<span aria-hidden="true">{v.fs.q6}</span></button>
        
                {Boolean(v.fo.q6) && (
                  <><div className="faq-a">Có. Xem <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-booking-engine" style={{ fontSize: "17px" }}>Bellhop Booking Engine</a>.</div>
                  </>
                )}
      </div>
    </div>
  </div></section><section className="sec" id="dang-ky" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="lead2">
      <div className="stack" style={{ gap: "22px" }}>
        <span className="kick lt" style={{ color: "#8BE3E8" }}>Bắt đầu cùng Bellhop</span>
        <h2 className="h2">Đặt lịch tư vấn website cho cơ sở lưu trú</h2>
        <p className="sub">Để lại thông tin, đội Bellhop sẽ liên hệ tư vấn mẫu website phù hợp với loại hình và kế hoạch bán phòng trực tiếp của cơ sở.</p>
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
          <div className="row" style={{ justifyContent: "space-between", gap: "12px" }}><h3 className="h3">Đặt lịch tư vấn website</h3><span className="small" style={{ fontSize: "12px" }}><span style={{ color: "#C2410C" }}>*</span> bắt buộc</span></div>
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
            <div className="fld"><label htmlFor="f-mgmt">Đang quản lý bằng</label><select id="f-mgmt" className="inp2" value={v.form.f.mgmt ?? ''} onChange={v.form.on.mgmt}><option value="">Chọn cách quản lý</option><option>Sổ tay / Excel</option><option>Phần mềm khác</option></select></div>
            <div className="fld"><label htmlFor="f-site">Website hiện tại (nếu có)</label><input id="f-site" className="inp2" value={v.form.f.site ?? ''} onChange={v.form.on.site} placeholder="vd: khachsan.vn" /></div>
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
          <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>Đặt lịch tư vấn <span>→</span></button>
        
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
