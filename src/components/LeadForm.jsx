import React from 'react';
import { DCLogic } from '../utils/DCLogic';

export default class LeadForm extends DCLogic {
  constructor(p) {
    super(p);
    const pre = p.product ?? '';
    this.state = {
      f: {
        name: '',
        phone: '',
        email: '',
        org: '',
        type: '',
        rooms: '',
        using: '',
        other: '',
        extra: '',
        consent: false,
      },
      prods: pre ? [pre] : [],
      ex: [],
      err: {},
      sent: false,
    };
  }

  renderVals() {
    const s = this.state,
      f = s.f;
    const v = this.props.variant ?? 'navy';
    const marks = this.props.marks ?? true;
    const extra = this.props.extra || null;
    const setF = (k, val) =>
      this.setState({ f: Object.assign({}, this.state.f, { [k]: val }) });
    const on = {};
    ['name', 'phone', 'email', 'org', 'type', 'rooms', 'using', 'other', 'extra'].forEach((k) => {
      on[k] = (e) => setF(k, e.target.value);
    });
    on.consent = (e) => setF('consent', e.target.checked);
    const P = [
      ['pms', 'Bellhop PMS'],
      ['booking', 'Booking Engine'],
      ['cms', 'CMS'],
      ['website', 'Website'],
      ['message', 'Message'],
      ['ai', 'AI Concierge'],
      ['payment', 'Payment'],
      ['finance', 'Finance'],
    ];
    const prods = P.map(([k, label]) => {
      const sel = s.prods.indexOf(k) >= 0;
      return {
        label,
        cls: sel ? 'on' : '',
        pressed: sel ? 'true' : 'false',
        toggle: () =>
          this.setState({
            prods: sel ? this.state.prods.filter((x) => x !== k) : this.state.prods.concat([k]),
          }),
      };
    });
    const extraOpts = (extra && extra.options ? extra.options : []).map((label) => {
      const sel = s.ex.indexOf(label) >= 0;
      return {
        label,
        cls: sel ? 'on' : '',
        pressed: sel ? 'true' : 'false',
        toggle: () =>
          this.setState({
            ex: sel ? this.state.ex.filter((x) => x !== label) : this.state.ex.concat([label]),
          }),
      };
    });
    const submit = (e) => {
      e.preventDefault();
      const ph = (f.phone || '').replace(/[\s.\-]/g, '');
      const err = {
        name: !f.name.trim(),
        phone: !/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(ph),
        consent: !f.consent,
      };
      if (err.name || err.phone || err.consent) {
        this.setState({ err });
        return;
      }
      this.setState({ sent: true, err: {} });
    };
    const err = Object.assign({}, s.err);
    err.nameCls = err.name ? 'err' : '';
    err.phoneCls = err.phone ? 'err' : '';
    const blk = {
      navy: '',
      light: 'lead-light',
      grid: 'lead-grid',
      deep: 'lead-deep',
      chat: 'lead-light',
    }[v];
    const darkSide = v === 'navy' || v === 'deep';
    return {
      markCls: marks ? '' : 'no-marks',
      title: this.props.title ?? 'Sẵn sàng vận hành gọn hơn?',
      desc:
        this.props.desc ??
        'Tự đăng ký dùng miễn phí ngay, hoặc để lại thông tin để đội Bellhop demo theo đúng mô hình của bạn.',
      cta: this.props.cta ?? 'Đặt lịch demo',
      formTitle: this.props.cta ?? 'Đặt lịch demo',
      source: this.props.source ?? '/',
      blkCls: blk,
      cardCls: v === 'chat' ? 'chatwin' : '',
      trialCls: darkSide ? 'btn-teal' : 'btn-primary',
      ghostCls: darkSide ? 'btn-light' : 'btn-outline',
      isChat: v === 'chat',
      f,
      on,
      err,
      prods,
      extraOpts,
      showOther: f.using === 'Phần mềm khác',
      hasExtraChips: !!(extra && extra.type === 'chips'),
      hasExtraText: !!(extra && extra.type === 'text'),
      extraLabel: extra ? extra.label : '',
      extraPh: extra && extra.placeholder ? extra.placeholder : '',
      sent: s.sent,
      notSent: !s.sent,
      submit,
      reset: () => this.setState({ sent: false }),
    };
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <div className={`bh ${v.markCls ?? ''}`} style={{ background: 'transparent' }}>
        <div className={`lead-blk ${v.blkCls ?? ''}`}>
          <div className="stack" style={{ gap: '22px', position: 'relative', zIndex: 1 }}>
            <span className="eyebrow">Bắt đầu cùng Bellhop</span>
            <h2 className="h2">{v.title}</h2>
            <p className="lead" style={{ whiteSpace: 'pre-line' }}>
              {v.desc}
            </p>
            <div className="btns">
              <a className={`btn ${v.trialCls ?? ''} btn-lg`} href="#form">
                Dùng thử miễn phí <span className="arr">→</span>
              </a>
            </div>
            <div className="row wrapx" style={{ gap: '10px', marginTop: '8px' }}>
              <a className={`btn btn-sm ${v.ghostCls ?? ''}`} href="mailto:admin@bellhop.vn">
                Email: admin@bellhop.vn
              </a>
            </div>
          </div>

          <form className={`lead-card ${v.cardCls ?? ''}`} onSubmit={v.submit} noValidate="novalidate">
            {Boolean(v.isChat) && (
              <>
                <div
                  className="chatwin-h"
                  style={{ margin: '-32px -32px 4px', borderRadius: '20px 20px 0 0' }}
                >
                  <img src="/assets/65b75c6994e7813eb4b9d85bb4e2eb6a.png" alt="" />
                  <div>
                    <b>Bellhop</b>
                    <small>Thường phản hồi trong giờ làm việc</small>
                  </div>
                </div>
                <div className="bub bub-in" style={{ maxWidth: '100%' }}>
                  Chào bạn, để lại vài thông tin để đội Bellhop demo đúng với cơ sở của bạn nhé.
                </div>
              </>
            )}

            {Boolean(v.sent) && (
              <div
                className="stack center"
                style={{ gap: '14px', padding: '48px 12px', alignItems: 'center' }}
              >
                <span
                  className="seg-ic"
                  style={{ width: '56px', height: '56px', background: '#E6F6F7', color: '#1F7A84' }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      style={{
                        fill: 'none',
                        stroke: 'currentColor',
                        strokeWidth: '2.4',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                      }}
                    ></path>
                  </svg>
                </span>
                <h3 className="h3">Cảm ơn bạn!</h3>
                <p className="muted">
                  Bellhop sẽ liên hệ trong <span className="ph">2</span> giờ làm việc.
                </p>
                <button className="btn btn-outline btn-sm" type="button" onClick={v.reset}>
                  Gửi thông tin khác
                </button>
              </div>
            )}

            {Boolean(v.notSent) && (
              <>
                <div className="row" style={{ justifyContent: 'space-between', gap: '12px' }}>
                  <h3 className="h3">{v.formTitle}</h3>
                  <span className="xs muted">
                    <span style={{ color: '#b42318' }}>*</span> bắt buộc
                  </span>
                </div>
                <div className="fgrid">
                  <div className="field">
                    <label htmlFor="lf-name">
                      Họ tên <span className="req">*</span>
                    </label>
                    <input
                      id="lf-name"
                      className={`inp ${v.err.nameCls ?? ''}`}
                      value={v.f.name}
                      onChange={v.on.name}
                      autoComplete="name"
                      placeholder="Nguyễn Văn A"
                    />
                    {Boolean(v.err.name) && <span className="ferr">Vui lòng nhập họ tên.</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="lf-phone">
                      Số điện thoại/Zalo <span className="req">*</span>
                    </label>
                    <input
                      id="lf-phone"
                      className={`inp ${v.err.phoneCls ?? ''}`}
                      value={v.f.phone}
                      onChange={v.on.phone}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="09xx xxx xxx"
                    />
                    {Boolean(v.err.phone) && (
                      <span className="ferr">
                        Số điện thoại Việt Nam chưa đúng (vd: 0912 345 678).
                      </span>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="lf-email">Email</label>
                    <input
                      id="lf-email"
                      className="inp"
                      value={v.f.email}
                      onChange={v.on.email}
                      type="email"
                      autoComplete="email"
                      placeholder="ban@khachsan.vn"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="lf-org">Tên cơ sở</label>
                    <input
                      id="lf-org"
                      className="inp"
                      value={v.f.org}
                      onChange={v.on.org}
                      placeholder="Khách sạn …"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="lf-type">Loại hình</label>
                    <select id="lf-type" className="inp" value={v.f.type} onChange={v.on.type}>
                      <option value="">Chọn loại hình</option>
                      <option>Khách sạn</option>
                      <option>Homestay &amp; Villa</option>
                      <option>Chuỗi</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="lf-rooms">Số phòng</label>
                    <select id="lf-rooms" className="inp" value={v.f.rooms} onChange={v.on.rooms}>
                      <option value="">Chọn số phòng</option>
                      <option>Dưới 10</option>
                      <option>10–30</option>
                      <option>31–100</option>
                      <option>Trên 100</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="lf-using">Đang quản lý bằng</label>
                  <select id="lf-using" className="inp" value={v.f.using} onChange={v.on.using}>
                    <option value="">Chọn cách quản lý hiện tại</option>
                    <option>Sổ tay/Excel</option>
                    <option>Phần mềm khác</option>
                  </select>
                </div>
                {Boolean(v.showOther) && (
                  <div className="field">
                    <label htmlFor="lf-other">Tên phần mềm đang dùng</label>
                    <input id="lf-other" className="inp" value={v.f.other} onChange={v.on.other} />
                  </div>
                )}
                <div className="stack" style={{ gap: '8px' }}>
                  <span className="flabel">
                    Sản phẩm quan tâm{' '}
                    <span className="xs muted" style={{ fontWeight: 400 }}>
                      (chọn nhiều)
                    </span>
                  </span>
                  <div className="chips">
                    {(v.prods || []).map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`pick ${p.cls ?? ''}`}
                        aria-pressed={p.pressed}
                        onClick={p.toggle}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                {Boolean(v.hasExtraChips) && (
                  <div className="stack" style={{ gap: '8px' }}>
                    <span className="flabel">{v.extraLabel}</span>
                    <div className="chips">
                      {(v.extraOpts || []).map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`pick ${p.cls ?? ''}`}
                          aria-pressed={p.pressed}
                          onClick={p.toggle}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {Boolean(v.hasExtraText) && (
                  <div className="field">
                    <label htmlFor="lf-extra">{v.extraLabel}</label>
                    <input
                      id="lf-extra"
                      className="inp"
                      value={v.f.extra}
                      onChange={v.on.extra}
                      placeholder={v.extraPh}
                    />
                  </div>
                )}
                <label className="consent">
                  <input type="checkbox" checked={Boolean(v.f.consent)} onChange={v.on.consent} />
                  <span>
                    Tôi đồng ý để Bellhop xử lý thông tin trên nhằm liên hệ tư vấn, theo{' '}
                    <a
                      href="/chinh-sach/bao-ve-du-lieu-ca-nhan"
                      style={{ color: '#1450F0', textDecoration: 'underline' }}
                    >
                      Chính sách xử lý dữ liệu cá nhân
                    </a>
                    .
                  </span>
                </label>
                {Boolean(v.err.consent) && (
                  <span className="ferr">Vui lòng đồng ý để Bellhop liên hệ tư vấn.</span>
                )}
                <button className="btn btn-primary btn-lg btn-block" type="submit">
                  {v.cta} <span className="arr">→</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    );
  }
}
