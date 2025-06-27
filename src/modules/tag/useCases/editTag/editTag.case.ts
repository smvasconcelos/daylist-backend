import { Injectable } from '@nestjs/common';
import { TagRepository } from '../../repositories/tag.repository';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';
import { TagInvalidColor } from '../../exceptions/invalidTagColor.exception';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { NoteNotFoundException } from 'src/modules/note/exceptions/NoteNotFound.exception';

interface EditTagRequest {
  title: string;
  color: string;
  noteId?: string;
  userId: string;
  tagId: string;
}

@Injectable()
export class EditTagUseCase {
  constructor(
    private tagRepository: TagRepository,
    private noteRepository: NoteRepository
  ) {}

  async execute({ color, tagId, title, userId, noteId }: EditTagRequest) {
    const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(color);

    if (!isValidHex) {
      throw new TagInvalidColor();
    }

    const tag = await this.tagRepository.findById(tagId);

    if (!tag) throw new TagNotFoundException();

    if (noteId) {
      const note = await this.noteRepository.findById(noteId);

      if (!note) {
        throw new NoteNotFoundException();
      }
    }

    if (tag.userId !== userId)
      throw new TagWithoutPermissionException({
        actionName: 'edit'
      });

    tag.color = color;
    tag.title = title;
    tag.noteId = noteId;

    await this.tagRepository.save(tag);

    return tag;
  }
}
