import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  FileText,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Briefcase,
  ExternalLink,
  RotateCcw,
  Building,
  Calendar,
} from 'lucide-react';
import { Job, Application } from '../types';
import { api } from '../services/api';
import { AdminJobModal } from './AdminJobModal';
import { AdminApplicationModal } from './AdminApplicationModal';
import { JobDetailModal } from './JobDetailModal';

export const AdminJobsTab: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // View mode: 'jobs' (Quản lý bài đăng) hoặc 'candidates' (Quản lý hồ sơ ứng viên tập trung)
  const [activeView, _setActiveView] = useState<'jobs' | 'candidates'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'candidates' ? 'candidates' : 'jobs';
  });

  const setActiveView = (v: 'jobs' | 'candidates') => {
    _setActiveView(v);
    const params = new URLSearchParams(window.location.search);
    if (v === 'candidates') {
      params.set('view', 'candidates');
    } else {
      params.delete('view');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  // Job modal & previews
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);

  // Application modal (view applications for a specific job)
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  // Filters for Jobs Table
  const [jobSearch, setJobSearch] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState<string>('all');
  const [jobDeptFilter, setJobDeptFilter] = useState<string>('all');

  // Filters for Candidates Table
  const [candidateSearch, setCandidateSearch] = useState('');
  const [candidateStatusFilter, setCandidateStatusFilter] = useState<'all' | 'pending' | 'passed' | 'rejected'>('all');
  const [candidateJobFilter, setCandidateJobFilter] = useState<string>('all');

  // HR note editing in candidate table
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [jobsData, appsData] = await Promise.all([
        api.getJobs().catch(() => []),
        api.getApplications().catch(() => []),
      ]);
      setJobs(jobsData);
      setApplications(appsData);
    } catch (error) {
      console.error('Failed to fetch recruitment data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateJob = () => {
    setEditingJob(null);
    setIsJobModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsJobModalOpen(true);
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa tin tuyển dụng "${title}"?`)) return;
    try {
      await api.deleteJob(id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete job', error);
      alert('Xóa thất bại');
    }
  };

  const handleOpenApplicationsModal = (job: Job) => {
    setSelectedJobForModal(job);
    setIsAppModalOpen(true);
    const params = new URLSearchParams(window.location.search);
    params.set('jobId', job.id);
    params.set('modal', 'applications');
    window.history.pushState({ modal: 'applications', jobId: job.id }, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleCloseApplicationsModal = () => {
    setIsAppModalOpen(false);
    setSelectedJobForModal(null);
    const params = new URLSearchParams(window.location.search);
    params.delete('jobId');
    params.delete('modal');
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  // Tự động mở lại modal xem hồ sơ nếu URL có ?modal=applications&jobId=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('modal') === 'applications') {
      const jId = params.get('jobId');
      if (jId && jobs.length > 0) {
        const target = jobs.find(j => j.id === jId);
        if (target) {
          setSelectedJobForModal(target);
          setIsAppModalOpen(true);
        }
      }
    }
  }, [jobs]);

  // Lắng nghe nút Back / Forward trên trình duyệt
  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      _setActiveView(params.get('view') === 'candidates' ? 'candidates' : 'jobs');
      if (params.get('modal') !== 'applications') {
        setIsAppModalOpen(false);
        setSelectedJobForModal(null);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleUpdateAppStatus = async (id: string, status: string) => {
    try {
      await api.updateApplicationStatus(id, status);
      const appsData = await api.getApplications().catch(() => []);
      setApplications(appsData);
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Cập nhật trạng thái thất bại');
    }
  };

  const handleDeleteApplication = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa hồ sơ của ứng viên "${name}"?`)) return;
    try {
      await api.deleteApplication(id);
      const appsData = await api.getApplications().catch(() => []);
      setApplications(appsData);
    } catch (error) {
      console.error('Failed to delete application', error);
      alert('Xóa hồ sơ thất bại');
    }
  };

  const handleSaveHrNote = async (appId: string) => {
    try {
      await api.updateApplicationNote(appId, tempNote);
      const appsData = await api.getApplications().catch(() => []);
      setApplications(appsData);
      setEditingNoteId(null);
    } catch (error) {
      alert('Lỗi lưu ghi chú');
    }
  };

  // KPIs
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === 'open').length;
  const totalCandidates = applications.length;
  const pendingCandidates = applications.filter((a) => a.status === 'pending').length;
  const passedCandidates = applications.filter((a) => a.status === 'passed').length;
  const rejectedCandidates = applications.filter((a) => a.status === 'rejected').length;

  // Filtered Jobs
  const departments = Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)));
  const filteredJobs = jobs.filter((j) => {
    const matchSearch =
      jobSearch.trim() === '' ||
      j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.department.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.location.toLowerCase().includes(jobSearch.toLowerCase());
    const matchStatus = jobStatusFilter === 'all' || j.status === jobStatusFilter;
    const matchDept = jobDeptFilter === 'all' || j.department === jobDeptFilter;
    return matchSearch && matchStatus && matchDept;
  });

  // Filtered Candidates
  const filteredCandidates = applications.filter((app) => {
    const matchStatus = candidateStatusFilter === 'all' || app.status === candidateStatusFilter;
    const matchJob = candidateJobFilter === 'all' || app.jobId === candidateJobFilter;
    const matchSearch =
      candidateSearch.trim() === '' ||
      app.candidateName.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      app.email.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      app.phone.includes(candidateSearch.trim());
    return matchStatus && matchJob && matchSearch;
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
          <span
            className="status-badge draft"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#FEF3C7',
              color: '#B45309',
              border: '1px solid #FDE68A',
            }}
          >
            <Clock size={13} /> Chờ duyệt
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="admin-tab-pane" style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
        Đang tải dữ liệu tuyển dụng & hồ sơ ứng viên...
      </div>
    );
  }

  return (
    <div className="admin-tab-pane">
      {/* 1. RECRUITMENT KPI METRICS BAR */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Briefcase size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Vị trí tuyển dụng
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
              {totalJobs}
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#16A34A', marginLeft: '6px' }}>
                ({activeJobs} đang mở)
              </span>
            </div>
          </div>
        </div>

        <div
          onClick={() => setActiveView('candidates')}
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            padding: '16px 18px',
            border: activeView === 'candidates' ? '1.5px solid #26A9E0' : '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: '#F0F9FF',
              color: '#0284C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Tổng hồ sơ ứng viên
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
              {totalCandidates} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748B' }}>hồ sơ</span>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setActiveView('candidates');
            setCandidateStatusFilter('pending');
          }}
          style={{
            background: pendingCandidates > 0 ? '#FFFBEB' : '#FFFFFF',
            borderRadius: '10px',
            padding: '16px 18px',
            border: pendingCandidates > 0 ? '1.5px solid #F59E0B' : '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600, textTransform: 'uppercase' }}>
              Hồ sơ chờ duyệt
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#B45309', lineHeight: 1.2 }}>
              {pendingCandidates}
              {pendingCandidates > 0 && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    background: '#EF4444',
                    color: '#FFF',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    marginLeft: '8px',
                    verticalAlign: 'middle',
                  }}
                >
                  Cần xử lý
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setActiveView('candidates');
            setCandidateStatusFilter('passed');
          }}
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: '#F0FDF4',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Đã đạt / Phỏng vấn
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16A34A', lineHeight: 1.2 }}>
              {passedCandidates}
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setActiveView('candidates');
            setCandidateStatusFilter('rejected');
          }}
          style={{
            background: '#FFFFFF',
            borderRadius: '10px',
            padding: '16px 18px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: '#FEF2F2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <XCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
              Không đạt / Đã từ chối
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#DC2626', lineHeight: 1.2 }}>
              {rejectedCandidates}
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION BAR & VIEW SWITCHER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveView('jobs')}
            className={`btn-secondary ${activeView === 'jobs' ? 'active' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: activeView === 'jobs' ? '#0F172A' : '#FFFFFF',
              color: activeView === 'jobs' ? '#FFFFFF' : '#334155',
              borderColor: activeView === 'jobs' ? '#0F172A' : '#CBD5E1',
            }}
          >
            <Briefcase size={16} />
            <span>Vị trí tuyển dụng ({totalJobs})</span>
          </button>

          <button
            onClick={() => setActiveView('candidates')}
            className={`btn-secondary ${activeView === 'candidates' ? 'active' : ''}`}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: activeView === 'candidates' ? '#0F172A' : '#FFFFFF',
              color: activeView === 'candidates' ? '#FFFFFF' : '#334155',
              borderColor: activeView === 'candidates' ? '#0F172A' : '#CBD5E1',
            }}
          >
            <Users size={16} />
            <span>Tất cả hồ sơ ứng viên ({totalCandidates})</span>
            {pendingCandidates > 0 && (
              <span
                style={{
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '10px',
                  marginLeft: '4px',
                }}
              >
                {pendingCandidates}
              </span>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn-primary"
            onClick={handleCreateJob}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <PlusCircle size={17} />
            <span>Thêm vị trí mới</span>
          </button>
        </div>
      </div>

      {/* 3. VIEW 1: JOBS TABLE (DANH SÁCH BÀI TUYỂN DỤNG KÈM SỐ ỨNG VIÊN) */}
      {activeView === 'jobs' && (
        <div>
          {/* Controls bar */}
          <div className="table-controls-bar" style={{ marginBottom: '14px' }}>
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Tìm vị trí tuyển dụng theo tiêu đề, bộ phận, địa điểm..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
              />
            </div>

            <div className="filter-tools">
              <select
                value={jobStatusFilter}
                onChange={(e) => setJobStatusFilter(e.target.value)}
                style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="open">Đang mở tuyển</option>
                <option value="closed">Đã đóng tuyển</option>
              </select>

              <select
                value={jobDeptFilter}
                onChange={(e) => setJobDeptFilter(e.target.value)}
                style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              >
                <option value="all">Tất cả bộ phận ({departments.length})</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-table-card">
            <table className="admin-data-table responsive-admin-table" style={{ minWidth: '950px' }}>
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>Vị trí tuyển dụng</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Phòng ban / Khối</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Mức lương</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Trạng thái</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Hạn nộp</th>
                  <th style={{ textAlign: 'center', whiteSpace: 'nowrap', minWidth: '160px' }}>
                    Hồ sơ ứng viên
                  </th>
                  <th style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '130px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => {
                  const jobApps = applications.filter((a) => a.jobId === job.id);
                  const jobAppCount = jobApps.length || job.applicationCount || 0;
                  const jobPendingCount = jobApps.filter((a) => a.status === 'pending').length;

                  return (
                    <tr key={job.id}>
                      <td data-label="Vị trí">
                        <div>
                          <strong style={{ color: '#0F172A', fontSize: '14px', display: 'block' }}>{job.title}</strong>
                          <span style={{ fontSize: '12px', color: '#64748B' }}>
                            {job.location} • {job.jobType}
                          </span>
                        </div>
                      </td>
                      <td data-label="Phòng ban">
                        <span
                          style={{
                            display: 'inline-block',
                            background: '#F1F5F9',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: '#334155',
                            fontWeight: 500,
                          }}
                        >
                          {job.department}
                        </span>
                      </td>
                      <td data-label="Mức lương" style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>
                        {job.salary}
                      </td>
                      <td data-label="Trạng thái">
                        <span className={`status-badge ${job.status === 'open' ? 'published' : 'draft'}`}>
                          {job.status === 'open' ? 'Đang mở' : 'Đã đóng'}
                        </span>
                      </td>
                      <td data-label="Hạn nộp" style={{ fontSize: '13px', color: '#475569' }}>
                        {job.deadline ? new Date(job.deadline).toLocaleDateString('vi-VN') : '—'}
                      </td>
                      <td data-label="Hồ sơ ứng viên" style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleOpenApplicationsModal(job)}
                          style={{
                            background: jobAppCount > 0 ? '#EFF6FF' : '#F8FAFC',
                            border: `1px solid ${jobAppCount > 0 ? '#BFDBFE' : '#E2E8F0'}`,
                            borderRadius: '8px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.15s ease',
                          }}
                          title={`Xem ${jobAppCount} hồ sơ nộp cho vị trí này`}
                        >
                          <Users size={15} color={jobAppCount > 0 ? '#2563EB' : '#94A3B8'} />
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: '13px',
                              color: jobAppCount > 0 ? '#1D4ED8' : '#64748B',
                            }}
                          >
                            {jobAppCount} hồ sơ
                          </span>

                          {jobPendingCount > 0 && (
                            <span
                              style={{
                                background: '#F59E0B',
                                color: '#FFFFFF',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '1px 6px',
                                borderRadius: '10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                              }}
                              title={`${jobPendingCount} hồ sơ chờ duyệt`}
                            >
                              <Clock size={10} /> {jobPendingCount} chờ
                            </span>
                          )}
                        </button>
                      </td>
                      <td data-label="Thao tác" style={{ textAlign: 'right' }}>
                        <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                          <button
                            className="btn-icon edit"
                            onClick={() => handleOpenApplicationsModal(job)}
                            title="Xem danh sách ứng viên"
                          >
                            <FileText size={16} />
                          </button>
                          <button
                            className="btn-icon edit"
                            onClick={() => setViewingJob(job)}
                            title="Xem trước giao diện website"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn-icon edit"
                            onClick={() => handleEditJob(job)}
                            title="Chỉnh sửa tin"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn-icon delete"
                            onClick={() => handleDeleteJob(job.id, job.title)}
                            title="Xóa tin tuyển dụng"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredJobs.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
                      <Briefcase size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                      <p>Không tìm thấy tin tuyển dụng nào phù hợp điều kiện lọc.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. VIEW 2: ALL CANDIDATES TABLE (THEO DÕI TẬP TRUNG TẤT CẢ ỨNG VIÊN) */}
      {activeView === 'candidates' && (
        <div>
          {/* Controls Bar for Candidates */}
          <div className="table-controls-bar" style={{ marginBottom: '14px' }}>
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Tìm ứng viên theo họ tên, email, số điện thoại..."
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
              />
            </div>

            <div className="filter-tools">
              <select
                value={candidateJobFilter}
                onChange={(e) => setCandidateJobFilter(e.target.value)}
                style={{ padding: '7px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              >
                <option value="all">Tất cả vị trí tuyển dụng ({jobs.length})</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>

              <div className="status-filter-pills">
                {[
                  { key: 'all', label: `Tất cả (${applications.length})` },
                  { key: 'pending', label: `Chờ duyệt (${pendingCandidates})` },
                  { key: 'passed', label: `Đạt (${passedCandidates})` },
                  { key: 'rejected', label: `Loại (${rejectedCandidates})` },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setCandidateStatusFilter(item.key as any)}
                    className={`status-pill ${candidateStatusFilter === item.key ? 'active' : ''}`}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '16px',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: candidateStatusFilter === item.key ? '#26A9E0' : '#E2E8F0',
                      backgroundColor: candidateStatusFilter === item.key ? '#26A9E0' : '#FFFFFF',
                      color: candidateStatusFilter === item.key ? '#FFFFFF' : '#475569',
                      fontWeight: candidateStatusFilter === item.key ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-table-card">
            <table className="admin-data-table responsive-admin-table" style={{ minWidth: '950px' }}>
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>Ứng viên</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Vị trí ứng tuyển</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Liên hệ</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày nộp</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Trạng thái</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Hồ sơ & Ghi chú HR</th>
                  <th style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '150px' }}>Xử lý</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((app) => {
                  const job = jobs.find((j) => j.id === app.jobId) || app.job;

                  return (
                    <tr key={app.id}>
                      <td data-label="Ứng viên">
                        <div>
                          <strong style={{ color: '#0F172A', fontSize: '14px', display: 'block' }}>
                            {app.candidateName}
                          </strong>
                          {app.coverLetter && (
                            <span
                              style={{
                                fontSize: '11px',
                                color: '#64748B',
                                fontStyle: 'italic',
                                display: 'block',
                                maxWidth: '200px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                              title={app.coverLetter}
                            >
                              "{app.coverLetter}"
                            </span>
                          )}
                        </div>
                      </td>

                      <td data-label="Vị trí ứng tuyển">
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '13px', color: '#1E293B', display: 'block' }}>
                            {job ? job.title : 'Vị trí đã xóa'}
                          </span>
                          {job?.department && (
                            <span style={{ fontSize: '11px', color: '#64748B' }}>{job.department}</span>
                          )}
                        </div>
                      </td>

                      <td data-label="Liên hệ">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12.5px' }}>
                          <span style={{ color: '#334155' }}>{app.email}</span>
                          <span style={{ color: '#0F172A', fontWeight: 600 }}>{app.phone}</span>
                        </div>
                      </td>

                      <td data-label="Ngày nộp" style={{ fontSize: '12.5px', color: '#64748B' }}>
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString('vi-VN') : '—'}
                      </td>

                      <td data-label="Trạng thái">{getStatusBadge(app.status)}</td>

                      <td data-label="Ghi chú HR">
                        <div style={{ maxWidth: '240px' }}>
                          {editingNoteId === app.id ? (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <input
                                type="text"
                                value={tempNote}
                                onChange={(e) => setTempNote(e.target.value)}
                                autoFocus
                                style={{
                                  padding: '4px 8px',
                                  fontSize: '12px',
                                  border: '1px solid #26A9E0',
                                  borderRadius: '4px',
                                  flex: 1,
                                }}
                              />
                              <button
                                onClick={() => handleSaveHrNote(app.id)}
                                style={{
                                  padding: '4px 8px',
                                  background: '#26A9E0',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  cursor: 'pointer',
                                }}
                              >
                                Lưu
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingNoteId(app.id);
                                setTempNote(app.hrNote || '');
                              }}
                              style={{
                                cursor: 'pointer',
                                fontSize: '12px',
                                color: app.hrNote ? '#334155' : '#94A3B8',
                                padding: '3px 6px',
                                background: '#F8FAFC',
                                borderRadius: '4px',
                                border: '1px dashed #CBD5E1',
                              }}
                              title="Bấm để chỉnh sửa ghi chú HR"
                            >
                              {app.hrNote || '+ Thêm ghi chú phỏng vấn'}
                            </div>
                          )}
                        </div>
                      </td>

                      <td data-label="Thao tác" style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center' }}>
                          <a
                            href={app.cvUrl.startsWith('http') ? app.cvUrl : `http://localhost:3001${app.cvUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '5px 9px',
                              backgroundColor: '#EFF6FF',
                              color: '#2563EB',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 600,
                              textDecoration: 'none',
                              border: '1px solid #BFDBFE',
                            }}
                            title="Xem file CV"
                          >
                            <ExternalLink size={13} /> CV
                          </a>

                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateAppStatus(app.id, 'passed')}
                                className="btn-icon edit"
                                style={{ color: '#16A34A', background: '#F0FDF4', borderColor: '#BBF7D0' }}
                                title="Đạt / Mời phỏng vấn"
                              >
                                <CheckCircle2 size={16} />
                              </button>
                              <button
                                onClick={() => handleUpdateAppStatus(app.id, 'rejected')}
                                className="btn-icon delete"
                                title="Đánh giá Loại"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}

                          {app.status !== 'pending' && (
                            <button
                              onClick={() => handleUpdateAppStatus(app.id, 'pending')}
                              className="btn-icon edit"
                              style={{ color: '#64748B' }}
                              title="Đặt lại trạng thái Chờ duyệt"
                            >
                              <RotateCcw size={14} />
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteApplication(app.id, app.candidateName)}
                            className="btn-icon delete"
                            title="Xóa hồ sơ"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
                      <Users size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                      <p>Không tìm thấy hồ sơ ứng viên nào phù hợp điều kiện lọc.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. MODALS */}
      {isJobModalOpen && (
        <AdminJobModal
          job={editingJob}
          onClose={() => setIsJobModalOpen(false)}
          onSaved={fetchData}
        />
      )}

      {isAppModalOpen && selectedJobForModal && (
        <AdminApplicationModal
          jobId={selectedJobForModal.id}
          jobTitle={selectedJobForModal.title}
          onClose={handleCloseApplicationsModal}
          onChanged={fetchData}
        />
      )}

      {viewingJob && (
        <JobDetailModal
          job={viewingJob}
          onClose={() => setViewingJob(null)}
          onApply={() => {
            alert('Chức năng nộp hồ sơ chỉ dành cho ứng viên thao tác ngoài website.');
            setViewingJob(null);
          }}
        />
      )}
    </div>
  );
};
