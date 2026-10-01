"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const path = require("path");
const user_entity_1 = require("../user/user.entity");
const category_entity_1 = require("../category/category.entity");
const article_entity_1 = require("../article/article.entity");
const settings_entity_1 = require("../settings/settings.entity");
const contact_entity_1 = require("../contact/contact.entity");
const partner_entity_1 = require("../partner/partner.entity");
const project_entity_1 = require("../project/project.entity");
const job_entity_1 = require("../job/entities/job.entity");
const application_entity_1 = require("../application/entities/application.entity");
const seed_service_1 = require("./seed.service");
const allEntities = [
    user_entity_1.User,
    category_entity_1.Category,
    article_entity_1.Article,
    settings_entity_1.Setting,
    contact_entity_1.Contact,
    partner_entity_1.Partner,
    project_entity_1.Project,
    job_entity_1.JobPosting,
    application_entity_1.JobApplication,
];
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const dbType = configService.get('DB_TYPE', 'sqlite');
                    const entities = allEntities;
                    const migrations = [path.join(__dirname, 'migrations/*{.ts,.js}')];
                    if (dbType === 'mysql') {
                        return {
                            type: 'mysql',
                            host: configService.get('DB_HOST', 'localhost'),
                            port: Number(configService.get('DB_PORT', 3306)),
                            username: configService.get('DB_USERNAME', 'root'),
                            password: configService.get('DB_PASSWORD', 'rootpassword'),
                            database: configService.get('DB_NAME', 'deltagroup_news'),
                            entities,
                            migrations,
                            migrationsRun: true,
                            synchronize: false,
                            charset: 'utf8mb4_unicode_ci',
                        };
                    }
                    return {
                        type: 'sqlite',
                        database: path.join(__dirname, '../../deltagroup_news.sqlite'),
                        entities,
                        migrations,
                        migrationsRun: true,
                        synchronize: false,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature(allEntities),
        ],
        providers: [seed_service_1.SeedService],
        exports: [typeorm_1.TypeOrmModule, seed_service_1.SeedService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map