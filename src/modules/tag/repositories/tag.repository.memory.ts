import { Tag } from '../entities/tag';
import { TagRepository } from './tag.repository';

export class TagRepositoryInMemory implements TagRepository {
  public tags: Tag[] = [];

  async create(note: Tag): Promise<void> {
    this.tags.push(note);
  }

  async findById(id: string): Promise<Tag | null> {
    const note = this.tags.find(note => note.id === id);

    if (!note) return null;

    return note;
  }

  async delete(id: string): Promise<void> {
    this.tags = this.tags.filter(note => note.id !== id);
  }

  async save(note: Tag): Promise<void> {
    const noteIndex = this.tags.findIndex(
      currentTag => currentTag.id === note.id
    );

    if (noteIndex >= 0) this.tags[noteIndex] = note;
  }

  async findMany(
    page: number,
    perPage: number,
    userId: string,
    noteId?: string
  ): Promise<{ tags: Tag[]; total: number }> {
    if (noteId) {
      return {
        tags: this.tags
          .filter(tag => tag.noteId === noteId)
          .filter(tag => tag.userId === userId)
          .slice((page - 1) * perPage, page * perPage),
        total: this.tags.length
      };
    }

    return {
      tags: this.tags
        .filter(tag => tag.userId === userId)
        .slice((page - 1) * perPage, page * perPage),
      total: this.tags.length
    };
  }
}
