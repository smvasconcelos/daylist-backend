import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/task.repository';
import { TaskNotFoundException } from '../../exceptions/taskNotFound.exception';
import { TaskWithoutPermissionException } from '../../exceptions/taskWithoutPermission.exception';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { NoteNotFoundException } from 'src/modules/note/exceptions/noteNotFound.exception';
import { DayOfWeek, Recurrence } from '@prisma/client';
import { Task } from '../../entities/task';

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

  async execute(taskToEdit: EditTaskRequest) {
    const task = await this.taskRepository.findById(taskToEdit.id);

    if (!task) throw new TaskNotFoundException();

    if (taskToEdit.noteId) {
      const note = await this.noteRepository.findById(taskToEdit.noteId);

      if (!note) {
        throw new NoteNotFoundException();
      }
    }

    if (task.userId !== taskToEdit.userId) {
      throw new TaskWithoutPermissionException({
        actionName: 'edit'
      });
    }

    await this.taskRepository.save(new Task(taskToEdit, taskToEdit.id));

    return task;
  }
}
