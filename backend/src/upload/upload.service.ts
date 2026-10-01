import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface UploadedFileInfo {
  url: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  uploadedAt: Date;
}

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    this.ensureUploadDirExists();
  }

  private ensureUploadDirExists() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
      this.logger.log(`Created upload directory: ${this.uploadDir}`);
    }
  }

  formatFileResponse(file: Express.Multer.File, baseUrl?: string): UploadedFileInfo & { location: string } {
    if (!file) {
      throw new BadRequestException('Không tìm thấy tệp tin được tải lên');
    }

    const fileUrl = `/uploads/${file.filename}`;
    const fullUrl = baseUrl ? `${baseUrl.replace(/\/$/, '')}${fileUrl}` : fileUrl;

    return {
      url: fullUrl,
      location: fullUrl, // TinyMCE standard upload response expects "location"
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
    };
  }

  async listFiles(baseUrl?: string): Promise<UploadedFileInfo[]> {
    this.ensureUploadDirExists();
    const files = await fs.promises.readdir(this.uploadDir);

    const fileDetails: UploadedFileInfo[] = [];

    for (const filename of files) {
      try {
        const filePath = path.join(this.uploadDir, filename);
        const stats = await fs.promises.stat(filePath);
        if (stats.isFile()) {
          const ext = path.extname(filename).toLowerCase();
          const mimeMap: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
          };

          const fileUrl = `/uploads/${filename}`;
          const fullUrl = baseUrl ? `${baseUrl.replace(/\/$/, '')}${fileUrl}` : fileUrl;

          fileDetails.push({
            url: fullUrl,
            filename,
            originalname: filename,
            mimetype: mimeMap[ext] || 'application/octet-stream',
            size: stats.size,
            uploadedAt: stats.mtime,
          });
        }
      } catch (e) {
        // Skip unreadable files
      }
    }

    // Sort newest first
    return fileDetails.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  async deleteFile(filename: string): Promise<{ success: boolean; message: string }> {
    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(this.uploadDir, safeFilename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Tệp tin "${safeFilename}" không tồn tại`);
    }

    await fs.promises.unlink(filePath);
    return { success: true, message: `Đã xóa tệp tin "${safeFilename}" thành công` };
  }
}
