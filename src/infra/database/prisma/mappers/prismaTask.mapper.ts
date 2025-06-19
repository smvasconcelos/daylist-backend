import { TaskOccurrence, Task as TaskRaw } from '@prisma/client';
import { Task } from 'src/modules/task/entities/task';

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
      startDate,
      timesOfDay: timesOfDay ?? [],
      title,
      userId
    };
  }

  static toDomain({
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
    createdAt,
    userId,
    occurrences
  }: TaskRaw & { occurrences?: TaskOccurrence[] }): Task {
    return new Task(
      {
        daysOfWeek,
        createdAt,
        occurrences,
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
