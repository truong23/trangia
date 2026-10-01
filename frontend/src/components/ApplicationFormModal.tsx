import React, { useState } from 'react';
import { api } from '../services/api';
import { X, Upload, CheckCircle } from 'lucide-react';

interface ApplicationFormModalProps {
  jobId: string;
  onClose: () => void;
}

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({ jobId, onClose }) => {
  const [formData, setFormData] = useState({
    candidateName: '',
    phone: '',
    email: '',
    coverLetter: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      alert('Vui lòng đính kèm CV.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('jobId', jobId);
      data.append('candidateName', formData.candidateName);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('coverLetter', formData.coverLetter);
      data.append('cvFile', cvFile);

      await api.createApplication(data);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to submit application', error);
      alert('Gửi hồ sơ thất bại. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="tg-modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100 }}>
        <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', textAlign: 'center', maxWidth: '400px' }}>
          <CheckCircle size={64} style={{ color: '#00B14F', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '1rem' }}>Ứng tuyển thành công!</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>
          <button style={{ backgroundColor: '#00B14F', color: '#fff', padding: '10px 30px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={onClose}>Đóng</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tg-modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100, padding: '15px' }}>
      <div className="tg-modal-content" onClick={e => e.stopPropagation()} style={{ backgroundColor: '#fff', width: '100%', maxWidth: '600px', borderRadius: '8px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', backgroundColor: '#f8f9fa', borderRadius: '50%' }}>
          <X size={20} />
        </button>
        
        <div style={{ padding: '30px 20px' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#1a365d', marginBottom: '25px', textAlign: 'center', fontWeight: 700 }}>Đơn Ứng Tuyển</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#4a5568' }}>Họ và tên *</label>
              <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e0', borderRadius: '4px' }} placeholder="Nhập họ và tên đầy đủ" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#4a5568' }}>Số điện thoại *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e0', borderRadius: '4px' }} placeholder="Số điện thoại liên hệ" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#4a5568' }}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e0', borderRadius: '4px' }} placeholder="Địa chỉ email" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#4a5568' }}>Thư tự giới thiệu (Không bắt buộc)</label>
              <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e0', borderRadius: '4px', resize: 'vertical' }} placeholder="Giới thiệu ngắn về bản thân và lý do bạn muốn ứng tuyển..."></textarea>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#4a5568' }}>CV đính kèm (PDF, DOC, DOCX) *</label>
              <div style={{ border: '2px dashed #cbd5e0', borderRadius: '4px', padding: '25px', textAlign: 'center', backgroundColor: '#f8f9fa', position: 'relative' }}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                <Upload size={32} style={{ color: '#00B14F', margin: '0 auto 10px' }} />
                <p style={{ margin: 0, color: '#4a5568', fontWeight: 500 }}>
                  {cvFile ? cvFile.name : 'Click hoặc kéo thả file CV vào đây'}
                </p>
                {!cvFile && <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#718096' }}>Hỗ trợ định dạng PDF, DOC, DOCX</p>}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: '#00B14F', color: '#fff', fontSize: '1.1rem', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 10px rgba(0, 177, 79, 0.3)' }}>
              {isSubmitting ? 'Đang gửi hồ sơ...' : 'Gửi Hồ Sơ Ứng Tuyển'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
