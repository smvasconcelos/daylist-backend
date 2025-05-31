import { makeUser } from 'src/modules/user/factories/user.factory';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { makeTask } from '../../factories/task.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { RemoveTaskFromNoteUseCase } from './removeTaskFromNoteUseCase.case';
import { NoteRepositoryInMemory } from 'src/modules/note/repositories/note.repository.memory';

let taskRepositoryInMemory: TaskRepositoryInMemory;
let noteRepositoryInMemory: NoteRepositoryInMemory;
let removeTaskFromNoteUseCase: RemoveTaskFromNoteUseCase;

describe('Remove task from note', () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    removeTaskFromNoteUseCase = new RemoveTaskFromNoteUseCase(
      taskRepositoryInMemory,
      noteRepositoryInMemory
    );
  });

  it('Should be able to remove from note', async () => {
    const user = makeUser({});
    const task = makeTask({
      userId: user.id
    });

    taskRepositoryInMemory.tasks = [task];

    await removeTaskFromNoteUseCase.execute({
      taskId: task.id,
      userId: user.id,
      noteId: '123123'
    });

    expect(taskRepositoryInMemory.tasks).toHaveLength(0);
  });

  it('Should be able to throw error when not found task', async () => {
    expect(async () => {
      await removeTaskFromNoteUseCase.execute({
        taskId: 'fakeId',
        userId: 'fakeId',
        noteId: '123123'
      });
    }).rejects.toThrow(TaskNotFoundException);
  });

  it('Should be able to throw error when task has another user', async () => {
    const task = makeTask({});

    taskRepositoryInMemory.tasks = [task];

    expect(async () => {
      await removeTaskFromNoteUseCase.execute({
        taskId: task.id,
        userId: 'fakeId',
        noteId: '123123'
      });
    }).rejects.toThrow(TaskWithoutPermissionException);
  });
});
