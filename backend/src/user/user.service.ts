import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async create(userData: Partial<User> & { password?: string }): Promise<User> {
    const existingUser = await this.findByUsername(userData.username);
    if (existingUser) {
      throw new ConflictException('Tên đăng nhập đã tồn tại trong hệ thống');
    }
    const existingEmail = await this.findByEmail(userData.email);
    if (existingEmail) {
      throw new ConflictException('Email đã được sử dụng cho tài khoản khác');
    }

    const salt = await bcrypt.genSalt(10);
    const rawPassword = userData.password || 'Trangia@2026';
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const user = this.userRepository.create({
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName || userData.username,
      role: userData.role || UserRole.USER,
      status: userData.status || 'active',
      password: hashedPassword,
    });

    const saved = await this.userRepository.save(user);
    const { password, ...result } = saved as any;
    return result;
  }

  async update(id: string, updateData: Partial<User> & { password?: string }): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy tài khoản với ID ${id}`);
    }

    if (updateData.username && updateData.username !== user.username) {
      const existing = await this.findByUsername(updateData.username);
      if (existing && existing.id !== id) {
        throw new ConflictException('Tên đăng nhập mới đã được sử dụng');
      }
      user.username = updateData.username;
    }

    if (updateData.email && updateData.email !== user.email) {
      const existingEmail = await this.findByEmail(updateData.email);
      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictException('Email mới đã được sử dụng');
      }
      user.email = updateData.email;
    }

    if (updateData.fullName) user.fullName = updateData.fullName;
    if (updateData.role) user.role = updateData.role;
    if (updateData.status) user.status = updateData.status;

    if (updateData.password && updateData.password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(updateData.password.trim(), salt);
    }

    const saved = await this.userRepository.save(user);
    const { password, ...result } = saved as any;
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy tài khoản để xóa`);
    }
    if (user.username === 'admin') {
      throw new BadRequestException('Không được phép xóa tài khoản quản trị hệ thống mặc định (admin)');
    }
    await this.userRepository.delete(id);
    return true;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password', 'user.resetPasswordOtp', 'user.resetPasswordExpires'])
      .where('user.username = :username', { username })
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password', 'user.resetPasswordOtp', 'user.resetPasswordExpires'])
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async changePassword(userId: string, oldPass: string, newPass: string): Promise<boolean> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản người dùng');
    }

    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu hiện tại không chính xác');
    }

    if (newPass.length < 6) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 6 ký tự');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPass, salt);
    await this.userRepository.save(user);
    return true;
  }

  // Quên mật khẩu: Tạo mã OTP gửi qua email
  async requestResetOtp(emailOrUsername: string): Promise<{ email: string; otp: string; message: string }> {
    let user = await this.findByEmail(emailOrUsername);
    if (!user) {
      user = await this.findByUsername(emailOrUsername);
    }
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản với email hoặc tên đăng nhập này');
    }

    // Generate 6 digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins validity

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = expires;
    await this.userRepository.save(user);

    this.logger.log(`📧 Đã gửi mã OTP đặt lại mật khẩu tới email ${user.email}: [OTP = ${otp}]`);

    return {
      email: user.email,
      otp, // return OTP for simulation/testing in dev environment
      message: `Mã xác nhận OTP đặt lại mật khẩu đã được gửi đến hộp thư: ${user.email}. Vui lòng kiểm tra hộp thư đến.`,
    };
  }

  // Đặt lại mật khẩu bằng mã OTP
  async resetPasswordWithOtp(emailOrUsername: string, otp: string, newPass: string): Promise<boolean> {
    let user = await this.findByEmail(emailOrUsername);
    if (!user) {
      user = await this.findByUsername(emailOrUsername);
    }
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }

    if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp.trim()) {
      throw new BadRequestException('Mã xác nhận OTP không chính xác');
    }

    if (user.resetPasswordExpires && new Date() > user.resetPasswordExpires) {
      throw new BadRequestException('Mã xác nhận OTP đã hết hạn. Vui lòng yêu cầu mã mới.');
    }

    if (newPass.length < 6) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 6 ký tự');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPass, salt);
    user.resetPasswordOtp = null;
    user.resetPasswordExpires = null;
    await this.userRepository.save(user);

    this.logger.log(`✅ Đã đặt lại mật khẩu thành công cho tài khoản ${user.username} (${user.email})`);
    return true;
  }

  async count(): Promise<number> {
    return this.userRepository.count();
  }
}
