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
      data: {
        ...tagRaw
      }
    });

    if (tag.noteId) {
      await this.prisma.noteTag.create({
        data: {
          noteId: tag.noteId,
          tagId: tag.id
        }
      });
    }
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        notes: true,
        user: true
      }
    });

    if (!tag) return null;

    return PrismaTagMapper.toDomain(tag);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tag.delete({
      where: { id }
    });
  }

  async removeFromNote(tagId: string, noteId: string): Promise<void> {
    const relationExists = await this.prisma.noteTag.findUnique({
      where: {
        noteId_tagId: {
          noteId: noteId,
          tagId: tagId
        }
      }
    });

    if (relationExists) {
      await this.prisma.noteTag.delete({
        where: {
          noteId_tagId: {
            noteId: noteId,
            tagId: tagId
          }
        }
      });
    }
  }

  async save(tag: Tag): Promise<void> {
    const tagRaw = PrismaTagMapper.toPrisma(tag);

    await this.prisma.tag.update({
      where: { id: tagRaw.id },
      data: tagRaw
    });

    if (tag.noteId) {
      const relationExists = await this.prisma.noteTag.findUnique({
        where: {
          noteId_tagId: {
            noteId: tag.noteId,
            tagId: tag.id
          }
        }
      });

      if (!relationExists) {
        await this.prisma.noteTag.create({
          data: {
            noteId: tag.noteId,
            tagId: tag.id
          }
        });
      }
    }
  }

  async findMany(
    page: number,
    perPage: number,
    userId: string,
    noteId?: string,
    search?: string
  ): Promise<{ tags: Tag[] | null; total: number }> {
    let tags;
    let total;

    if (noteId) {
      const noteTags = await this.prisma.noteTag.findMany({
        where: {
          noteId,
          tag: {
            userId,
            title: search ? { contains: search } : undefined
          }
        },
        include: {
          tag: true
        },
        skip: (page - 1) * perPage,
        take: perPage
      });

      tags = noteTags.map(nt => nt.tag);
      total = await this.prisma.noteTag.count({
        where: {
          noteId,
          tag: {
            userId,
            title: search ? { contains: search } : undefined
          }
        }
      });

      return {
        total,
        tags: tags.map(PrismaTagMapper.toDomain)
      };
    }

    tags = await this.prisma.tag.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      where: {
        userId,
        title: search ? { contains: search } : undefined
      },
      orderBy: { title: 'asc' }
    });

    total = await this.prisma.tag.count({
      where: {
        userId,
        title: search ? { contains: search } : undefined
      }
    });

    return {
      total,
      tags: tags.map(PrismaTagMapper.toDomain)
    };
  }
}
