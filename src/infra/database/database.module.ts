import { Module } from '@nestjs/common';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { TagRepository } from 'src/modules/tag/repositories/tag.repository';
import { TaskRepository } from 'src/modules/task/repositories/task.repository';
import { UserRepository } from 'src/modules/user/repositories/User.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNoteRepository } from './prisma/repositories/PrismaNote.repository';
import { PrismaTagRepository } from './prisma/repositories/PrismaTag.repository';
import { PrismaTaskRepository } from './prisma/repositories/PrismaTask.repository';
import { PrismaUserRepository } from './prisma/repositories/PrismaUser.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository
    },
    {
      provide: TagRepository,
      useClass: PrismaTagRepository
    },
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository
    }
  ],
  exports: [UserRepository, NoteRepository, TagRepository, TaskRepository]
})
export class DatabaseModule { }
