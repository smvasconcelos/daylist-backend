import { makeUser } from 'src/modules/user/factories/user.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { makeTask } from '../../factories/task.factory';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { GetTaskUseCase } from './getTask.case';

let taskRepositoryInMemory: TaskRepositoryInMemory;
let getTaskUseCase: GetTaskUseCase;

describe('Get Task', () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    getTaskUseCase = new GetTaskUseCase(taskRepositoryInMemory);
  });

  it('Should be able to get task', async () => {
    const user = makeUser({});
    const task = makeTask({ userId: user.id });

    taskRepositoryInMemory.tasks = [task];

    const result = await getTaskUseCase.execute({
      taskId: task.id,
      userId: user.id
    });

    expect(result).toEqual(task);
  });

  it('Should be able to throw error when not found task', async () => {
    expect(async () => {
      await getTaskUseCase.execute({
        taskId: 'fakeId',
        userId: 'fakeId'
      });
    }).rejects.toThrow(TaskNotFoundException);
  });

  it('Should be able to throw error when task has another user', async () => {
    const task = makeTask({});

    taskRepositoryInMemory.tasks = [task];

    expect(async () => {
      await getTaskUseCase.execute({
        taskId: task.id,
        userId: 'fakeId'
      });
    }).rejects.toThrow(TaskWithoutPermissionException);
  });
});
