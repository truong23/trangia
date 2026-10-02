import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './entities/application.entity';
import { JobPosting } from '../job/entities/job.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly applicationRepository: Repository<JobApplication>,
    @InjectRepository(JobPosting)
    private readonly jobRepository: Repository<JobPosting>,
  ) {}

  async create(jobId: string, candidateName: string, phone: string, email: string, coverLetter: string, cvUrl: string): Promise<JobApplication> {
    const job = await this.jobRepository.findOne({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    const application = this.applicationRepository.create({
      candidateName,
      phone,
      email,
      coverLetter,
      cvUrl,
      job,
    });

    return this.applicationRepository.save(application);
  }

  async findAll(jobId?: string): Promise<JobApplication[]> {
    const query = this.applicationRepository.createQueryBuilder('application')
      .leftJoinAndSelect('application.job', 'job')
      .orderBy('application.createdAt', 'DESC');

    if (jobId) {
      query.where('job.id = :jobId', { jobId });
    }

    return query.getMany();
  }

  async updateStatus(id: string, status: string): Promise<JobApplication> {
    const application = await this.applicationRepository.findOne({ where: { id } });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    application.status = status;
    return this.applicationRepository.save(application);
  }

  async updateNote(id: string, hrNote: string): Promise<JobApplication> {
    const application = await this.applicationRepository.findOne({ where: { id } });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    application.hrNote = hrNote;
    return this.applicationRepository.save(application);
  }

  async remove(id: string): Promise<{ success: boolean; message: string }> {
    const application = await this.applicationRepository.findOne({ where: { id } });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    await this.applicationRepository.remove(application);
    return { success: true, message: `Deleted application ${id}` };
  }
}
