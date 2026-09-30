import React, { useState } from 'react';
import { Phone, Mail, MapPin, Download, Search, Menu, X, ChevronDown, Shield, FileText, Globe } from 'lucide-react';
import { SiteSettings } from '../types';
import { TRAN_GIA_INFO } from '../services/tranGiaData';
import { Language, translations } from '../services/i18n';

interface HeaderProps {
  onSearch: (query: string) => void;
  settings?: SiteSettings;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenProfileModal: () => void;
  currentLang?: Language;
  onToggleLang?: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  settings,
  activeSection,
  onNavigateSection,
  onOpenProfileModal,
  currentLang = 'vi',
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const t = translations[currentLang];
  const company = settings?.company;
  const companyName = company?.name || TRAN_GIA_INFO.companyName;
  const hotline = company?.hotline || TRAN_GIA_INFO.hotline;
  const email = company?.email || TRAN_GIA_INFO.email;
  const address = company?.address || TRAN_GIA_INFO.address;

  const navLinks = [
    { id: 'home', label: t.nav.home },
    {
      id: 'about',
      label: t.nav.about,
      children: [
        { id: 'letter', label: t.nav.aboutLetter },
        { id: 'about-overview', label: t.nav.aboutOverview },
        { id: 'vision-values', label: t.nav.aboutVision },
        { id: 'principles', label: t.nav.aboutPrinciples },
      ],
    },
    {
      id: 'services',
      label: t.nav.services,
      children: [
        { id: 'services-ceiling', label: t.nav.servicesCeiling },
        { id: 'services-partition', label: t.nav.servicesPartition },
        { id: 'services-painting', label: t.nav.servicesPainting },
        { id: 'services-fitout', label: t.nav.servicesFitout },
      ],
    },
    {
      id: 'capacity',
      label: t.nav.capacity,
      children: [
        { id: 'capacity-org', label: t.nav.capacityOrg },
        { id: 'capacity-personnel', label: t.nav.capacityPersonnel },
        { id: 'capacity-equipment', label: t.nav.capacityEquipment },
      ],
    },
    { id: 'projects', label: t.nav.projects },
    { id: 'partners', label: t.nav.partners },
    { id: 'news', label: t.nav.news },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      onSearch(headerSearch.trim());
      setShowSearchBox(false);
      onNavigateSection('news');
    }
  };

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  const handleSwitchLanguage = (lang: Language) => {
    if (onToggleLang) {
      onToggleLang(lang);
    }
  };

  return (
    <header className="tg-header-wrapper">
      {/* 1. Top Bar: Contact Info, Hotline & Language Toggle */}
      <div className="tg-topbar">
        <div className="container tg-topbar-inner">
          <div className="tg-topbar-left">
            <div className="tg-topbar-item">
              <MapPin size={13} className="text-amber" />
              <span>{address}</span>
            </div>
            <div className="tg-topbar-item hide-sm">
              <Mail size={13} className="text-amber" />
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>

          <div className="tg-topbar-right">
            {/* Language Switcher Button in Topbar */}
            <div className="tg-lang-switcher">
              <Globe size={13} className="text-amber" />
              <button
                type="button"
                onClick={() => handleSwitchLanguage('vi')}
                className={`tg-lang-btn ${currentLang === 'vi' ? 'active' : ''}`}
                title="Tiếng Việt"
              >
                🇻🇳 VI
              </button>
              <span className="lang-divider">/</span>
              <button
                type="button"
                onClick={() => handleSwitchLanguage('en')}
                className={`tg-lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                title="English"
              >
                🇬🇧 EN
              </button>
            </div>

            <div className="tg-topbar-item hotline-highlight">
              <Phone size={13} className="phone-pulse" />
              <span>{t.header.hotline}: <strong>{hotline}</strong></span>
            </div>
            <button
              onClick={onOpenProfileModal}
              className="tg-profile-quick-btn"
              title="Xem & Tải Hồ Sơ Năng Lực PDF"
            >
              <FileText size={13} />
              <span>{t.header.profilePdf}</span>
            </button>
            <a href="/admin" className="tg-admin-link" title="Đăng nhập Trang Quản Trị CMS">
              <Shield size={13} />
              <span>{t.header.adminCms}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="tg-navbar-container">
        <div className="container tg-navbar-inner">
          {/* Logo with Brand Name */}
          <div className="tg-logo-brand" onClick={() => handleLinkClick('home')} style={{ cursor: 'pointer' }}>
            <div className="tg-logo-symbol">
              <span className="logo-t">T</span>
              <span className="logo-g">G</span>
            </div>
            <div className="tg-logo-text">
              <span className="tg-brand-name">TRẦN GIA</span>
              <span className="tg-brand-tagline">CONSTRUCTION & PROFILE</span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="tg-desktop-nav">
            <ul className="tg-nav-menu">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                if (item.children) {
                  return (
                    <li key={item.id} className={`tg-nav-item has-dropdown ${isActive ? 'active' : ''}`}>
                      <button
                        className="tg-nav-link"
                        onClick={() => handleLinkClick(item.id)}
                      >
                        {item.label} <ChevronDown size={14} className="dropdown-chevron" />
                      </button>
                      <ul className="tg-submenu">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <button
                              className="tg-submenu-link"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLinkClick(item.id);
                                setTimeout(() => {
                                  const el = document.getElementById(child.id);
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              }}
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={item.id} className={`tg-nav-item ${isActive ? 'active' : ''}`}>
                    <button
                      className="tg-nav-link"
                      onClick={() => handleLinkClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Tools: Search, Language Switcher, Download Profile Button & Mobile Menu Toggle */}
          <div className="tg-header-actions">
            {/* Search Box Trigger */}
            <div className="tg-search-wrapper">
              <button
                className="tg-icon-btn"
                onClick={() => setShowSearchBox(!showSearchBox)}
                aria-label="Tìm kiếm tin tức và dự án"
              >
                <Search size={18} />
              </button>

              {showSearchBox && (
                <form onSubmit={handleSearchSubmit} className="tg-search-dropdown-form">
                  <input
                    type="text"
                    placeholder={t.header.searchPlaceholder}
                    value={headerSearch}
                    onChange={(e) => setHeaderSearch(e.target.value)}
                    autoFocus
                  />
                  <button type="submit">
                    <Search size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Download / View PDF Profile CTA */}
            <button
              className="tg-cta-button hide-md"
              onClick={onOpenProfileModal}
            >
              <Download size={15} />
              <span>{t.header.downloadProfile}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="tg-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="tg-mobile-drawer">
          <div className="tg-mobile-drawer-header">
            <span className="tg-brand-name">TRẦN GIA PROFILE</span>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Đóng">
              <X size={20} />
            </button>
          </div>

          <div className="mobile-lang-bar">
            <button
              type="button"
              onClick={() => handleSwitchLanguage('vi')}
              className={`mobile-lang-btn ${currentLang === 'vi' ? 'active' : ''}`}
            >
              🇻🇳 Tiếng Việt
            </button>
            <button
              type="button"
              onClick={() => handleSwitchLanguage('en')}
              className={`mobile-lang-btn ${currentLang === 'en' ? 'active' : ''}`}
            >
              🇬🇧 English
            </button>
          </div>

          <ul className="tg-mobile-menu">
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  className={`tg-mobile-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleLinkClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="tg-mobile-drawer-footer">
            <button
              className="tg-cta-button w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfileModal();
              }}
            >
              <FileText size={16} />
              <span>{t.header.profilePdf} (PDF)</span>
            </button>
            <div className="tg-mobile-contact">
              <p>{t.header.hotline}: <strong>{hotline}</strong></p>
              <p>Email: {email}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
