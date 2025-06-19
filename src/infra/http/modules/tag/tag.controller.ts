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
import { TagViewModel } from './viewModels/tagView.model';
import { CreateTagUseCase } from 'src/modules/tag/useCases/createTag/createTag.case';
import { DeleteTagUseCase } from 'src/modules/tag/useCases/deleteTag/deleteTag.case';
import { EditTagUseCase } from 'src/modules/tag/useCases/editTag/editTag.case';
import { GetTagUseCase } from 'src/modules/tag/useCases/getTag/getTag.case';
import { GetManyTagUseCase } from 'src/modules/tag/useCases/getMany/getMany.case';
import { CreateTagBody } from './dtos/createTagBody.dto';
import { EditTagBody } from './dtos/editTagBody.dto';
import { RemoveTagFromNoteUseCase } from 'src/modules/tag/useCases/removeFromNote/RemoveTagFromNoteUseCase.case';
import { RemoveTagFromNoteBody } from './dtos/removeTagFromNoteBody.dto';

@Controller('tags')
export class TagController {
  constructor(
    private createTagUseCase: CreateTagUseCase,
    private deleteTagUseCase: DeleteTagUseCase,
    private editTagUseCase: EditTagUseCase,
    private getTagUseCase: GetTagUseCase,
    private getManyTagUseCase: GetManyTagUseCase,
    private removeFromNote: RemoveTagFromNoteUseCase
  ) {}

  @Post()
  async createTag(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateTagBody
  ) {
    const { title, color, noteId } = body;

    const user = await this.createTagUseCase.execute({
      title,
      color,
      noteId,
      userId: request.user.id
    });

    return TagViewModel.toHtpp(user);
  }

  @Delete(':id')
  async deleteTag(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') tagId: string
  ) {
    await this.deleteTagUseCase.execute({
      tagId,
      userId: request.user.id
    });
  }

  @Patch(':id/remove-from-note')
  async deleteFromNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') tagId: string,
    @Body() body: RemoveTagFromNoteBody
  ) {
    await this.removeFromNote.execute({
      tagId,
      userId: request.user.id,
      noteId: body.noteId
    });
  }

  @Put(':id')
  async editTag(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') tagId: string,
    @Body() body: EditTagBody
  ) {
    const { title, color, noteId } = body;

    await this.editTagUseCase.execute({
      title,
      color,
      noteId,
      tagId,
      userId: request.user.id
    });
  }

  @Get(':id')
  async getTag(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') tagId: string
  ) {
    const user = await this.getTagUseCase.execute({
      tagId,
      userId: request.user.id
    });

    return TagViewModel.toHtpp(user);
  }

  @Get()
  async getManyTag(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('noteId') noteId: string,
    @Query('search') search: string
  ) {
    const { tags, total } = await this.getManyTagUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
      noteId,
      search
    });

    return tags
      ? {
          total,
          tags: tags.map(TagViewModel.toHtpp)
        }
      : null;
  }
}
