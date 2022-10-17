import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

const oneUser = Object.assign(new Users(), {
  id: 'f2a2f-43g21-gge4',
  email: 'test@example.com',
  isActive: true,
  password: 'test@123',
  username: 'test',
  dtCreate: new Date(),
  dtUpdate: new Date(),
});

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
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('usersRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Users', () => {
    it('Should call userRepository.create with correct params', async () => {
      jest.spyOn(usersRepository, 'create').mockReturnValue({
        id: 'f2a2f-43g21-gge4',
        email: 'test@example.com',
        isActive: true,
        password: 'test@123',
        username: 'test',
        dtCreate: new Date(),
        dtUpdate: new Date(),
        loadPassword: function (): void {
          throw new Error('Function not implemented.');
        },
        hashPassword: function (): void {
          throw new Error('Function not implemented.');
        },
        unmaskedPassword: undefined,
      });

      expect(
        service.create({
          email: 'test@example.com',
          isActive: true,
          password: 'test@123',
          username: 'test',
        }),
      ).resolves.toEqual(oneUser);

      expect(usersRepository.save).toBeCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith({
        email: 'test@example.com',
        isActive: true,
        password: 'test@123',
        username: 'test',
      });
    });
  });
});
