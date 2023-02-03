import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnInstallment1675378911528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'gen.transactions',
      new TableColumn({
        name: 'installment',
        type: 'int',
        default: 0,
      }),
    );

    await queryRunner.addColumn(
      'gen.transactions',
      new TableColumn({
        name: 'finalInstallment',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('gen.transactions', 'installment');
    await queryRunner.dropColumn('gen.transactions', 'finalInstallment');
  }
}
