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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryArticlesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const article_entity_1 = require("../article.entity");
class QueryArticlesDto {
    constructor() {
        this.page = 1;
        this.limit = 9;
    }
}
exports.QueryArticlesDto = QueryArticlesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, default: 1, description: 'Trang hiện tại' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryArticlesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 9, default: 9, description: 'Số lượng bài trên mỗi trang' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], QueryArticlesDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Từ khóa tìm kiếm (theo tiêu đề hoặc tóm tắt)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryArticlesDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID hoặc Slug của danh mục' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryArticlesDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: article_entity_1.ArticleStatus, description: 'Lọc theo trạng thái bài viết' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(article_entity_1.ArticleStatus),
    __metadata("design:type", String)
], QueryArticlesDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Lọc bài viết nổi bật' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], QueryArticlesDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'vi', description: 'Lọc theo ngôn ngữ bài viết (vi, en, all)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryArticlesDto.prototype, "lang", void 0);
//# sourceMappingURL=query-articles.dto.js.map