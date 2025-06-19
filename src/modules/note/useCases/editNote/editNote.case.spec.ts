import { makeUser } from 'src/modules/user/factories/user.factory';
import { NoteRepositoryInMemory } from '../../repositories/note.repository.memory';
import { makeNote } from '../../factories/note.factory';
import { EditNoteUseCase } from './editNote.case';
import { NoteNotFoundException } from '../../exceptions/noteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermission.exception';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to edit note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id
    });

    noteRepositoryInMemory.notes = [note];

    const tilteChanged = 'title changed';
    const descriptionChanged = 'description changed';

    await editNoteUseCase.execute({
      title: tilteChanged,
      description: descriptionChanged,
      noteId: note.id,
      userId: user.id
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(tilteChanged);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(
      descriptionChanged
    );
  });

  it('Should be able to throw error when not found note', async () => {
    expect(async () => {
      await editNoteUseCase.execute({
        title: 'teste',
        noteId: 'fakeId',
        userId: 'fakeId'
      });
    }).rejects.toThrow(NoteNotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await editNoteUseCase.execute({
        title: 'teste',
        noteId: note.id,
        userId: 'fakeId'
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });
});
