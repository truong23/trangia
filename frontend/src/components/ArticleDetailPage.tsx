import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Eye,
  Tag,
  User,
  Share2,
  Clock,
  Check,
  ChevronRight,
  ArrowLeft,
  Loader2,
  BookOpen,
  PhoneCall,
  Mail,
  Search,
  Building,
  Printer,
  FileText,
  ArrowUp,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { Article, Category, SiteSettings } from '../types';
import { api } from '../services/api';
import { Language, translations } from '../services/i18n';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { NewsCard } from './NewsCard';
import { ContactSection } from './ContactSection';
import { ProfileViewerModal } from './ProfileViewerModal';
import { TRAN_GIA_INFO } from '../services/tranGiaData';

interface ArticleDetailPageProps {
  slug: string;
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
  siteSettings?: SiteSettings;
  categories: Category[];
  recentArticles: Article[];
  onNavigate: (path: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectArticle: (article: Article) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug,
  currentLang,
  onToggleLang,
  siteSettings,
  categories,
  recentArticles,
  onNavigate,
  onNavigateSection,
  onSelectArticle,
}) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<Language>(currentLang);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const t = translations[activeLang];

  // Sync active language with global language
  useEffect(() => {
    setActiveLang(currentLang);
  }, [currentLang]);

  // Load article by slug
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    api
      .getArticleBySlug(slug)
      .then(async (data) => {
        if (!isMounted) return;
        setArticle(data);

        // === Dynamic SEO Meta Tags ===
        const companyTitle = siteSettings?.company?.name || 'Trần Gia Construction';
        const articleTitle = `${data.title} | Thi Công Trần Thạch Cao | ${companyTitle}`;
        const articleDesc = data.excerpt
          ? `${data.excerpt.slice(0, 155).replace(/<[^>]*>/g, '')}...`
          : `${data.title} - Bài viết từ ${companyTitle}, đơn vị chuyên thi công trần thạch cao cho các tập đoàn lớn: VinGroup, DELTA, Viettel Construction.`;
        const articleUrl = `${window.location.origin}/bai-viet/${data.slug}`;
        const articleImage = data.coverImage
          ? (data.coverImage.startsWith('http') ? data.coverImage : `${window.location.origin}${data.coverImage}`)
          : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

        document.title = articleTitle;

        // Helper to set/create meta tags
        const setMeta = (attr: string, key: string, content: string) => {
          let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
          if (!el) {
            el = document.createElement('meta');
            el.setAttribute(attr, key);
            document.head.appendChild(el);
          }
          el.setAttribute('content', content);
        };

        setMeta('name', 'description', articleDesc);
        setMeta('name', 'keywords', `thi công trần thạch cao, thi công trần thạch cao cho tập đoàn lớn, trần thạch cao VinGroup, ${data.title}, Trần Gia Construction`);
        setMeta('property', 'og:title', articleTitle);
        setMeta('property', 'og:description', articleDesc);
        setMeta('property', 'og:url', articleUrl);
        setMeta('property', 'og:image', articleImage);
        setMeta('property', 'og:type', 'article');
        setMeta('name', 'twitter:title', articleTitle);
        setMeta('name', 'twitter:description', articleDesc);
        setMeta('name', 'twitter:image', articleImage);

        // JSON-LD Article Schema
        let ldScript = document.getElementById('article-jsonld') as HTMLScriptElement | null;
        if (!ldScript) {
          ldScript = document.createElement('script');
          ldScript.id = 'article-jsonld';
          ldScript.type = 'application/ld+json';
          document.head.appendChild(ldScript);
        }
        ldScript.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: articleDesc,
          image: articleImage,
          url: articleUrl,
          datePublished: data.publishedAt || data.createdAt,
          dateModified: data.updatedAt || data.publishedAt || data.createdAt,
          author: {
            '@type': 'Organization',
            name: companyTitle,
            url: window.location.origin,
          },
          publisher: {
            '@type': 'Organization',
            name: companyTitle,
            url: window.location.origin,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
          },
        });
        // === End Dynamic SEO ===

        // Load related articles from the same category
        try {
          const res = await api.getArticles({
            limit: 3,
            category: data.categoryId || (data.category ? data.category.slug : undefined),
          });
          if (isMounted) {
            setRelatedArticles(res.items.filter((item) => item.id !== data.id).slice(0, 3));
          }
        } catch {
          // Fallback to recent articles if category search fails
          if (isMounted) {
            setRelatedArticles(recentArticles.filter((item) => item.id !== data.id).slice(0, 3));
          }
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Lỗi khi tải chi tiết bài viết:', err);
        setLoadError(err.message || 'Không tìm thấy bài viết hoặc bài viết đã bị gỡ bỏ.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug, siteSettings?.company?.name]);

  // Scroll listener for top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? ''
      : d.toLocaleDateString(activeLang === 'en' ? 'en-US' : 'vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  };

  const calcReadingTime = (text?: string) => {
    if (!text) return activeLang === 'en' ? '1 min read' : '1 phút đọc';
    const wordCount = text.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return activeLang === 'en' ? `${minutes} min read` : `${minutes} phút đọc`;
  };

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSearch = (query: string) => {
    onNavigate(`/?search=${encodeURIComponent(query)}#news`);
  };

  const handleSelectCategory = (catSlug: string) => {
    if (catSlug === 'all') {
      onNavigate('/#news');
    } else {
      onNavigate(`/?category=${catSlug}#news`);
    }
  };

  const handleArticleClick = (art: Article) => {
    onNavigate(`/bai-viet/${art.slug}`);
  };

  // Content bilingual checks
  const hasEnglish = Boolean(article && article.titleEn && (article.contentEn || article.summaryEn));
  const displayTitle = article ? (activeLang === 'en' && article.titleEn ? article.titleEn : article.title) : '';
  const displaySummary = article ? (activeLang === 'en' && article.summaryEn ? article.summaryEn : article.summary) : '';
  const displayContent = article ? (activeLang === 'en' && article.contentEn ? article.contentEn : article.content) : '';

  return (
    <div className="tg-page-wrapper tg-article-page">
      {/* 1. Standard Header */}
      <Header
        onSearch={handleSearch}
        settings={siteSettings}
        activeSection="news"
        onNavigateSection={(sec) => {
          onNavigate(`/#${sec}`);
        }}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        currentLang={currentLang}
        onToggleLang={onToggleLang}
      />

      {/* 2. Breadcrumbs & Page Sub-header */}
      <div className="tg-article-breadcrumb-bar">
        <div className="container">
          <nav className="tg-breadcrumb-nav" aria-label="Breadcrumb">
            <button onClick={() => onNavigate('/')} className="breadcrumb-link">
              {t.nav.home}
            </button>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <button onClick={() => onNavigate('/#news')} className="breadcrumb-link">
              {t.nav.news}
            </button>
            {article?.category && (
              <>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <button
                  onClick={() => handleSelectCategory(article.category!.slug)}
                  className="breadcrumb-link"
                >
                  {article.category.name}
                </button>
              </>
            )}
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current" title={displayTitle}>
              {displayTitle ? (displayTitle.length > 55 ? `${displayTitle.substring(0, 55)}...` : displayTitle) : '...'}
            </span>
          </nav>
        </div>
      </div>

      {/* 3. Main Article Detail Layout */}
      <div className="tg-section tg-article-detail-section">
        <div className="container">
          {isLoading ? (
            <div className="tg-loading-box">
              <Loader2 size={40} className="animate-spin text-amber" />
              <p style={{ marginTop: '16px', fontSize: '15px', color: '#64748B' }}>
                {t.news.loading}
              </p>
            </div>
          ) : loadError || !article ? (
            <div className="tg-empty-state tg-article-not-found">
              <AlertCircle size={48} className="text-amber" style={{ margin: '0 auto 16px' }} />
              <h2>{loadError || 'Không tìm thấy bài viết'}</h2>
              <p style={{ maxWidth: '500px', margin: '8px auto 24px', color: '#64748B' }}>
                Bài viết bạn đang tìm kiếm có thể đã được chuyển đổi địa chỉ hoặc không tồn tại trên hệ thống.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => onNavigate('/')} className="tg-btn primary-solid">
                  <ArrowLeft size={16} />
                  <span>Quay lại trang chủ</span>
                </button>
                <button onClick={() => onNavigate('/#news')} className="tg-btn outline-btn">
                  <span>Xem các bài viết khác</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="main-content-layout">
              {/* Left Column: Full Article Content */}
              <article className="tg-article-main-container">
                {/* Article Header Card */}
                <header className="tg-article-page-header">
                  {/* Category & Language Bar */}
                  <div className="article-top-toolbar">
                    <div className="article-category-badge-wrap">
                      <span className="article-page-badge">
                        <Tag size={13} />
                        <span>{article.category?.name || 'Trần Gia Construction'}</span>
                      </span>

                      {/* In-Page Language Switcher if bilingual */}
                      {hasEnglish && (
                        <div className="article-bilingual-switcher">
                          <button
                            type="button"
                            onClick={() => setActiveLang('vi')}
                            className={`lang-switch-btn ${activeLang === 'vi' ? 'active' : ''}`}
                            title="Xem bản Tiếng Việt"
                          >
                            🇻🇳 Tiếng Việt
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveLang('en')}
                            className={`lang-switch-btn ${activeLang === 'en' ? 'active' : ''}`}
                            title="View English version"
                          >
                            🇬🇧 English
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Action Tools: Copy link, Print */}
                    <div className="article-quick-tools">
                      <button
                        onClick={handleCopyLink}
                        className={`article-tool-btn ${isCopied ? 'copied' : ''}`}
                        title="Sao chép liên kết bài viết"
                      >
                        {isCopied ? <Check size={14} /> : <Share2 size={14} />}
                        <span>{isCopied ? (activeLang === 'en' ? 'Copied' : 'Đã copy') : (activeLang === 'en' ? 'Share' : 'Chia sẻ')}</span>
                      </button>

                      <button
                        onClick={handlePrint}
                        className="article-tool-btn"
                        title="In bài viết"
                      >
                        <Printer size={14} />
                        <span>{activeLang === 'en' ? 'Print' : 'In bài'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Article Title */}
                  <h1 className="tg-article-main-title">{displayTitle}</h1>

                  {/* Article Metadata Bar */}
                  <div className="tg-article-meta-row">
                    <div className="meta-item">
                      <Calendar size={15} className="text-amber" />
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                    </div>

                    <div className="meta-item">
                      <User size={15} className="text-amber" />
                      <span>
                        {article.author?.fullName ||
                          article.author?.username ||
                          'Ban Truyền Thông Trần Gia'}
                      </span>
                    </div>

                    <div className="meta-item">
                      <Eye size={15} className="text-amber" />
                      <span>
                        {article.viewCount || 0} {t.news.views}
                      </span>
                    </div>

                    <div className="meta-item">
                      <Clock size={15} className="text-amber" />
                      <span>{calcReadingTime(displayContent || displaySummary)}</span>
                    </div>
                  </div>
                </header>

                {/* Featured Thumbnail */}
                {article.thumbnail && (
                  <div className="tg-article-hero-media">
                    <img
                      src={article.thumbnail}
                      alt={displayTitle}
                      className="tg-article-hero-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                )}

                {/* Lead Summary Excerpt Box */}
                {displaySummary && (
                  <div className="tg-article-lead-box">
                    <p className="lead-text">{displaySummary}</p>
                  </div>
                )}

                {/* Rich HTML Content Body */}
                <div
                  className="tg-article-body-content article-content-body"
                  dangerouslySetInnerHTML={{
                    __html: displayContent || '<p>Nội dung bài viết đang được cập nhật...</p>',
                  }}
                />

                {/* Article Footer & Sharing */}
                <div className="tg-article-page-footer">
                  <div className="article-tags-wrap">
                    <span className="tags-label">
                      <Tag size={15} className="text-amber" />
                      <span>{t.news.category}:</span>
                    </span>
                    <button
                      onClick={() => article.category && handleSelectCategory(article.category.slug)}
                      className="category-pill-btn"
                    >
                      {article.category?.name || 'Trần Gia'}
                    </button>
                  </div>

                  <div className="article-share-actions">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                      {t.news.share}:
                    </span>
                    <button
                      onClick={handleCopyLink}
                      className={`tg-btn ${isCopied ? 'primary-solid' : 'outline-btn'} small`}
                    >
                      {isCopied ? <Check size={14} /> : <Share2 size={14} />}
                      <span>{isCopied ? (activeLang === 'en' ? 'Copied' : 'Đã sao chép link') : t.news.share}</span>
                    </button>

                    <button
                      onClick={() => onNavigate('/#news')}
                      className="tg-btn outline-btn small"
                    >
                      <ArrowLeft size={14} />
                      <span>Quay lại Tin tức</span>
                    </button>
                  </div>
                </div>

                {/* Related Articles Section */}
                {relatedArticles.length > 0 && (
                  <div className="tg-related-articles-section">
                    <div className="related-header">
                      <h3 className="related-title">BÀI VIẾT LIÊN QUAN</h3>
                      <div className="related-divider"></div>
                    </div>

                    <div className="related-articles-grid">
                      {relatedArticles.map((relArt) => (
                        <NewsCard
                          key={relArt.id}
                          article={relArt}
                          onClick={handleArticleClick}
                          currentLang={activeLang}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Right Column: Sidebar */}
              <Sidebar
                recentArticles={recentArticles}
                categories={categories}
                selectedCategory={article.category?.slug || 'all'}
                onSelectCategory={handleSelectCategory}
                onSelectArticle={handleArticleClick}
                onSearch={handleSearch}
                company={siteSettings?.company}
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. Consultation & Contact Section */}
      <ContactSection />

      {/* 5. Footer */}
      <Footer
        settings={siteSettings}
        onNavigateSection={(sec) => onNavigate(`/#${sec}`)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Floating CTA & Scroll to Top */}
      <div className="tg-floating-actions">
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="tg-floating-profile-btn"
          title="Xem & Tải Hồ sơ năng lực PDF (36 trang)"
        >
          <FileText size={18} />
          <span>{t.header.profilePdf} PDF</span>
        </button>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="tg-scroll-top-btn"
            title="Lên đầu trang"
            aria-label="Lên đầu trang"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>

      {/* Profile Viewer Modal */}
      <ProfileViewerModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
