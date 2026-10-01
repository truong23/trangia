import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
export declare enum ArticleStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}
export declare class Article {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    thumbnail: string;
    status: ArticleStatus;
    viewCount: number;
    isFeatured: boolean;
    category: Category;
    categoryId: string;
    author: User;
    authorId: string;
    lang: string;
    titleEn: string;
    summaryEn: string;
    contentEn: string;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
