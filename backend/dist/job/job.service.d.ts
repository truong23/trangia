import { Repository } from 'typeorm';
import { JobPosting } from './entities/job.entity';
export declare class JobService {
    private readonly jobRepository;
    constructor(jobRepository: Repository<JobPosting>);
    create(createJobDto: Partial<JobPosting>): Promise<JobPosting>;
    findAll(): Promise<JobPosting[]>;
    findOne(id: string): Promise<JobPosting>;
    update(id: string, updateJobDto: any): Promise<JobPosting>;
    remove(id: string): Promise<void>;
}
