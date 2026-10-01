import { JobPosting } from '../../job/entities/job.entity';
export declare class JobApplication {
    id: string;
    candidateName: string;
    phone: string;
    email: string;
    cvUrl: string;
    coverLetter: string;
    hrNote: string;
    status: string;
    job: JobPosting;
    createdAt: Date;
    updatedAt: Date;
}
