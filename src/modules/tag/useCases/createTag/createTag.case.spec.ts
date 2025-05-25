import { TagRepositoryInMemory } from '../../repositories/tag.repository.memory';
import { CreateTagUseCase } from './createTag.case';

let tagRepositoryInMemory: TagRepositoryInMemory;
let createTagUseCase: CreateTagUseCase;

describe('Create Tag', () => {
  beforeEach(() => {
    tagRepositoryInMemory = new TagRepositoryInMemory();
    createTagUseCase = new CreateTagUseCase(tagRepositoryInMemory);
  });

  it('Should be able to create tag', async () => {
    expect(tagRepositoryInMemory.tags).toEqual([]);

    const tag = await createTagUseCase.execute({
      title: 'Test',
      userId: '123123',
      color: '#000000'
    });

    expect(tagRepositoryInMemory.tags).toEqual([tag]);
  });
});
