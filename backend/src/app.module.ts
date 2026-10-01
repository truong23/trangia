import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { SettingsModule } from './settings/settings.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { UploadModule } from './upload/upload.module';
import { ContactModule } from './contact/contact.module';
import { PartnerModule } from './partner/partner.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    ArticleModule,
    SettingsModule,
    JobModule,
    ApplicationModule,
    UploadModule,
    ContactModule,
    PartnerModule,
    ProjectModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
