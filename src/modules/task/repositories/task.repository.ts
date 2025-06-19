import { Task } from '../entities/task';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>;
  abstract findById(id: string): Promise<Task | null>;
  abstract delete(id: string): Promise<void>;
  abstract removeFromNote(taskId: string, noteId: string): Promise<void>;
  abstract save(task: Task): Promise<void>;
  abstract findMany(
    page: number,
    perPage: number,
    userId: string,
    search?: string
  ): Promise<{
    tasks: Task[] | null;
    total: number;
  }>;
}
