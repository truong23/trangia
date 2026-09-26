import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';
import { User } from '../user/user.entity';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    findAll(query: QueryArticlesDto): Promise<{
        items: import("./article.entity").Article[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findFeatured(): Promise<import("./article.entity").Article[]>;
    findRecent(): Promise<import("./article.entity").Article[]>;
    findBySlug(slug: string): Promise<import("./article.entity").Article>;
    findOne(id: string): Promise<import("./article.entity").Article>;
    create(createArticleDto: CreateArticleDto, user: User): Promise<import("./article.entity").Article>;
    update(id: string, updateDto: UpdateArticleDto): Promise<import("./article.entity").Article>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
