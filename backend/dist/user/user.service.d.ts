import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    create(userData: Partial<User> & {
        password?: string;
    }): Promise<User>;
    update(id: string, updateData: Partial<User> & {
        password?: string;
    }): Promise<User>;
    delete(id: string): Promise<boolean>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User>;
    changePassword(userId: string, oldPass: string, newPass: string): Promise<boolean>;
    requestResetOtp(emailOrUsername: string): Promise<{
        email: string;
        otp: string;
        message: string;
    }>;
    resetPasswordWithOtp(emailOrUsername: string, otp: string, newPass: string): Promise<boolean>;
    count(): Promise<number>;
}
