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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./article.entity");
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
let ArticleService = class ArticleService {
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async findAll(query) {
        const { page = 1, limit = 9, search, category, status, isFeatured, lang } = query;
        const skip = (page - 1) * limit;
        const queryBuilder = this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.category', 'category')
            .leftJoinAndSelect('article.author', 'author')
            .orderBy('article.publishedAt', 'DESC')
            .addOrderBy('article.createdAt', 'DESC');
        if (status) {
            queryBuilder.andWhere('article.status = :status', { status });
        }
        if (lang && lang !== 'all') {
            queryBuilder.andWhere('(article.lang = :lang OR article.lang = :allLang OR (article.titleEn IS NOT NULL AND :lang = \'en\'))', { lang, allLang: 'all' });
        }
        if (search && search.trim() !== '') {
            queryBuilder.andWhere('(LOWER(article.title) LIKE :search OR LOWER(article.summary) LIKE :search OR LOWER(article.titleEn) LIKE :search OR LOWER(article.summaryEn) LIKE :search)', { search: `%${search.toLowerCase().trim()}%` });
        }
        if (category) {
            queryBuilder.andWhere('(category.slug = :catParam OR category.id = :catParam)', { catParam: category });
        }
        if (isFeatured !== undefined) {
            queryBuilder.andWhere('article.isFeatured = :isFeatured', { isFeatured });
        }
        const [items, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        return {
            items,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findFeatured(limit = 5) {
        return this.articleRepository.find({
            where: { status: article_entity_1.ArticleStatus.PUBLISHED, isFeatured: true },
            order: { publishedAt: 'DESC' },
            take: limit,
            relations: ['category', 'author'],
        });
    }
    async findRecent(limit = 6) {
        return this.articleRepository.find({
            where: { status: article_entity_1.ArticleStatus.PUBLISHED },
            order: { publishedAt: 'DESC' },
            take: limit,
            relations: ['category'],
        });
    }
    async findOne(id) {
        const article = await this.articleRepository.findOne({
            where: { id },
            relations: ['category', 'author'],
        });
        if (!article) {
            throw new common_1.NotFoundException(`Bài viết với ID ${id} không tồn tại`);
        }
        return article;
    }
    async findBySlug(slug) {
        const article = await this.articleRepository.findOne({
            where: { slug },
            relations: ['category', 'author'],
        });
        if (!article) {
            throw new common_1.NotFoundException(`Bài viết "${slug}" không tồn tại`);
        }
        await this.articleRepository.increment({ id: article.id }, 'viewCount', 1);
        article.viewCount += 1;
        return article;
    }
    async create(createArticleDto, author) {
        let slug = createArticleDto.slug || slugify(createArticleDto.title);
        const count = await this.articleRepository.count({ where: { slug } });
        if (count > 0) {
            slug = `${slug}-${Date.now()}`;
        }
        const article = this.articleRepository.create({
            ...createArticleDto,
            slug,
            author: author || undefined,
            authorId: author ? author.id : undefined,
        });
        return this.articleRepository.save(article);
    }
    async update(id, updateDto) {
        const article = await this.findOne(id);
        if (updateDto.title && !updateDto.slug) {
            updateDto.slug = slugify(updateDto.title);
        }
        Object.assign(article, updateDto);
        return this.articleRepository.save(article);
    }
    async delete(id) {
        const article = await this.findOne(id);
        await this.articleRepository.remove(article);
        return { success: true, message: 'Đã xóa bài viết thành công' };
    }
    async count() {
        return this.articleRepository.count();
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleService);
//# sourceMappingURL=article.service.js.map