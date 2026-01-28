import { NoteRepositoryInMemory } from 'src/modules/note/repositories/note.repository.memory';
import { makeUser } from 'src/modules/user/factories/user.factory';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { makeTask } from '../../factories/task.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { EditTaskUseCase } from './editTask.case';

let taskRepositoryInMemory: TaskRepositoryInMemory;
let editTaskUseCase: EditTaskUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Edit Task', () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editTaskUseCase = new EditTaskUseCase(
      taskRepositoryInMemory,
      noteRepositoryInMemory
    );
  });

  it('Should be able to edit task', async () => {
    const user = makeUser({});
    const task = makeTask({
      userId: user.id,
      id: '123'
    });

    taskRepositoryInMemory.tasks = [task];

    const titleChanged = 'title changed';

    await editTaskUseCase.execute({
      id: '123',
      userId: user.id,
      title: titleChanged,
      description: 'updated',
      noteId: null,
      startDate: new Date(),
      durationMinutes: 10
    });

    expect(taskRepositoryInMemory.tasks[0].title).toEqual(titleChanged);
  });

  it('Should be able to throw error when not found task', async () => {
    expect(async () => {
      await editTaskUseCase.execute({
        id: '123',
        userId: 'user',
        title: 'any',
        startDate: new Date(),
        durationMinutes: 10
      });
    }).rejects.toThrow(TaskNotFoundException);
  });

  it('Should be able to throw error when task has another user', async () => {
    const task = makeTask({});

    taskRepositoryInMemory.tasks = [task];

    expect(async () => {
      await editTaskUseCase.execute({
        id: task.id,
        userId: 'fakeId',
        title: 'any',
        startDate: new Date(),
        durationMinutes: 10
      });
    }).rejects.toThrow(TaskWithoutPermissionException);
  });
});
