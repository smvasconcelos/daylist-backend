import { Task, TaskProps } from 'src/modules/task/entities/task';
import { TaskOccurrenceViewModel } from './taskOccurrenceView.model';

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
        ? occurrences.map(TaskOccurrenceViewModel.toHtpp)
        : undefined
    };
  }
}
