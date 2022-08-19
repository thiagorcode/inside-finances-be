import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './users.entity';
import { CreateUserDTO } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async find(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async findByLoginPassword(
    user: string,
    password: string,
  ): Promise<CreateUserDTO | undefined> {
    return await this.usersRepository.findOne({
      where: {
        user: user,
        pas: password,
      },
    });
  }

  async findByLogin(username: string): Promise<CreateUserDTO | undefined> {
    return await this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findByEmailAndUser(
    email: string,
    username: string,
  ): Promise<CreateUserDTO | null> {
    return await this.usersRepository.findOne({
      where: [
        {
          email,
        },
        { username },
      ],
    });
  }

  async create(data: Partial<CreateUserDTO>): Promise<CreateUserDTO> {
    data.isActive = true;
    data.dtCreate = new Date();

    const newUser = Object.assign(new Users(), data);

    const user = await this.usersRepository.save(newUser);
    return user;
  }

  async update(id: string, user: Partial<CreateUserDTO>) {
    return this.usersRepository.update(id, user).then(() => {
      return this.usersRepository.findOne({ id });
    });
  }

  async delete(id: string) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }

  // async forgotPassword(user: Partial<UsersDTO>) {
  //   const newPassword = gerateRadomPassword();

  //   // user.isPasswordChange = true;
  //   user.password = newPassword;

  //   try {
  //     await this.update(user.id, user);
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   await this.mailService.sendEmailForgotPassword(
  //     user.email,
  //     user.firstName,
  //     newPassword,
  //   );
  // }

  // async resetPassword(user: Partial<UsersDTO>, newPassword: string) {
  //   user.isPasswordChange = false;
  //   user.password = newPassword;

  //   return await this.update(user.id, user);
  // }
}
