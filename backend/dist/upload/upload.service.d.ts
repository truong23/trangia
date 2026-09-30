export interface UploadedFileInfo {
    url: string;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    uploadedAt: Date;
}
export declare class UploadService {
    private readonly logger;
    private readonly uploadDir;
    constructor();
    private ensureUploadDirExists;
    formatFileResponse(file: Express.Multer.File, baseUrl?: string): UploadedFileInfo & {
        location: string;
    };
    listFiles(baseUrl?: string): Promise<UploadedFileInfo[]>;
    deleteFile(filename: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
