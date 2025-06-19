import { Task } from '../entities/task';
import { TaskRepository } from './task.repository';

export class TaskRepositoryInMemory implements TaskRepository {
  public tasks: Task[] = [];

  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find(task => task.id === id);

    if (!task) return null;

    return task;
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  async save(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex(
      currentTask => currentTask.id === task.id
    );

    if (taskIndex >= 0) this.tasks[taskIndex] = task;
  }

  async findMany(
    page: number,
    perPage: number,
    userId: string,
    noteId?: string
  ): Promise<{ tasks: Task[]; total: number }> {
    if (noteId) {
      return {
        tasks: this.tasks
          .filter(task => task.noteId === noteId)
          .filter(task => task.userId === userId)
          .slice((page - 1) * perPage, page * perPage),
        total: this.tasks.length
      };
    }

    return {
      tasks: this.tasks
        .filter(task => task.userId === userId)
        .slice((page - 1) * perPage, page * perPage),
      total: this.tasks.length
    };
  }

  async removeFromNote(taskId: string, noteId: string): Promise<void> {
    this.tasks = this.tasks.filter(item => {
      return item.noteId !== item.noteId && item.id !== taskId;
    });
  }
}
