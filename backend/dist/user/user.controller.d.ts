import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    create(userData: any): Promise<User>;
    changePassword(user: User, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    update(id: string, updateData: any): Promise<User>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
