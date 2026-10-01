import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PartnerService } from './partner.service';
import { CreatePartnerDto, UpdatePartnerDto } from './partner.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PartnerCategory } from './partner.entity';

@ApiTags('Partners')
@Controller('api/partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách đối tác chiến lược & khách hàng (Public)' })
  findAll(
    @Query('category') category?: PartnerCategory,
    @Query('activeOnly') activeOnly?: string,
  ) {
    return this.partnerService.findAll({
      category,
      activeOnly: activeOnly === 'true',
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết thông tin đối tác' })
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm đối tác chiến lược mới (Admin)' })
  create(@Body() dto: CreatePartnerDto) {
    return this.partnerService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật đối tác chiến lược & thumbnail (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
    return this.partnerService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa đối tác chiến lược (Admin)' })
  remove(@Param('id') id: string) {
    return this.partnerService.remove(id);
  }
}
