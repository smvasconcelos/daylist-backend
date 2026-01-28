import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { DayOfWeek, Recurrence } from 'prisma/generated/client';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class CreateTaskBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  title: string;

  @IsStringCustom()
  @IsOptional()
  description: string;

  @IsNotEmptyCustom()
  @IsNumber()
  durationMinutes: number;

  @IsStringCustom()
  @IsOptional()
  noteId?: string;

  @IsString()
  startDate: Date;

  @IsString()
  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsEnum(DayOfWeek, { each: true })
  daysOfWeek?: DayOfWeek[];

  @IsArray()
  @IsOptional()
  timesOfDay?: string[];

  @IsOptional()
  @IsEnum(Recurrence)
  recurrenceType?: Recurrence;
}
