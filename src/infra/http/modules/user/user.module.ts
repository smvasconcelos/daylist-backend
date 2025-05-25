import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUser/createUser.case';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GetManyUsersUseCase } from 'src/modules/user/useCases/getManyUsers/getManyUsers.case';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase, GetManyUsersUseCase]
})
export class UserModule {}
