import { makeUser } from 'src/modules/user/factories/user.factory';
import { makeTag } from '../../factories/tag.factory';
import { TagRepositoryInMemory } from '../../repositories/tag.repository.memory';
import { GetManyTagUseCase } from './getMany.case';

let tagRepositoryInMemory: TagRepositoryInMemory;
let getManyTagUseCase: GetManyTagUseCase;

describe('Get many Tag', () => {
  beforeEach(() => {
    tagRepositoryInMemory = new TagRepositoryInMemory();
    getManyTagUseCase = new GetManyTagUseCase(tagRepositoryInMemory);
  });

  it('Should be able to get many note', async () => {
    const user = makeUser({});

    const tags = [...new Array(10)].map(() => makeTag({ userId: user.id }));

    tagRepositoryInMemory.tags = tags;

    const result = await getManyTagUseCase.execute({
      userId: user.id
    });

    expect(result.tags).toEqual(tags);
    expect(result.total).toEqual(10);
  });

  it('Should be able to get only user tags', async () => {
    const user1 = makeUser({});
    const user2 = makeUser({});

    const tags = [...new Array(10)].map((_, index) =>
      makeTag({ userId: index < 5 ? user1.id : user2.id })
    );

    tagRepositoryInMemory.tags = tags;

    const result = await getManyTagUseCase.execute({
      userId: user1.id
    });

    expect(result.tags).toHaveLength(5);
  });

  it('Should be able to control tags per page', async () => {
    const user = makeUser({});

    const tags = [...new Array(10)].map(() => makeTag({ userId: user.id }));

    tagRepositoryInMemory.tags = tags;

    const result = await getManyTagUseCase.execute({
      userId: user.id,
      perPage: '8'
    });

    expect(result.tags).toHaveLength(8);
  });

  it('Should be able to control note page', async () => {
    const user = makeUser({});

    const tags = [...new Array(10)].map((_, index) =>
      makeTag({ userId: user.id, title: index < 5 ? 'page 1' : 'page 2' })
    );

    tagRepositoryInMemory.tags = tags;

    const { tags: result } = await getManyTagUseCase.execute({
      perPage: '5',
      page: '2',
      userId: user.id
    });

    if (!result) {
      return false;
    }

    expect(result[0].title).toEqual('page 2');

    const { tags: result2 } = await getManyTagUseCase.execute({
      userId: user.id,
      perPage: '5',
      page: '1'
    });

    if (!result2) {
      return false;
    }

    expect(result2[0].title).toEqual('page 1');
  });
});
