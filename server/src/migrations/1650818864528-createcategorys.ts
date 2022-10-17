import { TransactionsCategory } from '../modules/transactionsCategory/entities/transactionsCategory.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createcategorys1650818864528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const transactionsCategoryRepo =
      queryRunner.connection.getRepository<TransactionsCategory>(
        'TransactionsCategory',
      );
    await transactionsCategoryRepo.insert([
      {
        name: 'Carro',
        type: '-',
      },
      {
        name: 'Alimentação',
        type: '-',
      },
      {
        name: 'Mercado',
        type: '-',
      },
      {
        name: 'Contas',
        type: '-',
      },
      {
        name: 'Transferência',
        type: '-',
      },
      {
        name: 'Lazer',
        type: '-',
      },
      {
        name: 'Vestuário',
        type: '-',
      },
      {
        name: 'Saúde',
        type: '-',
      },
      {
        name: 'Educação',
        type: '-',
      },
      {
        name: 'Viagem',
        type: '-',
      },
      // +
      {
        name: 'Salário',
        type: '+',
      },
      {
        name: 'Dividendos',
        type: '+',
      },
      {
        name: 'Transferência',
        type: '+',
      },
      {
        name: 'Presente',
        type: '+',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const transactionsCategoryRepo = queryRunner.connection.getRepository(
      'TransactionsCategory',
    );

    await transactionsCategoryRepo.delete([
      {
        name: 'Carro',
        type: '-',
      },
      {
        name: 'Alimentação',
        type: '-',
      },
      {
        name: 'Contas',
        type: '-',
      },
      {
        name: 'Transferência',
        type: '-',
      },
      {
        name: 'Lazer',
        type: '-',
      },
      {
        name: 'Vestuário',
        type: '-',
      },
      {
        name: 'Saúde',
        type: '-',
      },
      {
        name: 'Educação',
        type: '-',
      },
      {
        name: 'Viagem',
        type: '-',
      },
      // +
      {
        name: 'Salário',
        type: '+',
      },
      {
        name: 'Dividendos',
        type: '+',
      },
      {
        name: 'Transferência',
        type: '+',
      },
      {
        name: 'Presente',
        type: '+',
      },
    ]);
  }
}
