import { Article } from '../article/article.entity';
export declare class Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    articles: Article[];
    createdAt: Date;
    updatedAt: Date;
}
