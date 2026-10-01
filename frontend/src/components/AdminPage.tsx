import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutDashboard,
  FileText,
  FolderPlus,
  PlusCircle,
  LogOut,
  ExternalLink,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Search,
  Lock,
  UserCheck,
  TrendingUp,
  Layers,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Settings,
  Users,
  KeyRound,
  Mail,
  Eye,
  EyeOff,
  UserPlus,
  ShieldAlert,
  Send,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { Article, Category, User, SiteSettings } from '../types';
import { api } from '../services/api';
import { AdminJobsTab } from './AdminJobsTab';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => api.getCurrentUser());
  const [activeTab, setActiveTab] = useState<
    'overview' | 'articles' | 'editor' | 'categories' | 'jobs' | 'users' | 'security' | 'settings'
  >('overview');

  // Login form state
  const [authMode, setAuthMode] = useState<'login' | 'forgot' | 'reset-otp'>('login');
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('Admin@123');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Forgot Password / Reset OTP state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');
  const [otpSentMessage, setOtpSentMessage] = useState('');
  const [isSubmittingForgot, setIsSubmittingForgot] = useState(false);

  // Data states
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Filter & Search in articles list
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('all');

  // Filter in users list
  const [userSearch, setUserSearch] = useState('');

  // Editor Form State (Create or Edit Article)
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formThumbnail, setFormThumbnail] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f3?auto=format&fit=crop&w=1200&q=80',
  );
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [isSavingArticle, setIsSavingArticle] = useState(false);

  // Category Form State
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [isSavingCat, setIsSavingCat] = useState(false);

  // User Form State (Add or Edit User)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userFormFullName, setUserFormFullName] = useState('');
  const [userFormUsername, setUserFormUsername] = useState('');
  const [userFormEmail, setUserFormEmail] = useState('');
  const [userFormRole, setUserFormRole] = useState<'admin' | 'editor' | 'user'>('editor');
  const [userFormStatus, setUserFormStatus] = useState<'active' | 'inactive'>('active');
  const [userFormPassword, setUserFormPassword] = useState('');
  const [isSavingUser, setIsSavingUser] = useState(false);

  // Change Password Form State (Personal Account)
  const [currentOldPass, setCurrentOldPass] = useState('');
  const [currentNewPass, setCurrentNewPass] = useState('');
  const [currentConfirmPass, setCurrentConfirmPass] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Settings Form State
  const [settingsCompany, setSettingsCompany] = useState({
    name: '',
    shortName: '',
    logo: '',
    whiteLogo: '',
    phone: '',
    hotline: '',
    fax: '',
    email: '',
    address: '',
    website: '',
    slogan: '',
    director: '',
  });
  const [settingsHero, setSettingsHero] = useState({
    title: '',
    subtext: '',
    feedbackEmail: '',
    backgroundImage: '',
      recruitmentBanner: '',
  });
  const [settingsFooter, setSettingsFooter] = useState({
    introHeading: '',
    fieldsHeading: '',
    newsletterHeading: '',
    newsletterText: '',
    copyright: '',
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Success / Error alert message
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Load all data for Admin
  const loadAdminData = async () => {
    setIsLoadingData(true);
    try {
      const [cats, artsRes, cfg, users] = await Promise.all([
        api.getCategories().catch(() => []),
        api.getArticles({ limit: 100 }).catch(() => ({ items: [], pagination: { total: 0, page: 1, limit: 100, totalPages: 1 } })),
        api.getSettings().catch(() => null),
        api.getUsers().catch(() => []),
      ]);
      setCategories(cats);
      setArticles(artsRes.items);
      setUsersList(users);
      if (cats.length > 0 && !formCategoryId) {
        setFormCategoryId(cats[0].id);
      }
      if (cfg) {
        setSiteSettings(cfg);
        setSettingsCompany({
          name: cfg.company?.name || '',
          shortName: cfg.company?.shortName || '',
          logo: cfg.company?.logo || '',
          whiteLogo: cfg.company?.whiteLogo || '',
          phone: cfg.company?.phone || '',
          hotline: cfg.company?.hotline || '',
          fax: cfg.company?.fax || '',
          email: cfg.company?.email || '',
          address: cfg.company?.address || '',
          website: cfg.company?.website || '',
          slogan: cfg.company?.slogan || '',
          director: cfg.company?.director || '',
        });
        setSettingsHero({
          title: cfg.heroBanner?.title || '',
          subtext: cfg.heroBanner?.subtext || '',
          feedbackEmail: cfg.heroBanner?.feedbackEmail || '',
          backgroundImage: cfg.heroBanner?.backgroundImage || '',
            recruitmentBanner: cfg.heroBanner?.recruitmentBanner || '',
        });
        setSettingsFooter({
          introHeading: cfg.footer?.introHeading || '',
          fieldsHeading: cfg.footer?.fieldsHeading || '',
          newsletterHeading: cfg.footer?.newsletterHeading || '',
          newsletterText: cfg.footer?.newsletterText || '',
          copyright: cfg.footer?.copyright || '',
        });
      }
    } catch (err: any) {
      console.error('Lỗi khi tải dữ liệu admin:', err);
      showToast('error', 'Không thể kết nối đến cơ sở dữ liệu');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadAdminData();
    }
  }, [currentUser]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await api.login({ username: loginUsername, password: loginPassword });
      setCurrentUser(res.user);
      showToast('success', `Đăng nhập thành công! Chào mừng ${res.user.fullName || res.user.username}`);
    } catch (err: any) {
      setLoginError(err.message || 'Tên đăng nhập hoặc mật khẩu không chính xác');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setAuthMode('login');
    showToast('success', 'Đã đăng xuất khỏi phiên làm việc');
  };

  // Forgot Password: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      showToast('error', 'Vui lòng nhập địa chỉ email hoặc tên đăng nhập');
      return;
    }
    setIsSubmittingForgot(true);
    try {
      const res = await api.forgotPassword(forgotEmail.trim());
      setOtpSentMessage(res.message);
      if (res.otp) {
        setForgotOtp(res.otp); // Pre-fill OTP for test convenience
      }
      setAuthMode('reset-otp');
      showToast('success', 'Mã xác nhận OTP đã được gửi đến email!');
    } catch (err: any) {
      showToast('error', err.message || 'Không tìm thấy tài khoản với email này');
    } finally {
      setIsSubmittingForgot(false);
    }
  };

  // Reset Password with OTP
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotOtp.trim()) {
      showToast('error', 'Vui lòng nhập mã OTP xác nhận');
      return;
    }
    if (newResetPassword.length < 6) {
      showToast('error', 'Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newResetPassword !== confirmResetPassword) {
      showToast('error', 'Mật khẩu xác nhận không khớp');
      return;
    }

    setIsSubmittingForgot(true);
    try {
      const res = await api.resetPassword({
        email: forgotEmail.trim(),
        otp: forgotOtp.trim(),
        newPassword: newResetPassword,
      });
      showToast('success', res.message || 'Đặt lại mật khẩu thành công!');
      setAuthMode('login');
      setLoginPassword(newResetPassword);
      setForgotOtp('');
      setNewResetPassword('');
      setConfirmResetPassword('');
    } catch (err: any) {
      showToast('error', err.message || 'Mã OTP không đúng hoặc đã hết hạn');
    } finally {
      setIsSubmittingForgot(false);
    }
  };

  // Change Password for Logged-in User
  const handleChangePersonalPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentNewPass.length < 6) {
      showToast('error', 'Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (currentNewPass !== currentConfirmPass) {
      showToast('error', 'Mật khẩu xác nhận không trùng khớp');
      return;
    }

    setIsChangingPass(true);
    try {
      await api.changePassword({
        oldPassword: currentOldPass,
        newPassword: currentNewPass,
      });
      showToast('success', 'Đổi mật khẩu thành công! Mật khẩu mới đã được lưu.');
      setCurrentOldPass('');
      setCurrentNewPass('');
      setCurrentConfirmPass('');
    } catch (err: any) {
      showToast('error', err.message || 'Mật khẩu hiện tại không chính xác');
    } finally {
      setIsChangingPass(false);
    }
  };

  // User CRUD handlers
  const handleOpenCreateUser = () => {
    setEditingUserId(null);
    setUserFormFullName('');
    setUserFormUsername('');
    setUserFormEmail('');
    setUserFormRole('editor');
    setUserFormStatus('active');
    setUserFormPassword('');
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (u: User) => {
    setEditingUserId(u.id);
    setUserFormFullName(u.fullName || '');
    setUserFormUsername(u.username);
    setUserFormEmail(u.email);
    setUserFormRole(u.role || 'user');
    setUserFormStatus((u as any).status || 'active');
    setUserFormPassword('');
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormUsername || !userFormEmail) {
      showToast('error', 'Vui lòng nhập đầy đủ tên đăng nhập và email');
      return;
    }
    if (!editingUserId && (!userFormPassword || userFormPassword.length < 6)) {
      showToast('error', 'Mật khẩu khởi tạo phải từ 6 ký tự trở lên');
      return;
    }

    setIsSavingUser(true);
    try {
      if (editingUserId) {
        // Update user
        const updatePayload: any = {
          fullName: userFormFullName,
          username: userFormUsername,
          email: userFormEmail,
          role: userFormRole,
          status: userFormStatus,
        };
        if (userFormPassword.trim()) {
          updatePayload.password = userFormPassword.trim();
        }
        await api.updateUser(editingUserId, updatePayload);
        showToast('success', 'Đã cập nhật tài khoản thành công!');
      } else {
        // Create user
        await api.createUser({
          fullName: userFormFullName,
          username: userFormUsername,
          email: userFormEmail,
          role: userFormRole,
          status: userFormStatus,
          password: userFormPassword,
        });
        showToast('success', 'Đã thêm tài khoản người dùng mới thành công!');
      }
      setIsUserModalOpen(false);
      const updatedUsers = await api.getUsers();
      setUsersList(updatedUsers);
    } catch (err: any) {
      showToast('error', err.message || 'Thao tác tài khoản thất bại');
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleDeleteUser = async (u: User) => {
    if (u.username === 'admin') {
      showToast('error', 'Không thể xóa tài khoản quản trị viên mặc định (admin)');
      return;
    }
    if (u.id === currentUser?.id) {
      showToast('error', 'Không thể xóa tài khoản đang đăng nhập');
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${u.fullName || u.username}" (${u.email})?`)) {
      try {
        await api.deleteUser(u.id);
        showToast('success', 'Đã xóa tài khoản thành công');
        setUsersList((prev) => prev.filter((item) => item.id !== u.id));
      } catch (err: any) {
        showToast('error', err.message || 'Xóa tài khoản thất bại');
      }
    }
  };

  // Article Save handler
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent) {
      showToast('error', 'Vui lòng nhập tiêu đề và nội dung bài viết');
      return;
    }
    setIsSavingArticle(true);
    try {
      if (editingArticleId) {
        await api.updateArticle(editingArticleId, {
          title: formTitle,
          summary: formSummary,
          content: formContent,
          thumbnail: formThumbnail,
          categoryId: formCategoryId || undefined,
          status: formStatus,
          isFeatured: formIsFeatured,
        });
        showToast('success', 'Cập nhật bài viết thành công!');
      } else {
        await api.createArticle({
          title: formTitle,
          summary: formSummary,
          content: formContent,
          thumbnail: formThumbnail,
          categoryId: formCategoryId || undefined,
          status: formStatus,
          isFeatured: formIsFeatured,
        });
        showToast('success', 'Tạo bài viết mới thành công!');
      }
      const artsRes = await api.getArticles({ limit: 100 });
      setArticles(artsRes.items);
      setActiveTab('articles');
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi lưu bài viết');
    } finally {
      setIsSavingArticle(false);
    }
  };

  // Settings Save handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const updated = await api.updateSettings({
        company: settingsCompany as any,
        heroBanner: settingsHero,
        footer: {
          ...siteSettings?.footer,
          ...settingsFooter,
        } as any,
      });
      setSiteSettings(updated);
      showToast('success', 'Cập nhật thông tin công ty & cấu hình thành công!');
    } catch (err: any) {
      showToast('error', err.message || 'Lỗi khi lưu cấu hình');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // ==========================================================
  // VIEW 1: AUTHENTICATION SCREEN (LOGIN / FORGOT PASSWORD / OTP)
  // ==========================================================
  if (!currentUser) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo-box">
              <Shield size={32} color="#FE7B00" />
            </div>
            <h2>TRẦN GIA CMS ADMIN</h2>
            <p className="login-subtitle">
              {authMode === 'login'
                ? 'Hệ thống Quản trị Nội dung & Tài khoản Trần Gia Construction'
                : authMode === 'forgot'
                ? 'Khôi phục & Đặt lại mật khẩu qua Email'
                : 'Nhập mã OTP & Tạo mật khẩu mới'}
            </p>
          </div>

          {loginError && (
            <div className="login-alert error">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          {toastMessage && (
            <div className={`login-alert ${toastMessage.type}`}>
              {toastMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{toastMessage.text}</span>
            </div>
          )}

          {/* 1.1 LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Tên đăng nhập / Email</label>
                <input
                  type="text"
                  required
                  placeholder="admin hoặc email..."
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <div className="label-with-action">
                  <label>Mật khẩu</label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot');
                      setForgotEmail(loginUsername.includes('@') ? loginUsername : 'trangia.kt69@gmail.com');
                      setLoginError('');
                    }}
                    className="forgot-pass-link"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isLoggingIn} className="login-submit-btn">
                {isLoggingIn ? <RefreshCw size={18} className="animate-spin" /> : <Lock size={18} />}
                <span>{isLoggingIn ? 'Đang xác thực...' : 'ĐĂNG NHẬP HỆ THỐNG'}</span>
              </button>

              <div className="login-footer-actions">
                <button type="button" onClick={() => onNavigate('/')} className="back-to-home-link">
                  <ArrowLeft size={15} />
                  <span>Về trang chủ Trần Gia</span>
                </button>
              </div>

              <div className="login-credentials-hint">
                <span>Tài khoản quản trị mặc định:</span>
                <code>admin</code> / <code>Admin@123</code>
              </div>
            </form>
          )}

          {/* 1.2 FORGOT PASSWORD FORM (STEP 1: REQUEST OTP) */}
          {authMode === 'forgot' && (
            <form onSubmit={handleRequestOtp} className="login-form">
              <div className="form-group">
                <label>Địa chỉ Email hoặc Tên đăng nhập</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="trangia.kt69@gmail.com..."
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    autoFocus
                  />
                </div>
                <p className="field-hint">
                  Hệ thống sẽ gửi mã xác thực 6 chữ số (OTP) đến địa chỉ email này để bạn đặt lại mật khẩu mới.
                </p>
              </div>

              <button type="submit" disabled={isSubmittingForgot} className="login-submit-btn">
                {isSubmittingForgot ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
                <span>{isSubmittingForgot ? 'Đang gửi mã...' : 'GỬI MÃ OTP QUA EMAIL'}</span>
              </button>

              <div className="login-footer-actions">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="back-to-home-link"
                >
                  <ArrowLeft size={15} />
                  <span>Quay lại đăng nhập</span>
                </button>
              </div>
            </form>
          )}

          {/* 1.3 RESET PASSWORD FORM (STEP 2: ENTER OTP & NEW PASSWORD) */}
          {authMode === 'reset-otp' && (
            <form onSubmit={handleResetPassword} className="login-form">
              {otpSentMessage && (
                <div className="otp-sent-banner">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <p>{otpSentMessage}</p>
                </div>
              )}

              <div className="form-group">
                <label>Mã xác thực OTP (6 số)</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập 6 số OTP..."
                  value={forgotOtp}
                  onChange={(e) => setForgotOtp(e.target.value)}
                  maxLength={6}
                  style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  placeholder="Ít nhất 6 ký tự..."
                  value={newResetPassword}
                  onChange={(e) => setNewResetPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập lại mật khẩu mới..."
                  value={confirmResetPassword}
                  onChange={(e) => setConfirmResetPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isSubmittingForgot} className="login-submit-btn">
                {isSubmittingForgot ? <RefreshCw size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                <span>{isSubmittingForgot ? 'Đang cập nhật...' : 'XÁC NHẬN & ĐỔI MẬT KHẨU'}</span>
              </button>

              <div className="login-footer-actions">
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className="back-to-home-link"
                >
                  <ArrowLeft size={15} />
                  <span>Gửi lại mã OTP khác</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredArticles = articles.filter((a) => {
    const matchSearch =
      !articleSearch ||
      a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      a.summary.toLowerCase().includes(articleSearch.toLowerCase());
    const matchCat = articleCategoryFilter === 'all' || a.categoryId === articleCategoryFilter;
    return matchSearch && matchCat;
  });

  const filteredUsers = usersList.filter((u) => {
    if (!userSearch) return true;
    const term = userSearch.toLowerCase();
    return (
      u.username.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      (u.fullName && u.fullName.toLowerCase().includes(term))
    );
  });

  return (
    <div className="admin-portal-wrapper">
      {/* Toast Alert */}
      {toastMessage && (
        <div className={`admin-toast-alert ${toastMessage.type}`}>
          {toastMessage.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
          <Shield size={28} color="#FE7B00" />
          <div className="admin-brand-text">
            <h3>TRẦN GIA CMS</h3>
            <span>Quản trị hệ thống</span>
          </div>
        </div>

        <div className="admin-user-badge">
          <div className="user-avatar">
            {(currentUser.fullName || currentUser.username).charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <strong>{currentUser.fullName || currentUser.username}</strong>
            <span className="user-role-tag">{currentUser.role.toUpperCase()}</span>
          </div>
        </div>

        <nav className="admin-nav-menu">
          <button
            onClick={() => setActiveTab('overview')}
            className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Tổng quan hệ thống</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`admin-nav-btn ${activeTab === 'articles' ? 'active' : ''}`}
          >
            <FileText size={18} />
            <span>Quản lý bài viết</span>
            <span className="nav-badge-count">{articles.length}</span>
          </button>

          <button
            onClick={() => {
              setEditingArticleId(null);
              setFormTitle('');
              setFormSummary('');
              setFormContent('');
              setActiveTab('editor');
            }}
            className={`admin-nav-btn ${activeTab === 'editor' ? 'active' : ''}`}
          >
            <PlusCircle size={18} />
            <span>Viết bài mới</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`admin-nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
          >
            <FolderPlus size={18} />
            <span>Quản lý chuyên mục</span>
            <span className="nav-badge-count">{categories.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`admin-nav-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          >
            <Briefcase size={18} />
            <span>Quản lý Tuyển dụng</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`admin-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Tài khoản & Phân quyền</span>
            <span className="nav-badge-count">{usersList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`admin-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
          >
            <KeyRound size={18} />
            <span>Đổi mật khẩu cá nhân</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <Settings size={18} />
            <span>Cài đặt thông tin công ty</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={() => onNavigate('/')} className="sidebar-action-btn preview-site-btn">
            <ExternalLink size={16} />
            <span>Xem trang chủ</span>
          </button>
          <button onClick={handleLogout} className="sidebar-action-btn logout-btn">
            <LogOut size={16} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Admin Main Content Area */}
      <main className="admin-main-content">
        {/* Top Header */}
        <header className="admin-top-header">
          <div className="header-breadcrumbs">
            <span>Admin</span> /{' '}
            <strong>
              {activeTab === 'overview'
                ? 'Tổng quan'
                : activeTab === 'articles'
                ? 'Danh sách bài viết'
                : activeTab === 'editor'
                ? editingArticleId
                  ? 'Sửa bài viết'
                  : 'Thêm bài mới'
                : activeTab === 'categories'
                ? 'Chuyên mục'
                : activeTab === 'jobs'
                ? 'Quản lý Tuyển dụng'
                : activeTab === 'users'
                ? 'Quản lý tài khoản Admin & Nhân viên'
                : activeTab === 'security'
                ? 'Đổi mật khẩu cá nhân'
                : 'Cài đặt thông tin công ty'}
            </strong>
          </div>

          <div className="header-right-tools">
            <button onClick={loadAdminData} disabled={isLoadingData} className="admin-btn-refresh">
              <RefreshCw size={15} className={isLoadingData ? 'animate-spin' : ''} />
              <span>Đồng bộ dữ liệu</span>
            </button>
          </div>
        </header>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="admin-tab-pane">
            <div className="overview-stats-grid">
              <div className="stat-box">
                <div className="stat-icon-wrap" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                  <FileText size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">{articles.length}</span>
                  <span className="stat-label">Tổng số bài viết</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <FolderPlus size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">{categories.length}</span>
                  <span className="stat-label">Chuyên mục hoạt động</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-wrap" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                  <Users size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">{usersList.length}</span>
                  <span className="stat-label">Tài khoản quản trị viên</span>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-wrap" style={{ background: '#F3E8FF', color: '#9333EA' }}>
                  <TrendingUp size={24} />
                </div>
                <div className="stat-val-wrap">
                  <span className="stat-number">
                    {articles.reduce((acc, a) => acc + (a.viewCount || 0), 0).toLocaleString()}
                  </span>
                  <span className="stat-label">Tổng lượt xem bài viết</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Users */}
            <div className="overview-grid-2col">
              <div className="admin-card">
                <h3 className="card-title">Tài khoản quản trị mới nhất</h3>
                <div className="recent-items-list">
                  {usersList.slice(0, 5).map((u) => (
                    <div key={u.id} className="recent-item-row">
                      <div className="item-info">
                        <strong>{u.fullName || u.username}</strong>
                        <span>{u.email}</span>
                      </div>
                      <span className={`role-badge ${u.role}`}>{u.role.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('users')} className="view-all-link-btn">
                  Quản lý toàn bộ {usersList.length} tài khoản →
                </button>
              </div>

              <div className="admin-card">
                <h3 className="card-title">Bài viết xuất bản gần đây</h3>
                <div className="recent-items-list">
                  {articles.slice(0, 5).map((a) => (
                    <div key={a.id} className="recent-item-row">
                      <div className="item-info">
                        <strong>{a.title}</strong>
                        <span>{a.category?.name || 'Chưa phân loại'} • {a.viewCount} lượt xem</span>
                      </div>
                      <span className={`status-badge ${a.status}`}>
                        {a.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('articles')} className="view-all-link-btn">
                  Xem tất cả bài viết →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="admin-tab-pane">
            <div className="table-controls-bar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Tìm bài viết..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                />
              </div>

              <div className="filter-tools">
                <select
                  value={articleCategoryFilter}
                  onChange={(e) => setArticleCategoryFilter(e.target.value)}
                >
                  <option value="all">Tất cả chuyên mục</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setEditingArticleId(null);
                    setFormTitle('');
                    setFormSummary('');
                    setFormContent('');
                    setActiveTab('editor');
                  }}
                  className="btn-primary"
                >
                  <PlusCircle size={16} />
                  <span>Viết bài mới</span>
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Bài viết</th>
                    <th>Chuyên mục</th>
                    <th>Lượt xem</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((art) => (
                    <tr key={art.id}>
                      <td>
                        <div className="article-cell-info">
                          <img src={art.thumbnail} alt="" className="table-thumb" />
                          <div>
                            <strong className="table-article-title">{art.title}</strong>
                            <span className="table-article-slug">{art.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td>{art.category?.name || '—'}</td>
                      <td>{art.viewCount}</td>
                      <td>
                        <span className={`status-badge ${art.status}`}>
                          {art.status === 'published' ? 'Xuất bản' : 'Bản nháp'}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => {
                              setEditingArticleId(art.id);
                              setFormTitle(art.title);
                              setFormSummary(art.summary);
                              setFormContent(art.content);
                              setFormThumbnail(art.thumbnail || '');
                              setFormCategoryId(art.categoryId || '');
                              setFormStatus((art.status as any) || 'published');
                              setFormIsFeatured(art.isFeatured);
                              setActiveTab('editor');
                            }}
                            className="btn-icon edit"
                            title="Chỉnh sửa"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm(`Xóa bài viết "${art.title}"?`)) {
                                await api.deleteArticle(art.id);
                                showToast('success', 'Đã xóa bài viết');
                                setArticles((prev) => prev.filter((a) => a.id !== art.id));
                              }
                            }}
                            className="btn-icon delete"
                            title="Xóa"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: ARTICLE EDITOR */}
        {activeTab === 'editor' && (
          <div className="admin-tab-pane">
            <div className="admin-card">
              <h3 className="card-title">
                {editingArticleId ? 'Chỉnh sửa bài viết' : 'Soạn thảo bài viết mới'}
              </h3>
              <form onSubmit={handleSaveArticle} className="editor-form">
                <div className="form-group">
                  <label>Tiêu đề bài viết *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập tiêu đề tin tức, sự kiện..."
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Chuyên mục</label>
                    <select
                      value={formCategoryId}
                      onChange={(e) => setFormCategoryId(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                    >
                      <option value="published">Xuất bản ngay</option>
                      <option value="draft">Lưu bản nháp</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Ảnh đại diện (URL)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formThumbnail}
                    onChange={(e) => setFormThumbnail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Tóm tắt ngắn</label>
                  <textarea
                    rows={3}
                    placeholder="Đoạn văn ngắn giới thiệu nội dung bài viết..."
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Nội dung chi tiết (Hỗ trợ định dạng HTML/Văn bản) *</label>
                  <textarea
                    rows={12}
                    required
                    placeholder="Nội dung bài viết..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                  />
                </div>

                <div className="editor-actions">
                  <button type="submit" disabled={isSavingArticle} className="btn-primary">
                    <CheckCircle size={16} />
                    <span>{isSavingArticle ? 'Đang lưu...' : 'Lưu bài viết'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('articles')}
                    className="btn-secondary"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 4: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="admin-tab-pane">
            <div className="admin-card">
              <h3 className="card-title">Danh sách chuyên mục tin tức Trần Gia</h3>
              <div className="categories-manage-grid">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newCatName) return;
                    setIsSavingCat(true);
                    try {
                      if (editingCatId) {
                        await api.updateCategory(editingCatId, {
                          name: newCatName,
                          description: newCatDesc,
                        });
                        showToast('success', 'Đã cập nhật chuyên mục');
                      } else {
                        await api.createCategory({
                          name: newCatName,
                          description: newCatDesc,
                        });
                        showToast('success', 'Đã thêm chuyên mục mới');
                      }
                      setNewCatName('');
                      setNewCatDesc('');
                      setEditingCatId(null);
                      const cats = await api.getCategories();
                      setCategories(cats);
                    } catch (err: any) {
                      showToast('error', err.message || 'Lỗi lưu chuyên mục');
                    } finally {
                      setIsSavingCat(false);
                    }
                  }}
                  className="cat-create-form"
                >
                  <h4>{editingCatId ? 'Sửa chuyên mục' : 'Thêm chuyên mục mới'}</h4>
                  <div className="form-group">
                    <label>Tên chuyên mục *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Tiến độ công trình..."
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô tả ngắn</label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả danh mục..."
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                    />
                  </div>
                  <button type="submit" disabled={isSavingCat} className="btn-primary">
                    <CheckCircle size={16} />
                    <span>{editingCatId ? 'Cập nhật' : 'Thêm mới'}</span>
                  </button>
                  {editingCatId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCatId(null);
                        setNewCatName('');
                        setNewCatDesc('');
                      }}
                      className="btn-secondary ml-2"
                    >
                      Hủy
                    </button>
                  )}
                </form>

                <div className="categories-list-view">
                  {categories.map((c) => (
                    <div key={c.id} className="cat-item-card">
                      <div className="cat-item-info">
                        <strong>{c.name}</strong>
                        <span className="cat-slug-text">{c.slug}</span>
                        {c.description && <p>{c.description}</p>}
                      </div>
                      <div className="cat-item-actions">
                        <button
                          onClick={() => {
                            setEditingCatId(c.id);
                            setNewCatName(c.name);
                            setNewCatDesc(c.description || '');
                          }}
                          className="btn-icon edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Xóa chuyên mục "${c.name}"?`)) {
                              await api.deleteCategory(c.id);
                              showToast('success', 'Đã xóa chuyên mục');
                              setCategories((prev) => prev.filter((cat) => cat.id !== c.id));
                            }
                          }}
                          className="btn-icon delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Jobs: RECRUITMENT MANAGEMENT */}
        {activeTab === 'jobs' && <AdminJobsTab />}

        {/* Tab 5: USERS & ADMIN ACCOUNTS MANAGEMENT (QUẢN LÝ TÀI KHOẢN) */}
        {activeTab === 'users' && (
          <div className="admin-tab-pane">
            <div className="table-controls-bar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Tìm tài khoản theo tên, email, username..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>

              <div className="filter-tools">
                <button onClick={handleOpenCreateUser} className="btn-primary">
                  <UserPlus size={16} />
                  <span>Thêm tài khoản mới</span>
                </button>
              </div>
            </div>

            <div className="admin-table-card">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Họ và tên & Username</th>
                    <th>Email</th>
                    <th>Vai trò (Role)</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const isSelf = u.id === currentUser?.id;
                    const isDefaultAdmin = u.username === 'admin';
                    return (
                      <tr key={u.id}>
                        <td>
                          <div className="user-table-cell">
                            <div className="user-avatar-sm">
                              {(u.fullName || u.username).charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <strong>{u.fullName || u.username}</strong>
                              <span className="username-sub">@{u.username}</span>
                            </div>
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`role-badge ${u.role}`}>{u.role.toUpperCase()}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${(u as any).status || 'active'}`}>
                            {(u as any).status === 'inactive' ? 'Đã khóa' : 'Hoạt động'}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              onClick={() => handleOpenEditUser(u)}
                              className="btn-icon edit"
                              title="Chỉnh sửa tài khoản"
                            >
                              <Edit size={16} />
                            </button>
                            {!isDefaultAdmin && !isSelf && (
                              <button
                                onClick={() => handleDeleteUser(u)}
                                className="btn-icon delete"
                                title="Xóa tài khoản"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: SECURITY / CHANGE PASSWORD (ĐỔI MẬT KHẨU CÁ NHÂN) */}
        {activeTab === 'security' && (
          <div className="admin-tab-pane">
            <div className="admin-card" style={{ maxWidth: '600px' }}>
              <div className="card-header-with-icon">
                <KeyRound size={24} className="text-amber" />
                <div>
                  <h3 className="card-title">Đổi mật khẩu tài khoản cá nhân</h3>
                  <p className="card-sub">
                    Tài khoản: <strong>{currentUser.username}</strong> ({currentUser.email})
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePersonalPassword} className="editor-form mt-4">
                <div className="form-group">
                  <label>Mật khẩu hiện tại *</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu hiện tại..."
                    value={currentOldPass}
                    onChange={(e) => setCurrentOldPass(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Mật khẩu mới (Tối thiểu 6 ký tự) *</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu mới..."
                    value={currentNewPass}
                    onChange={(e) => setCurrentNewPass(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Xác nhận mật khẩu mới *</label>
                  <input
                    type="password"
                    required
                    placeholder="Nhập lại mật khẩu mới..."
                    value={currentConfirmPass}
                    onChange={(e) => setCurrentConfirmPass(e.target.value)}
                  />
                </div>

                <div className="security-notice-box">
                  <ShieldAlert size={18} className="text-amber flex-shrink-0" />
                  <span>
                    Sau khi đổi mật khẩu, bạn sẽ sử dụng mật khẩu mới này cho các lần đăng nhập tiếp theo.
                  </span>
                </div>

                <button type="submit" disabled={isChangingPass} className="btn-primary">
                  <CheckCircle size={16} />
                  <span>{isChangingPass ? 'Đang cập nhật...' : 'Cập nhật mật khẩu mới'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 7: SETTINGS (CÀI ĐẶT THÔNG TIN TRẦN GIA) */}
        {activeTab === 'settings' && (
          <div className="admin-tab-pane">
            <div className="admin-card">
              <h3 className="card-title">Cấu hình thông tin Công ty Trần Gia</h3>
              <form onSubmit={handleSaveSettings} className="editor-form">
                <h4 className="form-section-title">1. Thông tin doanh nghiệp</h4>
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Tên đầy đủ công ty</label>
                    <input
                      type="text"
                      value={settingsCompany.name}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tên viết tắt / Thương hiệu</label>
                    <input
                      type="text"
                      value={settingsCompany.shortName}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, shortName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Giám đốc đại diện</label>
                    <input
                      type="text"
                      value={settingsCompany.director}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, director: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phương châm / Slogan</label>
                    <input
                      type="text"
                      value={settingsCompany.slogan}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, slogan: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Hotline / Điện thoại</label>
                    <input
                      type="text"
                      value={settingsCompany.hotline}
                      onChange={(e) =>
                        setSettingsCompany({
                          ...settingsCompany,
                          hotline: e.target.value,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Hộp thư điện tử (Email)</label>
                    <input
                      type="email"
                      value={settingsCompany.email}
                      onChange={(e) => setSettingsCompany({ ...settingsCompany, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Địa chỉ trụ sở chính</label>
                  <input
                    type="text"
                    value={settingsCompany.address}
                    onChange={(e) => setSettingsCompany({ ...settingsCompany, address: e.target.value })}
                  />
                </div>




                <div className="editor-actions mt-4">
                  <button type="submit" disabled={isSavingSettings} className="btn-primary">
                    <CheckCircle size={16} />
                    <span>{isSavingSettings ? 'Đang lưu...' : 'Lưu cấu hình hệ thống'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: THÊM / SỬA TÀI KHOẢN NGƯỜI DÙNG */}
      {isUserModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsUserModalOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingUserId ? 'Chỉnh sửa tài khoản người dùng' : 'Thêm tài khoản quản trị mới'}</h3>
              <button onClick={() => setIsUserModalOpen(false)} className="modal-close-btn">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="modal-body">
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Trần Xuân Anh"
                  value={userFormFullName}
                  onChange={(e) => setUserFormFullName(e.target.value)}
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Tên đăng nhập (Username) *</label>
                  <input
                    type="text"
                    required
                    placeholder="vd: trangia_admin"
                    value={userFormUsername}
                    onChange={(e) => setUserFormUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="vd: staff@trangia.vn"
                    value={userFormEmail}
                    onChange={(e) => setUserFormEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Vai trò (Phân quyền)</label>
                  <select
                    value={userFormRole}
                    onChange={(e) => setUserFormRole(e.target.value as any)}
                  >
                    <option value="admin">Quản trị viên toàn quyền (Admin)</option>
                    <option value="editor">Biên tập viên nội dung (Editor)</option>
                    <option value="user">Người dùng thông thường (User)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={userFormStatus}
                    onChange={(e) => setUserFormStatus(e.target.value as any)}
                  >
                    <option value="active">Hoạt động (Active)</option>
                    <option value="inactive">Khóa tài khoản (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  {editingUserId
                    ? 'Mật khẩu mới (Để trống nếu không đổi)'
                    : 'Mật khẩu khởi tạo * (Từ 6 ký tự)'}
                </label>
                <input
                  type="password"
                  placeholder={editingUserId ? '•••••••• (để trống nếu giữ nguyên)' : 'Nhập mật khẩu...'}
                  value={userFormPassword}
                  onChange={(e) => setUserFormPassword(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button type="submit" disabled={isSavingUser} className="btn-primary">
                  <CheckCircle size={16} />
                  <span>{isSavingUser ? 'Đang lưu...' : editingUserId ? 'Cập nhật' : 'Tạo tài khoản'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="btn-secondary"
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
