import React, { useState, useMemo, useEffect } from 'react';
import { Building2, MapPin, Eye, Filter, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { projectService } from '../services/project/project.service';
import { PROJECTS_DATA } from '../services/tranGiaData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onNavigateSection,
}) => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        if (isMounted && data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error('Failed to load projects from DB', err);
      }
    };
    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { id: 'all', label: 'Tất cả loại hình' },
    { id: 'hotel', label: 'Khách sạn & Nghỉ dưỡng' },
    { id: 'residential', label: 'Đô thị & Chung cư cao tầng' },
    { id: 'commercial', label: 'Thương mại & Showroom' },
    { id: 'industrial', label: 'Nhà xưởng & Công nghiệp' },
  ];

  const regions = [
    { id: 'all', label: 'Tất cả khu vực' },
    { id: 'north', label: 'Miền Bắc' },
    { id: 'central', label: 'Miền Trung' },
    { id: 'south', label: 'Miền Nam' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchReg = selectedRegion === 'all' || p.region === selectedRegion;
      const matchSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.scope.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchReg && matchSearch;
    });
  }, [projects, selectedCategory, selectedRegion, searchQuery]);

  return (
    <section className="tg-section tg-projects-section" id="projects">
      <div className="container">
        {/* Section Header */}
        <div className="tg-section-header text-center">
          <span className="tg-section-badge">HÀNH TRÌNH PHÁT TRIỂN</span>
          <h2 className="tg-section-title">DỰ ÁN NỔI BẬT & TIÊU BIỂU</h2>
          <div className="tg-divider"></div>
          <p className="tg-section-desc">
            Trần Gia tự hào đã tham gia thi công hoàn thiện trần, vách, sơn bả và nội thất cho hàng loạt công trình
            trọng điểm từ Bắc vào Nam cho các chủ đầu tư danh tiếng: Vingroup, Delta, Viettel, MBland, Masterise...
          </p>
        </div>

        {/* Filter Bar */}
        <div className="tg-projects-filter-bar">
          {/* Category Tabs */}
          <div className="filter-category-tabs">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`filter-btn ${selectedCategory === c.id ? 'active' : ''}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Region & Search Controls */}
          <div className="filter-controls-row">
            <div className="region-select-wrap">
              <Filter size={15} className="text-slate-400" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="region-select"
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-input-wrap">
              <Search size={15} className="text-slate-400" />
              <input
                type="text"
                placeholder="Tìm dự án, địa điểm, chủ đầu tư..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="project-search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa tìm kiếm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="tg-empty-state">
            <Building2 size={48} className="text-slate-300" />
            <h3>Không tìm thấy dự án phù hợp</h3>
            <p>Vui lòng chọn tiêu chí lọc khác hoặc xóa từ khóa tìm kiếm.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRegion('all');
                setSearchQuery('');
              }}
              className="tg-btn outline-btn mt-4"
            >
              Xem tất cả 15 dự án
            </button>
          </div>
        ) : (
          <div className="tg-projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="tg-project-card"
                onClick={() => onSelectProject(project)}
              >
                {/* Thumbnail Image */}
                <div className="tg-project-thumb-box">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="tg-project-thumb"
                    loading="lazy"
                  />
                  <div className="tg-project-thumb-overlay">
                    <span className="tg-project-view-badge">
                      <Eye size={15} />
                      <span>Xem chi tiết</span>
                    </span>
                  </div>
                  <span className="tg-project-cat-tag">
                    {project.categoryLabel || 'Dự án'}
                  </span>
                </div>

                {/* Content */}
                <div className="tg-project-info">
                  <div className="tg-project-location">
                    <MapPin size={14} className="text-amber flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="tg-project-title">{project.title}</h3>

                  {project.client && (
                    <div className="tg-project-client">
                      <span className="client-label">Chủ đầu tư / Tổng thầu:</span>
                      <span className="client-name">{project.client}</span>
                    </div>
                  )}

                  <div className="tg-project-scope">
                    <span className="scope-tag">Hạng mục:</span>
                    <p className="scope-text">{project.scope}</p>
                  </div>

                  <div className="tg-project-card-footer">
                    <span className="view-detail-link">
                      Chi tiết dự án <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Bar: Total Projects Count & CTA */}
        <div className="tg-projects-bottom-bar text-center">
          <p className="projects-count-note">
            Hiển thị <strong>{filteredProjects.length}</strong> / <strong>{PROJECTS_DATA.length}</strong> dự án tiêu biểu trích lục từ Hồ Sơ Năng Lực Trần Gia.
          </p>
          <button
            onClick={() => onNavigateSection('contact')}
            className="tg-btn primary-solid"
          >
            <span>Đăng Ký Tư Vấn & Hợp Tác Dự Án Mới</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
