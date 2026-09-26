import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('User Management')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách tất cả tài khoản người dùng / Admin' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm tài khoản quản trị viên / nhân viên mới' })
  async create(@Body() userData: any): Promise<User> {
    return this.userService.create(userData);
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đổi mật khẩu tài khoản đang đăng nhập' })
  async changePassword(
    @CurrentUser() user: User,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    const success = await this.userService.changePassword(
      user.id,
      body.oldPassword,
      body.newPassword,
    );
    return { success, message: 'Đổi mật khẩu thành công!' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật thông tin / vai trò / mật khẩu tài khoản' })
  async update(@Param('id') id: string, @Body() updateData: any): Promise<User> {
    return this.userService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa tài khoản người dùng' })
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return { success: true, message: 'Đã xóa tài khoản thành công' };
  }
}
