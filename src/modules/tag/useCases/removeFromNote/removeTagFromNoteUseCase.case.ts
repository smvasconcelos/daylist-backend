import { Injectable } from '@nestjs/common';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';
import { TagRepository } from '../../repositories/tag.repository';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { NoteNotFoundException } from 'src/modules/note/exceptions/NoteNotFound.exception';

interface RemoveFromNoteRequest {
  tagId: string;
  userId: string;
  noteId: string;
}

@Injectable()
export class RemoveTagFromNoteUseCase {
  constructor(
    private tagRepository: TagRepository,
    private noteRepository: NoteRepository
  ) {}

  async execute({ tagId, userId, noteId }: RemoveFromNoteRequest) {
    const tag = await this.tagRepository.findById(tagId);

    if (!tag) throw new TagNotFoundException();

    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NoteNotFoundException();
    }

    if (tag.userId !== userId)
      throw new TagWithoutPermissionException({
        actionName: 'remove-from-note'
      });

    return await this.tagRepository.removeFromNote(tagId, noteId);
  }
}
