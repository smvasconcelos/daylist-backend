import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prismaUser.repository';
import { NoteRepository } from 'src/modules/note/repositories/note.repository';
import { PrismaNoteRepository } from './prisma/repositories/prismaNote.repository';

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
    }
  ],
  exports: [UserRepository, NoteRepository]
})
export class DatabaseModule {}
