import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../user/user.entity';

@ApiTags('Articles')
@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách bài viết (phân trang, lọc theo danh mục, tìm kiếm)' })
  findAll(@Query() query: QueryArticlesDto) {
    return this.articleService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Lấy danh sách bài viết nổi bật' })
  findFeatured() {
    return this.articleService.findFeatured();
  }

  @Get('recent')
  @ApiOperation({ summary: 'Lấy danh sách tin mới nhất cho sidebar' })
  findRecent() {
    return this.articleService.findRecent();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Lấy chi tiết bài viết theo Slug và tự động tăng lượt xem' })
  findBySlug(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết bài viết theo ID' })
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng bài viết mới (Yêu cầu JWT Token)' })
  create(@Body() createArticleDto: CreateArticleDto, @CurrentUser() user: User) {
    return this.articleService.create(createArticleDto, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật bài viết (Yêu cầu JWT Token)' })
  update(@Param('id') id: string, @Body() updateDto: UpdateArticleDto) {
    return this.articleService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa bài viết (Yêu cầu JWT Token)' })
  delete(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
