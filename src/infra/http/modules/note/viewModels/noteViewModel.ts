import { Note } from '../../../../../modules/note/entities/Note';
export class NoteViewModel {
  static toHtpp({ id, title, description, createdAt }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}
