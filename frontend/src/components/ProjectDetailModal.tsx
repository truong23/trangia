import React from 'react';
import { X, MapPin, Building, Calendar, CheckCircle2, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  if (!project) return null;

  return (
    <div className="tg-modal-overlay" onClick={onClose}>
      <div className="tg-modal-box project-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="tg-modal-close-btn" onClick={onClose} aria-label="Đóng">
          <X size={20} />
        </button>

        {/* Modal Header Image */}
        <div className="project-modal-hero">
          <img src={project.image} alt={project.title} className="project-modal-img" />
          <div className="project-modal-hero-overlay">
            <span className="project-category-tag">{project.categoryLabel || 'Dự Án Tiêu Biểu'}</span>
            <h2 className="project-modal-title">{project.title}</h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="project-modal-content">
          <div className="project-meta-grid">
            <div className="meta-item">
              <MapPin size={18} className="text-amber" />
              <div>
                <span className="meta-label">Địa điểm:</span>
                <strong className="meta-val">{project.location}</strong>
              </div>
            </div>

            {project.client && (
              <div className="meta-item">
                <Building size={18} className="text-amber" />
                <div>
                  <span className="meta-label">Chủ đầu tư / Tổng thầu:</span>
                  <strong className="meta-val">{project.client}</strong>
                </div>
              </div>
            )}

            {project.year && (
              <div className="meta-item">
                <Calendar size={18} className="text-amber" />
                <div>
                  <span className="meta-label">Thời gian thi công:</span>
                  <strong className="meta-val">{project.year}</strong>
                </div>
              </div>
            )}

            {project.pageInPdf && (
              <div className="meta-item">
                <FileText size={18} className="text-amber" />
                <div>
                  <span className="meta-label">Trang trong Profile PDF:</span>
                  <strong className="meta-val">Trang {project.pageInPdf} | TRẦN GIA PROFILE</strong>
                </div>
              </div>
            )}
          </div>

          {/* Scope of Work */}
          <div className="project-scope-box">
            <h4 className="scope-title">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span>Hạng mục do Trần Gia đảm nhận thi công:</span>
            </h4>
            <p className="scope-desc">{project.scope}</p>
          </div>

          {/* Detailed Description */}
          {project.description && (
            <div className="project-desc-box">
              <h4>Mô tả tổng quan dự án:</h4>
              <p>{project.description}</p>
            </div>
          )}

          {/* Standards & Execution highlights */}
          <div className="project-highlights-box">
            <h4>Cam kết chất lượng thực hiện:</h4>
            <ul>
              <li>
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Thi công bám sát 100% bản vẽ thiết kế và tiêu chuẩn kỹ thuật hiện hành.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Sử dụng vật tư chính hãng, có đầy đủ CO, CQ và biên bản nghiệm thu đầu vào.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Bàn giao đúng tiến độ cam kết với Tổng thầu và Chủ đầu tư.</span>
              </li>
            </ul>
          </div>

          {/* Footer Action */}
          <div className="project-modal-footer">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="tg-btn primary-solid"
            >
              <span>Liên hệ báo giá dự án tương tự</span>
              <ArrowRight size={16} />
            </button>
            <button onClick={onClose} className="tg-btn outline-btn">
              <span>Đóng cửa sổ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
