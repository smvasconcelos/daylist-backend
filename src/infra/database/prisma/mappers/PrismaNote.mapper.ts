import { Note as NoteRaw, NoteTag, Tag } from '@prisma/client';
import { Note } from 'src/modules/note/entities/note';
import { PrismaTagMapper } from './prismaTag.mapper';

export class PrismaNoteMapper {
  static toPrisma({
    createdAt,
    description,
    id,
    title,
    userId
  }: Note): NoteRaw {
    return {
      createdAt,
      description,
      id,
      title,
      userId
    };
  }

  static toDomain({
    createdAt,
    description,
    id,
    title,
    userId,
    tags
  }: NoteRaw & { tags?: (NoteTag & { tag: Tag })[] }): Note {
    return new Note(
      {
        createdAt,
        description,
        title,
        userId,
        tags: tags?.map(noteTag => PrismaTagMapper.toDomain(noteTag.tag))
      },
      id
    );
  }
}
