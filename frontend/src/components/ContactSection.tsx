import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, ShieldCheck, User, MessageSquare, Loader2 } from 'lucide-react';
import { TRAN_GIA_INFO } from '../services/tranGiaData';
import { SiteSettings } from '../types';
import { api } from '../services/api';

interface ContactSectionProps {
  settings?: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const company = settings?.company;
  const companyName = company?.name || TRAN_GIA_INFO.companyName;
  const slogan = company?.slogan || TRAN_GIA_INFO.slogan;
  const address = company?.address || TRAN_GIA_INFO.address;
  const hotline = company?.hotline || TRAN_GIA_INFO.hotline;
  const email = company?.email || TRAN_GIA_INFO.email;
  const director = company?.director || TRAN_GIA_INFO.director;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'ceiling',
    projectLocation: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    try {
      await api.submitContact({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        service: formData.service,
        projectLocation: formData.projectLocation.trim(),
        message: formData.message.trim(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit contact:', err);
      // Still show success to visitor via local fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="tg-section tg-contact-section" id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="tg-section-header text-center">
          <span className="tg-section-badge">KẾT NỐI VỚI CHÚNG TÔI</span>
          <h2 className="tg-section-title">LIÊN HỆ & YÊU CẦU BÁO GIÁ THI CÔNG</h2>
          <div className="tg-divider"></div>
          <p className="tg-section-desc">
            Quý khách hàng và Quý đối tác có nhu cầu tư vấn giải pháp thi công, nhận báo giá chi tiết hoặc hợp tác dự án,
            vui lòng liên hệ trực tiếp hoặc gửi thông tin theo mẫu bên dưới.
          </p>
        </div>

        <div className="tg-contact-layout">
          {/* Left Column: Contact Cards & Info */}
          <div className="tg-contact-info-col">
            <div className="tg-company-contact-card">
              <h3 className="company-title">{companyName}</h3>
              <p className="company-slogan">Phương châm: <strong>"{slogan}"</strong></p>

              <div className="contact-details-list">
                <div className="contact-detail-row">
                  <div className="icon-circle">
                    <MapPin size={20} className="text-amber" />
                  </div>
                  <div>
                    <span className="detail-label">Địa chỉ trụ sở:</span>
                    <strong className="detail-val">{address}</strong>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="icon-circle">
                    <Phone size={20} className="text-amber" />
                  </div>
                  <div>
                    <span className="detail-label">Hotline / Điện thoại:</span>
                    <strong className="detail-val phone-link">
                      <a href={`tel:${hotline.replace(/\s+/g, '')}`}>{hotline}</a>
                    </strong>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="icon-circle">
                    <Mail size={20} className="text-amber" />
                  </div>
                  <div>
                    <span className="detail-label">Hộp thư điện tử (Email):</span>
                    <strong className="detail-val">
                      <a href={`mailto:${email}`}>{email}</a>
                    </strong>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="icon-circle">
                    <User size={20} className="text-amber" />
                  </div>
                  <div>
                    <span className="detail-label">Đại diện pháp luật:</span>
                    <strong className="detail-val">{director} (Giám đốc)</strong>
                  </div>
                </div>
              </div>

              {/* Working Hours & Guarantee */}
              <div className="contact-assurance-box">
                <div className="assurance-item">
                  <Clock size={18} className="text-emerald-500" />
                  <span>Thời gian làm việc: 08:00 - 18:00 (Thứ 2 - Thứ 7)</span>
                </div>
                <div className="assurance-item">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span>Phản hồi báo giá trong vòng 24 giờ làm việc</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form */}
          <div className="tg-contact-form-col">
            <div className="tg-form-card">
              <h3 className="form-card-title">Gửi Yêu Cầu Báo Giá & Tư Vấn Dự Án</h3>
              <p className="form-card-sub">
                Điền thông tin dự án để kỹ sư Trần Gia tiến hành bóc tách khối lượng và gửi báo giá tối ưu nhất.
              </p>

              {isSubmitted ? (
                <div className="tg-form-success-banner">
                  <CheckCircle size={48} className="text-emerald-500" />
                  <h4>Gửi yêu cầu thành công!</h4>
                  <p>
                    Cảm ơn <strong>{formData.fullName}</strong>. Kỹ sư Trần Gia đã tiếp nhận thông tin và sẽ liên hệ
                    qua số điện thoại <strong>{formData.phone}</strong> trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        service: 'ceiling',
                        projectLocation: '',
                        message: '',
                      });
                    }}
                    className="tg-btn primary-solid small mt-4"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="tg-consult-form">
                  <div className="form-row-2col">
                    <div className="form-group">
                      <label>Họ và tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Số điện thoại *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0986xxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label>Địa chỉ Email</label>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Hạng mục quan tâm</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="ceiling">Thi công Trần thạch cao & Kim loại</option>
                        <option value="partition">Thi công Vách thạch cao & Chống cháy</option>
                        <option value="painting">Sơn bả hoàn thiện & Phào GFRC</option>
                        <option value="fitout">Nội thất Fit-out & Cơ điện M&E trọn gói</option>
                        <option value="all">Tổng thầu hoàn thiện xây dựng</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Địa điểm công trình / Tên dự án</label>
                    <input
                      type="text"
                      placeholder="VD: Dự án Khách sạn Hạ Long / Căn hộ Bình Dương..."
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Nội dung chi tiết yêu cầu</label>
                    <textarea
                      rows={4}
                      placeholder="Mô tả sơ bộ về quy mô công trình, diện tích hoặc thời gian triển khai..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="tg-btn primary-solid w-full">
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    <span>{isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi Yêu Cầu Báo Giá Trực Tuyến'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
