import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prismaUser.repository';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { PrismaNoteRepository } from './prisma/repositories/prismaNote.repository';
import { TagRepository } from 'src/modules/tag/repositories/tag.repository';
import { PrismaTagRepository } from './prisma/repositories/prismaTag.repository';
import { TaskRepository } from 'src/modules/task/repositories/task.repository';
import { PrismaTaskRepository } from './prisma/repositories/prismaTask.repository';

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
export class DatabaseModule {}
