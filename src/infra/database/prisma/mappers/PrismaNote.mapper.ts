import { Note as NoteRaw, NoteTag, Tag, Task } from '@prisma/client';
import { Note } from 'src/modules/note/entities/note';
import { PrismaTagMapper } from './prismaTag.mapper';
import { PrismaTaskMapper } from './prismaTask.mapper';

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
    tags,
    tasks
  }: NoteRaw & { tags?: (NoteTag & { tag: Tag })[]; tasks?: Task[] }): Note {
    return new Note(
      {
        createdAt,
        description,
        title,
        userId,
        tags: tags?.map(noteTag => PrismaTagMapper.toDomain(noteTag.tag)),
        tasks: tasks?.map(PrismaTaskMapper.toDomain)
      },
      id
    );
  }
}
