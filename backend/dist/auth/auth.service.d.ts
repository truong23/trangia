import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User, UserRole } from '../user/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(usernameOrEmail: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            email: any;
            fullName: any;
            role: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            email: string;
            fullName: string;
            role: UserRole;
        };
    }>;
    forgotPassword(emailOrUsername: string): Promise<{
        email: string;
        otp: string;
        message: string;
    }>;
    resetPassword(emailOrUsername: string, otp: string, newPass: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getProfile(userId: string): Promise<User>;
}
