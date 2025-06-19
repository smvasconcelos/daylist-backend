import { makeUser } from 'src/modules/user/factories/user.factory';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';
import { makeTag } from '../../factories/tag.factory';
import { TagRepositoryInMemory } from '../../repositories/tag.repository.memory';
import { RemoveTagFromNoteUseCase } from './removeTagFromNoteUseCase.case';

let tagRepositoryInMemory: TagRepositoryInMemory;
let removeTagFromNoteUseCase: RemoveTagFromNoteUseCase;

describe('Remove tag from note', () => {
  beforeEach(() => {
    tagRepositoryInMemory = new TagRepositoryInMemory();
    removeTagFromNoteUseCase = new RemoveTagFromNoteUseCase(
      tagRepositoryInMemory
    );
  });

  it('Should be able to remove from note', async () => {
    const user = makeUser({});
    const tag = makeTag({
      userId: user.id
    });

    tagRepositoryInMemory.tags = [tag];

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

    expect(async () => {
      await removeTagFromNoteUseCase.execute({
        tagId: tag.id,
        userId: 'fakeId',
        noteId: '123123'
      });
    }).rejects.toThrow(TagWithoutPermissionException);
  });
});
