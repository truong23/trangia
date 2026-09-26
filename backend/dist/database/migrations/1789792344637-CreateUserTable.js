"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1789792344637 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1789792344637 {
    constructor() {
        this.name = 'CreateUserTable1789792344637';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'fullName',
                    type: 'varchar',
                },
                {
                    name: 'role',
                    type: 'varchar',
                    default: "'user'",
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user', true);
    }
}
exports.CreateUserTable1789792344637 = CreateUserTable1789792344637;
//# sourceMappingURL=1789792344637-CreateUserTable.js.map