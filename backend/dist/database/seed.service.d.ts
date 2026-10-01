import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Article } from '../article/article.entity';
import { Partner } from '../partner/partner.entity';
export declare class SeedService implements OnApplicationBootstrap {
    private readonly userRepository;
    private readonly categoryRepository;
    private readonly articleRepository;
    private readonly partnerRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, categoryRepository: Repository<Category>, articleRepository: Repository<Article>, partnerRepository: Repository<Partner>);
    onApplicationBootstrap(): Promise<void>;
    seedData(): Promise<void>;
}
