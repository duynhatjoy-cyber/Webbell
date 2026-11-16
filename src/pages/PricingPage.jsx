import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PricingFAQ from '../components/PricingFAQ';
import LeadForm from '../components/LeadForm';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default class PricingPage extends DCLogic {
  constructor(p) {
    super(p);
    this.state = {
      cycle: 'yearly',
      calcRooms: 20,
      calcPlan: 'pro',
      calcPeriod: 12,
    };
  }

  componentDidMount() {
    document.title = 'Bảng báo giá phần mềm quản lý khách sạn Bellhop – Chi phí minh bạch, tối ưu';
  }

  renderVals() {
    const marks = this.props.reviewMarks ?? true;
    const isYear = this.state.cycle === 'yearly';

    // Pricing Cards Prices
    const priceStd = isYear ? '15.000' : '18.000';
    const cycleStdSub = isYear ? 'Tiết kiệm 20% khi đóng cả năm' : 'Thanh toán linh hoạt theo tháng';

    const pricePro = isYear ? '39.000' : '48.000';
    const cycleProSub = isYear ? 'Tiết kiệm 20% khi đóng cả năm' : 'Thanh toán linh hoạt theo tháng';

    const priceEnt = isYear ? '55.000' : '66.000';
    const cycleEntSub = isYear ? 'Tiết kiệm 20% khi đóng cả năm' : 'Thanh toán linh hoạt theo tháng';

    // Calculator calculations
    const rooms = Math.max(10, parseInt(this.state.calcRooms, 10) || 10);
    const plan = this.state.calcPlan;
    const period = this.state.calcPeriod; // 1, 12, 24

    // Rates per room per month
    let monthlyRate = 18000;
    let yearlyRate = 15000;
    let planName = 'Cơ bản';

    if (plan === 'pro') {
      monthlyRate = 48000;
      yearlyRate = 39000;
      planName = 'Nâng cao (Bán phòng OTA)';
    } else if (plan === 'enterprise') {
      monthlyRate = 66000;
      yearlyRate = 55000;
      planName = 'Cao cấp (All-in-one)';
    }

    const effectiveRate = period === 1 ? monthlyRate : yearlyRate;
    const totalCost = rooms * effectiveRate * period;
    const costWithoutDiscount = rooms * monthlyRate * period;
    const savings = costWithoutDiscount - totalCost;

    const formatNum = (num) => (num || 0).toLocaleString('vi-VN');

    let periodText = '12 tháng (1 năm)';
    if (period === 1) periodText = '1 tháng';
    else if (period === 24) periodText = '24 tháng (2 năm)';

    return {
      markCls: marks ? '' : 'no-marks',
      marks,
      cycleYearClass: isYear ? 'active' : '',
      cycleMonthClass: !isYear ? 'active' : '',
      priceStd,
      cycleStdSub,
      pricePro,
      cycleProSub,
      priceEnt,
      cycleEntSub,
      setYearly: () => this.setState({ cycle: 'yearly' }),
      setMonthly: () => this.setState({ cycle: 'monthly' }),

      // Calculator bindings
      calcRooms: rooms,
      changeRooms: (e) => this.setState({ calcRooms: parseInt(e.target.value, 10) || 10 }),
      calcPlanName: planName,
      calcPlanStdClass: plan === 'std' ? 'selected' : '',
      calcPlanProClass: plan === 'pro' ? 'selected' : '',
      calcPlanEntClass: plan === 'enterprise' ? 'selected' : '',
      setCalcStd: () => this.setState({ calcPlan: 'std' }),
      setCalcPro: () => this.setState({ calcPlan: 'pro' }),
      setCalcEnt: () => this.setState({ calcPlan: 'enterprise' }),

      calcPeriod1Class: period === 1 ? 'selected' : '',
      calcPeriod12Class: period === 12 ? 'selected' : '',
      calcPeriod24Class: period === 24 ? 'selected' : '',
      setCalcPeriod1: () => this.setState({ calcPeriod: 1 }),
      setCalcPeriod12: () => this.setState({ calcPeriod: 12 }),
      setCalcPeriod24: () => this.setState({ calcPeriod: 24 }),

      calcPeriodText: periodText,
      calcRatePerRoom: formatNum(effectiveRate),
      calcTotalCost: formatNum(totalCost),
      hasSavings: savings > 0,
      calcSavingAmount: formatNum(savings),

      extra: {
        label: 'Gói giải pháp bạn quan tâm & Số phòng ước tính',
        type: 'text',
        placeholder: `VD: ${planName} · ${rooms} phòng`,
      },
    };
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <div className={`bh ${v.markCls ?? ''}`}>
        <Header active="pricing" startOpen={false} />

        <div className="wrap" style={{ paddingTop: '20px' }}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Trang chủ</a>›<b>Bảng giá</b>
          </nav>
        </div>

        {/* HERO PRICING */}
        <section className="pricing-hero">
          <div className="wrap">
            <div className="pricing-hero-head">
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                BẢNG BÁO GIÁ GIẢI PHÁP KHÁCH SẠN BELLHOP
              </span>
              <h1 className="h1" style={{ fontSize: '44px', lineHeight: 1.25 }}>
                Chi phí minh bạch, linh hoạt theo mô hình lưu trú
              </h1>
              <p className="lead" style={{ margin: 0, fontSize: '17px' }}>
                Khởi đầu hoàn toàn miễn phí cho vận hành lễ tân cơ bản; nâng cấp kết nối OTA, quản
                trị đa kênh và tích hợp tài chính khi cơ sở sẵn sàng bứt phá doanh thu.
              </p>

              {/* BILLING TOGGLE */}
              <div className="pricing-cycle-switch">
                <button
                  type="button"
                  className={`cycle-btn ${v.cycleYearClass ?? ''}`}
                  onClick={v.setYearly}
                >
                  Thanh toán theo năm
                  <span className="cycle-badge">Tiết kiệm 20%</span>
                </button>
                <button
                  type="button"
                  className={`cycle-btn ${v.cycleMonthClass ?? ''}`}
                  onClick={v.setMonthly}
                >
                  Thanh toán theo tháng
                </button>
              </div>
            </div>

            {/* 4 PRICING CARDS */}
            <div className="pricing-grid">
              {/* FREE TIER */}
              <div className="pricing-card">
                <span className="card-target">Dùng thử &amp; Cơ sở nhỏ</span>
                <h2 className="card-name">Miễn phí</h2>
                <p className="card-desc">
                  Dành cho homestay, hostel, nhà nghỉ nhỏ quản lý cơ bản tại quầy.
                </p>
                <div className="card-price-wrap">
                  <div className="card-price">
                    <span className="num">0</span>
                    <span className="curr">đ</span>
                    <span className="unit">/ tháng</span>
                  </div>
                  <div className="card-price-sub">Miễn phí trọn đời</div>
                  <div className="card-note">Không giới hạn người dùng</div>
                </div>
                <ul className="card-features">
                  <li className="strong">
                    <CheckIcon />
                    Sơ đồ phòng trực quan thời gian thực
                  </li>
                  <li>
                    <CheckIcon />
                    Check-in, Check-out, đặt cọc
                  </li>
                  <li>
                    <CheckIcon />
                    Bàn giao ca &amp; thu chi tiền mặt
                  </li>
                  <li>
                    <CheckIcon />
                    <span>
                      <b>Không giới hạn</b> tài khoản nhân viên
                    </span>
                  </li>
                  <li>
                    <CheckIcon />
                    Mobile App quản lý từ xa
                  </li>
                  <li>
                    <CheckIcon />
                    Hỗ trợ tài liệu &amp; video hướng dẫn
                  </li>
                </ul>
                <a
                  className="btn btn-outline btn-block"
                  href="https://app.bellhop.biz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dùng miễn phí ngay
                </a>
              </div>

              {/* STANDARD TIER */}
              <div className="pricing-card">
                <span className="card-target">1–2 sao &amp; Nghỉ giờ</span>
                <h2 className="card-name">Cơ bản</h2>
                <p className="card-desc">
                  Vận hành khách sạn chuyên nghiệp, buồng phòng, minibar và khóa từ.
                </p>
                <div className="card-price-wrap">
                  <div className="card-price">
                    <span className="num">{v.priceStd}</span>
                    <span className="curr">đ</span>
                    <span className="unit">/ phòng / tháng</span>
                  </div>
                  <div className="card-price-sub">{v.cycleStdSub}</div>
                  <div className="card-note">Tối thiểu 10 phòng / cơ sở</div>
                </div>
                <ul className="card-features">
                  <li className="strong">
                    <CheckIcon />
                    Toàn bộ tính năng gói Miễn Phí
                  </li>
                  <li>
                    <CheckIcon />
                    Quản lý buồng phòng, dọn phòng
                  </li>
                  <li>
                    <CheckIcon />
                    Kho hàng hóa, F&amp;B, minibar tại phòng
                  </li>
                  <li>
                    <CheckIcon />
                    Chính sách giá giờ, đêm, ngày, tuần
                  </li>
                  <li>
                    <CheckIcon />
                    Tích hợp khóa thẻ từ ngoại vi
                  </li>
                  <li>
                    <CheckIcon />
                    Báo cáo doanh thu &amp; ca trực chuyên sâu
                  </li>
                  <li>
                    <CheckIcon />
                    Hỗ trợ Hotline &amp; Zalo 24/7
                  </li>
                </ul>
                <a className="btn btn-outline btn-block" href="#form">
                  Đăng ký gói Cơ Bản
                </a>
              </div>

              {/* PRO TIER (POPULAR) */}
              <div className="pricing-card popular">
                <div className="popular-ribbon">Phổ biến nhất · Bán phòng OTA</div>
                <span className="card-target">2–3 sao &amp; Đa kênh</span>
                <h2 className="card-name" style={{ color: '#1f7a84' }}>
                  Nâng cao
                </h2>
                <p className="card-desc">
                  Tự động hóa bán phòng OTA, đồng bộ 2 chiều và chống overbooking 100%.
                </p>
                <div className="card-price-wrap">
                  <div className="card-price">
                    <span className="num" style={{ color: '#1f7a84' }}>
                      {v.pricePro}
                    </span>
                    <span className="curr">đ</span>
                    <span className="unit">/ phòng / tháng</span>
                  </div>
                  <div className="card-price-sub">{v.cycleProSub}</div>
                  <div className="card-note">Tối thiểu 10 phòng / cơ sở</div>
                </div>
                <ul className="card-features">
                  <li className="strong">
                    <CheckIcon />
                    Toàn bộ tính năng gói Cơ Bản
                  </li>
                  <li className="strong">
                    <CheckIcon />
                    Quản lý kênh OTA (Bellhop CMS)
                  </li>
                  <li>
                    <CheckIcon />
                    Kết nối 50+ OTA: Booking, Agoda, Traveloka...
                  </li>
                  <li>
                    <CheckIcon />
                    <b>Đồng bộ 2 chiều tự động trong 2s</b>
                  </li>
                  <li>
                    <CheckIcon />
                    <b>Chống Overbooking (trùng phòng) 100%</b>
                  </li>
                  <li>
                    <CheckIcon />
                    Quy tắc định giá linh động theo mùa
                  </li>
                  <li>
                    <CheckIcon />
                    Chuyên viên đồng hành kết nối OTA
                  </li>
                </ul>
                <a className="btn btn-primary btn-block" href="#form">
                  Dùng thử 7 ngày miễn phí
                </a>
              </div>

              {/* ENTERPRISE TIER */}
              <div className="pricing-card">
                <span className="card-target">3–5 sao &amp; Chuỗi</span>
                <h2 className="card-name">Cao cấp</h2>
                <p className="card-desc">
                  Giải pháp all-in-one toàn diện: Booking Engine, Payment, Finance &amp; AI.
                </p>
                <div className="card-price-wrap">
                  <div className="card-price">
                    <span className="num">{v.priceEnt}</span>
                    <span className="curr">đ</span>
                    <span className="unit">/ phòng / tháng</span>
                  </div>
                  <div className="card-price-sub">{v.cycleEntSub}</div>
                  <div className="card-note">Tối thiểu 10 phòng / cơ sở</div>
                </div>
                <ul className="card-features">
                  <li className="strong">
                    <CheckIcon />
                    Toàn bộ tính năng gói Nâng Cao
                  </li>
                  <li>
                    <CheckIcon />
                    <b>Booking Engine website &amp; Fanpage</b>
                  </li>
                  <li>
                    <CheckIcon />
                    <b>Cổng thanh toán online (Bellhop Payment)</b>
                  </li>
                  <li>
                    <CheckIcon />
                    <b>Đồng bộ kế toán MISA (Bellhop Finance)</b>
                  </li>
                  <li>
                    <CheckIcon />
                    Trợ lý AI Concierge phản hồi 24/7
                  </li>
                  <li>
                    <CheckIcon />
                    Quản trị chuỗi nhiều chi nhánh
                  </li>
                  <li>
                    <CheckIcon />
                    Đào tạo trực tiếp &amp; SLA cam kết
                  </li>
                </ul>
                <a className="btn btn-outline btn-block" href="#form">
                  Nhận tư vấn giải pháp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE ESTIMATE CALCULATOR */}
        <section className="calc-sec" id="tinh-phi">
          <div className="wrap">
            <div className="head center" style={{ marginBottom: '36px' }}>
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                CÔNG CỤ TÍNH PHÍ THỰC TẾ
              </span>
              <h2 className="h2" style={{ fontWeight: 800, textAlign: 'center' }}>
                Dự toán chi phí theo quy mô khách sạn của bạn
              </h2>
              <p className="lead" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
                Kéo chọn số lượng phòng và gói giải pháp phù hợp để nhận ngay bảng dự toán chi phí
                chi tiết.
              </p>
            </div>

            <div className="calc-box">
              <div className="calc-left">
                {/* ROOM SLIDER */}
                <div className="calc-field-group">
                  <label className="calc-label">
                    <span>Quy mô số phòng của khách sạn:</span>
                    <span className="badge-num">{v.calcRooms} phòng</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="1"
                    value={v.calcRooms}
                    className="calc-slider"
                    onChange={v.changeRooms}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#94a3b8',
                      fontWeight: 600,
                    }}
                  >
                    <span>10 phòng (tối thiểu)</span>
                    <span>50 phòng</span>
                    <span>100 phòng</span>
                    <span>150+ phòng</span>
                  </div>
                </div>

                {/* PLAN SELECTOR */}
                <div className="calc-field-group">
                  <label className="calc-label">
                    <span>Chọn gói tính năng:</span>
                  </label>
                  <div className="calc-radio-group">
                    <div
                      className={`calc-radio-btn ${v.calcPlanStdClass ?? ''}`}
                      onClick={v.setCalcStd}
                    >
                      Cơ bản
                      <div style={{ fontSize: '11px', fontWeight: 500, opacity: 0.8 }}>
                        Vận hành nội bộ
                      </div>
                    </div>
                    <div
                      className={`calc-radio-btn ${v.calcPlanProClass ?? ''}`}
                      onClick={v.setCalcPro}
                    >
                      Nâng cao ★
                      <div style={{ fontSize: '11px', fontWeight: 500, opacity: 0.8 }}>
                        Bán phòng OTA
                      </div>
                    </div>
                    <div
                      className={`calc-radio-btn ${v.calcPlanEntClass ?? ''}`}
                      onClick={v.setCalcEnt}
                    >
                      Cao cấp
                      <div style={{ fontSize: '11px', fontWeight: 500, opacity: 0.8 }}>
                        Toàn diện All-in-one
                      </div>
                    </div>
                  </div>
                </div>

                {/* PERIOD SELECTOR */}
                <div className="calc-field-group">
                  <label className="calc-label">
                    <span>Thời hạn thanh toán:</span>
                  </label>
                  <div className="calc-radio-group">
                    <div
                      className={`calc-radio-btn ${v.calcPeriod12Class ?? ''}`}
                      onClick={v.setCalcPeriod12}
                    >
                      1 năm (12 tháng)
                      <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                        Giảm 20%
                      </div>
                    </div>
                    <div
                      className={`calc-radio-btn ${v.calcPeriod24Class ?? ''}`}
                      onClick={v.setCalcPeriod24}
                    >
                      2 năm (24 tháng)
                      <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                        Tặng thêm 3 tháng
                      </div>
                    </div>
                    <div
                      className={`calc-radio-btn ${v.calcPeriod1Class ?? ''}`}
                      onClick={v.setCalcPeriod1}
                    >
                      Theo tháng
                      <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
                        Linh hoạt
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CALC SUMMARY CARD */}
              <div className="calc-summary">
                <div>
                  <div className="calc-sum-head">Dự toán chi phí Bellhop</div>
                  <div className="calc-sum-row">
                    <span>Quy mô áp dụng:</span>
                    <b>{v.calcRooms} phòng</b>
                  </div>
                  <div className="calc-sum-row">
                    <span>Gói giải pháp:</span>
                    <b>{v.calcPlanName}</b>
                  </div>
                  <div className="calc-sum-row">
                    <span>Đơn giá mỗi phòng:</span>
                    <b>{v.calcRatePerRoom} đ / phòng / tháng</b>
                  </div>
                  <div className="calc-sum-row">
                    <span>Chu kỳ thanh toán:</span>
                    <b>{v.calcPeriodText}</b>
                  </div>
                  <div className="calc-sum-row total">
                    <span>Tổng thanh toán:</span>
                    <b>{v.calcTotalCost} đ</b>
                  </div>
                  {Boolean(v.hasSavings) && (
                    <div className="calc-saving-tag">
                      Tiết kiệm {v.calcSavingAmount} đ so với trả theo tháng
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '28px' }}>
                  <a className="btn btn-primary btn-block btn-lg" href="#form">
                    Đăng ký tư vấn theo cấu hình này →
                  </a>
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '11.5px',
                      color: '#94a3b8',
                      margin: '10px 0 0',
                    }}
                  >
                    Cam kết không phát sinh bất kỳ khoản phí ẩn nào
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE SECTION */}
        <section className="comp-sec" id="so-sanh">
          <div className="wrap">
            <div className="head center">
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                BẢNG SO SÁNH CHI TIẾT TÍNH NĂNG
              </span>
              <h2 className="h2" style={{ fontWeight: 800, textAlign: 'center' }}>
                Chi tiết tính năng giữa các gói giải pháp
              </h2>
              <p className="lead" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
                Xem đối chiếu đầy đủ các nhóm nghiệp vụ để chọn chính xác gói phù hợp nhất với nhu
                cầu khách sạn.
              </p>
            </div>

            <div className="comp-table-wrap">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Tính năng &amp; Nghiệp vụ</th>
                    <th className="col-plan">Miễn phí</th>
                    <th className="col-plan">Cơ bản</th>
                    <th className="col-plan pop">Nâng cao ★</th>
                    <th className="col-plan">Cao cấp</th>
                  </tr>
                </thead>
                <tbody>
                  {/* GROUP 1: VẬN HÀNH PMS */}
                  <tr>
                    <td colSpan="5" className="comp-group-title">
                      1. Quản lý Lễ tân &amp; Vận hành (PMS)
                    </td>
                  </tr>
                  <tr>
                    <td>Sơ đồ phòng trực quan, cập nhật thời gian thực</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Đặt phòng, Check-in, Check-out, đổi phòng, gán phòng</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Bàn giao ca trực, quản lý quỹ tiền mặt lễ tân</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Quản lý buồng phòng, trạng thái dọn dẹp phòng</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Quản lý kho hàng hóa, F&amp;B và minibar phòng</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Thiết lập giá linh hoạt (theo giờ, qua đêm, ngày, tuần)</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Tích hợp kết nối khóa thẻ từ ngoại vi</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>

                  {/* GROUP 2: KÊNH BÁN OTA */}
                  <tr>
                    <td colSpan="5" className="comp-group-title">
                      2. Kênh bán phòng &amp; Phân phối (Channel Manager)
                    </td>
                  </tr>
                  <tr>
                    <td>Kết nối 50+ kênh OTA (Booking, Agoda, Traveloka, Expedia...)</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Đồng bộ tự động 2 chiều (giá, phòng trống, booking)</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Chống Overbooking (trùng phòng) 100%</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Quy tắc định giá linh động theo công suất &amp; ngày lễ</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>

                  {/* GROUP 3: BÁN HÀNG TRỰC TIẾP & MARKETING */}
                  <tr>
                    <td colSpan="5" className="comp-group-title">
                      3. Đặt phòng trực tiếp &amp; Trải nghiệm khách
                    </td>
                  </tr>
                  <tr>
                    <td>Công cụ đặt phòng trực tiếp Booking Engine trên Website</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">Tùy chọn</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hộp thư hội thoại đa kênh Bellhop Message (Zalo, FB, Web)</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">Tùy chọn</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Trợ lý ảo AI Concierge tự động trả lời &amp; chốt phòng 24/7</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">Tùy chọn</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>

                  {/* GROUP 4: THANH TOÁN & TÀI CHÍNH */}
                  <tr>
                    <td colSpan="5" className="comp-group-title">
                      4. Thanh toán &amp; Kế toán
                    </td>
                  </tr>
                  <tr>
                    <td>Cổng thanh toán online Bellhop Payment (Kovena)</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">Tùy chọn</td>
                    <td className="col-plan pop">Tùy chọn</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Gửi đường dẫn thanh toán / đặt cọc online cho khách</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Tự động đồng bộ doanh thu sang phần mềm kế toán MISA</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">Tùy chọn</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>

                  {/* GROUP 5: BÁO CÁO & QUẢN TRỊ */}
                  <tr>
                    <td colSpan="5" className="comp-group-title">
                      5. Báo cáo &amp; Quản trị chuỗi
                    </td>
                  </tr>
                  <tr>
                    <td>Báo cáo doanh thu, công suất phòng &amp; tiền ca trực</td>
                    <td className="col-plan">Cơ bản</td>
                    <td className="col-plan">Chi tiết</td>
                    <td className="col-plan pop">Chuyên sâu</td>
                    <td className="col-plan">Hợp nhất</td>
                  </tr>
                  <tr>
                    <td>Quản trị chuỗi nhiều chi nhánh (Multi-property)</td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-no">–</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>

                  {/* GROUP 6: TÀI KHOẢN & HỖ TRỢ */}
                  <tr>
                    <td colSpan="5" className="comp-group-title">
                      6. Tài khoản &amp; Dịch vụ hỗ trợ
                    </td>
                  </tr>
                  <tr>
                    <td>Số lượng tài khoản nhân viên sử dụng</td>
                    <td className="col-plan">
                      <b>Không giới hạn</b>
                    </td>
                    <td className="col-plan">
                      <b>Không giới hạn</b>
                    </td>
                    <td className="col-plan pop">
                      <b>Không giới hạn</b>
                    </td>
                    <td className="col-plan">
                      <b>Không giới hạn</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile App cho chủ khách sạn (iOS &amp; Android)</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Cập nhật tính năng mới miễn phí trọn đời</td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan pop">
                      <span className="ck-yes">✓</span>
                    </td>
                    <td className="col-plan">
                      <span className="ck-yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Kênh hỗ trợ kỹ thuật</td>
                    <td className="col-plan">Tài liệu, Video</td>
                    <td className="col-plan">Hotline, Zalo</td>
                    <td className="col-plan pop">Ưu tiên 24/7</td>
                    <td className="col-plan">Chuyên viên VIP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRICING FAQ SECTION */}
        <section className="sec" id="faq" style={{ paddingTop: '20px', background: '#f8fbfb' }}>
          <div className="wrap">
            <PricingFAQ marks={v.marks} />
          </div>
        </section>

        {/* LEAD FORM SECTION */}
        <section className="sec" id="form">
          <div className="wrap">
            <LeadForm
              title="Nhận báo giá & Tư vấn gói cước phù hợp nhất"
              desc="Đăng ký dùng thử miễn phí ngay hôm nay hoặc để lại thông tin để chuyên viên Bellhop tính toán phương án chi phí tối ưu cho cơ sở của bạn."
              source="/bang-gia"
              extra={v.extra}
              marks={v.marks}
            />
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}
