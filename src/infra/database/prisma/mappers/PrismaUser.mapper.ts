import { User as UserRaw } from 'prisma/generated/client';
import { User } from '../../../../modules/user/entities/User';

export class PrismaUserMapper {
  static toPrisma({ createdAt, email, name, password, id }: User): UserRaw {
    return {
      createdAt,
      email,
      name,
      password,
      id
    };
  }

  static toDomain({ id, createdAt, email, name, password }: UserRaw): User {
    return new User(
      {
        createdAt,
        email,
        name,
        password
      },
      id
    );
  }
}
