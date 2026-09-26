import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<import("./category.entity").Category>;
    create(createCategoryDto: CreateCategoryDto): Promise<import("./category.entity").Category>;
    update(id: string, updateDto: Partial<CreateCategoryDto>): Promise<import("./category.entity").Category>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
