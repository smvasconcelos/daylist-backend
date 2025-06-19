import { Injectable } from '@nestjs/common';
import { DayOfWeek, Recurrence } from '@prisma/client';
import { NoteNotFoundException } from 'src/modules/note/exceptions/noteNotFound.exception';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { Task } from '../../entities/task';
import { TaskRepository } from '../../repositories/task.repository';

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
