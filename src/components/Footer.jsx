import React from 'react';
import { DCLogic } from '../utils/DCLogic';

export default class Footer extends DCLogic {
  renderVals() {
    return {};
  }

  render() {
    return (
      <div className="bh">
        <div className="fab" aria-label="Liên hệ nhanh">
          <a
            className="fab-btn fab-messenger m"
            href="https://m.me/bellhop.vn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Messenger"
          >
            <span className="fab-halo"></span>
            <span className="fab-icon">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 2.5C7.649 2.5 2.5 7.37 2.5 13.375c0 3.42 1.675 6.474 4.296 8.435v4.218l4.029-2.21c1.006.278 2.078.432 3.175.432 6.351 0 11.5-4.87 11.5-10.875S20.351 2.5 14 2.5zm1.22 14.653l-3.08-3.284-6.012 3.284 6.613-7.018 3.155 3.284 5.937-3.284-6.613 7.018z"
                  fill="#ffffff"
                />
              </svg>
            </span>
          </a>
          <a
            className="fab-btn fab-zalo z"
            href="https://zalo.me/0972096499"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Zalo"
          >
            <span className="fab-halo"></span>
            <span className="fab-icon">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M16 3.5C9.4 3.5 4 8.7 4 14.9c0 3.5 1.7 6.6 4.4 8.6-.2 1.7-.8 3.6-2.5 4.8 2.5.1 5.2-.9 6.8-2.1.9.2 1.8.3 2.7.3 6.6 0 12-5.2 12-11.4S22.6 3.5 16 3.5z"
                  fill="#ffffff"
                />
                <g transform="translate(4.8, 3.8) scale(0.93)">
                  <path
                    fill="#0068FF"
                    d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z"
                  />
                </g>
              </svg>
            </span>
          </a>
          <a className="fab-btn fab-phone c" href="tel:0972096499" aria-label="Gọi hotline">
            <span className="fab-halo"></span>
            <span className="fab-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
          </a>
        </div>

        <footer className="ftr">
          <div className="wrap">
            <div className="ftr-grid4">
              <div className="stack" style={{ gap: '20px', maxWidth: '340px' }}>
                <img
                  src="/assets/c8ee2649d942c5042b9803e937e5825d.png"
                  alt="Bellhop – Smart, Simple & Flexible"
                  style={{ height: '56px', width: 'auto', alignSelf: 'flex-start' }}
                />
                <p className="p" style={{ fontSize: '15px' }}>
                  Nền tảng quản lý khách sạn, homestay và villa tại Việt Nam.
                </p>
                <div className="info">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      style={{
                        width: '16px',
                        height: '16px',
                        flex: 'none',
                        fill: 'none',
                        stroke: 'currentColor',
                        strokeWidth: '1.8',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                      }}
                    >
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path>
                    </svg>
                    Hotline: <a href="tel:0972096499">0972 096 499</a>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      style={{
                        width: '16px',
                        height: '16px',
                        flex: 'none',
                        fill: 'none',
                        stroke: 'currentColor',
                        strokeWidth: '1.8',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                      }}
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                      <path d="M3 7l9 6 9-6"></path>
                    </svg>
                    Email: <a href="mailto:admin@bellhop.vn">admin@bellhop.vn</a>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      style={{
                        width: '16px',
                        height: '16px',
                        flex: 'none',
                        fill: 'none',
                        stroke: 'currentColor',
                        strokeWidth: '1.8',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                      }}
                    >
                      <path d="M6 3h9l4 4v14H6z"></path>
                      <path d="M14 3v5h5M9 13h7M9 17h5"></path>
                    </svg>
                    MST: 03196298
                  </span>
                </div>
                <div className="soc">
                  <a
                    href="https://www.facebook.com/bellhop.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3.5H9V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"
                        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinejoin: 'round' }}
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@bellhop.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.6 2.6 2.4 4.2 5 4.5"
                        style={{
                          fill: 'none',
                          stroke: 'currentColor',
                          strokeWidth: '2',
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                        }}
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://zalo.me/0972096499"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Zalo"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
                        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinejoin: 'round' }}
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@bellhopvn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <rect
                        x="2.5"
                        y="5.5"
                        width="19"
                        height="13"
                        rx="4"
                        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2' }}
                      ></rect>
                      <path
                        d="M10 9.5v5l4.5-2.5z"
                        style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinejoin: 'round' }}
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4>Sản phẩm</h4>
                <ul>
                  <li>
                    <a href="https://bellhop.vn/san-pham/bellhop-pms">Bellhop PMS</a>
                  </li>
                  <li>
                    <a href="https://bellhop.vn/san-pham/bellhop-booking-engine">Bellhop booking engine</a>
                  </li>
                  <li>
                    <a href="https://bellhop.vn/san-pham/bellhop-cms">Bellhop CMS</a>
                  </li>
                  <li>
                    <a href="https://bellhop.vn/san-pham/bellhop-website">Bellhop website</a>
                  </li>
                  <li>
                    <a href="https://bellhop.vn/san-pham/bellhop-message">Bellhop message</a>
                  </li>
                  <li>
                    <a href="https://bellhop.vn/san-pham/bellhop-ai-concierge">Bellhop AI Concierge</a>
                  </li>
                  <li>
                    <a href="/san-pham/bellhop-payment">Bellhop Payment</a>
                  </li>
                  <li>
                    <a href="https://bellhop.vn/san-pham/bellhop-finance">Bellhop Finance</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Giải pháp</h4>
                <ul>
                  <li>
                    <a href="/giai-phap/khach-san">Khách sạn</a>
                  </li>
                  <li>
                    <a href="/giai-phap/homestay-villa">Homestay và Villa</a>
                  </li>
                  <li>
                    <a href="/giai-phap/chuoi-luu-tru">Chuỗi lưu trú</a>
                  </li>
                </ul>
                <h4 style={{ marginTop: '28px' }}>Công ty</h4>
                <ul>
                  <li>
                    <a href="/gioi-thieu">Về Bellhop</a>
                  </li>
                  <li>
                    <a href="/tin-tuc">Blog</a>
                  </li>
                  <li>
                    <a href="/#dang-ky">Liên hệ</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Chính sách</h4>
                <ul>
                  <li>
                    <a href="/chinh-sach/bao-ve-du-lieu-ca-nhan">Bảo vệ và xử lý dữ liệu cá nhân</a>
                  </li>
                  <li>
                    <a href="/chinh-sach/dieu-khoan-va-bao-mat">Điều khoản và bảo mật</a>
                  </li>
                  <li>
                    <a href="/chinh-sach/chinh-sach-thanh-toan">Chính sách thanh toán</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="ftr-bot">
              <span>© 2026 Bellhop. Tất cả các quyền được bảo lưu.</span>
              <span>Nền tảng quản lý lưu trú thông minh</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
