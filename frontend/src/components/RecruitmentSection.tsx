import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { api } from '../services/api';
import { Briefcase, MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react';
import { JobDetailModal } from './JobDetailModal';
import { ApplicationFormModal } from './ApplicationFormModal';

export const RecruitmentSection: React.FC<{ bannerUrl?: string }> = ({ bannerUrl }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        const allJobs = await api.getJobs();
        setJobs(allJobs.filter(job => job.status === 'open'));
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActiveJobs();
  }, []);

  const handleOpenJob = (job: Job) => {
    setSelectedJob(job);
    const params = new URLSearchParams(window.location.search);
    params.set('job', job.id);
    window.history.pushState({ jobId: job.id }, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleCloseJob = () => {
    setSelectedJob(null);
    const params = new URLSearchParams(window.location.search);
    params.delete('job');
    params.delete('jobId');
    const search = params.toString() ? `?${params.toString()}` : '';
    window.history.pushState({}, '', `${window.location.pathname}${search}`);
  };

  // Tự động mở modal chi tiết nếu có query param ?job= hoặc ?jobId=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jId = params.get('job') || params.get('jobId');
    if (jId && jobs.length > 0) {
      const found = jobs.find(j => j.id === jId);
      if (found) setSelectedJob(found);
    }
  }, [jobs]);

  // Lắng nghe sự kiện browser Back / Forward để đóng/mở modal tương ứng
  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      const jId = params.get('job') || params.get('jobId');
      if (jId && jobs.length > 0) {
        const found = jobs.find(j => j.id === jId);
        if (found) setSelectedJob(found);
      } else {
        setSelectedJob(null);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [jobs]);

  const handleApply = (jobId: string) => {
    handleCloseJob();
    setApplyingJobId(jobId);
  };

  const filteredJobs = jobs.filter(job => 
    (departmentFilter ? job.department === departmentFilter : true) &&
    (locationFilter ? job.location === locationFilter : true)
  );

  const departments = Array.from(new Set(jobs.map(j => j.department)));
  const locations = Array.from(new Set(jobs.map(j => j.location)));

  if (isLoading) {
    return <div className="tg-section bg-gray-50"><div className="container">Đang tải tin tuyển dụng...</div></div>;
  }

  return (
    <section id="recruitment" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: '350px', backgroundImage: `url(${bannerUrl || '/banner-tuyen-dung.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Tin tuyển dụng</h1>
          <div style={{ width: '60px', height: '3px', backgroundColor: '#26A9E0', margin: '15px auto', borderRadius: '2px' }}></div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px', minHeight: '600px' }}>
        <div className="recruitment-layout">
          
          {/* Sidebar Filters */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '20px' }}>Bộ Lọc Tuyển Dụng</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gray-500, #666)', marginBottom: '5px' }}>Vị trí mong muốn</label>
              <div style={{ position: 'relative' }}>
                <select 
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', appearance: 'none', backgroundColor: '#fff', fontSize: '0.95rem', color: '#333' }}
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="">-- Chọn vị trí tuyển dụng --</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <Briefcase size={16} style={{ position: 'absolute', right: '10px', top: '12px', color: '#26A9E0', pointerEvents: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gray-500, #666)', marginBottom: '5px' }}>Tỉnh/thành phố</label>
              <div style={{ position: 'relative' }}>
                <select 
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', appearance: 'none', backgroundColor: '#fff', fontSize: '0.95rem', color: '#333' }}
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">-- Chọn tỉnh/thành phố --</option>
                  {locations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <MapPin size={16} style={{ position: 'absolute', right: '10px', top: '12px', color: '#26A9E0', pointerEvents: 'none' }} />
              </div>
            </div>

            <button 
              onClick={() => { setDepartmentFilter(''); setLocationFilter(''); }}
              style={{ width: '100%', padding: '10px', backgroundColor: '#eef2f6', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
            >
              Xóa bộ lọc
            </button>
          </div>

          {/* Main Job List */}
          <div>
            <div style={{ marginBottom: '20px', fontSize: '1rem', color: 'var(--gray-500, #666)' }}>
              Tổng: <strong style={{ color: '#26A9E0' }}>{filteredJobs.length}</strong> kết quả
            </div>

            {filteredJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <Briefcase size={48} style={{ color: '#ccc', margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--gray-500, #666)' }}>Không tìm thấy vị trí phù hợp</h3>
                <p>Vui lòng điều chỉnh bộ lọc hoặc quay lại sau.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filteredJobs.map((job) => (
                  <div key={job.id} className="job-card-layout" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', transition: 'transform 0.2s', borderLeft: '4px solid #26A9E0' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px', fontWeight: 600 }}>{job.title}</h3>
                      <div className="job-card-meta">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#26A9E0', fontWeight: 500 }}>
                          <DollarSign size={16} /> <span>{job.salary}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <MapPin size={16} /> <span>{job.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Clock size={16} /> <span>Hạn nộp hồ sơ: {new Date(job.deadline).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button 
                        onClick={() => handleOpenJob(job)}
                        style={{ padding: '8px 20px', border: '1px solid #26A9E0', color: '#26A9E0', backgroundColor: 'transparent', borderRadius: '4px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#26A9E0'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#26A9E0'; }}
                      >
                        CHI TIẾT <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={handleCloseJob} onApply={() => handleApply(selectedJob.id)} onSelectRelated={(job) => handleOpenJob(job)} bannerUrl={bannerUrl} />
      )}

      {applyingJobId && (
        <ApplicationFormModal jobId={applyingJobId} onClose={() => setApplyingJobId(null)} />
      )}
    </section>
  );
};
