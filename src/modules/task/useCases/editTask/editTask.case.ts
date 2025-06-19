import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { NoteNotFoundException } from 'src/modules/note/exceptions/noteNotFound.exception';
import { DayOfWeek, Recurrence } from '@prisma/client';

interface EditTaskRequest {
  title: string;
  id: string;
  description?: string;
  userId: string;
  noteId?: string | null;
  startDate: Date;
  endDate?: Date;
  daysOfWeek?: DayOfWeek[];
  timesOfDay?: string[];
  recurrenceType?: Recurrence;
  durationMinutes: number;
}

@Injectable()
export class EditTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private noteRepository: NoteRepository
  ) {}

  async execute({
    title,
    noteId,
    userId,
    durationMinutes,
    startDate,
    daysOfWeek,
    description,
    endDate,
    recurrenceType,
    timesOfDay,
    id
  }: EditTaskRequest) {
    const task = await this.taskRepository.findById(id);

    if (!task) throw new TaskNotFoundException();

    if (noteId) {
      const note = await this.noteRepository.findById(noteId);

      if (!note) {
        throw new NoteNotFoundException();
      }
    }

    if (task.userId !== userId)
      throw new TaskWithoutPermissionException({
        actionName: 'edit'
      });

    task.title = title;
    task.noteId = noteId;

    await this.taskRepository.save(task);

    return task;
  }
}
