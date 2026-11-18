import React from 'react';
import { DCLogic } from '../utils/DCLogic';

export default class LeadForm extends DCLogic {
  constructor(p) {
    super(p);
    this.state = {
      f: {
        name: '',
        phone: '',
        email: '',
        org: '',
        type: p.defaultType || '',
        rooms: '',
        consent: false,
      },
      prods: p.defaultProds || [],
      err: {},
      sent: false,
    };
  }

  renderVals() {
    const s = this.state;
    const f = s.f;
    const setF = (k, val) =>
      this.setState({ f: Object.assign({}, this.state.f, { [k]: val }) });
    const on = {};
    ['name', 'phone', 'email', 'org', 'type', 'rooms'].forEach((k) => {
      on[k] = (e) => setF(k, e.target.value);
    });
    on.consent = (e) => setF('consent', e.target.checked);

    const PR = [
      'Bellhop PMS',
      'Booking Engine',
      'CMS',
      'Website',
      'Message',
      'AI Concierge',
      'Payment',
      'Finance',
    ];
    const prods = PR.map((label) => {
      const sel = s.prods.indexOf(label) >= 0;
      return {
        label,
        cls: sel ? 'on' : '',
        pressed: sel ? 'true' : 'false',
        toggle: () =>
          this.setState({
            prods: sel
              ? this.state.prods.filter((x) => x !== label)
              : this.state.prods.concat([label]),
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

    const form = {
      f,
      on,
      prods,
      submit,
      err: s.err,
      nameCls: s.err.name ? 'err' : '',
      phoneCls: s.err.phone ? 'err' : '',
      sent: s.sent,
      notSent: !s.sent,
      reset: () => this.setState({ sent: false }),
    };

    return { form };
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <div className="lead2">
        <div className="stack" style={{ gap: '22px' }}>
          <span className="kick lt" style={{ color: '#8BE3E8' }}>
            Bắt đầu cùng Bellhop
          </span>
          <h2 className="h2">Sẵn sàng vận hành gọn hơn?</h2>
          <p className="sub">
            Để lại thông tin, đội Bellhop sẽ liên hệ tư vấn và demo theo đúng mô hình cơ sở của bạn.
          </p>
          <div className="ct">
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
                  style={{
                    fill: 'none',
                    stroke: '#8BE3E8',
                    strokeWidth: '2',
                    strokeLinejoin: 'round',
                  }}
                ></path>
              </svg>
              Hotline/Zalo: <b>0972 096 499</b>
            </span>
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  style={{ fill: 'none', stroke: '#8BE3E8', strokeWidth: '2' }}
                ></rect>
                <path
                  d="M3 7l9 6 9-6"
                  style={{ fill: 'none', stroke: '#8BE3E8', strokeWidth: '2' }}
                ></path>
              </svg>
              Email: <b>admin@bellhop.vn</b>
            </span>
          </div>
        </div>
        <form className="lform" onSubmit={v.form.submit} noValidate="novalidate">
          {Boolean(v.form.sent) && (
            <div
              className="stack center"
              style={{ gap: '14px', padding: '40px 8px', alignItems: 'center' }}
            >
              <span
                className="seg-ic"
                style={{
                  width: '56px',
                  height: '56px',
                  background: '#E6F6F7',
                  color: '#1F7A84',
                }}
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
              <p className="p">Đội Bellhop sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
              <button className="btn btn-outline btn-sm" type="button" onClick={v.form.reset}>
                Gửi thông tin khác
              </button>
            </div>
          )}

          {Boolean(v.form.notSent) && (
            <>
              <div className="row" style={{ justifyContent: 'space-between', gap: '12px' }}>
                <h3 className="h3">Đăng ký tư vấn &amp; demo</h3>
                <span className="small" style={{ fontSize: '12px' }}>
                  <span style={{ color: '#C2410C' }}>*</span> bắt buộc
                </span>
              </div>
              <div className="fgrid2">
                <div className="fld">
                  <label htmlFor="f-name">
                    Họ tên <span className="req">*</span>
                  </label>
                  <input
                    id="f-name"
                    className={`inp2 ${v.form.nameCls ?? ''}`}
                    value={v.form.f.name ?? ''}
                    onChange={v.form.on.name}
                    autoComplete="name"
                    placeholder="Nguyễn Văn A"
                  />
                  {Boolean(v.form.err.name) && (
                    <span className="ferr2">Vui lòng nhập họ tên.</span>
                  )}
                </div>
                <div className="fld">
                  <label htmlFor="f-phone">
                    Số điện thoại/Zalo <span className="req">*</span>
                  </label>
                  <input
                    id="f-phone"
                    className={`inp2 ${v.form.phoneCls ?? ''}`}
                    value={v.form.f.phone ?? ''}
                    onChange={v.form.on.phone}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="09xx xxx xxx"
                  />
                  {Boolean(v.form.err.phone) && (
                    <span className="ferr2">Số điện thoại chưa đúng (vd: 0912 345 678).</span>
                  )}
                </div>
                <div className="fld">
                  <label htmlFor="f-email">Email</label>
                  <input
                    id="f-email"
                    className="inp2"
                    value={v.form.f.email ?? ''}
                    onChange={v.form.on.email}
                    type="email"
                    autoComplete="email"
                    placeholder="ban@khachsan.vn"
                  />
                </div>
                <div className="fld">
                  <label htmlFor="f-org">Tên cơ sở</label>
                  <input
                    id="f-org"
                    className="inp2"
                    value={v.form.f.org ?? ''}
                    onChange={v.form.on.org}
                    placeholder="Khách sạn …"
                  />
                </div>
                <div className="fld">
                  <label htmlFor="f-type">Loại hình</label>
                  <select
                    id="f-type"
                    className="inp2"
                    value={v.form.f.type ?? ''}
                    onChange={v.form.on.type}
                  >
                    <option value="">Chọn loại hình</option>
                    <option>Khách sạn</option>
                    <option>Homestay &amp; Villa</option>
                    <option>Chuỗi lưu trú</option>
                  </select>
                </div>
                <div className="fld">
                  <label htmlFor="f-rooms">Số phòng</label>
                  <select
                    id="f-rooms"
                    className="inp2"
                    value={v.form.f.rooms ?? ''}
                    onChange={v.form.on.rooms}
                  >
                    <option value="">Chọn số phòng</option>
                    <option>Dưới 10</option>
                    <option>10–30</option>
                    <option>31–100</option>
                    <option>Trên 100</option>
                  </select>
                </div>
              </div>
              <div className="stack" style={{ gap: '8px' }}>
                <span className="flab">
                  Sản phẩm quan tâm{' '}
                  <span className="small" style={{ fontSize: '12px', fontWeight: '400' }}>
                    (chọn nhiều)
                  </span>
                </span>
                <div className="row" style={{ gap: '8px', flexWrap: 'wrap' }}>
                  {(v.form.prods || []).map((p, $index) => (
                    <button
                      key={$index}
                      className={`pchip ${p.cls ?? ''}`}
                      type="button"
                      aria-pressed={p.pressed}
                      onClick={p.toggle}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="cons">
                <input
                  type="checkbox"
                  checked={Boolean(v.form.f.consent)}
                  onChange={v.form.on.consent}
                />
                <span>
                  Tôi đồng ý để Bellhop xử lý thông tin trên nhằm liên hệ tư vấn, theo{' '}
                  <a
                    href="/chinh-sach/bao-ve-du-lieu-ca-nhan"
                    style={{ color: '#1450F0', textDecoration: 'underline' }}
                  >
                    Chính sách bảo vệ và xử lý dữ liệu cá nhân
                  </a>
                  .
                </span>
              </label>
              {Boolean(v.form.err.consent) && (
                <span className="ferr2">Vui lòng đồng ý để Bellhop liên hệ tư vấn.</span>
              )}
              <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                Đăng ký ngay <span>→</span>
              </button>
            </>
          )}
        </form>
      </div>
    );
  }
}
