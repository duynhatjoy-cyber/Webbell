import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

export default class HomestaySolutionPage extends DCLogic {
  constructor(p) { super(p); this.state = { day: 0, pick: 'pms', faq: 0 }; }
  renderVals() {
    const s = this.state;
    const D = [
      { label: 'Sáng · 08:00', kicker: 'Sáng · Bellhop Message', title: 'Tin nhắn qua đêm đã nằm gọn trong một hộp thư', desc: 'Câu hỏi gửi ngoài giờ từ các kênh được tập trung lại và đánh dấu chưa xử lý – không cần mở từng ứng dụng.', ticks: ['Hộp thư hợp nhất cho các kênh đã kết nối', 'Trạng thái hội thoại: mới · đang xử lý · đã xong', 'Mẫu câu trả lời nhanh cho câu hỏi thường gặp'], href: 'https://bellhop.vn/san-pham/bellhop-message', link: 'Tìm hiểu Bellhop Message' },
      { label: 'Chiều · 14:00', kicker: 'Chiều · Message + Booking Engine', title: 'Khách hỏi phòng – gửi link, khách tự đặt', desc: 'Gửi đường dẫn đặt phòng ngay trong cuộc trò chuyện; khách tự chọn phòng và xác nhận, đặt phòng vào thẳng Bellhop PMS.', ticks: ['Gửi link đặt phòng (Booking Engine) trong hội thoại', 'Khách xem phòng trống, giá theo ngày và xác nhận', 'Đặt phòng ghi vào sơ đồ phòng, không nhập lại'], href: 'https://bellhop.vn/san-pham/bellhop-booking-engine', link: 'Tìm hiểu Booking Engine' },
      { label: 'Tối · 21:00', kicker: 'Tối · Bellhop PMS', title: 'Nhìn sơ đồ phòng, sẵn sàng cho ngày mai', desc: 'Phòng nào có khách, phòng nào đặt trước, phòng nào cần dọn – thấy hết trên một sơ đồ. Muốn có trợ lý trả lời câu hỏi thường gặp ngoài giờ? Kết hợp AI Concierge.', ticks: ['Sơ đồ phòng theo trạng thái: trống · có khách · đặt trước · cần dọn', 'Timeline nhiều ngày để thấy ngày còn trống', 'AI Concierge trả lời dựa trên cơ sở kiến thức của chính cơ sở bạn'], href: 'https://bellhop.vn/san-pham/bellhop-pms', link: 'Tìm hiểu Bellhop PMS' }
    ];
    const days = D.map((d, i) => ({ label: d.label, cls: i === s.day ? 'on' : '', pressed: i === s.day ? 'true' : 'false', pick: () => this.setState({ day: i }) }));
    const P = [
      { key: 'pms', title: 'Bellhop PMS miễn phí', desc: 'Sơ đồ phòng, đặt phòng, buồng phòng, thu chi cơ bản.', name: 'Bellhop PMS', role: 'Quản lý phòng · Lễ tân & vận hành 0đ', tile: 't-blue', what: 'Cho homestay & villa ít nhân sự: thay sổ tay và Excel bằng một sơ đồ phòng duy nhất, mọi nguồn đặt về cùng một chỗ.', ticks: ['Lễ tân, sơ đồ phòng, timeline – miễn phí', 'Buồng phòng: giao việc dọn phòng – miễn phí', 'Tạo hóa đơn, thu chi cơ bản – miễn phí'], href: 'https://bellhop.vn/san-pham/bellhop-pms', link: 'Tìm hiểu Bellhop PMS' },
      { key: 'msg', title: 'Bellhop Message', desc: 'Gom tin nhắn từ các kênh mạng xã hội về một hộp thư.', name: 'Bellhop Message', role: 'Hộp thư đa kênh · Máy tính & điện thoại', tile: 't-orange', what: 'Cho chủ cơ sở tự trả lời khách: mọi tin nhắn về một nơi, xem lại lịch sử trao đổi và thông tin đặt phòng của khách.', ticks: ['Hộp thư hợp nhất cho các kênh đã kết nối', 'Mẫu câu trả lời nhanh', 'Gửi link đặt phòng trong hội thoại'], href: 'https://bellhop.vn/san-pham/bellhop-message', link: 'Tìm hiểu Bellhop Message' },
      { key: 'web', title: 'Bellhop Website + Booking Engine', desc: 'Website riêng, khách đặt phòng ngay trên đó.', name: 'Bellhop Website', role: 'Mẫu homestay & villa · Tích hợp Booking Engine', tile: 't-navy', what: 'Cho cơ sở chưa có website hoặc chỉ có fanpage: website ưu tiên hình ảnh không gian, khách xem phòng và đặt trực tiếp.', ticks: ['Mẫu riêng cho homestay & villa', 'Booking Engine tích hợp sẵn', 'Đặt phòng vào thẳng Bellhop PMS'], href: 'https://bellhop.vn/san-pham/bellhop-website', link: 'Tìm hiểu Bellhop Website' }
    ];
    const picks = P.map((k) => ({ title: k.title, desc: k.desc, cls: k.key === s.pick ? 'on' : '', pressed: k.key === s.pick ? 'true' : 'false', pick: () => this.setState({ pick: k.key }) }));
    const pk = P.filter((k) => k.key === s.pick)[0] || P[0];
    const F = [
      { q: 'Phần mềm miễn phí có giới hạn gì không?', a: 'Các phân hệ nâng cao tính phí theo Bảng giá.', ph: '[Thời hạn, số phòng, số tài khoản của bản miễn phí]' },
      { q: 'Tôi tự vận hành trên điện thoại được không?', a: 'Bellhop Message dùng được trên máy tính và điện thoại.', ph: '[Bellhop PMS: web trên trình duyệt điện thoại / ứng dụng iOS, Android]' },
      { q: 'Bellhop Message kết nối được những kênh nào?', a: '', ph: '[Danh sách kênh]' },
      { q: 'Chưa có website thì sao?', a: 'Bellhop Website có mẫu riêng cho homestay & villa, tích hợp sẵn Booking Engine. Nếu đã có website, bạn có thể gắn Booking Engine vào website hiện tại.', ph: '' },
      { q: 'Gửi link đặt phòng cho khách trong tin nhắn thế nào?', a: 'Trong Bellhop Message, bạn gửi đường dẫn đặt phòng (Booking Engine) ngay trong hội thoại; khách tự chọn phòng và xác nhận, đặt phòng vào thẳng Bellhop PMS.', ph: '' }
    ];
    const faq = F.map((x, i) => {
      const o = s.faq === i;
      return { q: x.q, a: x.a, ph: x.ph, hasA: x.a !== '', hasPh: x.ph !== '', open: o, exp: o ? 'true' : 'false', sign: o ? '−' : '+', toggle: () => this.setState({ faq: o ? -1 : i }) };
    });
    return { days, day: D[s.day], isD0: s.day === 0, isD1: s.day === 1, isD2: s.day === 2, picks, pk, faq };
  }

  componentDidMount() {
    document.title = "Bellhop – Giải pháp cho homestay &amp; villa";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="homestay" startOpen={false} /><section className="p-hero">
  <div className="wrap p-hero-in">
    <div className="stack" style={{ gap: "24px" }}>
      <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "0" }}><a href="/">Trang chủ</a><span>›</span><a href="/#giai-phap">Giải pháp</a><span>›</span><b style={{ color: "#122745" }}>Homestay &amp; Villa</b></nav>
      <span className="eyebrow">Giải pháp cho homestay &amp; villa</span>
      <h1 className="display" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>Tự vận hành homestay, <span className="hl">không phải ôm điện thoại cả ngày</span></h1>
      <p className="lead">Tin nhắn từ các kênh về một hộp thư, khách tự đặt qua link bạn gửi trong cuộc trò chuyện, đặt phòng tự vào sơ đồ phòng. Bắt đầu với phần mềm quản lý miễn phí.</p>
      <div className="btns"><a className="btn btn-primary" href="/#dang-ky">Dùng thử miễn phí</a><a className="btn btn-outline" href="#dang-ky">Đặt lịch demo</a></div>
    </div>
    <div className="feat-vis bg-tint-c" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "0", padding: "24px" }}>
      <div style={{ width: "min(280px, 100%)", borderRadius: "36px", background: "#122745", padding: "10px", boxShadow: "0 40px 70px -36px rgba(18,39,69,.6)" }}>
        <div style={{ borderRadius: "31px", background: "#FFFFFF", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div className="row" style={{ gap: "10px", padding: "16px 16px 12px", borderBottom: "1px solid #E3E8F2" }}><span className="tile t-orange" style={{ fontSize: "12px", fontWeight: "800" }}>TH</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ display: "block", fontSize: "14px" }}>Thu Hà</b><span className="small" style={{ fontSize: "11px" }}>Bellhop Message · Zalo</span></span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#1F7A84" }}>Mới</span></div>
          <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "10px", background: "#F5F8FE" }}>
            <span style={{ alignSelf: "flex-start", maxWidth: "86%", padding: "9px 12px", borderRadius: "14px 14px 14px 4px", background: "#FFFFFF", boxShadow: "0 0 0 1px #E3E8F2", fontSize: "13px" }}>Cuối tuần này còn villa 2 phòng ngủ không ạ?</span>
            <span style={{ alignSelf: "flex-end", maxWidth: "86%", padding: "9px 12px", borderRadius: "14px 14px 4px 14px", background: "#1450F0", color: "#FFFFFF", fontSize: "13px" }}>Dạ còn ạ. Em gửi chị link để chọn ngày và đặt luôn nhé.</span>
            <div style={{ alignSelf: "flex-end", width: "88%", borderRadius: "14px", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 0 0 1px #E3E8F2" }}>
              <img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="" style={{ display: "block", width: "100%", height: "64px", objectFit: "cover" }} />
              <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "6px" }}><b style={{ fontSize: "13px" }}>Hillside Villa · Đặt phòng</b><span className="small" style={{ fontSize: "12px" }}>Xem phòng trống, giá và xác nhận ngay</span><span className="btn btn-primary btn-sm" style={{ minHeight: "34px", fontSize: "11px" }}>Mở link đặt phòng</span></div>
            </div>
          </div>
          <div className="row" style={{ gap: "8px", padding: "10px 12px", borderTop: "1px solid #E3E8F2" }}><span className="chip" style={{ height: "28px", fontSize: "11px", background: "#F5F8FE" }}>Mẫu trả lời nhanh</span><span style={{ flex: "1" }}></span><span className="btn btn-primary btn-sm" style={{ minHeight: "32px", padding: "0 12px", fontSize: "11px" }}>Gửi</span></div>
        </div>
      </div>
      <div className="card" style={{ position: "absolute", right: "16px", bottom: "28px", width: "min(250px, 100%)", padding: "14px 16px", display: "flex", gap: "12px", alignItems: "center" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>Đặt phòng mới · Villa 2PN</b><span className="small">Đã ghi vào sơ đồ phòng PMS</span></span></div>
    </div>
  </div></section><section className="soft-grid sec" id="thach-thuc" style={{ paddingTop: "72px", paddingBottom: "56px" }}>
  <div className="wrap stack" style={{ gap: "36px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Những thách thức quen thuộc</span>
      <h2 className="h2">Ít người, nhiều kênh, việc gì cũng qua điện thoại của chủ</h2>
    </div>
    <div className="grid3">
      <div className="fcard"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="14" y="3" width="7" height="7" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="3" y="14" width="7" height="7" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="14" y="14" width="7" height="7" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect></svg></span><h3 className="h4">Mỗi kênh một ứng dụng</h3><p className="p">Khách hỏi qua đủ kênh mạng xã hội; phải mở từng ứng dụng để kiểm tra, tin nhắn dễ bị sót.</p></div>
      <div className="fcard"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Khách hỏi xong rồi… đi mất</h3><p className="p">Chưa có website hoặc chỉ có fanpage: khách phải nhắn tin, chờ báo giá – nhiều trường hợp không quay lại.</p></div>
      <div className="fcard"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="11" height="11" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><rect x="10" y="9" width="11" height="11" rx="2" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect></svg></span><h3 className="h4">Sổ tay, Excel, tin nhắn</h3><p className="p">Đặt phòng ghi mỗi nơi một ít – không ai thấy bức tranh đầy đủ, dễ trùng phòng.</p></div>
    </div>
  </div></section><section className="soft-grid sec" id="mot-ngay" style={{ paddingTop: "0" }}>
  <div className="wrap stack" style={{ gap: "40px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "820px", margin: "0 auto" }}>
      <span className="eyebrow">Một ngày làm việc</span>
      <h2 className="h2">Một ngày của chủ homestay với Bellhop</h2>
      <p className="lead">Chọn một thời điểm trong ngày.</p>
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
      <div className="feat-vis bg-tint-c" style={{ minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
                {Boolean(v.isD0) && (
                  <>
          <div className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", width: "min(440px, 100%)", margin: "0 auto" }}>
            <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "4px 6px 8px" }}><b style={{ fontSize: "15px" }}>Hộp thư · 08:00</b><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#1F7A84" }}>3 chưa xử lý</span></div>
            <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#EAF1FF" }}><span className="tile t-sky" style={{ fontSize: "13px", fontWeight: "800" }}>JK</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Jun Kim</b> <span className="chip" style={{ height: "22px", fontSize: "11px", background: "#FFFFFF" }}>Messenger</span><br /><span className="small" style={{ fontSize: "13px" }}>Is breakfast included?</span></span><span className="small" style={{ fontSize: "12px" }}>23:40</span></div>
            <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-orange" style={{ fontSize: "13px", fontWeight: "800" }}>LA</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Lan Anh</b> <span className="chip" style={{ height: "22px", fontSize: "11px" }}>Zalo</span><br /><span className="small" style={{ fontSize: "13px" }}>Có chỗ đậu ô tô không?</span></span><span className="small" style={{ fontSize: "12px" }}>00:15</span></div>
            <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-navy" style={{ fontSize: "13px", fontWeight: "800" }}>MP</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Minh Phúc</b> <span className="chip" style={{ height: "22px", fontSize: "11px" }}>Website</span><br /><span className="small" style={{ fontSize: "13px" }}>Cho mình xin địa chỉ</span></span><span className="small" style={{ fontSize: "12px" }}>06:02</span></div>
            <span className="small" style={{ fontSize: "12px", padding: "4px 6px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isD1) && (
                  <>
          <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px", width: "min(440px, 100%)", margin: "0 auto" }}>
            <span style={{ alignSelf: "flex-start", maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#F5F8FE", fontSize: "14px" }}>Cho em đặt villa 2 phòng ngủ 23–25/10 nhé</span>
            <div style={{ alignSelf: "flex-end", width: "min(300px, 90%)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 0 0 1px #E3E8F2" }}>
              <img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="" style={{ display: "block", width: "100%", height: "110px", objectFit: "cover" }} />
              <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}><b style={{ fontSize: "15px" }}>Đặt phòng trực tiếp · 23–25/10</b><span className="small" style={{ fontSize: "13px" }}>Xem phòng trống, giá và xác nhận ngay</span><span className="btn btn-primary btn-sm">Mở link đặt phòng</span></div>
            </div>
            <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#EAF1FF" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><span style={{ fontSize: "14px" }}><b style={{ display: "block" }}>Khách đã đặt</b>Đặt phòng vào thẳng sơ đồ phòng</span></div>
            <span className="small" style={{ fontSize: "12px" }}>Minh họa</span>
          </div>
        
                  </>
                )}
        
                {Boolean(v.isD2) && (
                  <>
          <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px", width: "min(460px, 100%)", margin: "0 auto" }}>
            <div className="row" style={{ justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}><b style={{ fontSize: "15px" }}>Sơ đồ phòng · Ngày mai</b><span className="small" style={{ fontSize: "12px" }}>Minh họa</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", fontSize: "13px" }}>
              <span style={{ padding: "12px", borderRadius: "12px", background: "#122745", color: "#FFFFFF" }}><b style={{ display: "block" }}>Villa A</b>Có khách</span>
              <span style={{ padding: "12px", borderRadius: "12px", background: "#1450F0", color: "#FFFFFF" }}><b style={{ display: "block" }}>Villa B</b>Đặt trước</span>
              <span style={{ padding: "12px", borderRadius: "12px", background: "#E6F6F7", color: "#1F7A84" }}><b style={{ display: "block" }}>Phòng 1</b>Cần dọn</span>
              <span style={{ padding: "12px", borderRadius: "12px", background: "#F5F8FE" }}><b style={{ display: "block" }}>Phòng 2</b>Trống</span>
              <span style={{ padding: "12px", borderRadius: "12px", background: "#1450F0", color: "#FFFFFF" }}><b style={{ display: "block" }}>Phòng 3</b>Đặt trước</span>
              <span style={{ padding: "12px", borderRadius: "12px", background: "#F5F8FE" }}><b style={{ display: "block" }}>Phòng 4</b>Trống</span>
            </div>
            <div className="row" style={{ justifyContent: "space-between", gap: "10px", padding: "12px 14px", borderRadius: "12px", background: "#F5F8FE", fontSize: "14px" }}><span>Khách đến ngày mai</span><b>2</b></div>
            <div className="row" style={{ gap: "10px", alignItems: "flex-start" }}><img src="/assets/0e8369a376638069fb965d8bf187dceb.png" alt="" style={{ width: "32px", height: "32px", borderRadius: "50%" }} /><span style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: "#EAF1FF", fontSize: "13px" }}><b style={{ display: "block", fontSize: "12px", color: "#4A5873" }}>AI Concierge · tùy chọn</b>Giờ nhận phòng từ 14:00 ạ.</span></div>
          </div>
        
                  </>
                )}
      </div>
    </div>
  </div></section><section className="sec" id="bo-cong-cu">
  <div className="wrap stack" style={{ gap: "120px" }}>
    <div className="stack center" style={{ gap: "18px", alignItems: "center", maxWidth: "860px", margin: "0 auto" }}>
      <span className="eyebrow">Bộ ba cho homestay &amp; villa</span>
      <h2 className="h2">Quản lý phòng, trả lời khách, nhận đặt phòng – trên cùng một dữ liệu</h2>
      <p className="lead">Bắt đầu miễn phí với Bellhop PMS, thêm Message và Website khi bạn cần.</p>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Quản lý phòng · Bellhop PMS miễn phí</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Bỏ sổ tay, mọi đặt phòng nằm trên một sơ đồ phòng</h3>
        <p className="p">Khách đặt qua tin nhắn, gọi điện, website hay OTA đều hiện cùng một chỗ – nhìn là biết phòng nào trống, phòng nào cần dọn.</p>
        <ul className="ticks">
          <li><span><b>Lễ tân &amp; đặt phòng</b>: nhận, đổi, trả phòng – miễn phí</span></li>
          <li><span><b>Sơ đồ phòng &amp; timeline</b>: trống · có khách · đặt trước · cần dọn – miễn phí</span></li>
          <li><span><b>Buồng phòng</b>: giao việc dọn phòng cho người phụ giúp – miễn phí</span></li>
          <li><span><b>Tạo hóa đơn, thu chi cơ bản</b> theo ca/ngày – miễn phí</span></li>
        </ul>
        <a className="lnk" href="https://bellhop.vn/san-pham/bellhop-pms">Tìm hiểu Bellhop PMS <span className="arr">→</span></a>
      </div>
      <div className="feat-vis bg-tint">
        <div className="frame">
          <div className="frame-bar"><i></i><i></i><i></i><span>app.bellhop.vn/dat-phong</span></div>
          <img src="/assets/d8e97cd43f9f645eec6abba0f8eee195.png" alt="Màn hình Danh sách đặt phòng của Bellhop PMS" />
        </div>
        <div className="card" style={{ position: "relative", margin: "-28px 0 0 auto", width: "260px", padding: "16px 18px", display: "flex", gap: "12px", alignItems: "center" }}><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><span><b style={{ display: "block", fontSize: "15px" }}>0đ</b><span className="small">cho lễ tân &amp; vận hành</span></span></div>
      </div>
    </div>

    <div className="feat rev">
      <div className="feat-txt">
        <span className="eyebrow">Trả lời khách · Bellhop Message</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Mọi tin nhắn về một hộp thư, mở trên điện thoại là thấy</h3>
        <p className="p">Không cần mở từng ứng dụng: biết ngay hội thoại nào mới, hội thoại nào đang chờ, hội thoại nào đã xong.</p>
        <ul className="ticks">
          <li><span><b>Hộp thư hợp nhất</b> cho các kênh đã kết nối</span></li>
          <li><span><b>Dùng trên máy tính và điện thoại</b></span></li>
          <li><span><b>Mẫu câu trả lời nhanh</b> cho câu hỏi thường gặp</span></li>
          <li><span><b>Thông tin đặt phòng</b> của khách từ Bellhop PMS ngay cạnh hội thoại</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-message">Tìm hiểu Bellhop Message <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-ai-concierge">AI Concierge <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-tint-o">
        <div className="card" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", maxWidth: "460px", margin: "0 auto" }}>
          <b style={{ fontSize: "15px", padding: "4px 6px 8px" }}>Hộp thư chung</b>
          <div className="row" style={{ gap: "12px", padding: "12px", borderRadius: "12px", background: "#EAF1FF" }}><span className="tile t-orange" style={{ fontSize: "13px", fontWeight: "800" }}>TH</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Thu Hà</b><br /><span className="small" style={{ fontSize: "13px" }}>Cuối tuần còn villa 2 phòng ngủ không ạ?</span></span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#E6F6F7", color: "#1F7A84" }}>Mới</span></div>
          <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-sky" style={{ fontSize: "13px", fontWeight: "800" }}>JK</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Jun Kim</b><br /><span className="small" style={{ fontSize: "13px" }}>Is breakfast included?</span></span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đang xử lý</span></div>
          <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-navy" style={{ fontSize: "13px", fontWeight: "800" }}>MP</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Minh Phúc</b><br /><span className="small" style={{ fontSize: "13px" }}>Cho mình xin địa chỉ</span></span><span className="chip" style={{ height: "24px", fontSize: "11px" }}>Đang xử lý</span></div>
          <div className="row" style={{ gap: "12px", padding: "12px" }}><span className="tile t-blue" style={{ fontSize: "13px", fontWeight: "800" }}>LA</span><span style={{ flex: "1", minWidth: "0" }}><b style={{ fontSize: "14px" }}>Lan Anh</b><br /><span className="small" style={{ fontSize: "13px" }}>Có chỗ đậu ô tô không?</span></span><span className="chip" style={{ height: "24px", fontSize: "11px", background: "#F5F8FE", color: "#4A5873" }}>Đã xong</span></div>
          <div className="row" style={{ gap: "8px", flexWrap: "wrap", padding: "8px 6px 0" }}><span className="chip" style={{ background: "#F5F8FE" }}>Giờ nhận phòng</span><span className="chip" style={{ background: "#F5F8FE" }}>Địa chỉ</span><span className="chip" style={{ background: "#F5F8FE" }}>Bãi đỗ xe</span></div>
          <span className="small" style={{ fontSize: "12px", padding: "4px 6px" }}>Minh họa</span>
        </div>
      </div>
    </div>

    <div className="feat">
      <div className="feat-txt">
        <span className="eyebrow">Nhận đặt phòng · Website &amp; Booking Engine</span>
        <h3 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}>Website đẹp cho homestay, khách đặt ngay trên đó</h3>
        <p className="p">Mẫu riêng cho homestay &amp; villa, ưu tiên hình ảnh không gian và trải nghiệm địa phương. Đường dẫn đặt phòng gửi được ngay trong hội thoại.</p>
        <ul className="ticks">
          <li><span><b>Mẫu homestay &amp; villa</b>: thêm hình ảnh và giá phòng của bạn</span></li>
          <li><span><b>Tích hợp sẵn Booking Engine</b>: khách xem phòng, chọn ngày và đặt trực tiếp</span></li>
          <li><span><b>Giá và phòng trống</b> lấy từ Bellhop PMS</span></li>
          <li><span><b>Gửi link đặt phòng</b> trong Bellhop Message</span></li>
        </ul>
        <div className="btns" style={{ gap: "24px" }}><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-website">Tìm hiểu Bellhop Website <span className="arr">→</span></a><a className="lnk" href="https://bellhop.vn/san-pham/bellhop-booking-engine">Booking Engine <span className="arr">→</span></a></div>
      </div>
      <div className="feat-vis bg-tint-c">
        <div className="card" style={{ overflow: "hidden" }}><img src="/assets/383384ea4d76acccc2ee15a8bffbdfd6.jpg" alt="Ảnh minh họa cơ sở lưu trú trên website" style={{ display: "block", width: "100%", height: "260px", objectFit: "cover" }} /></div>
        <div className="card" style={{ position: "relative", margin: "-60px auto 0 24px", width: "min(340px, 90%)", padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <b style={{ fontSize: "15px" }}>Hillside Villa · Đặt phòng</b>
          <div className="row" style={{ justifyContent: "space-between", fontSize: "14px" }}><span>23/10 → 25/10</span><b>2 đêm</b></div>
          <div className="row" style={{ justifyContent: "space-between", fontSize: "14px" }}><span>Villa 2 phòng ngủ</span><b>6.400.000đ</b></div>
          <span className="btn btn-primary btn-sm" style={{ width: "100%" }}>Xác nhận đặt phòng</span>
          <span className="small" style={{ fontSize: "12px" }}>Mẫu Hillside · Minh họa</span>
        </div>
      </div>
    </div>
  </div></section><section className="sec dark">
  <div className="wrap stack" style={{ gap: "56px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "760px" }}>
      <span className="eyebrow">Bộ công cụ gợi ý</span>
      <h2 className="h2" style={{ color: "#FFFFFF" }}>Đủ dùng cho một người vận hành, sẵn sàng khi bạn mở rộng</h2>
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
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Gói phù hợp</span><h2 className="h2">Bắt đầu 0đ, chỉ trả cho phần bạn cần</h2></div>
    <div className="plans">
      <div className="plan hi">
        <div className="row" style={{ gap: "8px", flexWrap: "wrap" }}><span className="chip">Miễn phí</span><span className="chip" style={{ background: "#E6F6F7", color: "#1F7A84" }}>Gợi ý cho homestay &amp; villa</span></div>
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
        <h2 className="h2">Câu hỏi thường gặp của homestay &amp; villa</h2>
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
      <a className="rcard" href="/giai-phap/khach-san"><div className="top" style={{ background: "linear-gradient(135deg, #8BE3E8, #1450F0)" }}></div><div className="body"><span className="chip" style={{ alignSelf: "flex-start" }}>PMS · CMS · Booking Engine</span><h3 className="h3">Khách sạn</h3><p className="small">Nhiều ca lễ tân, nhiều hạng phòng, bán trên nhiều OTA.</p><span className="lnk" style={{ marginTop: "6px" }}>Xem giải pháp cho khách sạn <span className="arr">→</span></span></div></a>
      <a className="rcard" href="/giai-phap/chuoi-luu-tru"><div className="top" style={{ background: "radial-gradient(420px 300px at 85% 10%, rgba(27,69,196,.55), transparent 70%), linear-gradient(135deg, #1B3A5C, #122745)" }}></div><div className="body"><span className="chip" style={{ alignSelf: "flex-start" }}>PMS nâng cao · CMS · Finance</span><h3 className="h3">Chuỗi lưu trú</h3><p className="small">Nhiều cơ sở, cần phân quyền, báo cáo tập trung, kế toán thống nhất.</p><span className="lnk" style={{ marginTop: "6px" }}>Xem giải pháp cho chuỗi <span className="arr">→</span></span></div></a>
    </div>
  </div></section><section className="sec" id="dang-ky" style={{ paddingTop: "0" }}>
  <div className="wrap">
    <LeadForm defaultType="Homestay & Villa" />
  </div></section>
        <Footer /></div>
      </>
    );
  }
}
