import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class creteTableSummaryTransactions1674834605256
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'summary_transactions',
        database: 'das',
        columns: [
          {
            name: 'id',
            generationStrategy: 'uuid',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'value',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'int',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'yearMonth',
            type: 'varchar',
            isNullable: false,
            length: '10',
            isUnique: true,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
            length: '50',
            isUnique: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
            length: '36',
          },
          {
            name: 'categoryId',
            type: 'varchar',
            isNullable: false,
            length: '36',
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(
      new Table({
        name: 'summary_transactions',
        database: 'das',
      }),
    );
  }
}
