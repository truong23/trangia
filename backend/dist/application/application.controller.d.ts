import { ApplicationService } from './application.service';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    create(jobId: string, candidateName: string, phone: string, email: string, coverLetter: string, file: Express.Multer.File): Promise<import("./entities/application.entity").JobApplication>;
    findAll(jobId?: string): Promise<import("./entities/application.entity").JobApplication[]>;
    updateStatus(id: string, status: string): Promise<import("./entities/application.entity").JobApplication>;
    updateNote(id: string, hrNote: string): Promise<import("./entities/application.entity").JobApplication>;
}
