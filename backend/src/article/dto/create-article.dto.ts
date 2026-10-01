import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { ArticleStatus } from '../article.entity';

export class CreateArticleDto {
  @ApiProperty({ example: 'DELTA Group: Xây dựng tương lai xanh', description: 'Tiêu đề bài viết' })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'delta-group-xay-dung-tuong-lai-xanh', required: false, description: 'Slug đường dẫn tĩnh' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: 'Khởi xướng chương trình phát triển bền vững...', description: 'Đoạn tóm tắt bài viết' })
  @IsNotEmpty({ message: 'Tóm tắt bài viết không được để trống' })
  @IsString()
  summary: string;

  @ApiProperty({ example: '<p>Nội dung chi tiết bài viết...</p>', description: 'Nội dung bài viết' })
  @IsNotEmpty({ message: 'Nội dung bài viết không được để trống' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'vi', required: false, description: 'Ngôn ngữ bài viết (vi, en)' })
  @IsOptional()
  @IsString()
  lang?: string;

  @ApiProperty({ example: 'Tran Gia Construction: Quality and Innovation', required: false, description: 'Tiêu đề tiếng Anh' })
  @IsOptional()
  @IsString()
  titleEn?: string;

  @ApiProperty({ example: 'Summary in English...', required: false, description: 'Tóm tắt tiếng Anh' })
  @IsOptional()
  @IsString()
  summaryEn?: string;

  @ApiProperty({ example: '<p>English detailed content...</p>', required: false, description: 'Nội dung tiếng Anh' })
  @IsOptional()
  @IsString()
  contentEn?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/...', required: false, description: 'URL ảnh thumbnail' })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ enum: ArticleStatus, default: ArticleStatus.PUBLISHED, description: 'Trạng thái bài viết' })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiProperty({ example: false, required: false, description: 'Bài viết nổi bật' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiProperty({ example: 'uuid-of-category', required: false, description: 'ID danh mục' })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
