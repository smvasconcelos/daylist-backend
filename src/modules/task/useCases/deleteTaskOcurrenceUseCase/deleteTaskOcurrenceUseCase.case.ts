import { Injectable } from '@nestjs/common';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { TaskRepository } from '../../repositories/task.repository';

export interface DeleteTaskOcurrenceUseCaseProps {
  taskId: string;
  userId: string;
  ocurrenceId: string;
}

@Injectable()
export class DeleteTaskOcurrenceUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(props: DeleteTaskOcurrenceUseCaseProps) {
    const task = await this.taskRepository.findById(props.taskId);

    if (!task) {
      throw new TaskNotFoundException();
    }

    if (task.userId !== props.userId) {
      throw new TaskWithoutPermissionException({
        actionName: 'delete-task-ocurrence'
      });
    }

    return await this.taskRepository.deleteTaskOcurrence({
      ...props
    });
  }
}
