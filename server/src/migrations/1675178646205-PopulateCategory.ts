import { TransactionsCategory } from './../modules/transactionsCategory/entities/transactionsCategory.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { TypeEnum } from './../enums/type.enum';

export class PopulateCategory1675178646205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const transactionsCategoryRepo =
      queryRunner.connection.getRepository<TransactionsCategory>(
        TransactionsCategory,
      );
    await transactionsCategoryRepo.insert([
      {
        name: 'Combustível',
        type: TypeEnum.Expense,
        icon: 'LocalGasStation',
      },
      {
        name: 'Carro',
        type: TypeEnum.Expense,
        icon: 'CarRepair',
      },
      {
        name: 'Outros',
        type: TypeEnum.Expense,
        icon: 'OtherHouses',
      },
      {
        name: 'Transporte',
        type: TypeEnum.Expense,
      },
      {
        name: 'Música',
        type: TypeEnum.Expense,
      },
      {
        name: 'Casa',
        type: TypeEnum.Expense,
      },
      {
        name: 'Alimentação',
        type: TypeEnum.Expense,
        icon: 'Fastfood',
      },
      {
        name: 'Mercado',
        type: TypeEnum.Expense,
        icon: 'LocalGroceryStore',
      },
      {
        name: 'Contas',
        type: TypeEnum.Expense,
        icon: 'Receipt',
      },
      {
        name: 'Transferência',
        type: TypeEnum.Expense,
        icon: 'SwapHorizontalCircle',
      },
      {
        name: 'Lazer',
        type: TypeEnum.Expense,
        icon: 'Attractions',
      },
      {
        name: 'Vestuário',
        type: TypeEnum.Expense,
        icon: 'Checkroom',
      },
      {
        name: 'Saúde',
        type: TypeEnum.Expense,
        icon: 'Medication',
      },
      {
        name: 'Educação',
        type: TypeEnum.Expense,
        icon: 'School',
      },
      {
        name: 'Viagem',
        type: TypeEnum.Expense,
        icon: 'FlightTakeoff',
      },
      // +
      {
        name: 'Salário',
        type: TypeEnum.Recipe,
        icon: 'Payments',
      },
      {
        name: 'Dividendos',
        type: TypeEnum.Recipe,
        icon: 'AccountBalance',
      },
      {
        name: 'Transferência',
        type: TypeEnum.Recipe,
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
        type: TypeEnum.Expense,
        icon: '',
      },
      {
        name: 'Alimentação',
        type: TypeEnum.Expense,
        icon: '',
      },
      {
        name: 'Contas',
        type: TypeEnum.Expense,
        icon: '',
      },
      {
        name: 'Transferência',
        type: TypeEnum.Expense,
        icon: '',
      },
      {
        name: 'Lazer',
        type: TypeEnum.Expense,
        icon: '',
      },
      {
        name: 'Vestuário',
        type: TypeEnum.Expense,
        icon: '',
      },
      {
        name: 'Saúde',
        type: TypeEnum.Expense,
        icon: '',
      },
      {
        name: 'Educação',
        type: TypeEnum.Expense,
        icon: '',
      },
      {
        name: 'Viagem',
        type: TypeEnum.Expense,
        icon: '',
      },
      // +
      {
        name: 'Salário',
        type: TypeEnum.Recipe,
        icon: '',
      },
      {
        name: 'Dividendos',
        type: TypeEnum.Recipe,
        icon: '',
      },
      {
        name: 'Transferência',
        type: TypeEnum.Recipe,
        icon: '',
      },
    ]);
  }
}
