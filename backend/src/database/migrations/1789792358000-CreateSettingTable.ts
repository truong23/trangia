import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSettingTable1789792358000 implements MigrationInterface {
  name = 'CreateSettingTable1789792358000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('settings');
    if (!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: 'settings',
          columns: [
            {
              name: 'key',
              type: 'varchar',
              length: '100',
              isPrimary: true,
            },
            {
              name: 'value',
              type: 'text',
              isNullable: false,
            },
            {
              name: 'description',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'updatedAt',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('settings');
    if (hasTable) {
      await queryRunner.dropTable('settings', true);
    }
  }
}
