import { TaskOccurrence } from '@prisma/client';
import { TaskOccurrenceProps } from 'src/modules/task/entities/taskOcurrence';

export class TaskOccurrenceViewModel {
  static toHtpp({
    id,
    checkedAt,
    dayOfWeek,
    recurrenceType,
    taskId,
    endDate,
    startDate,
    timeOfDay
  }: TaskOccurrence): TaskOccurrenceProps & { id: string } {
    return {
      id,
      checkedAt,
      dayOfWeek,
      startDate,
      endDate: endDate ?? undefined,
      recurrenceType: recurrenceType ?? 'NONE',
      taskId,
      timeOfDay
    };
  }
}
