import { JobService } from './job.service';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    create(createJobDto: any): Promise<import("./entities/job.entity").JobPosting>;
    findAll(): Promise<import("./entities/job.entity").JobPosting[]>;
    findOne(id: string): Promise<import("./entities/job.entity").JobPosting>;
    update(id: string, updateJobDto: any): Promise<import("./entities/job.entity").JobPosting>;
    remove(id: string): Promise<void>;
}
