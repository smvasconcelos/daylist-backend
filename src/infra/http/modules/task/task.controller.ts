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
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequest.model';
import { TaskViewModel } from './viewModels/taskView.model';
import { CreateTaskUseCase } from 'src/modules/task/useCases/createTask/createTask.case';
import { DeleteTaskUseCase } from 'src/modules/task/useCases/deleteTask/deleteTask.case';
import { EditTaskUseCase } from 'src/modules/task/useCases/editTask/editTask.case';
import { GetTaskUseCase } from 'src/modules/task/useCases/getTask/getTask.case';
import { GetManyTaskUseCase } from 'src/modules/task/useCases/getMany/getMany.case';
import { CreateTaskBody } from './dtos/createTaskBody.dto';
import { RemoveTaskFromNoteUseCase } from 'src/modules/task/useCases/removeFromNote/RemoveTaskFromNoteUseCase.case';
import { RemoveTaskFromNoteBody } from './dtos/removeTaskFromNoteBody.dto';
import { EditTaskBody } from './dtos/editTaskBody.dto';

@Controller('task')
export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private editTaskUseCase: EditTaskUseCase,
    private getTaskUseCase: GetTaskUseCase,
    private getManyTaskUseCase: GetManyTaskUseCase,
    private removeFromNote: RemoveTaskFromNoteUseCase
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
    await this.deleteTaskUseCase.execute({
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
    await this.removeFromNote.execute({
      taskId,
      userId: request.user.id,
      noteId: body.noteId
    });
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

    await this.editTaskUseCase.execute({
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
    @Query('search') search: string
  ) {
    const { tasks, total } = await this.getManyTaskUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
      search
    });

    return tasks
      ? {
          total,
          tasks: tasks.map(TaskViewModel.toHtpp)
        }
      : null;
  }
}
