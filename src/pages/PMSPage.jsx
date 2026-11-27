import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class PMSPage extends DCLogic {
  constructor(p) { super(p); this.state = { f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', consent: false }, prods: ['Bellhop PMS'], err: {}, sent: false, role: 0, faq: 0 }; }
  renderVals() {
    const R = [
      { name: 'Chủ cơ sở', desc: 'Xem doanh thu, công suất, thu chi từ xa; không cần có mặt tại quầy.', rows: [{ a: 'Doanh thu hôm nay', b: '24.860.000đ' }, { a: 'Công suất', b: '78%' }, { a: 'Thu – chi trong ca', b: '+18.450.000đ' }] },
      { name: 'Quản lý', desc: 'Điều phối ca, kiểm soát hủy/đổi phòng, duyệt thu chi.', rows: [{ a: 'Yêu cầu hủy chờ duyệt', b: '2' }, { a: 'Phiếu chi chờ duyệt', b: '3' }, { a: 'Nhân viên trong ca', b: '5' }] },
      { name: 'Lễ tân', desc: 'Nhận/trả phòng, thêm dịch vụ, thu tiền, in hóa đơn.', rows: [{ a: 'Khách đến hôm nay', b: '8' }, { a: 'Khách đi hôm nay', b: '5' }, { a: 'Hóa đơn chờ in', b: '1' }] },
      { name: 'Buồng phòng', desc: 'Nhận việc dọn phòng, cập nhật trạng thái.', rows: [{ a: 'Phòng cần dọn', b: '3' }, { a: 'Đang dọn', b: '1' }, { a: 'Sẵn sàng đón khách', b: '6' }] },
      { name: 'Kế toán', desc: 'Hóa đơn, sổ sách, quỹ; đồng bộ sang phần mềm kế toán với Bellhop Finance.', rows: [{ a: 'Hóa đơn điện tử đã phát hành', b: '46' }, { a: 'Chứng từ đã đồng bộ kế toán', b: '128' }, { a: 'Chênh lệch cần xử lý', b: '0' }] }
    ];
    const ri = this.state.role;
    const roles = R.map((r, k) => ({ name: r.name, desc: r.desc, cls: k === ri ? 'on' : '', pressed: k === ri ? 'true' : 'false', pick: () => this.setState({ role: k }) }));
    const fq = this.state.faq;
    const fo = {}, fe = {}, ft = {}, fs = {};
    for (let i = 0; i < 8; i++) {
      const k = 'q' + i;
      fo[k] = fq === i;
      fe[k] = fq === i ? 'true' : 'false';
      fs[k] = fq === i ? '−' : '+';
      ft[k] = () => this.setState({ faq: fq === i ? -1 : i });
    }
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

    return { form: _form, roles, role: R[ri], fo, fe, ft, fs };
  }

  componentDidMount() {
    document.title = "Bellhop PMS – Phần mềm quản lý khách sạn";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="pms" startOpen={false} /><section className="p-hero">
  <div className="wrap p-hero-in">
    <div className="stack" style={{ gap: "24px" }}>
      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0" }}><a href="/">Trang chủ</a><span>›</span><a href="/#tong-quan">Sản phẩm</a><span>›</span><b style={{ color: "#0B1B3F" }}>Bellhop PMS</b></nav>
      <span className="eyebrow">Bellhop PMS · Phần mềm quản lý khách sạn</span>
      <h1 className="display" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>Quản lý khách sạn <span className="hl">miễn phí</span> vận hành dễ dàng hơn</h1>
      <p className="lead">Quản lý đặt phòng, lễ tân, buồng phòng và thu chi trên một nền tảng. Bắt đầu miễn phí, mở rộng tính năng theo nhu cầu.</p>
      <div className="btns"><a className="btn btn-primary" href="#dang-ky">Dùng thử miễn phí</a><a className="btn btn-outline" href="#dang-ky">Đặt lịch demo</a></div>
    </div>
    <div>
      <div className="frame">
        <img src="/assets/d8e97cd43f9f645eec6abba0f8eee195.png" alt="Màn hình Danh sách đặt phòng của Bellhop PMS" style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
    </div>
  </div></section><section className="sec" id="van-de">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Khó khăn hằng ngày</span>
      <h2 className="h2">Những khó khăn thường gặp trong ca trực</h2>
      <p className="lead">Khi thông tin phòng, đặt phòng và thu chi được ghi chép thủ công, các sai sót nhỏ dễ lặp lại mỗi ngày.</p>
    </div>
    <div className="grid3">
      <a className="fcard" href="#le-tan"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="11" height="11" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="10" y="9" width="11" height="11" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect></svg></span><h3 className="h4">Trùng phòng, nhầm phòng</h3><p className="p">Đặt phòng ghi ở sổ, Excel, tin nhắn – không ai thấy bức tranh đầy đủ.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Lễ tân <span className="arr">↓</span></span></a>
      <a className="fcard" href="#le-tan"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h13l-3-3M20 16H7l3 3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Giao ca thất lạc thông tin</h3><p className="p">Khách đặt cọc chưa, ai đổi ngày, phòng nào hẹn trả muộn – chỉ nằm trong trí nhớ ca trước.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Lễ tân <span className="arr">↓</span></span></a>
      <a className="fcard" href="#buong-phong"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></circle><path d="M12 7.5V12l3 2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Khách chờ phòng vì chưa dọn xong</h3><p className="p">Buồng phòng báo miệng, lễ tân không biết phòng nào đã sẵn sàng.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Buồng phòng <span className="arr">↓</span></span></a>
      <a className="fcard" href="#kho"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Kho, minibar thất thoát</h3><p className="p">Nhập – xuất không ghi nhận, cuối tháng không biết hụt ở đâu.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Kho &amp; F&amp;B <span className="arr">↓</span></span></a>
      <a className="fcard" href="#kho"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v18M5 3v5a2 2 0 0 0 4 0V3M17 21V3c-2.5 1-4 4-4 8h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Đồ ăn uống ghi tay</h3><p className="p">Gọi món không vào hóa đơn phòng, khách trả phòng mới phát hiện thiếu.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Kho &amp; F&amp;B <span className="arr">↓</span></span></a>
      <a className="fcard" href="#tai-chinh"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><circle cx="12" cy="12" r="2.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></circle></svg></span><h3 className="h4">Cuối ngày cộng tiền thủ công</h3><p className="p">Thu chi, tiền mặt, chuyển khoản không khớp; xuất hóa đơn mất thời gian.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tài chính · Báo cáo <span className="arr">↓</span></span></a>
    </div>
  </div></section><section className="sec" style={{ paddingTop: "0" }}>
  <div className="wrap stack" style={{ gap: "120px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">5 phân hệ</span>
      <h2 className="h2">Một phần mềm, năm phân hệ, dùng chung một dữ liệu</h2>
      <div className="row" style={{ gap: "8px", flexWrap: "wrap", justifyContent: "center" }}><a className="chip" href="#le-tan">Lễ tân</a><a className="chip" href="#buong-phong">Buồng phòng</a><a className="chip" href="#kho">Kho &amp; F&amp;B</a><a className="chip" href="#tai-chinh">Tài chính</a><a className="chip" href="#tai-chinh">Báo cáo</a></div>
    </div>

    <div className="feat" id="le-tan">
      <div className="feat-txt">
        <span className="eyebrow">Lễ tân · Miễn phí</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Nhận khách, đổi phòng, trả phòng chỉ trong vài thao tác</h3>
        <p className="p">Mọi đặt phòng – khách vãng lai, gọi điện, từ website hay OTA – hiện trên cùng một sơ đồ phòng và timeline.</p>
        <ul className="ticks">
          <li><span>Khách vãng lai (walk-in) và đặt phòng trước</span></li>
          <li><span>Đổi ngày, đổi khách, gán và chuyển phòng; hủy đặt phòng, trả phòng sớm</span></li>
          <li><span>Thêm dịch vụ vào phòng (giặt ủi, đưa đón, minibar…)</span></li>
          <li><span><b>Sơ đồ phòng</b> theo trạng thái: trống · có khách · đặt trước · cần dọn</span></li>
          <li><span><b>Timeline</b>: xem công suất nhiều ngày, phát hiện ngày còn trống</span></li>
        </ul>
        <a className="lnk" href="#dang-ky">Dùng thử phân hệ Lễ tân miễn phí <span className="arr">→</span></a>
      </div>
      <div className="tl2-col">
      <div className="feat-vis bg-tint tl2-vis">
        <div className="tl2-win">
          <div className="frame-bar"><i></i><i></i><i></i><span>Timeline · 19–25/10</span></div>
          <div className="tl2-body">
            <div className="tl2-leg"><span><i className="in"></i>Đang ở</span><span><i className="bk"></i>Website / trực tiếp</span><span><i className="ota"></i>OTA</span></div>
            <div className="tl2-grid"><div className="tl2-h" style={{ gridRow: "1", gridColumn: "1" }}>Phòng</div><div className="tl2-h" style={{ gridRow: "1", gridColumn: "2" }}>T2 19</div><div className="tl2-h" style={{ gridRow: "1", gridColumn: "3" }}>T3 20</div><div className="tl2-h" style={{ gridRow: "1", gridColumn: "4" }}>T4 21</div><div className="tl2-h" style={{ gridRow: "1", gridColumn: "5" }}>T5 22</div><div className="tl2-h" style={{ gridRow: "1", gridColumn: "6" }}>T6 23</div><div className="tl2-h" style={{ gridRow: "1", gridColumn: "7" }}>T7 24</div><div className="tl2-h" style={{ gridRow: "1", gridColumn: "8" }}>CN 25</div><div className="tl2-r" style={{ gridRow: "2" }}>101</div><div className="tl2-c" style={{ gridRow: "2", gridColumn: "2" }}></div><div className="tl2-c" style={{ gridRow: "2", gridColumn: "3" }}></div><div className="tl2-c" style={{ gridRow: "2", gridColumn: "4" }}></div><div className="tl2-c" style={{ gridRow: "2", gridColumn: "5" }}></div><div className="tl2-c" style={{ gridRow: "2", gridColumn: "6" }}></div><div className="tl2-c" style={{ gridRow: "2", gridColumn: "7" }}></div><div className="tl2-c" style={{ gridRow: "2", gridColumn: "8" }}></div><span className="tl2-b in" style={{ gridRow: "2", gridColumn: "2 / 5" }}>Anh Minh · 3 đêm</span><span className="tl2-b bk" style={{ gridRow: "2", gridColumn: "6 / 8" }}>Website</span><div className="tl2-r" style={{ gridRow: "3" }}>102</div><div className="tl2-c" style={{ gridRow: "3", gridColumn: "2" }}></div><div className="tl2-c" style={{ gridRow: "3", gridColumn: "3" }}></div><div className="tl2-c" style={{ gridRow: "3", gridColumn: "4" }}></div><div className="tl2-c" style={{ gridRow: "3", gridColumn: "5" }}></div><div className="tl2-c" style={{ gridRow: "3", gridColumn: "6" }}></div><div className="tl2-c" style={{ gridRow: "3", gridColumn: "7" }}></div><div className="tl2-c" style={{ gridRow: "3", gridColumn: "8" }}></div><span className="tl2-b ota" style={{ gridRow: "3", gridColumn: "3 / 5" }}>Agoda</span><span className="tl2-b in" style={{ gridRow: "3", gridColumn: "7 / 9" }}>Chị Lan</span><div className="tl2-r" style={{ gridRow: "4" }}>103</div><div className="tl2-c" style={{ gridRow: "4", gridColumn: "2" }}></div><div className="tl2-c" style={{ gridRow: "4", gridColumn: "3" }}></div><div className="tl2-c" style={{ gridRow: "4", gridColumn: "4" }}></div><div className="tl2-c" style={{ gridRow: "4", gridColumn: "5" }}></div><div className="tl2-c" style={{ gridRow: "4", gridColumn: "6" }}></div><div className="tl2-c" style={{ gridRow: "4", gridColumn: "7" }}></div><div className="tl2-c" style={{ gridRow: "4", gridColumn: "8" }}></div><div className="tl2-r" style={{ gridRow: "5" }}>201</div><div className="tl2-c" style={{ gridRow: "5", gridColumn: "2" }}></div><div className="tl2-c" style={{ gridRow: "5", gridColumn: "3" }}></div><div className="tl2-c" style={{ gridRow: "5", gridColumn: "4" }}></div><div className="tl2-c" style={{ gridRow: "5", gridColumn: "5" }}></div><div className="tl2-c" style={{ gridRow: "5", gridColumn: "6" }}></div><div className="tl2-c" style={{ gridRow: "5", gridColumn: "7" }}></div><div className="tl2-c" style={{ gridRow: "5", gridColumn: "8" }}></div><span className="tl2-b in" style={{ gridRow: "5", gridColumn: "2 / 7" }}>Gia đình Hà · 5 đêm</span><div className="tl2-r" style={{ gridRow: "6" }}>202</div><div className="tl2-c" style={{ gridRow: "6", gridColumn: "2" }}></div><div className="tl2-c" style={{ gridRow: "6", gridColumn: "3" }}></div><div className="tl2-c" style={{ gridRow: "6", gridColumn: "4" }}></div><div className="tl2-c" style={{ gridRow: "6", gridColumn: "5" }}></div><div className="tl2-c" style={{ gridRow: "6", gridColumn: "6" }}></div><div className="tl2-c" style={{ gridRow: "6", gridColumn: "7" }}></div><div className="tl2-c" style={{ gridRow: "6", gridColumn: "8" }}></div><span className="tl2-b bk" style={{ gridRow: "6", gridColumn: "4 / 5" }}>Gọi điện</span><span className="tl2-b ota" style={{ gridRow: "6", gridColumn: "7 / 9" }}>Booking.com</span><div className="tl2-r" style={{ gridRow: "7" }}>203</div><div className="tl2-c" style={{ gridRow: "7", gridColumn: "2" }}></div><div className="tl2-c" style={{ gridRow: "7", gridColumn: "3" }}></div><div className="tl2-c" style={{ gridRow: "7", gridColumn: "4" }}></div><div className="tl2-c" style={{ gridRow: "7", gridColumn: "5" }}></div><div className="tl2-c" style={{ gridRow: "7", gridColumn: "6" }}></div><div className="tl2-c" style={{ gridRow: "7", gridColumn: "7" }}></div><div className="tl2-c" style={{ gridRow: "7", gridColumn: "8" }}></div><span className="tl2-b ota" style={{ gridRow: "7", gridColumn: "2 / 4" }}>Traveloka</span><span className="tl2-b in" style={{ gridRow: "7", gridColumn: "6 / 8" }}>Mr. Kim</span><div className="tl2-r" style={{ gridRow: "8" }}>204</div><div className="tl2-c" style={{ gridRow: "8", gridColumn: "2" }}></div><div className="tl2-c" style={{ gridRow: "8", gridColumn: "3" }}></div><div className="tl2-c" style={{ gridRow: "8", gridColumn: "4" }}></div><div className="tl2-c" style={{ gridRow: "8", gridColumn: "5" }}></div><div className="tl2-c" style={{ gridRow: "8", gridColumn: "6" }}></div><div className="tl2-c" style={{ gridRow: "8", gridColumn: "7" }}></div><div className="tl2-c" style={{ gridRow: "8", gridColumn: "8" }}></div><span className="tl2-b in" style={{ gridRow: "8", gridColumn: "3 / 7" }}>Ms. Sato</span><span className="tl2-b bk" style={{ gridRow: "8", gridColumn: "8 / 9" }}>Walk-in</span></div>
            <span className="tl2-note">Dữ liệu minh họa · Ảnh/GIF giao diện thật sẽ thay thế</span>
          </div>
        </div>
      </div>
      <div className="tl2-steps">
          <span className="tl2-lab">Một lượt nhận phòng</span>
          <div className="tl2-flow"><span className="tl2-st"><i>1</i><span><b>Chọn phòng trống</b> trên sơ đồ</span></span><em>→</em><span className="tl2-st"><i>2</i><span><b>Nhập thông tin</b> khách</span></span><em>→</em><span className="tl2-st"><i className="t">3</i><span><b>Nhận phòng</b> &amp; in phiếu</span></span></div>
        </div>
      </div>
    </div>

    <div className="feat rev" id="buong-phong">
      <div className="feat-txt">
        <span className="eyebrow">Buồng phòng · Miễn phí</span>
        <h3 className="h2" style={{ fontSize: "clamp(26px, 2.6vw, 38px)" }}>Lễ tân biết ngay phòng nào<br />sẵn sàng đón khách</h3>
        <p className="p">Buồng phòng cập nhật trạng thái dọn, sơ đồ phòng ở quầy lễ tân đổi theo – không cần báo miệng.</p>
        <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip">Có khách</span><span>→</span><span className="chip" style={{ background: "#E6F6F7", color: "#1E6E76" }}>Cần dọn</span><span>→</span><span className="chip">Đang dọn</span><span>→</span><span className="chip" style={{ background: "#E7FAFD", color: "#122745" }}>Sẵn sàng</span></div>
        <ul className="ticks">
          <li><span>Danh sách phòng cần dọn theo thời gian thực</span></li>
          <li><span>Giao việc dọn phòng cho từng nhân viên</span></li>
          <li><span>Trạng thái phòng hiển thị ngay trên sơ đồ phòng</span></li>
        </ul>
      </div>
      <div className="feat-vis bg-tint-c">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/d967b787263d4b619b118217c8635099.png" alt="Màn hình Buồng phòng của Bellhop PMS" style={{ display: "block", width: "100%", height: "auto" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-24px 0 0 auto", width: "min(340px, 92%)", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className="row" style={{ justifyContent: "space-between" }}><b style={{ fontSize: "14px" }}>Việc buồng phòng</b><span className="small" style={{ fontSize: "12px" }}>Hằng · Ca sáng</span></div>
          <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE", fontSize: "13px" }}><span><b>Phòng 203</b> · trả phòng 10:12</span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đang dọn</span></div>
          <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE", fontSize: "13px" }}><span><b>Phòng 106</b> · trả phòng 09:40</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#1E6E76" }}>Cần dọn</span></div>
          <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE", fontSize: "13px" }}><span><b>Phòng 104</b> · khách đến 14:00</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E7FAFD" }}>Sẵn sàng</span></div>
          <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
        </div>
      </div>
    </div>

    <div className="feat" id="kho">
      <div className="feat-txt">
        <span className="eyebrow">Kho &amp; F&amp;B</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Kiểm soát hàng hóa và đồ ăn uống, không thất thoát</h3>
        <p className="p">Không có nhà hàng? Phân hệ kho vẫn giúp quản lý minibar, đồ dùng phòng và quầy lễ tân.</p>
        <ul className="ticks">
          <li><span><b>Kho cơ bản</b> – miễn phí: danh mục hàng hóa, theo dõi tồn kho, ghi nhận xuất dùng cho phòng và dịch vụ</span></li>
          <li><span><b>Kho chuyên sâu</b> – nâng cao: nhập hàng, trả hàng nhà cung cấp, điều chuyển giữa các kho, kiểm kê định kỳ, công nợ nhà cung cấp</span></li>
          <li><span><b>F&amp;B</b> – nâng cao: sơ đồ bàn, đơn hàng, thực đơn, định lượng nguyên vật liệu</span></li>
        </ul>
        <a className="lnk" href="#bang-gia">Kho chuyên sâu và F&amp;B thuộc gói Vận hành nâng cao <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="row" style={{ justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}><b style={{ fontSize: "15px" }}>F&amp;B · Sơ đồ bàn – Nhà hàng tầng 1</b><span className="small" style={{ fontSize: "12px" }}>Minh họa</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: "8px", fontSize: "13px", fontWeight: "700", textAlign: "center" }}>
            <span style={{ padding: "12px 0", borderRadius: "10px", background: "#F5F8FE" }}>B1</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#1450F0", color: "#fff" }}>B2</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#F5F8FE" }}>B3</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#2E9AA5", color: "#fff" }}>B4</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#1450F0", color: "#fff" }}>B5</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#F5F8FE" }}>B6</span>
            <span style={{ padding: "12px 0", borderRadius: "10px", background: "#F5F8FE" }}>B7</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#F5F8FE" }}>B8</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#1450F0", color: "#fff" }}>B9</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#F5F8FE" }}>B10</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#F5F8FE" }}>B11</span><span style={{ padding: "12px 0", borderRadius: "10px", background: "#2E9AA5", color: "#fff" }}>B12</span>
          </div>
          <div className="row" style={{ gap: "14px", fontSize: "12px", color: "#4A5873", flexWrap: "wrap" }}><span className="row" style={{ gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#E3E8F2" }}></i>Trống</span><span className="row" style={{ gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#1450F0" }}></i>Đang phục vụ</span><span className="row" style={{ gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#2E9AA5" }}></i>Chờ thanh toán</span></div>
          <div style={{ borderTop: "1px dashed #E3E8F2", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px" }}>
            <b>Bàn B4 · Phòng 201</b>
            <div className="row" style={{ justifyContent: "space-between" }}><span>Phở bò x2</span><span>130.000</span></div>
            <div className="row" style={{ justifyContent: "space-between" }}><span>Cà phê sữa x2</span><span>70.000</span></div>
            <div className="row" style={{ justifyContent: "space-between" }}><span>Nước suối x1</span><span>15.000</span></div>
            <div className="row" style={{ justifyContent: "space-between", fontWeight: "800" }}><span>Tổng</span><span>215.000đ</span></div>
          </div>
        </div>
      </div>
    </div>

    <div className="feat rev" id="tai-chinh">
      <div className="feat-txt">
        <span className="eyebrow">Tài chính &amp; Báo cáo</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Thu chi rõ ràng, hóa đơn xuất ngay tại quầy</h3>
        <p className="p">Số liệu đi thẳng từ hoạt động lễ tân, kho, thu chi – không cần tổng hợp tay.</p>
        <ul className="ticks">
          <li><span><b>Miễn phí</b>: tạo và in hóa đơn cho khách, thu chi cơ bản theo ca/ngày, tỷ giá ngoại tệ cho khách nước ngoài</span></li>
          <li><span><b>Gói Tài chính</b>: hóa đơn điện tử, sổ sách, quỹ tiền mặt và quỹ tiền gửi</span></li>
          <li><span><b>Thống kê</b> – miễn phí: <span className="ph">[các chỉ số có sẵn]</span></span></li>
          <li><span><b>AI &amp; Phân tích</b> – nâng cao: phân tích doanh thu, báo cáo chuyên sâu, trợ lý AI hỗ trợ khách dựa trên cơ sở kiến thức của khách sạn</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-finance">Đồng bộ sang phần mềm kế toán với Bellhop Finance <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-ai-concierge">AI Concierge <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-soft">
        <div className="stack" style={{ gap: "14px", maxWidth: "420px", margin: "0 auto" }}>
          <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <div className="row" style={{ justifyContent: "space-between" }}><b style={{ fontSize: "16px" }}>Phiếu thu #0218</b><span className="small" style={{ fontSize: "12px" }}>Ca sáng · 23/10</span></div>
            <div className="row" style={{ justifyContent: "space-between" }}><span>Phòng 101 · 3 đêm</span><span>2.670.000</span></div>
            <div className="row" style={{ justifyContent: "space-between" }}><span>Minibar</span><span>85.000</span></div>
            <div className="row" style={{ justifyContent: "space-between", paddingTop: "8px", borderTop: "1px dashed #E3E8F2", fontWeight: "800" }}><span>Tổng</span><span style={{ color: "#1450F0" }}>2.755.000đ</span></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "14px" }}>
            <div className="card" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "4px" }}><span className="small" style={{ fontSize: "12px" }}>Quỹ tiền mặt</span><b style={{ fontSize: "18px" }}>18.450.000</b></div>
            <div className="card" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "4px" }}><span className="small" style={{ fontSize: "12px" }}>Quỹ tiền gửi</span><b style={{ fontSize: "18px" }}>126.300.000</b></div>
          </div>
          <span className="small" style={{ fontSize: "12px", textAlign: "center" }}>Minh họa</span>
        </div>
      </div>
    </div>
  </div></section><section className="sec dark" id="vai-tro">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "760px" }}>
      <span className="eyebrow">Theo vai trò</span>
      <h2 className="h2" style={{ color: "#fff", fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: "none" }}>Mỗi người thấy đúng phần việc của mình</h2>
    </div>
    <div className="picker">
      <div className="pick-list">
        
                {(v.roles || []).map((r, $index) => (
                  <React.Fragment key={$index}>
          <button className={`pick ${r.cls ?? ''}`} type="button" aria-pressed={r.pressed} onClick={r.pick}><b>{r.name}</b><span>{r.desc}</span></button>
        
                  </React.Fragment>
                ))}
      </div>
      <div style={{ borderRadius: "28px", padding: "36px", background: "radial-gradient(420px 300px at 85% 10%, rgba(27,69,196,.55), transparent 70%), linear-gradient(160deg, #1B3A5C, #122745)", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", color: "#0B1B3F" }}>
          <div className="row" style={{ gap: "12px" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></circle><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><b style={{ fontSize: "17px" }}>Màn hình của {v.role.name}</b></div>
          
                  {(v.role.rows || []).map((x, $index) => (
                    <React.Fragment key={$index}>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", padding: "14px 16px", borderRadius: "12px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "15px" }}>{x.a}</span><b style={{ fontSize: "18px" }}>{x.b}</b></div>
          
                    </React.Fragment>
                  ))}
          <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
        </div>
      </div>
    </div>
  </div></section><section className="soft-grid sec" id="he-sinh-thai" style={{ paddingBottom: "32px" }}>
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "820px" }}>
      <span className="eyebrow">Kết nối hệ sinh thái</span>
      <h2 className="h2">Kết nối với các sản phẩm Bellhop</h2>
      <p className="lead">PMS là trung tâm dữ liệu; các sản phẩm Bellhop khác dùng chung thông tin phòng, giá và khách.</p>
    </div>
    <div className="grid4">
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-cms"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop CMS</h3><p className="small">Phòng trống và giá đồng bộ lên OTA; đặt phòng OTA về PMS.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-booking-engine"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Booking Engine</h3><p className="small">Khách đặt trên website, đặt phòng vào thẳng sơ đồ phòng.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-website"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 9h18M7 6.5h.01M10 6.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Website</h3><p className="small">Website riêng cho khách sạn, có sẵn nút đặt phòng trực tiếp.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-message"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop Message</h3><p className="small">Trả lời khách với thông tin phòng, đặt phòng sẵn có.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-ai-concierge"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "1.8", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">AI Concierge</h3><p className="small">Hỗ trợ khách dựa trên cơ sở kiến thức của khách sạn.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="/san-pham/bellhop-payment"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 10h18M7 15h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Payment</h3><p className="small">Nhận thanh toán online, ghi nhận cùng đặt phòng.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-finance"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Finance</h3><p className="small">Đồng bộ dữ liệu sang phần mềm kế toán.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="/#tong-quan" style={{ background: "#EAF1FF", boxShadow: "none" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4" style={{ fontSize: "17.5px" }}>Tổng quan nền tảng</h3><p className="small">Dùng riêng từng sản phẩm hoặc kết hợp trên cùng một dữ liệu.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Xem tổng quan <span className="arr">→</span></span></a>
    </div>
  </div></section><section className="soft-grid sec" id="bang-gia" style={{ paddingTop: "32px", paddingBottom: "72px" }}>
  <div className="wrap stack" style={{ gap: "32px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Gói &amp; giá</span><h2 className="h2">Bắt đầu miễn phí, chỉ trả cho phần bạn cần</h2><p className="lead">Ba gói nâng cao là module cộng thêm – chọn một hoặc nhiều.</p></div>
    <div className="pm-grid">
      <div className="pm-card free"><span className="pm-chip f">Miễn phí</span><b className="pm-price">0đ</b><ul className="pm-list chk"><li>Cài đặt cơ sở</li><li>Lễ tân</li><li>Sơ đồ phòng &amp; timeline</li><li>Buồng phòng</li><li>Kho cơ bản</li><li>Tạo hóa đơn</li><li>Thu chi cơ bản</li><li>Thống kê</li></ul><a className="pm-btn solid" href="#dang-ky">Dùng thử miễn phí</a></div>
      <div className="pm-card"><span className="pm-chip m">+ Module</span><h3 className="pm-h">Vận hành nâng cao</h3><ul className="pm-list plus"><li>F&amp;B: sơ đồ bàn, đơn hàng, thực đơn, nguyên vật liệu</li><li>Kho chuyên sâu: nhập, trả, điều chuyển, kiểm kê, công nợ</li><li>Email marketing</li></ul><a className="pm-btn" href="#dang-ky">Đặt lịch demo</a></div>
      <div className="pm-card"><span className="pm-chip m">+ Module</span><h3 className="pm-h">Tài chính</h3><ul className="pm-list plus"><li>Hóa đơn điện tử</li><li>Sổ sách</li><li>Quỹ tiền mặt &amp; tiền gửi</li></ul><a className="pm-btn" href="#dang-ky">Đặt lịch demo</a></div>
      <div className="pm-card"><span className="pm-chip m">+ Module</span><h3 className="pm-h">AI &amp; Phân tích</h3><ul className="pm-list plus"><li>Trợ lý AI</li><li>Phân tích doanh thu</li><li>Báo cáo chuyên sâu</li></ul><a className="pm-btn" href="#dang-ky">Đặt lịch demo</a></div>
    </div>
    <div className="card" style={{ padding: "32px", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
      <div className="stack" style={{ gap: "8px", maxWidth: "640px" }}><h3 className="h3">Đang dùng phần mềm khác hay Excel?</h3><p className="p">Chuyển đặt phòng sắp tới, danh sách khách và danh mục phòng sang Bellhop theo hướng dẫn từng bước.</p></div>
      <div className="btns"><a className="btn btn-outline btn-sm" href="#">Xem hướng dẫn chuyển dữ liệu</a><a className="btn btn-primary btn-sm" href="#dang-ky">Nhờ Bellhop hỗ trợ</a></div>
    </div>
    <a className="lnk" href="/#bang-gia" style={{ alignSelf: "center" }}>Xem bảng giá đầy đủ <span className="arr">→</span></a>
  </div></section><section className="sec" id="faq">
  <div className="wrap">
    <div className="feat" style={{ alignItems: "start" }}>
      <div className="feat-txt">
        <span className="eyebrow">FAQ</span>
        <h2 className="h2">Câu hỏi thường gặp về Bellhop PMS</h2>
        <p className="p">Chưa thấy câu trả lời bạn cần? Đội Bellhop sẵn sàng tư vấn theo đúng mô hình của bạn.</p>
        <div className="faq-help">
          <b>Chưa thấy câu trả lời?</b>
          <span>Nhắn Zalo hoặc gọi trực tiếp cho đội Bellhop.</span>
          <div className="btns"><a className="btn btn-primary btn-sm" href="#">Chat Zalo</a><a className="btn btn-outline btn-sm" href="tel:0972096499">Gọi 0972 096 499</a></div>
        </div>
      </div>
      <div className="faq">
        <button className="faq-q" type="button" aria-expanded={v.fe.q0} onClick={v.ft.q0}>Bản miễn phí có giới hạn gì không?<span aria-hidden="true">{v.fs.q0}</span></button>
        
                {Boolean(v.fo.q0) && (
                  <><div className="faq-a"><span className="ph">[Thời hạn, số phòng, số tài khoản]</span>. Các phân hệ nâng cao tính phí theo Bảng giá.</div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q1} onClick={v.ft.q1}>Có dùng được trên điện thoại không?<span aria-hidden="true">{v.fs.q1}</span></button>
        
                {Boolean(v.fo.q1) && (
                  <><div className="faq-a"><span className="ph">[Web trên trình duyệt điện thoại / ứng dụng iOS, Android]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q2} onClick={v.ft.q2}>Nhiều nhân viên dùng cùng lúc được không?<span aria-hidden="true">{v.fs.q2}</span></button>
        
                {Boolean(v.fo.q2) && (
                  <><div className="faq-a">Được. Mỗi nhân viên có tài khoản riêng và quyền theo vai trò. <span className="ph">[Giới hạn số tài khoản ở bản miễn phí]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q3} onClick={v.ft.q3}>Có in được hóa đơn, phiếu nhận phòng không? Dùng máy in nào?<span aria-hidden="true">{v.fs.q3}</span></button>
        
                {Boolean(v.fo.q3) && (
                  <><div className="faq-a">Có. Bellhop hỗ trợ cấu hình máy in và mẫu in. <span className="ph">[Loại máy in hỗ trợ]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q4} onClick={v.ft.q4}>Nâng cấp lên gói nâng cao có mất dữ liệu không?<span aria-hidden="true">{v.fs.q4}</span></button>
        
                {Boolean(v.fo.q4) && (
                  <><div className="faq-a"><span className="ph">[Câu trả lời]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q5} onClick={v.ft.q5}>Có xuất hóa đơn điện tử không?<span aria-hidden="true">{v.fs.q5}</span></button>
        
                {Boolean(v.fo.q5) && (
                  <><div className="faq-a">Có, trong gói Tài chính. <span className="ph">[Nhà cung cấp hóa đơn điện tử tích hợp]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q6} onClick={v.ft.q6}>Có xuất dữ liệu ra Excel được không?<span aria-hidden="true">{v.fs.q6}</span></button>
        
                {Boolean(v.fo.q6) && (
                  <><div className="faq-a"><span className="ph">[Câu trả lời]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q7} onClick={v.ft.q7}>Mất kết nối Internet thì sao?<span aria-hidden="true">{v.fs.q7}</span></button>
        
                {Boolean(v.fo.q7) && (
                  <><div className="faq-a"><span className="ph">[Câu trả lời]</span></div>
                  </>
                )}
      </div>
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
