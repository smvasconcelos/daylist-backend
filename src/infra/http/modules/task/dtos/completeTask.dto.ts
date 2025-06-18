import { DayOfWeek } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

export class CompleteTaskBody {
  @IsOptional()
  @IsStringCustom()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @IsOptional()
  @IsStringCustom()
  timeOfDay?: string;
}
