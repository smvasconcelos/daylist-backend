import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { NoteRepository } from '../../repositories/note.repository';
import { NoteNotFoundException } from '../../exceptions/noteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermission.exception';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: DeleteNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (note.userId !== userId)
      throw new NoteWithoutPermissionException({
        actionName: 'deletar'
      });

    await this.noteRepository.delete(noteId);
  }
}
