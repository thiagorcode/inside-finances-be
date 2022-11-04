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
        name: 'Combustível',
        type: '-',
        icon: 'LocalGasStation',
      },
      {
        name: 'Carro',
        type: '-',
        icon: 'CarRepair',
      },
      {
        name: 'Outros',
        type: '-',
        icon: 'OtherHouses',
      },
      {
        name: 'Alimentação',
        type: '-',
        icon: 'Fastfood',
      },
      {
        name: 'Mercado',
        type: '-',
        icon: 'LocalGroceryStore',
      },
      {
        name: 'Contas',
        type: '-',
        icon: 'Receipt',
      },
      {
        name: 'Transferência',
        type: '-',
        icon: 'SwapHorizontalCircle',
      },
      {
        name: 'Lazer',
        type: '-',
        icon: 'Attractions',
      },
      {
        name: 'Vestuário',
        type: '-',
        icon: 'Checkroom',
      },
      {
        name: 'Saúde',
        type: '-',
        icon: 'Medication',
      },
      {
        name: 'Educação',
        type: '-',
        icon: 'School',
      },
      {
        name: 'Viagem',
        type: '-',
        icon: 'FlightTakeoff',
      },
      // +
      {
        name: 'Salário',
        type: '+',
        icon: 'Payments',
      },
      {
        name: 'Dividendos',
        type: '+',
        icon: 'AccountBalance',
      },
      {
        name: 'Transferência',
        type: '+',
        icon: 'VerticalAlignBottom',
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
        icon: '',
      },
      {
        name: 'Alimentação',
        type: '-',
        icon: '',
      },
      {
        name: 'Contas',
        type: '-',
        icon: '',
      },
      {
        name: 'Transferência',
        type: '-',
        icon: '',
      },
      {
        name: 'Lazer',
        type: '-',
        icon: '',
      },
      {
        name: 'Vestuário',
        type: '-',
        icon: '',
      },
      {
        name: 'Saúde',
        type: '-',
        icon: '',
      },
      {
        name: 'Educação',
        type: '-',
        icon: '',
      },
      {
        name: 'Viagem',
        type: '-',
        icon: '',
      },
      // +
      {
        name: 'Salário',
        type: '+',
        icon: '',
      },
      {
        name: 'Dividendos',
        type: '+',
        icon: '',
      },
      {
        name: 'Transferência',
        type: '+',
        icon: '',
      },
    ]);
  }
}
