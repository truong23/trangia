import React from 'react';
import { Article } from '../types';
import { Language } from '../services/i18n';
import { Globe } from 'lucide-react';

interface NewsCardProps {
  article: Article;
  onClick: (article: Article) => void;
  currentLang?: Language;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick, currentLang = 'vi' }) => {
  const getBadgeDate = (dateStr?: string) => {
    const d = dateStr ? new Date(dateStr) : new Date();
    const day = isNaN(d.getDate()) ? '--' : d.getDate().toString().padStart(2, '0');
    const month =
      currentLang === 'en'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()] || 'M'
        : isNaN(d.getMonth())
        ? '--'
        : `Th${d.getMonth() + 1}`;
    return { day, month };
  };

  const { day, month } = getBadgeDate(article.publishedAt || article.createdAt);

  const displayTitle = currentLang === 'en' && article.titleEn ? article.titleEn : article.title;
  const displaySummary = currentLang === 'en' && article.summaryEn ? article.summaryEn : article.summary;
  const hasBilingual = Boolean(article.titleEn && article.contentEn);

  return (
    <div className="delta-post-card" onClick={() => onClick(article)}>
      <div className="card-image-box">
        {/* Date Badge */}
        <div className="date-badge">
          <span className="badge-day">{day}</span>
          <span className="badge-month">{month}</span>
        </div>

        {/* Language Badge */}
        {hasBilingual && (
          <div className="card-lang-badge" title="Bài viết có song ngữ Việt - Anh">
            <Globe size={11} />
            <span>VI / EN</span>
          </div>
        )}

        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt={displayTitle}
            className="post-thumbnail"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=800&q=80';
            }}
          />
        ) : (
          <div
            className="post-thumbnail"
            style={{
              background: '#26A9E0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            TRẦN GIA
          </div>
        )}
      </div>

      <div className="card-text-box">
        {article.category && (
          <span className="post-category-tag">{article.category.name}</span>
        )}
        <h3 className="post-title" title={displayTitle}>
          {displayTitle}
        </h3>
        <div className="post-divider"></div>
        <p className="post-excerpt">{displaySummary}</p>
      </div>
    </div>
  );
};
