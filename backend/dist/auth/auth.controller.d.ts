import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
            role: import("../user/user.entity").UserRole;
        };
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        email: string;
        otp: string;
        message: string;
    }>;
    resetPassword(body: {
        email: string;
        otp: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getProfile(user: User): Promise<User>;
}
