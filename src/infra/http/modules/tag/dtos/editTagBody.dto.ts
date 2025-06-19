import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

export class EditTagBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  title: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  color: string;

  @IsStringCustom()
  @IsOptional()
  noteId?: string;
}
