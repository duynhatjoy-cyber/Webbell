import React from 'react';
import { DCLogic } from '../utils/DCLogic';

export default class PricingFAQ extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { open: 0 };
  }

  renderVals() {
    const items = this.props.items || [
      {
        q: 'Chi phí tính theo phòng được tính như thế nào? Khách sạn dưới 10 phòng tính sao?',
        a: 'Chi phí được tính dựa trên số lượng phòng vật lý thực tế của khách sạn. Đối với các cơ sở lưu trú dưới 10 phòng, hệ thống áp dụng mức tính sàn tối thiểu là 10 phòng để đảm bảo chất lượng hạ tầng và dịch vụ hỗ trợ kỹ thuật tốt nhất.',
      },
      {
        q: 'Tôi có phải trả phí cài đặt ban đầu hoặc phí nâng cấp tính năng mới không?',
        a: 'Hoàn toàn không. Bellhop không thu phí cài đặt ban đầu, không thu phí duy trì máy chủ và miễn phí 100% tất cả các bản cập nhật tính năng mới trong suốt thời gian sử dụng phần mềm.',
      },
      {
        q: 'Tôi có thể dùng thử trước khi trả phí không?',
        a: 'Có. Bạn có thể sử dụng Gói Miễn Phí trọn đời cho các nghiệp vụ lễ tân cơ bản, hoặc đăng ký trải nghiệm miễn phí 7 ngày đầy đủ tính năng kết nối OTA của Gói Nâng Cao trước khi quyết định ký hợp đồng.',
      },
      {
        q: 'Khi muốn nâng cấp hoặc chuyển đổi giữa các gói cước thì tính phí thế nào?',
        a: 'Khách sạn có thể nâng cấp gói bất kỳ lúc nào. Số tiền chưa sử dụng của gói cũ sẽ được hệ thống tự động quy đổi và trừ trực tiếp vào chi phí của gói mới.',
      },
      {
        q: 'Bellhop có hỗ trợ chuyển dữ liệu từ phần mềm cũ sang không?',
        a: 'Có. Đội ngũ chuyên viên kỹ thuật của Bellhop sẽ đồng hành hỗ trợ nhập danh sách hạng phòng, danh mục dịch vụ, danh sách khách hàng và các đặt phòng hiện có từ phần mềm cũ sang Bellhop hoàn toàn miễn phí.',
      },
      {
        q: 'Dữ liệu của khách sạn được lưu trữ và bảo mật thế nào?',
        a: 'Toàn bộ dữ liệu được lưu trữ trên nền tảng đám mây bảo mật cao cấp, tự động sao lưu dự phòng hàng ngày và mã hóa đường truyền theo tiêu chuẩn SSL quốc tế, đảm bảo an toàn tuyệt đối ngay cả khi mất điện hay hỏng thiết bị tại quầy.',
      },
    ];
    const o = this.state.open;
    const marks = this.props.marks ?? true;
    return {
      markCls: marks ? '' : 'no-marks',
      title: this.props.title ?? 'Câu hỏi thường gặp về Bảng giá',
      rows: items.map((it, i) => ({
        q: it.q,
        a: it.a,
        open: o === i,
        cls: o === i ? 'open' : '',
        exp: o === i ? 'true' : 'false',
        sign: o === i ? '−' : '+',
        toggle: () => this.setState({ open: this.state.open === i ? -1 : i }),
      })),
    };
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <div className={`bh ${v.markCls ?? ''}`} style={{ background: 'transparent' }}>
        <div className="split-48">
          <div className="stack" style={{ gap: '20px' }}>
            <span className="eyebrow" style={{ color: '#1f7a84' }}>
              FAQ BẢNG GIÁ
            </span>
            <h2 className="h2">{v.title}</h2>
            <div
              className="stack"
              style={{
                gap: '14px',
                marginTop: '12px',
                padding: '24px',
                borderRadius: '18px',
                background: '#fff',
                border: '1px solid #dde4ec',
              }}
            >
              <div className="row" style={{ gap: '12px' }}>
                <span className="tile t-orange" style={{ width: '36px', height: '36px' }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                </span>
                <b style={{ color: '#122745' }}>Cần tư vấn gói cước phù hợp?</b>
              </div>
              <p className="small muted">
                Chuyên viên tư vấn Bellhop sẽ tính toán phương án chi phí tối ưu nhất cho quy mô cơ
                sở của bạn.
              </p>
              <div className="btns">
                <a
                  className="btn btn-sm"
                  href="https://zalo.me/0972096499"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#0068ff', color: '#fff' }}
                >
                  Chat Zalo
                </a>
                <a className="btn btn-sm btn-outline" href="#form">
                  Nhận báo giá
                </a>
              </div>
            </div>
          </div>

          <div className="faq">
            {(v.rows || []).map((it, idx) => (
              <div key={idx} className={`faq-i ${it.cls ?? ''}`}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={it.exp}
                  onClick={it.toggle}
                >
                  <span>{it.q}</span>
                  <span aria-hidden="true" style={{ fontSize: '24px', color: '#1f7a84' }}>
                    {it.sign}
                  </span>
                </button>
                {Boolean(it.open) && <div className="faq-a">{it.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
