import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NEWS_ARTICLES, getArticleBySlug } from '../data/newsArticles';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const related = NEWS_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);

  useEffect(() => {
    document.title = `${article.title} – Bellhop Blog`;
  }, [article.title]);

  return (
    <div className="bh t">
      <Header active="news" startOpen={false} />

      <div className="wrap" style={{ paddingTop: '20px' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Trang chủ</a>
          <span>›</span>
          <a href="/tin-tuc">Tin tức &amp; Blog</a>
          <span>›</span>
          <b>{article.cat}</b>
        </nav>
      </div>

      <article className="article-detail-sec">
        <div className="wrap article-detail-wrap">
          <header className="article-detail-head">
            <span className="eyebrow" style={{ color: '#1f7a84' }}>
              {article.tag || article.cat}
            </span>
            <h1 className="article-detail-title">{article.title}</h1>
            <p className="article-detail-lead">{article.desc}</p>

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
          </header>

          <div className="article-detail-cover">
            <img src={article.image} alt={article.title} />
          </div>

          <div className="article-detail-body">
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="article-takeaways">
                <div className="article-takeaways-title">Điểm chính trong bài</div>
                <ul className="ticks">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {(article.sections || []).map((sec, idx) => (
              <section className="article-detail-section" key={idx}>
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

            <div className="article-detail-cta">
              <div className="stack" style={{ gap: '10px' }}>
                <span className="kick lt" style={{ color: '#8BE3E8' }}>Bellhop Platform</span>
                <h3>Áp dụng ngay vào vận hành khách sạn của bạn</h3>
                <p>
                  Dùng thử miễn phí phân hệ Lễ tân &amp; Buồng phòng trên Bellhop PMS, hoặc đặt lịch demo cùng đội ngũ tư vấn.
                </p>
              </div>
              <div className="btns">
                <a className="btn btn-primary" href="/#dang-ky">Dùng thử miễn phí</a>
                <a className="btn btn-ghost" href="/san-pham/bellhop-pms">Tìm hiểu Bellhop PMS</a>
              </div>
            </div>

            <div className="article-back-row">
              <a className="lnk" href="/tin-tuc">
                <span className="arr">←</span> Quay lại danh sách Tin tức &amp; Blog
              </a>
            </div>
          </div>
        </div>
      </article>

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
