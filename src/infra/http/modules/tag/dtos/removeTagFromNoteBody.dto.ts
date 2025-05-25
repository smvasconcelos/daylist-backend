import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

export class RemoveTagFromNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  noteId: string;
}
