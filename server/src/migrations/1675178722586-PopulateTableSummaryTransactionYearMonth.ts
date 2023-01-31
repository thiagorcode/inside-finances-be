import { MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from './../modules/users/entities/users.entity';
import { Transactions } from './../modules/transactions/entities/transactions.entity';

export class PopulateTableSummaryTransactionYearMonth1675178722586
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.connection.getRepository<Users>(Users);
    const transactionsRepository =
      queryRunner.connection.getRepository<Transactions>(Transactions);

    const users = await usersRepository.find();

    const summaries = users.map(async (user) => {
      const transactions = await transactionsRepository.find({
        where: { userId: user.id },
      });

      const allUniquesYearMonthTransaction = [
        ...new Set(transactions.map((transaction) => transaction.yearMonth)),
      ];

      const summaryTransactions = allUniquesYearMonthTransaction.map(
        async (yearMonth) => {
          const [year] = yearMonth.split('-');
          const [totalValueTransactionsRecipe, totalValueTransactionsExpense] =
            transactions.reduce(
              (acc, { yearMonth: transactionYearMonth, type, value }) => {
                if (yearMonth === transactionYearMonth) {
                  if (type === '+') {
                    acc[0] += value;
                  } else {
                    acc[1] += value;
                  }
                }

                return acc;
              },
              [0, 0],
            );
          const totalValue =
            totalValueTransactionsRecipe - totalValueTransactionsExpense;

          await queryRunner.query(`
                INSERT INTO das.summary_transactions_month
                (recipeValue, expenseValue, total, \`year\`, yearMonth, userId, dtCreated, dtUpdated)
              VALUES(${totalValueTransactionsRecipe}, ${totalValueTransactionsExpense}, ${totalValue}, ${year}, '${yearMonth}', '${user.id}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
                `);
        },
      );
    });
    await Promise.all(summaries);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
