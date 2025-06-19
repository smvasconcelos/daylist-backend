import { Tag } from '../entities/tag';

export abstract class TagRepository {
  abstract create(tag: Tag): Promise<void>;
  abstract findById(id: string): Promise<Tag | null>;
  abstract delete(id: string): Promise<void>;
  abstract removeFromNote(tagId: string, noteId: string): Promise<void>;
  abstract save(tag: Tag): Promise<void>;
  abstract findMany(
    page: number,
    perPage: number,
    userId: string,
    noteId?: string,
    search?: string
  ): Promise<{
    tags: Tag[] | null;
    total: number;
  }>;
}
