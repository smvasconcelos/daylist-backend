import { Injectable } from '@nestjs/common';
import { Task } from 'src/modules/task/entities/task';
import { TaskRepository } from 'src/modules/task/repositories/task.repository';
import { PrismaTaskMapper } from '../mappers/prismaTask.mapper';
import { PrismaService } from '../prisma.service';
import { CreateTaskOcurrenceUseCaseProps } from 'src/modules/task/useCases/createTaskOcurrenceUseCase/createTaskOcurrenceUseCase.case';
import { PrismaTaskOccurrenceMapper } from '../mappers/prismaTaskOccurrence.mapper';
import { randomUUID } from 'crypto';
import { TaskOccurrence } from 'src/modules/task/entities/taskOcurrence';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(task: Task): Promise<void> {
    const taskRaw = PrismaTaskMapper.toPrisma(task);

    await this.prisma.task.create({
      data: taskRaw
    });
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        occurrences: true,
        user: true,
        note: true
      }
    });

    if (!task) return null;

    return PrismaTaskMapper.toDomain(task);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id }
    });
  }

  async removeFromNote(taskId: string, noteId: string): Promise<void> {
    await this.prisma.task.update({
      where: { id: taskId, noteId: noteId },
      data: {
        noteId: null
      }
    });
  }

  async save(task: Task): Promise<void> {
    const taskRaw = PrismaTaskMapper.toPrisma(task);

    await this.prisma.task.update({
      where: { id: taskRaw.id },
      data: taskRaw
    });
  }

  async createTaskOcurrence(
    props: CreateTaskOcurrenceUseCaseProps
  ): Promise<void> {
    const taskOcurrenceRaw = PrismaTaskOccurrenceMapper.toPrisma(
      new TaskOccurrence({
        ...props,
        id: randomUUID()
      })
    );

    await this.prisma.taskOccurrence.create({
      data: taskOcurrenceRaw
    });
  }

  async findMany(
    page: number,
    perPage: number,
    userId: string,
    search?: string
  ): Promise<{ tasks: Task[] | null; total: number }> {
    const tasks = await this.prisma.task.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      where: {
        userId,
        title: search ? { contains: search } : undefined
      },
      include: {
        occurrences: true,
        user: true,
        note: true
      },
      orderBy: { title: 'asc' }
    });

    const total = await this.prisma.task.count({
      where: {
        userId,
        title: search ? { contains: search } : undefined
      }
    });

    return {
      total,
      tasks: tasks.map(PrismaTaskMapper.toDomain)
    };
  }
}
