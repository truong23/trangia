import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Article } from '../article/article.entity';
import { Setting } from '../settings/settings.entity';
import { JobPosting } from '../job/entities/job.entity';
import { JobApplication } from '../application/entities/application.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>('DB_TYPE', 'sqlite');
        const entities = [User, Category, Article, Setting, JobPosting, JobApplication];
        const migrations = [path.join(__dirname, 'migrations/*{.ts,.js}')];

        if (dbType === 'mysql') {
          return {
            type: 'mysql',
            host: configService.get<string>('DB_HOST', 'localhost'),
            port: Number(configService.get<number>('DB_PORT', 3306)),
            username: configService.get<string>('DB_USERNAME', 'root'),
            password: configService.get<string>('DB_PASSWORD', 'rootpassword'),
            database: configService.get<string>('DB_NAME', 'deltagroup_news'),
            entities,
            migrations,
            migrationsRun: true,
            synchronize: true,
            charset: 'utf8mb4_unicode_ci',
          };
        }

        // Mặc định hỗ trợ SQLite cục bộ để hệ thống chạy tức thì không cần chờ Docker
        return {
          type: 'sqlite',
          database: path.join(__dirname, '../../deltagroup_news.sqlite'),
          entities,
          migrations,
          migrationsRun: true,
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([User, Category, Article, Setting, JobPosting, JobApplication]),
  ],
  providers: [SeedService],
  exports: [TypeOrmModule, SeedService],
})
export class DatabaseModule {}
