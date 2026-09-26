import React from 'react';
import {
  Users,
  Wrench,
  Layers,
  HardHat,
  Cpu,
  CheckCircle,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { PERSONNEL_DATA, EQUIPMENT_DATA, TRAN_GIA_INFO } from '../services/tranGiaData';

export const CapacitySection: React.FC = () => {
  return (
    <section className="tg-section tg-capacity-section" id="capacity">
      <div className="container">
        {/* Section Header */}
        <div className="tg-section-header text-center">
          <span className="tg-section-badge">NĂNG LỰC THỰC THI</span>
          <h2 className="tg-section-title">TỔ CHỨC, NHÂN SỰ & THIẾT BỊ MÁY MÓC</h2>
          <div className="tg-divider"></div>
          <p className="tg-section-desc">
            Trần Gia sở hữu bộ máy vận hành tinh gọn, đội ngũ kỹ sư & công nhân lành nghề cùng hệ thống trang thiết bị
            đồng bộ, đáp ứng thi công đồng thời nhiều dự án quy mô lớn.
          </p>
        </div>

        {/* 1. Sơ đồ tổ chức công ty (Company Organization Chart) */}
        <div className="tg-org-chart-wrapper" id="capacity-org">
          <div className="tg-org-header text-center">
            <h3 className="tg-sub-heading">SƠ ĐỒ TỔ CHỨC BỘ MÁY CÔNG TY</h3>
            <p className="tg-sub-desc">
              Tổ chức công ty được xây dựng theo mô hình quản lý trực tuyến chức năng với hai bộ phận:
              Bộ phận quản lý và Bộ phận sản xuất.
            </p>
          </div>

          <div className="tg-org-tree">
            {/* Level 1: Giám đốc công ty */}
            <div className="org-node level-1">
              <div className="node-box chief-box">
                <span className="node-role">GIÁM ĐỐC CÔNG TY</span>
                <strong className="node-name">{TRAN_GIA_INFO.director}</strong>
              </div>
            </div>

            <div className="org-connector-vertical"></div>

            {/* Level 2: Giám đốc dự án & Ban quản lý */}
            <div className="org-level-row level-2-row">
              <div className="org-node level-2">
                <div className="node-box manager-box">
                  <span className="node-role">GIÁM ĐỐC DỰ ÁN</span>
                  <span className="node-sub">Điều hành toàn diện các công trường</span>
                </div>
              </div>
            </div>

            <div className="org-connector-vertical"></div>

            {/* Level 3: Các phòng ban chức năng */}
            <div className="org-departments-grid">
              <div className="node-box dept-box">
                <span className="dept-name">P. KINH TẾ & ĐẦU TƯ</span>
                <span className="dept-sub">Kế toán dự án & Dự toán</span>
              </div>
              <div className="node-box dept-box">
                <span className="dept-name">P. THI CÔNG DÂN DỤNG & CÔNG NGHIỆP</span>
                <span className="dept-sub">Chỉ huy trưởng & Kỹ sư giám sát</span>
              </div>
              <div className="node-box dept-box">
                <span className="dept-name">P. HÀNH CHÍNH & NHÂN SỰ</span>
                <span className="dept-sub">Quản lý nhân lực & Pháp chế</span>
              </div>
              <div className="node-box dept-box">
                <span className="dept-name">P. TÀI CHÍNH KẾ TOÁN</span>
                <span className="dept-sub">Quản trị dòng tiền & Thanh toán</span>
              </div>
            </div>

            <div className="org-connector-vertical"></div>

            {/* Level 4: Đội ngũ kỹ thuật & Công nhân */}
            <div className="org-node level-4">
              <div className="node-box execution-box">
                <HardHat size={20} className="text-amber inline-block mr-2" />
                <span>CÁN BỘ KỸ THUẬT, TỔ TRƯỞNG & ĐỘI NGŨ CÔNG NHÂN KỸ THUẬT CÔNG TRƯỜNG</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Năng lực Nhân sự (Personnel Capacity) */}
        <div className="tg-personnel-wrapper" id="capacity-personnel">
          <div className="tg-personnel-header">
            <div>
              <span className="tg-section-badge">ĐỘI NGŨ CON NGƯỜI</span>
              <h3 className="tg-sub-heading">NĂNG LỰC NHÂN SỰ TRẦN GIA</h3>
            </div>
            <div className="tg-personnel-summary-badge">
              <strong>50+</strong> Cán bộ CNV thường trực & Đến <strong>200</strong> Nhân công theo dự án
            </div>
          </div>

          <p className="tg-personnel-intro">
            Trần Gia đã có bề dày kinh nghiệm thiết kế thi công nội thất, trần, vách, sơn bả hoàn thiện và thi công hoàn thiện
            xây dựng... với đội ngũ cán bộ cùng công nhân lành nghề, được đào tạo bài bản và làm việc với tác phong công nghiệp.
          </p>

          <div className="tg-personnel-grid">
            {PERSONNEL_DATA.map((item, idx) => (
              <div key={idx} className="tg-personnel-card">
                <div className="personnel-count-col">
                  <span className="count-number">{item.count.toString().padStart(2, '0')}</span>
                  <span className="count-unit">Nhân sự</span>
                </div>
                <div className="personnel-info-col">
                  <h4 className="personnel-role">{item.role}</h4>
                  <p className="personnel-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Năng lực Thiết bị - Máy móc (Equipment Capacity) */}
        <div className="tg-equipment-wrapper" id="capacity-equipment">
          <div className="tg-equipment-header text-center">
            <span className="tg-section-badge">CƠ SỞ VẬT CHẤT</span>
            <h3 className="tg-sub-heading">HỆ THỐNG MÁY MÓC & THIẾT BỊ THI CÔNG</h3>
            <p className="tg-sub-desc">
              Ngoài các trang thiết bị sẵn có, công ty liên tục đầu tư thêm các loại máy móc hiện đại phù hợp với tiêu chuẩn
              kỹ thuật mới nhất, bảo đảm độ an toàn và chất lượng cao nhất cho mọi công trình.
            </p>
          </div>

          <div className="tg-equipment-grid">
            {EQUIPMENT_DATA.map((eq) => (
              <div key={eq.id} className="tg-equipment-card">
                <div className="eq-top-row">
                  <div className="eq-qty-badge">
                    <span className="eq-number">{eq.quantity}</span>
                    <span className="eq-unit">{eq.unit}</span>
                  </div>
                  <Wrench size={24} className="text-amber" />
                </div>
                <h4 className="eq-name">{eq.name}</h4>
                <p className="eq-desc">{eq.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
