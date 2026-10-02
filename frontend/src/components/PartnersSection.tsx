import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  Building,
  Award,
  CheckCircle,
  ShieldCheck,
  Zap,
  FolderGit2,
  Factory,
  Sparkles,
} from 'lucide-react';
import { Partner } from '../types';
import { partnerService } from '../services/partner/partner.service';
import { PARTNERS_DATA } from '../services/tranGiaData';
import { PartnerLogoBadge, getPartnerInitials } from './PartnerLogoBadge';



export const PartnersSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>(PARTNERS_DATA);
  const [activeTab, setActiveTab] = useState<'all' | 'developer' | 'contractor' | 'manufacturer'>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const loadPartners = async () => {
      try {
        const data = await partnerService.getPartners();
        if (isMounted && data && data.length > 0) {
          setPartners(data);
        }
      } catch (err) {
        console.error('Failed to load partners from API', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPartners();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPartners = activeTab === 'all'
    ? partners
    : partners.filter((p) => p.category === activeTab);

  const counts = {
    all: partners.length,
    developer: partners.filter((p) => p.category === 'developer').length,
    contractor: partners.filter((p) => p.category === 'contractor').length,
    manufacturer: partners.filter((p) => p.category === 'manufacturer').length,
  };

  const getPartnerInitials = (name: string) => {
    return name
      .replace(/TẬP ĐOÀN|CÔNG TY|CỔ PHẦN|TỔNG CÔNG TY|TNHH/g, '')
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  };

  const parseProjects = (projects?: string[] | string): string[] => {
    if (!projects) return [];
    if (Array.isArray(projects)) return projects;
    try {
      if (projects.startsWith('[')) {
        return JSON.parse(projects);
      }
    } catch {
      // not JSON
    }
    return projects.split(',').map((s) => s.trim()).filter(Boolean);
  };

  return (
    <section className="tg-section tg-partners-section" id="partners">
      <div className="container">
        {/* Section Header */}
        <div className="tg-section-header text-center">
          <div className="tg-section-badge-cluster">
            <span className="tg-section-badge">MỐI QUAN HỆ HỢP TÁC BỀN VỮNG</span>
            <span className="tg-highlight-pill">ĐỒNG HÀNH CÙNG CÁC TẬP ĐOÀN ĐỈNH CAO</span>
          </div>
          <h2 className="tg-section-title">ĐỐI TÁC CHIẾN LƯỢC & KHÁCH HÀNG</h2>
          <div className="tg-divider"></div>
          <p className="tg-section-desc">
            Trần Gia tự hào là đối tác thi công trần vách thạch cao và hoàn thiện được lựa chọn bởi các
            Chủ đầu tư BĐS hàng đầu, các Tổng thầu xây dựng Top 1 Việt Nam và các tập đoàn sản xuất vật liệu xây dựng toàn cầu.
          </p>
        </div>

        {/* Partnership Key Highlights Bar */}
        <div className="tg-partner-stats-strip">
          <div className="partner-stat-item">
            <span className="partner-stat-num">10+</span>
            <span className="partner-stat-lbl">Năm Uy Tín Thị Trường</span>
          </div>
          <div className="partner-stat-divider"></div>
          <div className="partner-stat-item">
            <span className="partner-stat-num">20+</span>
            <span className="partner-stat-lbl">Tập Đoàn & Tổng Thầu Lớn</span>
          </div>
          <div className="partner-stat-divider"></div>
          <div className="partner-stat-item">
            <span className="partner-stat-num">15+</span>
            <span className="partner-stat-lbl">Dự Án Trọng Điểm Hoàn Thành</span>
          </div>
          <div className="partner-stat-divider"></div>
          <div className="partner-stat-item">
            <span className="partner-stat-num">100%</span>
            <span className="partner-stat-lbl">Nghiệm Thu Đạt Chuẩn CĐT</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="tg-partner-filter-tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`partner-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          >
            <Sparkles size={16} />
            <span>Tất Cả Đối Tác ({counts.all})</span>
          </button>
          <button
            onClick={() => setActiveTab('developer')}
            className={`partner-tab-btn ${activeTab === 'developer' ? 'active' : ''}`}
          >
            <Building size={16} />
            <span>Tập Đoàn & Chủ Đầu Tư ({counts.developer})</span>
          </button>
          <button
            onClick={() => setActiveTab('contractor')}
            className={`partner-tab-btn ${activeTab === 'contractor' ? 'active' : ''}`}
          >
            <FolderGit2 size={16} />
            <span>Tổng Thầu Xây Dựng ({counts.contractor})</span>
          </button>
          <button
            onClick={() => setActiveTab('manufacturer')}
            className={`partner-tab-btn ${activeTab === 'manufacturer' ? 'active' : ''}`}
          >
            <Factory size={16} />
            <span>Nhà Sản Xuất Vật Tư ({counts.manufacturer})</span>
          </button>
        </div>

        {/* Partners Grid */}
        <div className="tg-partners-cards-grid">
          {filteredPartners.map((p) => {
            const isVingroup = p.id === 'vingroup' || p.name.includes('VINGROUP');
            const projectList = parseProjects(p.projects);
            return (
              <div
                key={p.id}
                className={`tg-partner-card-pro ${isVingroup ? 'featured-vingroup-partner' : ''}`}
              >
                {/* Thumbnail Header Box */}
                <div className="partner-card-media-box">
                  {p.thumbnail ? (
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="partner-card-thumb"
                      loading="lazy"
                    />
                  ) : (
                    <div className="partner-card-thumb-placeholder">
                      <Building size={32} style={{ color: p.brandColor || '#0284C7' }} />
                    </div>
                  )}
                  <div className="partner-thumb-overlay">
                    <PartnerLogoBadge name={p.name} logo={p.logo} brandColor={p.brandColor} size={36} />
                    {p.badge && (
                      <span
                        className="partner-tier-badge"
                        style={{
                          backgroundColor: `${p.brandColor || '#0284C7'}EE`,
                          color: '#FFFFFF',
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="partner-card-body">
                  <h3 className="partner-corp-name">{p.name}</h3>
                  <span className="partner-corp-role">{p.role}</span>
                  {p.description && <p className="partner-corp-desc">{p.description}</p>}

                  {/* Associated Projects */}
                  {projectList.length > 0 && (
                    <div className="partner-projects-wrap">
                      <span className="projects-label">Dự án hợp tác tiêu biểu:</span>
                      <div className="partner-projects-chips">
                        {projectList.map((proj, idx) => (
                          <span key={idx} className="project-chip">
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="partner-card-footer">
                  <div className="partner-verified-tag">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <span>Đối tác chiến lược tin cậy</span>
                  </div>
                  <span className="partner-category-lbl">
                    {p.category === 'developer'
                      ? 'Chủ đầu tư'
                      : p.category === 'contractor'
                      ? 'Tổng thầu'
                      : 'Vật tư chính hãng'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Pillars of Collaboration with General Contractors */}
        <div className="tg-partner-commitments">
          <div className="commitments-header text-center">
            <span className="tg-section-badge">CAM KẾT ĐỒNG HÀNH</span>
            <h3 className="commitments-title">4 Trụ Cột Hợp Tác Giữa Trần Gia & Các Tổng Thầu Lớn</h3>
          </div>

          <div className="commitments-grid">
            <div className="commitment-card">
              <div className="commitment-icon-wrap">
                <ShieldCheck size={26} className="text-amber" />
              </div>
              <h4>Hồ Sơ Năng Lực & Pháp Lý Chuẩn Chỉnh</h4>
              <p>
                Đầy đủ chứng chỉ năng lực xây dựng, báo cáo tài chính kiểm toán minh bạch, sẵn sàng bảo lãnh
                thực hiện các gói thầu trần thạch cao quy mô lớn.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon-wrap">
                <Zap size={26} className="text-amber" />
              </div>
              <h4>Tiến Độ Bàn Giao Thần Tốc 3 Ca</h4>
              <p>
                Khả năng huy động 50 đến 200 thợ cơ động, tổ chức thi công 24/7 không gián đoạn, luôn hoàn thành
                vượt mốc bàn giao mặt bằng của Tổng thầu.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon-wrap">
                <Award size={26} className="text-amber" />
              </div>
              <h4>Vật Tư 100% CO/CQ & Chuẩn PCCC</h4>
              <p>
                Chỉ sử dụng vật tư chính hãng từ Vĩnh Tường, Gyproc, Knauf, đầy đủ chứng nhận xuất xứ, kết quả
                thử nghiệm chống cháy EI 60 - EI 120 phút.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon-wrap">
                <HeartHandshake size={26} className="text-amber" />
              </div>
              <h4>Đồng Hành Dài Hạn & An Toàn 100%</h4>
              <p>
                Chính sách bảo hành tận tâm lên đến 24 - 36 tháng, cam kết an toàn lao động tuyệt đối (Zero Accident)
                trên mọi công trường.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
