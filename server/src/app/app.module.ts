import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from 'src/auth/auth.module';

import { UsersModule } from 'src/modules/users/users.module';
import { TransactionsModule } from 'src/modules/transactions/transactions.module';

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
  ],
})
export class AppModule {}
