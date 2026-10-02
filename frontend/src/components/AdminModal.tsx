import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, Lock, Shield, CheckCircle, FolderPlus } from 'lucide-react';
import { Article, Category, User } from '../types';
import { api } from '../services/api';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginSuccess: (user: User) => void;
  articles: Article[];
  categories: Category[];
  onRefreshData: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  articles,
  categories,
  onRefreshData,
}) => {
  if (!isOpen) return null;

  // Tab: 'login' | 'articles' | 'new-article' | 'categories'
  const [activeTab, setActiveTab] = useState<'login' | 'articles' | 'new-article' | 'categories'>(
    currentUser ? 'articles' : 'login',
  );

  // Login form state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('Admin@123');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New article form state
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSummary, setArticleSummary] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleThumbnail, setArticleThumbnail] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=1200&q=80',
  );
  const [articleCategoryId, setArticleCategoryId] = useState(
    categories[0]?.id || '',
  );

  // New category form state
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    try {
      const res = await api.login({ username: loginUsername, password: loginPassword });
      onLoginSuccess(res.user);
      setActiveTab('articles');
    } catch (err: any) {
      setLoginError(err.message || 'Sai tên đăng nhập hoặc mật khẩu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle || !articleSummary || !articleContent) {
      alert('Vui lòng điền đầy đủ tiêu đề, tóm tắt và nội dung!');
      return;
    }
    setIsSubmitting(true);
    try {
      await api.createArticle({
        title: articleTitle,
        summary: articleSummary,
        content: articleContent,
        thumbnail: articleThumbnail,
        categoryId: articleCategoryId || undefined,
        status: 'published',
      });
      alert('Đã xuất bản bài viết thành công!');
      // Reset form
      setArticleTitle('');
      setArticleSummary('');
      setArticleContent('');
      setActiveTab('articles');
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo bài viết');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    try {
      await api.deleteArticle(id);
      alert('Đã xóa bài viết thành công!');
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa bài viết');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName) {
      alert('Vui lòng nhập tên danh mục');
      return;
    }
    setIsSubmitting(true);
    try {
      await api.createCategory({ name: catName, description: catDesc });
      alert('Tạo danh mục thành công!');
      setCatName('');
      setCatDesc('');
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo danh mục');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} color="#4DBCE6" />
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#4DBCE6' }}>
              DELTA CMS Portal
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs if logged in */}
        {currentUser && (
          <div
            style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 24px',
              background: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <button
              onClick={() => setActiveTab('articles')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                background: activeTab === 'articles' ? '#4DBCE6' : 'transparent',
                color: activeTab === 'articles' ? '#FFF' : 'var(--gray-600, #475569)',
              }}
            >
              Danh sách bài viết ({articles.length})
            </button>
            <button
              onClick={() => setActiveTab('new-article')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: activeTab === 'new-article' ? '#4DBCE6' : 'transparent',
                color: activeTab === 'new-article' ? '#FFF' : 'var(--gray-600, #475569)',
              }}
            >
              <Plus size={16} />
              Đăng bài mới
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: activeTab === 'categories' ? '#4DBCE6' : 'transparent',
                color: activeTab === 'categories' ? '#FFF' : 'var(--gray-600, #475569)',
              }}
            >
              <FolderPlus size={16} />
              Quản lý danh mục
            </button>
          </div>
        )}

        <div className="modal-body">
          {/* TAB 1: LOGIN */}
          {!currentUser && (
            <div style={{ maxWidth: '420px', margin: '20px auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Lock size={36} color="#4DBCE6" style={{ margin: '0 auto 8px' }} />
                <h3 style={{ fontSize: '20px', color: '#4DBCE6', fontWeight: 700 }}>
                  Đăng nhập Quản trị viên
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--gray-500, #64748B)' }}>
                  Sử dụng tài khoản quản trị mặc định: <strong>admin</strong> / <strong>Admin@123</strong>
                </p>
              </div>

              {loginError && (
                <div
                  style={{
                    background: '#FEE2E2',
                    border: '1px solid #F87171',
                    color: '#B91C1C',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}
                >
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label">Tên đăng nhập hoặc Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '10px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xác thực JWT...' : 'Đăng nhập vào CMS'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: ARTICLES LIST */}
          {currentUser && activeTab === 'articles' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', color: '#4DBCE6', fontWeight: 700 }}>
                  Quản lý tất cả tin bài ({articles.length})
                </h4>
                <button
                  onClick={() => setActiveTab('new-article')}
                  className="btn-accent"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px' }}
                >
                  <Plus size={14} /> Thêm bài viết mới
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ background: '#F1F5F9', textAlign: 'left', borderBottom: '2px solid #CBD5E1' }}>
                      <th style={{ padding: '12px' }}>Hình ảnh</th>
                      <th style={{ padding: '12px' }}>Tiêu đề</th>
                      <th style={{ padding: '12px' }}>Chuyên mục</th>
                      <th style={{ padding: '12px' }}>Trạng thái</th>
                      <th style={{ padding: '12px' }}>Lượt xem</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((art) => (
                      <tr key={art.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <td style={{ padding: '10px 12px' }}>
                          <img
                            src={art.thumbnail || 'https://via.placeholder.com/80'}
                            alt=""
                            style={{ width: '60px', height: '42px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--gray-800, #1E293B)', maxWidth: '300px' }}>
                          {art.title}
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--gray-500, #64748B)' }}>
                          {art.category?.name || 'Chung'}
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              background: art.status === 'published' ? '#DEF7EC' : '#FEF08A',
                              color: art.status === 'published' ? '#03543F' : '#854D0E',
                            }}
                          >
                            {art.status === 'published' ? 'Đã đăng' : 'Bản nháp'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', color: 'var(--gray-500, #64748B)' }}>
                          {art.viewCount || 0}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            style={{
                              color: '#EF4444',
                              padding: '6px',
                              borderRadius: '4px',
                              background: '#FEE2E2',
                            }}
                            title="Xóa bài viết"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: NEW ARTICLE */}
          {currentUser && activeTab === 'new-article' && (
            <form onSubmit={handleCreateArticle}>
              <h4 style={{ fontSize: '16px', color: '#4DBCE6', fontWeight: 700, marginBottom: '16px' }}>
                Đăng bài viết mới lên Delta News Portal
              </h4>

              <div className="form-group">
                <label className="form-label">Tiêu đề bài viết (*)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: DELTA Group khởi công dự án mới..."
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Chuyên mục bài viết</label>
                  <select
                    className="form-control"
                    value={articleCategoryId}
                    onChange={(e) => setArticleCategoryId(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ảnh đại diện (Thumbnail URL)</label>
                  <input
                    type="url"
                    className="form-control"
                    value={articleThumbnail}
                    onChange={(e) => setArticleThumbnail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tóm tắt ngắn (Excerpt) (*)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Đoạn tóm tắt hiển thị trên thẻ bài viết..."
                  value={articleSummary}
                  onChange={(e) => setArticleSummary(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nội dung bài viết (HTML / Text) (*)</label>
                <textarea
                  className="form-control"
                  rows={8}
                  placeholder="Nhập nội dung bài viết. Bạn có thể sử dụng các thẻ <p>, <h3>, <blockquote>..."
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    color: 'var(--gray-600, #475569)',
                    fontWeight: 600,
                  }}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang xuất bản...' : 'Xuất bản bài viết ngay'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: CATEGORIES */}
          {currentUser && activeTab === 'categories' && (
            <div>
              <h4 style={{ fontSize: '16px', color: '#4DBCE6', fontWeight: 700, marginBottom: '16px' }}>
                Quản lý Chuyên mục
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Category List */}
                <div>
                  <h5 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--gray-700, #334155)' }}>
                    Danh sách chuyên mục hiện tại
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {categories.map((cat) => (
                      <li
                        key={cat.id}
                        style={{
                          padding: '10px 14px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '13.5px',
                        }}
                      >
                        <div>
                          <strong>{cat.name}</strong>
                          <div style={{ fontSize: '12px', color: '#94A3B8' }}>slug: {cat.slug}</div>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--gray-500, #64748B)' }}>
                          {cat.articleCount || 0} bài
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add New Category */}
                <form onSubmit={handleCreateCategory} style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px' }}>
                  <h5 style={{ fontSize: '14px', marginBottom: '12px', color: '#4DBCE6', fontWeight: 700 }}>
                    Thêm chuyên mục mới
                  </h5>
                  <div className="form-group">
                    <label className="form-label">Tên chuyên mục (*)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="VD: Bản tin Video"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="Mô tả nội dung chuyên mục..."
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-accent" style={{ width: '100%' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Đang thêm...' : 'Tạo chuyên mục'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
