import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Tin hoạt động', description: 'Tên danh mục tin tức' })
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'tin-hoat-dong', required: false, description: 'Slug đường dẫn tĩnh' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: 'Tin tức sự kiện hoạt động của tập đoàn', required: false, description: 'Mô tả danh mục' })
  @IsOptional()
  @IsString()
  description?: string;
}
