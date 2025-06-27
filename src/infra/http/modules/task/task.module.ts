import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateTaskUseCase } from 'src/modules/task/useCases/createTask/createTask.case';
import { DeleteTaskUseCase } from 'src/modules/task/useCases/deleteTask/deleteTask.case';
import { EditTaskUseCase } from 'src/modules/task/useCases/editTask/editTask.case';
import { GetTaskUseCase } from 'src/modules/task/useCases/getTask/getTask.case';
import { GetManyTaskUseCase } from 'src/modules/task/useCases/getMany/getMany.case';
import { RemoveTaskFromNoteUseCase } from 'src/modules/task/useCases/removeFromNote/removeTaskFromNoteUseCase.case';
import { TaskController } from './task.controller';
import { CreateTaskOcurrenceUseCase } from 'src/modules/task/useCases/createTaskOcurrenceUseCase/createTaskOcurrenceUseCase.case';
import { GetTaskCalendarUseCase } from 'src/modules/task/useCases/getTaskCalendar/getTaskCalendar.case';
import { DeleteTaskOcurrenceUseCase } from 'src/modules/task/useCases/deleteTaskOcurrenceUseCase/deleteTaskOcurrenceUseCase.case';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    EditTaskUseCase,
    GetTaskUseCase,
    GetManyTaskUseCase,
    RemoveTaskFromNoteUseCase,
    CreateTaskOcurrenceUseCase,
    GetTaskCalendarUseCase,
    DeleteTaskOcurrenceUseCase
  ]
})
export class TaskModule {}
