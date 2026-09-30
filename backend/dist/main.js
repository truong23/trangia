"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const express = require("express");
const path = require("path");
const fs = require("fs");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        logger.log(`📁 Thư mục lưu trữ hình ảnh: ${uploadDir}`);
    }
    app.use('/uploads', express.static(uploadDir));
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Trần Gia Construction & Media Portal API')
        .setDescription('Tài liệu API hệ thống tin tức, truyền thông & quản trị nội dung Trần Gia Construction')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 Backend NestJS is running on: http://localhost:${port}`);
    logger.log(`📚 Swagger API Docs available at: http://localhost:${port}/api/docs`);
    logger.log(`🖼️ Static Uploads available at: http://localhost:${port}/uploads/`);
}
bootstrap();
//# sourceMappingURL=main.js.map