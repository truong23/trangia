import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateContactTable1789792362000 implements MigrationInterface {
  name = 'CreateContactTable1789792362000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('contacts');
    if (!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: 'contacts',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              length: '36',
              isPrimary: true,
            },
            {
              name: 'full_name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'phone',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'service',
              type: 'varchar',
              default: "'ceiling'",
            },
            {
              name: 'project_location',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'message',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'varchar',
              default: "'new'",
            },
            {
              name: 'notes',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updated_at',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );

      await queryRunner.createIndex(
        'contacts',
        new TableIndex({
          name: 'IDX_CONTACTS_STATUS',
          columnNames: ['status'],
        }),
      );

      await queryRunner.createIndex(
        'contacts',
        new TableIndex({
          name: 'IDX_CONTACTS_PHONE',
          columnNames: ['phone'],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('contacts');
    if (hasTable) {
      await queryRunner.dropTable('contacts', true);
    }
  }
}
