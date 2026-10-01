import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  client: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'text' })
  scope: string;

  @Column({ type: 'varchar', length: 50, default: 'commercial' })
  category: string;

  @Column({ name: 'category_label', type: 'varchar', length: 100, nullable: true })
  categoryLabel: string;

  @Column({ type: 'varchar', length: 50, default: 'north' })
  region: string;

  @Column({ type: 'varchar', length: 500 })
  image: string;

  @Column({ type: 'text', nullable: true })
  gallery: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  year: string;

  @Column({ name: 'page_in_pdf', type: 'int', nullable: true })
  pageInPdf: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
