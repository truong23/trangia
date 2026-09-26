import { ArticleStatus } from '../article.entity';
export declare class QueryArticlesDto {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: ArticleStatus;
    isFeatured?: boolean;
}
