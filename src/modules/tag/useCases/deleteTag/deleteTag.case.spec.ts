import { makeUser } from 'src/modules/user/factories/user.factory';
import { TagRepositoryInMemory } from '../../repositories/tag.repository.memory';
import { makeTag } from '../../factories/tag.factory';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';
import { DeleteTagUseCase } from './deleteTag.case';

let tagRepositoryInMemory: TagRepositoryInMemory;
let deleteTagUseCase: DeleteTagUseCase;

describe('Delete Tag', () => {
  beforeEach(() => {
    tagRepositoryInMemory = new TagRepositoryInMemory();
    deleteTagUseCase = new DeleteTagUseCase(tagRepositoryInMemory);
  });

  it('Should be able to delete tag', async () => {
    const user = makeUser({});
    const tag = makeTag({
      userId: user.id
    });

    tagRepositoryInMemory.tags = [tag];

    await deleteTagUseCase.execute({
      tagId: tag.id,
      userId: user.id
    });

    expect(tagRepositoryInMemory.tags).toHaveLength(0);
  });

  it('Should be able to throw error when not found tag', async () => {
    expect(async () => {
      await deleteTagUseCase.execute({
        tagId: 'fakeId',
        userId: 'fakeId'
      });
    }).rejects.toThrow(TagNotFoundException);
  });

  it('Should be able to throw error when tag has another user', async () => {
    const tag = makeTag({});

    tagRepositoryInMemory.tags = [tag];

    expect(async () => {
      await deleteTagUseCase.execute({
        tagId: tag.id,
        userId: 'fakeId'
      });
    }).rejects.toThrow(TagWithoutPermissionException);
  });
});
