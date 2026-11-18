import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NEWS_ARTICLES, getArticleBySlug } from '../data/newsArticles';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const related = NEWS_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);
  const popular = NEWS_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 5);
  const [tocOpen, setTocOpen] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [votes, setVotes] = useState(47);
  const [score, setScore] = useState(4.8);

  useEffect(() => {
    document.title = `${article.title} – Bellhop Blog`;
    setUserRating(0);
    setVotes(47);
    setScore(4.8);
  }, [article.title]);

  const handleRate = (star) => {
    if (userRating === star) return;
    const total = 4.8 * 47 + star;
    setUserRating(star);
    setVotes(48);
    setScore(Number((total / 48).toFixed(1)));
  };

  const articleUrl = encodeURIComponent(`https://bellhop.vn/tin-tuc/${article.slug}`);
  const articleTitle = encodeURIComponent(article.title);

  const categories = [
    'Quản lý Doanh thu',
    'Kênh bán OTA',
    'Vận hành Lễ tân',
    'Công nghệ & AI',
    'Mẫu biểu & Ebook',
  ];

  return (
    <div className="bh t">
      <Header active="news" startOpen={false} />

      <div className="wrap" style={{ paddingTop: '20px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/tin-tuc">Tin tức &amp; Blog</a>
          <span>›</span>
          <a href="/tin-tuc">{article.cat}</a>
          <span>›</span>
          <b>{article.title}</b>
        </nav>
      </div>

      <section className="article-detail-sec">
        <div className="wrap article-layout">
          {/* MAIN ARTICLE COLUMN */}
          <article className="article-main">
            <header className="article-detail-head">
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                {article.tag || article.cat}
              </span>
              <h1 className="article-detail-title">{article.title}</h1>
              <div className="article-detail-meta">
                <div className="post-author-row">
                  <div className="author-avatar">{article.authorInitials || 'BH'}</div>
                  <div>
                    <div className="author-name">{article.author}</div>
                    <div className="author-role">{article.authorRole || 'Bellhop Editorial Team'}</div>
                  </div>
                </div>
                <div className="post-meta">
                  <span>{article.date}</span>
                  <span className="dot-sep"></span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <p className="article-detail-lead">{article.desc}</p>
            </header>

            <div className="article-detail-cover">
              <img src={article.image} alt={article.title} />
            </div>

            {/* TABLE OF CONTENTS (ezCloud style) */}
            {(article.sections || []).length > 0 && (
              <div className="article-toc" role="navigation" aria-label="Mục lục bài viết">
                <div className="article-toc-head">
                  <span className="article-toc-title">Nội dung</span>
                  <button
                    type="button"
                    className="article-toc-toggle"
                    onClick={() => setTocOpen((v) => !v)}
                  >
                    {tocOpen ? 'Thu gọn' : 'Mở rộng'}
                  </button>
                </div>
                {tocOpen && (
                  <ul className="article-toc-list">
                    {(article.sections || []).map((sec, idx) => (
                      <li key={idx}>
                        <a href={`#sec-${idx}`}>{sec.heading}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="article-detail-body">
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div className="article-takeaways">
                  <div className="article-takeaways-title">Tóm tắt nhanh</div>
                  <ul className="ticks">
                    {article.keyTakeaways.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(article.sections || []).map((sec, idx) => (
                <section className="article-detail-section" id={`sec-${idx}`} key={idx}>
                  <h2>{sec.heading}</h2>
                  {(sec.paragraphs || []).map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="ticks">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {sec.callout && (
                    <div className="article-callout">
                      <b>{sec.callout.title}</b>
                      <p>{sec.callout.text}</p>
                    </div>
                  )}
                </section>
              ))}

              {/* RATING + SPLIT SHARE BUTTONS (mẫu ảnh 2) */}
              <div className="article-rate-share">
                <div className="article-rating" aria-label={`Đánh giá ${score}/5 từ ${votes} bình chọn`}>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`rating-star ${star <= Math.round(userRating || score) ? 'on' : ''}`}
                        onClick={() => handleRate(star)}
                        aria-label={`Đánh giá ${star} sao`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <span className="rating-text">
                    {score}/5 - ({votes} bình chọn)
                  </span>
                </div>

                <div className="article-share-grid">
                  <a
                    className="ez-share fb"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ez-share-ic">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                      </svg>
                    </span>
                    <span className="ez-share-txt">Share</span>
                  </a>
                  <a
                    className="ez-share x"
                    href={`https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ez-share-ic">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </span>
                    <span className="ez-share-txt">Share</span>
                  </a>
                  <a
                    className="ez-share li"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ez-share-ic">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.94 8.5H3.56V19.5h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 13.02c0-3.03-1.62-4.44-3.78-4.44-1.74 0-2.52.96-2.96 1.63V8.5h-3.38c.04.95 0 11 0 11h3.38v-6.14c0-.33.02-.66.12-.9.26-.66.86-1.34 1.87-1.34 1.32 0 1.85 1.01 1.85 2.48V19.5h3.38v-6.48z" />
                      </svg>
                    </span>
                    <span className="ez-share-txt">Share</span>
                  </a>
                  <a
                    className="ez-share em"
                    href={`mailto:?subject=${articleTitle}&body=${articleUrl}`}
                  >
                    <span className="ez-share-ic">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2l8 5 8-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="ez-share-txt">Email</span>
                  </a>
                </div>
              </div>

              {/* AUTHOR BIO BOX */}
              <div className="article-author-box">
                <div className="author-avatar lg">{article.authorInitials || 'BH'}</div>
                <div className="stack" style={{ gap: '4px' }}>
                  <b style={{ fontSize: '16px', color: '#122745' }}>{article.author}</b>
                  <span style={{ fontSize: '13px', color: '#1f7a84', fontWeight: 700 }}>
                    {article.authorRole || 'Ban Biên tập Kiến thức Lưu trú Bellhop'}
                  </span>
                  <p style={{ fontSize: '14px', color: '#475569', margin: '4px 0 0', lineHeight: 1.6 }}>
                    Chia sẻ kinh nghiệm thực chiến về vận hành khách sạn, quản trị doanh thu, phân phối kênh OTA và ứng dụng công nghệ giúp cơ sở lưu trú tăng trưởng bền vững.
                  </p>
                </div>
              </div>

              <div className="article-back-row">
                <a className="lnk" href="/tin-tuc">
                  <span className="arr">←</span> Quay lại danh sách Tin tức &amp; Blog
                </a>
              </div>
            </div>
          </article>

          {/* STICKY SIDEBAR (ezCloud style) */}
          <aside className="article-sidebar">
            <div className="sidebar-cta-card">
              <span className="kick lt" style={{ color: '#8BE3E8' }}>Bellhop PMS</span>
              <h3>Quản lý khách sạn gọn trên một nền tảng</h3>
              <p>
                Miễn phí phần Lễ tân &amp; Buồng phòng 0đ. Đồng bộ OTA, Booking Engine và Kế toán trong cùng một hệ thống.
              </p>
              <a className="btn btn-primary" href="/#dang-ky" style={{ width: '100%' }}>
                Dùng thử miễn phí
              </a>
              <a className="btn btn-ghost" href="/san-pham/bellhop-pms" style={{ width: '100%' }}>
                Xem tính năng
              </a>
            </div>

            <div className="sidebar-box">
              <h4 className="sidebar-box-title">Bài viết nổi bật</h4>
              <div className="sidebar-post-list">
                {popular.map((p) => (
                  <a className="sidebar-post-item" key={p.id} href={`/tin-tuc/${p.slug}`}>
                    <img src={p.image} alt={p.title} />
                    <div>
                      <span className="sidebar-post-cat">{p.cat}</span>
                      <b>{p.title}</b>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="sidebar-box">
              <h4 className="sidebar-box-title">Chuyên mục</h4>
              <div className="sidebar-cats">
                {categories.map((c) => (
                  <a key={c} className="sidebar-cat-pill" href="/tin-tuc">
                    {c}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="sec-sm" style={{ background: '#F5F8FE', borderTop: '1px solid var(--line)' }}>
        <div className="wrap stack" style={{ gap: '32px' }}>
          <div className="stack" style={{ gap: '10px' }}>
            <span className="eyebrow">Đọc tiếp</span>
            <h2 className="h2" style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}>Bài viết liên quan</h2>
          </div>
          <div className="news-grid">
            {related.map((item) => (
              <a className="article-card article-card-link" key={item.id} href={`/tin-tuc/${item.slug}`}>
                <div className="article-thumb">
                  <img src={item.image} alt={item.title} />
                  <span className="article-cat-tag">{item.cat}</span>
                </div>
                <div className="article-content">
                  <div className="post-meta" style={{ fontSize: '12px' }}>
                    <span>{item.date}</span>
                    <span className="dot-sep"></span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="article-title">{item.title}</h3>
                  <p className="article-excerpt">{item.desc}</p>
                  <div className="article-footer">
                    <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500 }}>
                      Tác giả: {item.author}
                    </span>
                    <span className="article-readmore">Đọc tiếp →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
