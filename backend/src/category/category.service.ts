import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

function slugify(text: string): string {
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

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<any[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .loadRelationCountAndMap('category.articleCount', 'category.articles', 'article', (qb) =>
        qb.where('article.status = :status', { status: 'published' }),
      )
      .orderBy('category.name', 'ASC')
      .getMany();
    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['articles'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async findBySlug(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ['articles'],
    });
    if (!category) {
      throw new NotFoundException(`Category with slug "${slug}" not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const slug = createCategoryDto.slug || slugify(createCategoryDto.name);
    const existing = await this.categoryRepository.findOne({ where: [{ name: createCategoryDto.name }, { slug }] });
    if (existing) {
      throw new ConflictException('Danh mục với tên hoặc slug này đã tồn tại');
    }

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      slug,
    });
    return this.categoryRepository.save(category);
  }

  async update(id: string, updateDto: Partial<CreateCategoryDto>): Promise<Category> {
    const category = await this.findOne(id);
    if (updateDto.name && !updateDto.slug) {
      updateDto.slug = slugify(updateDto.name);
    }
    Object.assign(category, updateDto);
    return this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return { success: true, message: 'Đã xóa danh mục thành công' };
  }

  async count(): Promise<number> {
    return this.categoryRepository.count();
  }
}
