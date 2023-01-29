import { MigrationInterface, QueryRunner } from 'typeorm';
import { Transactions } from './../modules/transactions/entities/transactions.entity';
import { Users } from './../modules/users/entities/users.entity';

export class PopulateTableSummaryTransactionsYearMonth1674941460472
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

          await queryRunner.query(`
          INSERT INTO das.summary_transactions_month
          (value, \`year\`, yearMonth, \`type\`, userId, dtCreated, dtUpdated)
        VALUES(${totalValueTransactionsExpense}, ${year}, '${yearMonth}', '-', '${user.id}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
          `);

          await queryRunner.query(`
          INSERT INTO das.summary_transactions_month
          (value, \`year\`, yearMonth, \`type\`, userId, dtCreated, dtUpdated)
        VALUES(${totalValueTransactionsRecipe}, ${year}, '${yearMonth}', '+', '${user.id}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
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
