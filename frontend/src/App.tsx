import React, { useEffect, useState } from 'react';
import { Loader2, Download, FileText, ArrowUp } from 'lucide-react';
import { Article, Category, SiteSettings, Project } from './types';
import { api } from './services/api';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CapacitySection } from './components/CapacitySection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PartnersSection } from './components/PartnersSection';
import { CategoryNav } from './components/CategoryNav';
import { NewsCard } from './components/NewsCard';
import { Sidebar } from './components/Sidebar';
import { Pagination } from './components/Pagination';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { ContactSection } from './components/ContactSection';
import { RecruitmentSection } from './components/RecruitmentSection';
import { ProfileViewerModal } from './components/ProfileViewerModal';
import { AdminPage } from './components/AdminPage';
import { Footer } from './components/Footer';
import { TRAN_GIA_INFO } from './services/tranGiaData';

export const App: React.FC = () => {
  // Routing state based on URL path or hash
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Site Settings & News data
  const [siteSettings, setSiteSettings] = useState<SiteSettings | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'all';
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals state
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Handle URL changes & back/forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || 'all';
      const searchParam = params.get('search') || '';
      const articleParam = params.get('article');

      setSelectedCategory(catParam);
      setSearchQuery(searchParam);

      if (articleParam) {
        api.getArticleBySlug(articleParam).then(setActiveArticle).catch(() => {});
      } else {
        setActiveArticle(null);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    const initialParams = new URLSearchParams(window.location.search);
    const initialArticle = initialParams.get('article');
    if (initialArticle) {
      api.getArticleBySlug(initialArticle).then(setActiveArticle).catch(() => {});
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Scroll Spy for active section
      const sections = ['home', 'about', 'services', 'capacity', 'projects', 'partners', 'news', 'contact'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (currentPath !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Fetch settings, categories, and recent news from API
  const loadInitialData = async () => {
    try {
      const [settingsData, cats, recent] = await Promise.all([
        api.getSettings().catch(() => undefined),
        api.getCategories().catch(() => []),
        api.getRecentArticles().catch(() => []),
      ]);
      if (settingsData) setSiteSettings(settingsData);
      setCategories(cats);
      setRecentArticles(recent);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu từ API:', err);
    }
  };

  // Fetch articles from Database based on filter, pagination, search
  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const res = await api.getArticles({
        page: currentPage,
        limit: 6,
        category: selectedCategory,
        search: searchQuery,
      });
      setArticles(res.items);
      setTotalPages(res.pagination.totalPages || 1);
    } catch (err) {
      console.error('Lỗi khi tải bài viết từ database:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentPath.toLowerCase().startsWith('/admin')) {
      loadInitialData();
    }
  }, [currentPath]);

  useEffect(() => {
    if (!currentPath.toLowerCase().startsWith('/admin')) {
      loadArticles();
    }
  }, [selectedCategory, currentPage, currentPath, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('search', query);
      url.searchParams.delete('category');
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setSearchQuery('');
    setCurrentPage(1);
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    if (slug !== 'all') {
      url.searchParams.set('category', slug);
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleArticleClick = async (article: Article) => {
    setActiveArticle(article);
    const url = new URL(window.location.href);
    url.searchParams.set('article', article.slug);
    window.history.pushState({}, '', url.toString());

    try {
      const detail = await api.getArticleBySlug(article.slug);
      setActiveArticle(detail);
      setArticles((prev) =>
        prev.map((a) => (a.id === detail.id ? { ...a, viewCount: detail.viewCount } : a)),
      );
    } catch {
      // Keep existing article
    }
  };

  const handleCloseModal = () => {
    setActiveArticle(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('article');
    window.history.pushState({}, '', url.toString());
  };

  // ==========================================================
  // ROUTE 1: ADMIN CMS PORTAL (/admin)
  // ==========================================================
  if (currentPath.toLowerCase() === '/admin' || currentPath.toLowerCase().startsWith('/admin/')) {
    return <AdminPage onNavigate={navigate} />;
  }

  // ==========================================================
  // ROUTE 3: RECRUITMENT PAGE (/tuyen-dung)
  // ==========================================================
  if (currentPath.toLowerCase() === '/tuyen-dung') {
    return (
      <div className="tg-page-wrapper">
        <Header
          onSearch={handleSearch}
          settings={siteSettings}
          activeSection="recruitment"
          onNavigateSection={navigateSection}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />
        
        <div style={{ minHeight: 'calc(100vh - 300px)' }}>
          <RecruitmentSection bannerUrl={siteSettings?.heroBanner?.recruitmentBanner} />
        </div>

        <Footer
          settings={siteSettings}
          onNavigateSection={navigateSection}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />

        <ProfileViewerModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      </div>
    );
  }

  // ==========================================================
  // ROUTE 2: PUBLIC TRAN GIA PROFILE & CORPORATE PORTAL (/)
  // ==========================================================
  const currentCategoryObj = categories.find((c) => c.slug === selectedCategory);
  const currentCategoryName = currentCategoryObj ? currentCategoryObj.name : 'Tất cả tin tức & bài viết';

  return (
    <div className="tg-page-wrapper">
      {/* 1. Header with Logo, Navigation, Search, PDF Profile Quick Action */}
      <Header
        onSearch={handleSearch}
        settings={siteSettings}
        activeSection={activeSection}
        onNavigateSection={navigateSection}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* 2. Hero Section with Key Metrics & Brand Statement */}
      <HeroBanner
        settings={siteSettings}
        onNavigateSection={navigateSection}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* 3. Giới thiệu & Triết lý: Thư ngỏ, Tầm nhìn, Sứ mệnh, 6 Giá trị cốt lõi, Nguyên tắc hoạt động */}
      <AboutSection onOpenProfileModal={() => setIsProfileModalOpen(true)} />

      {/* 4. Lĩnh vực hoạt động: Trần thạch cao ISO & kim loại, Vách ngăn chống cháy, Sơn bả & GFRC, Fit-out/M&E */}
      <ServicesSection onNavigateSection={navigateSection} />

      {/* 5. Năng lực & Tổ chức: Sơ đồ tổ chức, Năng lực nhân sự 50+, Máy móc thiết bị 300+ */}
      <CapacitySection />

      {/* 6. Dự án nổi bật & Hành trình phát triển (15 dự án từ profile) */}
      <ProjectsSection
        onSelectProject={(project) => setActiveProject(project)}
        onNavigateSection={navigateSection}
      />

      {/* 7. Đối tác chiến lược & Khách hàng */}
      <PartnersSection />

      {/* 8. Tin tức & Sự kiện Trần Gia */}
      <section className="tg-section tg-news-section" id="news">
        <div className="container">
          <div className="tg-section-header text-center">
            <span className="tg-section-badge">TRUYỀN THÔNG & TIẾN ĐỘ</span>
            <h2 className="tg-section-title">TIN TỨC & HOẠT ĐỘNG TRẦN GIA</h2>
            <div className="tg-divider"></div>
            <p className="tg-section-desc">
              Cập nhật tin tức mới nhất về tiến độ các công trình, công nghệ thi công hiện đại và văn hóa doanh nghiệp Trần Gia.
            </p>
          </div>

          <div className="main-content-layout">
            {/* Left Column: Articles Grid + Pagination */}
            <div className="articles-section">
              {/* Category Quick Filter Tabs */}
              <div className="category-tabs-wrapper">
                <CategoryNav
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                />
              </div>

              {/* Active Category Filter Header */}
              <div className="category-filter-header">
                <h3 className="current-category-title">
                  {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : currentCategoryName}
                </h3>
                {(selectedCategory !== 'all' || searchQuery) && (
                  <button
                    className="clear-filter-btn"
                    onClick={() => handleCategorySelect('all')}
                  >
                    ✕ Xem tất cả tin
                  </button>
                )}
              </div>

              {/* Articles Grid or Loading state */}
              {isLoading ? (
                <div className="tg-loading-box">
                  <Loader2 size={36} className="animate-spin text-amber" />
                  <span>Đang tải danh sách bài viết từ hệ thống...</span>
                </div>
              ) : articles.length === 0 ? (
                <div className="tg-empty-news-box">
                  <h3>Không tìm thấy bài viết</h3>
                  <p>Không có bài viết nào khớp với chuyên mục hoặc từ khóa tìm kiếm.</p>
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className="tg-btn primary-solid small mt-3"
                  >
                    Xem tất cả bài viết
                  </button>
                </div>
              ) : (
                <>
                  <div className="delta-articles-grid">
                    {articles.map((article) => (
                      <NewsCard
                        key={article.id}
                        article={article}
                        onClick={handleArticleClick}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <Sidebar
              recentArticles={recentArticles}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              onSelectArticle={handleArticleClick}
              onSearch={handleSearch}
              company={siteSettings?.company}
            />
          </div>
        </div>
      </section>

      {/* 9. Recruitment (moved to standalone page) */}

      {/* 10. Liên hệ & Yêu cầu báo giá thi công */}
      <ContactSection />

      {/* 11. Footer Trần Gia */}
      <Footer
        settings={siteSettings}
        onNavigateSection={navigateSection}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Sticky Floating CTA: Download Profile & Scroll Top */}
      <div className="tg-floating-actions">
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="tg-floating-profile-btn"
          title="Xem & Tải Hồ sơ năng lực PDF (36 trang)"
        >
          <FileText size={18} />
          <span>HỒ SƠ NĂNG LỰC PDF</span>
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

      {/* Modals */}
      <ArticleDetailModal
        article={activeArticle}
        onClose={handleCloseModal}
      />

      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenContact={() => navigateSection('contact')}
      />

      <ProfileViewerModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
