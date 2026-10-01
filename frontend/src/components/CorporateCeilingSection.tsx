import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  ChevronRight,
  Download,
  PhoneCall,
  HelpCircle,
  FileCheck,
  Wrench,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Project } from '../types';
import { PROJECTS_DATA, TRAN_GIA_INFO } from '../services/tranGiaData';
import { Language } from '../services/i18n';

interface CorporateCeilingSectionProps {
  onSelectProject: (project: Project) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenProfileModal: () => void;
  currentLang?: Language;
}

export const CorporateCeilingSection: React.FC<CorporateCeilingSectionProps> = ({
  onSelectProject,
  onNavigateSection,
  onOpenProfileModal,
  currentLang = 'vi',
}) => {
  const isEn = currentLang === 'en';
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter specific corporate & VinGroup projects
  const corporateProjects = PROJECTS_DATA.filter((p) =>
    ['vinhomes-grand-park', 'vinfast-showrooms', 'vincom-dian', 'nam-hoi-an-5star', 'masteri-hung-yen', 'sentosa-sky-park', 'dong-gia-5star-hotel'].includes(p.id)
  );

  const [activeProjectTab, setActiveProjectTab] = useState<string>(corporateProjects[0]?.id || 'vinhomes-grand-park');
  const selectedProject = corporateProjects.find((p) => p.id === activeProjectTab) || corporateProjects[0];

  const standardsComparison = isEn
    ? [
        {
          feature: 'Structural Framing System',
          standard: 'High-tensile zinc-aluminum coated steel with reinforced ribs, thickness ≥ 0.4 - 0.5mm',
          common: 'Standard thin steel framing susceptible to oxidation and sagging over time',
        },
        {
          feature: 'Suspension & Load Capacity',
          standard: 'Galvanized threaded rods anchored with steel expansion bolts, safe load 15 - 20kg/m²',
          common: 'Hanging wire with plastic anchors, prone to vibration and structural sagging',
        },
        {
          feature: 'Elevation Precision',
          standard: 'Calibrated with 65 high-frequency 3D laser levels, elevation error < 1mm/m',
          common: 'Traditional plumb line measurements with noticeable surface wave defects',
        },
        {
          feature: 'Joint Treatment',
          standard: 'Specialized fiberglass mesh tape + 3-layer anti-crack compound application',
          common: 'Standard joint compound leading to hairline crack defects after 3 - 6 months',
        },
        {
          feature: 'Fire Rating & Standards',
          standard: 'Certified fire-rated drywalls and ceilings achieving EI 60 - EI 120 minutes',
          common: 'No certified fire testing, failing strict enterprise site inspections',
        },
        {
          feature: 'Deployment Speed',
          standard: '24/7 continuous 3-shift workforce, 50 - 200 mobile craftsmen on demand',
          common: 'Limited manpower unable to meet aggressive general contractor schedules',
        },
      ]
    : [
        {
          feature: 'Hệ Khung Xương Chịu Lực',
          standard: 'Thép mạ hợp kim nhôm kẽm cao cấp, dập gân tăng cứng, độ dày chuẩn ≥ 0.4 - 0.5mm',
          common: 'Thép cán mỏng thông thường, dễ bị oxy hóa và biến dạng theo thời gian',
        },
        {
          feature: 'Hệ Ti Treo & Tải Trọng',
          standard: 'Ti ren mạ kẽm liên kết tắc kê đạn / nở rút bê tông, chịu tải an toàn 15 - 20kg/m²',
          common: 'Treo bằng dây thép buộc kẹp nở nhựa, dễ rung lắc và võng võng sập',
        },
        {
          feature: 'Độ Chuẩn Xác Cao Độ',
          standard: 'Cân chỉnh bằng 65 máy laser 3D định vị cao tần, sai số cao độ < 1mm/m',
          common: 'Đo dọi truyền thống, sai số cao độ lớn gây gợn sóng bề mặt trần',
        },
        {
          feature: 'Xử Lý Mối Nối Tấm',
          standard: 'Băng keo lưới sợi thủy tinh chuyên dụng + 3 lớp bột bả chống nứt chuyên sâu',
          common: 'Bột bả thông thường, dễ xuất hiện vết rạn chân chim sau 3 - 6 tháng',
        },
        {
          feature: 'Tiêu Chuẩn Chống Cháy & PCCC',
          standard: 'Vách và trần thạch cao chống cháy chuyên dụng đạt EI 60 - EI 120 phút, có kiểm định',
          common: 'Không có chứng chỉ kiểm định PCCC, không đạt tiêu chuẩn nghiệm thu dự án lớn',
        },
        {
          feature: 'Tiến Độ & Năng Lực Triển Khai',
          standard: 'Sẵn sàng thi công 3 ca liên tục 24/7, quân số 50 - 200 thợ cơ động bàn giao thần tốc',
          common: 'Quân số mỏng, không đảm bảo tiến độ gối đầu của các tổng thầu lớn',
        },
      ];

  const faqs = isEn
    ? [
        {
          q: 'Which VinGroup projects has Tran Gia executed gypsum ceiling systems for?',
          a: 'Tran Gia is proud to have executed drywall, gypsum ceiling, and finishing packages across flagship developments within the VinGroup ecosystem: Vinhomes Grand Park (Thu Duc City, HCM), VinFast QS 3 Southern Showroom Chain, Vincom Plaza Di An (Binh Duong), and the 5-Star Nam Hoi An Resort Complex. All packages met VinGroup most stringent quality inspections.',
        },
        {
          q: 'Why do major conglomerates and general contractors choose Tran Gia?',
          a: 'Leading groups like VinGroup, DELTA, Viettel Construction, and Masterise Homes trust Tran Gia for 4 distinct strengths: (1) Over 300 modern machinery units (65 3D lasers, 120 drywall screwdrivers); (2) 50+ staff engineers and craftsmen scalable to 200 project workers; (3) 24/7 3-shift capability ensuring rapid milestone handovers; (4) Transparent legal capacity, complete CO/CQ documentation, and 100% occupational safety compliance.',
        },
        {
          q: 'Do Tran Gia drywall and ceiling materials come with full CO/CQ and fire-safety certificates?',
          a: 'Yes. All gypsum boards, steel framing, and accessories supplied and installed by Tran Gia carry full Certificate of Origin (CO) and Certificate of Quality (CQ) from leading manufacturers (Vinh Tuong, Gyproc, Knauf, Boral). Fire-rated partition systems are rigorously certified for EI 60, EI 90, and EI 120 minutes in full accordance with national building codes.',
        },
        {
          q: 'How does Tran Gia conduct QA/QC inspections on site?',
          a: 'Tran Gia enforces a standardized 6-step QA/QC protocol: from 3D laser benchmark verification, material and method statement approvals, framing load inspection, staggered board fastening, 3-layer anti-crack joint finishing, to tripartite final handover with Project Management Consultants and Owners.',
        },
        {
          q: 'Does Tran Gia provide turnkey ceiling execution nationwide?',
          a: 'Yes. Tran Gia operates mobile engineering and installation crews nationwide across Northern, Central, and Southern Vietnam. Hotline for enterprise inquiries: 0986 078 270.',
        },
      ]
    : [
        {
          q: 'Trần Gia đã có kinh nghiệm thi công trần thạch cao cho những dự án nào của VinGroup?',
          a: 'Trần Gia tự hào đã tham gia thi công trần vách thạch cao và hoàn thiện cho nhiều dự án trọng điểm trong hệ sinh thái VinGroup, bao gồm: Đại đô thị Vinhomes Grand Park (TP. Thủ Đức, TP.HCM), Hệ thống chuỗi Showroom VinFast QS 3 Phía Nam, Trung tâm thương mại Vincom Dĩ An (Bình Dương) và Quần thể Nghỉ dưỡng 5 sao Nam Hội An. Mọi hạng mục đều được nghiệm thu với tiêu chuẩn khắt khe nhất từ VinGroup.',
        },
        {
          q: 'Tại sao các Tập đoàn lớn và Tổng thầu hàng đầu chọn Trần Gia làm nhà thầu thi công trần thạch cao?',
          a: 'Các tập đoàn lớn như VinGroup, DELTA, Viettel Construction, Masterise Homes chọn Trần Gia bởi 4 lợi thế vượt trội: (1) Năng lực máy móc đồng bộ với hơn 300 thiết bị chuyên dụng; (2) Đội ngũ hơn 50 kỹ sư & thợ lành nghề cùng khả năng huy động 50-200 thợ thời vụ; (3) Năng lực thi công 3 ca 24/7 bàn giao thần tốc theo tiến độ công trường; (4) Hồ sơ pháp lý minh bạch, chứng chỉ năng lực xây dựng và 100% tuân thủ an toàn lao động.',
        },
        {
          q: 'Vật tư trần thạch cao do Trần Gia thi công có đầy đủ chứng chỉ chất lượng CO/CQ và PCCC không?',
          a: 'Toàn bộ vật tư trần vách thạch cao do Trần Gia cung ứng và thi công đều có đầy đủ chứng nhận nguồn gốc xuất xứ CO/CQ từ các nhà sản xuất hàng đầu (Vĩnh Tường, Gyproc, Knauf, Boral). Hệ vách thạch cao ngăn phòng và vách chống cháy có đầy đủ chứng chỉ kiểm định PCCC đạt tiêu chuẩn EI 60, EI 90 và EI 120 phút theo QCVN 06:2022/BXD.',
        },
        {
          q: 'Quy trình kiểm soát chất lượng và nghiệm thu trần thạch cao của Trần Gia diễn ra như thế nào?',
          a: 'Trần Gia áp dụng quy trình KCS 6 bước chuẩn hóa: Từ khâu khảo sát cốt cao độ laser 3D -> Trình mẫu vật tư và Biện pháp thi công (BPTC) -> Nghiệm thu lắp dựng hệ khung xương chịu tải -> Nghiệm thu bắn tấm sole chống nứt -> Xử lý mối nối và sơn bả hoàn thiện -> Bàn giao nghiệm thu ba bên cùng Tư vấn Giám sát (TVGS) và Chủ đầu tư.',
        },
        {
          q: 'Trần Gia có nhận thi công trần thạch cao trọn gói trên toàn quốc không?',
          a: 'Có. Trần Gia có mạng lưới nhân sự và trang thiết bị cơ động triển khai thi công trên toàn quốc: Miền Bắc (Hà Nội, Quảng Ninh, Hải Phòng, Hải Dương, Hưng Yên, Thanh Hóa...), Miền Trung (Đà Nẵng, Quảng Nam...) và Miền Nam (TP.HCM, Bình Dương, Tây Ninh...). Hotline tiếp nhận dự án tập đoàn: 0986 078 270.',
        },
      ];

  return (
    <section className="tg-section tg-corporate-ceiling-section" id="corporate-ceiling">
      <div className="container">
        {/* Section Header */}
        <div className="tg-section-header text-center">
          <div className="tg-section-badge-cluster">
            <span className="tg-section-badge">
              {isEn ? 'CONGLOMERATE CONTRACTOR CAPACITY' : 'NĂNG LỰC NHÀ THẦU CẤP TẬP ĐOÀN'}
            </span>
            <span className="tg-highlight-pill">
              {isEn ? 'PARTNER OF VINGROUP • DELTA • VIETTEL' : 'ĐỐI TÁC VINGROUP • DELTA • VIETTEL'}
            </span>
          </div>

          {/* Target Keyword H2 */}
          <h2 className="tg-section-title">
            {isEn
              ? 'GYPSUM CEILING CONTRACTOR FOR MAJOR CORPORATIONS'
              : 'THI CÔNG TRẦN THẠCH CAO CHO CÁC TẬP ĐOÀN LỚN'}
          </h2>
          <div className="tg-divider"></div>
          <p className="tg-section-desc tg-corporate-lead">
            {isEn ? (
              <>
                <strong>Tran Gia Construction</strong> is a premier contractor specializing in{' '}
                <strong>gypsum ceiling and drywall systems for major corporations</strong> across Vietnam. Proud to
                partner with <strong>VinGroup</strong> (Vinhomes Grand Park, VinFast Showroom chain, Vincom),{' '}
                <strong>DELTA Group</strong>, <strong>Viettel Construction</strong>, and{' '}
                <strong>Masterise Homes</strong> to create landmark projects meeting international standards.
              </>
            ) : (
              <>
                <strong>Trần Gia Construction</strong> khẳng định vị thế nhà thầu hàng đầu chuyên{' '}
                <strong>thi công trần thạch cao cho các tập đoàn lớn</strong> tại Việt Nam. Tự hào đồng hành cùng{' '}
                <strong>Tập đoàn Vingroup</strong> (Vinhomes Grand Park, chuỗi Showroom VinFast, Vincom),{' '}
                <strong>DELTA Group</strong>, <strong>Viettel Construction</strong>,{' '}
                <strong>Masterise Homes</strong> kiến tạo những công trình quy mô biểu tượng đạt chuẩn quốc tế.
              </>
            )}
          </p>
        </div>

        {/* Key Corporate Metrics */}
        <div className="tg-corporate-metrics-grid">
          <div className="tg-corp-metric-card">
            <div className="corp-metric-icon">
              <Building2 size={28} />
            </div>
            <div className="corp-metric-val">15+</div>
            <div className="corp-metric-name">
              {isEn ? 'Enterprise Landmark Projects' : 'Dự Án Trọng Điểm Cấp Tập Đoàn'}
            </div>
            <p className="corp-metric-sub">
              {isEn ? 'Vinhomes, VinFast, Vincom, Masteri, Delta systems' : 'Hệ thống Vinhomes, VinFast, Vincom, Masteri, Delta'}
            </p>
          </div>

          <div className="corp-metric-card">
            <div className="corp-metric-icon">
              <Users size={28} />
            </div>
            <div className="corp-metric-val">50 - 200</div>
            <div className="corp-metric-name">
              {isEn ? 'Engineers & Skilled Workforce' : 'Kỹ Sư & Thợ Cơ Động'}
            </div>
            <p className="corp-metric-sub">
              {isEn ? 'Ready for 24/7 3-shift accelerated execution' : 'Sẵn sàng tăng ca 3 ca liên tục 24/7 theo lệnh CĐT'}
            </p>
          </div>

          <div className="corp-metric-card">
            <div className="corp-metric-icon">
              <Wrench size={28} />
            </div>
            <div className="corp-metric-val">300+</div>
            <div className="corp-metric-name">
              {isEn ? 'Modern Specialized Equipment' : 'Thiết Bị Chuyên Dụng Hiện Đại'}
            </div>
            <p className="corp-metric-sub">
              {isEn ? '65 3D lasers with < 1mm tolerance, 120 screwdrivers' : '65 máy laser 3D định vị sai số < 1mm, 120 máy bắn vít'}
            </p>
          </div>

          <div className="corp-metric-card">
            <div className="corp-metric-icon">
              <ShieldCheck size={28} />
            </div>
            <div className="corp-metric-val">100%</div>
            <div className="corp-metric-name">
              {isEn ? 'ISO Standards & Fire Rating' : 'Chuẩn ISO & Nghiệm Thu PCCC'}
            </div>
            <p className="corp-metric-sub">
              {isEn ? 'Full CO/CQ, method statements, and zero accident policy' : 'Đầy đủ hồ sơ CO/CQ, BPTC và an toàn lao động tuyệt đối'}
            </p>
          </div>
        </div>

        {/* Featured Showcase: VinGroup & Major Corporate Projects */}
        <div className="tg-corp-showcase-box mt-4">
          <div className="tg-showcase-header">
            <div className="tg-showcase-title-wrap">
              <span className="tg-showcase-tag">
                {isEn ? 'PROVEN CASE STUDIES' : 'CASE STUDIES THỰC TẾ'}
              </span>
              <h3 className="tg-showcase-title">
                {isEn
                  ? 'Gypsum Ceiling Projects For VinGroup & Major Corporations'
                  : 'Dự Án Thi Công Trần Thạch Cao Cho VinGroup & Các Tập Đoàn Lớn'}
              </h3>
            </div>
            <div className="tg-showcase-actions">
              <button
                onClick={() => onNavigateSection('projects')}
                className="tg-link-btn"
              >
                <span>{isEn ? 'View all projects' : 'Xem tất cả dự án'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Project Selector Pills */}
          <div className="tg-corp-project-tabs">
            {corporateProjects.map((p) => {
              const isActive = p.id === activeProjectTab;
              const isVingroup = p.client?.includes('VINGROUP') || p.title.includes('Vin') || p.title.includes('VIN');
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProjectTab(p.id)}
                  className={`tg-corp-tab-btn ${isActive ? 'active' : ''} ${isVingroup ? 'vingroup-pill' : ''}`}
                >
                  {isVingroup && <span className="vingroup-badge">VinGroup</span>}
                  <span>{p.title.replace('Dự án ', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Active Project Card */}
          {selectedProject && (
            <div className="tg-corp-project-display">
              <div className="display-media-col">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="display-img"
                  loading="lazy"
                />
                <div className="display-badge-overlay">
                  <span className="badge-location">{selectedProject.location}</span>
                  {selectedProject.client && (
                    <span className="badge-client">
                      {isEn ? `Client: ${selectedProject.client}` : `CĐT: ${selectedProject.client}`}
                    </span>
                  )}
                </div>
              </div>

              <div className="display-content-col">
                <div className="display-meta-top">
                  <span className="meta-category">{selectedProject.categoryLabel}</span>
                  <span className="meta-year">{selectedProject.year || '2022 - 2024'}</span>
                  <span className="meta-pdf">
                    {isEn ? `Page ${selectedProject.pageInPdf} in Profile PDF` : `Trang ${selectedProject.pageInPdf} trong Hồ Sơ Năng Lực`}
                  </span>
                </div>

                <h4 className="display-title">{selectedProject.title}</h4>
                <p className="display-scope">
                  <strong>{isEn ? 'Scope of Work:' : 'Hạng mục thi công:'}</strong> {selectedProject.scope}
                </p>

                <p className="display-desc">
                  {selectedProject.description}{' '}
                  {isEn
                    ? 'A benchmark project executed by Tran Gia delivering turnkey gypsum ceilings, fire-rated drywalls, and specialized architectural finishes under stringent specifications.'
                    : 'Đây là một trong những công trình quy mô tiêu biểu mà Trần Gia đã đảm nhận thi công trọn gói hệ thống trần thạch cao, vách ngăn và hoàn thiện với yêu cầu khắt khe về kỹ thuật và tiến độ bàn giao.'}
                </p>

                <div className="display-tech-highlights">
                  <div className="tech-item">
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                    <span>{isEn ? 'ISO-compliant high-strength framing system' : 'Hệ khung xương chịu tải cao cấp tiêu chuẩn ISO'}</span>
                  </div>
                  <div className="tech-item">
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                    <span>{isEn ? '3D laser elevation leveling with < 1mm tolerance' : 'Định vị cao độ bằng máy Laser chuyên dụng sai số < 1mm'}</span>
                  </div>
                  <div className="tech-item">
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                    <span>{isEn ? '3-layer anti-crack joint treatment with fiberglass mesh' : 'Xử lý mối nối chống rạn nứt bằng 3 lớp chuyên sâu'}</span>
                  </div>
                  <div className="tech-item">
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                    <span>{isEn ? '100% occupational safety compliance & on-time delivery' : 'Đảm bảo 100% an toàn lao động và tiến độ bàn giao cho Tổng thầu'}</span>
                  </div>
                </div>

                <div className="display-actions">
                  <button
                    onClick={() => onSelectProject(selectedProject)}
                    className="tg-btn primary-solid"
                  >
                    <span>{isEn ? 'View Project Details' : 'Xem chi tiết dự án này'}</span>
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={onOpenProfileModal}
                    className="tg-btn outline-btn"
                  >
                    <Download size={16} />
                    <span>
                      {isEn
                        ? `View Page ${selectedProject.pageInPdf} in PDF`
                        : `Xem trang ${selectedProject.pageInPdf} trong PDF Profile`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Pillars of Excellence for Corporations */}
        <div className="tg-pillars-section mt-5">
          <div className="text-center mb-4">
            <span className="tg-section-badge">
              {isEn ? 'OUR CORE ADVANTAGES' : 'TIÊU CHUẨN KHÁC BIỆT'}
            </span>
            <h3 className="tg-sub-heading">
              {isEn
                ? 'Why Major Conglomerates Choose Tran Gia?'
                : 'Tại Sao Các Tập Đoàn Lớn & Ban Quản Lý Dự Án Chọn Trần Gia?'}
            </h3>
            <p className="tg-sub-lead">
              {isEn
                ? 'Comprehensively meeting stringent requirements on schedule speed, technical quality, and zero-accident safety.'
                : 'Đáp ứng trọn vẹn những đòi hỏi nghiêm ngặt nhất về tiến độ, chất lượng và an toàn của các dự án cấp quốc gia.'}
            </p>
          </div>

          <div className="tg-pillars-grid">
            <div className="tg-pillar-card">
              <div className="pillar-num">01</div>
              <div className="pillar-icon-box">
                <Zap size={24} />
              </div>
              <h4>{isEn ? '24/7 Rapid Execution' : 'Tiến Độ Thần Tốc 24/7'}</h4>
              <p>
                {isEn
                  ? 'Capable of continuous 3-shift day & night deployment to meet tight handover schedules for VinGroup, Delta, and Viettel without missing milestones.'
                  : 'Sẵn sàng tổ chức thi công 3 ca liên tục cả ngày lẫn đêm để kịp tiến độ bàn giao mặt bằng cho các tập đoàn lớn như Vingroup, Delta. Cam kết không chậm trễ bất kỳ mốc tiến độ (milestone) nào của dự án.'}
              </p>
            </div>

            <div className="tg-pillar-card">
              <div className="pillar-num">02</div>
              <div className="pillar-icon-box">
                <Award size={24} />
              </div>
              <h4>{isEn ? 'ISO Standard Quality' : 'Chất Lượng Kỹ Thuật Đạt Chuẩn ISO'}</h4>
              <p>
                {isEn
                  ? 'Standardized framing and board fastening. Precision 3D laser leveling and 3-layer joint finishing create flawlessly smooth surfaces.'
                  : 'Áp dụng quy trình lắp dựng khung xương và bắn tấm chuẩn xác. Cân chỉnh cao độ tuyệt đối bằng hệ thống 65 máy laser 3D, xử lý mối nối chống rạn nứt tuyệt đối, tạo bề mặt trần phẳng mịn hoàn hảo.'}
              </p>
            </div>

            <div className="tg-pillar-card">
              <div className="pillar-num">03</div>
              <div className="pillar-icon-box">
                <FileCheck size={24} />
              </div>
              <h4>{isEn ? 'Complete Legal & QA/QC Files' : 'Hồ Sơ Pháp Lý & Nghiệm Thu Bài Bản'}</h4>
              <p>
                {isEn
                  ? 'Full construction eligibility licenses, CO/CQ certificates, method statements, HSE plans, and seamless as-built handover dossiers.'
                  : 'Đầy đủ chứng chỉ năng lực hoạt động xây dựng, chứng chỉ CO/CQ vật tư, biện pháp thi công (BPTC), kế hoạch an toàn vệ sinh lao động và hồ sơ hoàn công nghiệm thu chặt chẽ cùng Ban Quản lý & TVGS.'}
              </p>
            </div>

            <div className="tg-pillar-card">
              <div className="pillar-num">04</div>
              <div className="pillar-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h4>{isEn ? 'Zero-Accident Safety' : 'An Toàn Lao Động Tuyệt Đối'}</h4>
              <p>
                {isEn
                  ? '100% certified site personnel equipped with standardized PPE. Strict enforcement of 5S and site fire safety regulations.'
                  : '100% cán bộ công nhân viên được huấn luyện an toàn lao động, trang bị đầy đủ bảo hộ lao động đạt chuẩn kiểm định. Thực hiện nghiêm ngặt quy định 5S và phòng cháy chữa cháy trên công trường.'}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Comparison Table */}
        <div className="tg-standards-table-wrap mt-5">
          <div className="table-header-block">
            <span className="tg-section-badge">
              {isEn ? 'TECHNICAL MATRIX' : 'BẢNG TIÊU CHUẨN KỸ THUẬT'}
            </span>
            <h3 className="tg-sub-heading">
              {isEn
                ? 'Comparison: Enterprise Gypsum Ceilings vs. Standard Installation'
                : 'So Sánh: Thi Công Trần Thạch Cao Tập Đoàn Lớn vs. Thi Công Thông Thường'}
            </h3>
            <p className="tg-sub-lead">
              {isEn
                ? 'The essential differences ensuring longevity and aesthetics for landmark VinGroup and corporate developments.'
                : 'Sự khác biệt cốt lõi tạo nên chất lượng trường tồn cho các công trình trọng điểm của VinGroup và các chủ đầu tư danh tiếng.'}
            </p>
          </div>

          <div className="table-responsive">
            <table className="tg-comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>{isEn ? 'Technical Criteria' : 'Tiêu Chí Kỹ Thuật'}</th>
                  <th style={{ width: '43%' }} className="highlight-col">
                    {isEn
                      ? 'Tran Gia Standard (Major Enterprise Projects)'
                      : 'Tiêu Chuẩn Thi Công Trần Gia (Dự Án Tập Đoàn Lớn)'}
                  </th>
                  <th style={{ width: '35%' }}>
                    {isEn ? 'Standard Residential Execution' : 'Thi Công Thông Thường Dân Dụng'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {standardsComparison.map((row, idx) => (
                  <tr key={idx}>
                    <td className="feature-name">
                      <strong>{row.feature}</strong>
                    </td>
                    <td className="highlight-col">
                      <div className="cell-flex">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                        <span>{row.standard}</span>
                      </div>
                    </td>
                    <td className="text-muted">
                      <span>{row.common}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6-Step Standardized Workflow */}
        <div className="tg-corp-workflow-wrap mt-5">
          <div className="text-center mb-4">
            <span className="tg-section-badge">
              {isEn ? 'STANDARDIZED WORKFLOW' : 'QUY TRÌNH CHUẨN HÓA'}
            </span>
            <h3 className="tg-sub-heading">
              {isEn
                ? '6-Step Gypsum Ceiling Execution For Conglomerates'
                : 'Quy Trình 6 Bước Thi Công Trần Thạch Cao Cho Tập Đoàn & Tổng Thầu'}
            </h3>
            <p className="tg-sub-lead">
              {isEn
                ? 'Standardized and synchronized from method statement approval to final as-built signoff.'
                : 'Được chuẩn hóa bài bản, đồng bộ từ khâu lập hồ sơ đến bàn giao quyết toán công trình.'}
            </p>
          </div>

          <div className="tg-workflow-steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h5>{isEn ? 'Survey & Method Statement' : 'Khảo Sát & Lập BPTC'}</h5>
              <p>
                {isEn
                  ? 'Verify site elevations, draft detailed Method Statements and progress milestones for approval.'
                  : 'Khảo sát hiện trạng cốt cao độ, lập Biện pháp thi công (BPTC) và tiến độ chi tiết trình TVGS/CĐT.'}
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h5>{isEn ? 'Material Submittals' : 'Trình Mẫu Vật Tư Đạt Chuẩn'}</h5>
              <p>
                {isEn
                  ? 'Submit board samples, framing specs, CO/CQ certificates, and fire testing results.'
                  : 'Trình mẫu tấm thạch cao, khung xương, phụ kiện kèm chứng chỉ CO/CQ và kết quả thí nghiệm PCCC.'}
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h5>{isEn ? '3D Laser & Framing' : 'Định Vị Laser & Lắp Khung'}</h5>
              <p>
                {isEn
                  ? 'Align exact heights via 3D lasers, set steel anchors, and erect load-bearing framing.'
                  : 'Sử dụng máy laser 3D định vị cao độ chuẩn xác, bắn tắc kê đạn và lắp dựng hệ khung xương chịu tải.'}
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <h5>{isEn ? 'Boarding & Jointing' : 'Bắn Tấm & Xử Lý Mối Nối'}</h5>
              <p>
                {isEn
                  ? 'Stagger boards, embed fiberglass mesh tape, and apply 3 coats of anti-crack compound.'
                  : 'Lắp đặt tấm thạch cao so le mép, dán băng keo lưới sợi thủy tinh và trét 3 lớp bột bả chống rạn nứt.'}
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">05</div>
              <h5>{isEn ? 'Skim Coating & Paint' : 'Sơn Bả Hoàn Thiện Tinh Xảo'}</h5>
              <p>
                {isEn
                  ? 'Double skim coat, dust-free mechanical sanding, and architectural paint finishing.'
                  : 'Bả matit 2 lớp, xả nhám bằng máy hút bụi chuyên dụng và sơn phủ màu sắc nét theo thiết kế CĐT.'}
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">06</div>
              <h5>{isEn ? 'Handover & Warranty' : 'Nghiệm Thu KCS & Bảo Hành'}</h5>
              <p>
                {isEn
                  ? 'Internal QA signoff, joint inspection with Consultants/Owner, and extended warranty.'
                  : 'Nghiệm thu nội bộ KCS, bàn giao cùng TVGS & CĐT, cung cấp hồ sơ hoàn công và cam kết bảo hành dài hạn.'}
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Ceiling FAQs (Rich SEO Value) */}
        <div className="tg-corp-faq-box mt-5">
          <div className="text-center mb-4">
            <span className="tg-section-badge">
              {isEn ? 'FAQ & INSIGHTS' : 'HỎI ĐÁP CHUYÊN SÂU'}
            </span>
            <h3 className="tg-sub-heading">
              {isEn
                ? 'Frequently Asked Questions on Enterprise Ceiling Execution'
                : 'Câu Hỏi Thường Gặp Về Thi Công Trần Thạch Cao Cho Các Tập Đoàn Lớn'}
            </h3>
            <p className="tg-sub-lead">
              {isEn
                ? 'Detailed answers tailored for Developers, General Contractors, and Project Management teams.'
                : 'Giải đáp chi tiết dành riêng cho Chủ đầu tư, Tổng thầu xây dựng và Ban Quản lý dự án.'}
            </p>
          </div>

          <div className="tg-faq-accordion">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-q-text">
                      <HelpCircle size={18} className="text-amber flex-shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="tg-corp-cta-banner mt-5">
          <div className="cta-content-left">
            <span className="cta-badge">
              {isEn ? 'STRATEGIC COOPERATION WITH TRAN GIA' : 'HỢP TÁC CHIẾN LƯỢC CÙNG TRẦN GIA'}
            </span>
            <h3 className="cta-title">
              {isEn
                ? 'Looking for a First-Class Drywall & Ceiling Contractor for Your Development?'
                : 'Quý Khách Hàng Đang Tìm Nhà Thầu Thi Công Trần Thạch Cao Đẳng Cấp Cho Dự Án Lớn?'}
            </h3>
            <p className="cta-desc">
              {isEn
                ? 'Tran Gia chief engineers are ready to conduct on-site surveys, advise cost-effective engineering solutions, and prepare comprehensive schedules for your tender.'
                : 'Trần Gia sẵn sàng cử kỹ sư trưởng khảo sát thực địa, tư vấn giải pháp kỹ thuật tối ưu chi phí và lập bảng tiến độ chi tiết cho gói thầu của Quý Chủ đầu tư.'}
            </p>
            <div className="cta-hotline-info">
              <PhoneCall size={20} className="text-amber" />
              <span>
                {isEn ? 'Technical Project Hotline:' : 'Hotline kỹ thuật dự án:'}{' '}
                <strong>{TRAN_GIA_INFO.hotline}</strong> (24/7)
              </span>
            </div>
          </div>

          <div className="cta-actions-right">
            <button
              onClick={() => onNavigateSection('contact')}
              className="tg-btn primary-solid lg"
            >
              <span>{isEn ? 'Request Tender Quotation' : 'Yêu Cầu Báo Giá Gói Thầu'}</span>
              <ChevronRight size={18} />
            </button>
            <button
              onClick={onOpenProfileModal}
              className="tg-btn outline-btn lg"
            >
              <Download size={18} />
              <span>{isEn ? 'Download Profile (PDF)' : 'Tải Hồ Sơ Năng Lực PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
