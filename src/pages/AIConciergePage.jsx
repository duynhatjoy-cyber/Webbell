import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class AIConciergePage extends DCLogic {
  constructor(p) { super(p); this.state = { asked: [], open: 0, f: { name: '', phone: '', email: '', org: '', type: '', rooms: '', consent: false }, prods: ['AI Concierge'], err: {}, sent: false }; }
  renderVals() {
    const s = this.state;
    const Q = [
      { q: 'Mấy giờ nhận phòng ạ?', a: 'Giờ nhận phòng từ 14:00, trả phòng trước 12:00. Nếu cần nhận phòng sớm, anh/chị vui lòng để lại thời gian dự kiến, lễ tân sẽ kiểm tra và phản hồi.' },
      { q: 'Có chỗ đậu ô tô không?', a: 'Khách sạn có bãi đỗ ô tô miễn phí ở tầng hầm. Anh/chị vui lòng báo biển số xe khi nhận phòng ạ.' },
      { q: 'Từ sân bay đến khách sạn bao xa?', a: 'Đi taxi mất khoảng 20–25 phút tùy giờ. Khách sạn có dịch vụ đưa đón, anh/chị có muốn đặt không ạ?' },
      { q: 'Tôi muốn đổi ngày đặt phòng', a: 'Yêu cầu này sẽ được chuyển cho lễ tân để hỗ trợ trực tiếp.', hand: true }
    ];
    const msgs = [];
    s.asked.forEach((k) => {
      msgs.push({ out: true, ai: false, hand: false, text: Q[k].q });
      msgs.push({ out: false, ai: true, hand: false, text: Q[k].a });
      if (Q[k].hand) msgs.push({ out: false, ai: false, hand: true, text: '' });
    });
    const sugs = [];
    Q.forEach((x, k) => { if (s.asked.indexOf(k) < 0) sugs.push({ q: x.q, ask: () => this.setState({ asked: this.state.asked.concat([k]) }) }); });
    const F = [
      { q: 'AI có trả lời sai hoặc tự đưa ra thông tin không có thật không?', a: 'AI được thiết lập để trả lời trong phạm vi cơ sở kiến thức; câu hỏi ngoài phạm vi được chuyển cho nhân viên.', ph: false },
      { q: 'AI hỗ trợ những ngôn ngữ nào?', a: '[Danh sách ngôn ngữ]', ph: true },
      { q: 'Có thể xem lại các cuộc trò chuyện của AI không?', a: '[Câu trả lời]', ph: true },
      { q: 'AI có thể tự xác nhận hoặc hủy đặt phòng không?', a: '[Câu trả lời]', ph: true },
      { q: 'Có cần dùng Bellhop Message không?', a: '[Câu trả lời]', ph: true }
    ];
    const faq = F.map((x, i) => {
      const o = s.open === i;
      return { q: x.q, a: x.a, isPh: x.ph, isTxt: !x.ph, open: o, exp: o ? 'true' : 'false', sign: o ? '−' : '+', toggle: () => this.setState({ open: o ? -1 : i }) };
    });
    // Form đăng ký
    const f = s.f;
    const setF = (k, v) => this.setState({ f: Object.assign({}, this.state.f, { [k]: v }) });
    const on = {};
    ['name', 'phone', 'email', 'org', 'type', 'rooms'].forEach((k) => { on[k] = (e) => setF(k, e.target.value); });
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

    return {
      form,
      msgs, sugs, noSugs: sugs.length === 0,
      reset: () => this.setState({ asked: [] }),
      faq
    };
  }

  componentDidMount() {
    document.title = "Bellhop AI Concierge – Trợ lý AI trả lời khách cho khách sạn";
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <>
        <div className="bh t">
        <Header active="ai" startOpen={false} /><section className="p-hero ai-hero">
  <div className="wrap">
    <nav className="crumb" aria-label="Breadcrumb" style={{ marginBottom: "28px" }}><a href="/">Trang chủ</a><span>›</span><a href="/#tong-quan">Sản phẩm</a><span>›</span><b>Bellhop AI Concierge</b></nav>
    <div className="p-hero-in">
      <div className="stack" style={{ gap: "22px" }}>
        <span className="eyebrow">Bellhop AI Concierge</span>
        <h1 className="display">Trợ lý AI trả lời khách theo thông tin <span className="hl">của chính khách sạn</span></h1>
        <p className="lead">Bellhop AI Concierge giải đáp các câu hỏi thường gặp về phòng, tiện ích, chính sách và chỉ đường dựa trên cơ sở kiến thức do khách sạn thiết lập; những yêu cầu cần xử lý riêng được chuyển cho nhân viên.</p>
        <div className="btns"><a className="btn ai-cta" href="#dang-ky">Đặt lịch demo với dữ liệu của khách sạn <span>→</span></a></div>
      </div>
      <div className="ai-chat">
        <div className="ai-chat-h">
          <span className="ai-bot"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 10h8a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3zM12 10V6M12 5h.01M9.5 14.5h.01M14.5 14.5h.01" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span>
          <span style={{ flex: "1" }}><b>Trợ lý Khách sạn Mẫu</b><small><i></i>Đang hoạt động</small></span>
          <button className="ai-reset" type="button" onClick={v.reset}>Làm mới</button>
        </div>
        <div className="ai-chat-b" aria-live="polite">
          <span className="ai-m bot">Xin chào! Tôi có thể giúp gì cho anh/chị về Khách sạn Mẫu?</span>
          
                  {(v.msgs || []).map((mm, $index) => (
                    <React.Fragment key={$index}>
            
                      {Boolean(mm.out) && (
                        <><span className="ai-m me">{mm.text}</span>
                        </>
                      )}
            
                      {Boolean(mm.ai) && (
                        <><span className="ai-m bot">{mm.text}</span>
                        </>
                      )}
            
                      {Boolean(mm.hand) && (
                        <><span className="ai-hand">→ Đã chuyển cho nhân viên lễ tân</span>
                        </>
                      )}
          
                    </React.Fragment>
                  ))}
        </div>
        <div className="ai-chat-f">
          
                  {(v.sugs || []).map((g, $index) => (
                    <React.Fragment key={$index}><button className="ai-sug" type="button" onClick={g.ask}>{g.q}</button>
                    </React.Fragment>
                  ))}
          
                  {Boolean(v.noSugs) && (
                    <><span className="small" style={{ fontSize: "13px" }}>Bấm “Làm mới” để thử lại.</span>
                    </>
                  )}
        </div>
      </div>
    </div>
  </div></section><section className="sec" id="kien-thuc">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center", maxWidth: "760px", margin: "0 auto" }}>
      <span className="eyebrow">AI học từ đâu</span>
      <h2 className="h2">Câu trả lời dựa trên cơ sở kiến thức của khách sạn</h2>
      <p className="lead">Khách sạn cung cấp và kiểm soát nội dung mà AI sử dụng. Khi thông tin thay đổi, chỉ cần cập nhật cơ sở kiến thức.</p>
    </div>
    <div className="kb">
      <div className="kb-src"><span className="kb-lab">Nguồn thông tin</span><div className="kb-it"><span className="kb-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M7 10V7h4v3" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span>Hạng phòng, tiện nghi từ Bellhop PMS</div><div className="kb-it"><span className="kb-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7zM10 11h5M10 15h5M10 7h2" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span>Chính sách nhận/trả, hủy phòng, trẻ em, thú cưng</div><div className="kb-it"><span className="kb-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span>Tiện ích, dịch vụ, giờ hoạt động</div><div className="kb-it"><span className="kb-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span>Vị trí, chỉ đường, điểm tham quan lân cận</div><div className="kb-it"><span className="kb-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h5v18H6a2 2 0 0 0-2 2zM20 5a2 2 0 0 0-2-2h-5v18h5a2 2 0 0 1 2 2z" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span>Bộ câu hỏi thường gặp do khách sạn soạn</div></div>
      <div className="kb-core"><span className="kb-ring"><span className="kb-circle"><span className="kb-cic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h5v18H6a2 2 0 0 0-2 2zM20 5a2 2 0 0 0-2-2h-5v18h5a2 2 0 0 1 2 2z" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><b>Cơ sở kiến thức</b><small>Khách sạn kiểm soát</small></span></span></div>
      <div className="kb-out">
        <span className="ai-m me">Có chỗ đỗ ô tô không ạ?</span>
        <span className="ai-m bot lt">Khách sạn có bãi đỗ ô tô miễn phí ở tầng hầm, vui lòng báo lễ tân biển số xe khi nhận phòng ạ.</span>
        <small>Nguồn: Tiện ích · cập nhật 12/10</small>
      </div>
    </div>
  </div></section><section className="sec" id="pham-vi" style={{ paddingTop: "0" }}>
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Minh bạch</span><h2 className="h2">Phạm vi hỗ trợ của AI Concierge</h2></div>
    <div className="pv">
      <div className="pv-card a"><div className="pv-media"><svg className="pv-art" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A3F6B"></stop><stop offset="1" stopColor="#C98A7A"></stop></linearGradient></defs><rect width="400" height="160" fill="url(#dusk)"></rect><path d="M0 140 Q120 110 240 135 T400 125 V160 H0z" fill="#3A2E4F"></path><path d="M110 70 L210 25 L310 70 z" fill="#B5473A"></path><rect x="125" y="68" width="170" height="92" fill="#F3E9DC"></rect><rect x="150" y="90" width="34" height="30" rx="3" fill="#FFD27A"></rect><rect x="240" y="90" width="34" height="30" rx="3" fill="#FFD27A"></rect><rect x="196" y="110" width="30" height="50" rx="14" fill="#5B3A2E"></rect><path d="M120 72 Q165 86 210 74 T305 72" style={{ fill: "none", stroke: "#2B2B2B", strokeWidth: "1" }}></path><g fill="#FFE08A"><circle cx="135" cy="76" r="3"></circle><circle cx="155" cy="80" r="3"></circle><circle cx="175" cy="81" r="3"></circle><circle cx="195" cy="78" r="3"></circle><circle cx="225" cy="77" r="3"></circle><circle cx="250" cy="79" r="3"></circle><circle cx="275" cy="77" r="3"></circle><circle cx="296" cy="74" r="3"></circle></g></svg><span className="pv-bub">Dạ, homestay nhận thú cưng nhỏ ạ.</span></div><div className="pv-body"><div className="pv-head"><span className="pv-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM12 8v4M10 10h4" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>AI Concierge hỗ trợ</h3></div><ul><li><span>✓</span>Trả lời câu hỏi thường gặp theo cơ sở kiến thức</li><li><span>✓</span>Phản hồi ngoài giờ làm việc</li><li><span>✓</span>Trả lời bằng nhiều ngôn ngữ</li><li><span>✓</span>Gửi đường dẫn đặt phòng</li></ul></div></div>
      <div className="pv-mid"><span>Bàn giao cho nhân viên</span></div>
      <div className="pv-card b"><div className="pv-media"><svg className="pv-art" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="160" fill="#14244A"></rect><rect x="110" y="0" width="200" height="120" fill="#B98A5A"></rect><g style={{ stroke: "#A57849", strokeWidth: "2" }}><path d="M130 0v120M150 0v120M170 0v120M190 0v120M210 0v120M230 0v120M250 0v120M270 0v120M290 0v120"></path></g><rect x="160" y="14" width="100" height="26" rx="3" fill="#1C2B55"></rect><text x="210" y="31" textAnchor="middle" style={{ font: "700 11px sans-serif", fill: "#fff", letterSpacing: "2px" }}>RECEPTION</text><rect x="60" y="112" width="290" height="48" fill="#22325E"></rect><rect x="60" y="108" width="290" height="8" fill="#2E4278"></rect><rect x="125" y="62" width="50" height="38" rx="3" fill="#E8EEF7"></rect><rect x="130" y="67" width="40" height="26" fill="#9CC3F0"></rect><path d="M262 104 a14 14 0 0 1 28 0z" fill="#E0A94A"></path><rect x="300" y="92" width="30" height="18" rx="3" fill="#6FE0F0" transform="rotate(-12 315 101)"></rect></svg><span className="pv-bub y">→ Đã chuyển cho nhân viên lễ tân</span></div><div className="pv-body"><div className="pv-head"><span className="pv-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 21a7 7 0 0 1 12-5M16 19h6M19 16l3 3-3 3" style={{ fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3>Chuyển cho nhân viên</h3></div><ul><li><span>→</span>Thay đổi, hủy đặt phòng</li><li><span>→</span>Khiếu nại, yêu cầu đặc biệt</li><li><span>→</span>Câu hỏi nằm ngoài cơ sở kiến thức</li><li><span>→</span>Khi khách yêu cầu gặp nhân viên</li></ul></div></div>
    </div>
  </div></section><section className="soft-grid sec" id="hanh-trinh">
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Theo hành trình</span><h2 className="h2">Hỗ trợ khách trong suốt thời gian lưu trú</h2></div>
    <div className="jr">
      <div className="jr-card"><svg className="jr-art" viewBox="0 0 300 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="330" fill="#6EC3E6"></rect><circle cx="90" cy="90" r="42" fill="#BDE7F5"></circle><circle cx="90" cy="90" r="30" fill="#E6F7FC"></circle><rect x="140" y="110" width="180" height="60" fill="#F2F5F8"></rect><rect x="130" y="102" width="200" height="10" fill="#D8E0E8"></rect><g fill="#2E6F8E"><rect x="155" y="125" width="18" height="14"></rect><rect x="183" y="125" width="18" height="14"></rect><rect x="211" y="125" width="18" height="14"></rect><rect x="239" y="125" width="18" height="14"></rect><rect x="267" y="125" width="18" height="14"></rect></g><rect y="165" width="300" height="90" fill="#2E9FC0"></rect><path d="M0 190 Q40 182 80 190 T160 190 T240 190 T320 190" style={{ fill: "none", stroke: "#BDEAF5", strokeWidth: "2" }}></path><path d="M0 255 Q150 225 300 245 V330 H0z" fill="#F1D9A8"></path></svg><span className="jr-tag">Trước khi đến</span><div className="jr-chat"><span className="ai-m me">Từ sân bay đi taxi mất bao lâu?</span><span className="ai-m bot lt">Khoảng 30–35 phút ạ. Khách sạn có xe đưa đón, anh/chị muốn đặt không?</span></div><div className="jr-cap"><b>Trước khi đến</b><span>Giờ nhận phòng, đường đi, phương tiện, giấy tờ cần mang theo.</span></div></div>
      <div className="jr-card"><svg className="jr-art" viewBox="0 0 300 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="330" fill="#F3EBDD"></rect><rect x="110" y="30" width="170" height="200" fill="#4A5568"></rect><rect x="118" y="38" width="74" height="184" fill="#7CC6F2"></rect><rect x="198" y="38" width="74" height="184" fill="#7CC6F2"></rect><path d="M118 180 Q170 160 192 175 V222 H118z M198 170 Q240 150 272 168 V222 H198z" fill="#5BB0D8"></path><rect x="0" y="230" width="300" height="100" fill="#E7DCC8"></rect><rect x="10" y="200" width="150" height="60" rx="4" fill="#6B4A36"></rect><rect x="10" y="250" width="180" height="40" rx="6" fill="#FFFFFF"></rect><rect x="200" y="220" width="60" height="60" rx="3" fill="#8A5A3C"></rect><rect x="210" y="235" width="40" height="4" fill="#C9A27A"></rect><rect x="210" y="255" width="40" height="4" fill="#C9A27A"></rect></svg><span className="jr-tag">Trong lưu trú</span><div className="jr-chat"><span className="ai-m me">What’s the Wi‑Fi password?</span><span className="ai-m bot lt">The Wi‑Fi is “KhachSanMau”, the password is on your key card.</span></div><div className="jr-cap"><b>Trong lưu trú</b><span>Giờ ăn sáng, mật khẩu Wi‑Fi, gợi ý địa điểm ăn uống, tham quan.</span></div></div>
      <div className="jr-card"><svg className="jr-art" viewBox="0 0 300 330" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="330" fill="#141B3A"></rect><g fill="#FFFFFF" opacity=".6"><circle cx="40" cy="40" r="1.2"></circle><circle cx="250" cy="30" r="1.2"></circle><circle cx="200" cy="70" r="1"></circle><circle cx="70" cy="110" r="1"></circle></g><rect x="70" y="80" width="170" height="250" fill="#E7DFCF"></rect><rect x="62" y="74" width="186" height="10" fill="#8C6B4A"></rect><rect x="105" y="40" width="100" height="30" rx="2" fill="#1C2433" style={{ stroke: "#E0A94A", strokeWidth: "1.5" }}></rect><text x="155" y="61" textAnchor="middle" style={{ font: "700 14px sans-serif", fill: "#FFE48A", letterSpacing: "3px" }}>HOTEL</text><g><rect x="88" y="100" width="26" height="30" fill="#FFE07A"></rect><rect x="128" y="100" width="26" height="30" fill="#1C2433"></rect><rect x="168" y="100" width="26" height="30" fill="#FFE07A"></rect><rect x="208" y="100" width="20" height="30" fill="#1C2433"></rect><rect x="88" y="145" width="26" height="30" fill="#1C2433"></rect><rect x="128" y="145" width="26" height="30" fill="#FFE07A"></rect><rect x="168" y="145" width="26" height="30" fill="#1C2433"></rect><rect x="208" y="145" width="20" height="30" fill="#FFE07A"></rect><rect x="88" y="190" width="26" height="30" fill="#FFE07A"></rect><rect x="128" y="190" width="26" height="30" fill="#1C2433"></rect><rect x="168" y="190" width="26" height="30" fill="#FFE07A"></rect><rect x="208" y="190" width="20" height="30" fill="#1C2433"></rect></g></svg><span className="jr-tag">Sau khi trả phòng</span><div className="jr-chat"><span className="ai-m me">Mình để quên sạc ở phòng 203</span><span className="ai-hand">→ Đã chuyển cho nhân viên lễ tân</span></div><div className="jr-cap"><b>Sau khi trả phòng</b><span>Giữ hành lý, xuất hóa đơn, đồ để quên.</span></div></div>
    </div>
  </div></section><section className="sec" id="thiet-lap" style={{ paddingTop: "64px", paddingBottom: "56px" }}>
  <div className="wrap stack" style={{ gap: "32px" }}>
    <div className="stack center" style={{ gap: "16px", alignItems: "center" }}><span className="eyebrow">Thiết lập</span><h2 className="h2">Thiết lập AI Concierge</h2></div>
    <div className="tl">
      <div className="tl-step s1"><div className="tl-win"><div className="tl-bar"><i></i><i></i><i></i></div><div className="tl-body"><b>Cơ sở kiến thức</b><div className="tl-row"><span>Giờ nhận/trả phòng</span><em className="ok">Đã nhập</em></div><div className="tl-row"><span>Bãi đỗ xe</span><em className="ok">Đã nhập</em></div><div className="tl-row"><span>Chính sách thú cưng</span><em className="miss">Thiếu</em></div></div></div><div className="tl-cap"><span className="tl-n">01</span><span><b>Nhập thông tin</b><small>Cập nhật cơ sở kiến thức từ dữ liệu có sẵn và bộ câu hỏi thường gặp.</small></span></div></div>
      <div className="tl-step s2"><div className="tl-win"><div className="tl-bar"><i></i><i></i><i></i></div><div className="tl-body"><b>Chế độ thử</b><span className="ai-m me" style={{ alignSelf: "flex-end" }}>Có nhận thú cưng không?</span><span className="ai-m bot lt">Câu hỏi này sẽ được chuyển cho lễ tân.</span><span className="tl-edit">Sửa câu trả lời</span></div></div><div className="tl-cap"><span className="tl-n">02</span><span><b>Kiểm tra</b><small>Thử hỏi và điều chỉnh câu trả lời trước khi áp dụng.</small></span></div></div>
      <div className="tl-step s3"><div className="tl-win"><div className="tl-bar"><i></i><i></i><i></i></div><div className="tl-body"><b>Kênh hoạt động</b><div className="tl-row"><span>Website</span><em className="on">● Bật</em></div><div className="tl-row"><span>Zalo OA</span><em className="on">● Bật</em></div><div className="tl-row"><span>Messenger</span><em className="off">Tắt</em></div></div></div><div className="tl-cap"><span className="tl-n t">03</span><span><b>Kích hoạt</b><small>Bật AI trên các kênh đã chọn và theo dõi hội thoại.</small></span></div></div>
    </div>
  </div></section><section className="sec" id="ket-noi" style={{ paddingTop: "56px" }}>
  <div className="wrap stack" style={{ gap: "48px" }}>
    <div className="stack" style={{ gap: "16px", maxWidth: "760px" }}>
      <span className="eyebrow">Hệ sinh thái</span>
      <h2 className="h2">Kết nối với các sản phẩm Bellhop</h2>
      <p className="lead">AI Concierge chạy trên cùng dữ liệu với các sản phẩm khác của Bellhop.</p>
    </div>
    <div className="grid4">
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-message"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop Message</h3><p className="small">Yêu cầu cần xử lý riêng được chuyển cho nhân viên trong cùng hộp thư.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-pms"><span className="tile t-blue"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M10 10v10" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></path></svg></span><h3 className="h4">Bellhop PMS</h3><p className="small">Lễ tân, buồng phòng, kho &amp; F&amp;B, báo cáo.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-booking-engine"><span className="tile t-orange"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Booking Engine</h3><p className="small">Nhận đặt phòng trực tiếp trên website.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-cms"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }}></path></svg></span><h3 className="h4">Bellhop CMS</h3><p className="small">Đồng bộ kênh OTA, định giá linh động.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-website"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 9h18M7 6.5h.01M10 6.5h.01" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Website</h3><p className="small">Website cho khách sạn, homestay, villa.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="/san-pham/bellhop-payment"><span className="tile t-sky"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2" }}></rect><path d="M3 10h18M7 15h4" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Payment</h3><p className="small">Nhận thanh toán online cho cơ sở.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="https://bellhop.vn/san-pham/bellhop-finance"><span className="tile t-navy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: "2.4", strokeLinecap: "round" }}></path></svg></span><h3 className="h4">Bellhop Finance</h3><p className="small">Đồng bộ dữ liệu sang phần mềm kế toán.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem <span className="arr">→</span></span></a>
      <a className="fcard" href="/#tong-quan" style={{ background: "#EAF1FF", boxShadow: "none" }}><h3 className="h4">Tổng quan nền tảng</h3><p className="small">Dùng riêng từng sản phẩm hoặc kết hợp – tất cả trên cùng một dữ liệu.</p><span className="lnk" style={{ marginTop: "auto", fontSize: "15px" }}>Xem tổng quan <span className="arr">→</span></span></a>
    </div>
  </div></section><section className="sec-sm" id="gia">
  <div className="wrap">
    <div className="ai-pack">
      <div className="stack" style={{ gap: "8px" }}><h2>AI Concierge trong gói AI &amp; Phân tích</h2><p>AI Concierge thuộc gói AI &amp; Phân tích của Bellhop PMS, cùng các tính năng phân tích doanh thu và báo cáo.</p></div>
      <div className="btns"><a className="btn ai-cta" href="/#bang-gia">Xem gói AI &amp; Phân tích</a><a className="btn btn-ghost" href="https://bellhop.vn/san-pham/bellhop-pms">Tìm hiểu Bellhop PMS</a></div>
    </div>
  </div></section><section className="sec" id="faq">
  <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "flex-start" }}>
    <div className="stack" style={{ gap: "16px", flex: "1 1 300px" }}>
      <span className="eyebrow">FAQ</span>
      <h2 className="h2">Câu hỏi thường gặp về AI Concierge</h2>
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
        <h2 className="h2">Xem AI Concierge trả lời bằng dữ liệu của khách sạn bạn</h2>
        <p className="sub">Để lại thông tin, đội Bellhop sẽ chuẩn bị bản demo với dữ liệu thật của cơ sở bạn.</p>
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
