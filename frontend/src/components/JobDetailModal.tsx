import React, { useEffect, useState } from 'react';
import { X, MapPin, Clock, DollarSign, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { Job } from '../types';
import { api } from '../services/api';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
  onApply: () => void;
  onSelectRelated?: (job: Job) => void;
  bannerUrl?: string;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose, onApply, onSelectRelated, bannerUrl }) => {
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Fetch related jobs (same department, or just other open jobs)
    const fetchRelated = async () => {
      try {
        const allJobs = await api.getJobs();
        const others = allJobs.filter(j => j.status === 'open' && j.id !== job.id).slice(0, 5);
        setRelatedJobs(others);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRelated();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [job.id]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#f8f9fa', zIndex: 1000, overflowY: 'auto' }}>
      
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: '400px', backgroundImage: `url(${bannerUrl || '/banner-tuyen-dung.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', paddingBottom: '50px' }}>
        
        {/* Close Button top right */}
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '30px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
          <X size={24} />
        </button>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(17,34,51,0.9) 0%, rgba(17,34,51,0.7) 50%, rgba(17,34,51,0.2) 100%)' }}></div>
        
        <div className="container job-detail-banner-content" style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#fff', flex: 1, paddingRight: '20px' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '20px', lineHeight: 1.3 }}>{job.title}</h1>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>
                <MapPin size={16} color="#00B14F" /> {job.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                <Briefcase size={16} color="#00B14F" /> {job.jobType}
              </span>
            </div>
          </div>
          <div>
            <button onClick={onApply} style={{ backgroundColor: '#00B14F', color: '#fff', padding: '15px 40px', fontSize: '1.1rem', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0, 177, 79, 0.4)' }}>
              ỨNG TUYỂN NGAY
            </button>
          </div>
        </div>
      </div>

      <div className="container job-detail-layout" style={{ padding: '40px 20px' }}>
        
        {/* Left Main Content */}
        <div>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#00B14F', background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', marginBottom: '20px', fontWeight: 500, padding: 0 }}>
            &larr; Quay lại
          </button>

          {/* Info Grid */}
          <div className="job-detail-info-grid" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ color: '#00B14F' }}><MapPin size={28} strokeWidth={1.5} /></div>
              <div>
                <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '3px' }}>Địa điểm</div>
                <div style={{ fontWeight: 600, color: '#333' }}>{job.location}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ color: '#00B14F' }}><Briefcase size={28} strokeWidth={1.5} /></div>
              <div>
                <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '3px' }}>Loại hợp đồng</div>
                <div style={{ fontWeight: 600, color: '#333' }}>{job.jobType}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ color: '#00B14F' }}><DollarSign size={28} strokeWidth={1.5} /></div>
              <div>
                <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '3px' }}>Mức lương</div>
                <div style={{ fontWeight: 600, color: '#333' }}>{job.salary}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ color: '#00B14F' }}><Clock size={28} strokeWidth={1.5} /></div>
              <div>
                <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '3px' }}>Kinh nghiệm làm việc</div>
                <div style={{ fontWeight: 600, color: '#333' }}>Không yêu cầu / Theo năng lực</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{ color: '#00B14F' }}><Calendar size={28} strokeWidth={1.5} /></div>
              <div>
                <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '3px' }}>Hạn nộp hồ sơ</div>
                <div style={{ fontWeight: 600, color: '#333' }}>{new Date(job.deadline).toLocaleDateString('vi-VN')}</div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '40px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#333', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Mô tả công việc</h3>
            <div style={{ color: '#444', lineHeight: 1.8, marginBottom: '30px', whiteSpace: 'pre-wrap' }}>{job.description}</div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#333', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Yêu cầu công việc</h3>
            <div style={{ color: '#444', lineHeight: 1.8, marginBottom: '30px', whiteSpace: 'pre-wrap' }}>{job.requirements}</div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#333', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Quyền lợi</h3>
            <div style={{ color: '#444', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{job.benefits}</div>
            
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <button onClick={onApply} style={{ backgroundColor: '#00B14F', color: '#fff', padding: '15px 50px', fontSize: '1.1rem', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0, 177, 79, 0.4)' }}>
                ỨNG TUYỂN NGAY
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '20px' }}>Vị trí tuyển dụng liên quan</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             {relatedJobs.length === 0 ? (
               <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                 <p style={{ color: '#666', fontSize: '0.9rem' }}>Hiện chưa có vị trí liên quan.</p>
               </div>
             ) : (
               relatedJobs.map(rj => (
                 <div key={rj.id} onClick={() => onSelectRelated && onSelectRelated(rj)} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#333', marginBottom: '10px', lineHeight: 1.4 }}>{rj.title}</h4>
                    <div style={{ color: '#00B14F', fontSize: '0.9rem', fontWeight: 500, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <DollarSign size={14} /> {rj.salary}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#888', fontSize: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={12} /> {rj.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={12} /> Hạn nộp: {new Date(rj.deadline).toLocaleDateString('vi-VN')}</span>
                    </div>
                 </div>
               ))
             )}
          </div>
        </div>

      </div>
    </div>
  );
};
