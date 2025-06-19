import { Note } from 'src/modules/note/entities/note';
import { TagViewModel } from '../../tag/viewModels/tagView.model';
import { TaskViewModel } from '../../task/viewModels/taskView.model';

export class NoteViewModel {
  static toHtpp({ id, title, description, createdAt, tags, tasks }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
      tags: tags ? tags.map(TagViewModel.toHtpp) : null,
      tasks: tasks ? tasks.map(TaskViewModel.toHtpp) : null
    };
  }
}
