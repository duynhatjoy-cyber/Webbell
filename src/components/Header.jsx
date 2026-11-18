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
                      <span className="tile tile-soft">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 4.2v1.6M8.2 5.5l1 1.3M15.8 5.5l-1 1.3"
                            fill="none"
                            stroke="#5FB9C2"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10.2 9.2h3.6"
                            fill="none"
                            stroke="#2E9AA5"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          <path
                            d="M6.8 16a5.2 5.2 0 0 1 10.4 0v.8H6.8V16Z"
                            fill="#122745"
                            stroke="#122745"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 18.2h14"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
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
                      <span className="tile tile-soft">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <rect x="4.5" y="5.5" width="15" height="4.2" rx="1.5" fill="#A6E1E7" />
                          <rect
                            x="4.5"
                            y="5.5"
                            width="15"
                            height="14"
                            rx="2.5"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.7"
                          />
                          <path
                            d="M4.5 9.8h15M8.5 3.8v3M15.5 3.8v3"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9.2 14.5l2 2 3.8-3.8"
                            fill="none"
                            stroke="#2E9AA5"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop Booking Engine</b>
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
                      <span className="tile tile-soft">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 12L7.5 8M12 12L16.5 8M12 12v5.8"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="2.4"
                            fill="#FFFFFF"
                            stroke="#122745"
                            strokeWidth="1.7"
                          />
                          <circle
                            cx="6.8"
                            cy="7.4"
                            r="2.1"
                            fill="#8BE3E8"
                            stroke="#2E9AA5"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="17.2"
                            cy="7.4"
                            r="2.1"
                            fill="#8BE3E8"
                            stroke="#2E9AA5"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="12"
                            cy="18.2"
                            r="2.1"
                            fill="#8BE3E8"
                            stroke="#2E9AA5"
                            strokeWidth="1.5"
                          />
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
                      <span className="tile tile-soft">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <rect
                            x="3.5"
                            y="5"
                            width="17"
                            height="14"
                            rx="2.5"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.7"
                          />
                          <path
                            d="M3.5 9h17"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.6"
                          />
                          <circle cx="6.2" cy="7" r="0.8" fill="#122745" />
                          <circle cx="8.5" cy="7" r="0.8" fill="#122745" />
                          <rect x="12.5" y="11.2" width="5.2" height="5.2" rx="1" fill="#5FB9C2" />
                          <path
                            d="M6.2 12.2h4.2M6.2 15.2h4.2"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
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
                      <span className="tile tile-soft">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.5 9.2h7.8a1.8 1.8 0 0 1 1.8 1.8v5a1.8 1.8 0 0 1-1.8 1.8h-2l-2.4 2.1v-2.1h-3.4a1.8 1.8 0 0 1-1.8-1.8v-5a1.8 1.8 0 0 1 1.8-1.8Z"
                            fill="#8BE3E8"
                            stroke="#2E9AA5"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.5 5.5h9.2a1.8 1.8 0 0 1 1.8 1.8v5.2a1.8 1.8 0 0 1-1.8 1.8H9.2l-2.8 2.4v-2.4h-.9a1.8 1.8 0 0 1-1.8-1.8V7.3a1.8 1.8 0 0 1 1.8-1.8Z"
                            fill="#FFFFFF"
                            stroke="#122745"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                          />
                          <circle cx="8.2" cy="9.9" r="0.9" fill="#122745" />
                          <circle cx="10.8" cy="9.9" r="0.9" fill="#122745" />
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
                      <span className="tile tile-soft">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M5.2 5.2h13.6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6.6l-3.8 3v-3H5.2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 7.5l1.1 2.6 2.6 1.1-2.6 1.1-1.1 2.6-1.1-2.6-2.6-1.1 2.6-1.1L12 7.5Z"
                            fill="#5FB9C2"
                            stroke="#2E9AA5"
                            strokeWidth="0.8"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop AI Concierge</b>
                        <span>{isEn ? 'AI assistant for guest inquiries' : 'Trợ lý AI trả lời khách'}</span>
                      </div>
                    </a>
                  </div>
                  <div className="mega-col">
                    <h4>{isEn ? 'Payments & Accounting' : 'Thanh toán & Kế toán'}</h4>
                    <a className={`mega-it ${v.act.payment ?? ''}`} href="/san-pham/bellhop-payment">
                      <span className="tile tile-soft">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <rect
                            x="3.5"
                            y="5.5"
                            width="17"
                            height="13"
                            rx="2.5"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.7"
                          />
                          <path
                            d="M3.5 9.5h17"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.8"
                          />
                          <rect x="6.5" y="12.5" width="4.5" height="3" rx="0.8" fill="#5FB9C2" />
                          <path
                            d="M13.5 14h4"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <b>Bellhop Payment</b>
                        <span>
                          {isEn ? 'Online payments' : 'Thanh toán online'}
                        </span>
                      </div>
                    </a>
                    <a
                      className={`mega-it ${v.act.finance ?? ''}`}
                      href="https://bellhop.vn/san-pham/bellhop-finance"
                    >
                      <span className="tile tile-soft">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M6.5 3.8h7.2l3.8 3.8v11.6a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5 19.2V5.3a1.5 1.5 0 0 1 1.5-1.5Z"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.7"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.5 3.8v4h4"
                            fill="none"
                            stroke="#122745"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                          <rect x="7.8" y="13.5" width="2" height="3.8" rx="0.5" fill="#5FB9C2" />
                          <rect x="10.8" y="11.5" width="2" height="5.8" rx="0.5" fill="#2E9AA5" />
                          <rect x="13.8" y="9.8" width="2" height="7.5" rx="0.5" fill="#122745" />
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
                <details open={true}>
                  <summary>
                    <span>{isEn ? 'Products' : 'Sản phẩm'}</span>
                    <span>+</span>
                  </summary>
                  <a href="/#tong-quan">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="4" y="9" width="5.5" height="6" rx="1.5" fill="#8BE3E8" stroke="#122745" strokeWidth="1.6" />
                        <rect x="14.5" y="9" width="5.5" height="6" rx="1.5" fill="#FFFFFF" stroke="#122745" strokeWidth="1.6" />
                        <path d="M9.5 12h5" stroke="#2E9AA5" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>{isEn ? 'Platform Overview' : 'Tổng quan nền tảng'}</span>
                  </a>
                  <a href="https://bellhop.vn/san-pham/bellhop-pms">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 4.2v1.6M8.2 5.5l1 1.3M15.8 5.5l-1 1.3" fill="none" stroke="#5FB9C2" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M10.2 9.2h3.6" fill="none" stroke="#2E9AA5" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M6.8 16a5.2 5.2 0 0 1 10.4 0v.8H6.8V16Z" fill="#122745" stroke="#122745" strokeWidth="1.2" strokeLinejoin="round" />
                        <path d="M5 18.2h14" fill="none" stroke="#122745" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>Bellhop PMS</span>
                  </a>
                  <a href="https://bellhop.vn/san-pham/bellhop-booking-engine">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="4.5" y="5.5" width="15" height="4.2" rx="1.5" fill="#A6E1E7" />
                        <rect x="4.5" y="5.5" width="15" height="14" rx="2.5" fill="none" stroke="#122745" strokeWidth="1.7" />
                        <path d="M4.5 9.8h15M8.5 3.8v3M15.5 3.8v3" fill="none" stroke="#122745" strokeWidth="1.7" strokeLinecap="round" />
                        <path d="M9.2 14.5l2 2 3.8-3.8" fill="none" stroke="#2E9AA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Bellhop Booking Engine</span>
                  </a>
                  <a href="https://bellhop.vn/san-pham/bellhop-cms">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 12L7.5 8M12 12L16.5 8M12 12v5.8" fill="none" stroke="#122745" strokeWidth="1.7" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="2.4" fill="#FFFFFF" stroke="#122745" strokeWidth="1.7" />
                        <circle cx="6.8" cy="7.4" r="2.1" fill="#8BE3E8" stroke="#2E9AA5" strokeWidth="1.5" />
                        <circle cx="17.2" cy="7.4" r="2.1" fill="#8BE3E8" stroke="#2E9AA5" strokeWidth="1.5" />
                        <circle cx="12" cy="18.2" r="2.1" fill="#8BE3E8" stroke="#2E9AA5" strokeWidth="1.5" />
                      </svg>
                    </span>
                    <span>Bellhop CMS</span>
                  </a>
                  <a href="https://bellhop.vn/san-pham/bellhop-website">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="#122745" strokeWidth="1.7" />
                        <path d="M3.5 9h17" fill="none" stroke="#122745" strokeWidth="1.6" />
                        <circle cx="6.2" cy="7" r="0.8" fill="#122745" />
                        <circle cx="8.5" cy="7" r="0.8" fill="#122745" />
                        <rect x="12.5" y="11.2" width="5.2" height="5.2" rx="1" fill="#5FB9C2" />
                        <path d="M6.2 12.2h4.2M6.2 15.2h4.2" fill="none" stroke="#122745" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>Bellhop Website</span>
                  </a>
                  <a href="https://bellhop.vn/san-pham/bellhop-message">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M10.5 9.2h7.8a1.8 1.8 0 0 1 1.8 1.8v5a1.8 1.8 0 0 1-1.8 1.8h-2l-2.4 2.1v-2.1h-3.4a1.8 1.8 0 0 1-1.8-1.8v-5a1.8 1.8 0 0 1 1.8-1.8Z" fill="#8BE3E8" stroke="#2E9AA5" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M5.5 5.5h9.2a1.8 1.8 0 0 1 1.8 1.8v5.2a1.8 1.8 0 0 1-1.8 1.8H9.2l-2.8 2.4v-2.4h-.9a1.8 1.8 0 0 1-1.8-1.8V7.3a1.8 1.8 0 0 1 1.8-1.8Z" fill="#FFFFFF" stroke="#122745" strokeWidth="1.7" strokeLinejoin="round" />
                        <circle cx="8.2" cy="9.9" r="0.9" fill="#122745" />
                        <circle cx="10.8" cy="9.9" r="0.9" fill="#122745" />
                      </svg>
                    </span>
                    <span>Bellhop Message</span>
                  </a>
                  <a href="https://bellhop.vn/san-pham/bellhop-ai-concierge">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5.2 5.2h13.6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6.6l-3.8 3v-3H5.2a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" fill="none" stroke="#122745" strokeWidth="1.7" strokeLinejoin="round" />
                        <path d="M12 7.5l1.1 2.6 2.6 1.1-2.6 1.1-1.1 2.6-1.1-2.6-2.6-1.1 2.6-1.1L12 7.5Z" fill="#5FB9C2" stroke="#2E9AA5" strokeWidth="0.8" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>Bellhop AI Concierge</span>
                  </a>
                  <a href="/san-pham/bellhop-payment">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" fill="none" stroke="#122745" strokeWidth="1.7" />
                        <path d="M3.5 9.5h17" fill="none" stroke="#122745" strokeWidth="1.8" />
                        <rect x="6.5" y="12.5" width="4.5" height="3" rx="0.8" fill="#5FB9C2" />
                        <path d="M13.5 14h4" fill="none" stroke="#122745" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>Bellhop Payment</span>
                  </a>
                  <a href="https://bellhop.vn/san-pham/bellhop-finance">
                    <span className="tile tile-soft">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.5 3.8h7.2l3.8 3.8v11.6a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5 19.2V5.3a1.5 1.5 0 0 1 1.5-1.5Z" fill="none" stroke="#122745" strokeWidth="1.7" strokeLinejoin="round" />
                        <path d="M13.5 3.8v4h4" fill="none" stroke="#122745" strokeWidth="1.6" strokeLinejoin="round" />
                        <rect x="7.8" y="13.5" width="2" height="3.8" rx="0.5" fill="#5FB9C2" />
                        <rect x="10.8" y="11.5" width="2" height="5.8" rx="0.5" fill="#2E9AA5" />
                        <rect x="13.8" y="9.8" width="2" height="7.5" rx="0.5" fill="#122745" />
                      </svg>
                    </span>
                    <span>Bellhop Finance</span>
                  </a>
                </details>
                <details>
                  <summary>
                    <span>{isEn ? 'Solutions' : 'Giải pháp'}</span>
                    <span>+</span>
                  </summary>
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
                  style={{ marginTop: '16px', borderBottom: '0', justifyContent: 'center' }}
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
