import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local-strategy/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../../modules/users/users.module';
import { ApiConfigService } from '../../shared/services/api-config.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // A secret vem do ApiConfigService, que falha rápido se JWT_KEY não estiver definido
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.jwtConfig.secretKey,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ApiConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
