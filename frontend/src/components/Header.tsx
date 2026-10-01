import React, { useState } from 'react';
import { Phone, Mail, MapPin, Menu, X, ChevronDown, Shield, FileText, Globe } from 'lucide-react';
import { SiteSettings } from '../types';
import { TRAN_GIA_INFO } from '../services/tranGiaData';
import { Language, translations } from '../services/i18n';

interface HeaderProps {
  onSearch?: (query: string) => void;
  settings?: SiteSettings;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenProfileModal: () => void;
  currentLang?: Language;
  onToggleLang?: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  activeSection,
  onNavigateSection,
  onOpenProfileModal,
  currentLang = 'vi',
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<{ [key: string]: boolean }>({
    services: false,
    capacity: false,
    about: false,
  });

  const toggleMobileExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMobileItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
        { id: 'corporate-ceiling', label: t.nav.corporateCeiling },
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
    { id: 'recruitment', label: currentLang === 'vi' ? 'TUYỂN DỤNG' : 'CAREERS' },
    { id: 'contact', label: t.nav.contact },
  ];


  const handleLinkClick = (id: string) => {
    if (id === 'recruitment') {
      window.location.href = '/tuyen-dung';
      return;
    }
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.location.href = '/#' + id;
      return;
    }
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
              <MapPin size={13} color="#00A3E0" />
              <span>{address}</span>
            </div>
            <div className="tg-topbar-item hide-sm">
              <Mail size={13} color="#00A3E0" />
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>

          <div className="tg-topbar-right">
            {/* Language Switcher Button in Topbar */}
            <div className="tg-lang-switcher">
              <Globe size={13} color="#00A3E0" />
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
              <Shield size={11} />
              <span>{t.header.adminCms}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="tg-navbar-container">
        <div className="container tg-navbar-inner">
          {/* Logo Brand */}
          <div className="tg-logo-brand" onClick={() => handleLinkClick('home')} style={{ cursor: 'pointer' }} title="TRẦN GIA">
            <img
              src="/images/logo-trangia.png"
              alt="TRẦN GIA"
              className="tg-header-logo-img"
            />
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

          {/* Mobile Menu Toggle */}
          <div className="tg-header-actions">
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
        <>
          {/* Backdrop overlay */}
          <div
            className="tg-mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="tg-mobile-drawer">
            <div className="tg-mobile-drawer-header">
              <img
                src="/images/logo-trangia.png"
                alt="TRẦN GIA"
                style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Đóng menu"
                className="tg-mobile-drawer-close"
              >
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
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                const isExpanded = !!expandedMobileItems[item.id];
                return (
                  <li key={item.id} className="tg-mobile-item">
                    <div className="tg-mobile-link-row">
                      <button
                        className={`tg-mobile-link ${isActive ? 'active' : ''}`}
                        onClick={() => handleLinkClick(item.id)}
                      >
                        {item.label}
                      </button>
                      {item.children && (
                        <button
                          type="button"
                          className={`tg-mobile-expand-btn ${isExpanded ? 'expanded' : ''}`}
                          onClick={(e) => toggleMobileExpand(item.id, e)}
                          aria-label={`Mở rộng ${item.label}`}
                        >
                          <ChevronDown size={18} />
                        </button>
                      )}
                    </div>
                    {item.children && isExpanded && (
                      <ul className="tg-mobile-sublist">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <button
                              className={`tg-mobile-sublink ${activeSection === child.id ? 'active' : ''}`}
                              onClick={() => handleLinkClick(child.id)}
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
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
                <a href={`tel:${hotline.replace(/\D/g, '')}`} className="mobile-hotline-call">
                  <Phone size={14} />
                  <span>{t.header.hotline}: <strong>{hotline}</strong></span>
                </a>
                <p>Email: {email}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
