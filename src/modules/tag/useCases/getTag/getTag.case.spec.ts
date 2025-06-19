import { makeUser } from 'src/modules/user/factories/user.factory';
import { TagRepositoryInMemory } from '../../repositories/tag.repository.memory';
import { makeTag } from '../../factories/tag.factory';
import { GetTagUseCase } from './getTag.case';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';

let tagRepositoryInMemory: TagRepositoryInMemory;
let getTagUseCase: GetTagUseCase;

describe('Get Tag', () => {
  beforeEach(() => {
    tagRepositoryInMemory = new TagRepositoryInMemory();
    getTagUseCase = new GetTagUseCase(tagRepositoryInMemory);
  });

  it('Should be able to get tag', async () => {
    const user = makeUser({});
    const tag = makeTag({ userId: user.id });

    tagRepositoryInMemory.tags = [tag];

    const result = await getTagUseCase.execute({
      tagId: tag.id,
      userId: user.id
    });

    expect(result).toEqual(tag);
  });

  it('Should be able to throw error when not found tag', async () => {
    expect(async () => {
      await getTagUseCase.execute({
        tagId: 'fakeId',
        userId: 'fakeId'
      });
    }).rejects.toThrow(TagNotFoundException);
  });

  it('Should be able to throw error when tag has another user', async () => {
    const tag = makeTag({});

    tagRepositoryInMemory.tags = [tag];

    expect(async () => {
      await getTagUseCase.execute({
        tagId: tag.id,
        userId: 'fakeId'
      });
    }).rejects.toThrow(TagWithoutPermissionException);
  });
});
