import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class PaymentPage extends DCLogic {
  constructor(p) { super(p); this.state = { f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', consent: false }, prods: ['Payment'], err: {}, sent: false, tab: 'coc', open: 0 }; }
  renderVals() {
    const M = [
      { key: 'coc', label: 'Đặt cọc, thanh toán trước', title: 'Đặt cọc, thanh toán trước', soon: false, desc: 'Gửi đường dẫn thanh toán cho khách qua tin nhắn. Khách thanh toán xong, khoản tiền tự gắn vào đặt phòng tương ứng.', link: 'Bellhop Message', href: 'https://bellhop.vn/san-pham/bellhop-message' },
      { key: 'quay', label: 'Tại quầy', title: 'Thanh toán tại quầy', soon: false, desc: 'Ghi nhận cùng hóa đơn của khách, ngay trên Bellhop PMS.', link: 'Bellhop PMS', href: 'https://bellhop.vn/san-pham/bellhop-pms' },
      { key: 'web', label: 'Khi đặt trên website', title: 'Khi đặt phòng trên website', soon: true, desc: 'Thanh toán ngay khi khách đặt phòng trên Booking Engine nằm trong lộ trình phát triển.', link: 'Booking Engine', href: 'https://bellhop.vn/san-pham/bellhop-booking-engine' },
      { key: 'huy', label: 'Phí hủy, no-show', title: 'Phí hủy phòng, no-show', soon: true, desc: 'Thu phí hủy phòng và no-show theo chính sách của cơ sở.', link: 'Đặt lịch tư vấn', href: '#dang-ky' }
    ];
    const tk = this.state.tab;
    const tabs = M.map((m) => ({ label: m.label, cls: m.key === tk ? 'on' : '', pressed: m.key === tk ? 'true' : 'false', pick: () => this.setState({ tab: m.key }) }));
    const mo = M.filter((m) => m.key === tk)[0] || M[0];
    const F = [
      ['Khách nước ngoài có thanh toán được không?', ''],
      ['Tiền thanh toán về tài khoản nào, sau bao lâu?', ''],
      ['Hoàn tiền cho khách được thực hiện như thế nào?', ''],
      ['Có thể dùng Bellhop Payment mà không dùng Bellhop PMS không?', ''],
      ['Khách có thanh toán được khi đặt phòng trên website không?', 'Tính năng thanh toán trên Booking Engine nằm trong lộ trình phát triển.'],
      ['Ai chịu trách nhiệm khi có tranh chấp giao dịch?', '']
    ];
    const o = this.state.open;
    const faq = F.map((f, i) => ({ q: f[0], a: f[1], hasA: !!f[1], noA: !f[1], open: o === i, exp: o === i ? 'true' : 'false', sign: o === i ? '–' : '+', toggle: () => this.setState({ open: this.state.open === i ? -1 : i }) }));
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

    return { form: _form, tabs, mo, isCoc: tk === 'coc', isQuay: tk === 'quay', isWeb: tk === 'web', isHuy: tk === 'huy', faq };
  }

  componentDidMount() {
    document.title = "Bellhop Payment – Thanh toán online cho khách sạn";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="payment" startOpen={false} /><section className="p-hero pay-hero">
  <div className="wrap stack" style={{ gap: "22px", alignItems: "center", textAlign: "center" }}>
    <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0", alignSelf: "flex-start", justifyContent: "flex-start" }}><a href="/">Trang chủ</a><span>›</span><a href="/#tong-quan">Sản phẩm</a><span>›</span><b>Bellhop Payment</b></nav>
    <span className="eyebrow">Bellhop Payment</span>
    <h1 className="display" style={{ maxWidth: "900px" }}>Thanh toán online cho cơ sở lưu trú, <span className="hl">đối soát ngay trên Bellhop</span></h1>
    <p className="lead" style={{ maxWidth: "780px" }}>Bellhop Payment kết nối với nền tảng thanh toán dành riêng cho ngành lưu trú, giúp khách sạn nhận thanh toán online và theo dõi giao dịch cùng dữ liệu đặt phòng trong hệ thống Bellhop.</p>
    <div className="btns" style={{ justifyContent: "center" }}><a className="btn ai-cta" href="#dang-ky">Đặt lịch tư vấn <span>→</span></a><a className="btn btn-outline" href="#phi">Xem phí giao dịch</a></div>
  </div></section><section className="pay-feats">
  <div className="wrap pay-feat-grid">
    <div className="pay-feat"><span className="pay-fic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6M22 21a6 6 0 0 0-5-6" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Tinh giản vận hành</h3><p>Tiết kiệm thời gian và giảm lỗi nhập thủ công với các khoản thanh toán và giao dịch tập trung trên một nền tảng.</p></div>
    <div className="pay-feat"><span className="pay-fic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5M12 8v4l3 2" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Giao dịch tự động</h3><p>Tự động hóa đặt phòng trực tuyến, chẳng hạn như ủy quyền, đặt cọc hoặc thanh toán trước.</p></div>
    <div className="pay-feat"><span className="pay-fic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Thiết bị đầu cuối</h3><p>Thêm các thiết bị đầu cuối hiện đại tùy chọn, cho phép xử lý tất cả các loại thanh toán bằng thẻ.</p></div>
    <div className="pay-feat"><span className="pay-fic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h12v9H3zM7 18h4M9 14v4M17 8h4v12h-4zM19 17h.01" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Hỗ trợ 24/7</h3><p>Đội ngũ hỗ trợ tư vấn tận tâm, chuyên nghiệp, giúp tránh gian lận và giải quyết các vấn đề nhanh chóng.</p></div>
  </div></section><section className="sec-sm">
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Vì sao dùng Bellhop Payment</span>
      <h2 className="h2">Tiền vào đâu, cho đặt phòng nào – luôn rõ ràng</h2>
    </div>
    <div className="grid3">
      <div className="fcard"><span className="tile t-blue" style={{ width: "48px", height: "48px", borderRadius: "14px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Thu cọc qua đường dẫn</h3><p className="p">Gửi đường dẫn thanh toán cho khách qua tin nhắn – khách đặt cọc hoặc thanh toán trước.</p></div>
      <div className="fcard"><span className="tile t-orange" style={{ width: "48px", height: "48px", borderRadius: "14px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Gắn với từng đặt phòng</h3><p className="p">Mỗi khoản tiền được ghi nhận cùng đặt phòng tương ứng trong Bellhop PMS.</p></div>
      <div className="fcard"><span className="tile t-navy" style={{ width: "48px", height: "48px", borderRadius: "14px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Khớp với sổ sách</h3><p className="p">Lễ tân và kế toán đối chiếu mà không cần tra cứu trên nhiều hệ thống.</p></div>
    </div>
  </div></section><section className="sec pay-new" style={{ paddingBottom: "64px" }}>
  <div className="wrap pay-new-in">
    <div className="stack" style={{ gap: "22px" }}>
      <span className="kick">Giải pháp thanh toán tối ưu</span>
      <h2 className="h2">Phương thức thanh toán mới</h2>
      <div className="pay-pt"><span>✓</span><p>Cung cấp một phương thức thanh toán mới, phù hợp với xu thế thị trường, đáp ứng thanh toán mọi lúc mọi nơi với chi phí tối ưu.</p></div>
      <div className="pay-pt"><span>✓</span><p>Cho phép khách thanh toán nhanh chóng các hóa đơn khách sạn, giảm tỷ lệ thu tiền mặt, quẹt thẻ, chuyển khoản – giảm công sức của nhân viên khi thu tiền của khách.</p></div>
      <a className="btn btn-navy" href="#dang-ky" style={{ alignSelf: "flex-start", marginTop: "6px" }}>Dùng thử miễn phí <span>→</span></a>
    </div>
    <div className="pay-vis">
      <div className="pay-app">
        <div className="pay-app-h"><span className="pay-logo">B</span><span style={{ flex: "1" }}><b>Bellhop Pay</b><small>Hệ thống thanh toán tự động ngành lưu trú</small></span><span className="pay-live">● Trực tuyến</span></div>
        <div className="pay-app-b">
          <div className="pay-inv"><span><small>Hóa đơn đặt phòng #BH-8924</small><b>1.450.000 đ</b></span><em>✓ Khớp PMS</em></div>
          <span className="pay-lab">Chọn phương thức thanh toán nhanh:</span>
          <div className="pay-ms">
            <div className="pay-m on"><span className="pay-mi qr"></span><span><b>VietQR</b><small>Quét mã tức thì</small></span></div>
            <div className="pay-m"><span className="pay-mi dot"></span><span><b>Ví điện tử</b><small>Chạm 1 chạm</small></span><em>Hỗ trợ thẻ QT</em></div>
            <div className="pay-m"><span className="pay-mi card"></span><span><b>Thẻ online</b><small>Visa, Napas</small></span><em className="g">Bảo mật</em></div>
          </div>
          <span className="pay-go">Xác nhận thanh toán ngay →</span>
        </div>
      </div>
      <div className="pay-float a"><span className="pf-ic">⚡</span><span><b>Giảm tiền mặt &amp; đối soát</b><small>Giảm công sức thu tiền cho lễ tân</small></span></div>
      <div className="pay-float b"><span className="pf-ic ok">✓</span><span><b>Tự động gạch nợ</b><small>Cập nhật ngay vào Bellhop PMS</small></span></div>
      <span className="pay-note">Minh họa</span>
    </div>
  </div></section><section className="soft-grid sec" style={{ padding: "64px 0" }}>
  <div className="wrap stack" style={{ gap: "28px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Nhận thanh toán</span>
      <h2 className="h2">Thu tiền đúng lúc khách thường thanh toán</h2>
    </div>
    <div className="tabs">
      
              {(v.tabs || []).map((t, $index) => (
                <React.Fragment key={$index}><button className={`tab ${t.cls ?? ''}`} type="button" aria-pressed={t.pressed} onClick={t.pick}>{t.label}</button>
                </React.Fragment>
              ))}
    </div>
    <div className="feat">
      <div className="feat-txt">
        <div className="row" style={{ gap: "12px", flexWrap: "wrap" }}><h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>{v.mo.title}</h3>
                  {Boolean(v.mo.soon) && (
                    <><span className="chip" style={{ background: "#E6F6F7", color: "#1E6E76" }}>Sắp ra mắt</span>
                    </>
                  )}</div>
        <p className="p">{v.mo.desc}</p>
        <a className="lnk" href={v.mo.href}>{v.mo.link} <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
                {Boolean(v.isCoc) && (
                  <>
          <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px", maxWidth: "420px", width: "100%", margin: "0 auto" }}>
            <div className="row" style={{ gap: "10px" }}><span className="tile t-blue" style={{ fontSize: "13px", fontWeight: "800" }}>TH</span><span><b style={{ display: "block", fontSize: "15px" }}>Thu Hà</b><span className="small" style={{ fontSize: "12px" }}>Zalo</span></span></div>
            <span style={{ alignSelf: "flex-end", maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", background: "#1450F0", color: "#fff", fontSize: "14px" }}>Dạ chị đặt cọc giúp em qua đường dẫn này nhé ạ.</span>
            <div style={{ alignSelf: "flex-end", width: "min(300px, 90%)", padding: "14px", borderRadius: "14px", boxShadow: "0 0 0 1px #E3E8F2", display: "flex", flexDirection: "column", gap: "6px" }}><span className="small" style={{ fontSize: "12px" }}>Link đặt cọc · #BK-2039</span><b style={{ fontSize: "20px" }}>650.000đ</b><span className="btn btn-primary btn-sm">Thanh toán</span></div>
            <div className="row" style={{ gap: "10px", padding: "12px 14px", borderRadius: "12px", background: "#EAF1FF" }}><span style={{ color: "#1450F0", fontWeight: "800" }}>✓</span><span style={{ fontSize: "14px" }}><b>Đã nhận đặt cọc</b> · gắn vào #BK-2039</span></div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isQuay) && (
                  <>
          <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px", width: "100%", margin: "0 auto" }}>
            <div className="row" style={{ justifyContent: "space-between" }}><b style={{ fontSize: "16px" }}>Hóa đơn phòng 203</b><span className="chip" style={{ height: "26px", fontSize: "12px" }}>Đã thu</span></div>
            <div className="row" style={{ justifyContent: "space-between", fontSize: "14px", padding: "10px 0", borderBottom: "1px solid #E3E8F2" }}><span>Tiền phòng · 2 đêm</span><b>1.300.000</b></div>
            <div className="row" style={{ justifyContent: "space-between", fontSize: "14px", padding: "10px 0", borderBottom: "1px solid #E3E8F2" }}><span>Dịch vụ</span><b>120.000</b></div>
            <div className="row" style={{ justifyContent: "space-between", fontSize: "14px", padding: "10px 0", borderBottom: "1px solid #E3E8F2" }}><span>Đã đặt cọc</span><b>-650.000</b></div>
            <div className="row" style={{ justifyContent: "space-between", fontSize: "16px", paddingTop: "6px" }}><b>Còn lại</b><b style={{ color: "#1450F0" }}>770.000đ</b></div>
            <span className="btn btn-primary btn-sm" style={{ width: "100%" }}>Thu tiền</span>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isWeb) && (
                  <>
          <div className="card" style={{ overflow: "hidden", maxWidth: "420px", width: "100%", margin: "0 auto" }}>
            <img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="" style={{ display: "block", width: "100%", height: "140px", objectFit: "cover" }} />
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <b style={{ fontSize: "15px" }}>Đặt phòng trên website của bạn</b>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px", fontSize: "13px" }}><span style={{ padding: "10px 12px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "12px" }}>Nhận phòng</span><br /><b>Th 6, 23/10</b></span><span style={{ padding: "10px 12px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "12px" }}>Trả phòng</span><br /><b>CN, 25/10</b></span></div>
              <div className="ph-box" style={{ minHeight: "56px" }}>Thanh toán ngay khi đặt phòng</div>
              <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
            </div>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isHuy) && (
                  <>
          <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px", width: "100%", margin: "0 auto" }}>
            <b style={{ fontSize: "16px" }}>Chính sách thu tiền của cơ sở</b>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", fontSize: "14px", padding: "12px 14px", borderRadius: "12px", background: "#F5F8FE" }}><span>Phí hủy phòng</span><span className="ph">[theo chính sách]</span></div>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", fontSize: "14px", padding: "12px 14px", borderRadius: "12px", background: "#F5F8FE" }}><span>No-show</span><span className="ph">[theo chính sách]</span></div>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", fontSize: "14px", padding: "12px 14px", borderRadius: "12px", background: "#F5F8FE" }}><span>Mức đặt cọc</span><b>50%</b></div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
      </div>
    </div>
  </div></section><section className="sec" style={{ paddingBottom: "56px" }}>
  <div className="wrap stack" style={{ gap: "120px" }}>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Đối soát</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Giao dịch gắn với đặt phòng và sổ sách</h3>
        <p className="p">Mỗi khoản thanh toán được ghi nhận cùng đặt phòng tương ứng trong Bellhop PMS, giúp lễ tân và kế toán đối chiếu mà không cần tra cứu trên nhiều hệ thống.</p>
        <ul className="ticks">
          <li><span>Trạng thái thanh toán hiển thị ngay trên đặt phòng</span></li>
          <li><span>Danh sách giao dịch theo ngày, theo phương thức</span></li>
          <li><span>Hoàn tiền theo chính sách của cơ sở</span></li>
          <li><span>Đồng bộ sang <b>Bellhop Finance</b> và phần mềm kế toán</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-finance">Tìm hiểu Bellhop Finance <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint-o" style={{ padding: "32px" }}>
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #E3E8F2" }}><b style={{ fontSize: "14px" }}>Bellhop · Giao dịch thanh toán</b></div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: "13px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr) minmax(0, 1fr)", gap: "10px", padding: "12px 18px", borderBottom: "1px solid #E3E8F2", alignItems: "center" }}><span><b style={{ display: "block" }}>#BK-2041</b><span className="small" style={{ fontSize: "12px" }}>23/10 09:12 · Deluxe 101</span></span><span className="small" style={{ fontSize: "12px" }}>Visa •••• 4242</span><b>890.000</b><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đã đồng bộ</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr) minmax(0, 1fr)", gap: "10px", padding: "12px 18px", borderBottom: "1px solid #E3E8F2", alignItems: "center" }}><span><b style={{ display: "block" }}>#BK-2039</b><span className="small" style={{ fontSize: "12px" }}>23/10 08:47 · Family 201</span></span><span className="small" style={{ fontSize: "12px" }}>Link · Đặt cọc 50%</span><b>650.000</b><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#1E6E76" }}>Chờ đồng bộ</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr) minmax(0, 1fr)", gap: "10px", padding: "12px 18px", borderBottom: "1px solid #E3E8F2", alignItems: "center" }}><span><b style={{ display: "block" }}>#BK-2031</b><span className="small" style={{ fontSize: "12px" }}>22/10 21:05 · Superior 204</span></span><span className="small" style={{ fontSize: "12px" }}>Mastercard •••• 8812 · Hoàn tiền</span><b>-450.000</b><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đã đồng bộ</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr) minmax(0, 1fr)", gap: "10px", padding: "12px 18px", alignItems: "center" }}><span><b style={{ display: "block" }}>#BK-2027</b><span className="small" style={{ fontSize: "12px" }}>22/10 14:30 · Standard 103</span></span><span className="small" style={{ fontSize: "12px" }}>Tại quầy</span><b>650.000</b><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đã đồng bộ</span></div>
          </div>
        </div>
        <p className="small" style={{ fontSize: "12px", marginTop: "12px" }}>Dữ liệu minh họa</p>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Phương thức</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Khách trong nước và quốc tế đều thanh toán được</h3>
        <p className="p">Cổng thanh toán hỗ trợ thẻ quốc tế, thẻ nội địa và thanh toán qua đường dẫn.</p>
        <div className="row" style={{ gap: "10px", flexWrap: "wrap" }}><span className="small" style={{ fontWeight: "700", color: "#0B1B3F" }}>Tiền tệ hỗ trợ:</span><span className="ph">[VND, USD…]</span></div>
      </div>
      <div className="feat-vis bg-soft">
        <div className="card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "18px", maxWidth: "460px", margin: "0 auto" }}>
          <b style={{ fontSize: "15px" }}>Phương thức thanh toán</b>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px" }}>
            <div className="ph-box" style={{ minHeight: "56px" }}>Visa</div><div className="ph-box" style={{ minHeight: "56px" }}>Mastercard</div>
            <div className="ph-box" style={{ minHeight: "56px" }}>JCB</div><div className="ph-box" style={{ minHeight: "56px" }}>Amex</div>
            <div className="ph-box" style={{ minHeight: "56px" }}>Thẻ nội địa</div><div className="ph-box" style={{ minHeight: "56px" }}>Ví điện tử</div>
            <div className="ph-box" style={{ minHeight: "56px" }}>Chuyển khoản / QR</div><div className="ph-box" style={{ minHeight: "56px" }}>Khác</div>
          </div>
          <span className="small" style={{ fontSize: "12px" }}><span className="ph">[Danh sách phương thức được hỗ trợ]</span></span>
        </div>
      </div>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Bảo mật</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Bảo mật theo tiêu chuẩn ngành thanh toán</h3>
        <ul className="ticks">
          <li><span><b>Thông tin thẻ do cổng thanh toán xử lý</b> – Bellhop không lưu trữ số thẻ đầy đủ</span></li>
          <li><span><b>Xác thực giao dịch</b>: <span className="ph">[3-D Secure…]</span></span></li>
          <li><span><b>Phân quyền truy cập</b>: dữ liệu thanh toán chỉ hiển thị với tài khoản được cấp quyền</span></li>
          <li><span><b>Chứng nhận</b>: <span className="ph">[Tiêu chuẩn đối tác công bố]</span></span></li>
        </ul>
      </div>
      <div className="feat-vis bg-tint-c">
        <div className="stack" style={{ gap: "16px", maxWidth: "420px", margin: "0 auto" }}>
          <div className="card" style={{ padding: "22px", display: "flex", gap: "14px", alignItems: "center" }}><span className="tile t-navy" style={{ width: "48px", height: "48px", borderRadius: "14px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path><path d="M9 12l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block" }}>Thẻ do cổng thanh toán xử lý</b><span className="small">Không lưu số thẻ đầy đủ trên Bellhop</span></span></div>
          <div className="card" style={{ padding: "22px", display: "flex", gap: "14px", alignItems: "center" }}><span className="tile t-blue" style={{ width: "48px", height: "48px", borderRadius: "14px" }}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M8 10V7a4 4 0 0 1 8 0v3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><span><b style={{ display: "block" }}>Phân quyền truy cập</b><span className="small">Chỉ tài khoản được cấp quyền</span></span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}><div className="ph-box" style={{ minHeight: "72px" }}>Huy hiệu chứng nhận</div><div className="ph-box" style={{ minHeight: "72px" }}>Huy hiệu chứng nhận</div></div>
        </div>
      </div>
    </div>
  </div></section><section className="soft-grid sec" id="phi" style={{ paddingTop: "56px" }}>
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Phí</span><h2 className="h2">Phí giao dịch và thời gian nhận tiền</h2></div>
    <div className="card" style={{ overflow: "hidden", maxWidth: "880px", width: "100%", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)", gap: "16px", padding: "18px 28px", background: "#EAF1FF", fontSize: "14px", fontWeight: "800" }}><span>Phương thức</span><span>Phí</span><span>Thời gian nhận tiền</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)", gap: "16px", padding: "18px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px" }}><span>Thẻ quốc tế</span><span><span className="ph">[x]%</span></span><span><span className="ph">T+[x]</span></span></div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)", gap: "16px", padding: "18px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px" }}><span>Thẻ nội địa</span><span><span className="ph">[x]%</span></span><span><span className="ph">T+[x]</span></span></div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)", gap: "16px", padding: "18px 28px", borderBottom: "1px solid #E3E8F2", fontSize: "16px" }}><span>Ví điện tử / QR</span><span><span className="ph">[x]%</span></span><span><span className="ph">T+[x]</span></span></div>
      <div className="row" style={{ justifyContent: "space-between", gap: "16px", flexWrap: "wrap", padding: "18px 28px" }}><span className="small">Phí thiết lập <span className="ph">[ ]</span> · Đơn vị tiền nhận <span className="ph">[ ]</span></span><a className="lnk" href="/#bang-gia">Xem chi tiết tại Bảng giá <span className="arr">→</span></a></div>
    </div>
  </div></section><section className="sec">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "820px" }}>
      <span className="eyebrow">Bắt đầu sử dụng</span>
      <h2 className="h2" style={{ fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: "none" }}>Đội Bellhop hỗ trợ kích hoạt cùng bạn</h2>
      <p className="lead">Chỉ cần chuẩn bị các thông tin dưới đây; Bellhop phối hợp với đối tác thanh toán thẩm định và kết nối vào tài khoản của cơ sở. Thời gian thẩm định <span className="ph">[ ]</span>.</p>
    </div>
    <div className="proc">
      <div className="proc-img"><img src="/assets/184ed4c8d5b0f118849e24490114f4af.jpg" alt="Phòng khách sạn" /></div>
      <div className="proc-list">
        <details className="proc-it" name="proc" open={true}>
          <summary><span className="n">01</span><b>Hồ sơ doanh nghiệp</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p><span className="ph">[Danh sách giấy tờ theo yêu cầu của đối tác]</span></p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">02</span><b>Tài khoản nhận tiền</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Tài khoản ngân hàng của cơ sở</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">03</span><b>Chính sách thu tiền</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Mức đặt cọc, hủy phòng, hoàn tiền</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">04</span><b>Tài khoản Bellhop</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Để gắn giao dịch với đặt phòng</p></div>
        </details>
      </div>
    </div>
    <div className="btns" style={{ justifyContent: "center" }}><a className="btn btn-primary" href="#dang-ky">Đặt lịch tư vấn</a></div>
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
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-finance"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Finance</h3><p className="small">Đồng bộ dữ liệu sang phần mềm kế toán</p><span className="lnk" style={{ marginTop: "auto" }}>Xem <span className="arr">→</span></span></a>
    </div>
  </div></section><section className="sec">
  <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "flex-start" }}>
    <div className="stack" style={{ gap: "16px", flex: "1 1 300px" }}>
      <span className="eyebrow">FAQ</span>
      <h2 className="h2">Câu hỏi thường gặp về Bellhop Payment</h2>
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
            <div className="faq-a" style={{ paddingTop: "16px" }}>
              
                        {Boolean(f.hasA) && (
                          <><span>{f.a}</span>
                          </>
                        )}
              
                        {Boolean(f.noA) && (
                          <><span className="ph">[Câu trả lời]</span>
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
