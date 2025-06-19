import { TaskOccurrence as TaskOccurrenceRaw } from '@prisma/client';
import { TaskOccurrence } from 'src/modules/task/entities/taskOcurrence';

export class PrismaTaskOccurrenceMapper {
  static toPrisma({
    checkedAt,
    id,
    recurrenceType,
    taskId,
    dayOfWeek,
    timeOfDay
  }: TaskOccurrence): TaskOccurrenceRaw {
    return {
      checkedAt,
      dayOfWeek: dayOfWeek ?? null,
      id,
      recurrenceType,
      taskId,
      timeOfDay: timeOfDay ?? null
    };
  }

  static toDomain({
    checkedAt,
    dayOfWeek,
    id,
    recurrenceType,
    taskId,
    timeOfDay
  }: TaskOccurrenceRaw): TaskOccurrence {
    return new TaskOccurrence({
      id,
      recurrenceType,
      taskId,
      checkedAt,
      dayOfWeek,
      timeOfDay
    });
  }
}
