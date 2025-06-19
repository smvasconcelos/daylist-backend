import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request
} from '@nestjs/common';
import { CalendarView } from 'src/modules/task/entities/task';
import { CreateTaskUseCase } from 'src/modules/task/useCases/createTask/createTask.case';
import { CreateTaskOcurrenceUseCase } from 'src/modules/task/useCases/createTaskOcurrenceUseCase/createTaskOcurrenceUseCase.case';
import { DeleteTaskUseCase } from 'src/modules/task/useCases/deleteTask/deleteTask.case';
import { DeleteTaskOcurrenceUseCase } from 'src/modules/task/useCases/deleteTaskOcurrenceUseCase/deleteTaskOcurrenceUseCase.case';
import { EditTaskUseCase } from 'src/modules/task/useCases/editTask/editTask.case';
import { GetManyTaskUseCase } from 'src/modules/task/useCases/getMany/getMany.case';
import { GetTaskUseCase } from 'src/modules/task/useCases/getTask/getTask.case';
import { GetTaskCalendarUseCase } from 'src/modules/task/useCases/getTaskCalendar/getTaskCalendar.case';
import { RemoveTaskFromNoteUseCase } from 'src/modules/task/useCases/removeFromNote/RemoveTaskFromNoteUseCase.case';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequest.model';
import { CompleteTaskBody } from './dtos/completeTask.dto';
import { CreateTaskBody } from './dtos/createTaskBody.dto';
import { EditTaskBody } from './dtos/editTaskBody.dto';
import { RemoveCompleteTaskBody } from './dtos/removeCompleteTask.dto';
import { RemoveTaskFromNoteBody } from './dtos/removeTaskFromNoteBody.dto';
import { TaskViewModel } from './viewModels/taskView.model';

@Controller('task')
export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private editTaskUseCase: EditTaskUseCase,
    private getTaskUseCase: GetTaskUseCase,
    private getManyTaskUseCase: GetManyTaskUseCase,
    private removeFromNote: RemoveTaskFromNoteUseCase,
    private createTaskOcurrenceUseCase: CreateTaskOcurrenceUseCase,
    private deleteTaskOcurrenceUseCase: DeleteTaskOcurrenceUseCase,
    private getTaskCalendarUseCase: GetTaskCalendarUseCase
  ) {}

  @Post()
  async createTask(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateTaskBody
  ) {
    const {
      description,
      durationMinutes,
      startDate,
      title,
      daysOfWeek,
      endDate,
      noteId,
      recurrenceType,
      timesOfDay
    } = body;

    const user = await this.createTaskUseCase.execute({
      description,
      durationMinutes,
      startDate,
      title,
      daysOfWeek,
      endDate,
      noteId,
      recurrenceType,
      timesOfDay,
      userId: request.user.id
    });

    return TaskViewModel.toHtpp(user);
  }

  @Delete(':id')
  async deleteTask(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') taskId: string
  ) {
    return await this.deleteTaskUseCase.execute({
      taskId,
      userId: request.user.id
    });
  }

  @Patch(':id/remove-from-note')
  async deleteFromNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') taskId: string,
    @Body() body: RemoveTaskFromNoteBody
  ) {
    return await this.removeFromNote.execute({
      taskId,
      userId: request.user.id,
      noteId: body.noteId
    });
  }

  @Put(':id/complete-task')
  async completeTask(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') taskId: string,
    @Body() body: CompleteTaskBody
  ) {
    return this.createTaskOcurrenceUseCase.execute({
      ...body,
      userId: request.user.id,
      taskId: taskId
    });
  }

  @Put(':id/remove-complete-task')
  async removeCompleteTask(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') taskId: string,
    @Body() body: RemoveCompleteTaskBody
  ) {
    return this.deleteTaskOcurrenceUseCase.execute({
      ...body,
      userId: request.user.id,
      taskId: taskId
    });
  }

  @Get('get-calendar-view')
  async getCalendarView(
    @Request() request: AuthenticatedRequestModel,
    @Query('calendarView') calendarView?: CalendarView,
    @Query('date') date?: Date
  ) {
    const response = await this.getTaskCalendarUseCase.execute({
      userId: request.user.id,
      calendarView: calendarView ?? 'DAILY',
      date: date ?? new Date()
    });

    return {
      weekly: response.weekly
        ? response.weekly.map(TaskViewModel.toHtpp)
        : null,
      monthly: response.monthly
        ? response.monthly.map(item => item.map(TaskViewModel.toHtpp))
        : null,
      daily: response.daily ? response.daily.map(TaskViewModel.toHtpp) : null
    };
  }

  @Put(':id')
  async editTask(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') taskId: string,
    @Body() body: EditTaskBody
  ) {
    const {
      description,
      durationMinutes,
      startDate,
      title,
      daysOfWeek,
      endDate,
      noteId,
      recurrenceType,
      timesOfDay
    } = body;

    return await this.editTaskUseCase.execute({
      description,
      durationMinutes,
      startDate,
      id: taskId,
      title,
      daysOfWeek,
      endDate,
      noteId,
      recurrenceType,
      timesOfDay,
      userId: request.user.id
    });
  }

  @Get(':id')
  async getTask(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') taskId: string
  ) {
    const user = await this.getTaskUseCase.execute({
      taskId,
      userId: request.user.id
    });

    return TaskViewModel.toHtpp(user);
  }

  @Get()
  async getManyTask(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search?: string,
    @Query('noteId') noteId?: string
  ) {
    const { tasks, total } = await this.getManyTaskUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
      search: search ?? '',
      noteId
    });

    return tasks
      ? {
          total,
          tasks: tasks.map(TaskViewModel.toHtpp)
        }
      : null;
  }
}
