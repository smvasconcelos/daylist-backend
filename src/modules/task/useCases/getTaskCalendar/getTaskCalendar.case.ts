import { Injectable } from '@nestjs/common';
import { CalendarView, Task } from '../../entities/task';
import { TaskRepository } from '../../repositories/task.repository';

export interface GetTaskCalendarUseCaseProps {
  userId: string;
  calendarView: CalendarView;
  date: Date;
}

export interface CalendarViewTask {
  daily: Task[] | null;
  weekly: Task[] | null;
  monthly: Task[][] | null;
}

@Injectable()
export class GetTaskCalendarUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ calendarView, userId, date }: GetTaskCalendarUseCaseProps) {
    
    return await this.taskRepository.getCalendarView(
      userId,
      calendarView,
      date
    );
  }
}
