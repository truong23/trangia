import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { Job } from '../types';
import { api } from '../services/api';
import { AdminJobModal } from './AdminJobModal';
import { AdminApplicationModal } from './AdminApplicationModal';
import { JobDetailModal } from './JobDetailModal';

export const AdminJobsTab: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await api.getJobs();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = () => {
    setEditingJob(null);
    setIsJobModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsJobModalOpen(true);
  };

  const handleDeleteJob = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa tin tuyển dụng này?')) return;
    try {
      await api.deleteJob(id);
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job', error);
      alert('Xóa thất bại');
    }
  };

  const handleViewApplications = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsAppModalOpen(true);
  };

  if (isLoading) {
    return <div className="admin-tab-pane">Đang tải danh sách...</div>;
  }

  return (
    <div className="admin-tab-pane">
      <div className="table-controls-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ margin: 0, alignSelf: 'center' }}>Quản lý Tuyển dụng</h3>
        <button className="btn-primary" onClick={handleCreateJob} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={18} /> Thêm tin tuyển dụng
        </button>
      </div>

      <div className="admin-table-card">
          <table className="admin-data-table responsive-admin-table" style={{ minWidth: '800px' }}>
            <thead>
              <tr>
                <th style={{ whiteSpace: 'nowrap' }}>Tiêu đề</th>
                <th style={{ whiteSpace: 'nowrap' }}>Phòng ban</th>
                <th style={{ whiteSpace: 'nowrap' }}>Mức lương</th>
                <th style={{ whiteSpace: 'nowrap' }}>Trạng thái</th>
                <th style={{ whiteSpace: 'nowrap' }}>Hạn nộp</th>
                <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Ứng viên</th>
                <th style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td data-label="Tiêu đề">
                    <strong style={{ color: '#1a365d' }}>{job.title}</strong>
                  </td>
                  <td data-label="Phòng ban">{job.department}</td>
                  <td data-label="Mức lương">{job.salary}</td>
                  <td data-label="Trạng thái">
                    <span className={`status-badge ${job.status === 'open' ? 'published' : 'draft'}`}>
                      {job.status === 'open' ? 'Đang mở' : 'Đã đóng'}
                    </span>
                  </td>
                  <td data-label="Hạn nộp">{new Date(job.deadline).toLocaleDateString('vi-VN')}</td>
                  <td data-label="Ứng viên" style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => handleViewApplications(job.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      title="Xem danh sách ứng viên"
                    >
                      <span style={{ backgroundColor: job.applicationCount && job.applicationCount > 0 ? '#ff3b30' : '#e2e8f0', color: job.applicationCount && job.applicationCount > 0 ? '#fff' : '#4a5568', padding: '2px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>
                        {job.applicationCount || 0}
                      </span>
                    </button>
                  </td>
                  <td data-label="Thao tác" style={{ textAlign: 'right' }}>
                    <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn-icon edit" onClick={() => setViewingJob(job)} title="Xem trước tin">
                        <Eye size={18} />
                      </button>
                      <button className="btn-icon edit" onClick={() => handleViewApplications(job.id)} title="Xem hồ sơ">
                        <FileText size={18} />
                      </button>
                      <button className="btn-icon edit" onClick={() => handleEditJob(job)} title="Sửa">
                        <Edit size={18} />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDeleteJob(job.id)} title="Xóa">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>Chưa có tin tuyển dụng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>

      {isJobModalOpen && (
        <AdminJobModal
          job={editingJob}
          onClose={() => setIsJobModalOpen(false)}
          onSaved={fetchJobs}
        />
      )}

      {isAppModalOpen && selectedJobId && (
        <AdminApplicationModal
          jobId={selectedJobId}
          onClose={() => setIsAppModalOpen(false)}
        />
      )}

      {viewingJob && (
        <JobDetailModal
          job={viewingJob}
          onClose={() => setViewingJob(null)}
          onApply={() => { alert('Chức năng nộp CV chỉ dành cho ứng viên thao tác ngoài website.'); setViewingJob(null); }}
        />
      )}
    </div>
  );
};
