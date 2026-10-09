import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableTransactionCategory1675176115326
  implements MigrationInterface
{
  private databaseName = 'gen';
  private tableName = 'transactions_category';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        database: this.databaseName,
        columns: [
          {
            name: 'id',
            generationStrategy: 'uuid',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '80',
          },

          {
            name: 'icon',
            type: 'varchar',
            length: '50',
            isNullable: false,
            default: "''",
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['+', '-'],
            isNullable: false,
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
      true,
    );
    await queryRunner.createForeignKey(
      'gen.transactions',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transactions_category',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transactions_category');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('categoryId') !== -1,
    );
    await queryRunner.dropForeignKey('gen.transactions', foreignKey);
    await queryRunner.dropTable(
      new Table({
        name: this.tableName,
        database: this.databaseName,
      }),
    );
  }
}
