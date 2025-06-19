import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract getManyUsers(
    page: number,
    perPage: number
  ): Promise<{
    total: number;
    users: User[] | null;
  }>;
  abstract findByEmail(email: string): Promise<User | null>;
}
