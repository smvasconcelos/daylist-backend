import { makeUser } from 'src/modules/user/factories/user.factory';
import { makeNote } from '../../factories/note.factory';
import { NoteRepositoryInMemory } from '../../repositories/note.repository.memory';
import { GetManyNoteUseCase } from './getMany.case';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getManyNoteUseCase: GetManyNoteUseCase;

describe('Get many Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getManyNoteUseCase = new GetManyNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to get many note', async () => {
    const user = makeUser({});

    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNoteUseCase.execute({
      userId: user.id
    });

    expect(result.notes).toEqual(notes);
    expect(result.total).toEqual(10);
  });

  it('Should be able to get only user notes', async () => {
    const user1 = makeUser({});
    const user2 = makeUser({});

    const notes = [...new Array(10)].map((_, index) =>
      makeNote({ userId: index < 5 ? user1.id : user2.id })
    );

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNoteUseCase.execute({
      userId: user1.id
    });

    expect(result.notes).toHaveLength(5);
  });

  it('Should be able to control notes per page', async () => {
    const user = makeUser({});

    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNoteUseCase.execute({
      userId: user.id,
      perPage: '8'
    });

    expect(result.notes).toHaveLength(8);
  });

  it('Should be able to control note page', async () => {
    const user = makeUser({});

    const notes = [...new Array(10)].map((_, index) =>
      makeNote({ userId: user.id, title: index < 5 ? 'page 1' : 'page 2' })
    );

    noteRepositoryInMemory.notes = notes;

    const { notes: result } = await getManyNoteUseCase.execute({
      perPage: '5',
      page: '2',
      userId: user.id
    });

    if (!result) return false;

    expect(result[0].title).toEqual('page 2');

    const { notes: result2 } = await getManyNoteUseCase.execute({
      userId: user.id,
      perPage: '5',
      page: '1'
    });

    if (!result2) return false;

    expect(result2[0].title).toEqual('page 1');
  });
});
