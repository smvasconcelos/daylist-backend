import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

export class RemoveTaskFromNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  noteId: string;
}
