import { Injectable } from '@nestjs/common';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { TaskRepository } from '../../repositories/task.repository';
import { DayOfWeek, Recurrence } from '@prisma/client';

export interface CreateTaskOcurrenceUseCaseProps {
  taskId: string;
  userId: string;
  recurrenceType: Recurrence;
  dayOfWeek?: DayOfWeek;
  timeOfDay?: string;
}

@Injectable()
export class CreateTaskOcurrenceUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(props: CreateTaskOcurrenceUseCaseProps) {
    const task = await this.taskRepository.findById(props.taskId);

    if (!task) {
      throw new TaskNotFoundException();
    }

    if (task.userId !== props.userId) {
      throw new TaskWithoutPermissionException({
        actionName: 'create-task-ocurrence'
      });
    }

    await this.taskRepository.createTaskOcurrence(props);
  }
}
