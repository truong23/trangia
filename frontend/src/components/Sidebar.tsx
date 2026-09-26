import React, { useState } from 'react';
import { Search, ChevronRight, PhoneCall, Mail } from 'lucide-react';
import { Article, Category, SiteSettings } from '../types';

interface SidebarProps {
  recentArticles: Article[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  onSelectArticle: (article: Article) => void;
  onSearch: (query: string) => void;
  company?: SiteSettings['company'];
}

export const Sidebar: React.FC<SidebarProps> = ({
  recentArticles,
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectArticle,
  onSearch,
  company,
}) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  const hotlinePhone = company?.hotline || company?.phone || '0986 078 270';
  const hotlineEmail = company?.email || 'trangia.kt69@gmail.com';

  return (
    <aside className="delta-sidebar">
      {/* 1. Search Widget */}
      <div className="sidebar-box search-widget-box">
        <form onSubmit={handleSearch} className="sidebar-search-form">
          <input
            type="text"
            className="search-input-field"
            placeholder="Tìm kiếm bài viết..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="search-submit-btn" aria-label="Tìm kiếm">
            <Search size={16} />
          </button>
        </form>
      </div>

      {/* 2. Recent Posts Widget */}
      <div className="sidebar-box">
        <h3 className="sidebar-title">BÀI VIẾT MỚI</h3>
        <div className="recent-posts-list">
          {recentArticles.map((item) => (
            <div
              key={item.id}
              className="recent-post-row"
              onClick={() => onSelectArticle(item)}
            >
              <img
                src={
                  item.thumbnail ||
                  'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=400&q=80'
                }
                alt={item.title}
                className="recent-post-thumb"
              />
              <div className="recent-post-detail">
                <h4 className="recent-post-title">{item.title}</h4>
                <span className="recent-post-date">{formatDate(item.publishedAt || item.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Categories Widget */}
      <div className="sidebar-box">
        <h3 className="sidebar-title">CHUYÊN MỤC TRẦN GIA</h3>
        <ul className="category-menu-list">
          <li className={selectedCategory === 'all' ? 'active' : ''}>
            <button onClick={() => onSelectCategory('all')}>
              <ChevronRight size={14} className="cat-arrow" />
              <span>Tất cả tin tức</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id} className={selectedCategory === cat.slug ? 'active' : ''}>
              <button onClick={() => onSelectCategory(cat.slug)}>
                <ChevronRight size={14} className="cat-arrow" />
                <span>{cat.name}</span>
                {cat.articleCount !== undefined && (
                  <span className="cat-badge-count">({cat.articleCount})</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Tran Gia Hotline Widget */}
      <div className="sidebar-box hotline-box">
        <div className="hotline-header">
          <PhoneCall size={24} color="#FE7B00" />
          <span>TỔNG ĐÀI TRẦN GIA</span>
        </div>
        <div className="hotline-phone-number">{hotlinePhone}</div>
        <div className="hotline-email-row">
          <Mail size={14} color="#94A3B8" />
          <span>{hotlineEmail}</span>
        </div>
      </div>
    </aside>
  );
};

