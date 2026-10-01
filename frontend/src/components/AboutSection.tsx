import React from 'react';
import {
  Quote,
  Target,
  Eye,
  ShieldCheck,
  Clock,
  Award,
  Lightbulb,
  Briefcase,
  Flame,
  Users,
  UserCheck,
  HeartHandshake,
  FileCheck2,
} from 'lucide-react';
import { CEO_LETTER, VISION_MISSION_VALUES, OPERATING_PRINCIPLES, TRAN_GIA_INFO } from '../services/tranGiaData';
import { SiteSettings } from '../types';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Clock,
  Award,
  Lightbulb,
  Briefcase,
  Flame,
  Users,
  UserCheck,
  Handshake: HeartHandshake,
  HeartHandshake,
};

interface AboutSectionProps {
  onOpenProfileModal: () => void;
  settings?: SiteSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenProfileModal, settings }) => {
  const company = settings?.company;
  const companyName = company?.name || TRAN_GIA_INFO.companyName;
  const director = company?.director || CEO_LETTER.author;
  const slogan = company?.slogan || CEO_LETTER.sloganHighlight;
  return (
    <section className="tg-section tg-about-section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="tg-section-header text-center">
          <span className="tg-section-badge">HỒ SƠ NĂNG LỰC TRẦN GIA</span>
          <h2 className="tg-section-title">GIỚI THIỆU & TRIẾT LÝ PHÁT TRIỂN</h2>
          <div className="tg-divider"></div>
          <p className="tg-section-desc">
            Với định hướng phát triển bền vững và lấy chữ <strong>"TÍN"</strong> làm kim chỉ nam, Trần Gia tự hào
            là đối tác tin cậy thi công hoàn thiện của các dự án tầm cỡ quốc gia.
          </p>
        </div>

        {/* 1. Letter From CEO (Thư ngỏ Giám đốc) */}
        <div className="tg-letter-card" id="letter">
          <div className="tg-letter-decor-quote">
            <Quote size={80} />
          </div>
          <div className="tg-letter-content">
            <div className="tg-letter-badge">THƯ NGỎ TỪ BAN GIÁM ĐỐC</div>
            <h3 className="tg-letter-heading">{CEO_LETTER.salutation}</h3>

            <div className="tg-letter-body">
              {CEO_LETTER.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="tg-letter-footer">
              <div className="tg-letter-slogan-box">
                <span className="slogan-label">Phương châm hành động:</span>
                <span className="slogan-text">"{slogan}"</span>
              </div>
              <div className="tg-letter-signature">
                <p className="sign-title">Giám đốc công ty</p>
                <div className="sign-name">{director}</div>
                <p className="sign-company">{companyName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Company Introduction Overview */}
        <div className="tg-overview-grid" id="about-overview">
          <div className="tg-overview-card">
            <div className="tg-overview-icon-wrap">
              <FileCheck2 size={32} className="text-primary" />
            </div>
            <h3>Hồ Sơ Năng Lực Pháp Lý</h3>
            <p>
              Doanh nghiệp thành lập và hoạt động theo quy định pháp luật Việt Nam, đầy đủ chứng nhận năng lực hoạt động
              xây dựng, quy trình làm việc chuẩn mực và hồ sơ nghiệm thu bài bản.
            </p>
          </div>

          <div className="tg-overview-card">
            <div className="tg-overview-icon-wrap">
              <Users size={32} className="text-primary" />
            </div>
            <h3>Đội Ngũ 50+ Nhân Sự Tâm Huyết</h3>
            <p>
              Được dẫn dắt bởi ban lãnh đạo giàu kinh nghiệm, đội ngũ 10 cán bộ chủ chốt quản lý, kỹ sư chuyên môn cao
              và 36 công nhân kỹ thuật lành nghề cùng 50-200 lao động thời vụ.
            </p>
          </div>

          <div className="tg-overview-card">
            <div className="tg-overview-icon-wrap">
              <Award size={32} className="text-primary" />
            </div>
            <h3>Hợp Tác & Nghiên Cứu Chuyên Sâu</h3>
            <p>
              Thường xuyên hợp tác với các viện nghiên cứu, công ty tư vấn và các trường đại học chuyên ngành xây dựng
              nhằm không ngừng nâng cao năng lực kỹ thuật và chuyển giao công nghệ mới.
            </p>
          </div>
        </div>

        {/* 3. Vision & Mission */}
        <div className="tg-vision-mission-row" id="vision-values">
          <div className="tg-vm-card vision-box">
            <div className="tg-vm-header">
              <Eye size={28} className="text-amber" />
              <h3>{VISION_MISSION_VALUES.vision.title}</h3>
            </div>
            <p>{VISION_MISSION_VALUES.vision.content}</p>
          </div>

          <div className="tg-vm-card mission-box">
            <div className="tg-vm-header">
              <Target size={28} className="text-amber" />
              <h3>{VISION_MISSION_VALUES.mission.title}</h3>
            </div>
            <p>{VISION_MISSION_VALUES.mission.content}</p>
          </div>
        </div>

        {/* 4. 6 Core Values */}
        <div className="tg-core-values-wrapper">
          <h3 className="tg-sub-heading text-center">6 GIÁ TRỊ CỐT LÕI TẠO NÊN THƯƠNG HIỆU TRẦN GIA</h3>
          <div className="tg-values-grid">
            {VISION_MISSION_VALUES.coreValues.map((val, idx) => {
              const Icon = iconMap[val.icon] || ShieldCheck;
              return (
                <div key={idx} className="tg-value-card">
                  <div className="tg-value-icon-box" style={{ borderColor: val.color }}>
                    <Icon size={24} style={{ color: val.color }} />
                  </div>
                  <h4 className="tg-value-title">{val.title}</h4>
                  <p className="tg-value-desc">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Operating Principles (4 Nguyên tắc hoạt động) */}
        <div className="tg-principles-wrapper" id="principles">
          <h3 className="tg-sub-heading text-center">NGUYÊN TẮC HOẠT ĐỘNG</h3>
          <p className="tg-sub-desc text-center">
            Cam kết chuẩn mực ứng xử chuyên nghiệp và đạo đức kinh doanh bền vững của tập thể Trần Gia
          </p>

          <div className="tg-principles-grid">
            {OPERATING_PRINCIPLES.map((principle, idx) => {
              const Icon = iconMap[principle.icon] || Users;
              return (
                <div key={idx} className="tg-principle-card">
                  <div className="tg-principle-header">
                    <Icon size={22} className="text-amber" />
                    <h4>{principle.target}</h4>
                  </div>
                  <ul className="tg-principle-list">
                    {principle.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
