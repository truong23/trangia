import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContactService, CreateContactDto, UpdateContactDto } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Contacts')
@Controller('api/contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Khách hàng gửi yêu cầu liên hệ / báo giá trực tuyến' })
  create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy toàn bộ danh sách yêu cầu liên hệ (Admin)' })
  findAll() {
    return this.contactService.findAll();
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thống kê số lượng liên hệ mới' })
  async getStats() {
    const total = await this.contactService.count();
    const countNew = await this.contactService.countNew();
    return { total, countNew };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xem chi tiết một yêu cầu liên hệ' })
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật trạng thái / ghi chú xử lý liên hệ (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa yêu cầu liên hệ (Admin)' })
  delete(@Param('id') id: string) {
    return this.contactService.delete(id);
  }
}
