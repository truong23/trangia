"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let UploadService = UploadService_1 = class UploadService {
    constructor() {
        this.logger = new common_1.Logger(UploadService_1.name);
        this.uploadDir = path.join(process.cwd(), 'uploads');
        this.ensureUploadDirExists();
    }
    ensureUploadDirExists() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
            this.logger.log(`Created upload directory: ${this.uploadDir}`);
        }
    }
    formatFileResponse(file, baseUrl) {
        if (!file) {
            throw new common_1.BadRequestException('Không tìm thấy tệp tin được tải lên');
        }
        const fileUrl = `/uploads/${file.filename}`;
        const fullUrl = baseUrl ? `${baseUrl.replace(/\/$/, '')}${fileUrl}` : fileUrl;
        return {
            url: fullUrl,
            location: fullUrl,
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            uploadedAt: new Date(),
        };
    }
    async listFiles(baseUrl) {
        this.ensureUploadDirExists();
        const files = await fs.promises.readdir(this.uploadDir);
        const fileDetails = [];
        for (const filename of files) {
            try {
                const filePath = path.join(this.uploadDir, filename);
                const stats = await fs.promises.stat(filePath);
                if (stats.isFile()) {
                    const ext = path.extname(filename).toLowerCase();
                    const mimeMap = {
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
            }
            catch (e) {
            }
        }
        return fileDetails.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
    }
    async deleteFile(filename) {
        const safeFilename = path.basename(filename);
        const filePath = path.join(this.uploadDir, safeFilename);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException(`Tệp tin "${safeFilename}" không tồn tại`);
        }
        await fs.promises.unlink(filePath);
        return { success: true, message: `Đã xóa tệp tin "${safeFilename}" thành công` };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = UploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map