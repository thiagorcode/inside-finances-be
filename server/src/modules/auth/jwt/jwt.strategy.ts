import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from '../../../shared/services/api-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly apiConfigService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiConfigService.jwtConfig.secretKey,
    });
  }

  async validate(payload: any) {
    return {
      email: payload.email,
      name: payload.name,
      id: payload.id,
      active: payload.active,
    };
  }
}
