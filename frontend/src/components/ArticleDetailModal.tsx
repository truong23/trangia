import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Eye,
  Tag,
  User,
  Share2,
  Clock,
  Check,
} from 'lucide-react';
import { Article } from '../types';
import { Language, translations } from '../services/i18n';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  currentLang?: Language;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  currentLang = 'vi',
}) => {
  const [activeLang, setActiveLang] = useState<Language>(currentLang);
  const [isCopied, setIsCopied] = useState(false);

  // Sync language when article or currentLang changes
  useEffect(() => {
    setActiveLang(currentLang);
    setIsCopied(false);
  }, [currentLang, article?.id]);

  // Handle ESC key to close modal & lock body scroll
  useEffect(() => {
    if (!article) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [article, onClose]);

  if (!article) return null;

  const t = translations[activeLang];
  const hasEnglish = Boolean(article.titleEn && (article.contentEn || article.summaryEn));

  const displayTitle = activeLang === 'en' && article.titleEn ? article.titleEn : article.title;
  const displaySummary = activeLang === 'en' && article.summaryEn ? article.summaryEn : article.summary;
  const displayContent = activeLang === 'en' && article.contentEn ? article.contentEn : article.content;

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
      const url = `${window.location.origin}${window.location.pathname}?article=${article.slug}`;
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

  return (
    <div className="tg-modal-overlay article-modal-overlay modal-overlay" onClick={onClose}>
      <div
        className="tg-modal-box article-modal-box modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Sticky Header */}
        <div className="article-modal-header modal-header">
          <div className="article-modal-header-left">
            <span className="article-modal-category-badge">
              <Tag size={13} />
              <span>{article.category?.name || 'Trần Gia News'}</span>
            </span>

            {/* In-Modal Language Switcher if bilingual */}
            {hasEnglish && (
              <div className="article-modal-lang-toggle">
                <button
                  type="button"
                  onClick={() => setActiveLang('vi')}
                  className={`modal-lang-pill ${activeLang === 'vi' ? 'active' : ''}`}
                  title="Xem bản Tiếng Việt"
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang('en')}
                  className={`modal-lang-pill ${activeLang === 'en' ? 'active' : ''}`}
                  title="View English version"
                >
                  🇬🇧 English
                </button>
              </div>
            )}
          </div>

          <div className="article-modal-header-actions">
            <button
              type="button"
              onClick={handleCopyLink}
              className={`article-modal-share-btn ${isCopied ? 'copied' : ''}`}
              title="Sao chép liên kết bài viết"
            >
              {isCopied ? <Check size={15} /> : <Share2 size={15} />}
              <span>
                {isCopied
                  ? activeLang === 'en'
                    ? 'Link Copied!'
                    : 'Đã sao chép!'
                  : activeLang === 'en'
                  ? 'Share'
                  : 'Chia sẻ'}
              </span>
            </button>

            <button
              type="button"
              className="article-modal-close-btn modal-close-btn"
              onClick={onClose}
              aria-label="Đóng bài viết"
              title="Đóng bài viết (Phím Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="article-modal-body modal-body">
          {/* Article Title & Meta Header */}
          <div className="article-detail-header">
            <h1 className="article-detail-title">{displayTitle}</h1>

            <div className="article-detail-meta-bar">
              <div className="meta-bar-item">
                <Calendar size={15} className="text-amber" />
                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              </div>
              <div className="meta-bar-item">
                <User size={15} className="text-amber" />
                <span>
                  {article.author?.fullName ||
                    article.author?.username ||
                    'Ban Truyền Thông Trần Gia'}
                </span>
              </div>
              <div className="meta-bar-item">
                <Eye size={15} className="text-amber" />
                <span>
                  {article.viewCount || 0} {t.news.views}
                </span>
              </div>
              <div className="meta-bar-item">
                <Clock size={15} className="text-amber" />
                <span>{calcReadingTime(displayContent || displaySummary)}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {article.thumbnail && (
            <div className="article-featured-image-box">
              <img
                src={article.thumbnail}
                alt={displayTitle}
                className="article-featured-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>
          )}

          {/* Lead / Summary Box */}
          {displaySummary && (
            <div className="article-lead-box">
              <p className="article-lead-text">{displaySummary}</p>
            </div>
          )}

          {/* Full Article Content Body */}
          <div
            className="article-content-body"
            dangerouslySetInnerHTML={{
              __html: displayContent || '<p>Nội dung đang được cập nhật...</p>',
            }}
          />

          {/* Article Footer & Consultation Actions */}
          <div className="article-detail-footer">
            <div className="article-footer-tags">
              <span className="footer-tag-label">
                <Tag size={14} className="text-amber" />
                <span>{t.news.category}:</span>
              </span>
              <span className="footer-tag-name">
                {article.category?.name || 'Trần Gia Construction'}
              </span>
            </div>

            <div className="article-footer-actions">
              <button
                type="button"
                onClick={handleCopyLink}
                className={`tg-btn ${isCopied ? 'primary-solid' : 'outline-btn'} small`}
              >
                {isCopied ? <Check size={15} /> : <Share2 size={15} />}
                <span>
                  {isCopied
                    ? activeLang === 'en'
                      ? 'Link Copied!'
                      : 'Đã sao chép link'
                    : t.news.share}
                </span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="tg-btn outline-btn small"
              >
                <span>{activeLang === 'en' ? 'Close' : 'Đóng cửa sổ'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
