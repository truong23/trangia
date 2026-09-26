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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/user.entity");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(usernameOrEmail, pass) {
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
    async login(loginDto) {
        const user = await this.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác');
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
    async register(registerDto) {
        const existingUser = await this.usersService.findByUsername(registerDto.username);
        if (existingUser) {
            throw new common_1.ConflictException('Tên đăng nhập đã được sử dụng');
        }
        const existingEmail = await this.usersService.findByEmail(registerDto.email);
        if (existingEmail) {
            throw new common_1.ConflictException('Email đã được đăng ký trong hệ thống');
        }
        const newUser = await this.usersService.create({
            username: registerDto.username,
            email: registerDto.email,
            password: registerDto.password,
            fullName: registerDto.fullName || registerDto.username,
            role: user_entity_1.UserRole.USER,
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
    async forgotPassword(emailOrUsername) {
        return this.usersService.requestResetOtp(emailOrUsername);
    }
    async resetPassword(emailOrUsername, otp, newPass) {
        const success = await this.usersService.resetPasswordWithOtp(emailOrUsername, otp, newPass);
        return {
            success,
            message: 'Mật khẩu của bạn đã được cập nhật thành công! Hãy đăng nhập bằng mật khẩu mới.',
        };
    }
    async getProfile(userId) {
        return this.usersService.findById(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map