import React from 'react';
import { HeartHandshake, Building, Award, CheckCircle } from 'lucide-react';
import { PARTNERS_DATA } from '../services/tranGiaData';

export const PartnersSection: React.FC = () => {
  return (
    <section className="tg-section tg-partners-section bg-slate-50" id="partners">
      <div className="container">
        {/* Section Header */}
        <div className="tg-section-header text-center">
          <span className="tg-section-badge">MỐI QUAN HỆ HỢP TÁC</span>
          <h2 className="tg-section-title">ĐỐI TÁC CHIẾN LƯỢC & KHÁCH HÀNG</h2>
          <div className="tg-divider"></div>
          <p className="tg-section-desc">
            Trần Gia trân trọng cảm ơn sự tin tưởng và đồng hành của các Tổng thầu, Chủ đầu tư và Tập đoàn xây dựng
            hàng đầu trong suốt hành trình kiến tạo những công trình chất lượng cao.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="tg-partners-grid">
          {PARTNERS_DATA.map((p) => (
            <div key={p.id} className="tg-partner-card">
              <div className="partner-logo-box">
                <Building size={28} className="text-primary" />
                <span className="partner-brand-code">{p.name.split(' ')[0]}</span>
              </div>
              <div className="partner-content">
                <h3 className="partner-name">{p.name}</h3>
                <span className="partner-role">{p.role}</span>
                {p.description && <p className="partner-desc">{p.description}</p>}
              </div>
              <div className="partner-check-badge">
                <CheckCircle size={14} className="text-emerald-500" />
                <span>Đối tác tin cậy</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="tg-trust-banner">
          <div className="trust-item">
            <Award size={32} className="text-amber" />
            <div>
              <h4>Chất Lượng Vượt Trội</h4>
              <p>Tuân thủ nghiêm ngặt tiêu chuẩn nghiệm thu của các Tổng thầu khó tính nhất.</p>
            </div>
          </div>
          <div className="trust-item">
            <HeartHandshake size={32} className="text-amber" />
            <div>
              <h4>Hợp Tác Bền Vững</h4>
              <p>Luôn đặt lợi ích của khách hàng và uy tín thương hiệu lên hàng đầu.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
