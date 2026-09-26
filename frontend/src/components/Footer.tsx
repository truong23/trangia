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
              <div className="tg-logo-symbol">
                <span className="logo-t">T</span>
                <span className="logo-g">G</span>
              </div>
              <div className="tg-brand-name-wrap">
                <span className="footer-brand-title">TRẦN GIA</span>
                <span className="footer-brand-sub">CONSTRUCTION</span>
              </div>
            </div>

            <p className="footer-company-fullname">{companyName}</p>
            <p className="footer-slogan-text">
              Phương châm hoạt động: <strong>"{slogan}"</strong>
            </p>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={16} className="text-amber flex-shrink-0" />
                <span>{address}</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="text-amber flex-shrink-0" />
                <span>
                  Hotline / ĐT: <strong>{phone}</strong>
                </span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="text-amber flex-shrink-0" />
                <span>{email}</span>
              </div>
              <div className="footer-contact-item">
                <Shield size={16} className="text-amber flex-shrink-0" />
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
            <button onClick={onOpenProfileModal} className="tg-btn primary-solid small w-full mb-3">
              <Download size={15} />
              <span>Xem & Tải Profile PDF</span>
            </button>
            <button onClick={() => onNavigateSection('contact')} className="tg-btn outline-light small w-full">
              <span>Yêu Cầu Báo Giá Nhanh</span>
            </button>
          </div>
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
