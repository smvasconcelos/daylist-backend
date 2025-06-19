import { DayOfWeek, Recurrence } from '@prisma/client';
import {
  ArrayUnique,
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional
} from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

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

  @IsDate()
  startDate: Date;

  @IsDate()
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
