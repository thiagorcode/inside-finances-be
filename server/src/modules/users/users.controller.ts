import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  Res,
  // UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/createUser.dto';
// import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAllUsers(@Res() response) {
    const users = await this.usersService.findAll();

    return response.status(200).send({
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    });
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const isRegisteredUser = await this.usersService.findByEmailAndUser(
      data.email,
      data.username,
    );

    if (isRegisteredUser) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User is already registered',
      };
    }

    const user = await this.usersService.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      user,
    };
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async readUser(@Param('id') id: string) {
    const data = await this.usersService.find(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() data: Partial<CreateUserDTO>,
  ) {
    await this.usersService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  // @Post('forgot-password')
  // async forgotPassword(@Body() { email }: Partial<UsersDTO>) {
  //   const user = await this.usersService.findByEmail(email);

  //   if (!user) {
  //     return {
  //       status: HttpStatus.OK,
  //       message: 'Failed to reset the password, email does not exist!',
  //     };
  //   }

  //   await this.usersService.forgotPassword(user);

  //   return {
  //     status: HttpStatus.OK,
  //     message: 'Password reset email was sent successfully.',
  //   };
  // }

  // @Post('reset-password')
  // async resetPassword(@Body() { email, password }: Partial<UsersDTO>) {
  //   const user = await this.usersService.findByEmail(email);

  //   if (!user) {
  //     return {
  //       status: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Failed to reset the password, email does not exist!',
  //     };
  //   }

  //   await this.usersService.resetPassword(user, password);

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'User created successfully',
  //   };
  // }
}
