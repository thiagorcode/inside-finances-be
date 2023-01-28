import { Transactions } from './../modules/transactions/entities/transactions.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from 'src/modules/users/entities/users.entity';

export class PopulateTableSummaryTransactionsYearMonth1674941460472
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.connection.getRepository<Users>(Users);
    const transactionsRepository =
      queryRunner.connection.getRepository<Transactions>(Transactions);

    const users = await usersRepository.find();

    users.forEach(async (user) => {
      const transactions = await transactionsRepository.find({
        where: { userId: user.id },
      });

      const allUniquesYearMonthTransaction = [
        ...new Set(transactions.map((transaction) => transaction.yearMonth)),
      ];

      allUniquesYearMonthTransaction.forEach(async (yearMonth) => {
        const transactionsInYearMonth = transactions.filter(
          (transactions) => transactions.yearMonth === yearMonth,
        );
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
