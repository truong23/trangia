import React from 'react';
import { ShieldCheck, Download, ArrowRight, Building2, Users, Wrench, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';
import { TRAN_GIA_INFO } from '../services/tranGiaData';

interface HeroBannerProps {
  settings?: SiteSettings;
  onNavigateSection: (sectionId: string) => void;
  onOpenProfileModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  settings,
  onNavigateSection,
  onOpenProfileModal,
}) => {
  const company = settings?.company;
  const companyName = company?.name || TRAN_GIA_INFO.companyName;
  const slogan = company?.slogan || TRAN_GIA_INFO.slogan;
  const hotline = company?.hotline || TRAN_GIA_INFO.hotline;

  const stats = [
    { number: '50+', label: 'Cán bộ - Kỹ sư & CNV', icon: Users },
    { number: '15+', label: 'Dự án trọng điểm toàn quốc', icon: Building2 },
    { number: '300+', label: 'Trang thiết bị máy móc', icon: Wrench },
    { number: '100%', label: 'Đạt chuẩn ISO & Tiến độ', icon: CheckCircle2 },
  ];

  return (
    <section className="tg-hero-section" id="home">
      <div className="tg-hero-bg-overlay"></div>
      <div className="container tg-hero-content">
        {/* Slogan Pill */}
        <div className="tg-hero-badge">
          <ShieldCheck size={16} className="text-amber animate-pulse" />
          <span>HỒ SƠ NĂNG LỰC DOANH NGHIỆP • {slogan.toUpperCase()}</span>
        </div>

        {/* Main Title */}
        <h1 className="tg-hero-title">
          {companyName}
        </h1>

        {/* Subtitle */}
        <p className="tg-hero-subtitle">
          Đơn vị hàng đầu trong lĩnh vực thiết kế – thi công nội thất, trần vách thạch cao tiêu chuẩn ISO,
          sơn bả hoàn thiện công trình và phào chỉ GFRC nghệ thuật cho các tập đoàn & tổng thầu lớn nhất Việt Nam.
        </p>

        {/* CTA Buttons */}
        <div className="tg-hero-actions">
          <button
            onClick={() => onNavigateSection('projects')}
            className="tg-hero-btn primary"
          >
            <span>Dự Án Nổi Bật</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onOpenProfileModal}
            className="tg-hero-btn secondary"
          >
            <Download size={18} />
            <span>Xem Hồ Sơ Năng Lực PDF</span>
          </button>

          <button
            onClick={() => onNavigateSection('contact')}
            className="tg-hero-btn outline"
          >
            <span>Nhận Báo Giá Thi Công</span>
          </button>
        </div>

        {/* Quick Key Metrics / Stats */}
        <div className="tg-hero-stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="tg-stat-card">
                <div className="tg-stat-icon-wrap">
                  <Icon size={24} className="tg-stat-icon" />
                </div>
                <div className="tg-stat-info">
                  <div className="tg-stat-number">{stat.number}</div>
                  <div className="tg-stat-label">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
