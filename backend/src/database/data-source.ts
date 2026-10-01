import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Article } from '../article/article.entity';
import { Setting } from '../settings/settings.entity';
import { Contact } from '../contact/contact.entity';
import { Partner } from '../partner/partner.entity';
import { Project } from '../project/project.entity';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const dbType = process.env.DB_TYPE || 'sqlite';

let connectionOptions: DataSourceOptions;

if (dbType === 'mysql') {
  connectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'deltagroup_news',
    entities: [User, Category, Article, Setting, Contact, Partner, Project],
    migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
    synchronize: false,
    charset: 'utf8mb4_unicode_ci',
  };
} else {
  connectionOptions = {
    type: 'sqlite',
    database: path.join(__dirname, '../../deltagroup_news.sqlite'),
    entities: [User, Category, Article, Setting, Contact, Partner, Project],
    migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
    synchronize: false,
  };
}

export default new DataSource(connectionOptions);
