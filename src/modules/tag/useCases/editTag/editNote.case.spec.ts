import { makeUser } from 'src/modules/user/factories/user.factory';
import { TagRepositoryInMemory } from '../../repositories/tag.repository.memory';
import { makeTag } from '../../factories/tag.factory';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';
import { EditTagUseCase } from './editNote.case';

let tagRepositoryInMemory: TagRepositoryInMemory;
let editTagUseCase: EditTagUseCase;

describe('Edit Tag', () => {
  beforeEach(() => {
    tagRepositoryInMemory = new TagRepositoryInMemory();
    editTagUseCase = new EditTagUseCase(tagRepositoryInMemory);
  });

  it('Should be able to edit tag', async () => {
    const user = makeUser({});
    const tag = makeTag({
      userId: user.id
    });

    tagRepositoryInMemory.tags = [tag];

    const tilteChanged = 'title changed';
    const colorChanged = '#000000';

    await editTagUseCase.execute({
      title: tilteChanged,
      color: colorChanged,
      tagId: tag.id,
      userId: user.id
    });

    expect(tagRepositoryInMemory.tags[0].title).toEqual(tilteChanged);
    expect(tagRepositoryInMemory.tags[0].color).toEqual(colorChanged);
  });

  it('Should be able to throw error when not found tag', async () => {
    expect(async () => {
      await editTagUseCase.execute({
        title: 'teste',
        color: '#000000',
        tagId: 'fakeId',
        userId: 'fakeId'
      });
    }).rejects.toThrow(TagNotFoundException);
  });

  it('Should be able to throw error when tag has another user', async () => {
    const tag = makeTag({});

    tagRepositoryInMemory.tags = [tag];

    expect(async () => {
      await editTagUseCase.execute({
        title: 'teste',
        tagId: tag.id,
        color: '#000000',
        userId: 'fakeId'
      });
    }).rejects.toThrow(TagWithoutPermissionException);
  });
});
