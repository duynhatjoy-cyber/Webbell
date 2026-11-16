import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/site.css';
import './styles/site-t.css';

function applyBellhopFavicon() {
  if (typeof document === 'undefined' || !document.head) return;

  const setFaviconHref = (href, type = 'image/png') => {
    const rels = ['icon', 'shortcut icon', 'apple-touch-icon'];
    rels.forEach((rel) => {
      let link = document.head.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      if (rel !== 'apple-touch-icon') {
        link.type = type;
      }
      link.href = href;
    });
  };

  // 1. Instant inline SVG Data URI so the icon appears immediately
  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#ffffff"/><g transform="translate(4, 2)"><path d="M7 4 V33 C7 46.8 18.2 57 32 57 C35.8 57 39.4 56.1 42.6 54.5" fill="none" stroke="#122745" stroke-width="4.5" stroke-linecap="round"/><path d="M23.5 11.2 C26.2 10.4 29 10 32 10 C41.2 10 49.1 15.2 52.8 22.8" fill="none" stroke="#122745" stroke-width="3.4" stroke-linecap="round"/><path d="M54.2 38.5 C53.1 42.6 50.9 46.3 47.9 49.2" fill="none" stroke="#122745" stroke-width="3.4" stroke-linecap="round"/><path d="M14.2 29.5 C15.8 22.2 22.3 16.8 30 16.8" fill="none" stroke="#122745" stroke-width="3.6" stroke-linecap="round"/><path d="M30 16.8 C39.4 16.8 47 24.4 47 33.8 C47 40.5 43.1 46.3 37.5 49" fill="none" stroke="#5FB9C2" stroke-width="3.6" stroke-linecap="round"/><path d="M37.5 49 C35.3 50.1 32.7 50.7 30 50.7" fill="none" stroke="#122745" stroke-width="3.6" stroke-linecap="round"/><circle cx="17" cy="13.5" r="3.2" fill="#5FB9C2"/><circle cx="54.5" cy="28.5" r="3.2" fill="#5FB9C2"/><circle cx="47" cy="35.5" r="3.2" fill="#4A5873"/><circle cx="44" cy="52.5" r="3" fill="#5FB9C2"/><path d="M30 22.5 C28.7 22.5 27.7 23.5 27.7 24.8 V25.4 C23.2 26.5 20.5 30.4 20.5 35.8 V39.5 L17.8 42.2 C17.1 42.9 17.6 44.2 18.7 44.2 H41.3 C42.4 44.2 42.9 42.9 42.2 42.2 L39.5 39.5 V35.8 C39.5 30.4 36.8 26.5 32.3 25.4 V24.8 C32.3 23.5 31.3 22.5 30 22.5 Z" fill="#122745"/><path d="M27.3 44.2 C27.3 45.9 28.5 47.2 30 47.2 C31.5 47.2 32.7 45.9 32.7 44.2 Z" fill="#122745"/></g></svg>`;
  setFaviconHref(`data:image/svg+xml;utf8,${encodeURIComponent(svgIcon)}`, 'image/svg+xml');

  // 2. Render exact Bellhop symbol from official logo onto 64x64 PNG canvas to force browser tab repaint
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    try {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Rounded white squircle background for dark/light browser tabs
      const r = 14;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(size - r, 0);
      ctx.quadraticCurveTo(size, 0, size, r);
      ctx.lineTo(size, size - r);
      ctx.quadraticCurveTo(size, size, size - r, size);
      ctx.lineTo(r, size);
      ctx.quadraticCurveTo(0, size, 0, size - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.fill();

      // Crop the square Bellhop mark from the left side of the official logo
      const srcSize = img.naturalHeight || img.height;
      const pad = 6;
      ctx.drawImage(img, 0, 0, srcSize, srcSize, pad, pad, size - pad * 2, size - pad * 2);

      const pngDataUrl = canvas.toDataURL('image/png');
      setFaviconHref(pngDataUrl, 'image/png');
    } catch {}
  };
  img.src = '/assets/4f97ede20a93cc1bba22d88175df59a4.png';
}

applyBellhopFavicon();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
