import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class RemoveCompleteTaskBody {
  @IsStringCustom()
  ocurrenceId: string;
}
