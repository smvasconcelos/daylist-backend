import { makeUser } from 'src/modules/user/factories/user.factory';
import { NoteRepositoryInMemory } from '../../repositories/note.repository.memory';
import { makeNote } from '../../factories/note.factory';
import { GetNoteUseCase } from './getNote.case';
import { NoteNotFoundException } from '../../exceptions/NoteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoutPermission.exception';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('Get Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to get note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const result = await getNoteUseCase.execute({
      noteId: note.id,
      userId: user.id
    });

    expect(result).toEqual(note);
  });

  it('Should be able to throw error when not found note', async () => {
    expect(async () => {
      await getNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId'
      });
    }).rejects.toThrow(NoteNotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await getNoteUseCase.execute({
        noteId: note.id,
        userId: 'fakeId'
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });
});
