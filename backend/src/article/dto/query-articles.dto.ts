import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleStatus } from '../article.entity';

export class QueryArticlesDto {
  @ApiPropertyOptional({ example: 1, default: 1, description: 'Trang hiện tại' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 9, default: 9, description: 'Số lượng bài trên mỗi trang' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 9;

  @ApiPropertyOptional({ description: 'Từ khóa tìm kiếm (theo tiêu đề hoặc tóm tắt)' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'ID hoặc Slug của danh mục' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: ArticleStatus, description: 'Lọc theo trạng thái bài viết' })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiPropertyOptional({ description: 'Lọc bài viết nổi bật' })
  @IsOptional()
  isFeatured?: boolean;
}
