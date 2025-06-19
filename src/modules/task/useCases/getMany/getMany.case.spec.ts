import { makeUser } from 'src/modules/user/factories/user.factory';
import { makeTask } from '../../factories/task.factory';
import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { GetManyTaskUseCase } from './getMany.case';

let taskRepositoryInMemory: TaskRepositoryInMemory;
let getManyTaskUseCase: GetManyTaskUseCase;

describe('Get many Task', () => {
  beforeEach(() => {
    taskRepositoryInMemory = new TaskRepositoryInMemory();
    getManyTaskUseCase = new GetManyTaskUseCase(taskRepositoryInMemory);
  });

  it('Should be able to get many note', async () => {
    const user = makeUser({});

    const tasks = [...new Array(10)].map(() => makeTask({ userId: user.id }));

    taskRepositoryInMemory.tasks = tasks;

    const result = await getManyTaskUseCase.execute({
      userId: user.id
    });

    expect(result).toEqual(tasks);
  });

  it('Should be able to get only user tasks', async () => {
    const user1 = makeUser({});
    const user2 = makeUser({});

    const tasks = [...new Array(10)].map((_, index) =>
      makeTask({ userId: index < 5 ? user1.id : user2.id })
    );

    taskRepositoryInMemory.tasks = tasks;

    const result = await getManyTaskUseCase.execute({
      userId: user1.id
    });

    expect(result).toHaveLength(5);
  });

  it('Should be able to control tasks per page', async () => {
    const user = makeUser({});

    const tasks = [...new Array(10)].map(() => makeTask({ userId: user.id }));

    taskRepositoryInMemory.tasks = tasks;

    const result = await getManyTaskUseCase.execute({
      userId: user.id,
      perPage: '8'
    });

    expect(result).toHaveLength(8);
  });

  it('Should be able to control note page', async () => {
    const user = makeUser({});

    const tasks = [...new Array(10)].map((_, index) =>
      makeTask({ userId: user.id, title: index < 5 ? 'page 1' : 'page 2' })
    );

    taskRepositoryInMemory.tasks = tasks;

    const { tasks: result } = await getManyTaskUseCase.execute({
      perPage: '5',
      page: '2',
      userId: user.id
    });

    if (!result) {
      return false;
    }

    expect(result[0].title).toEqual('page 2');

    const { tasks: result2 } = await getManyTaskUseCase.execute({
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
