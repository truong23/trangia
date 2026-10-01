import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article, ArticleStatus } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';
import { User } from '../user/user.entity';

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
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async findAll(query: QueryArticlesDto) {
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
      queryBuilder.andWhere(
        '(article.lang = :lang OR article.lang = :allLang OR (article.titleEn IS NOT NULL AND :lang = \'en\'))',
        { lang, allLang: 'all' },
      );
    }

    if (search && search.trim() !== '') {
      queryBuilder.andWhere(
        '(LOWER(article.title) LIKE :search OR LOWER(article.summary) LIKE :search OR LOWER(article.titleEn) LIKE :search OR LOWER(article.summaryEn) LIKE :search)',
        { search: `%${search.toLowerCase().trim()}%` },
      );
    }

    if (category) {
      queryBuilder.andWhere(
        '(category.slug = :catParam OR category.id = :catParam)',
        { catParam: category },
      );
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

  async findFeatured(limit: number = 5): Promise<Article[]> {
    return this.articleRepository.find({
      where: { status: ArticleStatus.PUBLISHED, isFeatured: true },
      order: { publishedAt: 'DESC' },
      take: limit,
      relations: ['category', 'author'],
    });
  }

  async findRecent(limit: number = 6): Promise<Article[]> {
    return this.articleRepository.find({
      where: { status: ArticleStatus.PUBLISHED },
      order: { publishedAt: 'DESC' },
      take: limit,
      relations: ['category'],
    });
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['category', 'author'],
    });
    if (!article) {
      throw new NotFoundException(`Bài viết với ID ${id} không tồn tại`);
    }
    return article;
  }

  async findBySlug(slug: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { slug },
      relations: ['category', 'author'],
    });
    if (!article) {
      throw new NotFoundException(`Bài viết "${slug}" không tồn tại`);
    }

    // Tăng lượt xem
    await this.articleRepository.increment({ id: article.id }, 'viewCount', 1);
    article.viewCount += 1;

    return article;
  }

  async create(createArticleDto: CreateArticleDto, author?: User): Promise<Article> {
    let slug = createArticleDto.slug || slugify(createArticleDto.title);
    
    // Đảm bảo slug là duy nhất
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

  async update(id: string, updateDto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);

    if (updateDto.title && !updateDto.slug) {
      updateDto.slug = slugify(updateDto.title);
    }

    Object.assign(article, updateDto);
    return this.articleRepository.save(article);
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
    return { success: true, message: 'Đã xóa bài viết thành công' };
  }

  async count(): Promise<number> {
    return this.articleRepository.count();
  }
}
