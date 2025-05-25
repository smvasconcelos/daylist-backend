import { Note } from 'src/modules/note/entities/note';
import { TagViewModel } from '../../tag/viewModels/tagView.model';

export class NoteViewModel {
  static toHtpp({ id, title, description, createdAt, tags }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
      tags: tags ? tags.map(TagViewModel.toHtpp) : null
    };
  }
}
