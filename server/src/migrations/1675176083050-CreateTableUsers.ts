import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1675176083050 implements MigrationInterface {
  private databaseName = 'gen';
  private tableName = 'users';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        database: this.databaseName,
        uniques: [
          {
            name: 'user',
            columnNames: ['email', 'username'],
          },
        ],
        columns: [
          {
            name: 'id',
            generationStrategy: 'uuid',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '100',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            length: '80',
          },
          {
            name: 'isActive',
            type: 'bool',
            isNullable: false,
            default: true,
          },
          {
            name: 'isPasswordChange',
            type: 'bool',
            isNullable: false,
            default: true,
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
        database: this.databaseName,
      }),
    );
  }
}
