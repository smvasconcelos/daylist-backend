import { TaskOccurrence as TaskOccurrenceRaw } from 'prisma/generated/client';
import { TaskOccurrence } from 'src/modules/task/entities/taskOcurrence';

export class PrismaTaskOccurrenceMapper {
  static toPrisma({
    checkedAt,
    id,
    recurrenceType,
    taskId,
    dayOfWeek,
    timeOfDay,
    endDate,
    startDate
  }: TaskOccurrence): TaskOccurrenceRaw {
    return {
      checkedAt,
      endDate: endDate ?? null,
      startDate,
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
    timeOfDay,
    endDate,
    startDate
  }: TaskOccurrenceRaw): TaskOccurrence {
    return new TaskOccurrence(
      {
        endDate: endDate ?? undefined,
        startDate,
        recurrenceType,
        taskId,
        checkedAt,
        dayOfWeek,
        timeOfDay
      },
      id
    );
  }
}
