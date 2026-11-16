import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class BookingEnginePage extends DCLogic {
  constructor(p) { super(p); this.state = { f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', consent: false }, prods: ['Booking Engine'], err: {}, sent: false, g: 0, open: 0, n: '300', price: '900000', rate: '18', shift: '20' }; }
  renderVals() {
    const s = this.state;
    const G = [
      { label: '1 · Chọn ngày', num: 'Bước 1', title: 'Chọn ngày và số khách', desc: 'Khách chọn ngày nhận, trả phòng và số người ngay trên website của cơ sở.' },
      { label: '2 · Chọn phòng', num: 'Bước 2', title: 'Chọn hạng phòng, xem giá và chính sách', desc: 'Hạng phòng còn trống hiện kèm hình ảnh, diện tích, tiện nghi, giá theo ngày và chính sách hủy.' },
      { label: '3 · Xác nhận', num: 'Bước 3', title: 'Nhập thông tin và xác nhận', desc: 'Khách điền thông tin liên hệ, yêu cầu thêm và xác nhận đặt phòng; đặt phòng vào thẳng Bellhop PMS.' }
    ];
    const gsteps = G.map((t, i) => ({ label: t.label, cls: i === s.g ? 'on' : '', pressed: i === s.g ? 'true' : 'false', pick: () => this.setState({ g: i }) }));
    const num = (v) => { const x = Number(v); return isFinite(x) && x > 0 ? x : 0; };
    const pct = (v) => Math.min(100, num(v));
    const fmt = (x) => Math.round(x).toLocaleString('vi-VN') + 'đ';
    const comm = num(s.n) * num(s.price) * pct(s.rate) / 100;
    const kept = comm * pct(s.shift) / 100;
    const calc = { n: s.n, price: s.price, rate: s.rate, shift: s.shift, comm: fmt(comm), kept: fmt(kept), year: fmt(kept * 12) };
    const F = [
      { q: 'Bellhop Booking Engine có thu phí theo mỗi đặt phòng không?', a: '[Mô tả mô hình phí – xem Bảng giá]', ph: true },
      { q: 'Có gắn được vào website hiện tại của khách sạn không?', a: '[Cách tích hợp; nền tảng website hỗ trợ]', ph: true },
      { q: 'Khách thanh toán như thế nào khi đặt phòng?', a: '[Hình thức đảm bảo đặt phòng ở giai đoạn hiện tại]', ph: true },
      { q: 'Có xảy ra trùng phòng giữa website và OTA không?', a: 'Khi dùng kèm Bellhop CMS, tồn phòng được cập nhật đồng thời trên các kênh, giúp hạn chế trùng phòng.', ph: false },
      { q: 'Có bắt buộc dùng Bellhop PMS không?', a: '[Câu trả lời]', ph: true },
      { q: 'Thời gian triển khai bao lâu?', a: '[Thời gian triển khai trung bình]', ph: true }
    ];
    const faq = F.map((x, i) => {
      const o = s.open === i;
      return { q: x.q, a: x.a, isPh: x.ph, isTxt: !x.ph, open: o, exp: o ? 'true' : 'false', sign: o ? '−' : '+', toggle: () => this.setState({ open: o ? -1 : i }) };
    });
    // Form đăng ký
    const _fs = this.state, _ff = _fs.f;
    const _setF = (k, v) => this.setState({ f: Object.assign({}, this.state.f, { [k]: v }) });
    const _on = {};
    ['name', 'phone', 'email', 'org', 'type', 'rooms'].forEach((k) => { _on[k] = (e) => _setF(k, e.target.value); });
    _on.consent = (e) => _setF('consent', e.target.checked);
    const _PR = ['Bellhop PMS', 'Booking Engine', 'CMS', 'Website', 'Message', 'AI Concierge', 'Payment', 'Finance'];
    const _prods = _PR.map((label) => {
      const sel = _fs.prods.indexOf(label) >= 0;
      return { label, cls: sel ? 'on' : '', pressed: sel ? 'true' : 'false', toggle: () => this.setState({ prods: sel ? this.state.prods.filter((x) => x !== label) : this.state.prods.concat([label]) }) };
    });
    const _submit = (e) => {
      e.preventDefault();
      const _ph = (_ff.phone || '').replace(/[\s.\-]/g, '');
      const _err = { name: !_ff.name.trim(), phone: !/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(_ph), consent: !_ff.consent };
      if (_err.name || _err.phone || _err.consent) { this.setState({ err: _err }); return; }
      this.setState({ sent: true, err: {} });
    };
    const _form = {
      f: _ff, on: _on, prods: _prods, submit: _submit, err: _fs.err,
      nameCls: _fs.err.name ? 'err' : '', phoneCls: _fs.err.phone ? 'err' : '',
      sent: _fs.sent, notSent: !_fs.sent, reset: () => this.setState({ sent: false })
    };

    return { form: _form,
      gsteps, gs: G[s.g], isG1: s.g === 0, isG2: s.g === 1, isG3: s.g === 2,
      calc,
      onN: (e) => this.setState({ n: e.target.value }),
      onP: (e) => this.setState({ price: e.target.value }),
      onR: (e) => this.setState({ rate: e.target.value }),
      onS: (e) => this.setState({ shift: e.target.value }),
      faq
    };
  }

  componentDidMount() {
    document.title = "Bellhop Booking Engine – Nhận đặt phòng trực tiếp trên website";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="booking" startOpen={false} /><section className="be-hero">
  <div className="be-photo" aria-hidden="true"><img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="" /></div>
  <div className="wrap be-hero-in">
    <div className="stack be-copy" style={{ gap: "22px" }}>
      <nav className="be-crumb" aria-label="Breadcrumb"><a href="/">Trang chủ</a><span>/</span><a href="/#tong-quan">Sản phẩm</a><span>/</span><span>Bellhop Booking Engine</span></nav>
      <h1 className="be-h1">Nhận đặt phòng trực tiếp trên website, giảm chi phí hoa hồng OTA</h1>
      <p className="be-lead">Bellhop Booking Engine bổ sung chức năng đặt phòng cho website của khách sạn. Khách xem phòng trống, giá theo ngày và hoàn tất đặt phòng ngay trên website; đặt phòng tự vào Bellhop PMS.</p>
      <div className="btns" style={{ marginTop: "6px" }}><a className="btn be-btn" href="#dang-ky">Đặt lịch demo</a><a className="btn be-btn-o" href="#uoc-tinh">Ước tính chi phí hoa hồng</a></div>
    </div>
    <div className="be-frame">
      <div className="frame-bar"><i></i><i></i><i></i><span>www.khachsanmau.vn/dat-phong</span></div>
      <img src="/assets/d8e97cd43f9f645eec6abba0f8eee195.png" alt="Màn hình danh sách đặt phòng của Bellhop" />
    </div>
  </div></section><section className="soft-grid sec">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "820px" }}>
      <span className="eyebrow">Vấn đề</span>
      <h2 className="h2">Bán phòng chủ yếu qua OTA đang khiến bạn tốn kém hơn bạn nghĩ</h2>
    </div>
    <div className="grid4">
      <div className="fcard"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19L19 5M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Chi phí hoa hồng tăng theo doanh thu</h3><p className="p" style={{ fontSize: "16px" }}>Mỗi đặt phòng qua OTA đều phát sinh hoa hồng 15–25%; doanh thu càng cao, chi phí càng lớn.</p></div>
      <div className="fcard"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h3l1.5 4-2 1.5a10 10 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Website chưa nhận đặt phòng</h3><p className="p" style={{ fontSize: "16px" }}>Khách phải gọi điện hoặc nhắn tin để hỏi phòng, nhiều trường hợp không quay lại.</p></div>
      <div className="fcard"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Xác nhận đặt phòng thủ công</h3><p className="p" style={{ fontSize: "16px" }}>Thông tin qua tin nhắn cần kiểm tra phòng trống, báo giá, ghi chép lại – dễ sai sót và chậm phản hồi.</p></div>
      <div className="fcard"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Thiếu dữ liệu khách đặt trực tiếp</h3><p className="p" style={{ fontSize: "16px" }}>Thông tin khách nằm ở OTA, khó chăm sóc lại và xây dựng tệp khách quen.</p></div>
    </div>
  </div></section><section className="sec" id="cach-hoat-dong">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}>
      <span className="eyebrow">Cách hoạt động</span>
      <h2 className="h2">Từ website đến sơ đồ phòng, không cần nhập tay</h2>
    </div>
    <div className="proc">
      <div className="proc-img"><img src="/assets/63e0d2bfe1224291a4be1d6730facb48.jpg" alt="Quầy lễ tân khách sạn" /></div>
      <div className="proc-list">
        <details className="proc-it" name="proc" open={true}>
          <summary><span className="n">01</span><b>Khách vào website</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Khách truy cập website của cơ sở và chọn ngày lưu trú, số khách.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">02</span><b>Xem phòng trống &amp; giá</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Hệ thống hiển thị hạng phòng còn trống cùng giá theo ngày, lấy từ Bellhop PMS.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">03</span><b>Xác nhận đặt phòng</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Khách nhập thông tin và xác nhận đặt phòng.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">04</span><b>Vào thẳng PMS</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Đặt phòng được ghi nhận ngay trên sơ đồ phòng của Bellhop PMS.</p></div>
        </details>
      </div>
    </div>
  </div></section><section className="sec" id="tinh-nang" style={{ paddingTop: "0" }}>
  <div className="wrap stack" style={{ gap: "120px" }}>
    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Tìm &amp; đặt phòng</span>
        <h2 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Khách tự tìm phòng và đặt ngay, không phải chờ trả lời</h2>
        <p className="p">Đầy đủ thông tin về phòng, giá và chính sách ngay trên website – khách quyết định nhanh hơn.</p>
        <ul className="ticks">
          <li><span><b>Tìm phòng theo ngày</b>: lọc theo ngày lưu trú và số khách</span></li>
          <li><span><b>Trang hạng phòng</b>: hình ảnh, diện tích, tiện nghi, chính sách hủy</span></li>
          <li><span><b>Giá theo ngày</b>: đồng bộ với PMS và CMS, gồm cả giá linh động</span></li>
        </ul>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ overflow: "hidden", maxWidth: "440px", margin: "0 auto" }}>
          <img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="" style={{ display: "block", width: "100%", height: "180px", objectFit: "cover" }} />
          <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px" }}><b style={{ fontSize: "19px" }}>Deluxe giường đôi</b><span className="chip" style={{ height: "24px", fontSize: "12px" }}>Còn 2 phòng</span></div>
            <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip" style={{ background: "#F5F8FE" }}>25 m²</span><span className="chip" style={{ background: "#F5F8FE" }}>Ban công</span><span className="chip" style={{ background: "#F5F8FE" }}>Bữa sáng</span></div>
            <span className="small">Hủy miễn phí trước 3 ngày</span>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", paddingTop: "14px", borderTop: "1px solid #E3E8F2" }}><span><b style={{ fontSize: "22px" }}>890.000đ</b> <span className="small">/đêm</span></span><span className="btn btn-primary btn-sm">Đặt ngay</span></div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        </div>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Đồng bộ PMS</span>
        <h2 className="h2" style={{ fontSize: "clamp(26px, 2.6vw, 38px)", textWrap: "nowrap" }}>Mỗi đặt phòng trực tiếp<br />tự vào sơ đồ phòng</h2>
        <p className="p">Không còn kiểm tra phòng trống, báo giá rồi ghi chép lại bằng tay – lễ tân thấy ngay đặt phòng mới trên Bellhop PMS.</p>
        <ul className="ticks">
          <li><span><b>Thời gian thực</b>: phòng trống và giá đồng bộ với Bellhop PMS</span></li>
          <li><span><b>Ghi vào sơ đồ phòng và timeline</b> tự động, không nhập lại</span></li>
          <li><span><b>Ghi nhận nguồn đặt</b>: đánh giá hiệu quả kênh trực tiếp</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms">Tìm hiểu Bellhop PMS <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/d8e97cd43f9f645eec6abba0f8eee195.png" alt="Màn hình Danh sách đặt phòng của Bellhop" style={{ display: "block", width: "100%", height: "auto" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-32px 0 0 auto", width: "290px", padding: "16px 18px", display: "flex", gap: "12px", alignItems: "center" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Đặt phòng trực tiếp mới</b><span className="small">Deluxe · 2 đêm · 1.780.000đ</span></span></div>
      </div>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Phù hợp với cơ sở của bạn</span>
        <h2 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Có website hay chưa, bạn đều bắt đầu được</h2>
        <p className="p">Gắn Booking Engine vào website hiện có, hoặc dùng Bellhop Website đã tích hợp sẵn.</p>
        <ul className="ticks">
          <li><span><b>Đã có website</b>: bổ sung chức năng đặt phòng vào website hiện tại</span></li>
          <li><span><b>Chưa có website</b>: kết hợp Bellhop Website đã tích hợp sẵn Booking Engine</span></li>
          <li><span><b>Dùng kèm Bellhop CMS</b>: tồn phòng được trừ đồng thời trên các kênh OTA; giá linh động áp dụng cho cả kênh trực tiếp</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-website">Xem Bellhop Website <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-cms">Bellhop CMS <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-tint-c">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/de8ede5a8ea84f4225237b7fd9aebf2d.png" alt="Màn hình Cấu hình phòng và giá của Bellhop" style={{ display: "block", width: "100%", height: "auto" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-30px auto 0 24px", width: "min(320px, 90%)", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <b style={{ fontSize: "15px" }}>Một bảng giá, mọi kênh bán</b>
          <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip">Website</span><span className="chip">Bellhop PMS</span><span className="chip">Kênh OTA</span></div>
        </div>
      </div>
    </div>
  </div></section><section className="sec" id="cai-dat">
  <div className="wrap">
    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Có trong gói miễn phí</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Thiết lập một lần, dùng hằng ngày</h3>
        <p className="p">Cấu hình theo đúng cách cơ sở bạn đang vận hành.</p>
        <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip">Thông tin cơ sở &amp; liên hệ</span><span className="chip">Sơ đồ phòng</span><span className="chip">Hạng phòng &amp; giá</span><span className="chip">Phân loại đặt phòng</span><span className="chip">Dịch vụ</span><span className="chip">Thuế/phí</span><span className="chip">Máy in &amp; mẫu in</span><span className="chip">Thu chi &amp; kho</span><span className="chip">Tỷ giá</span><span className="chip">Tài khoản &amp; phân quyền</span></div>
      </div>
      <div className="feat-vis bg-tint">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/de8ede5a8ea84f4225237b7fd9aebf2d.png" alt="Màn hình Cấu hình phòng và giá của Bellhop PMS" style={{ display: "block", width: "100%", height: "auto" }} /></div>
      </div>
    </div>
    <div className="btns" style={{ justifyContent: "center", marginTop: "56px" }}><a className="btn btn-primary" href="#dang-ky">Bắt đầu cài đặt miễn phí</a></div>
  </div></section><section className="soft-grid sec" id="trai-nghiem">
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Trải nghiệm của khách</span>
      <h2 className="h2">Giao diện đặt phòng rõ ràng trên mọi thiết bị</h2>
      <p className="lead">Khách hoàn tất đặt phòng chỉ trong vài bước, với đầy đủ thông tin về phòng, giá và chính sách trước khi xác nhận.</p>
    </div>
    <div className="ph3">
      <div className="ph3-phone"><div className="ph3-scr">
        <div className="ph3-h"><b>1. Chọn ngày &amp; khách</b><small>Khách sạn Bellhop Boutique</small></div>
        <div className="ph3-b">
          <div className="ph3-f"><small>Ngày nhận – trả phòng</small><b>23/10 – 25/10 (2 đêm)</b></div>
          <div className="ph3-f"><small>Số lượng khách</small><b>2 người lớn · 0 trẻ em</b></div>
          <div className="ph3-cal"><b>Tháng 10 · 2026</b><div className="ph3-g hd"><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span></div><div className="ph3-g"><span className="">19</span><span className="">20</span><span className="">21</span><span className="">22</span><span className="on">23</span><span className="on">24</span><span className="">25</span></div><div className="ph3-g"><span className="">26</span><span className="">27</span><span className="">28</span><span className="">29</span><span className="">30</span><span className="">31</span><span className="mut">1</span></div><span className="ph3-sel">Đã chọn: 23/10 → 25/10 (2 đêm)</span></div>
        </div>
        <span className="ph3-btn navy">Tìm phòng</span>
      </div></div>
      <div className="ph3-phone"><div className="ph3-scr">
        <div className="ph3-h"><b>2. Chọn hạng phòng</b><small>23 – 25/10 · 2 khách</small></div>
        <div className="ph3-b">
          <div className="ph3-room"><img src="/assets/184ed4c8d5b0f118849e24490114f4af.jpg" alt="" /><div><b>Phòng Deluxe Đôi</b><small>25m² · Cửa sổ phố · Bữa sáng</small><div className="ph3-pr"><span><b>890.000đ</b>/đêm</span><em className="t">Chọn</em></div></div></div>
          <div className="ph3-room"><img src="/assets/1feca9cfcb63e1777de6b728389ffe5a.jpg" alt="" /><div><b>Phòng Family Suite</b><small>40m² · 2 giường lớn · Ban công</small><div className="ph3-pr"><span><b>1.350.000đ</b>/đêm</span><em>Chọn</em></div></div></div>
        </div>
        <span className="ph3-btn teal">Tiếp tục đặt phòng</span>
      </div></div>
      <div className="ph3-phone"><div className="ph3-scr">
        <div className="ph3-h"><b>3. Xác nhận đặt phòng</b><small>Deluxe · 2 đêm · 2 khách</small></div>
        <div className="ph3-b">
          <div className="ph3-f"><small>Họ và tên</small><b>Nguyễn Thu Hà</b></div>
          <div className="ph3-f"><small>Số điện thoại</small><b>0912 345 678</b></div>
          <div className="ph3-sum"><div><span>Tiền phòng (2 đêm):</span><b>1.780.000đ</b></div><div><span>Giảm giá trực tiếp:</span><b className="g">-100.000đ</b></div><div className="tot"><span>Tổng thanh toán:</span><b>1.680.000đ</b></div></div>
          <span className="ph3-ok">✓ Giữ phòng tức thì · Không cần cọc</span>
        </div>
        <span className="ph3-btn teal">Hoàn tất đặt phòng</span>
      </div></div>
    </div>
    <p className="small center" style={{ fontSize: "12px" }}>Giao diện minh họa</p>
  </div></section><section className="sec" id="uoc-tinh">
  <div className="wrap">
    <div className="calc2">
      <div className="stack" style={{ gap: "22px" }}>
        <span className="kick lt">Công cụ miễn phí</span>
        <h2 className="h2" style={{ fontSize: "clamp(26px, 2.6vw, 38px)", textWrap: "nowrap" }}>Ước tính chi phí hoa hồng OTA<br />có thể tiết kiệm</h2>
        <p className="sub">Nhập vài con số để ước tính khoản có thể giữ lại khi chuyển một phần đặt phòng sang kênh trực tiếp.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}>
          <div className="calc-f"><label htmlFor="be-n">Số đêm phòng bán qua OTA / tháng</label><input id="be-n" className="calc-in" type="number" min="0" step="10" inputMode="numeric" value={v.calc.n ?? ''} onChange={v.onN} /></div>
          <div className="calc-f"><label htmlFor="be-p">Giá phòng trung bình (đ/đêm)</label><input id="be-p" className="calc-in" type="number" min="0" step="50000" inputMode="numeric" value={v.calc.price ?? ''} onChange={v.onP} /></div>
        </div>
        <div className="calc-f" style={{ maxWidth: "200px" }}><label htmlFor="be-r">% hoa hồng OTA</label><input id="be-r" className="calc-in" type="number" min="0" max="100" step="1" inputMode="decimal" value={v.calc.rate ?? ''} onChange={v.onR} /></div>
        <div className="calc-f">
          <label htmlFor="be-s" style={{ display: "flex", justifyContent: "space-between" }}><span>% đặt phòng có thể chuyển sang trực tiếp</span><b style={{ color: "#5FB9C2", fontSize: "17px" }}>{v.calc.shift}%</b></label>
          <input id="be-s" className="calc-range" type="range" min="10" max="30" step="1" value={v.calc.shift ?? ''} onChange={v.onS} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#8FA3BB" }}><span>10%</span><span>30%</span></div>
        </div>
      </div>
      <div className="calc-res" aria-live="polite">
        <div className="row" style={{ gap: "12px" }}><span className="seg-ic" style={{ width: "40px", height: "40px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h10l4 4v12H5zM9 12h6M9 16h4" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span className="lab">Kết quả ước tính</span></div>
        <div className="stack" style={{ gap: "6px" }}><span className="small">Hoa hồng đang trả mỗi tháng</span><span className="big">{v.calc.comm}</span></div>
        <div className="div"></div>
        <div className="stack" style={{ gap: "6px" }}><span className="small">Ước tính có thể giữ lại mỗi tháng</span><span className="big t">{v.calc.kept}</span><span className="small" style={{ fontSize: "13px" }}>≈ {v.calc.year} mỗi năm · khi chuyển {v.calc.shift}% sang kênh trực tiếp</span></div>
        <p className="nb">Kết quả chỉ là ước tính, chưa trừ phí sử dụng Booking Engine và chi phí vận hành kênh trực tiếp, không phải cam kết.</p>
        <a className="btn btn-navy" href="#dang-ky" style={{ alignSelf: "flex-start" }}>Đặt lịch demo Booking Engine <span>→</span></a>
      </div>
    </div>
  </div></section><section className="soft-grid sec" id="ket-noi">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "760px" }}>
      <span className="eyebrow">Hệ sinh thái</span>
      <h2 className="h2">Kết nối với các sản phẩm Bellhop</h2>
      <p className="lead">Booking Engine chạy trên cùng dữ liệu với các sản phẩm khác – không nhập lại, không lệch số.</p>
    </div>
    <div className="grid4">
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-pms"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Bellhop PMS</h3><p className="small">Đặt phòng tự động ghi nhận vào sơ đồ phòng và timeline.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-cms"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop CMS</h3><p className="small">Tồn phòng được trừ đồng thời trên các kênh OTA; giá linh động áp dụng cho cả kênh trực tiếp.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-website"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 9h18M7 6.5h.01M10 6.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Website</h3><p className="small">Website tích hợp sẵn Booking Engine.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-message"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop Message</h3><p className="small">Gom tin nhắn mọi kênh về một nơi.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-ai-concierge"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "1.8", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">AI Concierge</h3><p className="small">Trợ lý AI trả lời câu hỏi thường gặp của khách.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="/san-pham/bellhop-payment"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 10h18M7 15h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Payment</h3><p className="small">Nhận thanh toán online cho cơ sở.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-finance"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Finance</h3><p className="small">Đồng bộ dữ liệu sang phần mềm kế toán.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="/#tong-quan" style={{ background: "#EAF1FF", boxShadow: "none" }}><h3 className="h4">Tổng quan nền tảng</h3><p className="small">Dùng riêng từng sản phẩm hoặc kết hợp – tất cả trên cùng một dữ liệu.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem tổng quan <span className="arr">→</span></span></a>
    </div>
  </div></section><section className="sec" id="phu-hop">
  <div className="wrap stack" style={{ gap: "40px" }}>
    <h2 className="h2 center">Phù hợp với các cơ sở lưu trú</h2>
    <div className="fit3">
      <div className="fit-c">
        <div className="fit-art"><svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sk1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1B2B4D"></stop><stop offset="1" stopColor="#4A5C86"></stop></linearGradient></defs><rect width="400" height="220" fill="url(#sk1)"></rect><rect x="10" y="70" width="60" height="150" fill="#1A2540"></rect><rect x="300" y="60" width="70" height="160" fill="#1A2540"></rect><rect x="22" y="86" width="8" height="10" fill="#2E3F66"></rect><rect x="22" y="110" width="8" height="10" fill="#2E3F66"></rect><rect x="22" y="134" width="8" height="10" fill="#2E3F66"></rect><rect x="22" y="158" width="8" height="10" fill="#2E3F66"></rect><rect x="44" y="86" width="8" height="10" fill="#2E3F66"></rect><rect x="44" y="110" width="8" height="10" fill="#2E3F66"></rect><rect x="44" y="134" width="8" height="10" fill="#2E3F66"></rect><rect x="44" y="158" width="8" height="10" fill="#2E3F66"></rect><rect x="316" y="86" width="8" height="10" fill="#2E3F66"></rect><rect x="316" y="110" width="8" height="10" fill="#2E3F66"></rect><rect x="316" y="134" width="8" height="10" fill="#2E3F66"></rect><rect x="316" y="158" width="8" height="10" fill="#2E3F66"></rect><rect x="342" y="86" width="8" height="10" fill="#2E3F66"></rect><rect x="342" y="110" width="8" height="10" fill="#2E3F66"></rect><rect x="342" y="134" width="8" height="10" fill="#2E3F66"></rect><rect x="342" y="158" width="8" height="10" fill="#2E3F66"></rect><rect x="118" y="30" width="130" height="190" fill="#E8D7B4"></rect><rect x="150" y="22" width="66" height="6" rx="3" fill="#3FB6B0"></rect><rect x="132" y="44" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="160" y="44" width="14" height="18" rx="2" fill="#1E3157"></rect><rect x="188" y="44" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="216" y="44" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="132" y="74" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="160" y="74" width="14" height="18" rx="2" fill="#1E3157"></rect><rect x="188" y="74" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="216" y="74" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="132" y="104" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="160" y="104" width="14" height="18" rx="2" fill="#1E3157"></rect><rect x="188" y="104" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="216" y="104" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="132" y="134" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="160" y="134" width="14" height="18" rx="2" fill="#1E3157"></rect><rect x="188" y="134" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="216" y="134" width="14" height="18" rx="2" fill="#F6E7B0"></rect><rect x="110" y="164" width="146" height="10" rx="2" fill="#2F9B95"></rect><rect x="164" y="184" width="38" height="36" fill="#E9D27A"></rect></svg><span className="fit-tag">Khách sạn</span><span className="fit-pill"><i><svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"></rect><path d="M4 10h16M9 3v4M15 3v4M8.5 14h2M13.5 14h2"></path></svg></i><b>Đặt phòng ngay</b></span></div>
        <div className="fit-b"><h3>Đã có website</h3><p>Bổ sung chức năng đặt phòng vào website hiện tại.</p><span className="fit-chip y">⚠ Mã nhúng / đường dẫn</span><a className="fit-btn" href="#dang-ky">Đặt lịch demo</a></div>
      </div>
      <div className="fit-c">
        <div className="fit-art"><svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2B1F45"></stop><stop offset="1" stopColor="#7A5468"></stop></linearGradient></defs><rect width="400" height="220" fill="url(#sk2)"></rect><circle cx="318" cy="38" r="15" fill="#FBEFC2"></circle><path d="M0 190 Q120 150 230 180 T400 170 V220 H0Z" fill="#244A35"></path><path d="M80 112 L170 52 L260 112Z" fill="#B85A2A"></path><rect x="96" y="110" width="148" height="100" fill="#F8E8B8"></rect><path d="M96 112 Q130 124 170 114 T244 114" fill="none" stroke="#F2D27A" strokeWidth="2" strokeDasharray="2 6"></path><rect x="116" y="134" width="30" height="30" fill="#E8B54A"></rect><path d="M131 134v30M116 149h30" stroke="#B8732A" strokeWidth="2"></path><rect x="194" y="134" width="30" height="30" fill="#E8B54A"></rect><path d="M209 134v30M194 149h30" stroke="#B8732A" strokeWidth="2"></path><rect x="158" y="146" width="24" height="64" fill="#7A3F22"></rect><circle cx="64" cy="196" r="24" fill="#2F7A4A"></circle><circle cx="92" cy="200" r="18" fill="#2F7A4A"></circle><rect x="250" y="190" width="6" height="14" fill="#B85A2A"></rect><circle cx="253" cy="186" r="6" fill="#3FA35A"></circle></svg><span className="fit-tag">Homestay</span><span className="fit-pill"><i><svg viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path><path d="M8 10h8M8 13h5"></path></svg></i><span><b>Link đặt phòng</b><small>Gửi khách qua tin nhắn</small></span></span></div>
        <div className="fit-b"><h3>Bán qua fanpage, mạng xã hội</h3><p>Dùng đường dẫn đặt phòng thay cho trao đổi qua tin nhắn.</p><span className="fit-chip g">✓ Tự động hóa chốt phòng</span><a className="fit-btn" href="#dang-ky">Đặt lịch demo</a></div>
      </div>
      <div className="fit-c dark">
        <div className="fit-art"><svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sk3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5DB4E6"></stop><stop offset="1" stopColor="#BFE3F7"></stop></linearGradient></defs><rect width="400" height="220" fill="url(#sk3)"></rect><rect y="168" width="400" height="52" fill="#4CC07A"></rect><rect x="110" y="40" width="190" height="8" fill="#5E6B80"></rect><rect x="128" y="48" width="150" height="40" fill="#F4F7FA"></rect><rect x="138" y="54" width="130" height="28" fill="#9FD3F2"></rect><rect x="96" y="90" width="210" height="8" fill="#5E6B80"></rect><rect x="104" y="98" width="196" height="80" fill="#F4F7FA"></rect><rect x="116" y="110" width="96" height="58" fill="#B7DFF6"></rect><path d="M164 110v58" stroke="#F4F7FA" strokeWidth="3"></path><rect x="226" y="112" width="58" height="66" fill="#1A2238"></rect><rect x="88" y="178" width="232" height="34" rx="4" fill="#2C8BE0"></rect><path d="M110 192 q16 -6 32 0 t32 0 M200 200 q16 -6 32 0 t32 0" fill="none" stroke="#9FD3F2" strokeWidth="2"></path><path d="M52 210 Q48 140 60 90" fill="none" stroke="#8A4B2A" strokeWidth="5"></path><path d="M60 90 q-30 -6 -44 14 M60 90 q-18 -22 -42 -18 M60 90 q24 -20 46 -10 M60 90 q30 2 40 24" fill="none" stroke="#2E8B4A" strokeWidth="6" strokeLinecap="round"></path><path d="M356 214 Q362 150 348 104" fill="none" stroke="#8A4B2A" strokeWidth="5"></path><path d="M348 104 q-30 -4 -42 16 M348 104 q-14 -22 -40 -18 M348 104 q26 -18 44 -6 M348 104 q28 4 36 26" fill="none" stroke="#2E8B4A" strokeWidth="6" strokeLinecap="round"></path></svg><span className="fit-tag">Villa / Resort</span><span className="fit-pill"><i><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 17v3"></path></svg></i><b>Website + Booking</b></span></div>
        <div className="fit-b"><h3>Chưa có website</h3><p>Kết hợp Bellhop Website đã tích hợp sẵn Booking Engine.</p><a className="fit-lnk" href="https://bellhop.vn/san-pham/bellhop-website">Xem Bellhop Website →</a></div>
      </div>
    </div>
  </div></section><section className="soft-grid sec-sm" id="gia">
  <div className="wrap">
    <div className="price-band">
      <div className="stack" style={{ gap: "14px" }}>
        <span className="eyebrow">Gói &amp; giá</span>
        <h2 className="h2" style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}>Chi phí sử dụng Bellhop Booking Engine</h2>
        <p className="pb-sub">Đội Bellhop tư vấn gói phù hợp với website hiện có và quy mô cơ sở của bạn.</p>
        <div className="btns" style={{ marginTop: "8px" }}><a className="btn btn-primary" href="#dang-ky">Đặt lịch Demo</a></div>
      </div>
      <div className="pb-vis" aria-hidden="true">
        <svg className="pb-lines" viewBox="0 0 400 260" preserveAspectRatio="none"><path d="M200 130 L70 40 M200 130 L330 40 M200 130 L70 220 M200 130 L330 220" style={{ fill: "none", stroke: "url(#pbg2)", strokeWidth: "1.6", strokeDasharray: "5 6" }}></path><defs><linearGradient id="pbg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3FE0FF"></stop><stop offset="1" stopColor="#1450F0"></stop></linearGradient></defs></svg>
        <span className="pb-node" style={{ left: "4%", top: "6%" }}>Website khách sạn</span>
        <span className="pb-node" style={{ right: "4%", top: "6%" }}>Bellhop Website</span>
        <span className="pb-node" style={{ left: "4%", bottom: "6%" }}>Bellhop PMS</span>
        <span className="pb-node" style={{ right: "4%", bottom: "6%" }}>Bellhop CMS</span>
        <span className="pb-core"><svg viewBox="0 0 24 24"><path d="M4 5h16v15H4zM4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg><b>Booking Engine</b><span>Đặt phòng trực tiếp</span></span>
      </div>
    </div>
  </div></section><section className="sec" id="faq">
  <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "flex-start" }}>
    <div className="stack" style={{ gap: "16px", flex: "1 1 300px" }}>
      <span className="eyebrow">FAQ</span>
      <h2 className="h2">Câu hỏi thường gặp</h2>
      <p className="p">Chưa thấy câu trả lời bạn cần? </p><div className="faq-help">
          <b>Chưa thấy câu trả lời?</b>
          <span>Nhắn Zalo hoặc gọi trực tiếp cho đội Bellhop.</span>
          <div className="btns"><a className="btn btn-primary btn-sm" href="#">Chat Zalo</a><a className="btn btn-outline btn-sm" href="tel:0972096499">Gọi 0972 096 499</a></div>
        </div><p></p>
    </div>
    <div className="faq" style={{ flex: "2 1 480px", minWidth: "0" }}>
      
              {(v.faq || []).map((f, $index) => (
                <React.Fragment key={$index}>
        <div>
          <button className="faq-q" type="button" aria-expanded={f.exp} onClick={f.toggle}><span>{f.q}</span><span aria-hidden="true" style={{ fontSize: "24px", color: "#1450F0" }}>{f.sign}</span></button>
          
                    {Boolean(f.open) && (
                      <>
            <div className="faq-a">
              
                        {Boolean(f.isPh) && (
                          <><span className="ph">{f.a}</span>
                          </>
                        )}
              
                        {Boolean(f.isTxt) && (
                          <><span>{f.a}</span>
                          </>
                        )}
            </div>
          
                      </>
                    )}
        </div>
      
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
