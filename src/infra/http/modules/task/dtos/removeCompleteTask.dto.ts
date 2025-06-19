import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

export class RemoveCompleteTaskBody {
  @IsStringCustom()
  ocurrenceId: string;
}
