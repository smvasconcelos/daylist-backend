import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DayOfWeek } from 'prisma/generated/client';
import { CalendarView, Task } from 'src/modules/task/entities/task';
import { TaskOccurrence } from 'src/modules/task/entities/taskOcurrence';
import { TaskRepository } from 'src/modules/task/repositories/task.repository';
import { CreateTaskOcurrenceUseCaseProps } from 'src/modules/task/useCases/createTaskOcurrenceUseCase/createTaskOcurrenceUseCase.case';
import { DeleteTaskOcurrenceUseCaseProps } from 'src/modules/task/useCases/deleteTaskOcurrenceUseCase/deleteTaskOcurrenceUseCase.case';
import { CalendarViewTask } from 'src/modules/task/useCases/getTaskCalendar/getTaskCalendar.case';
import { PrismaTaskMapper } from '../mappers/prismaTask.mapper';
import { PrismaTaskOccurrenceMapper } from '../mappers/prismaTaskOccurrence.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private prisma: PrismaService) { }

  async create(task: Task): Promise<void> {
    const taskRaw = PrismaTaskMapper.toPrisma(task);

    await this.prisma.task.create({
      data: taskRaw
    });
  }

  async getCalendarView(
    userId: string,
    calendarView: CalendarView,
    date: Date
  ): Promise<CalendarViewTask> {
    const getDayRange = (date: Date) => {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    };

    if (calendarView === 'DAILY') {
      const { start: startOfDay, end: endOfDay } = getDayRange(date);

      const dayOfWeek = date
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toUpperCase() as DayOfWeek;

      const taskCalendar = await this.prisma.task.findMany({
        where: {
          startDate: { lte: endOfDay },
          OR: [{ endDate: { gte: startOfDay } }, { endDate: null }],
          userId
        },
        include: {
          occurrences: {
            where: {
              startDate: { lte: endOfDay },
              OR: [
                { endDate: { gte: startOfDay } },
                { endDate: null },
                { dayOfWeek: dayOfWeek }
              ]
            }
          }
        }
      });

      return {
        daily: taskCalendar.map(PrismaTaskMapper.toDomain),
        weekly: null,
        monthly: null
      };
    }

    if (calendarView === 'WEEKLY') {
      const dayIndex = date.getDay();
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - dayIndex);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const taskCalendar = await this.prisma.task.findMany({
        where: {
          startDate: { lte: endOfWeek },
          OR: [{ endDate: { gte: startOfWeek } }, { endDate: null }],
          userId
        },
        include: {
          occurrences: {
            where: {
              startDate: { lte: endOfWeek },
              OR: [{ endDate: { gte: startOfWeek } }, { endDate: null }]
            }
          }
        }
      });

      return {
        daily: null,
        weekly: taskCalendar.map(PrismaTaskMapper.toDomain),
        monthly: null
      };
    }

    if (calendarView === 'MONTHLY') {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      firstDay.setHours(0, 0, 0, 0);
      lastDay.setHours(23, 59, 59, 999);

      const taskCalendar = await this.prisma.task.findMany({
        where: {
          startDate: { lte: lastDay },
          OR: [{ endDate: { gte: firstDay } }, { endDate: null }]
        },
        include: {
          occurrences: {
            where: {
              startDate: { lte: lastDay },
              OR: [{ endDate: { gte: firstDay } }, { endDate: null }]
            }
          }
        }
      });

      const parsedTasks = taskCalendar.map(PrismaTaskMapper.toDomain);

      const weeks: Task[][] = [];
      let weekStart = new Date(firstDay);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);

      while (weekStart <= lastDay) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const tasksInWeek = parsedTasks.filter(task => {
          const taskStart = new Date(task.startDate ?? new Date());
          const taskEnd = task.endDate ? new Date(task.endDate) : null;
          return taskStart <= weekEnd && (!taskEnd || taskEnd >= weekStart);
        });

        weeks.push(tasksInWeek);

        weekStart.setDate(weekStart.getDate() + 7);
      }

      return {
        daily: null,
        weekly: null,
        monthly: weeks
      };
    }

    return {
      daily: null,
      weekly: null,
      monthly: null
    };
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
      new TaskOccurrence(
        {
          recurrenceType: props.recurrenceType ?? 'NONE',
          startDate: props.startDate as Date,
          taskId: props.taskId,
          dayOfWeek: props.dayOfWeek,
          endDate: props.endDate
        },
        randomUUID()
      )
    );

    await this.prisma.taskOccurrence.create({
      data: taskOcurrenceRaw
    });
  }

  async deleteTaskOcurrence(
    props: DeleteTaskOcurrenceUseCaseProps
  ): Promise<void> {
    await this.prisma.taskOccurrence.delete({
      where: {
        id: props.ocurrenceId,
        taskId: props.taskId
      }
    });
  }

  async findMany(
    page: number,
    perPage: number,
    userId: string,
    search?: string,
    noteId?: string
  ): Promise<{ tasks: Task[] | null; total: number }> {
    const tasks = await this.prisma.task.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      where: {
        userId,
        noteId,
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
        noteId,
        title: search ? { contains: search } : undefined
      }
    });

    return {
      total,
      tasks: tasks.map(PrismaTaskMapper.toDomain)
    };
  }
}
