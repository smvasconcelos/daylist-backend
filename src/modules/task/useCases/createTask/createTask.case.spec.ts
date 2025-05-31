import { NoteRepositoryInMemory } from 'src/modules/note/repositories/note.repository.memory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { CreateTaskUseCase } from './createTask.case';
import { makeTask } from '../../factories/task.factory';

let taskRepositoryInMemory: TaskRepositoryInMemory;
let createTaskUseCase: CreateTaskUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;
describe('Create Task', () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createTaskUseCase = new CreateTaskUseCase(
      taskRepositoryInMemory,
      noteRepositoryInMemory
    );
  });

  it('Should be able to create task', async () => {
    expect(taskRepositoryInMemory.tasks).toEqual([]);

    const task = await createTaskUseCase.execute(makeTask({ id: '123' }));

    expect(taskRepositoryInMemory.tasks).toEqual([task]);
  });
});
