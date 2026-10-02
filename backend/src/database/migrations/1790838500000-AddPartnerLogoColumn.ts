import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPartnerLogoColumn1790838500000 implements MigrationInterface {
  name = 'AddPartnerLogoColumn1790838500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('partners');
    if (hasTable) {
      const hasLogo = await queryRunner.hasColumn('partners', 'logo');
      if (!hasLogo) {
        await queryRunner.addColumn(
          'partners',
          new TableColumn({
            name: 'logo',
            type: 'text',
            isNullable: true,
          }),
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasTable = await queryRunner.hasTable('partners');
    if (hasTable) {
      const hasLogo = await queryRunner.hasColumn('partners', 'logo');
      if (hasLogo) {
        await queryRunner.dropColumn('partners', 'logo');
      }
    }
  }
}
