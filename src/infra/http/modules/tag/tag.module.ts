import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateTagUseCase } from 'src/modules/tag/useCases/createTag/createTag.case';
import { DeleteTagUseCase } from 'src/modules/tag/useCases/deleteTag/deleteTag.case';
import { EditTagUseCase } from 'src/modules/tag/useCases/editTag/editTag.case';
import { GetTagUseCase } from 'src/modules/tag/useCases/getTag/getTag.case';
import { GetManyTagUseCase } from 'src/modules/tag/useCases/getMany/getMany.case';
import { RemoveTagFromNoteUseCase } from 'src/modules/tag/useCases/removeFromNote/removeTagFromNoteUseCase.case';

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [
    CreateTagUseCase,
    DeleteTagUseCase,
    EditTagUseCase,
    GetTagUseCase,
    GetManyTagUseCase,
    RemoveTagFromNoteUseCase
  ]
})
export class TagModule {}
