"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./category.entity");
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async findAll() {
        const categories = await this.categoryRepository
            .createQueryBuilder('category')
            .loadRelationCountAndMap('category.articleCount', 'category.articles', 'article', (qb) => qb.where('article.status = :status', { status: 'published' }))
            .orderBy('category.name', 'ASC')
            .getMany();
        return categories;
    }
    async findOne(id) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['articles'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async findBySlug(slug) {
        const category = await this.categoryRepository.findOne({
            where: { slug },
            relations: ['articles'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with slug "${slug}" not found`);
        }
        return category;
    }
    async create(createCategoryDto) {
        const slug = createCategoryDto.slug || slugify(createCategoryDto.name);
        const existing = await this.categoryRepository.findOne({ where: [{ name: createCategoryDto.name }, { slug }] });
        if (existing) {
            throw new common_1.ConflictException('Danh mục với tên hoặc slug này đã tồn tại');
        }
        const category = this.categoryRepository.create({
            ...createCategoryDto,
            slug,
        });
        return this.categoryRepository.save(category);
    }
    async update(id, updateDto) {
        const category = await this.findOne(id);
        if (updateDto.name && !updateDto.slug) {
            updateDto.slug = slugify(updateDto.name);
        }
        Object.assign(category, updateDto);
        return this.categoryRepository.save(category);
    }
    async delete(id) {
        const category = await this.findOne(id);
        await this.categoryRepository.remove(category);
        return { success: true, message: 'Đã xóa danh mục thành công' };
    }
    async count() {
        return this.categoryRepository.count();
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map