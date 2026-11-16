import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class FinancePage extends DCLogic {
  constructor(p) { super(p); this.state = { f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', consent: false }, prods: ['Finance'], err: {}, sent: false, mode: 'with', open: 0 }; }
  renderVals() {
    const MODES = [
      { key: 'without', label: 'Không kết nối', title: 'Không kết nối: nhập tay, đối chiếu từng khoản', desc: 'Kế toán xuất báo cáo từ phần mềm quản lý khách sạn rồi nhập lại vào phần mềm kế toán, đối chiếu từng khoản và tự tìm chênh lệch.', bg: 'bg-soft', card: 'Quy trình chốt sổ khi không kết nối', items: [
        { mark: '–', tile: 't-navy', text: 'Xuất báo cáo từ phần mềm quản lý khách sạn', meta: '' },
        { mark: '–', tile: 't-navy', text: 'Nhập lại doanh thu, thu chi vào phần mềm kế toán', meta: '' },
        { mark: '–', tile: 't-navy', text: 'Đối chiếu từng khoản với sổ quỹ, sao kê', meta: '' },
        { mark: '–', tile: 't-navy', text: 'Tìm và điều chỉnh chênh lệch', meta: '' }
      ] },
      { key: 'with', label: 'Với Bellhop Finance', title: 'Với Bellhop Finance: chỉ kiểm tra và xử lý ngoại lệ', desc: 'Dữ liệu đã được đồng bộ sang phần mềm kế toán. Kế toán chỉ cần kiểm tra danh sách chứng từ đã chuyển và tập trung vào các trường hợp ngoại lệ.', bg: 'bg-tint', card: 'Quy trình chốt sổ với Bellhop Finance', items: [
        { mark: '✓', tile: 't-blue', text: 'Dữ liệu đã được đồng bộ sang phần mềm kế toán', meta: 'Theo ngày / theo lệnh' },
        { mark: '✓', tile: 't-blue', text: 'Không cần nhập lại doanh thu, thu chi', meta: '' },
        { mark: '✓', tile: 't-blue', text: 'Chỉ kiểm tra danh sách chứng từ đã chuyển', meta: '' },
        { mark: '✓', tile: 't-blue', text: 'Tập trung xử lý các trường hợp ngoại lệ', meta: '' }
      ] }
    ];
    const mk = this.state.mode;
    const tabs = MODES.map((m) => ({ label: m.label, cls: m.key === mk ? 'on' : '', pressed: m.key === mk ? 'true' : 'false', pick: () => this.setState({ mode: m.key }) }));
    const mode = MODES.filter((m) => m.key === mk)[0] || MODES[1];
    const F = [
      'Bellhop Finance kết nối với phần mềm kế toán nào?',
      'Dữ liệu được đồng bộ theo thời gian thực hay theo kỳ?',
      'Có cần thay đổi hệ thống tài khoản đang sử dụng không?',
      'Đồng bộ lỗi thì xử lý thế nào?',
      'Khách sạn có nhiều cơ sở thì đồng bộ ra sao?',
      'Cơ sở đang dùng phần mềm kế toán riêng có kết nối được không?'
    ];
    const o = this.state.open;
    const faq = F.map((q, i) => ({ q: q, open: o === i, exp: o === i ? 'true' : 'false', sign: o === i ? '–' : '+', toggle: () => this.setState({ open: this.state.open === i ? -1 : i }) }));
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

    return { form: _form, tabs, mode, faq };
  }

  componentDidMount() {
    document.title = "Bellhop Finance – Đồng bộ dữ liệu sang phần mềm kế toán";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="finance" startOpen={false} /><section className="p-hero fin-hero">
  <div className="wrap p-hero-in">
    <div className="stack" style={{ gap: "22px" }}>
      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0" }}><a href="/">Trang chủ</a><span>›</span><a href="/#tong-quan">Sản phẩm</a><span>›</span><span style={{ color: "#0B1B3F", fontWeight: "600" }}>Bellhop Finance</span></nav>
      <span className="kick">Bellhop Finance · Kết nối phần mềm kế toán</span>
      <h1 className="display">Số liệu khách sạn tự sang phần mềm kế toán, kế toán không phải nhập lại</h1>
      <p className="lead">Bellhop Finance chuyển dữ liệu doanh thu, thu chi và hóa đơn từ hệ thống Bellhop sang phần mềm kế toán, giúp giảm nhập liệu thủ công và rút ngắn thời gian đối chiếu khi chốt sổ.</p>
      <div className="btns"><a className="btn btn-navy" href="#dang-ky">Đặt lịch tư vấn <span>→</span></a></div>
    </div>
    <div className="fn-vis">
      <div className="fn-scene" aria-hidden="true"><span className="fn-lamp"></span><span className="fn-sign">RECEPTION</span><span className="fn-desk"></span></div>
      <div className="fn-tb a"><div className="fn-th"><b>Bellhop · Doanh thu 23/10</b><span className="fn-tag">Lễ tân</span></div><div className="fn-tr hd"><b>Chứng từ</b><span>Diễn giải</span><em>Số tiền</em></div><div className="fn-tr"><b>PT0218</b><span>Tiền phòng 101</span><em className="">2.670.000</em></div><div className="fn-tr"><b>PT0219</b><span>F&amp;B bàn B4 → P201</span><em className="">215.000</em></div><div className="fn-tr"><b>PC0045</b><span>Mua nước suối</span><em className="neg">-480.000</em></div></div>
      <span className="fn-sync"><i></i>Bellhop Finance đồng bộ <span>›</span></span>
      <div className="fn-tb b"><div className="fn-th"><b>Phần mềm kế toán · Chứng từ đã nhận</b><span className="fn-tag g">Kế toán</span></div><div className="fn-tr hd"><b>Số CT</b><span>TK Nợ / Có</span><em>Số tiền</em></div><div className="fn-tr"><b>PT0218</b><span>1111 / 5113</span><em>2.670.000</em></div><div className="fn-tr"><b>PT0219</b><span>1111 / 5113</span><em>215.000</em></div><div className="fn-tr"><b>PC0045</b><span>1561 / 1111</span><em>480.000</em></div></div>
      <span className="fn-note">✦ Dữ liệu minh họa · tài khoản theo ánh xạ của từng cơ sở</span>
    </div>
  </div></section><section className="sec-sm">
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Vì sao cần Bellhop Finance</span>
      <h2 className="h2">Số liệu đi một chiều, từ quầy lễ tân đến sổ kế toán</h2>
    </div>
    <div className="grid3">
      <div className="fcard"><span className="tile t-blue" style={{ width: "48px", height: "48px", borderRadius: "14px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Không nhập lại doanh thu</h3><p className="p">Doanh thu phòng, dịch vụ, F&amp;B và thu chi từ Bellhop được chuyển sang phần mềm kế toán.</p></div>
      <div className="fcard"><span className="tile t-orange" style={{ width: "48px", height: "48px", borderRadius: "14px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path><path d="M10 12h5M10 16h5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Hóa đơn từ quầy vào sổ</h3><p className="p">Hóa đơn điện tử xuất tại quầy được đưa sang kế toán.</p></div>
      <div className="fcard"><span className="tile t-navy" style={{ width: "48px", height: "48px", borderRadius: "14px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path><path d="M9 12l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Kiểm soát trước khi ghi sổ</h3><p className="p">Nhật ký đồng bộ, cảnh báo lỗi, kế toán duyệt trước khi hạch toán.</p></div>
    </div>
  </div></section><section className="soft-grid sec" id="du-lieu">
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Dữ liệu đồng bộ</span>
      <h2 className="h2">Những dữ liệu được chuyển sang phần mềm kế toán</h2>
    </div>
    <div className="card" style={{ overflow: "hidden", maxWidth: "1000px", width: "100%", margin: "0 auto" }}>
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "640px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) 32px minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "16px", padding: "18px 28px", background: "#EAF1FF", fontSize: "14px", fontWeight: "800" }}><span>Dữ liệu trên Bellhop</span><span></span><span>Chứng từ / đối tượng trên phần mềm kế toán</span><span>Tần suất</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) 32px minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "16px", padding: "16px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px", alignItems: "center" }}><b>Doanh thu phòng</b><span style={{ color: "#1450F0" }}>→</span><span><span className="ph">[chứng từ bán hàng]</span></span><span><span className="ph">[ ]</span></span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) 32px minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "16px", padding: "16px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px", alignItems: "center" }}><b>Doanh thu dịch vụ, F&amp;B</b><span style={{ color: "#1450F0" }}>→</span><span><span className="ph">[ ]</span></span><span><span className="ph">[ ]</span></span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) 32px minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "16px", padding: "16px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px", alignItems: "center" }}><span><b>Phiếu thu, phiếu chi</b><br /><span className="small">Quỹ tiền mặt</span></span><span style={{ color: "#1450F0" }}>→</span><span><span className="ph">[phiếu thu/chi]</span></span><span><span className="ph">[ ]</span></span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) 32px minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "16px", padding: "16px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px", alignItems: "center" }}><span><b>Thu, chi qua ngân hàng</b><br /><span className="small">Quỹ tiền gửi</span></span><span style={{ color: "#1450F0" }}>→</span><span><span className="ph">[ ]</span></span><span><span className="ph">[ ]</span></span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) 32px minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "16px", padding: "16px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px", alignItems: "center" }}><span><b>Hóa đơn điện tử</b><br /><span className="small">Đã phát hành</span></span><span style={{ color: "#1450F0" }}>→</span><span><span className="ph">[ ]</span></span><span><span className="ph">[ ]</span></span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) 32px minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "16px", padding: "16px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px", alignItems: "center" }}><span><b>Danh mục</b><br /><span className="small">Khách hàng, hàng hóa, dịch vụ</span></span><span style={{ color: "#1450F0" }}>→</span><span><span className="ph">[danh mục]</span></span><span><span className="ph">[ ]</span></span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) 32px minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "16px", padding: "16px 28px", fontSize: "16px", alignItems: "center" }}><span><b>Nhập kho, công nợ</b><br /><span className="small">Nhà cung cấp</span></span><span style={{ color: "#1450F0" }}>→</span><span><span className="ph">[ ]</span></span><span><span className="ph">[ ]</span></span></div>
        </div>
      </div>
    </div>
  </div></section><section className="sec" id="chot-so">
  <div className="wrap stack" style={{ gap: "36px" }}>
    <div className="stack" style={{ gap: "12px" }}>
      <span className="kick">Cuối tháng</span>
      <h2 className="h2">Quy trình chốt sổ cuối tháng</h2>
      <p className="p" style={{ fontSize: "16px" }}>So sánh quy trình làm việc thủ công và khi có Bellhop Finance tự động đồng bộ sang MISA.</p>
    </div>
    <div className="cs">
      <div className="cs-col cs-old">
        <div className="cs-top"><span className="cs-tag">Quy trình cũ</span></div>
        <h3>Không kết nối (Thao tác thủ công)</h3>
        <p className="cs-sub">Kế toán phải mất nhiều thời gian nhập liệu lại và rà soát thủ công</p>
        <ul><li><span className="cs-n">01</span><span><b>Xuất báo cáo từ phần mềm khách sạn</b><small>Cuối ngày hoặc cuối tháng phải xuất các báo cáo doanh thu phòng, dịch vụ F&amp;B ra file Excel.</small></span></li><li><span className="cs-n">02</span><span><b>Nhập lại doanh thu, thu chi vào MISA</b><small>Gõ lại từng phiếu thu, phiếu chi, hóa đơn vào phần mềm MISA bằng tay, tốn nhiều giờ làm việc.</small></span></li><li><span className="cs-n">03</span><span><b>Đối chiếu từng khoản với sổ quỹ, sao kê</b><small>So khớp từng dòng giữa sổ quỹ nội bộ lễ tân và sao kê tài khoản ngân hàng để tìm chênh lệch.</small></span></li><li><span className="cs-n">04</span><span><b>Tìm và điều chỉnh chênh lệch số liệu</b><small>Dễ sót hóa đơn, nhầm mã dịch vụ; mất nhiều ngày căng thẳng mỗi kỳ chốt sổ.</small></span></li></ul>
      </div>
      <div className="cs-col cs-new">
        <div className="cs-top"><span className="cs-tag">Tự động hóa</span><span className="cs-pill">Tiết kiệm 80% thời gian</span></div>
        <h3>Với Bellhop Finance (Đồng bộ tức thì)</h3>
        <p className="cs-sub">Dữ liệu được hạch toán tự động sang MISA, số liệu chuẩn xác 100%</p>
        <ul><li className=""><span className="cs-n">01</span><span><b>Dữ liệu được tự động sang MISA</b><small>Doanh thu phòng, dịch vụ, thu chi chuyển thẳng thành chứng từ MISA theo ngày hoặc theo lệnh.</small></span></li><li className="skip"><span className="cs-n">02</span><span><b>Nhập lại doanh thu, thu chi vào MISA <em>Bỏ qua</em></b><small>Hoàn toàn loại bỏ khâu nhập liệu thủ công tốn thời gian và dễ nhầm lẫn.</small></span></li><li className=""><span className="cs-n">03</span><span><b>Kiểm tra danh sách chứng từ đã chuyển</b><small>Kế toán chỉ cần mở danh sách chứng từ đã nhận để kiểm tra nhanh trạng thái khớp lệnh.</small></span></li><li className=""><span className="cs-n">04</span><span><b>Đối chiếu &amp; xử lý ngoại lệ nhẹ nhàng</b><small>Số liệu chuẩn xác giữa 2 hệ thống, chốt sổ nhẹ nhàng chỉ trong vài chục phút.</small></span></li></ul>
      </div>
    </div>
  </div></section><section className="soft-grid sec">
  <div className="wrap stack" style={{ gap: "120px" }}>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Hóa đơn điện tử &amp; sổ sách</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Lễ tân, hệ thống và kế toán dùng chung một nguồn số liệu</h3>
        <p className="p">Hóa đơn điện tử, sổ sách và quỹ được quản lý trong gói Tài chính của Bellhop PMS; Bellhop Finance chuyển các dữ liệu này sang phần mềm kế toán.</p>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms">Tìm hiểu gói Tài chính của Bellhop PMS <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint">
        <div className="stack" style={{ gap: "14px", maxWidth: "440px", margin: "0 auto" }}>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>Lễ tân</span><b style={{ display: "block" }}>Bellhop PMS</b><span className="small">Xuất hóa đơn, ghi nhận thu chi ngay khi khách trả phòng.</span></span></div>
          <span style={{ alignSelf: "center", fontSize: "22px", color: "#1450F0" }}>↓</span>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center", boxShadow: "0 0 0 2px #2E9AA5, 0 24px 50px -28px rgba(46,154,165,.5)" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>Tự động</span><b style={{ display: "block" }}>Bellhop Finance</b><span className="small">Chuyển chứng từ sang phần mềm kế toán theo ánh xạ tài khoản của cơ sở.</span></span></div>
          <span style={{ alignSelf: "center", fontSize: "22px", color: "#1450F0" }}>↓</span>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center" }}><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>Kế toán</span><b style={{ display: "block" }}>Phần mềm kế toán</b><span className="small">Hạch toán, lập báo cáo từ số liệu đã có sẵn.</span></span></div>
        </div>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Kiểm soát</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Kiểm soát dữ liệu trước khi hạch toán</h3>
        <ul className="ticks">
          <li><span><b>Nhật ký đồng bộ</b>: thời điểm, số chứng từ, trạng thái</span></li>
          <li><span><b>Cảnh báo lỗi</b>: báo và hướng dẫn xử lý lỗi đồng bộ</span></li>
          <li><span><b>Duyệt trước khi ghi sổ</b>: kế toán duyệt trước khi hạch toán</span></li>
          <li><span><b>Phân quyền</b>: chỉ tài khoản được cấp xem dữ liệu tài chính</span></li>
        </ul>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #E3E8F2" }}><b style={{ fontSize: "14px" }}>Nhật ký đồng bộ</b></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)", gap: "12px", padding: "10px 18px", background: "#F5F8FE", fontSize: "12px", fontWeight: "700", color: "#4A5873" }}><span>Thời điểm</span><span>Chứng từ</span><span>Trạng thái</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)", gap: "12px", padding: "14px 18px", borderBottom: "1px solid #E3E8F2", fontSize: "14px", alignItems: "center" }}><span>23/10 23:00</span><b>42</b><span className="chip" style={{ height: "26px", fontSize: "12px", justifySelf: "start" }}>Thành công</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)", gap: "12px", padding: "14px 18px", fontSize: "14px", alignItems: "center" }}><span>22/10 23:00</span><b>38 / 1 lỗi</b><span className="chip" style={{ height: "26px", fontSize: "12px", justifySelf: "start", background: "#E6F6F7", color: "#1E6E76" }}>Cần xử lý</span></div>
          <div className="row" style={{ gap: "12px", margin: "0 18px 18px", padding: "12px 14px", borderRadius: "12px", background: "#E6F6F7", fontSize: "13px" }}><span className="tile t-orange" style={{ width: "28px", height: "28px", borderRadius: "8px", fontWeight: "800" }}>!</span><span>Thiếu mã hàng “NUOC-01”</span></div>
        </div>
        <p className="small" style={{ fontSize: "12px", marginTop: "12px" }}>Dữ liệu minh họa</p>
      </div>
    </div>

  </div></section><section className="sec">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "820px" }}>
      <span className="eyebrow">Triển khai</span>
      <h2 className="h2">Bellhop cùng kế toán thiết lập kết nối</h2>
      <p className="lead">Thời gian triển khai <span className="ph">[ ]</span> · Bellhop hỗ trợ kế toán thiết lập.</p>
    </div>
    <div className="proc">
      <div className="proc-img"><img src="/assets/64926e3c4de0e78477dae7aae6277f1f.jpg" alt="Khu nghỉ dưỡng ven biển" /></div>
      <div className="proc-list">
        <details className="proc-it" name="proc" open={true}>
          <summary><span className="n">01</span><b>Khảo sát <span className="proc-role">Bellhop</span></b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Khảo sát phần mềm kế toán, hệ thống tài khoản. Kế toán của cơ sở cung cấp danh mục đang dùng.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">02</span><b>Thiết lập ánh xạ <span className="proc-role">Bellhop</span></b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Thiết lập ánh xạ tài khoản, danh mục.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">03</span><b>Chạy thử <span className="proc-role">Kế toán</span></b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Chạy thử với dữ liệu một kỳ và đối chiếu.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">04</span><b>Vận hành chính thức <span className="proc-role">Kế toán</span></b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Kế toán duyệt và vận hành chính thức. Bellhop hỗ trợ khi có lỗi đồng bộ.</p></div>
        </details>
      </div>
    </div>
    <div className="try-pill blue" style={{ boxShadow: "inset 0 0 0 1.5px #1450F0, 0 14px 34px -22px rgba(20,80,240,.7)" }}><span style={{ color: "#0B1E4A" }}>Chi phí Bellhop Finance</span><a href="/#bang-gia" style={{ background: "linear-gradient(90deg, #1450F0, #2F8BFF)", color: "#FFFFFF" }}>Xem bảng giá</a></div>
  </div></section><section className="soft-grid sec">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px" }}><span className="eyebrow">Hệ sinh thái</span><h2 className="h2">Kết nối với các sản phẩm Bellhop</h2></div>
    <div className="grid4">
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-pms"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Bellhop PMS</h3><p className="small">Lễ tân, buồng phòng, kho &amp; F&amp;B, báo cáo</p><span className="lnk" style={{ marginTop: "auto" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-booking-engine"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Booking Engine</h3><p className="small">Nhận đặt phòng trực tiếp trên website</p><span className="lnk" style={{ marginTop: "auto" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-cms"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop CMS</h3><p className="small">Đồng bộ kênh OTA, định giá linh động</p><span className="lnk" style={{ marginTop: "auto" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-website"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 9h18M7 6.5h.01M10 6.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Website</h3><p className="small">Website cho khách sạn, homestay, villa</p><span className="lnk" style={{ marginTop: "auto" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-message"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop Message</h3><p className="small">Gom tin nhắn mọi kênh về một nơi</p><span className="lnk" style={{ marginTop: "auto" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-ai-concierge"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "1.8", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">AI Concierge</h3><p className="small">Trợ lý AI trả lời khách</p><span className="lnk" style={{ marginTop: "auto" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="/san-pham/bellhop-payment"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 10h18M7 15h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Payment</h3><p className="small">Nhận thanh toán online cho cơ sở</p><span className="lnk" style={{ marginTop: "auto" }}>Xem <span className="arr">→</span></span></a>
    </div>
  </div></section><section className="sec">
  <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "flex-start" }}>
    <div className="stack" style={{ gap: "16px", flex: "1 1 300px" }}>
      <span className="eyebrow">FAQ</span>
      <h2 className="h2">Câu hỏi thường gặp về Bellhop Finance</h2>
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
            <div className="faq-a" style={{ paddingTop: "16px" }}><span className="ph">[Câu trả lời]</span></div>
          
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
