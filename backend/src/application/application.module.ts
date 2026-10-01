import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { JobApplication } from './entities/application.entity';
import { JobPosting } from '../job/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication, JobPosting])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
