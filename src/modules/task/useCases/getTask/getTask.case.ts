import { Injectable } from '@nestjs/common';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { TaskRepository } from '../../repositories/task.repository';

interface GetTaskRequest {
  taskId: string;
  userId: string;
}

@Injectable()
export class GetTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ taskId, userId }: GetTaskRequest) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) throw new TaskNotFoundException();

    if (task.userId !== userId)
      throw new TaskWithoutPermissionException({
        actionName: 'view'
      });

    return task;
  }
}
