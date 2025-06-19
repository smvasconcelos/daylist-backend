import { CalendarView, Task } from '../entities/task';
import { CreateTaskOcurrenceUseCaseProps } from '../useCases/createTaskOcurrenceUseCase/createTaskOcurrenceUseCase.case';
import { DeleteTaskOcurrenceUseCaseProps } from '../useCases/deleteTaskOcurrenceUseCase/deleteTaskOcurrenceUseCase.case';
import { CalendarViewTask } from '../useCases/getTaskCalendar/getTaskCalendar.case';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>;
  abstract findById(id: string): Promise<Task | null>;
  abstract getCalendarView(
    userId: string,
    calendarView: CalendarView,
    date: Date
  ): Promise<CalendarViewTask>;
  abstract delete(id: string): Promise<void>;
  abstract removeFromNote(taskId: string, noteId: string): Promise<void>;
  abstract createTaskOcurrence(
    props: CreateTaskOcurrenceUseCaseProps
  ): Promise<void>;
  abstract deleteTaskOcurrence(
    props: DeleteTaskOcurrenceUseCaseProps
  ): Promise<void>;
  abstract save(task: Task): Promise<void>;
  abstract findMany(
    page: number,
    perPage: number,
    userId: string,
    search?: string,
    noteId?: string
  ): Promise<{
    tasks: Task[] | null;
    total: number;
  }>;
}
