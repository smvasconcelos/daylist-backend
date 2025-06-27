import { Note } from '../entities/Note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Test',
      userId: '123123',
      description: 'test',
      ...override
    },
    id
  );
};
