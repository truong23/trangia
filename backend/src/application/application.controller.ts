import { Controller, Get, Post, Body, Param, Put, UseGuards, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';
import { ApplicationService } from './application.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.entity';

@Controller('api/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cvFile', {
    storage: diskStorage({
      destination: './uploads/cv',
      filename: (req, file, cb) => {
        const randomName = randomBytes(16).toString('hex');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  create(
    @Body('jobId') jobId: string,
    @Body('candidateName') candidateName: string,
    @Body('phone') phone: string,
    @Body('email') email: string,
    @Body('coverLetter') coverLetter: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('CV file is required');
    }
    const cvUrl = `/uploads/cv/${file.filename}`;
    return this.applicationService.create(jobId, candidateName, phone, email, coverLetter, cvUrl);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll(@Query('jobId') jobId?: string) {
    return this.applicationService.findAll(jobId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.applicationService.updateStatus(id, status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id/note')
  updateNote(@Param('id') id: string, @Body('hrNote') hrNote: string) {
    return this.applicationService.updateNote(id, hrNote);
  }
}
