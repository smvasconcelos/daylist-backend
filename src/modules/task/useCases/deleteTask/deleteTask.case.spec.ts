import { makeUser } from 'src/modules/user/factories/user.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { makeTask } from '../../factories/task.factory';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { DeleteTaskUseCase } from './deleteTask.case';

let taskRepositoryInMemory: TaskRepositoryInMemory;
let deleteTaskUseCase: DeleteTaskUseCase;

describe('Delete Task', () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepositoryInMemory);
  });

  it('Should be able to delete task', async () => {
    const user = makeUser({});
    const task = makeTask({
      userId: user.id
    });

    taskRepositoryInMemory.tasks = [task];

    await deleteTaskUseCase.execute({
      taskId: task.id,
      userId: user.id
    });

    expect(taskRepositoryInMemory.tasks).toHaveLength(0);
  });

  it('Should be able to throw error when not found task', async () => {
    expect(async () => {
      await deleteTaskUseCase.execute({
        taskId: 'fakeId',
        userId: 'fakeId'
      });
    }).rejects.toThrow(TaskNotFoundException);
  });

  it('Should be able to throw error when task has another user', async () => {
    const task = makeTask({});

    taskRepositoryInMemory.tasks = [task];

    expect(async () => {
      await deleteTaskUseCase.execute({
        taskId: task.id,
        userId: 'fakeId'
      });
    }).rejects.toThrow(TaskWithoutPermissionException);
  });
});
