"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryTable1789792350322 = void 0;
const typeorm_1 = require("typeorm");
class CreateCategoryTable1789792350322 {
    constructor() {
        this.name = 'CreateCategoryTable1789792350322';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'category',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
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
        await queryRunner.createIndex('category', new typeorm_1.TableIndex({
            name: 'IDX_CATEGORY_SLUG',
            columnNames: ['slug'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('category', true);
    }
}
exports.CreateCategoryTable1789792350322 = CreateCategoryTable1789792350322;
//# sourceMappingURL=1789792350322-CreateCategoryTable.js.map