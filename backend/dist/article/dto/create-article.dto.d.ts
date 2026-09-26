import { ArticleStatus } from '../article.entity';
export declare class CreateArticleDto {
    title: string;
    slug?: string;
    summary: string;
    content: string;
    thumbnail?: string;
    status?: ArticleStatus;
    isFeatured?: boolean;
    categoryId?: string;
}
