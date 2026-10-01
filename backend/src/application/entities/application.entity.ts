import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JobPosting } from '../../job/entities/job.entity';

@Entity('job_applications')
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  candidateName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  cvUrl: string;

  @Column({ type: 'text', nullable: true })
  coverLetter: string;

  @Column({ type: 'text', nullable: true })
  hrNote: string;

  @Column({ type: 'varchar', default: 'pending' })
  status: string;

  @ManyToOne(() => JobPosting, (job) => job.applications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job: JobPosting;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
