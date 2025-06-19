import { Tag } from '../entities/tag';
import { TagRepository } from './tag.repository';

export class TagRepositoryInMemory implements TagRepository {
  public tags: Tag[] = [];

  async create(tag: Tag): Promise<void> {
    this.tags.push(tag);
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = this.tags.find(tag => tag.id === id);

    if (!tag) return null;

    return tag;
  }

  async delete(id: string): Promise<void> {
    this.tags = this.tags.filter(tag => tag.id !== id);
  }

  async save(tag: Tag): Promise<void> {
    const tagIndex = this.tags.findIndex(
      currentTag => currentTag.id === tag.id
    );

    if (tagIndex >= 0) this.tags[tagIndex] = tag;
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

  async removeFromNote(tagId: string, noteId: string): Promise<void> {
    this.tags = this.tags.filter(item => {
      return item.noteId !== item.noteId && item.id !== tagId;
    });
  }
}
