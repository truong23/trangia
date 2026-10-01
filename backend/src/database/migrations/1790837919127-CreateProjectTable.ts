import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjectTable1790837919127 implements MigrationInterface {
  name = 'CreateProjectTable1790837919127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('projects');
    if (!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: 'projects',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              length: '100',
              isPrimary: true,
            },
            {
              name: 'title',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'code',
              type: 'varchar',
              length: '100',
              isNullable: true,
            },
            {
              name: 'client',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'location',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'scope',
              type: 'text',
              isNullable: false,
            },
            {
              name: 'category',
              type: 'varchar',
              length: '50',
              default: "'commercial'",
            },
            {
              name: 'category_label',
              type: 'varchar',
              length: '100',
              isNullable: true,
            },
            {
              name: 'region',
              type: 'varchar',
              length: '50',
              default: "'north'",
            },
            {
              name: 'image',
              type: 'varchar',
              length: '500',
              isNullable: false,
            },
            {
              name: 'gallery',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'year',
              type: 'varchar',
              length: '50',
              isNullable: true,
            },
            {
              name: 'page_in_pdf',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'description',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'sort_order',
              type: 'int',
              default: 0,
            },
            {
              name: 'is_active',
              type: 'boolean',
              default: true,
            },
            {
              name: 'is_featured',
              type: 'boolean',
              default: false,
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
              onUpdate: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('projects');
    if (hasTable) {
      await queryRunner.dropTable('projects');
    }
  }
}
