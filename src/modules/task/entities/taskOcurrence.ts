import { randomUUID } from 'crypto';
import { DayOfWeek, Recurrence } from 'prisma/generated/client';
import { Replace } from 'src/global/utils/replace.util';

export interface TaskOccurrenceProps {
  taskId: string;
  checkedAt: Date;
  recurrenceType: Recurrence;
  dayOfWeek?: DayOfWeek | null;
  startDate: Date;
  endDate?: Date | null;
  timeOfDay?: string | null;
}

export class TaskOccurrence {
  private props: TaskOccurrenceProps;
  private _id: string;

  constructor(
    props: Replace<TaskOccurrenceProps, { checkedAt?: Date }>,
    id?: string
  ) {
    this.props = {
      ...props,
      checkedAt: props.checkedAt ?? new Date()
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get taskId(): string {
    return this.props.taskId;
  }

  get dayOfWeek(): DayOfWeek | null | undefined {
    return this.props.dayOfWeek;
  }

  get checkedAt(): Date {
    return this.props.checkedAt;
  }

  get timeOfDay(): string | null | undefined {
    return this.props.timeOfDay;
  }

  get recurrenceType(): Recurrence {
    return this.props.recurrenceType;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date | undefined | null {
    return this.props.endDate;
  }

  set id(id: string) {
    this._id = id;
  }

  set taskId(taskId: string) {
    this.props.taskId = taskId;
  }

  set startDate(startDate: Date) {
    this.props.startDate = startDate;
  }

  set endDate(endDate: Date) {
    this.props.endDate = endDate;
  }

  set recurrenceType(recurrenceType: Recurrence) {
    this.props.recurrenceType = recurrenceType;
  }

  set timeOfDay(timeOfDay: string | undefined) {
    this.props.timeOfDay = timeOfDay;
  }

  set checkedAt(checkedAt: Date) {
    this.props.checkedAt = checkedAt;
  }
}
