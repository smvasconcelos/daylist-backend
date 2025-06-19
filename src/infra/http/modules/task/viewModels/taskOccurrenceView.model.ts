import { TaskOccurrence } from '@prisma/client';
import { TaskOccurrenceProps } from 'src/modules/task/entities/taskOcurrence';

export class TaskOccurrenceViewModel {
  static toHtpp({
    id,
    checkedAt,
    dayOfWeek,
    recurrenceType,
    taskId,
    timeOfDay
  }: TaskOccurrence): TaskOccurrenceProps & { id: string } {
    return {
      id,
      checkedAt,
      dayOfWeek,
      recurrenceType,
      taskId,
      timeOfDay
    };
  }
}
