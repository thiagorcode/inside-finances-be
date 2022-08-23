import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';

import { UsersModule } from 'src/modules/users/users.module';
import { TransactionsModule } from 'src/modules/transactions/transactions.module';
import { TransactionsCategoryModule } from 'src/modules/transactionsCategory/transactionsCategory.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,

    UsersModule,
    TransactionsModule,
    TransactionsCategoryModule,
  ],
})
export class AppModule {}
