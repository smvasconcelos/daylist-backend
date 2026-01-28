import { makeNote } from 'src/modules/note/factories/note.factory';
import { NoteRepositoryInMemory } from 'src/modules/note/repositories/note.repository.memory';
import { makeUser } from 'src/modules/user/factories/user.factory';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';
import { makeTag } from '../../factories/tag.factory';
import { TagRepositoryInMemory } from '../../repositories/tag.repository.memory';
import { RemoveTagFromNoteUseCase } from './removeTagFromNoteUseCase.case';

let tagRepositoryInMemory: TagRepositoryInMemory;
let noteRepositoryInMemory: NoteRepositoryInMemory;
let removeTagFromNoteUseCase: RemoveTagFromNoteUseCase;

describe('Remove tag from note', () => {
  beforeEach(() => {
    tagRepositoryInMemory = new TagRepositoryInMemory();
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    removeTagFromNoteUseCase = new RemoveTagFromNoteUseCase(
      tagRepositoryInMemory,
      noteRepositoryInMemory
    );
  });

  it('Should be able to remove from note', async () => {
    const user = makeUser({});
    const tag = makeTag({
      userId: user.id
    });

    tagRepositoryInMemory.tags = [tag];
    noteRepositoryInMemory.notes = [makeNote({ id: '123123', userId: user.id })];

    await removeTagFromNoteUseCase.execute({
      tagId: tag.id,
      userId: user.id,
      noteId: '123123'
    });

    expect(tagRepositoryInMemory.tags).toHaveLength(0);
  });

  it('Should be able to throw error when not found tag', async () => {
    expect(async () => {
      await removeTagFromNoteUseCase.execute({
        tagId: 'fakeId',
        userId: 'fakeId',
        noteId: '123123'
      });
    }).rejects.toThrow(TagNotFoundException);
  });

  it('Should be able to throw error when tag has another user', async () => {
    const tag = makeTag({});

    tagRepositoryInMemory.tags = [tag];
    noteRepositoryInMemory.notes = [makeNote({ id: '123123' })];

    expect(async () => {
      await removeTagFromNoteUseCase.execute({
        tagId: tag.id,
        userId: 'fakeId',
        noteId: '123123'
      });
    }).rejects.toThrow(TagWithoutPermissionException);
  });
});
