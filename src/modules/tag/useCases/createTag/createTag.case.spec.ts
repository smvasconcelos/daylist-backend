import { NoteRepositoryInMemory } from 'src/modules/note/repositories/note.repository.memory';
import { TagRepositoryInMemory } from '../../repositories/tag.repository.memory';
import { CreateTagUseCase } from './createTag.case';

let tagRepositoryInMemory: TagRepositoryInMemory;
let createTagUseCase: CreateTagUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Create Tag', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    tagRepositoryInMemory = new TagRepositoryInMemory();
    createTagUseCase = new CreateTagUseCase(
      tagRepositoryInMemory,
      noteRepositoryInMemory
    );
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
