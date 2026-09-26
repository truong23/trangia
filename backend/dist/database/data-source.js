"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const path = require("path");
const user_entity_1 = require("../user/user.entity");
const category_entity_1 = require("../category/category.entity");
const article_entity_1 = require("../article/article.entity");
const settings_entity_1 = require("../settings/settings.entity");
dotenv.config({ path: path.join(__dirname, '../../.env') });
const dbType = process.env.DB_TYPE || 'sqlite';
let connectionOptions;
if (dbType === 'mysql') {
    connectionOptions = {
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'rootpassword',
        database: process.env.DB_NAME || 'deltagroup_news',
        entities: [user_entity_1.User, category_entity_1.Category, article_entity_1.Article, settings_entity_1.Setting],
        migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
        synchronize: true,
        charset: 'utf8mb4_unicode_ci',
    };
}
else {
    connectionOptions = {
        type: 'sqlite',
        database: path.join(__dirname, '../../deltagroup_news.sqlite'),
        entities: [user_entity_1.User, category_entity_1.Category, article_entity_1.Article, settings_entity_1.Setting],
        migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
        synchronize: true,
    };
}
exports.default = new typeorm_1.DataSource(connectionOptions);
//# sourceMappingURL=data-source.js.map