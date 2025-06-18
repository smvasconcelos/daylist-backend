import { DayOfWeek, Recurrence } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Replace } from 'src/global/utils/replace.util';
import { TaskOccurrence, TaskOccurrenceProps } from './taskOcurrence';

export interface TaskProps {
  title: string;
  description?: string;
  userId: string;
  noteId?: string | null;
  createdAt: Date;
  startDate?: Date | null;
  endDate?: Date;
  // Recurrence type === Custom
  daysOfWeek?: DayOfWeek[];
  // Times to repeat during the day
  timesOfDay?: string[];
  recurrenceType?: Recurrence;
  durationMinutes: number;
  // Checklist of occurences
  occurrences?: TaskOccurrenceProps[];
}

export type CalendarView = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export class Task {
  private props: TaskProps;
  private _id: string;

  constructor(props: Replace<TaskProps, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      title: props.title,
      durationMinutes: props.durationMinutes,
      startDate: props.startDate,
      daysOfWeek: props.daysOfWeek,
      description: props.description,
      endDate: props.endDate,
      timesOfDay: props.timesOfDay,
      recurrenceType: props.recurrenceType,
      userId: props.userId,
      noteId: props.noteId ?? null
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  get noteId(): string | null | undefined {
    return this.props.noteId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get userId(): string {
    return this.props.userId;
  }

  get startDate(): Date | undefined | null {
    return this.props.startDate;
  }

  get endDate(): Date | undefined {
    return this.props.endDate;
  }

  get timesOfDay(): string[] | undefined {
    return this.props.timesOfDay;
  }

  get recurrenceType(): Recurrence | undefined {
    return this.props.recurrenceType;
  }

  get durationMinutes(): number {
    return this.props.durationMinutes;
  }

  get daysOfWeek(): DayOfWeek[] | undefined {
    return this.props.daysOfWeek;
  }

  get occurrences(): TaskOccurrenceProps[] | undefined {
    return this.props.occurrences;
  }

  set daysOfWeek(daysOfWeek: DayOfWeek[] | undefined) {
    this.props.daysOfWeek = daysOfWeek;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set noteId(noteId: string | null | undefined) {
    this.props.noteId = noteId;
  }

  set durationMinutes(durationMinutes: number) {
    this.props.durationMinutes = durationMinutes;
  }

  set recurrenceType(recurrenceType: Recurrence | undefined) {
    this.props.recurrenceType = recurrenceType;
  }

  set timesOfDay(timesOfDay: string[] | undefined) {
    this.props.timesOfDay = timesOfDay;
  }

  set endDate(endDate: Date | undefined) {
    this.props.endDate = endDate;
  }

  set startDate(startDate: Date | undefined | null) {
    this.props.startDate = startDate;
  }

  set occurrences(occurrences: TaskOccurrence[]) {
    this.props.occurrences = occurrences;
  }
}
