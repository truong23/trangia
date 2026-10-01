import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddArticleBilingualFields1789792374000 implements MigrationInterface {
  name = 'AddArticleBilingualFields1789792374000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasLang = await queryRunner.hasColumn('article', 'lang');
    if (!hasLang) {
      await queryRunner.addColumn(
        'article',
        new TableColumn({
          name: 'lang',
          type: 'varchar',
          default: "'vi'",
        }),
      );
    }

    const hasTitleEn = await queryRunner.hasColumn('article', 'titleEn');
    if (!hasTitleEn) {
      await queryRunner.addColumn(
        'article',
        new TableColumn({
          name: 'titleEn',
          type: 'text',
          isNullable: true,
        }),
      );
    }

    const hasSummaryEn = await queryRunner.hasColumn('article', 'summaryEn');
    if (!hasSummaryEn) {
      await queryRunner.addColumn(
        'article',
        new TableColumn({
          name: 'summaryEn',
          type: 'text',
          isNullable: true,
        }),
      );
    }

    const hasContentEn = await queryRunner.hasColumn('article', 'contentEn');
    if (!hasContentEn) {
      await queryRunner.addColumn(
        'article',
        new TableColumn({
          name: 'contentEn',
          type: 'text',
          isNullable: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasContentEn = await queryRunner.hasColumn('article', 'contentEn');
    if (hasContentEn) {
      await queryRunner.dropColumn('article', 'contentEn');
    }

    const hasSummaryEn = await queryRunner.hasColumn('article', 'summaryEn');
    if (hasSummaryEn) {
      await queryRunner.dropColumn('article', 'summaryEn');
    }

    const hasTitleEn = await queryRunner.hasColumn('article', 'titleEn');
    if (hasTitleEn) {
      await queryRunner.dropColumn('article', 'titleEn');
    }

    const hasLang = await queryRunner.hasColumn('article', 'lang');
    if (hasLang) {
      await queryRunner.dropColumn('article', 'lang');
    }
  }
}
