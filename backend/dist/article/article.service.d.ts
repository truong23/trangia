import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';
import { User } from '../user/user.entity';
export declare class ArticleService {
    private readonly articleRepository;
    constructor(articleRepository: Repository<Article>);
    findAll(query: QueryArticlesDto): Promise<{
        items: Article[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findFeatured(limit?: number): Promise<Article[]>;
    findRecent(limit?: number): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    findBySlug(slug: string): Promise<Article>;
    create(createArticleDto: CreateArticleDto, author?: User): Promise<Article>;
    update(id: string, updateDto: UpdateArticleDto): Promise<Article>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    count(): Promise<number>;
}
