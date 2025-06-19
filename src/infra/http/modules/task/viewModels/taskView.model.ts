import { Task, TaskProps } from 'src/modules/task/entities/task';

export class TaskViewModel {
  static toHtpp({
    id,
    title,
    createdAt,
    daysOfWeek,
    description,
    durationMinutes,
    endDate,
    noteId,
    recurrenceType,
    startDate,
    timesOfDay,
    userId,
    occurrences
  }: Task): TaskProps & { id: string } {
    return {
      id,
      title,
      createdAt,
      daysOfWeek,
      description,
      durationMinutes,
      endDate,
      noteId,
      recurrenceType,
      startDate,
      timesOfDay,
      userId,
      occurrences: occurrences
    };
  }
}
