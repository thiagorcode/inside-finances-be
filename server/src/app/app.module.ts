import { SummarysModule } from './../summarys/summarys.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from '../modules/auth/auth.module';
import { ApiConfigService } from './../shared/services/api-config.service';

import { UsersModule } from '../modules/users/users.module';
import { TransactionsModule } from '../modules/transactions/transactions.module';
import { TransactionsCategoryModule } from '../modules/transactionsCategory/transactionsCategory.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.ormConfig,
      inject: [ApiConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    AuthModule,
    SummarysModule,
    TransactionsModule,
    TransactionsCategoryModule,
    UsersModule,
  ],
})
export class AppModule {}
