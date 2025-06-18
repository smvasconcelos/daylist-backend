import {
  Task as TaskRaw,
  TaskOccurrence as TaskOccurrenceRaw,
  DayOfWeek
} from '@prisma/client';
import { Task } from 'src/modules/task/entities/task';
import { TaskOccurrence } from 'src/modules/task/entities/taskOcurrence';
import { PrismaTaskOccurrenceMapper } from './prismaTaskOccurrence.mapper';

export class PrismaTaskMapper {
  static toPrisma({
    createdAt,
    daysOfWeek,
    description,
    durationMinutes,
    endDate,
    id,
    noteId,
    recurrenceType,
    startDate,
    timesOfDay,
    title,
    userId
  }: Task): TaskRaw {
    return {
      createdAt,
      daysOfWeek: daysOfWeek ?? [],
      description,
      durationMinutes,
      endDate: endDate ?? null,
      id,
      noteId: noteId ?? null,
      recurrenceType: recurrenceType ?? 'NONE',
      startDate: startDate ?? null,
      timesOfDay: timesOfDay ?? [],
      title,
      userId
    };
  }

  static toDomain({
    description,
    durationMinutes,
    id,
    noteId,
    daysOfWeek,
    recurrenceType,
    endDate,
    startDate,
    timesOfDay,
    title,
    createdAt,
    userId,
    occurrences
  }: TaskRaw & { occurrences?: TaskOccurrenceRaw[] }): Task {
    return new Task(
      {
        daysOfWeek,
        createdAt,
        occurrences: occurrences?.map(PrismaTaskOccurrenceMapper.toDomain),
        userId,
        description: description ?? undefined,
        durationMinutes,
        endDate: endDate ?? undefined,
        noteId,
        recurrenceType,
        startDate,
        timesOfDay,
        title
      },
      id
    );
  }
}
