import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PMSPage from './pages/PMSPage';
import BookingEnginePage from './pages/BookingEnginePage';
import CMSPage from './pages/CMSPage';
import WebsitePage from './pages/WebsitePage';
import MessagePage from './pages/MessagePage';
import AIConciergePage from './pages/AIConciergePage';
import PaymentPage from './pages/PaymentPage';
import FinancePage from './pages/FinancePage';
import HotelSolutionPage from './pages/HotelSolutionPage';
import HomestaySolutionPage from './pages/HomestaySolutionPage';
import ChainSolutionPage from './pages/ChainSolutionPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import PaymentPolicyPage from './pages/PaymentPolicyPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';

function SpaRouterHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.grid4').forEach((grid) => {
        if (!grid.querySelector(':scope > a.fcard')) return;
        if (!grid.children || grid.children.length < 2) return;
        if (grid.parentElement && grid.parentElement.classList.contains('fcard-slider-wrap')) return;
        const wrap = document.createElement('div');
        wrap.className = 'fcard-slider-wrap';
        grid.parentNode.insertBefore(wrap, grid);
        wrap.appendChild(grid);

        const prev = document.createElement('button');
        prev.type = 'button';
        prev.className = 'fcard-slider-btn prev is-hidden';
        prev.setAttribute('aria-label', 'Slide trước');
        prev.textContent = '‹';

        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'fcard-slider-btn next';
        next.setAttribute('aria-label', 'Slide tiếp');
        next.textContent = '›';

        const update = () => {
          const maxScroll = grid.scrollWidth - grid.clientWidth;
          prev.classList.toggle('is-hidden', grid.scrollLeft <= 4);
          next.classList.toggle('is-hidden', maxScroll <= 4 || grid.scrollLeft >= maxScroll - 4);
        };

        prev.onclick = () => {
          const step = Math.max(240, Math.round(grid.clientWidth * 0.84));
          grid.scrollBy({ left: -step, behavior: 'smooth' });
        };
        next.onclick = () => {
          const step = Math.max(240, Math.round(grid.clientWidth * 0.84));
          grid.scrollBy({ left: step, behavior: 'smooth' });
        };

        grid.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update, { passive: true });
        wrap.appendChild(prev);
        wrap.appendChild(next);
        update();
      });
    }, 80);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      const a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.getAttribute('target') === '_blank') return;
      const href = a.getAttribute('href') || '';
      if (!href || href === '#' || href.startsWith('tel:') || href.startsWith('mailto:')) return;

      if (href.startsWith('#')) {
        const el = document.getElementById(href.slice(1));
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
        return;
      }

      if (href.startsWith('https://bellhop.vn')) {
        e.preventDefault();
        const target = href.slice('https://bellhop.vn'.length) || '/';
        navigate(target);
        return;
      }

      if (href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SpaRouterHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Main.dc.html" element={<Navigate to="/" replace />} />

        {/* Sản phẩm */}
        <Route path="/san-pham/bellhop-pms" element={<PMSPage />} />
        <Route path="/PMS.dc.html" element={<Navigate to="/san-pham/bellhop-pms" replace />} />

        <Route path="/san-pham/bellhop-booking-engine" element={<BookingEnginePage />} />
        <Route path="/BookingEngine.dc.html" element={<Navigate to="/san-pham/bellhop-booking-engine" replace />} />

        <Route path="/san-pham/bellhop-cms" element={<CMSPage />} />
        <Route path="/CMS.dc.html" element={<Navigate to="/san-pham/bellhop-cms" replace />} />

        <Route path="/san-pham/bellhop-website" element={<WebsitePage />} />
        <Route path="/Website.dc.html" element={<Navigate to="/san-pham/bellhop-website" replace />} />

        <Route path="/san-pham/bellhop-message" element={<MessagePage />} />
        <Route path="/Message.dc.html" element={<Navigate to="/san-pham/bellhop-message" replace />} />

        <Route path="/san-pham/bellhop-ai-concierge" element={<AIConciergePage />} />
        <Route path="/AIConcierge.dc.html" element={<Navigate to="/san-pham/bellhop-ai-concierge" replace />} />

        <Route path="/san-pham/bellhop-finance" element={<FinancePage />} />
        <Route path="/Finance.dc.html" element={<Navigate to="/san-pham/bellhop-finance" replace />} />

        <Route path="/san-pham/bellhop-payment" element={<PaymentPage />} />
        <Route path="/Payment.dc.html" element={<Navigate to="/san-pham/bellhop-payment" replace />} />

        {/* Giải pháp */}
        <Route path="/giai-phap/khach-san" element={<HotelSolutionPage />} />
        <Route path="/GiaiPhapKhachSan.dc.html" element={<Navigate to="/giai-phap/khach-san" replace />} />

        <Route path="/giai-phap/homestay-villa" element={<HomestaySolutionPage />} />
        <Route path="/GiaiPhapHomestay.dc.html" element={<Navigate to="/giai-phap/homestay-villa" replace />} />

        <Route path="/giai-phap/chuoi-luu-tru" element={<ChainSolutionPage />} />
        <Route path="/GiaiPhapChuoi.dc.html" element={<Navigate to="/giai-phap/chuoi-luu-tru" replace />} />

        {/* Tin tức & Blog */}
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
        <Route path="/blog" element={<Navigate to="/tin-tuc" replace />} />
        <Route path="/News.dc.html" element={<Navigate to="/tin-tuc" replace />} />

        {/* Giới thiệu / Về chúng tôi */}
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/ve-chung-toi" element={<Navigate to="/gioi-thieu" replace />} />
        <Route path="/ve-bellhop" element={<Navigate to="/gioi-thieu" replace />} />
        <Route path="/About.dc.html" element={<Navigate to="/gioi-thieu" replace />} />

        {/* Bảng giá */}
        <Route path="/bang-gia" element={<PricingPage />} />
        <Route path="/Pricing.dc.html" element={<Navigate to="/bang-gia" replace />} />

        {/* Chính sách */}
        <Route path="/chinh-sach/bao-ve-du-lieu-ca-nhan" element={<PrivacyPage />} />
        <Route path="/bao-ve-du-lieu-ca-nhan" element={<Navigate to="/chinh-sach/bao-ve-du-lieu-ca-nhan" replace />} />
        <Route path="/Privacy.dc.html" element={<Navigate to="/chinh-sach/bao-ve-du-lieu-ca-nhan" replace />} />

        <Route path="/chinh-sach/dieu-khoan-va-bao-mat" element={<TermsPage />} />
        <Route path="/dieu-khoan-va-bao-mat" element={<Navigate to="/chinh-sach/dieu-khoan-va-bao-mat" replace />} />
        <Route path="/Terms.dc.html" element={<Navigate to="/chinh-sach/dieu-khoan-va-bao-mat" replace />} />

        <Route path="/chinh-sach/chinh-sach-thanh-toan" element={<PaymentPolicyPage />} />
        <Route path="/chinh-sach-thanh-toan" element={<Navigate to="/chinh-sach/chinh-sach-thanh-toan" replace />} />
        <Route path="/PaymentPolicy.dc.html" element={<Navigate to="/chinh-sach/chinh-sach-thanh-toan" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
