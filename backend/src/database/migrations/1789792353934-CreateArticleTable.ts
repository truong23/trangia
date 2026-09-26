import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateArticleTable1789792353934 implements MigrationInterface {
  name = 'CreateArticleTable1789792353934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'article',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedTableName: 'category',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'article',
      new TableForeignKey({
        columnNames: ['authorId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // Slug Index
    await queryRunner.createIndex(
      'article',
      new TableIndex({
        name: 'IDX_ARTICLE_SLUG',
        columnNames: ['slug'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('article', true);
  }
}
