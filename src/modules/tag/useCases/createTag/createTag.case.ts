import { Injectable } from '@nestjs/common';
import { Tag } from '../../entities/tag';
import { TagRepository } from '../../repositories/tag.repository';
import { TagInvalidColor } from '../../exceptions/invalidTagColor.exception';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { NoteNotFoundException } from 'src/modules/note/exceptions/NoteNotFound.exception';

interface CreateTagRequest {
  title: string;
  color: string;
  userId: string;
  noteId?: string;
}

@Injectable()
export class CreateTagUseCase {
  constructor(
    private tagRepository: TagRepository,
    private noteRepository: NoteRepository
  ) {}

  async execute({ title, color, noteId, userId }: CreateTagRequest) {
    const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(color);

    if (!isValidHex) {
      throw new TagInvalidColor();
    }

    if (noteId) {
      const note = await this.noteRepository.findById(noteId);

      if (!note) {
        throw new NoteNotFoundException();
      }
    }

    const tag = new Tag({
      title,
      color,
      userId,
      noteId
    });

    await this.tagRepository.create(tag);

    return tag;
  }
}
