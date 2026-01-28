import { NoteRepositoryInMemory } from 'src/modules/note/repositories/note.repository.memory';
import { makeTask } from '../../factories/task.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { CreateTaskUseCase } from './createTask.case';

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

    const taskToCreate = makeTask({ id: '123' });

    const task = await createTaskUseCase.execute({
      title: taskToCreate.title,
      userId: taskToCreate.userId,
      noteId: taskToCreate.noteId,
      startDate: taskToCreate.startDate as Date,
      endDate: taskToCreate.endDate,
      daysOfWeek: taskToCreate.daysOfWeek,
      timesOfDay: taskToCreate.timesOfDay,
      recurrenceType: taskToCreate.recurrenceType,
      durationMinutes: taskToCreate.durationMinutes
    });

    expect(taskRepositoryInMemory.tasks).toEqual([task]);
  });
});
