import { makeTask } from '../../factories/task.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { CreateTaskOcurrenceUseCase } from './createTaskOcurrenceUseCase.case';

describe('Create task occurrence', () => {
  it('Should be able to create a task occurrence', async () => {
    const taskRepositoryInMemory = new TaskRepositoryInMemory();
    const createTaskOcurrenceUseCase = new CreateTaskOcurrenceUseCase(
      taskRepositoryInMemory
    );

    const task = makeTask({ userId: 'user-1', id: 'task-1' });
    taskRepositoryInMemory.tasks = [task];

    await expect(
      createTaskOcurrenceUseCase.execute({
        taskId: 'task-1',
        userId: 'user-1',
        timeOfDay: '08:00'
      })
    ).resolves.toBeUndefined();
  });
});
