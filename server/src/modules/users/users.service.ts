import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './entities/users.entity';
import { CreateUserDTO } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  find(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  findByLogin(username: string): Promise<CreateUserDTO | undefined> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findByEmailAndUser(email: string, username: string): Promise<boolean> {
    const userExist = await this.usersRepository.findOne({
      where: [
        {
          email,
        },
        { username },
      ],
    });

    return !!userExist;
  }

  async create(data: CreateUserDTO): Promise<Users> {
    const isRegisteredUser = await this.findByEmailAndUser(
      data.email,
      data.username,
    );

    if (isRegisteredUser) {
      throw new BadRequestException('User is already registered');
    }

    const newUser = Object.assign(new Users(), data);

    const user = await this.usersRepository.save(newUser);
    return user;
  }

  update(userId: string, user: Partial<CreateUserDTO>) {
    return this.usersRepository.update(userId, user);
  }

  inactiveUser(userId: string) {
    return this.usersRepository.update(userId, { isActive: false });
  }

  // async forgotPassword(user: Partial<UsersDTO>) {
  //   const newPassword = generateRadomPassword();

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
