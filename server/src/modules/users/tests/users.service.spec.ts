import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { Users } from '../entities/users.entity';
import { UsersService } from '../users.service';

const oneUser = Object.assign(new Users(), {
  id: 'f2a2f-43g21-gge4',
  email: 'test@example.com',
  isActive: true,
  password: 'test@123',
  username: 'test',
  dtCreate: new Date(),
  dtUpdate: new Date(),
});

const mockUserCreate = {
  id: 'f2a2f-43g21-gge4',
  email: 'test@example.com',
  isActive: true,
  password: 'test@123',
  username: 'test',
  isPasswordChange: false,
  dtCreated: new Date(),
  dtUpdated: new Date(),
  loadPassword: function (): void {
    throw new Error('Function not implemented.');
  },
  hashPassword: function (): void {
    throw new Error('Function not implemented.');
  },
  unmaskedPassword: undefined,
};

const mockUserFind = {
  id: 'f2a2f-43g21-gge4',
  email: 'test@example.com',
  isActive: true,
  password: 'test@123',
  username: 'test',
  isPasswordChange: false,
  dtCreated: new Date(),
  dtUpdated: new Date(),
};

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<Users>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(Users);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn().mockReturnValue(oneUser),
            find: jest.fn(),
            save: jest.fn().mockReturnValue(oneUser),
            findOne: jest.fn().mockReturnValue(oneUser),
            update: jest.fn().mockReturnValue({
              affected: 1,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Create Users', () => {
    it('Should create one user', async () => {
      jest.spyOn(usersRepository, 'create').mockReturnValue(mockUserCreate);
      jest.spyOn(usersRepository, 'save');
      service.findByEmailAndUser = jest.fn().mockReturnValue(false);

      const user: CreateUserDTO = {
        email: 'test@example.com',
        isActive: true,
        password: 'test@123',
        username: 'test',
      };

      expect(await service.create(user)).toEqual(oneUser);

      expect(usersRepository.save).toBeCalledTimes(1);

      expect(usersRepository.save).toHaveBeenCalledWith({
        email: 'test@example.com',
        isActive: true,
        password: 'test@123',
        username: 'test',
      });
    });

    it('Must not create user when user or email exists', async () => {
      service.findByEmailAndUser = jest.fn().mockResolvedValue(true);
      const user: CreateUserDTO = {
        email: 'test@example.com',
        isActive: true,
        password: 'test@123',
        username: 'test',
      };
      try {
        await service.create(user);
      } catch (e) {
        console.log(e);
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.getResponse().message).toEqual('User is already registered');
      }
    });
  });
  describe('findByLogin', () => {
    it('should return a user if found', async () => {
      const username = 'username';

      jest.spyOn(usersRepository, 'findOne');

      const result = await service.findByLogin(username);

      expect(result).toEqual(oneUser);
    });

    it('should return undefined if no user is found', async () => {
      const username = 'invalidUsername';

      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findByLogin(username);

      expect(result).toBeUndefined();
    });
  });
  describe('inactiveUser', () => {
    it('should set isActive to false', async () => {
      const userId = '123';

      jest.spyOn(usersRepository, 'update');
      await service.inactiveUser(userId);

      expect(usersRepository.update).toHaveBeenCalledWith(userId, {
        isActive: false,
      });
    });
  });
});
