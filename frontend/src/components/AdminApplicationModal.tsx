import React, { useState, useEffect } from 'react';
import { Application } from '../types';
import { api } from '../services/api';
import { ExternalLink, CheckCircle, XCircle, Trash2, Clock, CheckCircle2, RotateCcw } from 'lucide-react';

interface AdminApplicationModalProps {
  jobId: string;
  jobTitle?: string;
  onClose: () => void;
  onChanged?: () => void;
}

export const AdminApplicationModal: React.FC<AdminApplicationModalProps> = ({
  jobId,
  jobTitle,
  onClose,
  onChanged,
}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'passed' | 'rejected'>('all');
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
      await fetchApplications();
      if (onChanged) onChanged();
      setEditingNoteId(null);
    } catch (error) {
      alert('Lỗi lưu ghi chú');
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.updateApplicationStatus(id, status);
      await fetchApplications();
      if (onChanged) onChanged();
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Cập nhật trạng thái thất bại');
    }
  };

  const handleDeleteApplication = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa hồ sơ của ứng viên "${name}"?`)) return;
    try {
      await api.deleteApplication(id);
      await fetchApplications();
      if (onChanged) onChanged();
    } catch (error) {
      console.error('Failed to delete application', error);
      alert('Xóa hồ sơ thất bại');
    }
  };

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    passed: applications.filter((a) => a.status === 'passed').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const filteredApplications = applications.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return (
          <span className="status-badge published" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={13} /> Đạt
          </span>
        );
      case 'rejected':
        return (
          <span className="status-badge archived" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <XCircle size={13} /> Loại
          </span>
        );
      default:
        return (
          <span className="status-badge draft" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A' }}>
            <Clock size={13} /> Chờ duyệt
          </span>
        );
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 1000,
        padding: '15px',
      }}
    >
      <div
        className="admin-card"
        style={{
          width: '100%',
          maxWidth: '1050px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem',
            flexShrink: 0,
            paddingBottom: '12px',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#1a365d' }}>
              Danh sách ứng viên {jobTitle ? `— ${jobTitle}` : ''}
            </h2>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: '#475569' }}>
                Tổng: <strong>{counts.all} hồ sơ</strong>
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.85rem', color: counts.pending > 0 ? '#ea580c' : '#64748b', fontWeight: counts.pending > 0 ? 600 : 400 }}>
                Chờ duyệt: <strong>{counts.pending}</strong>
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.85rem', color: '#16a34a' }}>
                Đã đạt: <strong>{counts.passed}</strong>
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Đã loại: <strong>{counts.rejected}</strong>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--gray-500, #64748B)',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: `Tất cả (${counts.all})` },
            { key: 'pending', label: `Chờ duyệt (${counts.pending})` },
            { key: 'passed', label: `Đạt (${counts.passed})` },
            { key: 'rejected', label: `Loại (${counts.rejected})` },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key as any)}
              style={{
                padding: '5px 12px',
                borderRadius: '16px',
                fontSize: '0.85rem',
                border: '1px solid',
                cursor: 'pointer',
                fontWeight: statusFilter === item.key ? 600 : 400,
                backgroundColor: statusFilter === item.key ? '#26A9E0' : '#F1F5F9',
                color: statusFilter === item.key ? '#FFFFFF' : '#475569',
                borderColor: statusFilter === item.key ? '#26A9E0' : '#E2E8F0',
                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Body Table */}
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-500, #64748B)' }}>
            Đang tải danh sách hồ sơ...
          </div>
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
                {filteredApplications.map((app) => (
                  <React.Fragment key={app.id}>
                    <tr>
                      <td data-label="Tên ứng viên" style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        <strong style={{ color: '#1a365d', fontSize: '1.05rem' }}>{app.candidateName}</strong>
                      </td>
                      <td data-label="Liên hệ" style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <span style={{ color: 'var(--gray-600, #4a5568)', fontSize: '0.9rem' }}>{app.email}</span>
                          <span style={{ color: 'var(--gray-600, #4a5568)', fontWeight: 600, fontSize: '0.9rem' }}>
                            {app.phone}
                          </span>
                        </div>
                      </td>
                      <td data-label="Ngày nộp" style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem', fontSize: '0.9rem' }}>
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString('vi-VN') : ''}
                      </td>
                      <td data-label="Trạng thái" style={{ verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        {getStatusBadge(app.status)}
                      </td>
                      <td data-label="Xử lý hồ sơ" style={{ textAlign: 'right', verticalAlign: 'middle', borderBottom: 'none', paddingBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '0.4rem' }}>
                          <a
                            href={app.cvUrl.startsWith('http') ? app.cvUrl : `http://localhost:3001${app.cvUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '5px 10px',
                              backgroundColor: '#eff6ff',
                              color: '#2563eb',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontWeight: 500,
                              fontSize: '0.85rem',
                              border: '1px solid #bfdbfe',
                              whiteSpace: 'nowrap',
                            }}
                            title="Mở CV PDF trong tab mới"
                          >
                            <ExternalLink size={14} /> Xem CV
                          </a>

                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(app.id, 'passed')}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '5px 10px',
                                  backgroundColor: '#f0fdf4',
                                  color: '#16a34a',
                                  borderRadius: '6px',
                                  border: '1px solid #bbf7d0',
                                  fontWeight: 500,
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap',
                                }}
                                title="Đánh giá Đạt / Mời phỏng vấn"
                              >
                                <CheckCircle size={14} /> Đạt
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(app.id, 'rejected')}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '5px 10px',
                                  backgroundColor: '#fef2f2',
                                  color: '#dc2626',
                                  borderRadius: '6px',
                                  border: '1px solid #fecaca',
                                  fontWeight: 500,
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap',
                                }}
                                title="Đánh giá Không đạt"
                              >
                                <XCircle size={14} /> Loại
                              </button>
                            </>
                          )}

                          {app.status !== 'pending' && (
                            <button
                              onClick={() => handleUpdateStatus(app.id, 'pending')}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '5px 8px',
                                backgroundColor: '#f8fafc',
                                color: '#64748b',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                              }}
                              title="Đặt lại trạng thái Chờ duyệt"
                            >
                              <RotateCcw size={13} /> Chờ lại
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteApplication(app.id, app.candidateName)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '5px 8px',
                              backgroundColor: '#fff',
                              color: '#ef4444',
                              borderRadius: '6px',
                              border: '1px solid #fecaca',
                              cursor: 'pointer',
                            }}
                            title="Xóa hồ sơ này"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* HÀNG GHI CHÚ (DETAILS ROW) SPAN 5 CỘT */}
                    <tr>
                      <td colSpan={5} style={{ paddingTop: 0, paddingBottom: '1.25rem', borderBottom: '2px solid #e2e8f0' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            marginTop: '0.25rem',
                            backgroundColor: '#f8fafc',
                            padding: '0.85rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          {app.coverLetter && (
                            <div>
                              <strong style={{ color: 'var(--gray-600, #475569)', fontSize: '0.85rem', display: 'block', marginBottom: '2px' }}>
                                Lời nhắn từ ứng viên:
                              </strong>
                              <div style={{ fontSize: '0.9rem', color: 'var(--gray-700, #334155)', fontStyle: 'italic', paddingLeft: '8px', borderLeft: '3px solid #26A9E0' }}>
                                "{app.coverLetter}"
                              </div>
                            </div>
                          )}

                          <div>
                            <strong style={{ color: 'var(--gray-600, #475569)', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
                              Ghi chú tuyển dụng (HR Note):
                            </strong>
                            {editingNoteId === app.id ? (
                              <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '600px' }}>
                                <input
                                  type="text"
                                  value={tempNote}
                                  onChange={(e) => setTempNote(e.target.value)}
                                  autoFocus
                                  style={{
                                    flex: 1,
                                    padding: '6px 10px',
                                    border: '1px solid #26A9E0',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                  }}
                                  placeholder="Nhập ghi chú phỏng vấn / đánh giá..."
                                />
                                <button
                                  onClick={() => handleSaveNote(app.id)}
                                  style={{ color: '#fff', backgroundColor: '#26A9E0', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}
                                >
                                  Lưu
                                </button>
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  style={{ color: 'var(--gray-600, #475569)', backgroundColor: '#e2e8f0', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'center', backgroundColor: '#fff', padding: '6px 10px', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
                                <span style={{ color: app.hrNote ? '#0f172a' : '#94a3b8', flex: 1, wordBreak: 'break-word', fontSize: '0.9rem' }}>
                                  {app.hrNote || 'Chưa có ghi chú nào.'}
                                </span>
                                <button
                                  onClick={() => {
                                    setEditingNoteId(app.id);
                                    setTempNote(app.hrNote || '');
                                  }}
                                  style={{ color: '#26A9E0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'underline' }}
                                >
                                  {app.hrNote ? 'Sửa' : '+ Thêm ghi chú'}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray-500, #64748B)' }}>
                      <div style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--gray-600, #475569)', fontWeight: 500 }}>
                        {statusFilter === 'all'
                          ? 'Chưa có hồ sơ ứng tuyển nào cho vị trí này.'
                          : `Không có hồ sơ nào ở trạng thái "${statusFilter}".`}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', flexShrink: 0, paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
          <button className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.95rem' }} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
