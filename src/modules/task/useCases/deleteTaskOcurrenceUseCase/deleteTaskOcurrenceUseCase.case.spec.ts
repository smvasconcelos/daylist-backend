import { makeTask } from '../../factories/task.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { DeleteTaskOcurrenceUseCase } from './deleteTaskOcurrenceUseCase.case';

describe('Create task occurrence', () => {
  it('Should be able to delete a task occurrence', async () => {
    const taskRepositoryInMemory = new TaskRepositoryInMemory();
    const deleteTaskOcurrenceUseCase = new DeleteTaskOcurrenceUseCase(
      taskRepositoryInMemory
    );

    const task = makeTask({ userId: 'user-1', id: 'task-1' });
    taskRepositoryInMemory.tasks = [task];

    await expect(
      deleteTaskOcurrenceUseCase.execute({
        taskId: 'task-1',
        userId: 'user-1',
        ocurrenceId: 'occ-1'
      })
    ).resolves.toBeUndefined();
  });
});
