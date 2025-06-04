import { DayOfWeek, Recurrence } from '@prisma/client';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

export class CompleteTaskBody {
  @IsOptional()
  @IsStringCustom()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @IsOptional()
  @IsStringCustom()
  timeOfDay?: string;

  @IsStringCustom()
  @IsEnum(Recurrence)
  recurrenceType: Recurrence;
}
