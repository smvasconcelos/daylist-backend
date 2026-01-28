import { Tag as TagRaw } from 'prisma/generated/client';
import { Tag } from 'src/modules/tag/entities/tag';

export class PrismaTagMapper {
  static toPrisma({ id, color, title, createdAt, userId }: Tag): TagRaw {
    return {
      id,
      title,
      color,
      createdAt,
      userId
    };
  }

  static toDomain({ createdAt, color, id, title, userId }: TagRaw): Tag {
    return new Tag(
      {
        createdAt,
        color,
        title,
        userId
      },
      id
    );
  }
}
