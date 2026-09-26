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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
const query_articles_dto_1 = require("./dto/query-articles.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const user_entity_1 = require("../user/user.entity");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    findAll(query) {
        return this.articleService.findAll(query);
    }
    findFeatured() {
        return this.articleService.findFeatured();
    }
    findRecent() {
        return this.articleService.findRecent();
    }
    findBySlug(slug) {
        return this.articleService.findBySlug(slug);
    }
    findOne(id) {
        return this.articleService.findOne(id);
    }
    create(createArticleDto, user) {
        return this.articleService.create(createArticleDto, user);
    }
    update(id, updateDto) {
        return this.articleService.update(id, updateDto);
    }
    delete(id) {
        return this.articleService.delete(id);
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách bài viết (phân trang, lọc theo danh mục, tìm kiếm)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_articles_dto_1.QueryArticlesDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách bài viết nổi bật' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách tin mới nhất cho sidebar' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findRecent", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết bài viết theo Slug và tự động tăng lượt xem' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết bài viết theo ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng bài viết mới (Yêu cầu JWT Token)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật bài viết (Yêu cầu JWT Token)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa bài viết (Yêu cầu JWT Token)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "delete", null);
exports.ArticleController = ArticleController = __decorate([
    (0, swagger_1.ApiTags)('Articles'),
    (0, common_1.Controller)('api/articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map