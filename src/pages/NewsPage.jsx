import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NEWS_ARTICLES } from '../data/newsArticles';

export default class NewsPage extends DCLogic {
  constructor(p) {
    super(p);
    this.state = {
      selectedCat: 'all',
    };
  }

  componentDidMount() {
    document.title = 'Tin tức & Kiến thức Quản trị Khách sạn – Lifrooms & Bellhop';
  }

  renderVals() {
    const marks = this.props.reviewMarks ?? true;
    const cat = this.state.selectedCat;

    const featuredArticle = NEWS_ARTICLES.find((a) => a.featured) || NEWS_ARTICLES[0];
    const allArticles = NEWS_ARTICLES.filter((a) => !a.featured);

    const filteredArticles = cat === 'all' ? allArticles : allArticles.filter((a) => a.catKey === cat);

    return {
      markCls: marks ? '' : 'no-marks',
      marks,
      showFeatured: cat === 'all' || cat === 'rev',
      featuredArticle,
      articles: filteredArticles,
      catAllClass: cat === 'all' ? 'active' : '',
      catRevClass: cat === 'rev' ? 'active' : '',
      catOtaClass: cat === 'ota' ? 'active' : '',
      catOpsClass: cat === 'ops' ? 'active' : '',
      catTechClass: cat === 'tech' ? 'active' : '',
      catEbookClass: cat === 'ebook' ? 'active' : '',
      setCatAll: () => this.setState({ selectedCat: 'all' }),
      setCatRev: () => this.setState({ selectedCat: 'rev' }),
      setCatOta: () => this.setState({ selectedCat: 'ota' }),
      setCatOps: () => this.setState({ selectedCat: 'ops' }),
      setCatTech: () => this.setState({ selectedCat: 'tech' }),
      setCatEbook: () => this.setState({ selectedCat: 'ebook' }),
      handleNewsletter: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        alert('Cảm ơn bạn đã đăng ký nhận bản tin từ Lifrooms & Bellhop!');
      },
    };
  }

  render() {
    const v = { ...this.props, ...(this.renderVals() || {}) };
    return (
      <div className={`bh t ${v.markCls ?? ''}`}>
        <Header active="news" startOpen={false} />

        <div className="wrap" style={{ paddingTop: '20px' }}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Trang chủ</a>
            <span>›</span>
            <b>Tin tức &amp; Blog</b>
          </nav>
        </div>

        {/* HERO HEADER */}
        <section className="news-hero">
          <div className="wrap">
            <div className="news-hero-head">
              <span className="eyebrow" style={{ color: '#1f7a84' }}>
                BLOG &amp; KIẾN THỨC CHUYÊN SÂU
              </span>
              <h1 className="h1" style={{ fontSize: '42px', lineHeight: '1.25' }}>
                Cẩm nang Vận hành &amp; Quản trị Doanh thu Khách sạn
              </h1>
              <p className="lead" style={{ maxWidth: '760px', margin: '0', fontSize: '16.5px' }}>
                Tổng hợp các bài viết chuyên sâu về chiến lược tối ưu giá phòng (Revenue Management), phân bổ kênh OTA, kỹ năng lễ tân và công nghệ lưu trú thực chiến từ chuyên gia Lifrooms.
              </p>
            </div>

            {/* CATEGORY FILTER BUTTONS */}
            <div className="news-cats">
              <button type="button" className={`news-cat-btn ${v.catAllClass ?? ''}`} onClick={v.setCatAll}>
                Tất cả bài viết
              </button>
              <button type="button" className={`news-cat-btn ${v.catRevClass ?? ''}`} onClick={v.setCatRev}>
                Quản lý Doanh thu
              </button>
              <button type="button" className={`news-cat-btn ${v.catOtaClass ?? ''}`} onClick={v.setCatOta}>
                Kênh bán phòng OTA
              </button>
              <button type="button" className={`news-cat-btn ${v.catOpsClass ?? ''}`} onClick={v.setCatOps}>
                Vận hành Lễ tân
              </button>
              <button type="button" className={`news-cat-btn ${v.catTechClass ?? ''}`} onClick={v.setCatTech}>
                Công nghệ &amp; AI
              </button>
              <button type="button" className={`news-cat-btn ${v.catEbookClass ?? ''}`} onClick={v.setCatEbook}>
                Mẫu biểu &amp; Ebook
              </button>
            </div>

            {/* FEATURED HERO POST */}
            {Boolean(v.showFeatured) && v.featuredArticle && (
              <div className="featured-post-wrap">
                <a className="featured-post-card featured-post-link" href={`/tin-tuc/${v.featuredArticle.slug}`}>
                  <div className="featured-media">
                    <img
                      src={v.featuredArticle.image}
                      alt={v.featuredArticle.title}
                    />
                    <span className="featured-badge">{v.featuredArticle.tag}</span>
                  </div>
                  <div className="featured-body">
                    <div className="post-meta">
                      <span>{v.featuredArticle.date}</span>
                      <span className="dot-sep"></span>
                      <span>{v.featuredArticle.readTime}</span>
                      <span className="dot-sep"></span>
                      <span style={{ color: '#1f7a84' }}>Revenue Management</span>
                    </div>
                    <h2 className="featured-title">{v.featuredArticle.title}</h2>
                    <p className="featured-desc">{v.featuredArticle.desc}</p>
                    <div style={{ marginTop: '8px' }}>
                      <span className="article-readmore">Đọc bài chi tiết →</span>
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="news-grid-sec">
          <div className="wrap">
            <div className="news-grid">
              {(v.articles || []).map((item, $index) => (
                <a className="article-card article-card-link" key={item.id || $index} href={`/tin-tuc/${item.slug}`}>
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

            {/* NEWSLETTER BANNER */}
            <div className="newsletter-banner">
              <div className="newsletter-head">
                <h2>Nhận bản tin kiến thức khách sạn hàng tuần</h2>
                <p>
                  Cập nhật số liệu thị trường du lịch, bí quyết tối ưu kênh OTA và các biểu mẫu quản lý mới nhất trực tiếp vào hộp thư của bạn.
                </p>
              </div>
              <form className="newsletter-form" onSubmit={v.handleNewsletter}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Nhập địa chỉ email của bạn..."
                  required
                />
                <button type="submit" className="btn btn-teal btn-lg" style={{ whiteSpace: 'nowrap' }}>
                  Đăng ký ngay
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}
