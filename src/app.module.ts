import 'dotenv/config'
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/JwtAuth.guard';
import { NoteModule } from './infra/http/modules/note/note.module';
import { TagModule } from './infra/http/modules/tag/tag.module';
import { TaskModule } from './infra/http/modules/task/task.module';
import { UserModule } from './infra/http/modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    NoteModule,
    TagModule,
    TaskModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule { }
