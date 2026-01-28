import { UserRepositoryInMemory } from '../../repositories/User.repository.memory';
import { CreateUserUseCase } from '../createUser/createUser.case';
import { GetManyUsersUseCase } from './getManyUsers.case';

let createUserUseCase: CreateUserUseCase;
let getManyUsersUseCase: GetManyUsersUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('List all users', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    getManyUsersUseCase = new GetManyUsersUseCase(userRepositoryInMemory);
  });

  it('Should list all users in memory', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Vitor',
      password: '123123'
    });

    const result = await getManyUsersUseCase.execute({ page: '1', perPage: '10' });

    expect(result.users).toEqual([user]);
    expect(result.total).toEqual(1);
  });
});
