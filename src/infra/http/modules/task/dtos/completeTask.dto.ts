import { IsEnum, IsOptional } from 'class-validator';
import { DayOfWeek } from 'prisma/generated/client';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class CompleteTaskBody {
  @IsOptional()
  @IsStringCustom()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @IsOptional()
  @IsStringCustom()
  timeOfDay?: string;
}
