import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobPosting } from './entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPosting])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
