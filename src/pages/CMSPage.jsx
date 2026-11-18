import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class CMSPage extends DCLogic {
  constructor(p) { super(p); this.state = { f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', consent: false }, prods: ['CMS'], err: {}, sent: false, step: 'pms', faq: 0 }; }
  renderVals() {
    const F = [
      { key: 'pms', title: '01 · Bellhop PMS', desc: 'Thiết lập giá và tồn phòng một lần trên Bellhop.' },
      { key: 'cms', title: '02 · Bellhop CMS', desc: 'Cập nhật thay đổi lên các kênh OTA đã kết nối.' },
      { key: 'ota', title: '03 · Các kênh OTA', desc: 'Có đặt phòng từ một kênh → về PMS, tồn phòng các kênh còn lại được cập nhật.' }
    ];
    const st = this.state.step;
    const flow = F.map((k) => ({ title: k.title, desc: k.desc, cls: k.key === st ? 'on' : '', pressed: k.key === st ? 'true' : 'false', pick: () => this.setState({ step: k.key }) }));
    const fq = this.state.faq;
    const fo = {}, fe = {}, ft = {}, fs = {};
    for (let i = 0; i < 6; i++) {
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

    return { form: _form, flow, isPms: st === 'pms', isCms: st === 'cms', isOta: st === 'ota', fo, fe, ft, fs };
  }

  componentDidMount() {
    document.title = "Bellhop CMS – Quản lý kênh OTA";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="cms" startOpen={false} /><section className="p-hero">
  <div className="wrap p-hero-in">
    <div className="stack" style={{ gap: "24px" }}>
      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0" }}><a href="/">Trang chủ</a><span>›</span><a href="/#tong-quan">Sản phẩm</a><span>›</span><b style={{ color: "#0B1B3F" }}>Bellhop CMS</b></nav>
      <span className="eyebrow">Bellhop CMS · Quản lý kênh OTA &amp; định giá linh động</span>
      <h1 className="display" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>Giá và tồn phòng trên mọi kênh OTA, <span className="hl">quản lý từ một nơi</span></h1>
      <p className="lead">Bellhop CMS (Channel Manager – quản lý kênh OTA) đồng bộ giá, phòng trống và đặt phòng giữa Bellhop PMS với các kênh OTA, đồng thời cho phép thiết lập giá linh động theo nhu cầu, mùa vụ và thời điểm đặt phòng.</p>
      <div className="btns"><a className="btn btn-primary" href="#dang-ky">Đặt lịch demo</a><a className="btn btn-outline" href="#kenh">Xem các kênh kết nối</a></div>
      <span className="small">Cập nhật giá và tồn phòng một lần · Đặt phòng OTA về thẳng Bellhop PMS</span>
    </div>
    <div className="stack" style={{ gap: "0" }}>
      <div className="frame">
        <div className="frame-bar"><i></i><i></i><i></i><span>Lịch giá · Tháng 10</span></div>
        <div style={{ padding: "20px", overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(84px, 1.2fr) repeat(4, minmax(56px, 1fr))", gap: "6px", fontSize: "14px", textAlign: "center", alignItems: "center", minWidth: "360px" }}>
            <span className="small" style={{ textAlign: "left", fontWeight: "700" }}>Hạng</span><span className="small" style={{ fontWeight: "700" }}>T5 22</span><span className="small" style={{ fontWeight: "700" }}>T6 23</span><span className="small" style={{ fontWeight: "700" }}>T7 24</span><span className="small" style={{ fontWeight: "700" }}>CN 25</span>
            <b style={{ textAlign: "left" }}>Standard</b><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>650k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>650k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#EAF1FF", color: "#0F3FC4", fontWeight: "700" }}>790k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#EAF1FF", color: "#0F3FC4", fontWeight: "700" }}>790k</span>
            <b style={{ textAlign: "left" }}>Deluxe</b><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>890k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#EAF1FF", color: "#0F3FC4", fontWeight: "700" }}>990k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#EAF1FF", color: "#0F3FC4", fontWeight: "700" }}>1,05tr</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>890k</span>
            <b style={{ textAlign: "left" }}>Family</b><span style={{ padding: "10px 0", borderRadius: "8px", background: "#E6F6F7", color: "#1E6E76", fontWeight: "700" }}>1,1tr</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>1,3tr</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#E3E8F2", color: "#4A5873" }}>Đóng</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>1,3tr</span>
            <span className="small" style={{ textAlign: "left" }}>Tồn phòng</span><b>9</b><b>5</b><b>2</b><b>7</b>
          </div>
          <div className="row" style={{ justifyContent: "space-between", gap: "12px", marginTop: "14px", flexWrap: "wrap" }}><span className="small" style={{ fontSize: "12px" }}>Minh họa</span><span className="chip" style={{ background: "#E7FAFD" }}>Đã đồng bộ lên các kênh</span></div>
        </div>
      </div>
    </div>
  </div></section><section className="sec" id="van-de">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Vấn đề</span>
      <h2 className="h2">Hạn chế khi quản lý kênh OTA thủ công</h2>
    </div>
    <div className="grid3">
      <div className="fcard"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="13" y="4" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="3" y="13" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="13" y="13" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect></svg></span><h3 className="h4">Cập nhật trên từng trang quản trị OTA</h3><p className="p">Mỗi lần thay đổi giá hoặc đóng bán phải thao tác lặp lại trên nhiều hệ thống.</p></div>
      <div className="fcard"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="11" height="11" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="10" y="9" width="11" height="11" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect></svg></span><h3 className="h4">Rủi ro trùng phòng</h3><p className="p">Tồn phòng không được trừ đồng thời giữa các kênh, đặc biệt trong mùa cao điểm.</p></div>
      <div className="fcard"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Giá cố định trong thời gian dài</h3><p className="p">Bỏ lỡ cơ hội tăng giá khi nhu cầu cao và thiếu phương án kích cầu khi nhu cầu thấp.</p></div>
      <div className="fcard"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Khó đánh giá hiệu quả từng kênh</h3><p className="p">Chưa có số liệu tập trung về doanh thu và chi phí hoa hồng theo kênh.</p><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms#tai-chinh" style={{ marginTop: "auto", fontSize: "14px" }}>Gói AI &amp; Phân tích của Bellhop PMS <span className="arr">→</span></a></div>
      <div className="fcard"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M8 10V7a4 4 0 0 1 8 0v3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Thiếu kiểm soát thay đổi giá</h3><p className="p">Nhiều người cùng chỉnh giá, không xác định được ai thay đổi và vào thời điểm nào.</p></div>
      <a className="fcard" href="#cach-hoat-dong" style={{ background: "#EAF1FF", boxShadow: "none" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Một nơi cho mọi kênh</h3><p className="p">Bellhop CMS cập nhật thay đổi lên các kênh OTA đã kết nối, đặt phòng về Bellhop PMS.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Xem cách hoạt động <span className="arr">↓</span></span></a>
    </div>
  </div></section><section className="sec dark" id="cach-hoat-dong">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "760px" }}>
      <span className="eyebrow">Cách hoạt động</span>
      <h2 className="h2" style={{ color: "#fff", fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: "none" }}>Thiết lập một lần, mọi kênh cùng cập nhật</h2>
      <p className="lead">Thời gian đồng bộ giá và tồn phòng: <span className="ph">[x phút]</span></p>
    </div>
    <div className="picker">
      <div className="pick-list">
        
                {(v.flow || []).map((k, $index) => (
                  <React.Fragment key={$index}>
          <button className={`pick ${k.cls ?? ''}`} type="button" aria-pressed={k.pressed} onClick={k.pick}><b>{k.title}</b><span>{k.desc}</span></button>
        
                  </React.Fragment>
                ))}
      </div>
      <div style={{ borderRadius: "28px", padding: "36px", background: "radial-gradient(420px 300px at 85% 10%, rgba(27,69,196,.55), transparent 70%), linear-gradient(160deg, #1B3A5C, #122745)", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
                {Boolean(v.isPms) && (
                  <>
          <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "10px", color: "#0B1B3F" }}>
            <div className="row" style={{ gap: "12px" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Bellhop PMS</b><span className="small" style={{ fontSize: "12px" }}>Giá &amp; tồn phòng · 24/10</span></span></div>
            <div className="row" style={{ justifyContent: "space-between", padding: "12px 14px", borderRadius: "12px", background: "#F5F8FE", fontSize: "14px" }}><span>Standard</span><span><b>790k</b> · còn 3</span></div>
            <div className="row" style={{ justifyContent: "space-between", padding: "12px 14px", borderRadius: "12px", background: "#F5F8FE", fontSize: "14px" }}><span>Deluxe</span><span><b>1,05tr</b> · còn 2</span></div>
            <div className="row" style={{ justifyContent: "space-between", padding: "12px 14px", borderRadius: "12px", background: "#F5F8FE", fontSize: "14px" }}><span>Family</span><span><b>Đóng bán</b></span></div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isCms) && (
                  <>
          <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "10px", color: "#0B1B3F" }}>
            <div className="row" style={{ gap: "12px" }}><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Bellhop CMS</b><span className="small" style={{ fontSize: "12px" }}>Đẩy thay đổi lên các kênh đã kết nối</span></span></div>
            <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}>Deluxe 24/10 · 1,05tr</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E7FAFD" }}>Đã cập nhật</span></div>
            <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}>Deluxe 24/10 · 1,05tr</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E7FAFD" }}>Đã cập nhật</span></div>
            <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}>Deluxe 24/10 · 1,05tr</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E7FAFD" }}>Đã cập nhật</span></div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isOta) && (
                  <>
          <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "10px", color: "#0B1B3F" }}>
            <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", boxShadow: "0 0 0 2px #2E9AA5" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}><b>+1 đặt phòng</b> · Deluxe 24/10</span></div>
            <span style={{ alignSelf: "center", fontSize: "22px", color: "#1450F0" }}>↓</span>
            <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#EAF1FF" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span style={{ fontSize: "14px" }}><b style={{ display: "block" }}>Về Bellhop PMS</b>Đặt phòng hiện trên sơ đồ phòng</span></div>
            <span style={{ alignSelf: "center", fontSize: "22px", color: "#1450F0" }}>↓</span>
            <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}>Deluxe 24/10 · Tồn: 1</span></div>
            <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}>Deluxe 24/10 · Tồn: 1</span></div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
      </div>
    </div>
  </div></section><section className="sec">
  <div className="wrap stack" style={{ gap: "120px" }}>
    <div className="feat" id="kenh">
      <div className="feat-txt">
        <span className="eyebrow">Quản lý kênh</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Đồng bộ giá, tồn phòng và đặt phòng trên các kênh OTA</h3>
        <p className="p">Cập nhật một lần, giá và phòng trống lên mọi kênh đã kết nối.</p>
        <ul className="ticks">
          <li><span>Cập nhật giá và tồn phòng hàng loạt theo khoảng ngày, hạng phòng</span></li>
          <li><span>Nhận đặt phòng từ OTA về Bellhop PMS</span></li>
        </ul>
        <div className="row" style={{ gap: "28px", flexWrap: "wrap" }}>
          <span><b style={{ display: "block", fontSize: "34px", lineHeight: "1.1" }}><span className="ph">[x]</span></b><span className="small">kênh đang kết nối</span></span>
          <span><b style={{ display: "block", fontSize: "34px", lineHeight: "1.1" }}><span className="ph">[x]</span></b><span className="small">kênh <span className="chip" style={{ height: "22px", fontSize: "11px" }}>Sắp ra mắt</span></span></span>
        </div>
      </div>
      <div className="feat-vis bg-tint">
        <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "460px", margin: "0 auto" }}>
          <b style={{ fontSize: "16px" }}>Cập nhật hàng loạt</b>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px", fontSize: "13px" }}><span style={{ padding: "10px 12px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "12px" }}>Từ ngày</span><br /><b>01/12/2026</b></span><span style={{ padding: "10px 12px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "12px" }}>Đến ngày</span><br /><b>05/01/2027</b></span></div>
          <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip" style={{ background: "#1450F0", color: "#fff" }}>Deluxe</span><span className="chip" style={{ background: "#1450F0", color: "#fff" }}>Family</span><span className="chip">Standard</span></div>
          <div className="row" style={{ justifyContent: "space-between", padding: "12px 14px", borderRadius: "10px", background: "#F5F8FE", fontSize: "14px" }}><span>Giá mới</span><b>+15% · mùa lễ hội</b></div>
          <div className="row" style={{ justifyContent: "space-between", padding: "12px 14px", borderRadius: "10px", background: "#F5F8FE", fontSize: "14px" }}><span>Áp dụng cho</span><b>Các kênh đã kết nối + website</b></div>
          <span className="btn btn-primary btn-sm">Đồng bộ lên tất cả kênh</span>
          <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
        </div>
      </div>
    </div>

    <div className="feat rev" id="dinh-gia">
      <div className="feat-txt">
        <span className="eyebrow">Định giá linh động</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Điều chỉnh giá theo nhu cầu thị trường</h3>
        <p className="p">Thay đổi giá phòng theo mức độ đặt phòng, mùa vụ và thời điểm – tăng doanh thu khi nhu cầu cao, cải thiện công suất khi nhu cầu thấp.</p>
        <ul className="ticks">
          <li><span>Giá theo mùa, ngày lễ, sự kiện và ngày trong tuần</span></li>
          <li><span>Lịch giá trực quan theo ngày, theo hạng phòng</span></li>
        </ul>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="row" style={{ justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}><b style={{ fontSize: "16px" }}>Lịch giá · Deluxe</b><span className="small" style={{ fontSize: "12px" }}>Minh họa</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "6px", textAlign: "center", fontSize: "12px" }}>
            <span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>T2</span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>T3</span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>T4</span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>T5</span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>T6</span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>T7</span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>CN</span>
            <span style={{ padding: "10px 2px", borderRadius: "10px", background: "#F5F8FE" }}><b style={{ display: "block" }}>19</b>890k</span>
            <span style={{ padding: "10px 2px", borderRadius: "10px", background: "#E6F6F7", color: "#1E6E76" }}><b style={{ display: "block" }}>20</b>800k</span>
            <span style={{ padding: "10px 2px", borderRadius: "10px", background: "#E6F6F7", color: "#1E6E76" }}><b style={{ display: "block" }}>21</b>800k</span>
            <span style={{ padding: "10px 2px", borderRadius: "10px", background: "#F5F8FE" }}><b style={{ display: "block" }}>22</b>890k</span>
            <span style={{ padding: "10px 2px", borderRadius: "10px", background: "#EAF1FF", color: "#0F3FC4" }}><b style={{ display: "block" }}>23</b>990k</span>
            <span style={{ padding: "10px 2px", borderRadius: "10px", background: "#1450F0", color: "#fff" }}><b style={{ display: "block" }}>24</b>1,05tr</span>
            <span style={{ padding: "10px 2px", borderRadius: "10px", background: "#F5F8FE" }}><b style={{ display: "block" }}>25</b>890k</span>
          </div>
          <div className="row" style={{ gap: "14px", fontSize: "12px", color: "#4A5873", flexWrap: "wrap" }}><span className="row" style={{ gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#1450F0" }}></i>Giá cuối tuần</span><span className="row" style={{ gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#2E9AA5" }}></i>Giá kích cầu</span></div>
        </div>
      </div>
    </div>
  </div></section><section className="soft-grid sec">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Phù hợp với ai</span><h2 className="h2">Dành cho cơ sở bán phòng trên nhiều kênh</h2></div>
    <div className="seg-grid">
      <div className="seg-card">
        <div className="seg-media"><img src="/assets/974345ba46df058cd714c647e9882095.jpg" alt="Bán trên từ 2 kênh OTA" /></div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="13" y="4" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="3" y="13" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="13" y="13" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect></svg></span><h3 className="h3">Bán trên từ 2 kênh OTA</h3></div>
          <p className="p">Giảm thao tác cập nhật và rủi ro trùng phòng.</p>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo <span>→</span></a>
        </div>
      </div>
      <div className="seg-card">
        <div className="seg-media"><img src="/assets/64926e3c4de0e78477dae7aae6277f1f.jpg" alt="Cơ sở có mùa vụ rõ rệt" /></div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h3">Cơ sở có mùa vụ rõ rệt</h3></div>
          <p className="p">Thiết lập giá theo mùa, ngày lễ, sự kiện.</p>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo <span>→</span></a>
        </div>
      </div>
      <div className="seg-card">
        <div className="seg-media"><img src="/assets/f9b413eecd76fd2b46b3d6174eabbf3b.jpg" alt="Chuỗi lưu trú" /></div>
        <div className="seg-body">
          <div className="seg-head"><span className="seg-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20V9l5-3 5 3v11M13 20V5l4-2 4 2v15M6 12h4M6 16h4M16 9h2M16 13h2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h3">Chuỗi lưu trú</h3></div>
          <p className="p">Quản lý giá tập trung, phân quyền theo từng cơ sở.</p>
          <a className="seg-link" href="#dang-ky">Đặt lịch demo <span>→</span></a>
        </div>
      </div>
    </div>
  </div></section><section className="sec" id="trien-khai">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Triển khai</span><h2 className="h2">Quy trình kết nối kênh OTA</h2></div>
    <div className="proc">
      <div className="proc-img"><img src="/assets/974345ba46df058cd714c647e9882095.jpg" alt="Tòa nhà khách sạn" /></div>
      <div className="proc-list">
        <details className="proc-it" name="proc" open={true}>
          <summary><span className="n">01</span><b>Khảo sát</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Danh sách kênh đang bán, hạng phòng, chính sách giá hiện tại.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">02</span><b>Kết nối</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Khách sạn cấp quyền kết nối trên trang quản trị OTA.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">03</span><b>Ghép hạng phòng</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Ghép hạng phòng và kiểm tra đồng bộ.</p></div>
        </details>
        <details className="proc-it" name="proc">
          <summary><span className="n">04</span><b>Vận hành chính thức</b><i className="pm" aria-hidden="true"></i></summary>
          <div className="proc-body"><p>Thiết lập quy tắc giá linh động.</p></div>
        </details>
      </div>
    </div>
  </div></section><section className="soft-grid sec" id="he-sinh-thai">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "820px" }}>
      <span className="eyebrow">Hệ sinh thái</span>
      <h2 className="h2">Kết nối với các sản phẩm Bellhop</h2>
    </div>
    <div className="grid4">
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-pms"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Bellhop PMS</h3><p className="small">Đặt phòng OTA được ghi nhận trên sơ đồ phòng; tồn phòng lấy từ dữ liệu vận hành thực tế.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-booking-engine"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Booking Engine</h3><p className="small">Kênh trực tiếp dùng chung tồn phòng và quy tắc giá với các OTA.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-website"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 9h18M7 6.5h.01M10 6.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Website</h3><p className="small">Hiển thị giá cập nhật cho khách truy cập website.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-finance"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Finance</h3><p className="small">Đồng bộ dữ liệu sang phần mềm kế toán.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-message"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop Message</h3><p className="small">Gom tin nhắn mọi kênh về một nơi.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-ai-concierge"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "1.8", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">AI Concierge</h3><p className="small">Trợ lý AI trả lời khách.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="/san-pham/bellhop-payment"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 10h18M7 15h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Payment</h3><p className="small">Nhận thanh toán online cho cơ sở.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Tìm hiểu <span className="arr">→</span></span></a>
      <a className="fcard" href="/#tong-quan" style={{ background: "#EAF1FF", boxShadow: "none" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Tổng quan nền tảng</h3><p className="small">Dùng riêng từng sản phẩm hoặc kết hợp – tất cả chạy trên cùng một dữ liệu.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "14px" }}>Xem tổng quan <span className="arr">→</span></span></a>
    </div>
  </div></section><section className="soft-grid sec-sm" id="bang-gia">
  <div className="wrap">
    <div className="price-band">
      <div className="stack" style={{ gap: "14px" }}>
        <span className="eyebrow">Gói &amp; giá</span>
        <h2 className="h2" style={{ fontSize: "clamp(26px, 2.8vw, 36px)" }}>Chi phí sử dụng Bellhop CMS</h2>
        <p className="pb-sub">Đội Bellhop tư vấn gói phù hợp với số kênh đang bán và quy mô cơ sở của bạn.</p>
        <div className="btns" style={{ marginTop: "8px" }}><a className="btn btn-primary" href="#dang-ky">Đặt lịch demo</a><a className="btn btn-outline" href="/#bang-gia">Xem bảng giá</a></div>
      </div>
      <div className="pb-vis" aria-hidden="true">
        <svg className="pb-lines" viewBox="0 0 400 260" preserveAspectRatio="none"><path d="M200 130 L70 40 M200 130 L330 40 M200 130 L70 220 M200 130 L330 220" style={{ fill: "none", stroke: "url(#pbg)", strokeWidth: "1.6", strokeDasharray: "5 6" }}></path><defs><linearGradient id="pbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3FE0FF"></stop><stop offset="1" stopColor="#1450F0"></stop></linearGradient></defs></svg>
        <span className="pb-node" style={{ left: "4%", top: "6%" }}>Kênh OTA</span>
        <span className="pb-node" style={{ right: "4%", top: "6%" }}>Kênh OTA</span>
        <span className="pb-node" style={{ left: "4%", bottom: "6%" }}>Website</span>
        <span className="pb-node" style={{ right: "4%", bottom: "6%" }}>Bellhop PMS</span>
        <span className="pb-core"><svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg><b>Bellhop CMS</b><span>Giá &amp; tồn phòng đồng bộ</span></span>
      </div>
    </div>
  </div></section><section className="sec" id="faq">
  <div className="wrap">
    <div className="feat" style={{ alignItems: "start" }}>
      <div className="feat-txt">
        <span className="eyebrow">FAQ</span>
        <h2 className="h2">Câu hỏi thường gặp về Bellhop CMS</h2>
        <p className="p">Chưa thấy câu trả lời bạn cần? Đội Bellhop sẵn sàng khảo sát các kênh bạn đang bán.</p>
        <div className="faq-help">
          <b>Chưa thấy câu trả lời?</b>
          <span>Nhắn Zalo hoặc gọi trực tiếp cho đội Bellhop.</span>
          <div className="btns"><a className="btn btn-primary btn-sm" href="#">Chat Zalo</a><a className="btn btn-outline btn-sm" href="tel:0972096499">Gọi 0972 096 499</a></div>
        </div>
      </div>
      <div className="faq">
        <button className="faq-q" type="button" aria-expanded={v.fe.q0} onClick={v.ft.q0}>Bellhop CMS kết nối với những kênh OTA nào?<span aria-hidden="true">{v.fs.q0}</span></button>
        
                {Boolean(v.fo.q0) && (
                  <><div className="faq-a"><span className="ph">[Danh sách kênh]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q1} onClick={v.ft.q1}>Giá và tồn phòng được đồng bộ trong bao lâu?<span aria-hidden="true">{v.fs.q1}</span></button>
        
                {Boolean(v.fo.q1) && (
                  <><div className="faq-a"><span className="ph">[Độ trễ thực tế]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q2} onClick={v.ft.q2}>Định giá linh động có tự động thay đổi giá mà không cần khách sạn duyệt không?<span aria-hidden="true">{v.fs.q2}</span></button>
        
                {Boolean(v.fo.q2) && (
                  <><div className="faq-a"><span className="ph">[Cơ chế: tự động trong khung giá đã duyệt / chỉ đề xuất]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q3} onClick={v.ft.q3}>Bellhop CMS có loại bỏ hoàn toàn rủi ro trùng phòng không?<span aria-hidden="true">{v.fs.q3}</span></button>
        
                {Boolean(v.fo.q3) && (
                  <><div className="faq-a">Bellhop CMS cập nhật tồn phòng đồng thời trên các kênh nhằm hạn chế trùng phòng; rủi ro có thể phát sinh khi kênh OTA chậm xử lý cập nhật.</div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q4} onClick={v.ft.q4}>Đang dùng channel manager khác có chuyển sang được không?<span aria-hidden="true">{v.fs.q4}</span></button>
        
                {Boolean(v.fo.q4) && (
                  <><div className="faq-a"><span className="ph">[Quy trình chuyển đổi]</span></div>
                  </>
                )}
        <button className="faq-q" type="button" aria-expanded={v.fe.q5} onClick={v.ft.q5}>Có bắt buộc dùng Bellhop PMS không?<span aria-hidden="true">{v.fs.q5}</span></button>
        
                {Boolean(v.fo.q5) && (
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
