import React, { useState } from 'react';
import { Layers, CheckCircle2, ArrowRight, Sparkles, Building, Paintbrush, Hammer, Cpu } from 'lucide-react';
import { SERVICES_DATA } from '../services/tranGiaData';

interface ServicesSectionProps {
  onNavigateSection: (sectionId: string) => void;
}

const serviceIcons: Record<string, React.ElementType> = {
  ceiling: Layers,
  partition: Building,
  painting: Paintbrush,
  fitout: Hammer,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<string>(SERVICES_DATA[0].id);

  const currentService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];
  const IconComponent = serviceIcons[currentService.id] || Layers;

  return (
    <section className="tg-section tg-services-section bg-slate-50" id="services">
      <div className="container">
        {/* Section Title */}
        <div className="tg-section-header text-center">
          <span className="tg-section-badge">NĂNG LỰC CHUYÊN NGÀNH</span>
          <h2 className="tg-section-title">LĨNH VỰC HOẠT ĐỘNG CHÍNH</h2>
          <div className="tg-divider"></div>
          <p className="tg-section-desc">
            Trần Gia cung cấp chuỗi giải pháp thi công toàn diện, chuẩn hóa kỹ thuật và đáp ứng các yêu cầu chất lượng
            khắt khe nhất của các chủ đầu tư và tổng thầu xây dựng.
          </p>
        </div>

        {/* 4 Service Tabs */}
        <div className="tg-services-tab-bar">
          {SERVICES_DATA.map((srv) => {
            const Icon = serviceIcons[srv.id] || Layers;
            const isSelected = activeTab === srv.id;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveTab(srv.id)}
                className={`tg-service-tab-btn ${isSelected ? 'active' : ''}`}
              >
                <span className="tg-tab-code">{srv.code}</span>
                <Icon size={20} className="tg-tab-icon" />
                <span className="tg-tab-title">{srv.title}</span>
              </button>
            );
          })}
        </div>

        {/* Service Detail Showcase */}
        <div className="tg-service-detail-card">
          <div className="tg-service-detail-grid">
            {/* Left: Content & Features */}
            <div className="tg-service-info-col">
              <div className="tg-service-header-row">
                <span className="tg-service-number">{currentService.code}</span>
                <div>
                  <h3 className="tg-service-name">{currentService.title}</h3>
                  <p className="tg-service-subtitle">{currentService.subtitle}</p>
                </div>
              </div>

              <p className="tg-service-description">{currentService.desc}</p>

              <div className="tg-service-features-list">
                <h4 className="features-title">
                  <Sparkles size={16} className="text-amber" />
                  <span>Ưu điểm & Phạm vi thực hiện:</span>
                </h4>
                <ul>
                  {currentService.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tg-service-cta-row">
                <button
                  onClick={() => onNavigateSection('contact')}
                  className="tg-btn primary-solid"
                >
                  <span>Tư vấn & Nhận báo giá hạng mục này</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => onNavigateSection('projects')}
                  className="tg-btn outline-btn"
                >
                  <span>Xem dự án thực tế</span>
                </button>
              </div>
            </div>

            {/* Right: Realistic Image Preview */}
            <div className="tg-service-img-col">
              <div className="tg-service-image-box">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="tg-service-hero-img"
                />
                <div className="tg-service-img-overlay">
                  <div className="tg-service-img-tag">Tiêu chuẩn ISO & Thẩm mỹ cao</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Fit-out Breakdown (Decorate, Design, Furniture, M&E) */}
        <div className="tg-capabilities-breakdown">
          <h3 className="tg-sub-heading text-center">NĂNG LỰC TỔNG THẦU NỘI THẤT & HOÀN THIỆN</h3>
          <div className="tg-pillars-grid">
            <div className="tg-pillar-card">
              <div className="pillar-header">
                <span className="pillar-tag">DECORATE</span>
                <h4>Trang Trí Nội Thất</h4>
              </div>
              <p>
                Trang trí nội thất cho văn phòng, khách sạn 5 sao, nhà ở, nhà hàng và các công trình đặc biệt đạt tiêu chuẩn quốc tế.
              </p>
            </div>

            <div className="tg-pillar-card">
              <div className="pillar-header">
                <span className="pillar-tag">DESIGN</span>
                <h4>Thiết Kế Chuyên Nghiệp</h4>
              </div>
              <p>
                Thiết kế công trình bằng các phần mềm ứng dụng tiên tiến nhất thế giới (BIM, 3D Max, Revit) đáp ứng mọi ý tưởng kiến trúc.
              </p>
            </div>

            <div className="tg-pillar-card">
              <div className="pillar-header">
                <span className="pillar-tag">FURNITURE</span>
                <h4>Sản Xuất Đồ Gỗ Cao Cấp</h4>
              </div>
              <p>
                Sản phẩm nội thất đa dạng từ Gỗ tự nhiên, MDF, MFC, Inox, Da cao cấp nhập khẩu chất lượng cao và kiểm định nghiêm ngặt.
              </p>
            </div>

            <div className="tg-pillar-card">
              <div className="pillar-header">
                <span className="pillar-tag">M&E & SERVICE</span>
                <h4>Cơ Điện & Bảo Trì</h4>
              </div>
              <p>
                Cung cấp và lắp đặt thiết bị điện, chiếu sáng chuẩn xác; chính sách bảo hành, bảo trì chu đáo và hậu mãi dài hạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
