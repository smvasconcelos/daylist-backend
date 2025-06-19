import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetManyUsersUseCase } from 'src/modules/user/useCases/getManyUsers/getManyUsers.case';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUser/createUser.case';
import { CreateUserBody } from './dtos/createUserBody.dto';
import { UserViewModel } from './viewModel/userView.model';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getManyUsersUseCase: GetManyUsersUseCase
  ) {}

  @Post()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password
    });

    return UserViewModel.toHttp(user);
  }

  @Get()
  async getManyUsers(
    @Query('page') page: string,
    @Query('perPage') perPage: string
  ) {
    const { total, users } = await this.getManyUsersUseCase.execute({
      page,
      perPage: perPage ?? '10'
    });

    return users
      ? {
          total,
          users: users.map(UserViewModel.toHttp)
        }
      : null;
  }
}
