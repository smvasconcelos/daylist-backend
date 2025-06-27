import { User } from '../entities/User';
import { UserRepository } from './User.repository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async getManyUsers(
    page: number,
    perPage: number
  ): Promise<{
    total: number;
    users: User[] | null;
  }> {
    if (this.users.length === 0)
      return {
        total: 0,
        users: null
      };

    return {
      users: this.users,
      total: this.users.length
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);

    if (!user) return null;

    return user;
  }
}
