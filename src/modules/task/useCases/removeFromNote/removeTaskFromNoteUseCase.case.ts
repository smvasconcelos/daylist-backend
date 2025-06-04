import { Injectable } from '@nestjs/common';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { TaskRepository } from '../../repositories/task.repository';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { NoteNotFoundException } from 'src/modules/note/exceptions/noteNotFound.exception';

interface CreateTaskOcurrenceRequest {
  taskId: string;
  userId: string;
  noteId: string;
}

@Injectable()
export class RemoveTaskFromNoteUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private noteRepository: NoteRepository
  ) {}

  async execute({ taskId, userId, noteId }: CreateTaskOcurrenceRequest) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) throw new TaskNotFoundException();

    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NoteNotFoundException();
    }

    if (task.userId !== userId)
      throw new TaskWithoutPermissionException({
        actionName: 'remove-from-note'
      });

    await this.taskRepository.removeFromNote(taskId, noteId);
  }
}
