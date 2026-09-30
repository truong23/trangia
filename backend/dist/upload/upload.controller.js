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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path = require("path");
const upload_service_1 = require("./upload.service");
function generateFileName(req, file, callback) {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path
        .basename(file.originalname, ext)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-')
        .substring(0, 40);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    callback(null, `${baseName}-${uniqueSuffix}${ext}`);
}
function imageFileFilter(req, file, callback) {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/svg+xml',
        'image/avif',
    ];
    if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
        callback(null, true);
    }
    else {
        callback(new common_1.BadRequestException('Chỉ cho phép tải lên hình ảnh định dạng JPG, PNG, WEBP, GIF, SVG, AVIF!'), false);
    }
}
const multerStorage = (0, multer_1.diskStorage)({
    destination: path.join(process.cwd(), 'uploads'),
    filename: generateFileName,
});
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    getBaseUrl(req) {
        const protocol = req.protocol;
        const host = req.get('host');
        return `${protocol}://${host}`;
    }
    uploadSingleFile(file, req) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng chọn file hình ảnh để tải lên');
        }
        const baseUrl = this.getBaseUrl(req);
        return this.uploadService.formatFileResponse(file, baseUrl);
    }
    uploadImage(file, req) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng chọn file hình ảnh để tải lên');
        }
        const baseUrl = this.getBaseUrl(req);
        return this.uploadService.formatFileResponse(file, baseUrl);
    }
    uploadMultipleFiles(files, req) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('Vui lòng chọn ít nhất 1 file hình ảnh');
        }
        const baseUrl = this.getBaseUrl(req);
        return files.map((f) => this.uploadService.formatFileResponse(f, baseUrl));
    }
    listFiles(req) {
        const baseUrl = this.getBaseUrl(req);
        return this.uploadService.listFiles(baseUrl);
    }
    deleteFile(filename) {
        return this.uploadService.deleteFile(filename);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tải lên 1 ảnh (Hỗ trợ TinyMCE và Form tải ảnh)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: multerStorage,
        fileFilter: imageFileFilter,
        limits: { fileSize: 15 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadSingleFile", null);
__decorate([
    (0, common_1.Post)('image'),
    (0, swagger_1.ApiOperation)({ summary: 'Tải lên ảnh với trường "image"' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: multerStorage,
        fileFilter: imageFileFilter,
        limits: { fileSize: 15 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, swagger_1.ApiOperation)({ summary: 'Tải lên nhiều ảnh cùng lúc' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: multerStorage,
        fileFilter: imageFileFilter,
        limits: { fileSize: 15 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadMultipleFiles", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách các file ảnh đã tải lên' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "listFiles", null);
__decorate([
    (0, common_1.Delete)(':filename'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa tệp tin đã tải lên' }),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "deleteFile", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('Uploads'),
    (0, common_1.Controller)('api/upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map