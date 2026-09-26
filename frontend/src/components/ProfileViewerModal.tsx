import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Building,
  Users,
  Wrench,
  Award,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { TRAN_GIA_INFO, PROJECTS_DATA, SERVICES_DATA } from '../services/tranGiaData';

interface ProfileViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfilePageDoc {
  pageNumber: number;
  title: string;
  category: string;
  content: string[];
  keyHighlight?: string;
}

const PROFILE_PAGES_INDEX: ProfilePageDoc[] = [
  {
    pageNumber: 1,
    title: 'BÌA HỒ SƠ NĂNG LỰC TRẦN GIA',
    category: 'Tổng quan',
    content: [
      'CÔNG TY TNHH DỊCH VỤ THƯƠNG MẠI VÀ XÂY DỰNG TRẦN GIA',
      'Địa chỉ: Xóm Chùa, Thôn Trung Cao, Xã Phú Nghĩa, TP. Hà Nội',
      'Điện thoại: 0986 078 270 | Email: trangia.kt69@gmail.com',
      'Hồ Sơ Năng Lực Doanh Nghiệp (Profile 2026)',
    ],
    keyHighlight: 'TRẦN GIA PROFILE',
  },
  {
    pageNumber: 2,
    title: 'THƯ NGỎ TỪ BAN GIÁM ĐỐC',
    category: 'Giới thiệu',
    content: [
      'Kính gửi Quý Chủ đầu tư và Khách hàng!',
      'Lời đầu tiên, chúng tôi xin gửi lời cảm ơn chân thành đến tất cả Quý khách hàng đã tin tưởng, ủng hộ các sản phẩm và dịch vụ của Trần Gia.',
      'Với phương châm "Uy tín - Chất lượng - Chính xác", Trần Gia luôn tôn trọng và hết lòng phục vụ tất cả các khách hàng.',
      'Giám đốc công ty: TRẦN XUÂN ANH',
    ],
    keyHighlight: 'Phương châm: "Uy tín - Chất lượng - Chính xác"',
  },
  {
    pageNumber: 3,
    title: 'GIỚI THIỆU DOANH NGHIỆP',
    category: 'Giới thiệu',
    content: [
      'Là đơn vị hoạt động trong lĩnh vực thiết kế – thi công nội thất, trần, vách, sơn bả và hoàn thiện công trình xây dựng.',
      'Xây dựng đội ngũ hơn 50 cán bộ – công nhân viên, trong đó có 10 cán bộ chủ chốt quản lý, kỹ thuật và vận hành.',
      'Hợp tác thường xuyên với các viện nghiên cứu, công ty tư vấn và các trường đại học chuyên ngành xây dựng.',
    ],
    keyHighlight: 'Đội ngũ 50+ cán bộ CNV & 10 cán bộ chủ chốt',
  },
  {
    pageNumber: 4,
    title: 'TẦM NHÌN, SỨ MỆNH & GIÁ TRỊ CỐT LÕI',
    category: 'Triết lý',
    content: [
      'TẦM NHÌN: Trở thành đơn vị hàng đầu trong lĩnh vực thiết kế thi công nội thất, trần vách, sơn bả hoàn thiện.',
      'SỨ MỆNH: Cung cấp hệ thống dịch vụ đồng bộ, khép kín với chất lượng và phong cách phục vụ chuyên nghiệp nhất.',
      '6 GIÁ TRỊ CỐT LÕI: Uy tín, Tiến độ, Chất lượng, Sáng tạo, Chuyên nghiệp, Nỗ lực.',
    ],
    keyHighlight: '6 Giá trị cốt lõi: Uy tín - Tiến độ - Chất lượng - Sáng tạo - Chuyên nghiệp - Nỗ lực',
  },
  {
    pageNumber: 5,
    title: 'HỒ SƠ PHÁP LÝ & CHỨNG NHẬN NĂNG LỰC',
    category: 'Pháp lý',
    content: [
      'Đầy đủ giấy phép đăng ký kinh doanh và hồ sơ năng lực hoạt động xây dựng theo quy định của Bộ Xây dựng.',
      'Đạt các tiêu chuẩn quản lý chất lượng và quy chuẩn an toàn lao động vệ sinh môi trường.',
    ],
    keyHighlight: 'Hồ sơ pháp lý minh bạch, đầy đủ chứng chỉ năng lực xây dựng',
  },
  {
    pageNumber: 6,
    title: 'LĨNH VỰC HOẠT ĐỘNG CHÍNH',
    category: 'Lĩnh vực',
    content: [
      '01. THI CÔNG TRẦN (Trần thạch cao ISO, trần kim loại cao cấp)',
      '02. THI CÔNG VÁCH (Vách ngăn thạch cao chống cháy, tiêu âm)',
      '03. SƠN BẢ HOÀN THIỆN (Sơn bả trong & ngoài nhà, phào chỉ GFRC)',
      '04. THI CÔNG NỘI THẤT VÀ HOÀN THIỆN XÂY DỰNG (Fit-out, M&E)',
    ],
    keyHighlight: '4 Lĩnh vực thi công trọng tâm toàn diện',
  },
  {
    pageNumber: 7,
    title: 'SƠ ĐỒ TỔ CHỨC CÔNG TY',
    category: 'Tổ chức',
    content: [
      'Mô hình quản lý trực tuyến chức năng: Giám đốc công ty -> Giám đốc dự án.',
      'Khối phòng ban: P. Kinh tế & Đầu tư, P. Thi công Dân dụng & Công nghiệp, P. Nhân sự, Ban Kế toán.',
      'Khối hiện trường: Cán bộ kỹ thuật, Kỹ sư giám sát & Đội ngũ công nhân viên.',
    ],
    keyHighlight: 'Mô hình quản lý trực tuyến chức năng hiệu quả',
  },
  {
    pageNumber: 8,
    title: 'NĂNG LỰC NHÂN SỰ CÔNG TY',
    category: 'Nhân sự',
    content: [
      '04 Kiến trúc sư và Kỹ sư thiết kế',
      '08 Kỹ sư nhà máy và công trường',
      '03 Cử nhân kinh tế & Đấu thầu',
      '03 Kế toán và Hành chính văn phòng',
      '36 Công nhân kỹ thuật tại xưởng & công trình',
      '50 - 200 Lao động thời vụ theo yêu cầu tiến độ dự án',
    ],
    keyHighlight: '50 - 200 nhân sự cơ động sẵn sàng huy động',
  },
  {
    pageNumber: 9,
    title: 'NĂNG LỰC THIẾT BỊ – MÁY MÓC',
    category: 'Thiết bị',
    content: [
      '70 Máy khoan bê tông chuyên dụng',
      '120 Máy bắn vít thạch cao & kim loại',
      '65 Máy laser định vị độ cao & góc chuẩn',
      '15 Máy hàn công nghiệp',
      '40 Máy cắt bàn & cắt cầm tay',
    ],
    keyHighlight: 'Hơn 300 đầu thiết bị máy móc tân tiến',
  },
  {
    pageNumber: 10,
    title: 'CHÍNH SÁCH HOẠT ĐỘNG',
    category: 'Chính sách',
    content: [
      'Chất lượng và uy tín là yếu tố quyết định sự thỏa mãn của khách hàng.',
      'Xem việc đảm bảo tiến độ và chất lượng dịch vụ là mục tiêu chiến lược.',
      'Tối ưu hóa về mặt kinh tế và chi phí đầu tư cho Quý khách hàng.',
      'Tuyển dụng và đào tạo nhân sự tay nghề cao, chuyên môn vững vàng.',
    ],
    keyHighlight: 'Chiến lược: Đảm bảo tiến độ, chất lượng & tối ưu chi phí',
  },
  {
    pageNumber: 11,
    title: 'NGUYÊN TẮC HOẠT ĐỘNG',
    category: 'Nguyên tắc',
    content: [
      'VỚI KHÁCH HÀNG: Chất lượng, uy tín, tiến độ; cởi mở, thân thiện, cầu thị, nhiệt tình.',
      'VỚI NHÂN VIÊN: Tạo cơ hội học tập, tác phong quốc tế, thăng tiến chính trực công bằng.',
      'VỚI ĐỐI TÁC: Xây dựng mối quan hệ đoàn kết lâu dài, cùng có lợi, tôn vinh đạo đức kinh doanh.',
      'VỚI CỘNG ĐỒNG: Trách nhiệm xã hội, tuân thủ pháp luật, đóng góp phát triển xã hội.',
    ],
    keyHighlight: '4 Nguyên tắc ứng xử chuẩn mực của Trần Gia',
  },
  {
    pageNumber: 12,
    title: 'NĂNG LỰC NỘI THẤT & THIẾT KẾ (DECORATE & DESIGN)',
    category: 'Năng lực',
    content: [
      'DECORATE: Trang trí nội thất văn phòng, khách sạn, nhà ở, nhà hàng tiêu chuẩn quốc tế.',
      'DESIGN: Thiết kế với phần mềm ứng dụng tiên tiến nhất thế giới (BIM, 3D Max, Revit).',
    ],
    keyHighlight: 'Thiết kế 3D chuẩn xác & Thi công nội thất quốc tế',
  },
  {
    pageNumber: 14,
    title: 'NĂNG LỰC NỘI THẤT GỖ, KIM LOẠI & CƠ ĐIỆN (FURNITURE & M&E)',
    category: 'Năng lực',
    content: [
      'FURNITURE: Sản phẩm gỗ MDF, MFC, Inox, da, ván lạng nhập khẩu cao cấp.',
      'M&E & SERVICE: Cung cấp thiết bị điện aptomat, đèn chiếu sáng, ổ cắm, cáp điện; chế độ bảo hành chuyên nghiệp.',
    ],
    keyHighlight: 'Sản xuất đồ gỗ nội thất & Thi công cơ điện M&E trọn gói',
  },
  {
    pageNumber: 15,
    title: 'DỰ ÁN NỔI BẬT & HÀNH TRÌNH PHÁT TRIỂN (Trang 15 - 32)',
    category: 'Dự án',
    content: [
      'The Watson Hotel Hạ Long & The Yacht Hotel (Quảng Ninh)',
      'Nhà xưởng Tập đoàn Jinyu (KCN Phước Đông, Tây Ninh - CĐT Cogniplus)',
      'Chuỗi Showroom VinFast QS 3 Phía Nam & Vinhomes Grand Park (TP.HCM)',
      'Khách sạn 5 sao Nam Hội An & Tòa nhà Charm Group (Bình Dương)',
      'TTTM Vincom Dĩ An & Ruby Hạ Long & Masteri Hưng Yên',
      'KĐT Nam Ngạn Thanh Hóa (CĐT MBland) & TTTM Hải Dương (CĐT Delta Group)',
      'Sentosa Sky Park Hải Phòng (CĐT Delta-V) & Khách sạn 5 sao Đồng Gia (CĐT Viettel Construction) & Chung cư A&T Sky Garden (CĐT CDC)',
    ],
    keyHighlight: '15+ Công trình trọng điểm trên khắp cả nước',
  },
  {
    pageNumber: 33,
    title: 'ĐỐI TÁC CHIẾN LƯỢC & KHÁCH HÀNG (Trang 33 - 34)',
    category: 'Đối tác',
    content: [
      'TẬP ĐOÀN XÂY DỰNG DELTA & DELTA-V',
      'TỔNG CÔNG TY CÔNG TRÌNH VIETTEL (VIETTEL CONSTRUCTION)',
      'CÔNG TY CỔ PHẦN XÂY DỰNG CDC & TỔNG CÔNG TY MBLAND',
      'TẬP ĐOÀN VINGROUP, MASTERISE HOMES, COGNIPLUS, CHARM GROUP',
    ],
    keyHighlight: 'Đối tác tin cậy của các Tổng thầu & Chủ đầu tư số 1',
  },
];

export const ProfileViewerModal: React.FC<ProfileViewerModalProps> = ({ isOpen, onClose }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentDoc = PROFILE_PAGES_INDEX[currentPageIndex];

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPageIndex < PROFILE_PAGES_INDEX.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handleDownloadPdf = () => {
    // Direct link to the pdf file in workspace
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
      <div className="tg-modal-box profile-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="profile-modal-header">
          <div className="profile-modal-title-wrap">
            <BookOpen size={22} className="text-amber" />
            <div>
              <h3>HỒ SƠ NĂNG LỰC TRẦN GIA (E-PROFILE)</h3>
              <p className="subtext">
                Trích xuất trực tiếp từ tài liệu gốc <strong>{TRAN_GIA_INFO.pdfFileName}</strong> (36 trang)
              </p>
            </div>
          </div>

          <div className="profile-modal-header-actions">
            <button
              onClick={handleDownloadPdf}
              className="tg-btn primary-solid small"
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

        {/* Modal Main Body */}
        <div className="profile-modal-body">
          {/* Left Sidebar: Table of Contents */}
          <div className="profile-toc-sidebar">
            <h4 className="toc-title">MỤC LỤC HỒ SƠ</h4>
            <ul className="toc-list">
              {PROFILE_PAGES_INDEX.map((page, idx) => (
                <li
                  key={idx}
                  className={`toc-item ${currentPageIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentPageIndex(idx)}
                >
                  <span className="toc-page-num">Trang {page.pageNumber}</span>
                  <span className="toc-item-title">{page.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Area: Page Preview & Content */}
          <div className="profile-page-viewer">
            <div className="page-viewer-header">
              <div className="page-badge">
                <span>{currentDoc.category}</span> • <strong>Trang {currentDoc.pageNumber} / 36</strong>
              </div>
              <div className="page-nav-controls">
                <button
                  onClick={handlePrev}
                  disabled={currentPageIndex === 0}
                  className="page-nav-btn"
                  title="Trang trước"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="page-indicator">
                  {currentPageIndex + 1} / {PROFILE_PAGES_INDEX.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPageIndex === PROFILE_PAGES_INDEX.length - 1}
                  className="page-nav-btn"
                  title="Trang tiếp theo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Page Content Render Box */}
            <div className="page-rendered-sheet">
              <div className="sheet-watermark">TRẦN GIA PROFILE</div>

              <div className="sheet-inner">
                <div className="sheet-top-line">
                  <span className="sheet-brand">TRẦN GIA PROFILE</span>
                  <span className="sheet-num">{currentDoc.pageNumber.toString().padStart(2, '0')}</span>
                </div>

                <h2 className="sheet-title">{currentDoc.title}</h2>

                {currentDoc.keyHighlight && (
                  <div className="sheet-highlight-banner">
                    <CheckCircle2 size={18} className="text-amber flex-shrink-0" />
                    <span>{currentDoc.keyHighlight}</span>
                  </div>
                )}

                <div className="sheet-body-content">
                  {currentDoc.content.map((line, lIdx) => (
                    <div key={lIdx} className="sheet-content-row">
                      <span className="bullet-point">•</span>
                      <p>{line}</p>
                    </div>
                  ))}
                </div>

                <div className="sheet-footer-line">
                  <span>{TRAN_GIA_INFO.companyName}</span>
                  <span>Hotline: {TRAN_GIA_INFO.hotline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="profile-modal-footer">
          <div className="footer-doc-info">
            <FileText size={16} className="text-slate-400" />
            <span>Tệp: {TRAN_GIA_INFO.pdfFileName} | Phiên bản mới nhất</span>
          </div>

          <div className="footer-buttons">
            <button onClick={handleDownloadPdf} className="tg-btn primary-solid">
              <Download size={16} />
              <span>Tải Toàn Bộ Hồ Sơ Năng Lực (PDF)</span>
            </button>
            <button onClick={onClose} className="tg-btn outline-btn">
              <span>Đóng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
