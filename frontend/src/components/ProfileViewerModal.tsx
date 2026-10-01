import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  BookOpen,
  Building,
  Users,
  Wrench,
  Award,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  Layers,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Eye,
  Check,
} from 'lucide-react';
import { TRAN_GIA_INFO, PROJECTS_DATA, SERVICES_DATA } from '../services/tranGiaData';

interface ProfileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'all' | 'overview' | 'capacity' | 'services' | 'projects' | 'partners' | 'pdf';

// 15 Dự án trích xuất trực tiếp từ trang 15 - 32 tài liệu HSNL TRANGIA.pdf
const PDF_EXTRACTED_PROJECTS = [
  {
    pdfPage: 16,
    name: 'The Watson Hotel Hạ Long',
    location: 'Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    scope: 'Thi công hệ trần vách thạch cao giật cấp & hoàn thiện sơn bả các tầng khách sạn',
    client: 'Chủ đầu tư Khách sạn The Watson',
    badge: 'Khách sạn 5 sao',
  },
  {
    pdfPage: 17,
    name: 'The Yacht Hotel Hạ Long',
    location: 'Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    scope: 'Thi công trần trang trí sảnh, phòng nghỉ và sơn bả cao cấp phong cách du thuyền',
    client: 'Chủ đầu tư The Yacht Hotel',
    badge: 'Khách sạn nghỉ dưỡng',
  },
  {
    pdfPage: 18,
    name: 'Nhà xưởng Tập đoàn Jinyu Tây Ninh',
    location: 'Lô 9 KCN Phước Đông, Trảng Bàng, Tây Ninh',
    scope: 'Hạng mục FIT - OUT (Showroom & Multifunction Area)',
    client: 'CTY TNHH Cogniplus Interiors',
    badge: 'Công nghiệp & Nhà xưởng',
  },
  {
    pdfPage: 19,
    name: 'Chuỗi Showroom VinFast QS 3 Phía Nam',
    location: 'Khu vực các tỉnh thành Phía Nam',
    scope: 'Thi công trần thạch cao tiêu âm, trần phẳng sơn bả sắc nét & hoàn thiện nội thất chuẩn VinFast',
    client: 'Tập đoàn Vingroup / VinFast',
    badge: 'Thương mại & Showroom',
  },
  {
    pdfPage: 20,
    name: 'Đại đô thị Vinhomes Grand Park',
    location: 'Đường Phước Thiện, Long Mỹ, TP. Thủ Đức, TP.HCM',
    scope: 'Thi công hệ thống trần thạch cao chìm giật cấp, vách ngăn chống cháy căn hộ & khu công cộng',
    client: 'Tập đoàn Vingroup',
    badge: 'Đô thị cao tầng',
  },
  {
    pdfPage: 21,
    name: 'Khách sạn 5 sao Nam Hội An',
    location: 'Nam Hội An, Tỉnh Quảng Nam',
    scope: 'Thi công trần vách thạch cao cách âm, trang trí sảnh hội nghị & biệt thự biển',
    client: 'Tập đoàn Vingroup / Đối tác',
    badge: 'Resort & Khách sạn 5 sao',
  },
  {
    pdfPage: 22,
    name: 'Tòa nhà ở cao tầng Charm Group',
    location: 'Ngã tư 550, Dĩ An, Tỉnh Bình Dương',
    scope: 'Thi công trần thạch cao, vách ngăn chống cháy khối căn hộ & shophouse thương mại',
    client: 'Tập đoàn Charm Group',
    badge: 'Căn hộ chung cư cao cấp',
  },
  {
    pdfPage: '23-25',
    name: 'TTTM Vincom Dĩ An Bình Dương',
    location: 'TP. Dĩ An, Tỉnh Bình Dương',
    scope: 'Thi công hoàn thiện trần thạch cao thương mại, sảnh thông tầng và vách tiêu âm',
    client: 'Tập đoàn Vingroup / Vincom Retail',
    badge: 'Trung tâm thương mại',
  },
  {
    pdfPage: 26,
    name: 'Khu chung cư & KS Ruby Hạ Long',
    location: 'TP. Hạ Long, Tỉnh Quảng Ninh',
    scope: 'Thi công trần thạch cao khối khách sạn, chung cư thương mại & dịch vụ',
    client: 'Chủ đầu tư Ruby Hạ Long',
    badge: 'Tổ hợp thương mại cao tầng',
  },
  {
    pdfPage: 27,
    name: 'Dự án Masteri Hưng Yên',
    location: 'Huyện Văn Giang, Tỉnh Hưng Yên',
    scope: 'Thi công trần thạch cao cao cấp và hoàn thiện bả sơn khối căn hộ hạng sang',
    client: 'Tập đoàn Masterise Homes',
    badge: 'Căn hộ hạng sang',
  },
  {
    pdfPage: 28,
    name: 'KĐT Phía Đông Bắc Nam - Nam Ngạn Thanh Hóa',
    location: 'Phường Nam Ngạn, TP. Thanh Hóa',
    scope: 'Thi công bả sơn mặt ngoài, lắp dựng phào chỉ GFRC nghệ thuật kiến trúc',
    client: 'CÔNG TY CỔ PHẦN TỔNG CÔNG TY MBLAND',
    badge: 'Khu đô thị & Phào GFRC',
  },
  {
    pdfPage: 29,
    name: 'TTTM Phức hợp Hải Dương',
    location: 'Số 2 Phố Thống Nhất, P. Lê Thanh Nghị, TP. Hải Dương',
    scope: 'Cung cấp vật tư và thi công sơn bả ngoài nhà chống thấm công nghệ cao',
    client: 'TẬP ĐOÀN XÂY DỰNG DELTA',
    badge: 'Tổng thầu DELTA',
  },
  {
    pdfPage: 30,
    name: 'Sentosa Sky Park Hải Phòng',
    location: 'Giao lộ Bùi Viện - Võ Nguyên Giáp, Lê Chân, Hải Phòng',
    scope: 'Cung cấp vật tư, thi công trần vách thạch cao và sơn bả trần hoàn thiện',
    client: 'DELTA-V (DELTA GROUP)',
    badge: 'Tổng thầu DELTA-V',
  },
  {
    pdfPage: 31,
    name: 'Khách sạn 5 sao Đồng Gia',
    location: 'Phường Bãi Cháy, TP. Hạ Long, Tỉnh Quảng Ninh',
    scope: 'Thi công hệ trần kim loại cao cấp khu vực sảnh và không gian dịch vụ trong nhà',
    client: 'TỔNG CÔNG TY CỔ PHẦN CÔNG TRÌNH VIETTEL',
    badge: 'CĐT Viettel Construction',
  },
  {
    pdfPage: 32,
    name: 'Chung cư cao cấp A&T Sky Garden Bình Dương',
    location: 'Số 54C Cách Mạng Tháng 8, P. Lái Thiêu, TP. Thuận An, Bình Dương',
    scope: 'Thi công hạng mục trần thạch cao căn hộ tiêu chuẩn chất lượng cao',
    client: 'CÔNG TY CỔ PHẦN XÂY DỰNG CDC',
    badge: 'Tổng thầu CDC',
  },
];

export const ProfileViewerModal: React.FC<ProfileViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = `/${TRAN_GIA_INFO.pdfFileName}`;
    link.download = TRAN_GIA_INFO.pdfFileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tg-modal-overlay" onClick={onClose}>
      <div className="tg-modal-box tg-eprofile-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header: Tối giản, thanh lịch */}
        <div className="eprofile-header">
          <div className="eprofile-title-group">
            <div className="eprofile-badge-icon">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="eprofile-main-title">HỒ SƠ NĂNG LỰC TRẦN GIA (E-PROFILE)</h3>
              <p className="eprofile-sub-title">
                Trích xuất trực tiếp từ tài liệu gốc <strong>{TRAN_GIA_INFO.pdfFileName}</strong> (36 trang)
              </p>
            </div>
          </div>

          <div className="eprofile-actions">
            <button
              onClick={handleDownloadPdf}
              className="tg-btn primary-solid small eprofile-download-btn"
              title="Tải tệp PDF gốc về máy tính"
            >
              <Download size={15} />
              <span>Tải PDF Gốc (32MB)</span>
            </button>
            <button onClick={onClose} className="tg-modal-close-btn" aria-label="Đóng">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs: Điều hướng ngang đơn giản, không rườm rà */}
        <div className="eprofile-nav-tabs">
          <button
            className={`eprofile-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <Layers size={15} />
            <span>Toàn bộ hồ sơ</span>
          </button>
          <button
            className={`eprofile-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Building size={15} />
            <span>Tổng quan & Pháp lý</span>
          </button>
          <button
            className={`eprofile-tab-btn ${activeTab === 'capacity' ? 'active' : ''}`}
            onClick={() => setActiveTab('capacity')}
          >
            <Users size={15} />
            <span>Nhân sự & Máy móc</span>
          </button>
          <button
            className={`eprofile-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Wrench size={15} />
            <span>Lĩnh vực hoạt động</span>
          </button>
          <button
            className={`eprofile-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Award size={15} />
            <span>15+ Dự án tiêu biểu</span>
          </button>
          <button
            className={`eprofile-tab-btn ${activeTab === 'partners' ? 'active' : ''}`}
            onClick={() => setActiveTab('partners')}
          >
            <ShieldCheck size={15} />
            <span>Đối tác chiến lược</span>
          </button>
          <button
            className={`eprofile-tab-btn eprofile-tab-pdf ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            <Eye size={15} />
            <span>Xem PDF gốc (36 trang)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="eprofile-content-body">
          {activeTab === 'pdf' ? (
            /* Chế độ nhúng xem trực tiếp PDF gốc */
            <div className="eprofile-pdf-embed-wrapper">
              <div className="eprofile-pdf-notice">
                <span>Đang hiển thị tài liệu PDF gốc: <strong>{TRAN_GIA_INFO.pdfFileName}</strong> (36 trang, 32.8MB).</span>
                <button onClick={handleDownloadPdf} className="tg-btn outline-btn small">
                  <Download size={14} />
                  <span>Tải tệp về</span>
                </button>
              </div>
              <iframe
                src={`/${TRAN_GIA_INFO.pdfFileName}#toolbar=1&navpanes=1`}
                title="HSNL TRẦN GIA PDF"
                className="eprofile-pdf-iframe"
              />
            </div>
          ) : (
            /* Chế độ bản số hóa hiển thị đơn giản, rõ ràng */
            <div className="eprofile-digest-scroll">
              {/* Thống kê nhanh nổi bật */}
              <div className="eprofile-stats-row">
                <div className="eprofile-stat-card">
                  <div className="eprofile-stat-num">50+</div>
                  <div className="eprofile-stat-lbl">Cán bộ & Nhân sự chủ chốt</div>
                </div>
                <div className="eprofile-stat-card">
                  <div className="eprofile-stat-num">300+</div>
                  <div className="eprofile-stat-lbl">Thiết bị máy móc chuyên dụng</div>
                </div>
                <div className="eprofile-stat-card">
                  <div className="eprofile-stat-num">15+</div>
                  <div className="eprofile-stat-lbl">Đại dự án quy mô toàn quốc</div>
                </div>
                <div className="eprofile-stat-card">
                  <div className="eprofile-stat-num">04</div>
                  <div className="eprofile-stat-lbl">Lĩnh vực thi công trọng tâm</div>
                </div>
              </div>

              {/* SECTION 1: TỔNG QUAN & THƯ NGỎ */}
              {(activeTab === 'all' || activeTab === 'overview') && (
                <section className="eprofile-card-section">
                  <div className="eprofile-section-head">
                    <span className="eprofile-sec-badge">Trang 01 - 05</span>
                    <h4 className="eprofile-sec-title">1. Giới thiệu Doanh nghiệp & Thư ngỏ Ban Giám đốc</h4>
                  </div>

                  <div className="eprofile-letter-box">
                    <div className="eprofile-letter-quote">
                      <p className="lead-text">
                        "Với phương châm <strong>Uy tín - Chất lượng - Chính xác</strong>, Trần Gia luôn tôn trọng và hết lòng phục vụ tất cả các khách hàng. Sự tin tưởng, ủng hộ của Quý khách hàng là động lực thôi thúc Trần Gia ngày càng hoàn thiện, đổi mới và đem lại lợi ích cao nhất cho mọi công trình."
                      </p>
                      <div className="eprofile-letter-signature">
                        <span className="sig-role">Giám đốc Công ty:</span>
                        <strong className="sig-name">TRẦN XUÂN ANH</strong>
                      </div>
                    </div>
                  </div>

                  <div className="eprofile-info-grid">
                    <div className="eprofile-info-item">
                      <span className="info-label">Tên đầy đủ:</span>
                      <strong className="info-val">{TRAN_GIA_INFO.companyName}</strong>
                    </div>
                    <div className="eprofile-info-item">
                      <span className="info-label">Trụ sở công ty:</span>
                      <strong className="info-val">{TRAN_GIA_INFO.address}</strong>
                    </div>
                    <div className="eprofile-info-item">
                      <span className="info-label">Điện thoại / Hotline:</span>
                      <strong className="info-val">{TRAN_GIA_INFO.hotline}</strong>
                    </div>
                    <div className="eprofile-info-item">
                      <span className="info-label">Email chính thức:</span>
                      <strong className="info-val">{TRAN_GIA_INFO.email}</strong>
                    </div>
                  </div>

                  <div className="eprofile-philosophy-grid">
                    <div className="philosophy-box">
                      <h5>TẦM NHÌN (VISION)</h5>
                      <p>Trở thành đơn vị hàng đầu trong lĩnh vực thiết kế thi công nội thất, trần vách, sơn bả hoàn thiện và thi công xây dựng trên toàn quốc.</p>
                    </div>
                    <div className="philosophy-box">
                      <h5>SỨ MỆNH (MISSION)</h5>
                      <p>Cung cấp hệ thống dịch vụ đồng bộ, khép kín với chất lượng và phong cách phục vụ chuyên nghiệp nhất, đáp ứng các tiêu chuẩn khắt khe của Quý khách hàng.</p>
                    </div>
                  </div>

                  <div className="eprofile-core-values-wrap">
                    <span className="sub-heading">6 Giá trị cốt lõi (Core Values):</span>
                    <div className="eprofile-values-chips">
                      <span className="value-chip"><strong>Uy tín:</strong> Giữ vững niềm tin bằng trách nhiệm</span>
                      <span className="value-chip"><strong>Tiến độ:</strong> Cam kết đúng hạn và chuẩn xác</span>
                      <span className="value-chip"><strong>Chất lượng:</strong> Tỉ mỉ trong từng chi tiết thi công</span>
                      <span className="value-chip"><strong>Sáng tạo:</strong> Đổi mới giải pháp kỹ thuật</span>
                      <span className="value-chip"><strong>Chuyên nghiệp:</strong> Quy trình rõ ràng, minh bạch</span>
                      <span className="value-chip"><strong>Nỗ lực:</strong> Luôn phấn đấu vì sự thành công của CĐT</span>
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 2: NHÂN SỰ & MÁY MÓC */}
              {(activeTab === 'all' || activeTab === 'capacity') && (
                <section className="eprofile-card-section">
                  <div className="eprofile-section-head">
                    <span className="eprofile-sec-badge">Trang 07 - 11</span>
                    <h4 className="eprofile-sec-title">2. Sơ đồ Tổ chức, Năng lực Nhân sự & Máy móc Thiết bị</h4>
                  </div>

                  {/* Sơ đồ tổ chức dạng thanh tối giản */}
                  <div className="eprofile-org-bar">
                    <div className="org-step root">GIÁM ĐỐC CÔNG TY (TRẦN XUÂN ANH)</div>
                    <div className="org-arrow">↓</div>
                    <div className="org-step project">GIÁM ĐỐC DỰ ÁN</div>
                    <div className="org-arrow">↓</div>
                    <div className="org-departments">
                      <div className="org-dep">P. Kinh tế & Đầu tư</div>
                      <div className="org-dep">P. Thi công Dân dụng & Công nghiệp</div>
                      <div className="org-dep">P. Nhân sự & Hành chính</div>
                      <div className="org-dep">Ban Kế toán Dự án</div>
                    </div>
                  </div>

                  {/* Bảng nhân sự */}
                  <div className="eprofile-subsection">
                    <h5 className="sub-title-with-icon">
                      <Users size={16} className="text-amber" />
                      Cơ cấu Nhân sự Trần Gia (Trang 08)
                    </h5>
                    <div className="eprofile-personnel-grid">
                      <div className="personnel-card">
                        <span className="p-count">04</span>
                        <span className="p-role">Kiến trúc sư & Kỹ sư thiết kế</span>
                      </div>
                      <div className="personnel-card">
                        <span className="p-count">08</span>
                        <span className="p-role">Kỹ sư nhà máy & Công trường</span>
                      </div>
                      <div className="personnel-card">
                        <span className="p-count">03</span>
                        <span className="p-role">Cử nhân kinh tế & Đấu thầu</span>
                      </div>
                      <div className="personnel-card">
                        <span className="p-count">03</span>
                        <span className="p-role">Kế toán & Văn phòng</span>
                      </div>
                      <div className="personnel-card highlight">
                        <span className="p-count">36</span>
                        <span className="p-role">Công nhân kỹ thuật tại xưởng & công trường</span>
                      </div>
                      <div className="personnel-card highlight">
                        <span className="p-count">50 - 200</span>
                        <span className="p-role">Lao động thời vụ cơ động theo dự án</span>
                      </div>
                    </div>
                  </div>

                  {/* Bảng thiết bị máy móc */}
                  <div className="eprofile-subsection">
                    <h5 className="sub-title-with-icon">
                      <Wrench size={16} className="text-amber" />
                      Năng lực Máy móc Thiết bị thi công (Trang 09)
                    </h5>
                    <div className="eprofile-equipment-list">
                      <div className="equip-row">
                        <span className="equip-name">Máy khoan bê tông chuyên dụng</span>
                        <span className="equip-qty">70 Chiếc</span>
                      </div>
                      <div className="equip-row">
                        <span className="equip-name">Máy bắn vít thạch cao & kim loại</span>
                        <span className="equip-qty">120 Chiếc</span>
                      </div>
                      <div className="equip-row">
                        <span className="equip-name">Máy Laser định vị độ cao & góc chuẩn</span>
                        <span className="equip-qty">65 Chiếc</span>
                      </div>
                      <div className="equip-row">
                        <span className="equip-name">Máy hàn công nghiệp & hàn điện</span>
                        <span className="equip-qty">15 Chiếc</span>
                      </div>
                      <div className="equip-row">
                        <span className="equip-name">Máy cắt bàn & Máy cắt cầm tay</span>
                        <span className="equip-qty">40 Chiếc</span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 3: LĨNH VỰC HOẠT ĐỘNG */}
              {(activeTab === 'all' || activeTab === 'services') && (
                <section className="eprofile-card-section">
                  <div className="eprofile-section-head">
                    <span className="eprofile-sec-badge">Trang 06, 12 - 14</span>
                    <h4 className="eprofile-sec-title">3. Lĩnh vực Hoạt động & Dịch vụ Trọng tâm</h4>
                  </div>

                  <div className="eprofile-services-grid">
                    <div className="service-simple-card">
                      <div className="service-idx">01</div>
                      <div className="service-detail">
                        <h5>THI CÔNG TRẦN</h5>
                        <p>Trần thạch cao chìm giật cấp, trần thả tiêu âm, trần nhôm và trần kim loại cao cấp đạt chuẩn ISO kỹ thuật.</p>
                      </div>
                    </div>

                    <div className="service-simple-card">
                      <div className="service-idx">02</div>
                      <div className="service-detail">
                        <h5>THI CÔNG VÁCH</h5>
                        <p>Hệ vách ngăn thạch cao 1 mặt, 2 mặt cách âm, chống cháy chuyên dụng cho công trình cao tầng, trung tâm thương mại và khu công nghiệp.</p>
                      </div>
                    </div>

                    <div className="service-simple-card">
                      <div className="service-idx">03</div>
                      <div className="service-detail">
                        <h5>SƠN BẢ HOÀN THIỆN</h5>
                        <p>Cung cấp vật tư và thi công bả sơn ngoài nhà chống thấm, sơn bả trong nhà thẩm mỹ cao, sản xuất và lắp dựng hoàn thiện phào chỉ GFRC nghệ thuật.</p>
                      </div>
                    </div>

                    <div className="service-simple-card">
                      <div className="service-idx">04</div>
                      <div className="service-detail">
                        <h5>NỘI THẤT & HOÀN THIỆN XÂY DỰNG</h5>
                        <p>Fit-out trọn gói: Trang trí nội thất quốc tế (Decorate), Thiết kế 3D/BIM (Design), Sản xuất Furniture gỗ/Inox cao cấp và hệ thống cơ điện M&E.</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 4: 15+ DỰ ÁN TIÊU BIỂU */}
              {(activeTab === 'all' || activeTab === 'projects') && (
                <section className="eprofile-card-section">
                  <div className="eprofile-section-head">
                    <span className="eprofile-sec-badge">Trang 15 - 32</span>
                    <h4 className="eprofile-sec-title">4. Dự án Nổi bật & Hành trình Phát triển (15 Công trình)</h4>
                  </div>

                  <p className="eprofile-projects-intro">
                    Trích xuất đầy đủ 15 dự án trọng điểm được giới thiệu chi tiết từ trang 16 đến trang 32 trong tài liệu gốc:
                  </p>

                  <div className="eprofile-projects-table-wrap">
                    <table className="eprofile-projects-table">
                      <thead>
                        <tr>
                          <th style={{ width: '85px' }}>Trang PDF</th>
                          <th>Tên Công Trình</th>
                          <th>Chủ Đầu Tư / Tổng Thầu</th>
                          <th>Địa Điểm</th>
                          <th>Hạng Mục Thi Công</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PDF_EXTRACTED_PROJECTS.map((proj, idx) => (
                          <tr key={idx}>
                            <td>
                              <span className="table-pdf-tag">Trang {proj.pdfPage}</span>
                            </td>
                            <td>
                              <strong className="table-proj-name">{proj.name}</strong>
                              <span className="table-proj-badge">{proj.badge}</span>
                            </td>
                            <td className="table-proj-client">{proj.client}</td>
                            <td className="table-proj-loc">{proj.location}</td>
                            <td className="table-proj-scope">{proj.scope}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* SECTION 5: ĐỐI TÁC CHIẾN LƯỢC */}
              {(activeTab === 'all' || activeTab === 'partners') && (
                <section className="eprofile-card-section">
                  <div className="eprofile-section-head">
                    <span className="eprofile-sec-badge">Trang 33 - 34</span>
                    <h4 className="eprofile-sec-title">5. Đối tác Chiến lược & Khách hàng</h4>
                  </div>

                  <div className="eprofile-partners-cloud">
                    <div className="partner-cloud-item">
                      <strong>TẬP ĐOÀN XÂY DỰNG DELTA</strong>
                      <span>Tổng thầu xây dựng hàng đầu Việt Nam</span>
                    </div>
                    <div className="partner-cloud-item">
                      <strong>DELTA-V</strong>
                      <span>Ứng dụng công nghệ xây dựng Delta</span>
                    </div>
                    <div className="partner-cloud-item">
                      <strong>VIETTEL CONSTRUCTION</strong>
                      <span>Tổng công ty CP Công trình Viettel</span>
                    </div>
                    <div className="partner-cloud-item">
                      <strong>CÔNG TY CỔ PHẦN XÂY DỰNG CDC</strong>
                      <span>Tổng thầu xây dựng các công trình cao tầng</span>
                    </div>
                    <div className="partner-cloud-item">
                      <strong>TỔNG CÔNG TY MBLAND</strong>
                      <span>Chủ đầu tư các đại đô thị phát triển</span>
                    </div>
                    <div className="partner-cloud-item">
                      <strong>TẬP ĐOÀN VINGROUP / VINFAST</strong>
                      <span>Showroom & Đại đô thị Vinhomes</span>
                    </div>
                    <div className="partner-cloud-item">
                      <strong>MASTERISE HOMES</strong>
                      <span>Nhà phát triển bất động sản hàng hiệu</span>
                    </div>
                    <div className="partner-cloud-item">
                      <strong>COGNIPLUS INTERIORS</strong>
                      <span>Đối tác Fit-out nhà xưởng công nghiệp</span>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer: Tinh gọn, rõ ràng */}
        <div className="eprofile-footer">
          <div className="eprofile-footer-info">
            <FileText size={15} className="text-amber" />
            <span>Tài liệu: <strong>{TRAN_GIA_INFO.pdfFileName}</strong> (36 trang, 32.8MB)</span>
            <span className="divider">•</span>
            <span>Hotline: {TRAN_GIA_INFO.hotline}</span>
          </div>

          <div className="eprofile-footer-actions">
            <button onClick={handleDownloadPdf} className="tg-btn primary-solid small">
              <Download size={14} />
              <span>Tải Toàn Bộ PDF (32MB)</span>
            </button>
            <button onClick={onClose} className="tg-btn outline-btn small">
              <span>Đóng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
