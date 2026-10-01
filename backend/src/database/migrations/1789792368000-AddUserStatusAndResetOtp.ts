import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserStatusAndResetOtp1789792368000 implements MigrationInterface {
  name = 'AddUserStatusAndResetOtp1789792368000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasStatus = await queryRunner.hasColumn('user', 'status');
    if (!hasStatus) {
      await queryRunner.addColumn(
        'user',
        new TableColumn({
          name: 'status',
          type: 'varchar',
          default: "'active'",
        }),
      );
    }

    const hasOtp = await queryRunner.hasColumn('user', 'resetPasswordOtp');
    if (!hasOtp) {
      await queryRunner.addColumn(
        'user',
        new TableColumn({
          name: 'resetPasswordOtp',
          type: 'varchar',
          isNullable: true,
        }),
      );
    }

    const hasExpires = await queryRunner.hasColumn('user', 'resetPasswordExpires');
    if (!hasExpires) {
      await queryRunner.addColumn(
        'user',
        new TableColumn({
          name: 'resetPasswordExpires',
          type: 'datetime',
          isNullable: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasExpires = await queryRunner.hasColumn('user', 'resetPasswordExpires');
    if (hasExpires) {
      await queryRunner.dropColumn('user', 'resetPasswordExpires');
    }

    const hasOtp = await queryRunner.hasColumn('user', 'resetPasswordOtp');
    if (hasOtp) {
      await queryRunner.dropColumn('user', 'resetPasswordOtp');
    }

    const hasStatus = await queryRunner.hasColumn('user', 'status');
    if (hasStatus) {
      await queryRunner.dropColumn('user', 'status');
    }
  }
}
