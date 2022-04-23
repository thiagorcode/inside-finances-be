import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UsersDTO } from 'src/modules/users/users.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<UsersDTO | null> {
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      return null;
    }

    if (!user.isActive) {
      return null;
    }

    const password = (<any>user).unmaskedPassword;

    // TODO: CRIPTOGRAFAR igual GETEDITS - Remover o pass e colocar o password
    const chkPass = `${user.username}_${pass}`;
    const hashPass = crypto.createHash('sha256').update(chkPass).digest('hex');

    // TODO: REmover password e colocar pass
    if (hashPass !== password) {
      return null;
    }

    return user;
  }

  async login(user: UsersDTO) {
    const payload = {
      email: user.email,
      username: user.username,
      id: user.id,
      active: user.isActive,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
