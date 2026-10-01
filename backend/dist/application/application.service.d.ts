import { Repository } from 'typeorm';
import { JobApplication } from './entities/application.entity';
import { JobPosting } from '../job/entities/job.entity';
export declare class ApplicationService {
    private readonly applicationRepository;
    private readonly jobRepository;
    constructor(applicationRepository: Repository<JobApplication>, jobRepository: Repository<JobPosting>);
    create(jobId: string, candidateName: string, phone: string, email: string, coverLetter: string, cvUrl: string): Promise<JobApplication>;
    findAll(jobId?: string): Promise<JobApplication[]>;
    updateStatus(id: string, status: string): Promise<JobApplication>;
    updateNote(id: string, hrNote: string): Promise<JobApplication>;
}
