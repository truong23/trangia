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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Projects')
@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách dự án thi công tiêu biểu (Public)' })
  findAll(
    @Query('category') category?: string,
    @Query('region') region?: string,
    @Query('search') search?: string,
  ) {
    return this.projectService.findAll({
      category,
      region,
      search,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết dự án theo ID/slug' })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm dự án thi công mới (Admin)' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật thông tin dự án (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa dự án (Admin)' })
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
