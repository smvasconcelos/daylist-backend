import { Tag } from 'src/modules/tag/entities/tag';

export class TagViewModel {
  static toHtpp({ id, title, color, createdAt, noteId, userId }: Tag) {
    return {
      id,
      title,
      color,
      createdAt,
      noteId,
      userId
    };
  }
}
