import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User, UserRole } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
    let user = await this.usersService.findByUsername(usernameOrEmail);
    if (!user) {
      user = await this.usersService.findByEmail(usernameOrEmail);
    }
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByUsername(registerDto.username);
    if (existingUser) {
      throw new ConflictException('Tên đăng nhập đã được sử dụng');
    }
    const existingEmail = await this.usersService.findByEmail(registerDto.email);
    if (existingEmail) {
      throw new ConflictException('Email đã được đăng ký trong hệ thống');
    }

    const newUser = await this.usersService.create({
      username: registerDto.username,
      email: registerDto.email,
      password: registerDto.password,
      fullName: registerDto.fullName || registerDto.username,
      role: UserRole.USER,
    });

    const payload = { sub: newUser.id, username: newUser.username, role: newUser.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      },
    };
  }

  async forgotPassword(emailOrUsername: string) {
    return this.usersService.requestResetOtp(emailOrUsername);
  }

  async resetPassword(emailOrUsername: string, otp: string, newPass: string) {
    const success = await this.usersService.resetPasswordWithOtp(emailOrUsername, otp, newPass);
    return {
      success,
      message: 'Mật khẩu của bạn đã được cập nhật thành công! Hãy đăng nhập bằng mật khẩu mới.',
    };
  }

  async getProfile(userId: string) {
    return this.usersService.findById(userId);
  }
}
