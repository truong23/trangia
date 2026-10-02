import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type PartnerCategory = 'developer' | 'contractor' | 'manufacturer';

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  role: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'developer',
  })
  category: PartnerCategory;

  @Column({ nullable: true })
  badge: string;

  @Column({ name: 'brand_color', nullable: true, default: '#FE7B00' })
  brandColor: string;

  @Column({ nullable: true, type: 'text' })
  thumbnail: string;

  @Column({ nullable: true, type: 'text' })
  logo: string;

  @Column({ nullable: true, type: 'text' })
  projects: string; // Comma-separated or JSON list of project names

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
