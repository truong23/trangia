import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UploadService } from './upload.service';

function generateFileName(req: any, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
  const ext = path.extname(file.originalname).toLowerCase();
  const baseName = path
    .basename(file.originalname, ext)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .substring(0, 40);
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
  callback(null, `${baseName}-${uniqueSuffix}${ext}`);
}

function imageFileFilter(req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) {
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
  } else {
    callback(new BadRequestException('Chỉ cho phép tải lên hình ảnh định dạng JPG, PNG, WEBP, GIF, SVG, AVIF!'), false);
  }
}

const multerStorage = diskStorage({
  destination: path.join(process.cwd(), 'uploads'),
  filename: generateFileName,
});

@ApiTags('Uploads')
@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  private getBaseUrl(req: Request): string {
    const protocol = req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}`;
  }

  @Post()
  @ApiOperation({ summary: 'Tải lên 1 ảnh (Hỗ trợ TinyMCE và Form tải ảnh)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
      limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
    }),
  )
  uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file hình ảnh để tải lên');
    }
    const baseUrl = this.getBaseUrl(req);
    return this.uploadService.formatFileResponse(file, baseUrl);
  }

  @Post('image')
  @ApiOperation({ summary: 'Tải lên ảnh với trường "image"' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
      limits: { fileSize: 15 * 1024 * 1024 },
    }),
  )
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file hình ảnh để tải lên');
    }
    const baseUrl = this.getBaseUrl(req);
    return this.uploadService.formatFileResponse(file, baseUrl);
  }

  @Post('multiple')
  @ApiOperation({ summary: 'Tải lên nhiều ảnh cùng lúc' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: multerStorage,
      fileFilter: imageFileFilter,
      limits: { fileSize: 15 * 1024 * 1024 },
    }),
  )
  uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Vui lòng chọn ít nhất 1 file hình ảnh');
    }
    const baseUrl = this.getBaseUrl(req);
    return files.map((f) => this.uploadService.formatFileResponse(f, baseUrl));
  }

  @Get('list')
  @ApiOperation({ summary: 'Lấy danh sách các file ảnh đã tải lên' })
  listFiles(@Req() req: Request) {
    const baseUrl = this.getBaseUrl(req);
    return this.uploadService.listFiles(baseUrl);
  }

  @Delete(':filename')
  @ApiOperation({ summary: 'Xóa tệp tin đã tải lên' })
  deleteFile(@Param('filename') filename: string) {
    return this.uploadService.deleteFile(filename);
  }
}
