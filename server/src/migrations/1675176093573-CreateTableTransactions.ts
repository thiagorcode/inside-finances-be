import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTransactions1675176093573
  implements MigrationInterface
{
  private databaseName = 'gen';
  private tableName = 'transactions';
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
            name: 'description',
            type: 'varchar',
            isNullable: false,
            length: '100',
            default: "''",
          },
          {
            name: 'value',
            type: 'float',
            isNullable: false,
            precision: 2,
          },
          {
            name: 'isPaid',
            type: 'bool',
            isNullable: false,
            default: true,
          },
          {
            name: 'year',
            type: 'int',
            isNullable: false,
            default: 0,
          },

          {
            name: 'yearMonth',
            type: 'varchar',
            isNullable: false,
            length: '8',
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['+', '-'],
            isNullable: false,
          },
          {
            name: 'specification',
            type: 'varchar',
            default: "''",
            isNullable: true,
          },
          {
            name: 'bank',
            type: 'varchar',
            default: "''",
            isNullable: true,
          },
          {
            name: 'originCreate',
            type: 'varchar',
            default: "'web'",
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'categoryId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dtCreated',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'dtUpdated',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'TransactionsUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('gen.transactions', 'TransactionsUser');
    await queryRunner.dropTable(
      new Table({
        name: this.tableName,
        database: this.databaseName,
      }),
    );
  }
}
