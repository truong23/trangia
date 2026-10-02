import React from 'react';
import { Phone, Mail, MapPin, Globe, FileText, Download, Shield, Heart } from 'lucide-react';
import { SiteSettings } from '../types';
import { TRAN_GIA_INFO, SERVICES_DATA } from '../services/tranGiaData';

interface FooterProps {
  settings?: SiteSettings;
  onNavigateSection: (sectionId: string) => void;
  onOpenProfileModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigateSection,
  onOpenProfileModal,
}) => {
  const company = settings?.company;
  const companyName = company?.name || TRAN_GIA_INFO.companyName;
  const address = company?.address || TRAN_GIA_INFO.address;
  const phone = company?.phone || TRAN_GIA_INFO.phone;
  const email = company?.email || TRAN_GIA_INFO.email;
  const slogan = company?.slogan || TRAN_GIA_INFO.slogan;
  const director = company?.director || TRAN_GIA_INFO.director;

  return (
    <footer className="tg-footer">
      <div className="container">
        {/* Top Footer Grid */}
        <div className="tg-footer-top-grid">
          {/* Col 1: Company Profile & Info */}
          <div className="tg-footer-col col-main">
            <div className="tg-footer-brand">
              <img
                src={company?.logo || '/images/logo-trangia.png'}
                alt={companyName}
                style={{ height: '46px', width: 'auto', objectFit: 'contain', background: 'rgba(255,255,255,0.92)', padding: '4px 10px', borderRadius: '6px' }}
              />
            </div>

            <p className="footer-company-fullname">{companyName}</p>
            <p className="footer-slogan-text">
              Phương châm hoạt động: <strong>"{slogan}"</strong>
            </p>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={16} className="flex-shrink-0" style={{ color: '#FFFFFF' }} />
                <span>{address}</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="flex-shrink-0" style={{ color: '#FFFFFF' }} />
                <span>
                  Hotline / ĐT: <strong>{phone}</strong>
                </span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="flex-shrink-0" style={{ color: '#FFFFFF' }} />
                <span>{email}</span>
              </div>
              <div className="footer-contact-item">
                <Shield size={16} className="flex-shrink-0" style={{ color: '#FFFFFF' }} />
                <span>Người đại diện: <strong>{director}</strong> (Giám đốc)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links Giới thiệu */}
          <div className="tg-footer-col">
            <h4 className="footer-col-title">VỀ TRẦN GIA</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigateSection('about')}>Thư ngỏ Ban Giám đốc</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('about')}>Tầm nhìn & Sứ mệnh</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('about')}>6 Giá trị cốt lõi</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('capacity')}>Sơ đồ tổ chức công ty</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('capacity')}>Năng lực nhân sự (50+ CNV)</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('capacity')}>Trang thiết bị máy móc</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Lĩnh vực thi công */}
          <div className="tg-footer-col">
            <h4 className="footer-col-title">LĨNH VỰC THI CÔNG</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigateSection('services')}>Thi công Trần thạch cao ISO</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')}>Thi công Trần kim loại cao cấp</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')}>Thi công Vách ngăn chống cháy</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')}>Sơn bả trong & ngoài nhà</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')}>Lắp dựng phào chỉ GFRC</button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')}>Nội thất Fit-out & Cơ điện M&E</button>
              </li>
            </ul>
          </div>

          {/* Col 4: Profile PDF & Bản tin */}
          <div className="tg-footer-col col-cta">
            <h4 className="footer-col-title">HỒ SƠ NĂNG LỰC</h4>
            <p className="footer-cta-desc">
              Tải hồ sơ năng lực chính thức bản cập nhật 36 trang đầy đủ thông tin pháp lý, thiết bị và dự án.
            </p>
            <button onClick={onOpenProfileModal} className="tg-btn white-solid small w-full mb-3">
              <Download size={15} />
              <span>Xem & Tải Profile PDF</span>
            </button>
            <button onClick={() => onNavigateSection('contact')} className="tg-btn outline-light small w-full">
              <span>Yêu Cầu Báo Giá Nhanh</span>
            </button>
          </div>
        </div>

        {/* SEO Rich Footer Content */}
        <div className="tg-footer-seo" style={{ borderTop: '1px solid rgba(255,255,255,0.2)', padding: '20px 0', marginTop: '16px' }}>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', maxWidth: 900 }}>
            <strong style={{ color: '#FFFFFF' }}>Trần Gia Construction</strong> – Đơn vị uy tín chuyên <strong style={{ color: '#FFFFFF' }}>thi công trần thạch cao cho các tập đoàn lớn</strong> tại Việt Nam. 
            Là đối tác chiến lược của <strong style={{ color: '#FFFFFF' }}>VinGroup, Vinhomes, VinFast, DELTA Group, Viettel Construction, Masterise Homes, Charm Group, MBLand</strong>. 
            Chuyên thi công trần vách thạch cao tiêu chuẩn ISO, trần kim loại cao cấp, vách ngăn chống cháy, sơn bả hoàn thiện trong & ngoài nhà, 
            lắp dựng phào chỉ GFRC và nội thất Fit-out cho các dự án khách sạn 5 sao, trung tâm thương mại, showroom ô tô, chung cư cao cấp và khu đô thị trên toàn quốc. 
            Với đội ngũ hơn 50 kỹ sư – thợ lành nghề và 300+ máy móc thiết bị chuyên dụng, 
            Trần Gia đã hoàn thành 15+ dự án trọng điểm tại Hà Nội, TP.HCM, Hải Phòng, Quảng Ninh, Thanh Hóa, Bình Dương, Quảng Nam, Hưng Yên và Tây Ninh.
          </p>
        </div>

        {/* Bottom Footer Bar */}
        <div className="tg-footer-bottom">
          <div className="copyright-text">
            Copyright © 2026 <strong>{companyName}</strong>. Bản quyền thuộc về Trần Gia.
          </div>
          <div className="tech-badge">
            <span>Hệ thống hồ sơ năng lực số trực tuyến & Quản trị CMS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
