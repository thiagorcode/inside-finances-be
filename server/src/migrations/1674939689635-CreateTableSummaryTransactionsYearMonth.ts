import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableSummaryTransactionsYearMonth1674939689635
  implements MigrationInterface
{
  public tableName = 'summary_transactions_month';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        database: 'das',
        uniques: [
          {
            name: 'summary_month',
            columnNames: ['year', 'yearMonth', 'userId'],
          },
        ],
        columns: [
          {
            name: 'id',
            generationStrategy: 'increment',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'recipeValue',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'expenseValue',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'total',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'yearMonth',
            type: 'varchar',
            isNullable: false,
            length: '8',
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
            length: '36',
          },
          {
            name: 'dtCreated',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'dtUpdated',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(
      new Table({
        name: this.tableName,
        database: 'das',
      }),
    );
  }
}
