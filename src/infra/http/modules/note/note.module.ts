import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNote/createNote.case';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNote/deleteNote.case';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNote/editNote.case';
import { GetManyNoteUseCase } from 'src/modules/note/useCases/getMany/getMany.case';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNote/getNote.case';

@Module({
  imports: [DatabaseModule],
  controllers: [NoteController],
  providers: [
    CreateNoteUseCase,
    DeleteNoteUseCase,
    EditNoteUseCase,
    GetNoteUseCase,
    GetManyNoteUseCase
  ]
})
export class NoteModule {}
