import { Tag } from '../entities/tag';

type Override = Partial<Tag>;

export const makeTag = ({ id, ...override }: Override) => {
  return new Tag(
    {
      title: 'Test',
      userId: '123123',
      color: '#000000',
      ...override
    },
    id
  );
};
