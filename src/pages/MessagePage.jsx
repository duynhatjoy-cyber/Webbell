import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class MessagePage extends DCLogic {
  constructor(p) { super(p); this.state = { f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', consent: false }, prods: ['Message'], err: {}, sent: false, m: 0, open: 0 }; }
  renderVals() {
    const s = this.state;
    const M = [
      { time: '08:00', title: 'Tin nhắn qua đêm', body: 'Các câu hỏi gửi ngoài giờ được tập trung trong hộp thư, đánh dấu chưa xử lý; ca sáng tiếp nhận đầy đủ mà không cần mở từng ứng dụng.', feat: 'Hộp thư hợp nhất · trạng thái hội thoại', head: '5 hội thoại chưa xử lý', feature: 'Chưa xử lý',
        rows: [{ av: 'JK', tile: 't-sky', name: 'Jun Kim', tag: '23:40', msg: 'Is breakfast included?' }, { av: 'LA', tile: 't-orange', name: 'Lan Anh', tag: '00:15', msg: 'Có chỗ đậu ô tô không?' }, { av: 'QB', tile: 't-blue', name: 'Quốc Bảo', tag: '06:02', msg: 'Đặt 3 phòng cho đoàn công tác' }] },
      { time: '11:00', title: 'Nhiều yêu cầu cùng lúc', body: 'Quản lý phân công hội thoại cho từng nhân viên; mỗi hội thoại có người phụ trách rõ ràng.', feat: 'Phân công hội thoại', head: 'Phân công theo ca', feature: 'Đã phân công',
        rows: [{ av: 'TH', tile: 't-blue', name: 'Thu Hà', tag: '→ Ngọc', msg: 'Còn phòng đôi tối thứ 7?' }, { av: 'MP', tile: 't-navy', name: 'Minh Phúc', tag: '→ Tuấn', msg: 'Cho mình xin địa chỉ' }, { av: 'QB', tile: 't-orange', name: 'Quốc Bảo', tag: '→ Sales Hùng', msg: 'Báo giá đoàn 3 phòng' }] },
      { time: '15:00', title: 'Khách quen nhắn tin', body: 'Lịch sử trao đổi và thông tin đặt phòng trước đây hiển thị bên cạnh hội thoại, giúp phản hồi đúng nhu cầu.', feat: 'Thông tin đặt phòng từ Bellhop PMS', head: 'Thu Hà · khách quen', feature: 'Thông tin PMS',
        rows: [{ av: 'TH', tile: 't-blue', name: '2 lần lưu trú', tag: 'PMS', msg: 'Gần nhất 08/2026 · Deluxe' }, { av: 'TH', tile: 't-blue', name: 'Sở thích', tag: 'Ghi chú', msg: 'Tầng cao, gối mềm' }, { av: 'TH', tile: 't-blue', name: 'Tin nhắn mới', tag: '15:02', msg: 'Cuối tháng mình quay lại nhé' }] },
      { time: '22:00', title: 'Ngoài giờ làm việc', body: 'Bellhop AI Concierge trả lời các câu hỏi thường gặp; hội thoại cần nhân viên được chuyển lại cho ca sau.', feat: 'Kết hợp AI Concierge', head: 'AI đang trực', feature: 'AI Concierge',
        rows: [{ av: 'AI', tile: 't-orange', name: 'Đã trả lời', tag: 'AI', msg: 'Giờ nhận phòng từ 14:00' }, { av: 'AI', tile: 't-orange', name: 'Đã trả lời', tag: 'AI', msg: 'Có chỗ đậu ô tô miễn phí' }, { av: 'NT', tile: 't-navy', name: 'Chuyển ca sáng', tag: 'Nhân viên', msg: 'Yêu cầu đổi ngày đặt phòng' }] }
    ];
    const moments = M.map((x, k) => ({ time: x.time, title: x.title, body: x.body, cls: k === s.m ? 'on' : '', pressed: k === s.m ? 'true' : 'false', pick: () => this.setState({ m: k }) }));
    const F = [
      { q: 'Bellhop Message kết nối được những kênh nào?', a: '[Danh sách kênh]', ph: true },
      { q: 'Nhiều nhân viên có thể cùng sử dụng không?', a: 'Có; mỗi nhân viên có tài khoản riêng và được phân công hội thoại.', ph: false },
      { q: 'Tin nhắn cũ trước khi kết nối có được đồng bộ không?', a: '[Câu trả lời]', ph: true },
      { q: 'Có cần dùng Bellhop PMS không?', a: '[Câu trả lời]', ph: true },
      { q: 'Dữ liệu hội thoại được lưu trữ ở đâu?', a: '[Nơi lưu trữ – xem Chính sách xử lý dữ liệu cá nhân]', ph: true }
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

    return { form: _form, moments, m: M[s.m], faq };
  }

  componentDidMount() {
    document.title = "Bellhop Message – Hộp thư đa kênh cho khách sạn";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="message" startOpen={false} /><section className="p-hero p-hero-c msg-hero" style={{ background: "radial-gradient(960px 460px at 50% 0%, #E7F3F7 0%, #F7FAFC 55%, #FFFFFF 100%)", color: "var(--ink)" }}>
  <div className="wrap stack" style={{ gap: "22px", alignItems: "center" }}>
    <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0", color: "#5A6478" }}><a href="/" style={{ color: "#5A6478" }}>Trang chủ</a><span>›</span><a href="/#tong-quan" style={{ color: "#5A6478" }}>Sản phẩm</a><span>›</span><a href="/#cham-soc-khach-hang" style={{ color: "#5A6478" }}>Chăm sóc khách hàng</a><span>›</span><b style={{ color: "#122745" }}>Bellhop Message</b></nav>
    <h1 className="display" style={{ maxWidth: "820px", color: "#122745" }}>Tin nhắn từ mọi kênh, quản lý <span className="hl" style={{ color: "#1B7A8A" }}>trong một hộp thư</span></h1>
    <p className="lead" style={{ maxWidth: "760px", color: "#4A5873" }}>Bellhop Message tập hợp tin nhắn của khách từ các kênh mạng xã hội về một hộp thư chung. Đội ngũ phân công xử lý, xem lịch sử trao đổi và thông tin đặt phòng của khách ngay trong hệ thống Bellhop.</p>
    <div className="btns" style={{ justifyContent: "center" }}><a className="btn btn-navy" href="#dang-ky" style={{ background: "#122745", color: "#fff" }}>Đặt lịch demo</a><a className="btn btn-outline" href="#tinh-nang" style={{ background: "#fff", color: "#122745", borderColor: "#122745" }}>Khám phá tính năng</a></div>
    <div className="frame mx" style={{ marginTop: "28px" }}>
      <div className="frame-bar"><i></i><i></i><i></i><span>app.bellhop.vn/hop-thu</span></div>
      <div className="mx-grid">
        <div className="mx-list">
          <div className="mx-filters"><span className="on">Tất cả 12</span><span>Chưa xử lý 5</span><span>Của tôi</span></div>
              <div className="mx-conv on"><span className="mx-av">TH<i style={{ background: "#1450F0" }}></i></span><span className="mx-cv"><span className="mx-row"><b>Thu Hà</b><small>vừa xong</small></span><span className="mx-prev">Còn phòng đôi tối thứ 7 không ạ?</span></span></div>
              <div className="mx-conv"><span className="mx-av">MP<i style={{ background: "#7C5CFF" }}></i></span><span className="mx-cv"><span className="mx-row"><b>Minh Phúc</b><small>1 phút</small></span><span className="mx-prev">Cho mình xin địa chỉ</span></span></div>
              <div className="mx-conv"><span className="mx-av">LA<i style={{ background: "#E0457B" }}></i></span><span className="mx-cv"><span className="mx-row"><b>Lan Anh</b><small>3 phút</small></span><span className="mx-prev">Khách sạn có chỗ đậu ô tô không?</span></span></div>
              <div className="mx-conv"><span className="mx-av">JK<i style={{ background: "#2E9A5B" }}></i></span><span className="mx-cv"><span className="mx-row"><b>Jun Kim</b><small>8 phút</small></span><span className="mx-prev">Is breakfast included in the price?</span></span></div>
              <div className="mx-conv"><span className="mx-av">QB<i style={{ background: "#2E9AA5" }}></i></span><span className="mx-cv"><span className="mx-row"><b>Quốc Bảo</b><small>15 phút</small></span><span className="mx-prev">Mình muốn đặt 3 phòng cho đoàn công tác</span></span></div>
        </div>
        <div className="mx-chat">
          <div className="mx-head"><span className="mx-av">TH<i style={{ background: "#1450F0" }}></i></span><span className="mx-cv"><b>Thu Hà</b><small>Zalo OA · Khách quen (2 lần lưu trú)</small></span><span className="mx-chip t">Phụ trách: Lễ tân Ngọc</span><span className="mx-chip o">Đang xử lý</span></div>
          <div className="mx-msgs">
            <span className="mx-in">Chào khách sạn, còn phòng đôi tối thứ 7 không ạ?</span>
            <span className="mx-out">Dạ chào chị Hà, tối thứ 7 còn phòng Deluxe tầng 5 giá 890.000đ/đêm ạ. Em gửi chị đường dẫn đặt phòng nhé.</span>
            <span className="mx-link">Đặt phòng Deluxe · 24/10 → khachsanmau.vn/dat-phong</span>
          </div>
          <div className="mx-reply"><span className="mx-chip">Mẫu trả lời nhanh</span><span className="mx-input">Nhập tin nhắn…</span><span className="mx-send">Gửi</span></div>
        </div>
        <div className="mx-side">
          <span className="mx-side-t">Thông tin từ PMS</span>
          <div className="mx-kv"><span>Lần lưu trú</span><b>2</b></div>
          <div className="mx-kv"><span>Gần nhất</span><b>08/2026 · Deluxe</b></div>
          <div className="mx-kv"><span>Ghi chú</span><b>Thích tầng cao</b></div>
          <span className="mx-note">Hồ sơ khách gắn với PMS</span>
        </div>
      </div>
    </div>
    <span className="small" style={{ fontSize: "12px" }}>Dữ liệu minh họa</span>
  </div></section><section className="soft-grid sec">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "820px" }}>
      <span className="eyebrow">Vấn đề</span>
      <h2 className="h2">Mỗi kênh một ứng dụng, tin nhắn của khách rơi rớt khắp nơi</h2>
    </div>
    <div className="grid4">
      <div className="fcard"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="14" y="3" width="7" height="7" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="3" y="14" width="7" height="7" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="14" y="14" width="7" height="7" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect></svg></span><h3 className="h4">Mỗi kênh một ứng dụng riêng</h3><p className="p" style={{ fontSize: "16px" }}>Lễ tân phải mở từng ứng dụng để kiểm tra tin nhắn mới.</p></div>
      <div className="fcard"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M21 20a6 6 0 0 0-4-5.6" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Trả lời trùng hoặc bỏ sót</h3><p className="p" style={{ fontSize: "16px" }}>Nhiều người cùng trả lời một khách – hoặc không ai trả lời.</p></div>
      <div className="fcard"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M11 18h2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Lịch sử nằm trên điện thoại cá nhân</h3><p className="p" style={{ fontSize: "16px" }}>Nhân viên nghỉ việc hay đổi ca, lịch sử trao đổi với khách cũng đi theo.</p></div>
      <div className="fcard"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M12 13.5v2.5M12 18.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Khó biết khách đã đặt phòng chưa</h3><p className="p" style={{ fontSize: "16px" }}>Tin nhắn và đặt phòng nằm ở hai nơi, phải tra cứu chéo mới trả lời được.</p></div>
    </div>
  </div></section><section className="sec" id="tinh-nang">
  <div className="wrap stack" style={{ gap: "120px" }}>
    <div className="stack center hide-mob" style={{ gap: "18px", alignItems: "center", maxWidth: "860px", margin: "0 auto" }}>
      <span className="eyebrow">Tính năng</span>
      <h2 className="h2">Một hộp thư cho tất cả kênh, mỗi hội thoại có người phụ trách</h2>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Hộp thư hợp nhất</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Mọi tin nhắn về một nơi, không cần mở từng ứng dụng</h3>
        <p className="p">Biết ngay hội thoại nào mới, hội thoại nào đang chờ, hội thoại nào đã xong.</p>
        <ul className="ticks">
          <li><span><b>Hộp thư hợp nhất</b> cho các kênh đã kết nối</span></li>
          <li><span><b>Trạng thái hội thoại</b>: mới · đang xử lý · đã xong</span></li>
          <li><span><b>Dùng trên máy tính và điện thoại</b></span></li>
        </ul>
      </div>
      <div className="feat-vis bg-tint">
        <div className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", maxWidth: "460px", margin: "0 auto" }}>
          <b style={{ fontSize: "15px", padding: "4px 6px 8px" }}>Hộp thư chung</b>
          <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#EAF1FF" }}><span className="tile t-blue" style={{ fontSize: "13px", fontWeight: "800" }}>TH</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Thu Hà</b><br /><span className="small" style={{ fontSize: "13px" }}>Còn phòng đôi tối thứ 7 không ạ?</span></span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#1E6E76" }}>Mới</span></div>
          <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-sky" style={{ fontSize: "13px", fontWeight: "800" }}>JK</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Jun Kim</b><br /><span className="small" style={{ fontSize: "13px" }}>Is breakfast included?</span></span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đang xử lý</span></div>
          <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-navy" style={{ fontSize: "13px", fontWeight: "800" }}>MP</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Minh Phúc</b><br /><span className="small" style={{ fontSize: "13px" }}>Cho mình xin địa chỉ</span></span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đang xử lý</span></div>
          <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-orange" style={{ fontSize: "13px", fontWeight: "800" }}>LA</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Lan Anh</b><br /><span className="small" style={{ fontSize: "13px" }}>Có chỗ đậu ô tô không?</span></span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#F5F8FE", color: "#4A5873" }}>Đã xong</span></div>
          <span className="small" style={{ fontSize: "12px", padding: "4px 6px" }}>Minh họa</span>
        </div>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Làm việc nhóm</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Cả đội lễ tân cùng xử lý, không ai trả lời trùng</h3>
        <p className="p">Quản lý phân công hội thoại cho từng nhân viên; mỗi hội thoại có người phụ trách rõ ràng.</p>
        <ul className="ticks">
          <li><span><b>Phân công hội thoại</b> cho nhân viên</span></li>
          <li><span><b>Ghi chú nội bộ</b> trong hội thoại – khách không thấy</span></li>
          <li><span><b>Mẫu câu trả lời nhanh</b> cho câu hỏi thường gặp</span></li>
        </ul>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "460px", margin: "0 auto" }}>
          <div className="row" style={{ justifyContent: "space-between", gap: "10px" }}><b style={{ fontSize: "15px" }}>Phân công theo ca</b><span className="small" style={{ fontSize: "12px" }}>11:00</span></div>
          <div className="row" style={{ gap: "12px", padding: "10px", borderRadius: "12px", background: "#F5F8FE" }}><span className="tile t-blue" style={{ fontSize: "13px", fontWeight: "800" }}>TH</span><span style={{ flex: "1", minWidth: "0", fontSize: "14px" }}>Còn phòng đôi tối thứ 7?</span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>→ Ngọc</span></div>
          <div className="row" style={{ gap: "12px", padding: "10px", borderRadius: "12px", background: "#F5F8FE" }}><span className="tile t-navy" style={{ fontSize: "13px", fontWeight: "800" }}>MP</span><span style={{ flex: "1", minWidth: "0", fontSize: "14px" }}>Cho mình xin địa chỉ</span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>→ Tuấn</span></div>
          <div className="row" style={{ gap: "12px", padding: "10px", borderRadius: "12px", background: "#F5F8FE" }}><span className="tile t-orange" style={{ fontSize: "13px", fontWeight: "800" }}>QB</span><span style={{ flex: "1", minWidth: "0", fontSize: "14px" }}>Báo giá đoàn 3 phòng</span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>→ Sales Hùng</span></div>
          <span style={{ padding: "10px 12px", borderRadius: "10px", border: "1px dashed #8FD0D6", background: "#E6F6F7", fontSize: "13px", color: "#1E6E76" }}>Ghi chú nội bộ · Ngọc: khách quen, ưu tiên phòng tầng cao</span>
          <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip" style={{ background: "#F5F8FE" }}>Giờ nhận phòng</span><span className="chip" style={{ background: "#F5F8FE" }}>Địa chỉ</span><span className="chip" style={{ background: "#F5F8FE" }}>Bãi đỗ xe</span></div>
          <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
        </div>
      </div>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Bán phòng trong hội thoại</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Trả lời đúng khách, chốt phòng ngay trong cuộc trò chuyện</h3>
        <p className="p">Lịch sử trao đổi và thông tin đặt phòng trước đây hiển thị bên cạnh hội thoại, giúp phản hồi đúng nhu cầu.</p>
        <ul className="ticks">
          <li><span><b>Xem thông tin đặt phòng</b> của khách từ Bellhop PMS</span></li>
          <li><span><b>Gửi đường dẫn đặt phòng</b> (Booking Engine) trong hội thoại</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-booking-engine">Booking Engine <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms">Bellhop PMS <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-tint-c">
        <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px", maxWidth: "460px", margin: "0 auto" }}>
          <span style={{ alignSelf: "flex-start", maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#fff", boxShadow: "0 0 0 1px #E3E8F2", fontSize: "14px" }}>Cuối tháng mình quay lại nhé</span>
          <div style={{ alignSelf: "flex-end", width: "min(300px, 90%)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 0 0 1px #E3E8F2" }}>
            <img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="" style={{ display: "block", width: "100%", height: "110px", objectFit: "cover" }} />
            <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}><b style={{ fontSize: "15px" }}>Đặt phòng Deluxe · 24/10</b><span className="small" style={{ fontSize: "13px", color: "#1450F0" }}>khachsanmau.vn/dat-phong</span></div>
          </div>
          <div style={{ padding: "14px", borderRadius: "14px", background: "#F5F8FE", display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
            <b style={{ fontSize: "13px" }}>Thông tin từ PMS · Thu Hà</b>
            <div className="row" style={{ justifyContent: "space-between" }}><span className="small" style={{ fontSize: "13px" }}>Lần lưu trú</span><b>2</b></div>
            <div className="row" style={{ justifyContent: "space-between" }}><span className="small" style={{ fontSize: "13px" }}>Gần nhất</span><b>08/2026 · Deluxe</b></div>
          </div>
          <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
        </div>
      </div>
    </div>
  </div></section><section className="sec dark">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "760px" }}>
      <span className="eyebrow">Một ngày tại quầy lễ tân</span>
      <h2 className="h2" style={{ color: "#fff", fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: "none" }}>Một ngày làm việc với Bellhop Message</h2>
    </div>
    <div className="picker">
      <div className="pick-list">
        
                {(v.moments || []).map((k, $index) => (
                  <React.Fragment key={$index}>
          <button className={`pick ${k.cls ?? ''}`} type="button" aria-pressed={k.pressed} onClick={k.pick}><b><span style={{ color: "#8BE3E8" }}>{k.time}</span> {k.title}</b><span>{k.body}</span></button>
        
                  </React.Fragment>
                ))}
      </div>
      <div style={{ borderRadius: "28px", padding: "36px", background: "radial-gradient(420px 300px at 85% 10%, rgba(27,69,196,.55), transparent 70%), linear-gradient(160deg, #1B3A5C, #122745)", minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="card" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "8px", color: "#0B1B3F" }}>
          <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "4px 6px 8px" }}><b style={{ fontSize: "15px" }}>Hộp thư · {v.m.time}</b><span className="chip" style={{ height: "24px", fontSize: "11px" }}>{v.m.feature}</span></div>
          <b style={{ fontSize: "18px", padding: "0 6px 6px" }}>{v.m.head}</b>
          
                  {(v.m.rows || []).map((r, $index) => (
                    <React.Fragment key={$index}>
            <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#F5F8FE" }}><span className={`tile ${r.tile ?? ''}`} style={{ fontSize: "13px", fontWeight: "800" }}>{r.av}</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>{r.name}</b><br /><span className="small" style={{ fontSize: "13px" }}>{r.msg}</span></span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>{r.tag}</span></div>
          
                    </React.Fragment>
                  ))}
          <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "8px 6px 0" }}><span className="small" style={{ fontSize: "12px" }}>{v.m.feat}</span><span className="small" style={{ fontSize: "12px" }}>Dữ liệu minh họa</span></div>
        </div>
      </div>
    </div>
  </div></section><section className="sec">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Trước &amp; sau</span><h2 className="h2">Thay đổi trong cách xử lý tin nhắn</h2></div>
    <div className="plans">
      <div className="plan" style={{ background: "#F5F8FE", boxShadow: "none" }}>
        <span className="chip" style={{ alignSelf: "flex-start", background: "#fff", color: "#4A5873" }}>Trước</span>
        <h3 className="h3">Mỗi kênh một ứng dụng</h3>
        <ul className="ticks">
          <li>Mỗi kênh một ứng dụng riêng</li>
          <li>Nhiều người cùng trả lời một khách hoặc không ai trả lời</li>
          <li>Lịch sử trao đổi nằm trên điện thoại cá nhân</li>
          <li>Khó biết khách đã đặt phòng hay chưa</li>
        </ul>
      </div>
      <div className="plan hi">
        <span className="chip" style={{ alignSelf: "flex-start" }}>Sau · Hộp thư Bellhop</span>
        <h3 className="h3">Một hộp thư cho tất cả kênh</h3>
        <ul className="ticks">
          <li>Một hộp thư cho tất cả kênh đã kết nối</li>
          <li>Mỗi hội thoại có người phụ trách</li>
          <li>Thông tin đặt phòng hiển thị ngay trong hội thoại</li>
          <li><span className="ph">[Lịch sử lưu trên hệ thống của cơ sở]</span></li>
        </ul>
      </div>
    </div>
  </div></section><section className="soft-grid sec">
  <div className="wrap">
    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Đi cùng nhau</span>
        <h2 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Kết hợp với Bellhop AI Concierge</h2>
        <p className="p">AI Concierge trả lời các câu hỏi thường gặp dựa trên cơ sở kiến thức của khách sạn; những yêu cầu cần xử lý riêng được chuyển cho nhân viên trong cùng hộp thư.</p>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-ai-concierge">Tìm hiểu AI Concierge <span className="arr">→</span></a>
      </div>
      <div className="feat-vis" style={{ background: "#fff" }}>
        <div className="stack" style={{ gap: "12px", maxWidth: "440px", margin: "0 auto" }}>
          <span style={{ alignSelf: "flex-end", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "#EAF1FF", fontSize: "14px" }}>Wifi password là gì ạ?</span>
          <div className="row" style={{ gap: "10px", alignItems: "flex-start" }}><img src="/assets/0e8369a376638069fb965d8bf187dceb.png" alt="" style={{ width: "32px", height: "32px", borderRadius: "50%" }} /><span style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#1450F0", color: "#fff", fontSize: "14px" }}><b style={{ display: "block", fontSize: "12px", color: "#D6E2FF" }}>AI Concierge</b>Mật khẩu Wi-Fi được in trên thẻ phòng ạ. Nếu cần hỗ trợ thêm, lễ tân luôn sẵn sàng.</span></div>
          <span style={{ alignSelf: "flex-end", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "#EAF1FF", fontSize: "14px" }}>Mình muốn đổi sang phòng có bồn tắm</span>
          <span className="chip" style={{ alignSelf: "center", background: "#E6F6F7", color: "#1E6E76" }}>↪ Chuyển cho Lễ tân Ngọc</span>
          <span style={{ alignSelf: "flex-start", maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#fff", boxShadow: "0 0 0 1px #E3E8F2", fontSize: "14px" }}><b style={{ display: "block", fontSize: "12px", color: "#4A5873" }}>Lễ tân Ngọc</b>Dạ em kiểm tra ngay, phòng 501 có bồn tắm và đang trống ạ.</span>
          <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
        </div>
      </div>
    </div>
  </div></section><section className="sec">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Phù hợp với ai</span><h2 className="h2">Phù hợp với các cơ sở lưu trú</h2></div>
    <div className="seg-grid">
      <div className="seg-card">
        <div className="seg-media"><img src="/assets/e187e247863c141ccd5e7314ed8cff87.jpg" alt="Homestay & villa" /></div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h3">Homestay &amp; villa</h3></div>
          <p className="p">Do chủ tự vận hành: theo dõi mọi tin nhắn trên một ứng dụng.</p>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo <span>→</span></a>
        </div>
      </div>
      <div className="seg-card">
        <div className="seg-media"><img src="/assets/63e0d2bfe1224291a4be1d6730facb48.jpg" alt="Khách sạn nhiều ca trực" /></div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V6l8-3 8 3v14M9 20v-5h6v5M8 9h1M15 9h1M8 12h1M15 12h1" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h3">Khách sạn nhiều ca trực</h3></div>
          <p className="p">Phân công và theo dõi xử lý theo ca.</p>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo <span>→</span></a>
        </div>
      </div>
      <div className="seg-card">
        <div className="seg-media"><img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="Chuỗi lưu trú" /></div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20V9l5-3 5 3v11M13 20V5l4-2 4 2v15M6 12h4M6 16h4M16 9h2M16 13h2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h3">Chuỗi lưu trú</h3></div>
          <p className="p">Quản lý tin nhắn của nhiều cơ sở.</p>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo <span>→</span></a>
        </div>
      </div>
    </div>
  </div></section><section className="soft-grid sec" id="ket-noi">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "760px" }}>
      <span className="eyebrow">Hệ sinh thái</span>
      <h2 className="h2">Kết nối với các sản phẩm Bellhop</h2>
      <p className="lead">Message chạy trên cùng dữ liệu với các sản phẩm khác – không nhập lại, không lệch số.</p>
    </div>
    <div className="grid4">
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-pms"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Bellhop PMS</h3><p className="small">Xem thông tin đặt phòng của khách ngay trong hội thoại.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-booking-engine"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Booking Engine</h3><p className="small">Gửi đường dẫn đặt phòng cho khách trong hội thoại.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-ai-concierge"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "1.8", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">AI Concierge</h3><p className="small">Trả lời câu hỏi thường gặp, chuyển yêu cầu riêng cho nhân viên.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-cms"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop CMS</h3><p className="small">Đồng bộ kênh OTA, định giá linh động.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-website"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 9h18M7 6.5h.01M10 6.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Website</h3><p className="small">Website cho khách sạn, homestay, villa.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="/san-pham/bellhop-payment"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 10h18M7 15h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Payment</h3><p className="small">Nhận thanh toán online cho cơ sở.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-finance"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Finance</h3><p className="small">Đồng bộ dữ liệu sang phần mềm kế toán.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="/#tong-quan" style={{ background: "#EAF1FF", boxShadow: "none" }}><h3 className="h4">Tổng quan nền tảng</h3><p className="small">Dùng riêng từng sản phẩm hoặc kết hợp – tất cả trên cùng một dữ liệu.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem tổng quan <span className="arr">→</span></span></a>
    </div>
  </div></section><section className="soft-grid sec-sm" id="gia">
  <div className="wrap">
    <div className="price-band">
      <div className="stack" style={{ gap: "14px" }}>
        <span className="eyebrow">Gói &amp; giá</span>
        <h2 className="h2" style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}>Chi phí sử dụng Bellhop Message</h2>
        <p className="pb-sub">Đội Bellhop tư vấn gói phù hợp với số kênh nhắn tin và số nhân viên trực của cơ sở bạn.</p>
        <div className="btns" style={{ marginTop: "8px" }}><a className="btn btn-primary" href="#dang-ky">Đặt lịch demo</a><a className="btn btn-outline" href="/#bang-gia">Xem bảng giá</a></div>
      </div>
      <div className="pb-vis" aria-hidden="true">
        <svg className="pb-lines" viewBox="0 0 400 260" preserveAspectRatio="none"><path d="M200 130 L70 40 M200 130 L330 40 M200 130 L70 220 M200 130 L330 220" style={{ fill: "none", stroke: "url(#pbg2)", strokeWidth: "1.6", strokeDasharray: "5 6" }}></path><defs><linearGradient id="pbg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3FE0FF"></stop><stop offset="1" stopColor="#1450F0"></stop></linearGradient></defs></svg>
        <span className="pb-node" style={{ left: "4%", top: "6%" }}>Zalo OA</span>
        <span className="pb-node" style={{ right: "4%", top: "6%" }}>Messenger</span>
        <span className="pb-node" style={{ left: "4%", bottom: "6%" }}>Chat website</span>
        <span className="pb-node" style={{ right: "4%", bottom: "6%" }}>Bellhop PMS</span>
        <span className="pb-core"><svg viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg><b>Bellhop Message</b><span>Một hộp thư chung</span></span>
      </div>
    </div>
  </div></section><section className="sec" id="faq">
  <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "flex-start" }}>
    <div className="stack" style={{ gap: "16px", flex: "1 1 300px" }}>
      <span className="eyebrow">FAQ</span>
      <h2 className="h2">Câu hỏi thường gặp về Bellhop Message</h2>
      <p className="p">Chưa thấy câu trả lời bạn cần? Đội Bellhop sẵn sàng tư vấn theo đúng mô hình cơ sở của bạn.</p>
      <div className="faq-help">
          <b>Chưa thấy câu trả lời?</b>
          <span>Nhắn Zalo hoặc gọi trực tiếp cho đội Bellhop.</span>
          <div className="btns"><a className="btn btn-primary btn-sm" href="#">Chat Zalo</a><a className="btn btn-outline btn-sm" href="tel:0972096499">Gọi 0972 096 499</a></div>
        </div>
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
