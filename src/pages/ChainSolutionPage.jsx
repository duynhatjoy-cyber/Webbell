import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

export default class ChainSolutionPage extends DCLogic {
  constructor(p) { super(p); this.state = { day: 0, pick: 'pms', faq: 0 }; }
  renderVals() {
    const s = this.state;
    const D = [
      { label: 'Lễ tân tại cơ sở', kicker: 'Lễ tân · Bellhop PMS', title: 'Mỗi cơ sở vận hành theo cùng một cách', desc: 'Lễ tân ở cơ sở nào cũng làm việc trên cùng phần mềm: mọi đặt phòng – vãng lai, gọi điện, website, OTA – hiện trên một sơ đồ phòng và timeline.', ticks: ['Nhận, đổi, trả phòng trong vài thao tác', 'Buồng phòng cập nhật trạng thái, sơ đồ phòng đổi theo', 'Tạo hóa đơn, thu chi theo ca/ngày'], hasNote: false, note: '', href: 'https://bellhop.vn/san-pham/bellhop-pms', link: 'Tìm hiểu Bellhop PMS' },
      { label: 'Quản lý chuỗi', kicker: 'Quản lý · PMS AI & Phân tích', title: 'Nhìn doanh thu, công suất mà không cần có mặt', desc: 'Chủ cơ sở và quản lý xem doanh thu, công suất, thu chi từ xa; gói AI & Phân tích bổ sung phân tích doanh thu và báo cáo chuyên sâu.', ticks: ['Doanh thu, công suất, thu chi từ xa', 'Phân tích doanh thu, báo cáo chuyên sâu – gói nâng cao', 'Phân quyền người được thay đổi giá trên CMS'], hasNote: true, note: '[Báo cáo hợp nhất nhiều cơ sở, chuyển đổi giữa các cơ sở]', href: 'https://bellhop.vn/san-pham/bellhop-pms#tai-chinh', link: 'Xem Tài chính & Báo cáo' },
      { label: 'Kế toán', kicker: 'Kế toán · Bellhop Finance', title: 'Chỉ kiểm tra và xử lý ngoại lệ', desc: 'Dữ liệu đã được đồng bộ sang phần mềm kế toán. Kế toán kiểm tra danh sách chứng từ đã chuyển và tập trung vào các trường hợp ngoại lệ.', ticks: ['Nhật ký đồng bộ: thời điểm, số chứng từ, trạng thái', 'Cảnh báo lỗi kèm hướng dẫn xử lý', 'Duyệt trước khi hạch toán'], hasNote: true, note: '[Cách đồng bộ khi chuỗi có nhiều cơ sở]', href: 'https://bellhop.vn/san-pham/bellhop-finance', link: 'Tìm hiểu Bellhop Finance' }
    ];
    const days = D.map((d, i) => ({ label: d.label, cls: i === s.day ? 'on' : '', pressed: i === s.day ? 'true' : 'false', pick: () => this.setState({ day: i }) }));
    const P = [
      { key: 'pms', title: 'Bellhop PMS nâng cao', desc: 'Vận hành chuẩn cho từng cơ sở, cộng module nâng cao.', name: 'Bellhop PMS nâng cao', role: 'Vận hành · Tài chính · Phân tích', tile: 't-blue', what: 'Cùng một phần mềm cho mọi cơ sở: lễ tân, buồng phòng, kho, F&B, thu chi; mỗi nhân viên một tài khoản với quyền theo vai trò.', ticks: ['Kho chuyên sâu: điều chuyển giữa các kho, kiểm kê, công nợ', 'Tài chính: hóa đơn điện tử, sổ sách, quỹ', 'AI & Phân tích: phân tích doanh thu, báo cáo chuyên sâu'], hasNote: true, note: '[Phân quyền theo cơ sở, báo cáo hợp nhất, chuyển đổi giữa cơ sở]', href: 'https://bellhop.vn/san-pham/bellhop-pms', link: 'Tìm hiểu Bellhop PMS' },
      { key: 'cms', title: 'Bellhop CMS', desc: 'Quy tắc giá và kênh OTA quản lý từ một nơi.', name: 'Bellhop CMS', role: 'Quản lý kênh OTA & định giá linh động', tile: 't-sky', what: 'Cập nhật một lần, giá và phòng trống lên mọi kênh đã kết nối; kiểm soát người được thay đổi giá.', ticks: ['Cập nhật hàng loạt theo khoảng ngày, hạng phòng', 'Giá theo mùa, ngày lễ, sự kiện', 'Đặt phòng OTA về Bellhop PMS'], hasNote: true, note: '[Quản lý giá tập trung cho nhiều cơ sở]', href: 'https://bellhop.vn/san-pham/bellhop-cms', link: 'Tìm hiểu Bellhop CMS' },
      { key: 'fin', title: 'Bellhop Finance', desc: 'Đồng bộ doanh thu, thu chi, hóa đơn sang phần mềm kế toán.', name: 'Bellhop Finance', role: 'Kết nối kế toán', tile: 't-orange', what: 'Lễ tân, hệ thống và kế toán dùng chung một nguồn số liệu – kế toán không phải nhập lại.', ticks: ['Chuyển chứng từ theo ánh xạ tài khoản của cơ sở', 'Nhật ký đồng bộ, cảnh báo lỗi', 'Kế toán duyệt trước khi hạch toán'], hasNote: true, note: '[Đồng bộ khi chuỗi có nhiều cơ sở]', href: 'https://bellhop.vn/san-pham/bellhop-finance', link: 'Tìm hiểu Bellhop Finance' },
      { key: 'web', title: 'Bellhop Website · mẫu Chuỗi', desc: 'Một thương hiệu, nhiều điểm đến, đặt phòng tập trung.', name: 'Bellhop Website – mẫu Chuỗi', role: 'Website cho chuỗi · Tích hợp Booking Engine', tile: 't-navy', what: 'Thương hiệu thống nhất cho cả chuỗi; khách tìm cơ sở theo điểm đến và đặt phòng trực tiếp.', ticks: ['Danh sách cơ sở', 'Trang riêng cho từng cơ sở', 'Tìm theo điểm đến'], hasNote: false, note: '', href: 'https://bellhop.vn/san-pham/bellhop-website', link: 'Tìm hiểu Bellhop Website' }
    ];
    const picks = P.map((k) => ({ title: k.title, desc: k.desc, cls: k.key === s.pick ? 'on' : '', pressed: k.key === s.pick ? 'true' : 'false', pick: () => this.setState({ pick: k.key }) }));
    const pk = P.filter((k) => k.key === s.pick)[0] || P[0];
    const F = [
      { q: 'Quản lý nhiều cơ sở trên một tài khoản được không?', a: '', ph: '[Câu trả lời]' },
      { q: 'Có phân quyền nhân viên theo từng cơ sở không?', a: 'Mỗi nhân viên có tài khoản riêng và quyền theo vai trò.', ph: '[Phân quyền theo từng cơ sở]' },
      { q: 'Có báo cáo hợp nhất cho cả chuỗi không?', a: '', ph: '[Câu trả lời]' },
      { q: 'Chuỗi có nhiều cơ sở thì đồng bộ kế toán ra sao?', a: '', ph: '[Câu trả lời]' },
      { q: 'Website cho chuỗi có gì khác?', a: 'Mẫu Chuỗi có danh sách cơ sở, trang riêng cho từng cơ sở và tìm theo điểm đến, tích hợp sẵn Booking Engine.', ph: '' }
    ];
    const faq = F.map((x, i) => {
      const o = s.faq === i;
      return { q: x.q, a: x.a, ph: x.ph, hasA: x.a !== '', hasPh: x.ph !== '', open: o, exp: o ? 'true' : 'false', sign: o ? '−' : '+', toggle: () => this.setState({ faq: o ? -1 : i }) };
    });
    return { days, day: D[s.day], isD0: s.day === 0, isD1: s.day === 1, isD2: s.day === 2, picks, pk, faq };
  }

  componentDidMount() {
    document.title = "Bellhop – Giải pháp cho chuỗi lưu trú";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="chain" startOpen={false} /><section className="p-hero">
  <div className="wrap p-hero-in">
    <div className="stack" style={{ gap: "24px" }}>
      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0" }}><a href="/">Trang chủ</a><span>›</span><a href="/#giai-phap">Giải pháp</a><span>›</span><b style={{ color: "#122745" }}>Chuỗi lưu trú</b></nav>
      <span className="eyebrow">Giải pháp cho chuỗi lưu trú</span>
      <h1 className="display" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>Mở thêm cơ sở, <span className="hl">không mở thêm mớ sổ sách</span></h1>
      <p className="lead">Mỗi cơ sở vận hành trên cùng bộ công cụ: Bellhop PMS cho lễ tân và vận hành, CMS cho kênh bán và giá, Finance đưa số liệu sang phần mềm kế toán. Cùng một cách làm, cùng một chuẩn số liệu.</p>
      <div className="btns"><a className="btn btn-primary" href="/#dang-ky">Dùng thử miễn phí</a><a className="btn btn-outline" href="#dang-ky">Đặt lịch demo</a></div>
    </div>
    <div className="stack" style={{ gap: "14px" }}>
      <div className="card" style={{ overflow: "hidden" }}>
        <div className="row" style={{ justifyContent: "space-between", gap: "12px", padding: "14px 18px", borderBottom: "1px solid #E3E8F2", flexWrap: "wrap" }}>
          <span className="row" style={{ gap: "10px" }}><img src="/assets/4f97ede20a93cc1bba22d88175df59a4.png" alt="Bellhop" style={{ height: "22px", width: "auto" }} /></span>
          <span className="row" style={{ gap: "8px", padding: "8px 12px", borderRadius: "10px", border: "1px solid #E3E8F2", fontSize: "13px" }}><span className="small" style={{ fontSize: "12px" }}>Cơ sở:</span><b><span className="ph">[Tên cơ sở 1]</span></b><span aria-hidden="true">▾</span></span>
        </div>
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <span className="small" style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>Các cơ sở</span>
          <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#EAF1FF" }}><span className="tile t-navy" style={{ fontSize: "12px", fontWeight: "800" }}>01</span><span style={{ flex: "1", minWidth: "0", fontSize: "14px" }}><b style={{ display: "block" }}><span className="ph">[Cơ sở A]</span></b><span className="small" style={{ fontSize: "12px" }}><span className="ph">[x]</span> phòng</span></span><span style={{ textAlign: "right", fontSize: "13px" }}><span className="small" style={{ fontSize: "12px", display: "block" }}>Công suất</span><b><span className="ph">[x]%</span></b></span></div>
          <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="tile t-blue" style={{ fontSize: "12px", fontWeight: "800" }}>02</span><span style={{ flex: "1", minWidth: "0", fontSize: "14px" }}><b style={{ display: "block" }}><span className="ph">[Cơ sở B]</span></b><span className="small" style={{ fontSize: "12px" }}><span className="ph">[x]</span> phòng</span></span><span style={{ textAlign: "right", fontSize: "13px" }}><span className="small" style={{ fontSize: "12px", display: "block" }}>Công suất</span><b><span className="ph">[x]%</span></b></span></div>
          <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="tile t-orange" style={{ fontSize: "12px", fontWeight: "800" }}>03</span><span style={{ flex: "1", minWidth: "0", fontSize: "14px" }}><b style={{ display: "block" }}><span className="ph">[Cơ sở C]</span></b><span className="small" style={{ fontSize: "12px" }}><span className="ph">[x]</span> phòng</span></span><span style={{ textAlign: "right", fontSize: "13px" }}><span className="small" style={{ fontSize: "12px", display: "block" }}>Công suất</span><b><span className="ph">[x]%</span></b></span></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px", padding: "0 18px 18px" }}>
          <div style={{ padding: "14px", borderRadius: "12px", background: "#F5F8FE", display: "flex", flexDirection: "column", gap: "4px" }}><span className="small" style={{ fontSize: "12px" }}>Doanh thu hôm nay · toàn chuỗi</span><b style={{ fontSize: "18px" }}>48.200.000đ</b></div>
          <div style={{ padding: "14px", borderRadius: "12px", background: "#F5F8FE", display: "flex", flexDirection: "column", gap: "4px" }}><span className="small" style={{ fontSize: "12px" }}>Công suất trung bình</span><b style={{ fontSize: "18px" }}>82%</b></div>
        </div>
      </div>
      <p className="note">Minh họa</p>
    </div>
  </div></section><section className="soft-grid sec" id="thach-thuc" style={{ paddingTop: "72px", paddingBottom: "56px" }}>
  <div className="wrap stack" style={{ gap: "36px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Những thách thức quen thuộc</span>
      <h2 className="h2">Thêm một cơ sở là thêm một nơi số liệu bị lệch</h2>
    </div>
    <div className="grid3">
      <div className="fcard"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20V9l5-3 5 3v11M13 20V5l4-2 4 2v15M6 12h4M6 16h4M16 9h2M16 13h2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Mỗi cơ sở một cách làm</h3><p className="p">Nơi dùng sổ, nơi dùng Excel, nơi dùng phần mềm riêng – số liệu không cùng chuẩn, tổng hợp cuối tháng mất nhiều ngày.</p></div>
      <div className="fcard"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M8 10V7a4 4 0 0 1 8 0v3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Khó kiểm soát quyền và giá</h3><p className="p">Nhiều người cùng chỉnh giá trên nhiều kênh, không xác định được ai thay đổi và vào thời điểm nào.</p></div>
      <div className="fcard"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Kế toán nhập lại từ nhiều nguồn</h3><p className="p">Xuất báo cáo từ phần mềm quản lý, nhập lại vào phần mềm kế toán, đối chiếu từng khoản rồi tự tìm chênh lệch.</p></div>
    </div>
  </div></section><section className="soft-grid sec" id="mot-ngay" style={{ paddingTop: "0" }}>
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Một ngày làm việc</span>
      <h2 className="h2">Từ quầy lễ tân đến văn phòng chuỗi</h2>
      <p className="lead">Chọn một vai trò để xem họ làm việc trên Bellhop thế nào.</p>
    </div>
    <div className="tabs">
      
              {(v.days || []).map((t, $index) => (
                <React.Fragment key={$index}><button className={`tab ${t.cls ?? ''}`} type="button" aria-pressed={t.pressed} onClick={t.pick}>{t.label}</button>
                </React.Fragment>
              ))}
    </div>
    <div className="feat" style={{ gap: "56px" }}>
      <div className="feat-txt">
        <span className="eyebrow">{v.day.kicker}</span>
        <h3 className="h2" style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>{v.day.title}</h3>
        <p className="p">{v.day.desc}</p>
        <ul className="ticks">
          
                  {(v.day.ticks || []).map((x, $index) => (
                    <React.Fragment key={$index}><li><span>{x}</span></li>
                    </React.Fragment>
                  ))}
        </ul>
        <a className="lnk" href={v.day.href}>{v.day.link} <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint" style={{ minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
                {Boolean(v.isD0) && (
                  <>
          <div className="frame">
            <div className="frame-bar"><i></i><i></i><i></i><span>app.bellhop.vn/dat-phong</span></div>
            <img src="/assets/d8e97cd43f9f645eec6abba0f8eee195.png" alt="Màn hình Danh sách đặt phòng của Bellhop PMS" />
          </div>
          <div className="card" style={{ position: "relative", margin: "-28px 0 0 auto", width: "min(300px, 92%)", padding: "16px 18px", display: "flex", gap: "12px", alignItems: "center" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Phòng 104 đã sẵn sàng</b><span className="small">Gán cho Ms. Sato · 14:00 · Minh họa</span></span></div>
        
                  </>
                )}
        
                {Boolean(v.isD1) && (
                  <>
          <div className="card" style={{ overflow: "hidden" }}>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", padding: "14px 18px", borderBottom: "1px solid #E3E8F2", flexWrap: "wrap" }}><b style={{ fontSize: "15px" }}>Báo cáo theo cơ sở · <span className="ph">[Tháng 10]</span></b><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#1F7A84" }}>Đang xác nhận</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr)", gap: "12px", padding: "10px 18px", background: "#F5F8FE", fontSize: "12px", fontWeight: "700", color: "#4A5873" }}><span>Cơ sở</span><span>Doanh thu</span><span>Công suất</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr)", gap: "12px", padding: "14px 18px", borderBottom: "1px solid #E3E8F2", fontSize: "14px", alignItems: "center" }}><b><span className="ph">[Cơ sở A]</span></b><span className="ph">[x]đ</span><span className="ph">[x]%</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr)", gap: "12px", padding: "14px 18px", borderBottom: "1px solid #E3E8F2", fontSize: "14px", alignItems: "center" }}><b><span className="ph">[Cơ sở B]</span></b><span className="ph">[x]đ</span><span className="ph">[x]%</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr)", gap: "12px", padding: "14px 18px", borderBottom: "1px solid #E3E8F2", fontSize: "14px", alignItems: "center" }}><b><span className="ph">[Cơ sở C]</span></b><span className="ph">[x]đ</span><span className="ph">[x]%</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr)", gap: "12px", padding: "14px 18px", fontSize: "14px", fontWeight: "800", alignItems: "center" }}><span>Toàn chuỗi</span><span className="ph">[x]đ</span><span className="ph">[x]%</span></div>
            <p className="small" style={{ fontSize: "12px", padding: "0 18px 16px" }}>Minh họa</p>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isD2) && (
                  <>
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #E3E8F2" }}><b style={{ fontSize: "14px" }}>Nhật ký đồng bộ · Bellhop Finance</b></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)", gap: "12px", padding: "10px 18px", background: "#F5F8FE", fontSize: "12px", fontWeight: "700", color: "#4A5873" }}><span>Thời điểm</span><span>Chứng từ</span><span>Trạng thái</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)", gap: "12px", padding: "14px 18px", borderBottom: "1px solid #E3E8F2", fontSize: "14px", alignItems: "center" }}><span>23/10 23:00</span><b>42</b><span className="chip" style={{ height: "26px", fontSize: "12px", justifySelf: "start" }}>Thành công</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr)", gap: "12px", padding: "14px 18px", fontSize: "14px", alignItems: "center" }}><span>22/10 23:00</span><b>38 / 1 lỗi</b><span className="chip" style={{ height: "26px", fontSize: "12px", justifySelf: "start", background: "#E6F6F7", color: "#1F7A84" }}>Cần xử lý</span></div>
            <div className="row" style={{ gap: "12px", margin: "0 18px 18px", padding: "12px 14px", borderRadius: "12px", background: "#E6F6F7", fontSize: "13px" }}><span className="tile t-orange" style={{ width: "28px", height: "28px", borderRadius: "8px", fontWeight: "800" }}>!</span><span>Thiếu mã hàng “NUOC-01”</span></div>
            <p className="small" style={{ fontSize: "12px", padding: "0 18px 16px" }}>Dữ liệu minh họa</p>
          </div>
        
                  </>
                )}
      </div>
    </div>
  </div></section><section className="sec" id="bo-cong-cu">
  <div className="wrap stack" style={{ gap: "120px" }}>
    <div className="stack center" style={{ gap: "18px", alignItems: "center", maxWidth: "860px", margin: "0 auto" }}>
      <span className="eyebrow">Bộ công cụ cho chuỗi</span>
      <h2 className="h2">Cùng phần mềm, cùng quy tắc giá, cùng chuẩn kế toán</h2>
      <p className="lead">Dùng riêng từng sản phẩm hoặc kết hợp – tất cả chạy trên cùng một dữ liệu.</p>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Vận hành · Bellhop PMS nâng cao</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Một chuẩn vận hành cho mọi cơ sở</h3>
        <p className="p">Lễ tân, buồng phòng, kho, F&amp;B và thu chi trên cùng một phần mềm; mỗi nhân viên một tài khoản với quyền theo vai trò.</p>
        <ul className="ticks">
          <li><span><b>Lễ tân, sơ đồ phòng, buồng phòng</b> – miễn phí</span></li>
          <li><span><b>Kho chuyên sâu</b>: nhập hàng, trả hàng, điều chuyển giữa các kho, kiểm kê định kỳ, công nợ nhà cung cấp</span></li>
          <li><span><b>Tài chính</b>: hóa đơn điện tử, sổ sách, quỹ tiền mặt &amp; tiền gửi</span></li>
          <li><span><b>AI &amp; Phân tích</b>: phân tích doanh thu, báo cáo chuyên sâu</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms">Tìm hiểu Bellhop PMS <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/d967b787263d4b619b118217c8635099.png" alt="Màn hình Buồng phòng của Bellhop PMS" style={{ display: "block", width: "100%", height: "auto" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-28px 0 0 auto", width: "min(340px, 92%)", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <b style={{ fontSize: "15px" }}>Mỗi người thấy đúng phần việc</b>
          <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip">Chủ cơ sở</span><span className="chip">Quản lý</span><span className="chip">Lễ tân</span><span className="chip">Buồng phòng</span><span className="chip">Kế toán</span></div>
        </div>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Kênh bán &amp; giá · Bellhop CMS</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Quy tắc giá thống nhất, biết rõ ai được đổi giá</h3>
        <p className="p">Bellhop CMS đồng bộ giá, phòng trống và đặt phòng giữa Bellhop PMS với các kênh OTA, kèm định giá linh động theo nhu cầu và mùa vụ.</p>
        <ul className="ticks">
          <li><span>Cập nhật giá và tồn phòng hàng loạt theo khoảng ngày, hạng phòng</span></li>
          <li><span>Giá theo mùa, ngày lễ, sự kiện và ngày trong tuần</span></li>
          <li><span>Nhận đặt phòng từ OTA về Bellhop PMS</span></li>
          <li><span>Phân quyền: kiểm soát người được thay đổi giá</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-cms">Tìm hiểu Bellhop CMS <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "460px", margin: "0 auto" }}>
          <b style={{ fontSize: "16px" }}>Cập nhật hàng loạt</b>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px", fontSize: "13px" }}><span style={{ padding: "10px 12px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "12px" }}>Từ ngày</span><br /><b>01/12/2026</b></span><span style={{ padding: "10px 12px", borderRadius: "10px", background: "#F5F8FE" }}><span className="small" style={{ fontSize: "12px" }}>Đến ngày</span><br /><b>05/01/2027</b></span></div>
          <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip" style={{ background: "#1450F0", color: "#FFFFFF" }}>Deluxe</span><span className="chip" style={{ background: "#1450F0", color: "#FFFFFF" }}>Family</span><span className="chip">Standard</span></div>
          <div className="row" style={{ justifyContent: "space-between", padding: "12px 14px", borderRadius: "10px", background: "#F5F8FE", fontSize: "14px" }}><span>Giá mới</span><b>+15% · mùa lễ hội</b></div>
          <div className="row" style={{ justifyContent: "space-between", padding: "12px 14px", borderRadius: "10px", background: "#F5F8FE", fontSize: "14px" }}><span>Áp dụng cho</span><b>Các kênh đã kết nối + website</b></div>
          <span className="btn btn-primary btn-sm">Đồng bộ lên tất cả kênh</span>
          <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
        </div>
      </div>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Kế toán · Bellhop Finance</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Số liệu từ quầy lễ tân sang sổ kế toán, không nhập lại</h3>
        <p className="p">Bellhop Finance chuyển doanh thu, thu chi và hóa đơn từ hệ thống Bellhop sang phần mềm kế toán theo ánh xạ tài khoản của cơ sở.</p>
        <ul className="ticks">
          <li><span><b>Không nhập lại doanh thu</b>: phòng, dịch vụ, F&amp;B và thu chi</span></li>
          <li><span><b>Nhật ký đồng bộ &amp; cảnh báo lỗi</b>: thời điểm, số chứng từ, trạng thái</span></li>
          <li><span><b>Duyệt trước khi ghi sổ</b>: kế toán duyệt trước khi hạch toán</span></li>
          <li><span><b>Phân quyền</b>: chỉ tài khoản được cấp xem dữ liệu tài chính</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-finance">Tìm hiểu Bellhop Finance <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-soft">
        <div className="stack" style={{ gap: "14px", maxWidth: "440px", margin: "0 auto" }}>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>Lễ tân tại từng cơ sở</span><b style={{ display: "block" }}>Bellhop PMS</b><span className="small">Xuất hóa đơn, ghi nhận thu chi khi khách trả phòng.</span></span></div>
          <span style={{ alignSelf: "center", fontSize: "22px", color: "#1450F0" }}>↓</span>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center", boxShadow: "0 0 0 2px #2E9AA5" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>Tự động</span><b style={{ display: "block" }}>Bellhop Finance</b><span className="small">Chuyển chứng từ theo ánh xạ tài khoản.</span></span></div>
          <span style={{ alignSelf: "center", fontSize: "22px", color: "#1450F0" }}>↓</span>
          <div className="card" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "center" }}><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><span><span className="small" style={{ fontSize: "12px", fontWeight: "700" }}>Kế toán</span><b style={{ display: "block" }}>Phần mềm kế toán</b><span className="small">Hạch toán, lập báo cáo từ số liệu có sẵn.</span></span></div>
        </div>
      </div>
    </div>
  </div></section><section className="sec dark">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px" }}>
      <span className="eyebrow">Bộ công cụ gợi ý</span>
      <h2 className="h2" style={{ color: "#FFFFFF", fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: "none" }}>Bốn mảnh ghép cho một chuỗi lưu trú</h2>
    </div>
    <div className="picker">
      <div className="pick-list">
        
                {(v.picks || []).map((k, $index) => (
                  <React.Fragment key={$index}>
          <button className={`pick ${k.cls ?? ''}`} type="button" aria-pressed={k.pressed} onClick={k.pick}><b>{k.title}</b><span>{k.desc}</span></button>
        
                  </React.Fragment>
                ))}
      </div>
      <div style={{ borderRadius: "28px", padding: "36px", background: "radial-gradient(420px 300px at 85% 10%, rgba(27,69,196,.55), transparent 70%), linear-gradient(160deg, #1B3A5C, #122745)", minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="card" style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "16px", color: "#122745" }}>
          <div className="row" style={{ gap: "12px" }}><span className={`tile ${v.pk.tile ?? ''}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "18px" }}>{v.pk.name}</b><span className="small" style={{ fontSize: "13px" }}>{v.pk.role}</span></span></div>
          <p className="p" style={{ fontSize: "16px" }}>{v.pk.what}</p>
          <ul className="ticks">
            
                    {(v.pk.ticks || []).map((x, $index) => (
                      <React.Fragment key={$index}><li><span style={{ fontSize: "15px" }}>{x}</span></li>
                      </React.Fragment>
                    ))}
          </ul>
          <a className="lnk" href={v.pk.href}>{v.pk.link} <span className="arr">→</span></a>
        </div>
      </div>
    </div>
  </div></section><section className="soft-grid sec" id="bang-gia">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Gói phù hợp</span><h2 className="h2">Nền tảng miễn phí, module nâng cao cho chuỗi</h2></div>
    <div className="plans">
      <div className="plan">
        <span className="chip" style={{ alignSelf: "flex-start" }}>Miễn phí</span>
        <h3 className="h3">Bellhop PMS</h3>
        <div className="row" style={{ gap: "8px", alignItems: "baseline" }}><span className="price">0đ</span><span className="small">/ <span className="ph">[thời hạn · giới hạn phòng/người dùng]</span></span></div>
        <ul className="ticks">
          <li>Cài đặt cơ sở: sơ đồ phòng, phòng &amp; giá, dịch vụ, thuế/phí, mẫu in, phân quyền</li>
          <li>Lễ tân &amp; đặt phòng · Sơ đồ phòng, timeline · Buồng phòng</li>
          <li>Kho cơ bản · Tạo hóa đơn · Thu chi cơ bản · Thống kê</li>
        </ul>
        <a className="btn btn-outline" href="/#dang-ky" style={{ marginTop: "auto" }}>Dùng thử miễn phí</a>
      </div>
      <div className="plan hi">
        <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip" style={{ background: "#E6F6F7", color: "#1F7A84" }}>Nâng cao</span><span className="chip">Gợi ý cho chuỗi</span></div>
        <h3 className="h3">Cộng thêm theo module</h3>
        <div className="row" style={{ gap: "8px", alignItems: "baseline" }}><span className="price"><span className="ph" style={{ fontSize: "0.5em" }}>[giá]</span></span><span className="small">/ tháng hoặc Liên hệ</span></div>
        <ul className="ticks">
          <li><b>Vận hành nâng cao</b>: F&amp;B, kho chuyên sâu, email marketing</li>
          <li><b>Tài chính</b>: hóa đơn điện tử, sổ sách, quỹ tiền mặt &amp; tiền gửi</li>
          <li><b>AI Concierge &amp; Phân tích</b>: trợ lý AI, phân tích doanh thu, báo cáo</li>
        </ul>
        <a className="btn btn-primary" href="#dang-ky" style={{ marginTop: "auto" }}>Đặt lịch demo cho chuỗi</a>
      </div>
    </div>
    <div className="btns" style={{ justifyContent: "center" }}><a className="lnk" href="/#bang-gia">Xem bảng giá đầy đủ <span className="arr">→</span></a></div>
  </div></section><section className="sec" id="faq">
  <div className="wrap">
    <div className="feat" style={{ alignItems: "start" }}>
      <div className="feat-txt">
        <span className="eyebrow">FAQ</span>
        <h2 className="h2">Câu hỏi thường gặp của chuỗi lưu trú</h2>
        <p className="p">Chưa thấy câu trả lời bạn cần? Đội Bellhop sẵn sàng khảo sát mô hình chuỗi của bạn.</p>
        <div className="faq-help">
          <b>Chưa thấy câu trả lời?</b>
          <span>Nhắn Zalo hoặc gọi trực tiếp cho đội Bellhop.</span>
          <div className="btns"><a className="btn btn-primary btn-sm" href="#">Chat Zalo</a><a className="btn btn-outline btn-sm" href="tel:0972096499">Gọi 0972 096 499</a></div>
        </div>
      </div>
      <div className="faq">
        
                {(v.faq || []).map((f, $index) => (
                  <React.Fragment key={$index}>
          <div>
            <button className="faq-q" type="button" aria-expanded={f.exp} onClick={f.toggle}><span>{f.q}</span><span aria-hidden="true" style={{ fontSize: "24px", color: "#1450F0" }}>{f.sign}</span></button>
            
                      {Boolean(f.open) && (
                        <>
              <div className="faq-a">
                
                          {Boolean(f.hasA) && (
                            <><span>{f.a} </span>
                            </>
                          )}
                
                          {Boolean(f.hasPh) && (
                            <><span className="ph">{f.ph}</span>
                            </>
                          )}
              </div>
            
                        </>
                      )}
          </div>
        
                  </React.Fragment>
                ))}
      </div>
    </div>
  </div></section><section className="sec" id="giai-phap-khac" style={{ paddingTop: "0" }}>
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack" style={{ gap: "14px" }}><span className="eyebrow">Giải pháp khác</span><h2 className="h2">Khám phá các giải pháp khác</h2></div>
    <div className="plans">
      <a className="rcard" href="/giai-phap/khach-san"><div className="top" style={{ background: "linear-gradient(135deg, #8BE3E8, #1450F0)" }}></div><div className="body"><span className="chip" style={{ alignSelf: "flex-start" }}>PMS · CMS · Booking Engine</span><h3 className="h3">Khách sạn</h3><p className="small">Nhiều ca lễ tân, nhiều hạng phòng, bán trên nhiều OTA.</p><span className="lnk" style={{ marginTop: "6px" }}>Xem giải pháp cho khách sạn <span className="arr">→</span></span></div></a>
      <a className="rcard" href="/giai-phap/homestay-villa"><div className="top" style={{ background: "linear-gradient(135deg, #8BE3E8, #2E9AA5)" }}></div><div className="body"><span className="chip" style={{ alignSelf: "flex-start" }}>PMS miễn phí · Message · Website</span><h3 className="h3">Homestay &amp; Villa</h3><p className="small">Ít nhân sự, chủ tự vận hành qua điện thoại, khách hỏi nhiều qua mạng xã hội.</p><span className="lnk" style={{ marginTop: "6px" }}>Xem giải pháp cho homestay &amp; villa <span className="arr">→</span></span></div></a>
    </div>
  </div></section><section className="sec" id="dang-ky" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <LeadForm defaultType="Chuỗi lưu trú" />
  </div></section>
        <Footer /></div>
      </>
    );
  }
}
