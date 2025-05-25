import { Tag as TagRaw } from '@prisma/client';
import { Tag } from 'src/modules/tag/entities/tag';

export class PrismaTagMapper {
  static toPrisma({
    id,
    color,
    title,
    createdAt,
    noteId,
    userId
  }: Tag): TagRaw {
    return {
      id,
      title,
      color,
      createdAt,
      userId,
      noteId: noteId ?? null
    };
  }

  static toDomain({
    createdAt,
    color,
    id,
    title,
    userId,
    noteId
  }: TagRaw): Tag {
    return new Tag(
      {
        createdAt,
        color,
        title,
        userId,
        noteId
      },
      id
    );
  }
}
