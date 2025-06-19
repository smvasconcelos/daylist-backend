import { Injectable } from '@nestjs/common';
import { Tag } from 'src/modules/tag/entities/tag';
import { TagRepository } from 'src/modules/tag/repositories/tag.repository';
import { PrismaTagMapper } from '../mappers/prismaTag.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTagRepository implements TagRepository {
  constructor(private prisma: PrismaService) {}

  async create(tag: Tag): Promise<void> {
    const tagRaw = PrismaTagMapper.toPrisma(tag);

    await this.prisma.tag.create({
      data: tagRaw
    });
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({
      where: {
        id
      }
    });

    if (!tag) return null;

    return PrismaTagMapper.toDomain(tag);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        id
      }
    });
  }

  async save(tag: Tag): Promise<void> {
    const tagRaw = PrismaTagMapper.toPrisma(tag);

    await this.prisma.tag.update({
      data: tagRaw,
      where: {
        id: tagRaw.id
      }
    });
  }

  async findMany(
    page: number,
    perPage: number,
    userId: string,
    noteId?: string,
    search?: string
  ): Promise<{ tags: Tag[] | null; total: number }> {
    const [tags, total] = await Promise.all([
      this.prisma.tag.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          userId,
          noteId,
          title: {
            contains: search
          }
        },
        orderBy: {
          title: 'asc'
        }
      }),
      this.prisma.tag.count()
    ]);

    return {
      total,
      tags: tags.map(PrismaTagMapper.toDomain)
    };
  }
}
