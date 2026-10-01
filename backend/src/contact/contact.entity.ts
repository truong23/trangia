import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: 'ceiling' })
  service: string;

  @Column({ name: 'project_location', nullable: true })
  projectLocation: string;

  @Column('text', { nullable: true })
  message: string;

  @Column({
    type: 'varchar',
    default: 'new',
  })
  status: 'new' | 'contacted' | 'quoted' | 'completed' | 'cancelled';

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
