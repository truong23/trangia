import React from 'react';
import { Article } from '../types';

interface NewsCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const getBadgeDate = (dateStr?: string) => {
    const d = dateStr ? new Date(dateStr) : new Date();
    const day = isNaN(d.getDate()) ? '--' : d.getDate().toString().padStart(2, '0');
    const month = isNaN(d.getMonth()) ? '--' : `Th${d.getMonth() + 1}`;
    return { day, month };
  };

  const { day, month } = getBadgeDate(article.publishedAt || article.createdAt);

  return (
    <div className="delta-post-card" onClick={() => onClick(article)}>
      <div className="card-image-box">
        {/* Date Badge Delta Group Style */}
        <div className="date-badge">
          <span className="badge-day">{day}</span>
          <span className="badge-month">{month}</span>
        </div>

        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt={article.title}
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
              background: '#0B2240',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FE7B00',
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
        <h3 className="post-title" title={article.title}>
          {article.title}
        </h3>
        <div className="post-divider"></div>
        <p className="post-excerpt">{article.summary}</p>
      </div>
    </div>
  );
};

