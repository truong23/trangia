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
exports.CreateArticleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const article_entity_1 = require("../article.entity");
class CreateArticleDto {
}
exports.CreateArticleDto = CreateArticleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DELTA Group: Xây dựng tương lai xanh', description: 'Tiêu đề bài viết' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tiêu đề không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'delta-group-xay-dung-tuong-lai-xanh', required: false, description: 'Slug đường dẫn tĩnh' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Khởi xướng chương trình phát triển bền vững...', description: 'Đoạn tóm tắt bài viết' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tóm tắt bài viết không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<p>Nội dung chi tiết bài viết...</p>', description: 'Nội dung bài viết' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nội dung bài viết không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'vi', required: false, description: 'Ngôn ngữ bài viết (vi, en)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "lang", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tran Gia Construction: Quality and Innovation', required: false, description: 'Tiêu đề tiếng Anh' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "titleEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Summary in English...', required: false, description: 'Tóm tắt tiếng Anh' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "summaryEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<p>English detailed content...</p>', required: false, description: 'Nội dung tiếng Anh' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "contentEn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://images.unsplash.com/...', required: false, description: 'URL ảnh thumbnail' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: article_entity_1.ArticleStatus, default: article_entity_1.ArticleStatus.PUBLISHED, description: 'Trạng thái bài viết' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(article_entity_1.ArticleStatus),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false, description: 'Bài viết nổi bật' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateArticleDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-category', required: false, description: 'ID danh mục' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "categoryId", void 0);
//# sourceMappingURL=create-article.dto.js.map