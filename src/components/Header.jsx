import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import { getCurrentLang, setGlobalLang } from '../utils/i18n';

const FlagVN = () => (
  <svg className="lang-flag" viewBox="0 0 24 16" aria-hidden="true">
    <rect width="24" height="16" rx="2" fill="#DA251D" />
    <polygon
      points="12,3.2 13.35,7.35 17.7,7.35 14.18,9.9 15.52,14.05 12,11.5 8.48,14.05 9.82,9.9 6.3,7.35 10.65,7.35"
      fill="#FFFF00"
    />
  </svg>
);

const FlagEN = () => (
  <svg className="lang-flag" viewBox="0 0 24 16" aria-hidden="true">
    <rect width="24" height="16" rx="2" fill="#012169" />
    <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="3.2" />
    <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.6" />
    <path d="M12,0 V16 M0,8 H24" stroke="#FFFFFF" strokeWidth="5.2" />
    <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="3" />
  </svg>
);

export default class Header extends DCLogic {
  constructor(p) {
    super(p);
    this.state = {
      open: (p.startOpen ?? false) ? 'sp' : null,
      lang: getCurrentLang(),
      scrolled: false,
    };
    this.closeTimer = null;
    this.handleScroll = this.handleScroll.bind(this);
  }

  cancelClose() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  scheduleClose() {
    this.cancelClose();
    this.closeTimer = setTimeout(() => {
      if (this.state.open && this.state.open !== 'm') {
        this.setState({ open: null });
      }
    }, 140);
  }

  handleScroll() {
    const isScrolled = window.scrollY > 8;
    if (isScrolled !== this.state.scrolled) {
      this.setState({ scrolled: isScrolled });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.handleScroll();
  }

  componentWillUnmount() {
    this.cancelClose();
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && this.state.open) {
      this.setState({ open: null });
    }
  }

  setLang(lang) {
    this.cancelClose();
    this.setState({ lang, open: null });
    setGlobalLang(lang);
  }

  renderVals() {
    const o = this.state.open;
    const active = this.props.active ?? 'home';
    const set = (k) => () => {
      this.cancelClose();
      this.setState({ open: o === k ? null : k });
    };
    const show = (k) => () => {
      this.cancelClose();
      if (o !== k) this.setState({ open: k });
    };
    const open = {},
      cls = {},
      exp = {};
    ['sp', 'gp', 'tn', 'm', 'lang'].forEach((k) => {
      open[k] = o === k;
      cls[k] = o === k ? 'on' : '';
      exp[k] = o === k ? 'true' : 'false';
    });
    const prods = ['pms', 'booking', 'cms', 'website', 'message', 'ai', 'payment', 'finance'];
    if (prods.indexOf(active) >= 0) cls.sp = 'on';
    if (['hotel', 'homestay', 'chain'].indexOf(active) >= 0 && o !== 'gp') cls.gp = 'on';
    if (active === 'news' || active === 'blog') cls.tn = 'on';
    cls.bg = active === 'pricing' ? 'on' : '';
    cls.ab = active === 'about' ? 'on' : '';
    const act = {};
    prods.forEach((k) => {
      act[k] = k === active ? 'on' : '';
    });
    return {
      open,
      cls,
      exp,
      act,
      tSp: set('sp'),
      tGp: set('gp'),
      tTn: set('tn'),
      tM: set('m'),
      tLang: set('lang'),
      oSp: show('sp'),
      oGp: show('gp'),
      oTn: show('tn'),
      oLang: show('lang'),
      keepOpen: () => this.cancelClose(),
      closeNow: () => {
        this.cancelClose();
        if (o && o !== 'm') this.setState({ open: null });
      },
      closeAll: () => this.scheduleClose(),
    };
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    const isEn = this.state.lang === 'en';

    return (
      <>
        <div className="hdr-spacer" aria-hidden="true"></div>
        <div className="bh hdr-sticky-root">
          <header
            className={`hdr hdr-fixed ${this.state.scrolled ? 'is-scrolled' : ''}`}
            onMouseEnter={v.keepOpen}
            onMouseLeave={v.closeAll}
          >
            <div className="wrap hdr-in">
              <a className="logo" href="/" aria-label="Bellhop – Trang chủ" onMouseEnter={v.closeNow}>
                <img src="/assets/4f97ede20a93cc1bba22d88175df59a4.png" alt="Bellhop" />
              </a>
              <nav className="nav" aria-label="Điều hướng chính">
                <button
                  className={`nav-i ${v.cls.sp ?? ''}`}
                  type="button"
                  aria-expanded={v.exp.sp}
                  onClick={v.tSp}
                  onMouseEnter={v.oSp}
                >
                  {isEn ? 'Products' : 'Sản phẩm'} <i className="cv"></i>
                </button>
                <div
                  className="nav-dd-wrap"
                  style={{ position: 'relative' }}
                  onMouseEnter={v.oGp}
                  onMouseLeave={v.closeAll}
                >
                  <button
                    className={`nav-i ${v.cls.gp ?? ''}`}
                    type="button"
                    aria-expanded={v.exp.gp}
                    onClick={v.tGp}
                  >
                    {isEn ? 'Solutions' : 'Giải pháp'} <i className="cv"></i>
                  </button>

                  <div className={`dd ${v.open.gp ? 'is-open' : ''}`} aria-hidden={!v.open.gp}>
                    <a href="/giai-phap/khach-san">{isEn ? 'Hotels' : 'Khách sạn'}</a>
                    <a href="/giai-phap/homestay-villa">Homestay &amp; Villa</a>
                    <a href="/giai-phap/chuoi-luu-tru">{isEn ? 'Hotel Chains' : 'Chuỗi lưu trú'}</a>
                  </div>
                </div>
                <a className={`nav-i ${v.cls.tn ?? ''}`} href="/tin-tuc" onMouseEnter={v.closeNow}>
                  {isEn ? 'News' : 'Tin tức'}
                </a>
                <a className={`nav-i ${v.cls.bg ?? ''}`} href="/bang-gia" onMouseEnter={v.closeNow}>
                  {isEn ? 'Pricing' : 'Bảng giá'}
                </a>
                <a className={`nav-i ${v.cls.ab ?? ''}`} href="/gioi-thieu" onMouseEnter={v.closeNow}>
                  {isEn ? 'About Us' : 'Về chúng tôi'}
                </a>
              </nav>

              <div className="hdr-r">
                {/* Language Selector */}
                <div
                  className="lang-wrap"
                  onMouseEnter={v.oLang}
                  onMouseLeave={v.closeAll}
                >
                  <button
                    className={`lang-btn ${v.cls.lang ?? ''}`}
                    type="button"
                    aria-label="Chọn ngôn ngữ"
                    aria-expanded={v.exp.lang}
                    onClick={v.tLang}
                  >
                    {isEn ? <FlagEN /> : <FlagVN />}
                    <span>{isEn ? 'EN' : 'VI'}</span>
                    <i className="cv"></i>
                  </button>
                  <div
                    className={`lang-dd ${v.open.lang ? 'is-open' : ''}`}
                    role="menu"
                    aria-hidden={!v.open.lang}
                  >
                    <button
                      type="button"
                      className={`lang-opt ${!isEn ? 'on' : ''}`}
                      onClick={() => this.setLang('vi')}
                    >
                      <FlagVN />
                      <span className="lang-name">Tiếng Việt</span>
                      <span className="lang-code">VI</span>
                    </button>
                    <button
                      type="button"
                      className={`lang-opt ${isEn ? 'on' : ''}`}
                      onClick={() => this.setLang('en')}
                    >
                      <FlagEN />
                      <span className="lang-name">English</span>
                      <span className="lang-code">EN</span>
                    </button>
                  </div>
                </div>

                <a
                  className="btn btn-outline btn-sm"
                  href="https://app.bellhop.biz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={v.closeNow}
                >
                  {isEn ? 'Sign in' : 'Đăng nhập'}
                </a>
                <a className="btn btn-primary btn-sm" href="/#dang-ky" onMouseEnter={v.closeNow}>
                  {isEn ? 'Free Trial' : 'Dùng thử'}
                </a>
                <button
                  className="burger"
                  type="button"
                  aria-label="Mở menu"
                  aria-expanded={v.exp.m}
                  onClick={v.tM}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      style={{
                        fill: 'none',
                        stroke: 'currentColor',
                        strokeWidth: '2.2',
                        strokeLinecap: 'round',
                      }}
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={`mega ${v.open.sp ? 'is-open' : ''}`}
              aria-hidden={!v.open.sp}
              onMouseEnter={v.keepOpen}
              onMouseLeave={v.closeAll}
            >
              <div className="wrap mega-in" style={{ gridTemplateColumns: '1fr' }}>
                <div className="mega-cols">
                  <div className="mega-col">
                    <h4>{isEn ? 'Operations' : 'Vận hành'}</h4>
                    <a
                      className={`mega-it ${v.act.pms ?? ''}`}
                      href="https://bellhop.vn/san-pham/bellhop-pms"
                    >
                      <span className="tile t-blue">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <rect
                            x="4"
                            y="4"
                            width="16"
                            height="16"
                            rx="3"
                            style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }}
                          ></rect>
                          <path
                            d="M4 10h16M10 10v10"
                            style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }}
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop PMS</b>
                        <span>
                          {isEn
                            ? 'Front desk, housekeeping, inventory & F&B, reports'
                            : 'Lễ tân, buồng phòng, kho & F&B, báo cáo'}
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-col">
                    <h4>{isEn ? 'Distribution & Revenue' : 'Bán phòng & Doanh thu'}</h4>
                    <a
                      className={`mega-it ${v.act.booking ?? ''}`}
                      href="https://bellhop.vn/san-pham/bellhop-booking-engine"
                    >
                      <span className="tile t-orange">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <rect
                            x="4"
                            y="5"
                            width="16"
                            height="15"
                            rx="3"
                            style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }}
                          ></rect>
                          <path
                            d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"
                            style={{
                              fill: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: '2',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                            }}
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <b>Booking Engine</b>
                        <span>
                          {isEn
                            ? 'Direct bookings on your website'
                            : 'Nhận đặt phòng trực tiếp trên website'}
                        </span>
                      </div>
                    </a>
                    <a
                      className={`mega-it ${v.act.cms ?? ''}`}
                      href="https://bellhop.vn/san-pham/bellhop-cms"
                    >
                      <span className="tile t-sky">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4"
                            style={{
                              fill: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: '2.2',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                            }}
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop CMS</b>
                        <span>
                          {isEn
                            ? 'OTA channel sync & dynamic pricing'
                            : 'Đồng bộ kênh OTA, định giá linh động'}
                        </span>
                      </div>
                    </a>
                    <a
                      className={`mega-it ${v.act.website ?? ''}`}
                      href="https://bellhop.vn/san-pham/bellhop-website"
                    >
                      <span className="tile t-navy">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="16"
                            rx="3"
                            style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }}
                          ></rect>
                          <path
                            d="M3 9h18M7 6.5h.01M10 6.5h.01"
                            style={{
                              fill: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: '2',
                              strokeLinecap: 'round',
                            }}
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop Website</b>
                        <span>
                          {isEn
                            ? 'Websites for hotels, homestays & villas'
                            : 'Website cho khách sạn, homestay, villa'}
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-col">
                    <h4>{isEn ? 'Guest Care' : 'Chăm sóc khách hàng'}</h4>
                    <a
                      className={`mega-it ${v.act.message ?? ''}`}
                      href="https://bellhop.vn/san-pham/bellhop-message"
                    >
                      <span className="tile t-blue">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
                            style={{
                              fill: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: '2',
                              strokeLinejoin: 'round',
                            }}
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop Message</b>
                        <span>
                          {isEn
                            ? 'Unified inbox for all messaging channels'
                            : 'Gom tin nhắn mọi kênh về một nơi'}
                        </span>
                      </div>
                    </a>
                    <a
                      className={`mega-it ${v.act.ai ?? ''}`}
                      href="https://bellhop.vn/san-pham/bellhop-ai-concierge"
                    >
                      <span className="tile t-orange">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z"
                            style={{
                              fill: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: '1.8',
                              strokeLinejoin: 'round',
                            }}
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <b>AI Concierge</b>
                        <span>{isEn ? 'AI assistant for guest inquiries' : 'Trợ lý AI trả lời khách'}</span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-col">
                    <h4>{isEn ? 'Payments & Accounting' : 'Thanh toán & Kế toán'}</h4>
                    <a className={`mega-it ${v.act.payment ?? ''}`} href="/san-pham/bellhop-payment">
                      <span className="tile t-sky">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="3"
                            style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: '2' }}
                          ></rect>
                          <path
                            d="M3 10h18M7 15h4"
                            style={{
                              fill: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: '2',
                              strokeLinecap: 'round',
                            }}
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop Payment</b>
                        <span>
                          {isEn
                            ? 'Online payment acceptance for properties'
                            : 'Nhận thanh toán online cho cơ sở'}
                        </span>
                      </div>
                    </a>
                    <a
                      className={`mega-it ${v.act.finance ?? ''}`}
                      href="https://bellhop.vn/san-pham/bellhop-finance"
                    >
                      <span className="tile t-navy">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M5 20V10M12 20V4M19 20v-7"
                            style={{
                              fill: 'none',
                              stroke: '#FFFFFF',
                              strokeWidth: '2.4',
                              strokeLinecap: 'round',
                            }}
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop Finance</b>
                        <span>
                          {isEn
                            ? 'Sync financial data to accounting software'
                            : 'Đồng bộ dữ liệu sang phần mềm kế toán'}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {Boolean(v.open.m) && (
              <div className="mnav">
                <div className="mnav-lang">
                  <span>{isEn ? 'Language:' : 'Ngôn ngữ:'}</span>
                  <div className="mnav-lang-btns">
                    <button
                      type="button"
                      className={`mnav-lang-btn ${!isEn ? 'on' : ''}`}
                      onClick={() => this.setLang('vi')}
                    >
                      <FlagVN /> Tiếng Việt
                    </button>
                    <button
                      type="button"
                      className={`mnav-lang-btn ${isEn ? 'on' : ''}`}
                      onClick={() => this.setLang('en')}
                    >
                      <FlagEN /> English
                    </button>
                  </div>
                </div>
                <details open={true}>
                  <summary>{isEn ? 'Products' : 'Sản phẩm'}</summary>
                  <a href="/#tong-quan">{isEn ? 'Platform Overview' : 'Tổng quan nền tảng'}</a>
                  <a href="https://bellhop.vn/san-pham/bellhop-pms">Bellhop PMS</a>
                  <a href="https://bellhop.vn/san-pham/bellhop-booking-engine">Booking Engine</a>
                  <a href="https://bellhop.vn/san-pham/bellhop-cms">Bellhop CMS</a>
                  <a href="https://bellhop.vn/san-pham/bellhop-website">Bellhop Website</a>
                  <a href="https://bellhop.vn/san-pham/bellhop-message">Bellhop Message</a>
                  <a href="https://bellhop.vn/san-pham/bellhop-ai-concierge">AI Concierge</a>
                  <a href="/san-pham/bellhop-payment">Bellhop Payment</a>
                  <a href="https://bellhop.vn/san-pham/bellhop-finance">Bellhop Finance</a>
                </details>
                <details>
                  <summary>{isEn ? 'Solutions' : 'Giải pháp'}</summary>
                  <a href="/giai-phap/khach-san">{isEn ? 'Hotels' : 'Khách sạn'}</a>
                  <a href="/giai-phap/homestay-villa">Homestay &amp; Villa</a>
                  <a href="/giai-phap/chuoi-luu-tru">{isEn ? 'Hotel Chains' : 'Chuỗi lưu trú'}</a>
                </details>
                <a href="/tin-tuc">{isEn ? 'News' : 'Tin tức'}</a>
                <a href="/bang-gia">{isEn ? 'Pricing' : 'Bảng giá'}</a>
                <a href="/gioi-thieu">{isEn ? 'About Us' : 'Về chúng tôi'}</a>
                <a href="https://app.bellhop.biz/" target="_blank" rel="noopener noreferrer">
                  {isEn ? 'Sign in' : 'Đăng nhập'}
                </a>
                <a
                  className="btn btn-primary"
                  href="/#dang-ky"
                  style={{ marginTop: '16px', borderBottom: '0' }}
                >
                  {isEn ? 'Free Trial' : 'Dùng thử'}
                </a>
              </div>
            )}
          </header>
        </div>
      </>
    );
  }
}
