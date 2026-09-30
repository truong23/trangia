import { ArticleStatus } from '../article.entity';
export declare class CreateArticleDto {
    title: string;
    slug?: string;
    summary: string;
    content: string;
    lang?: string;
    titleEn?: string;
    summaryEn?: string;
    contentEn?: string;
    thumbnail?: string;
    status?: ArticleStatus;
    isFeatured?: boolean;
    categoryId?: string;
}
