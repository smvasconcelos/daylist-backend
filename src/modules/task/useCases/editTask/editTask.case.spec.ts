import { makeUser } from 'src/modules/user/factories/user.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { makeTask } from '../../factories/task.factory';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { NoteRepositoryInMemory } from 'src/modules/note/repositories/note.repository.memory';
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
      userId: user.id
    });

    taskRepositoryInMemory.tasks = [task];

    const tilteChanged = 'title changed';

    await editTaskUseCase.execute(makeTask({ id: '123' }));

    expect(taskRepositoryInMemory.tasks[0].title).toEqual(tilteChanged);
  });

  it('Should be able to throw error when not found task', async () => {
    expect(async () => {
      await editTaskUseCase.execute(makeTask({ id: '123' }));
    }).rejects.toThrow(TaskNotFoundException);
  });

  it('Should be able to throw error when task has another user', async () => {
    const task = makeTask({});

    taskRepositoryInMemory.tasks = [task];

    expect(async () => {
      await editTaskUseCase.execute(makeTask({ id: '123' }));
    }).rejects.toThrow(TaskWithoutPermissionException);
  });
});
