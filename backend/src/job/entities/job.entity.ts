import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { JobApplication } from '../../application/entities/application.entity';

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  department: string;

  @Column()
  location: string;

  @Column()
  salary: string;

  @Column()
  jobType: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({ type: 'text', nullable: true })
  benefits: string;

  @Column({ type: 'varchar', default: 'open' })
  status: string;

  @Column({ default: 0 })
  viewCount: number;

  @OneToMany(() => JobApplication, (app) => app.job)
  applications: JobApplication[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
