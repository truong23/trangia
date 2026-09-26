import React from 'react';
import { X, Calendar, Eye, Tag, User, Share2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
}) => {
  if (!article) return null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#FE7B00', textTransform: 'uppercase' }}>
            {article.category?.name || 'Tin tức DELTA'}
          </span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="article-detail-header">
            <h2 className="article-detail-title">{article.title}</h2>
            <div className="article-detail-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="#64748B" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="#64748B" />
                {article.author?.fullName || article.author?.username || 'Ban Biên Tập DELTA'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={14} color="#64748B" />
                {article.viewCount} lượt xem
              </span>
            </div>
          </div>

          {article.thumbnail && (
            <div style={{ marginBottom: '24px', borderRadius: '10px', overflow: 'hidden' }}>
              <img
                src={article.thumbnail}
                alt={article.title}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
              />
            </div>
          )}

          {article.summary && (
            <div className="article-lead">
              {article.summary}
            </div>
          )}

          <div
            className="article-content-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div
            style={{
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
              <Tag size={14} color="#FE7B00" />
              <span>Chuyên mục: <strong>{article.category?.name || 'Tin tức'}</strong></span>
            </div>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Đã sao chép liên kết bài viết vào clipboard!');
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#F1F5F9',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#334155',
              }}
            >
              <Share2 size={14} />
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
