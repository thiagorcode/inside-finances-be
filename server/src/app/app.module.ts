import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../modules/auth/auth.module';

import { UsersModule } from '../modules/users/users.module';
import { TransactionsModule } from '../modules/transactions/transactions.module';
import { TransactionsCategoryModule } from '../modules/transactionsCategory/transactionsCategory.module';
import { TypeOrmConfigService } from '../infra/database/typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
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
