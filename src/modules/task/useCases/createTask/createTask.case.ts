import { Injectable } from '@nestjs/common';
import { DayOfWeek, Recurrence } from '@prisma/client';
import { NoteNotFoundException } from 'src/modules/note/exceptions/NoteNotFound.exception';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { Task } from '../../entities/task';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskInvalidConfiguration } from '../../exceptions/invalidTaskConfiguration.exception';

interface CreateTaskRequest {
  title: string;
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
export class CreateTaskUseCase {
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
    timesOfDay
  }: CreateTaskRequest) {
    if (noteId) {
      const note = await this.noteRepository.findById(noteId);

      if (!note) {
        throw new NoteNotFoundException();
      }
    }

    // Can only set days of week when ocurrence is CUSTOM
    if (
      daysOfWeek &&
      Array.isArray(daysOfWeek) &&
      recurrenceType !== 'CUSTOM'
    ) {
      throw new TaskInvalidConfiguration();
    }

    const task = new Task({
      title,
      noteId,
      userId,
      durationMinutes,
      startDate,
      daysOfWeek,
      description,
      endDate,
      recurrenceType,
      timesOfDay
    });

    await this.taskRepository.create(task);

    return task;
  }
}
