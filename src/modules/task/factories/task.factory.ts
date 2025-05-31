import { Task } from '../entities/task';

type Override = Partial<Task>;

export const makeTask = ({ id, ...override }: Override) => {
  return new Task(
    {
      title: 'Test',
      userId: '123123',
      description: 'teste',
      startDate: new Date(),
      createdAt: new Date(),
      durationMinutes: 10,
      ...override
    },
    id
  );
};
