import React, { useState, useEffect } from 'react';
import { Application } from '../types';
import { api } from '../services/api';
import { ExternalLink, CheckCircle, XCircle } from 'lucide-react';

interface AdminApplicationModalProps {
  jobId: string;
  onClose: () => void;
}

export const AdminApplicationModal: React.FC<AdminApplicationModalProps> = ({ jobId, onClose }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const data = await api.getApplications(jobId);
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications', error);
      alert('Không thể tải danh sách ứng viên');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const handleSaveNote = async (appId: string) => {
    try {
      await api.updateApplicationNote(appId, tempNote);
      fetchApplications();
      setEditingNoteId(null);
    } catch (error) {
      alert('Lỗi lưu ghi chú');
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.updateApplicationStatus(id, status);
      fetchApplications();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Cập nhật trạng thái thất bại');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed': return <span className="status-badge published" style={{ display: 'inline-block' }}>Đạt</span>;
      case 'rejected': return <span className="status-badge archived" style={{ display: 'inline-block' }}>Loại</span>;
      default: return <span className="status-badge draft" style={{ display: 'inline-block' }}>Chờ duyệt</span>;
    }
  };

  return (
    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, padding: '15px' }}>
      <div className="admin-card" style={{ width: '100%', maxWidth: '1000px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexShrink: 0, paddingBottom: '15px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#1a365d' }}>Danh sách ứng viên</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>&times;</button>
        </div>

        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Đang tải...</div>
        ) : (
          <div className="admin-table-card" style={{ flex: 1, overflowY: 'auto', border: 'none', boxShadow: 'none' }}>
            <table className="admin-data-table responsive-admin-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#F8FAFC' }}>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>Tên ứng viên</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Email / SĐT</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày nộp</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Trạng thái</th>
                  <th style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>Xử lý hồ sơ</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <React.Fragment key={app.id}>
                    {/* HÀNG THÔNG TIN CHÍNH VÀ NÚT BẤM */}
                    <tr>
                      <td data-label="Tên ứng viên" style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        <strong style={{ color: '#1a365d', fontSize: '1.05rem' }}>{app.candidateName}</strong>
                      </td>
                      <td data-label="Liên hệ" style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ color: '#4a5568' }}>{app.email}</span>
                          <span style={{ color: '#4a5568', fontWeight: 500 }}>{app.phone}</span>
                        </div>
                      </td>
                      <td data-label="Ngày nộp" style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString('vi-VN') : ''}
                      </td>
                      <td data-label="Trạng thái" style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        {getStatusBadge(app.status)}
                      </td>
                      <td data-label="Xử lý hồ sơ" style={{ textAlign: 'right', verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <a href={app.cvUrl.startsWith('http') ? app.cvUrl : `http://localhost:3001${app.cvUrl}`} target="_blank" rel="noreferrer"  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', backgroundColor: '#eff6ff', color: '#3b82f6', borderRadius: '6px', textDecoration: 'none', fontWeight: 500, border: '1px solid #bfdbfe', whiteSpace: 'nowrap' }} title="Xem CV">
                            <ExternalLink size={16} /> Xem CV
                          </a>
                          {app.status === 'pending' && (
                            <>
                              <button  onClick={() => handleUpdateStatus(app.id, 'passed')} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '6px', border: '1px solid #bbf7d0', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }} title="Đánh giá Đạt">
                                <CheckCircle size={16} /> Đạt
                              </button>
                              <button  onClick={() => handleUpdateStatus(app.id, 'rejected')} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '6px', border: '1px solid #fecaca', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }} title="Đánh giá Loại">
                                <XCircle size={16} /> Loại
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* HÀNG GHI CHÚ (DETAILS ROW) SPAN 5 CỘT */}
                    <tr>
                      <td colSpan={5} style={{ paddingTop: 0, paddingBottom: '1.5rem', borderBottom: '2px solid #e2e8f0' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          
                          {app.coverLetter && (
                            <div>
                              <strong style={{ color: '#475569', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Thư giới thiệu:</strong>
                              <div style={{ fontSize: '0.95rem', color: '#334155', fontStyle: 'italic', paddingLeft: '10px', borderLeft: '3px solid #cbd5e1' }}>
                                "{app.coverLetter}"
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <strong style={{ color: '#475569', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>Ghi chú nội bộ (HR):</strong>
                            {editingNoteId === app.id ? (
                              <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '600px' }}>
                                <input type="text" value={tempNote} onChange={e => setTempNote(e.target.value)} autoFocus style={{ flex: 1, padding: '8px 12px', border: '1px solid #00B14F', borderRadius: '6px', fontSize: '0.95rem', outline: 'none', boxShadow: '0 0 0 2px rgba(0, 177, 79, 0.2)' }} placeholder="Nhập ghi chú (VD: Hẹn phỏng vấn chiều thứ 5)..." />
                                <button onClick={() => handleSaveNote(app.id)} style={{ color: '#fff', backgroundColor: '#00B14F', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '6px', flexShrink: 0, fontWeight: 600 }}>Lưu</button>
                                <button onClick={() => setEditingNoteId(null)} style={{ color: '#475569', backgroundColor: '#e2e8f0', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '6px', flexShrink: 0, fontWeight: 600 }}>Hủy</button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', gap: '10px', width: '100%', alignItems: 'center', backgroundColor: '#fff', padding: '8px 12px', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
                                <span style={{ color: app.hrNote ? '#0f172a' : '#94a3b8', flex: 1, wordBreak: 'break-word', fontSize: '0.95rem' }}>
                                  {app.hrNote || 'Chưa có ghi chú nào.'}
                                </span>
                                <button onClick={() => { setEditingNoteId(app.id); setTempNote(app.hrNote || ''); }} style={{ color: '#00B14F', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'underline', flexShrink: 0 }} title="Sửa ghi chú">
                                  Chỉnh sửa
                                </button>
                              </div>
                            )}
                          </div>
                          
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b' }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#475569', fontWeight: 500 }}>Chưa có hồ sơ ứng tuyển nào.</div>
                      <div style={{ fontSize: '0.95rem' }}>Khi có ứng viên nộp CV, danh sách sẽ hiện ở đây.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', flexShrink: 0, paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
          <button className="btn-secondary" style={{ padding: '8px 24px', fontSize: '1rem' }} onClick={onClose}>Đóng cửa sổ</button>
        </div>
      </div>
    </div>
  );
};
