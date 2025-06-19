import { randomUUID } from 'crypto';
import { Replace } from 'src/global/utils/replace.util';
import { DayOfWeek, Recurrence } from '@prisma/client';

export interface TaskOccurrenceProps {
  id: string;
  taskId: string;
  checkedAt: Date;
  recurrenceType: Recurrence;
  dayOfWeek?: DayOfWeek | null;
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

  set taskId(taskId: string) {
    this.props.taskId = taskId;
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
