import React from 'react';
import { Download, ArrowRight, Building2, Users, Wrench, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';
import { TRAN_GIA_INFO } from '../services/tranGiaData';
import { Language } from '../services/i18n';

interface HeroBannerProps {
  settings?: SiteSettings;
  onNavigateSection: (sectionId: string) => void;
  onOpenProfileModal: () => void;
  currentLang?: Language;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  settings,
  onNavigateSection,
  onOpenProfileModal,
  currentLang = 'vi',
}) => {
  const isEn = currentLang === 'en';
  const company = settings?.company;
  const companyName = company?.name || TRAN_GIA_INFO.companyName;

  const heroTitle = isEn
    ? 'Gypsum Ceiling Contractor For Major Corporations'
    : (settings?.heroBanner?.title || 'Thi Công Trần Thạch Cao Cho Các Tập Đoàn Lớn');

  const heroSubtitle = !isEn && settings?.heroBanner?.subtitle
    ? settings.heroBanner.subtitle
    : null;

  const statIcons = [Users, Building2, Wrench, CheckCircle2];
  const stats = (settings?.heroBanner?.stats && settings.heroBanner.stats.length === 4)
    ? settings.heroBanner.stats.map((s, idx) => ({
        number: s.number,
        label: s.label,
        icon: statIcons[idx] || Users,
      }))
    : [
        {
          number: '50+',
          label: isEn ? 'Engineers & Skilled Craftsmen' : 'Cán bộ Kỹ sư & Thợ lành nghề',
          icon: Users,
        },
        {
          number: '15+',
          label: isEn ? 'Projects for Major Corporations' : 'Dự án cho tập đoàn lớn',
          icon: Building2,
        },
        {
          number: '300+',
          label: isEn ? 'Specialized Machinery Units' : 'Máy móc thiết bị chuyên dụng',
          icon: Wrench,
        },
        {
          number: '100%',
          label: isEn ? 'ISO Standard & On-Time Delivery' : 'Đạt chuẩn ISO & Đúng tiến độ',
          icon: CheckCircle2,
        },
      ];

  return (
    <section className="tg-hero-section" id="home">
      <div className="tg-hero-bg-overlay"></div>
      <div className="container tg-hero-content">
        {/* Main Title - SEO H1 */}
        <h1 className="tg-hero-title">
          {heroTitle}
        </h1>

        {/* Subtitle - SEO Rich */}
        <p className="tg-hero-subtitle">
          {heroSubtitle ? (
            heroSubtitle
          ) : isEn ? (
            <>
              <strong>Tran Gia Construction</strong> – Trusted gypsum ceiling and drywall partner of{' '}
              <strong>VinGroup</strong>, <strong>Vinhomes</strong>, <strong>VinFast</strong>,{' '}
              <strong>DELTA Group</strong>, <strong>Viettel Construction</strong>, and{' '}
              <strong>Masterise Homes</strong>. Specializing in ISO-standard acoustic & fire-rated gypsum
              ceilings, metal ceilings, specialized coatings, and GFRC architectural moldings for 5-star
              hotels, shopping malls, and premium high-rise residences across Vietnam.
            </>
          ) : (
            <>
              <strong>Trần Gia</strong> – Đối tác thi công trần thạch cao tin cậy của{' '}
              <strong>VinGroup</strong>, <strong>Vinhomes</strong>, <strong>VinFast</strong>,{' '}
              <strong>DELTA Group</strong>, <strong>Viettel Construction</strong> và{' '}
              <strong>Masterise Homes</strong>. Chuyên thi công trần vách thạch cao tiêu chuẩn ISO, trần kim
              loại, vách chống cháy, sơn bả hoàn thiện & phào GFRC cho khách sạn 5 sao, TTTM và chung cư cao
              cấp trên toàn quốc.
            </>
          )}
        </p>
        <p className="tg-hero-company-name">
          {companyName}
        </p>

        {/* CTA Buttons */}
        <div className="tg-hero-actions">
          <button
            onClick={() => onNavigateSection('projects')}
            className="tg-hero-btn primary"
          >
            <span>{isEn ? 'Featured Projects' : 'Dự Án Nổi Bật'}</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onOpenProfileModal}
            className="tg-hero-btn secondary"
          >
            <Download size={18} />
            <span>{isEn ? 'View Profile PDF (36p)' : 'Xem Hồ Sơ Năng Lực PDF'}</span>
          </button>

          <button
            onClick={() => onNavigateSection('contact')}
            className="tg-hero-btn outline"
          >
            <span>{isEn ? 'Request Quotation' : 'Nhận Báo Giá Thi Công'}</span>
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
