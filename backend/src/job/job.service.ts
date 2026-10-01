import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosting } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobPosting)
    private readonly jobRepository: Repository<JobPosting>,
  ) {}

  async create(createJobDto: Partial<JobPosting>): Promise<JobPosting> {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }

  async findAll(): Promise<JobPosting[]> {
    return this.jobRepository
      .createQueryBuilder('job')
      .loadRelationCountAndMap('job.applicationCount', 'job.applications')
      .orderBy('job.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<JobPosting> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    job.viewCount += 1;
    await this.jobRepository.save(job);
    return job;
  }

  async update(id: string, updateJobDto: any): Promise<JobPosting> {
    const job = await this.findOne(id);
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
  }
}
