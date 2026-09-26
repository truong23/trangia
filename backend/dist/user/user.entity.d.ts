import { Article } from '../article/article.entity';
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    USER = "user"
}
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
    status: 'active' | 'inactive';
    resetPasswordOtp: string;
    resetPasswordExpires: Date;
    articles: Article[];
    createdAt: Date;
    updatedAt: Date;
}
