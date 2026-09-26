import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Cho phép CORS cho frontend kết nối
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global Validation Pipe để kiểm tra dữ liệu DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Tích hợp Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Delta Group News API')
    .setDescription('Tài liệu API hệ thống tin tức & quản trị nội dung DELTA Group')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Backend NestJS is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger API Docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
