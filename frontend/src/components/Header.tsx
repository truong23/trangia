import React, { useState } from 'react';
import { Phone, Mail, MapPin, Download, Search, Menu, X, ChevronDown, Shield, FileText } from 'lucide-react';
import { SiteSettings } from '../types';
import { TRAN_GIA_INFO } from '../services/tranGiaData';

interface HeaderProps {
  onSearch: (query: string) => void;
  settings?: SiteSettings;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenProfileModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  settings,
  activeSection,
  onNavigateSection,
  onOpenProfileModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const company = settings?.company;
  const companyName = company?.name || TRAN_GIA_INFO.companyName;
  const hotline = company?.hotline || TRAN_GIA_INFO.hotline;
  const email = company?.email || TRAN_GIA_INFO.email;
  const address = company?.address || TRAN_GIA_INFO.address;

  const navLinks = [
    { id: 'home', label: 'TRANG CHỦ' },
    {
      id: 'about',
      label: 'GIỚI THIỆU',
      children: [
        { id: 'letter', label: 'Thư ngỏ Giám đốc' },
        { id: 'about-overview', label: 'Tổng quan doanh nghiệp' },
        { id: 'vision-values', label: 'Tầm nhìn & Giá trị cốt lõi' },
        { id: 'principles', label: 'Nguyên tắc hoạt động' },
      ],
    },
    {
      id: 'services',
      label: 'LĨNH VỰC',
      children: [
        { id: 'services-ceiling', label: 'Thi công Trần thạch cao & Kim loại' },
        { id: 'services-partition', label: 'Thi công Vách ngăn chống cháy' },
        { id: 'services-painting', label: 'Sơn bả hoàn thiện & Phào GFRC' },
        { id: 'services-fitout', label: 'Nội thất Fit-out & Cơ điện M&E' },
      ],
    },
    {
      id: 'capacity',
      label: 'NĂNG LỰC',
      children: [
        { id: 'capacity-org', label: 'Sơ đồ tổ chức' },
        { id: 'capacity-personnel', label: 'Năng lực nhân sự (50+ CNV)' },
        { id: 'capacity-equipment', label: 'Năng lực máy móc thiết bị' },
      ],
    },
    { id: 'projects', label: 'DỰ ÁN' },
    { id: 'partners', label: 'ĐỐI TÁC' },
    { id: 'news', label: 'TIN TỨC' },
    { id: 'contact', label: 'LIÊN HỆ' },
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

  return (
    <header className="tg-header-wrapper">
      {/* 1. Top Bar: Contact Info & Hotline */}
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
            <div className="tg-topbar-item hotline-highlight">
              <Phone size={13} className="phone-pulse" />
              <span>Hotline: <strong>{hotline}</strong></span>
            </div>
            <button
              onClick={onOpenProfileModal}
              className="tg-profile-quick-btn"
              title="Xem & Tải Hồ Sơ Năng Lực PDF"
            >
              <FileText size={13} />
              <span>Hồ Sơ Năng Lực</span>
            </button>
            <a href="/admin" className="tg-admin-link" title="Đăng nhập Trang Quản Trị CMS">
              <Shield size={13} />
              <span>Admin CMS</span>
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

          {/* Right Action Tools: Search, Download Profile Button & Mobile Menu Toggle */}
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
                    placeholder="Tìm kiếm dự án, tin tức..."
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
              <span>Tải HSNL (PDF)</span>
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
              <span>Xem Hồ Sơ Năng Lực PDF</span>
            </button>
            <div className="tg-mobile-contact">
              <p>Hotline: <strong>{hotline}</strong></p>
              <p>Email: {email}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
