import { ApiConfigService } from './../shared/services/api-config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../modules/auth/auth.module';

import { UsersModule } from '../modules/users/users.module';
import { TransactionsModule } from '../modules/transactions/transactions.module';
import { TransactionsCategoryModule } from '../modules/transactionsCategory/transactionsCategory.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.ormConfig,
      inject: [ApiConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    TransactionsModule,
    TransactionsCategoryModule,
  ],
})
export class AppModule {}
