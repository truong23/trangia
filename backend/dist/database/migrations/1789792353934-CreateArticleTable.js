"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticleTable1789792353934 = void 0;
const typeorm_1 = require("typeorm");
class CreateArticleTable1789792353934 {
    constructor() {
        this.name = 'CreateArticleTable1789792353934';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'article',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'summary',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'content',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'thumbnail',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: "'published'",
                },
                {
                    name: 'viewCount',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'isFeatured',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'categoryId',
                    type: 'varchar',
                    length: '36',
                    isNullable: true,
                },
                {
                    name: 'authorId',
                    type: 'varchar',
                    length: '36',
                    isNullable: true,
                },
                {
                    name: 'publishedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('article', new typeorm_1.TableForeignKey({
            columnNames: ['categoryId'],
            referencedTableName: 'category',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
        await queryRunner.createForeignKey('article', new typeorm_1.TableForeignKey({
            columnNames: ['authorId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
        await queryRunner.createIndex('article', new typeorm_1.TableIndex({
            name: 'IDX_ARTICLE_SLUG',
            columnNames: ['slug'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('article', true);
    }
}
exports.CreateArticleTable1789792353934 = CreateArticleTable1789792353934;
//# sourceMappingURL=1789792353934-CreateArticleTable.js.map