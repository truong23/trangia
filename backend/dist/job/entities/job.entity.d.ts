import { JobApplication } from '../../application/entities/application.entity';
export declare class JobPosting {
    id: string;
    title: string;
    department: string;
    location: string;
    salary: string;
    jobType: string;
    deadline: Date;
    description: string;
    requirements: string;
    benefits: string;
    status: string;
    viewCount: number;
    applications: JobApplication[];
    createdAt: Date;
    updatedAt: Date;
}
