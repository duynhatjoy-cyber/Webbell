import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

export default class HotelSolutionPage extends DCLogic {
  constructor(p) { super(p); this.state = { day: 0, pick: 'pms', faq: 0 }; }
  renderVals() {
    const s = this.state;
    const D = [
      { label: 'Lễ tân', kicker: 'Lễ tân · Bellhop PMS', title: 'Một sơ đồ phòng cho mọi nguồn đặt', desc: 'Khách vãng lai, gọi điện, đặt trên website hay qua OTA đều hiện trên cùng sơ đồ phòng và timeline – ca sau mở máy là nắm đủ việc.', ticks: ['Nhận phòng, đổi phòng, trả phòng trong vài thao tác', 'Thêm dịch vụ vào phòng: giặt ủi, đưa đón, minibar', 'Timeline nhiều ngày để thấy ngay ngày còn trống'], href: 'https://bellhop.vn/san-pham/bellhop-pms', link: 'Phân hệ Lễ tân' },
      { label: 'Buồng phòng', kicker: 'Buồng phòng · Bellhop PMS', title: 'Lễ tân biết ngay phòng nào sẵn sàng', desc: 'Buồng phòng cập nhật trạng thái dọn, sơ đồ phòng ở quầy đổi theo – không cần báo miệng.', ticks: ['Danh sách phòng cần dọn theo thời gian thực', 'Giao việc dọn phòng cho từng nhân viên', 'Trạng thái phòng hiện ngay trên sơ đồ phòng'], href: 'https://bellhop.vn/san-pham/bellhop-pms#buong-phong', link: 'Phân hệ Buồng phòng' },
      { label: 'Quản lý giá & kênh bán', kicker: 'Doanh thu · Bellhop CMS', title: 'Đổi giá cuối tuần trong một lần', desc: 'Thiết lập giá và tồn phòng trên Bellhop, CMS cập nhật lên các kênh OTA đã kết nối; website dùng cùng bảng giá.', ticks: ['Lịch giá trực quan theo ngày, theo hạng phòng', 'Giá theo mùa, ngày lễ, sự kiện, ngày trong tuần', 'Đặt phòng OTA về thẳng Bellhop PMS'], href: 'https://bellhop.vn/san-pham/bellhop-cms', link: 'Tìm hiểu Bellhop CMS' }
    ];
    const days = D.map((d, i) => ({ label: d.label, cls: i === s.day ? 'on' : '', pressed: i === s.day ? 'true' : 'false', pick: () => this.setState({ day: i }) }));
    const P = [
      { key: 'pms', title: 'Bellhop PMS', desc: 'Trung tâm vận hành: lễ tân, buồng phòng, kho, thu chi.', name: 'Bellhop PMS', role: 'Vận hành hằng ngày · Lễ tân & vận hành 0đ', tile: 't-blue', what: 'Cho khách sạn nhiều ca: mọi người làm trên cùng một sơ đồ phòng, mỗi nhân viên một tài khoản với quyền theo vai trò.', ticks: ['Lễ tân, sơ đồ phòng, timeline, buồng phòng – miễn phí', 'Tạo hóa đơn, thu chi cơ bản theo ca/ngày – miễn phí', 'F&B, kho chuyên sâu, hóa đơn điện tử – gói nâng cao'], href: 'https://bellhop.vn/san-pham/bellhop-pms', link: 'Tìm hiểu Bellhop PMS' },
      { key: 'cms', title: 'Bellhop CMS', desc: 'Đồng bộ giá, tồn phòng và đặt phòng với các kênh OTA.', name: 'Bellhop CMS', role: 'Quản lý kênh OTA & định giá linh động', tile: 't-sky', what: 'Cho khách sạn bán trên nhiều OTA: cập nhật một lần, giá và phòng trống lên mọi kênh đã kết nối.', ticks: ['Cập nhật hàng loạt theo khoảng ngày, hạng phòng', 'Đặt phòng OTA về Bellhop PMS', 'Phân quyền người được thay đổi giá'], href: 'https://bellhop.vn/san-pham/bellhop-cms', link: 'Tìm hiểu Bellhop CMS' },
      { key: 'be', title: 'Booking Engine', desc: 'Nhận đặt phòng trực tiếp trên website của khách sạn.', name: 'Bellhop Booking Engine', role: 'Bán phòng trực tiếp', tile: 't-orange', what: 'Cho khách sạn muốn giảm phụ thuộc OTA: khách tự tìm phòng và đặt ngay, đặt phòng vào thẳng sơ đồ phòng.', ticks: ['Gắn vào website hiện có, hoặc dùng Bellhop Website', 'Giá theo ngày đồng bộ với PMS và CMS', 'Ghi nhận nguồn đặt để đánh giá kênh trực tiếp'], href: 'https://bellhop.vn/san-pham/bellhop-booking-engine', link: 'Tìm hiểu Booking Engine' }
    ];
    const picks = P.map((k) => ({ title: k.title, desc: k.desc, cls: k.key === s.pick ? 'on' : '', pressed: k.key === s.pick ? 'true' : 'false', pick: () => this.setState({ pick: k.key }) }));
    const pk = P.filter((k) => k.key === s.pick)[0] || P[0];
    const F = [
      { q: 'Có phải dùng cả PMS, CMS và Booking Engine cùng lúc không?', a: 'Không. Bạn có thể bắt đầu với Bellhop PMS miễn phí, thêm CMS và Booking Engine khi cần – tất cả chạy trên cùng một dữ liệu.', ph: '[Điều kiện dùng CMS / Booking Engine không kèm PMS]' },
      { q: 'Nhiều nhân viên, nhiều ca dùng cùng lúc được không?', a: 'Được. Mỗi nhân viên có tài khoản riêng và quyền theo vai trò.', ph: '[Giới hạn số tài khoản ở bản miễn phí]' },
      { q: 'Bellhop CMS kết nối với những kênh OTA nào?', a: '', ph: '[Danh sách kênh]' },
      { q: 'Bellhop CMS có loại bỏ hoàn toàn rủi ro trùng phòng không?', a: 'Bellhop CMS cập nhật tồn phòng đồng thời trên các kênh nhằm hạn chế trùng phòng; rủi ro có thể phát sinh khi kênh OTA chậm xử lý cập nhật.', ph: '' },
      { q: 'Đang dùng phần mềm khác hay Excel, chuyển sang có khó không?', a: 'Bạn có thể chuyển đặt phòng sắp tới, danh sách khách và danh mục phòng sang Bellhop theo hướng dẫn từng bước.', ph: '[Hình thức hỗ trợ chuyển dữ liệu]' }
    ];
    const faq = F.map((x, i) => {
      const o = s.faq === i;
      return { q: x.q, a: x.a, ph: x.ph, hasA: x.a !== '', hasPh: x.ph !== '', open: o, exp: o ? 'true' : 'false', sign: o ? '−' : '+', toggle: () => this.setState({ faq: o ? -1 : i }) };
    });
    return { days, day: D[s.day], isD0: s.day === 0, isD1: s.day === 1, isD2: s.day === 2, picks, pk, faq };
  }

  componentDidMount() {
    document.title = "Bellhop – Giải pháp cho khách sạn";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="hotel" startOpen={false} /><section className="p-hero">
  <div className="wrap p-hero-in">
    <div className="stack" style={{ gap: "24px" }}>
      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0" }}><a href="/">Trang chủ</a><span>›</span><a href="/#giai-phap">Giải pháp</a><span>›</span><b style={{ color: "#122745" }}>Khách sạn</b></nav>
      <span className="eyebrow">Giải pháp cho khách sạn</span>
      <h1 className="display" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>Nhiều ca, nhiều hạng phòng, nhiều kênh bán – <span className="hl">một hệ thống chung</span></h1>
      <p className="lead">Lễ tân, buồng phòng, kênh OTA và website đặt phòng chạy trên cùng một dữ liệu. Ca sau nắm đủ việc ca trước, giá cập nhật một lần cho mọi kênh, khách đặt thẳng trên website của bạn.</p>
      <div className="btns"><a className="btn btn-primary" href="/#dang-ky">Dùng thử miễn phí</a><a className="btn btn-outline" href="#dang-ky">Đặt lịch demo</a></div>
    </div>
    <div style={{ position: "relative" }}>
      <div className="frame">
        <div className="frame-bar"><i></i><i></i><i></i><span>app.bellhop.vn/dat-phong</span></div>
        <img src="/assets/d8e97cd43f9f645eec6abba0f8eee195.png" alt="Màn hình Danh sách đặt phòng của Bellhop PMS" />
      </div>
      <div className="card" style={{ position: "relative", margin: "-36px 24px 0 auto", width: "300px", padding: "16px 18px", display: "flex", gap: "12px", alignItems: "center" }}><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Đặt phòng OTA mới · Deluxe</b><span className="small">Đã về sơ đồ phòng PMS · Minh họa</span></span></div>
    </div>
  </div></section><section className="soft-grid sec" id="thach-thuc" style={{ paddingTop: "72px", paddingBottom: "56px" }}>
  <div className="wrap stack" style={{ gap: "36px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Những thách thức quen thuộc</span>
      <h2 className="h2">Khách sạn càng bán tốt, việc phía sau càng dễ rối</h2>
    </div>
    <div className="grid3">
      <div className="fcard"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="13" y="4" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="3" y="13" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="13" y="13" width="8" height="7" rx="1.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect></svg></span><h3 className="h4">Cập nhật giá trên từng trang OTA</h3><p className="p">Mỗi lần đổi giá hay đóng bán phải làm lại trên nhiều hệ thống; tồn phòng không trừ đồng thời, dễ trùng phòng mùa cao điểm.</p></div>
      <div className="fcard"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h13l-3-3M20 16H7l3 3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Giao ca thất lạc thông tin</h3><p className="p">Khách đặt cọc chưa, ai đổi ngày, phòng nào chưa dọn xong – chỉ nằm trong trí nhớ ca trước hoặc lời báo miệng.</p></div>
      <div className="fcard"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19L19 5M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Phụ thuộc hoa hồng OTA</h3><p className="p">Website chưa nhận đặt phòng, khách phải gọi điện, nhắn tin – nhiều người quay lại đặt qua OTA.</p></div>
    </div>
  </div></section><section className="soft-grid sec" id="mot-ngay" style={{ paddingTop: "0" }}>
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", margin: "0 auto" }}>
      <span className="eyebrow">Một ngày làm việc</span>
      <h2 className="h2" style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}>Mỗi vị trí thấy đúng phần việc của mình</h2>
      <p className="lead">Chọn một vị trí để xem họ làm việc trên Bellhop thế nào.</p>
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
          <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}><b style={{ fontSize: "15px" }}>Timeline · 19–25/10</b><span className="row" style={{ gap: "10px", fontSize: "12px", color: "#4A5873" }}><span className="row" style={{ gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#122745" }}></i>Đang ở</span><span className="row" style={{ gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#1450F0" }}></i>Trực tiếp</span><span className="row" style={{ gap: "4px" }}><i style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#2E9AA5" }}></i>OTA</span></span></div>
            <div style={{ display: "grid", gridTemplateColumns: "40px repeat(7, minmax(0, 1fr))", gap: "6px 4px", fontSize: "12px", alignItems: "center" }}>
              <span></span><span className="small" style={{ fontSize: "11px", textAlign: "center" }}>T2 19</span><span className="small" style={{ fontSize: "11px", textAlign: "center" }}>T3 20</span><span className="small" style={{ fontSize: "11px", textAlign: "center" }}>T4 21</span><span className="small" style={{ fontSize: "11px", textAlign: "center" }}>T5 22</span><span className="small" style={{ fontSize: "11px", textAlign: "center" }}>T6 23</span><span className="small" style={{ fontSize: "11px", textAlign: "center" }}>T7 24</span><span className="small" style={{ fontSize: "11px", textAlign: "center" }}>CN 25</span>
              <b style={{ gridColumn: "1" }}>101</b><span style={{ gridColumn: "2 / 5", background: "#1450F0", color: "#FFFFFF", borderRadius: "6px", padding: "6px 8px", whiteSpace: "nowrap", overflow: "hidden" }}>Anh Minh · 3 đêm</span>
              <b style={{ gridColumn: "1" }}>102</b><span style={{ gridColumn: "4 / 7", background: "#2E9AA5", color: "#FFFFFF", borderRadius: "6px", padding: "6px 8px", whiteSpace: "nowrap", overflow: "hidden" }}>Chị Lan · OTA</span>
              <b style={{ gridColumn: "1" }}>103</b><span style={{ gridColumn: "2 / 9", height: "28px", borderRadius: "6px", background: "#F5F8FE" }}></span>
              <b style={{ gridColumn: "1" }}>201</b><span style={{ gridColumn: "2 / 7", background: "#122745", color: "#FFFFFF", borderRadius: "6px", padding: "6px 8px", whiteSpace: "nowrap", overflow: "hidden" }}>Gia đình Hà · 5 đêm</span>
              <b style={{ gridColumn: "1" }}>202</b><span style={{ gridColumn: "2 / 4", background: "#1450F0", color: "#FFFFFF", borderRadius: "6px", padding: "6px 8px", whiteSpace: "nowrap", overflow: "hidden" }}>Gọi điện</span><span style={{ gridColumn: "6 / 9", background: "#2E9AA5", color: "#FFFFFF", borderRadius: "6px", padding: "6px 8px", whiteSpace: "nowrap", overflow: "hidden" }}>OTA</span>
              <b style={{ gridColumn: "1" }}>203</b><span style={{ gridColumn: "5 / 8", background: "#2E9AA5", color: "#FFFFFF", borderRadius: "6px", padding: "6px 8px", whiteSpace: "nowrap", overflow: "hidden" }}>Mr. Kim · OTA</span>
              <b style={{ gridColumn: "1" }}>204</b><span style={{ gridColumn: "2 / 4", background: "#122745", color: "#FFFFFF", borderRadius: "6px", padding: "6px 8px", whiteSpace: "nowrap", overflow: "hidden" }}>Ms. Sato</span><span style={{ gridColumn: "7 / 9", background: "#1450F0", color: "#FFFFFF", borderRadius: "6px", padding: "6px 8px", whiteSpace: "nowrap", overflow: "hidden" }}>Walk-in</span>
            </div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isD1) && (
                  <>
          <div className="card" style={{ overflow: "hidden" }}><img src="/assets/d967b787263d4b619b118217c8635099.png" alt="Màn hình Buồng phòng của Bellhop PMS" style={{ display: "block", width: "100%", height: "auto" }} /></div>
          <div className="card" style={{ position: "relative", margin: "-24px 0 0 auto", width: "min(340px, 92%)", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div className="row" style={{ justifyContent: "space-between" }}><b style={{ fontSize: "14px" }}>Việc buồng phòng</b><span className="small" style={{ fontSize: "12px" }}>Hằng · Ca sáng</span></div>
            <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE", fontSize: "13px" }}><span><b>Phòng 203</b> · trả phòng 10:12</span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đang dọn</span></div>
            <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE", fontSize: "13px" }}><span><b>Phòng 106</b> · trả phòng 09:40</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#1F7A84" }}>Cần dọn</span></div>
            <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "8px 10px", borderRadius: "10px", background: "#F5F8FE", fontSize: "13px" }}><span><b>Phòng 104</b> · khách đến 14:00</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#122745" }}>Sẵn sàng</span></div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isD2) && (
                  <>
          <div className="frame">
            <div className="frame-bar"><i></i><i></i><i></i><span>Lịch giá · Tháng 10</span></div>
            <div style={{ padding: "20px", overflowX: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(84px, 1.2fr) repeat(4, minmax(56px, 1fr))", gap: "6px", fontSize: "14px", textAlign: "center", alignItems: "center", minWidth: "360px" }}>
                <span className="small" style={{ textAlign: "left", fontWeight: "700" }}>Hạng</span><span className="small" style={{ fontWeight: "700" }}>T5 22</span><span className="small" style={{ fontWeight: "700" }}>T6 23</span><span className="small" style={{ fontWeight: "700" }}>T7 24</span><span className="small" style={{ fontWeight: "700" }}>CN 25</span>
                <b style={{ textAlign: "left" }}>Standard</b><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>650k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>650k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#EAF1FF", color: "#1450F0", fontWeight: "700" }}>790k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#EAF1FF", color: "#1450F0", fontWeight: "700" }}>790k</span>
                <b style={{ textAlign: "left" }}>Deluxe</b><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>890k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#EAF1FF", color: "#1450F0", fontWeight: "700" }}>990k</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#EAF1FF", color: "#1450F0", fontWeight: "700" }}>1,05tr</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>890k</span>
                <b style={{ textAlign: "left" }}>Family</b><span style={{ padding: "10px 0", borderRadius: "8px", background: "#E6F6F7", color: "#1F7A84", fontWeight: "700" }}>1,1tr</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>1,3tr</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#E3E8F2", color: "#4A5873" }}>Đóng</span><span style={{ padding: "10px 0", borderRadius: "8px", background: "#F5F8FE" }}>1,3tr</span>
                <span className="small" style={{ textAlign: "left" }}>Tồn phòng</span><b>9</b><b>5</b><b>2</b><b>7</b>
              </div>
              <div className="row" style={{ justifyContent: "space-between", gap: "12px", marginTop: "14px", flexWrap: "wrap" }}><span className="small" style={{ fontSize: "12px" }}>Minh họa</span><span className="chip" style={{ background: "#E6F6F7" }}>Đã đồng bộ lên các kênh</span></div>
            </div>
          </div>
        
                  </>
                )}
      </div>
    </div>
  </div></section><section className="sec" id="bo-cong-cu">
  <div className="wrap stack" style={{ gap: "120px" }}>
    <div className="stack center" style={{ gap: "18px", alignItems: "center", maxWidth: "860px", margin: "0 auto" }}>
      <span className="eyebrow">Bộ ba cho khách sạn</span>
      <h2 className="h2">Vận hành, phân phối và bán trực tiếp trên cùng một dữ liệu</h2>
      <p className="lead">Dùng riêng từng sản phẩm hoặc kết hợp – không nhập lại, không lệch số.</p>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Vận hành · Bellhop PMS</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Lễ tân, buồng phòng và thu chi trên cùng một màn hình</h3>
        <p className="p">Mọi đặt phòng – khách vãng lai, gọi điện, từ website hay OTA – hiện trên cùng một sơ đồ phòng và timeline.</p>
        <ul className="ticks">
          <li><span><b>Lễ tân &amp; đặt phòng</b>: nhận, đổi, trả phòng trong vài thao tác – miễn phí</span></li>
          <li><span><b>Buồng phòng</b>: giao việc dọn phòng, trạng thái hiện ngay trên sơ đồ phòng – miễn phí</span></li>
          <li><span><b>Tài khoản &amp; phân quyền</b>: mỗi nhân viên một tài khoản, quyền theo vai trò</span></li>
          <li><span><b>Kho chuyên sâu, F&amp;B, hóa đơn điện tử</b> – gói nâng cao</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms">Tìm hiểu Bellhop PMS <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/de8ede5a8ea84f4225237b7fd9aebf2d.png" alt="Màn hình Cấu hình phòng và giá của Bellhop PMS" style={{ display: "block", width: "100%", height: "auto" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-28px 0 0 auto", width: "min(320px, 90%)", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <b style={{ fontSize: "15px" }}>Hạng phòng &amp; giá dùng chung</b>
          <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip">Bellhop PMS</span><span className="chip">Website</span><span className="chip">Kênh OTA</span></div>
        </div>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Phân phối · Bellhop CMS</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Đổi giá một lần, mọi kênh OTA cùng cập nhật</h3>
        <p className="p">Bellhop CMS đồng bộ giá, phòng trống và đặt phòng giữa Bellhop PMS với các kênh OTA đã kết nối.</p>
        <ul className="ticks">
          <li><span>Cập nhật giá và tồn phòng hàng loạt theo khoảng ngày, hạng phòng</span></li>
          <li><span>Nhận đặt phòng từ OTA về Bellhop PMS</span></li>
          <li><span>Giá linh động theo mùa, ngày lễ, sự kiện và ngày trong tuần</span></li>
          <li><span>Phân quyền: kiểm soát người được thay đổi giá</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-cms">Tìm hiểu Bellhop CMS <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "460px", margin: "0 auto" }}>
          <div className="row" style={{ gap: "12px" }}><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Bellhop CMS</b><span className="small" style={{ fontSize: "12px" }}>Deluxe 24/10 · 1,05tr · còn 2</span></span></div>
          <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}>Giá &amp; tồn phòng</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7" }}>Đã cập nhật</span></div>
          <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}>Giá &amp; tồn phòng</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7" }}>Đã cập nhật</span></div>
          <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#F5F8FE" }}><span className="ph-box" style={{ width: "96px", height: "36px", padding: "0", fontSize: "11px" }}>Logo OTA</span><span style={{ flex: "1", fontSize: "14px" }}>Giá &amp; tồn phòng</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7" }}>Đã cập nhật</span></div>
          <div className="row" style={{ gap: "12px", padding: "10px 12px", borderRadius: "12px", background: "#EAF1FF" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 9h18M7 6.5h.01M10 6.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><span style={{ flex: "1", fontSize: "14px" }}>Website của khách sạn</span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#FFFFFF" }}>Cùng giá</span></div>
          <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
        </div>
      </div>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Bán trực tiếp · Booking Engine</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Khách đặt ngay trên website, đặt phòng vào thẳng sơ đồ phòng</h3>
        <p className="p">Khách xem phòng trống, giá theo ngày và hoàn tất đặt phòng trên website của bạn – lễ tân không phải báo giá rồi ghi chép lại.</p>
        <ul className="ticks">
          <li><span><b>Tìm phòng theo ngày</b> và số khách</span></li>
          <li><span><b>Trang hạng phòng</b>: hình ảnh, diện tích, tiện nghi, chính sách hủy</span></li>
          <li><span><b>Vào thẳng PMS</b>: ghi vào sơ đồ phòng và timeline, ghi nhận nguồn đặt</span></li>
          <li><span><b>Dùng kèm CMS</b>: tồn phòng trừ đồng thời trên các kênh OTA</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-booking-engine">Tìm hiểu Booking Engine <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-website">Bellhop Website <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-tint-c">
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
  </div></section><section className="sec dark">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px" }}>
      <span className="eyebrow">Bộ công cụ gợi ý</span>
      <h2 className="h2" style={{ color: "#FFFFFF", fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: "none" }}>Ba sản phẩm, một bức tranh đầy đủ cho khách sạn</h2>
    </div>
    <div className="picker">
      <div className="pick-list">
        
                {(v.picks || []).map((k, $index) => (
                  <React.Fragment key={$index}>
          <button className={`pick ${k.cls ?? ''}`} type="button" aria-pressed={k.pressed} onClick={k.pick}><b>{k.title}</b><span>{k.desc}</span></button>
        
                  </React.Fragment>
                ))}
      </div>
      <div style={{ borderRadius: "28px", padding: "36px", background: "radial-gradient(420px 300px at 85% 10%, rgba(27,69,196,.55), transparent 70%), linear-gradient(160deg, #1B3A5C, #122745)", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Gói phù hợp</span><h2 className="h2">Bắt đầu miễn phí, thêm kênh bán khi bạn sẵn sàng</h2></div>
    <div className="plans">
      <div className="plan hi">
        <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip">Miễn phí</span><span className="chip" style={{ background: "#E6F6F7", color: "#1F7A84" }}>Điểm bắt đầu cho khách sạn</span></div>
        <h3 className="h3">Bellhop PMS</h3>
        <div className="row" style={{ gap: "8px", alignItems: "baseline" }}><span className="price">0đ</span><span className="small">/ <span className="ph">[thời hạn · giới hạn phòng/người dùng]</span></span></div>
        <ul className="ticks">
          <li>Cài đặt cơ sở: sơ đồ phòng, phòng &amp; giá, dịch vụ, thuế/phí, mẫu in, phân quyền</li>
          <li>Lễ tân &amp; đặt phòng · Sơ đồ phòng, timeline · Buồng phòng</li>
          <li>Kho cơ bản · Tạo hóa đơn · Thu chi cơ bản · Thống kê</li>
        </ul>
        <a className="btn btn-primary" href="/#dang-ky" style={{ marginTop: "auto" }}>Dùng thử miễn phí</a>
      </div>
      <div className="plan">
        <span className="chip" style={{ alignSelf: "flex-start", background: "#E6F6F7", color: "#1F7A84" }}>Nâng cao</span>
        <h3 className="h3">Cộng thêm theo module</h3>
        <div className="row" style={{ gap: "8px", alignItems: "baseline" }}><span className="price"><span className="ph" style={{ fontSize: "0.5em" }}>[giá]</span></span><span className="small">/ tháng hoặc Liên hệ</span></div>
        <ul className="ticks">
          <li><b>Vận hành nâng cao</b>: F&amp;B, kho chuyên sâu, email marketing</li>
          <li><b>Tài chính</b>: hóa đơn điện tử, sổ sách, quỹ tiền mặt &amp; tiền gửi</li>
          <li><b>AI Concierge &amp; Phân tích</b>: trợ lý AI, phân tích doanh thu, báo cáo</li>
        </ul>
        <a className="btn btn-outline" href="/#bang-gia" style={{ marginTop: "auto" }}>So sánh các gói</a>
      </div>
    </div>
    <div className="btns" style={{ justifyContent: "center" }}><a className="lnk" href="/#bang-gia">Xem bảng giá đầy đủ <span className="arr">→</span></a></div>
  </div></section><section className="sec" id="faq">
  <div className="wrap">
    <div className="feat" style={{ alignItems: "start" }}>
      <div className="feat-txt">
        <span className="eyebrow">FAQ</span>
        <h2 className="h2">Câu hỏi thường gặp của khách sạn</h2>
        <p className="p">Chưa thấy câu trả lời bạn cần? Đội Bellhop sẵn sàng tư vấn theo đúng mô hình của bạn.</p>
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
      <a className="rcard" href="/giai-phap/homestay-villa"><div className="top" style={{ background: "linear-gradient(135deg, #8BE3E8, #2E9AA5)" }}></div><div className="body"><span className="chip" style={{ alignSelf: "flex-start" }}>PMS miễn phí · Message · Website</span><h3 className="h3">Homestay &amp; Villa</h3><p className="small">Ít nhân sự, chủ tự vận hành qua điện thoại, khách hỏi nhiều qua mạng xã hội.</p><span className="lnk" style={{ marginTop: "6px" }}>Xem giải pháp cho homestay &amp; villa <span className="arr">→</span></span></div></a>
      <a className="rcard" href="/giai-phap/chuoi-luu-tru"><div className="top" style={{ background: "radial-gradient(420px 300px at 85% 10%, rgba(27,69,196,.55), transparent 70%), linear-gradient(135deg, #1B3A5C, #122745)" }}></div><div className="body"><span className="chip" style={{ alignSelf: "flex-start" }}>PMS nâng cao · CMS · Finance</span><h3 className="h3">Chuỗi lưu trú</h3><p className="small">Nhiều cơ sở, cần phân quyền, báo cáo tập trung, kế toán thống nhất.</p><span className="lnk" style={{ marginTop: "6px" }}>Xem giải pháp cho chuỗi <span className="arr">→</span></span></div></a>
    </div>
  </div></section><section className="sec" id="dang-ky" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <LeadForm defaultType="Khách sạn" />
  </div></section>
        <Footer /></div>
      </>
    );
  }
}
