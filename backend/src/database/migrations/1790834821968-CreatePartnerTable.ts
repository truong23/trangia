import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePartnerTable1790834821968 implements MigrationInterface {
  name = 'CreatePartnerTable1790834821968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('partners');
    if (!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: 'partners',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              length: '36',
              isPrimary: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'name',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'role',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'category',
              type: 'varchar',
              length: '50',
              default: "'developer'",
            },
            {
              name: 'badge',
              type: 'varchar',
              length: '100',
              isNullable: true,
            },
            {
              name: 'brand_color',
              type: 'varchar',
              length: '50',
              isNullable: true,
              default: "'#FE7B00'",
            },
            {
              name: 'thumbnail',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'logo',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'projects',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'description',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'website',
              type: 'varchar',
              length: '255',
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
    const hasTable = await queryRunner.hasTable('partners');
    if (hasTable) {
      await queryRunner.dropTable('partners');
    }
  }
}
