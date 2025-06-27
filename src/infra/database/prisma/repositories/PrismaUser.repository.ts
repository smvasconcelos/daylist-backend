import { User } from 'src/modules/user/entities/User';
import { UserRepository } from 'src/modules/user/repositories/User.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/PrismaUser.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw
    });
  }

  async getManyUsers(
    page: number,
    perPage: number
  ): Promise<{ total: number; users: User[] | null }> {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        take: perPage,
        skip: (page - 1) * perPage
      }),
      this.prisma.user.count()
    ]);

    return {
      users: users.map(PrismaUserMapper.toDomain),
      total
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
