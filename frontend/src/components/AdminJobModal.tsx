import React, { useState } from 'react';
import { Job } from '../types';
import { api } from '../services/api';

interface AdminJobModalProps {
  job: Job | null;
  onClose: () => void;
  onSaved: () => void;
}

export const AdminJobModal: React.FC<AdminJobModalProps> = ({ job, onClose, onSaved }) => {
  const [formData, setFormData] = useState<Partial<Job>>(
    job || {
      title: '',
      department: '',
      location: '',
      salary: '',
      jobType: '',
      deadline: '',
      description: '',
      requirements: '',
      benefits: '',
      status: 'open',
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (job && job.id) {
        await api.updateJob(job.id, formData);
      } else {
        await api.createJob(formData);
      }
      onSaved();
      onClose();
    } catch (error) {
      console.error('Failed to save job', error);
      alert('Lưu thất bại. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
      <div className="admin-card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>{job ? 'Sửa tin tuyển dụng' : 'Thêm tin tuyển dụng mới'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>Tiêu đề công việc *</label>
            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Phòng ban / Chuyên ngành *</label>
              <select className="form-control" name="department" value={formData.department} onChange={handleChange} required>
                <option value="">-- Chọn phòng ban --</option>
                <option value="Kỹ thuật thi công">Kỹ thuật thi công</option>
                <option value="Kỹ thuật dự án">Kỹ thuật dự án</option>
                <option value="Thiết kế / Kiến trúc">Thiết kế / Kiến trúc</option>
                <option value="Quản lý dự án">Quản lý dự án</option>
                <option value="Đấu thầu & Mua sắm">Đấu thầu & Mua sắm</option>
                <option value="An toàn lao động (HSE)">An toàn lao động (HSE)</option>
                <option value="Hành chính - Nhân sự">Hành chính - Nhân sự</option>
                <option value="Kế toán - Tài chính">Kế toán - Tài chính</option>
                <option value="Kinh doanh / Marketing">Kinh doanh / Marketing</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nơi làm việc *</label>
              <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
            <div className="form-group">
              <label>Loại hình công việc *</label>
              <select className="form-control" name="jobType" value={formData.jobType} onChange={handleChange} required>
                <option value="">-- Chọn loại hình --</option>
                <option value="Toàn thời gian (Full-time)">Toàn thời gian (Full-time)</option>
                <option value="Bán thời gian (Part-time)">Bán thời gian (Part-time)</option>
                <option value="Thực tập sinh (Intern)">Thực tập sinh (Intern)</option>
                <option value="Hợp đồng dự án">Hợp đồng dự án</option>
              </select>
            </div>
              <label>Loại hình (Full-time/Part-time) *</label>
              <input type="text" className="form-control" name="jobType" value={formData.jobType} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Hạn nộp *</label>
              <input type="date" className="form-control" name="deadline" value={formData.deadline ? formData.deadline.substring(0, 10) : ''} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Mô tả công việc *</label>
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows={4} required></textarea>
          </div>

          <div className="form-group">
            <label>Yêu cầu ứng viên *</label>
            <textarea className="form-control" name="requirements" value={formData.requirements} onChange={handleChange} rows={4} required></textarea>
          </div>

          <div className="form-group">
            <label>Quyền lợi *</label>
            <textarea className="form-control" name="benefits" value={formData.benefits} onChange={handleChange} rows={4} required></textarea>
          </div>

          <div className="form-group">
            <label>Trạng thái</label>
            <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
              <option value="open">Đang mở</option>
              <option value="closed">Đã đóng</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>Hủy</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
