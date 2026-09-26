import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService, SiteSettings } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Settings')
@Controller('api/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ cấu hình trang web & thông tin công ty' })
  getSettings(): Promise<SiteSettings> {
    return this.settingsService.getSettings();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật cấu hình trang web (Yêu cầu quyền Admin)' })
  updateSettings(@Body() body: Partial<SiteSettings>): Promise<SiteSettings> {
    return this.settingsService.updateSettings(body);
  }
}
