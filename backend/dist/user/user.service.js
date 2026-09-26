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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcryptjs");
let UserService = UserService_1 = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async findAll() {
        return this.userRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async create(userData) {
        const existingUser = await this.findByUsername(userData.username);
        if (existingUser) {
            throw new common_1.ConflictException('Tên đăng nhập đã tồn tại trong hệ thống');
        }
        const existingEmail = await this.findByEmail(userData.email);
        if (existingEmail) {
            throw new common_1.ConflictException('Email đã được sử dụng cho tài khoản khác');
        }
        const salt = await bcrypt.genSalt(10);
        const rawPassword = userData.password || 'Trangia@2026';
        const hashedPassword = await bcrypt.hash(rawPassword, salt);
        const user = this.userRepository.create({
            username: userData.username,
            email: userData.email,
            fullName: userData.fullName || userData.username,
            role: userData.role || user_entity_1.UserRole.USER,
            status: userData.status || 'active',
            password: hashedPassword,
        });
        const saved = await this.userRepository.save(user);
        const { password, ...result } = saved;
        return result;
    }
    async update(id, updateData) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy tài khoản với ID ${id}`);
        }
        if (updateData.username && updateData.username !== user.username) {
            const existing = await this.findByUsername(updateData.username);
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException('Tên đăng nhập mới đã được sử dụng');
            }
            user.username = updateData.username;
        }
        if (updateData.email && updateData.email !== user.email) {
            const existingEmail = await this.findByEmail(updateData.email);
            if (existingEmail && existingEmail.id !== id) {
                throw new common_1.ConflictException('Email mới đã được sử dụng');
            }
            user.email = updateData.email;
        }
        if (updateData.fullName)
            user.fullName = updateData.fullName;
        if (updateData.role)
            user.role = updateData.role;
        if (updateData.status)
            user.status = updateData.status;
        if (updateData.password && updateData.password.trim().length >= 6) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(updateData.password.trim(), salt);
        }
        const saved = await this.userRepository.save(user);
        const { password, ...result } = saved;
        return result;
    }
    async delete(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy tài khoản để xóa`);
        }
        if (user.username === 'admin') {
            throw new common_1.BadRequestException('Không được phép xóa tài khoản quản trị hệ thống mặc định (admin)');
        }
        await this.userRepository.delete(id);
        return true;
    }
    async findByUsername(username) {
        return this.userRepository
            .createQueryBuilder('user')
            .addSelect(['user.password', 'user.resetPasswordOtp', 'user.resetPasswordExpires'])
            .where('user.username = :username', { username })
            .getOne();
    }
    async findByEmail(email) {
        return this.userRepository
            .createQueryBuilder('user')
            .addSelect(['user.password', 'user.resetPasswordOtp', 'user.resetPasswordExpires'])
            .where('user.email = :email', { email })
            .getOne();
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async changePassword(userId, oldPass, newPass) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.id = :id', { id: userId })
            .getOne();
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy tài khoản người dùng');
        }
        const isMatch = await bcrypt.compare(oldPass, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Mật khẩu hiện tại không chính xác');
        }
        if (newPass.length < 6) {
            throw new common_1.BadRequestException('Mật khẩu mới phải có ít nhất 6 ký tự');
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPass, salt);
        await this.userRepository.save(user);
        return true;
    }
    async requestResetOtp(emailOrUsername) {
        let user = await this.findByEmail(emailOrUsername);
        if (!user) {
            user = await this.findByUsername(emailOrUsername);
        }
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy tài khoản với email hoặc tên đăng nhập này');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        user.resetPasswordOtp = otp;
        user.resetPasswordExpires = expires;
        await this.userRepository.save(user);
        this.logger.log(`📧 Đã gửi mã OTP đặt lại mật khẩu tới email ${user.email}: [OTP = ${otp}]`);
        return {
            email: user.email,
            otp,
            message: `Mã xác nhận OTP đặt lại mật khẩu đã được gửi đến hộp thư: ${user.email}. Vui lòng kiểm tra hộp thư đến.`,
        };
    }
    async resetPasswordWithOtp(emailOrUsername, otp, newPass) {
        let user = await this.findByEmail(emailOrUsername);
        if (!user) {
            user = await this.findByUsername(emailOrUsername);
        }
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy tài khoản');
        }
        if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp.trim()) {
            throw new common_1.BadRequestException('Mã xác nhận OTP không chính xác');
        }
        if (user.resetPasswordExpires && new Date() > user.resetPasswordExpires) {
            throw new common_1.BadRequestException('Mã xác nhận OTP đã hết hạn. Vui lòng yêu cầu mã mới.');
        }
        if (newPass.length < 6) {
            throw new common_1.BadRequestException('Mật khẩu mới phải có ít nhất 6 ký tự');
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPass, salt);
        user.resetPasswordOtp = null;
        user.resetPasswordExpires = null;
        await this.userRepository.save(user);
        this.logger.log(`✅ Đã đặt lại mật khẩu thành công cho tài khoản ${user.username} (${user.email})`);
        return true;
    }
    async count() {
        return this.userRepository.count();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map