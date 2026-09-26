import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<Category>;
    findBySlug(slug: string): Promise<Category>;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    update(id: string, updateDto: Partial<CreateCategoryDto>): Promise<Category>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    count(): Promise<number>;
}
