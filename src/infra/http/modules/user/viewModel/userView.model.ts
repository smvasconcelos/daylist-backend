import { User } from 'src/modules/user/entities/user';

export class UserViewModel {
  static toHttp({ createdAt, email, id, name }: User) {
    return {
      id,
      email,
      name,
      createdAt
    };
  }
}
