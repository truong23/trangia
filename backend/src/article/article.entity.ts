import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', default: 'vi' })
  lang: string;

  @Column({ type: 'text', nullable: true })
  titleEn: string;

  @Column({ type: 'text', nullable: true })
  summaryEn: string;

  @Column({ type: 'text', nullable: true })
  contentEn: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({
    type: 'varchar',
    default: ArticleStatus.PUBLISHED,
  })
  status: ArticleStatus;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: false })
  isFeatured: boolean;

  @ManyToOne(() => Category, (category) => category.articles, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => User, (user) => user.articles, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  authorId: string;

  @Column({ default: 'vi' })
  lang: string;

  @Column({ type: 'text', nullable: true })
  titleEn: string;

  @Column({ type: 'text', nullable: true })
  summaryEn: string;

  @Column({ type: 'text', nullable: true })
  contentEn: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
