import { Request } from 'express';
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    private getBaseUrl;
    uploadSingleFile(file: Express.Multer.File, req: Request): import("./upload.service").UploadedFileInfo & {
        location: string;
    };
    uploadImage(file: Express.Multer.File, req: Request): import("./upload.service").UploadedFileInfo & {
        location: string;
    };
    uploadMultipleFiles(files: Express.Multer.File[], req: Request): (import("./upload.service").UploadedFileInfo & {
        location: string;
    })[];
    listFiles(req: Request): Promise<import("./upload.service").UploadedFileInfo[]>;
    deleteFile(filename: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
