import { Injectable } from '@nestjs/common';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { TaskRepository } from '../../repositories/task.repository';

interface DeleteTaskRequest {
  taskId: string;
  userId: string;
}

@Injectable()
export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ taskId, userId }: DeleteTaskRequest) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) throw new TaskNotFoundException();

    if (task.userId !== userId)
      throw new TaskWithoutPermissionException({
        actionName: 'delete'
      });

    return await this.taskRepository.delete(taskId);
  }
}
