import { Replace } from 'src/global/utils/replace.util';
import { randomUUID } from 'crypto';
import { Tag } from 'src/modules/tag/entities/tag';
import { Task } from 'src/modules/task/entities/task';

interface NoteProps {
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  tags?: Tag[] | null;
  tasks?: Task[] | null;
}

export class Note {
  private props: NoteProps;
  private _id: string;

  constructor(
    props: Replace<
      NoteProps,
      { createdAt?: Date; description?: string | null }
    >,
    id?: string
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      description: props.description ?? null
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get tags(): Tag[] | null | undefined {
    return this.props.tags;
  }

  get tasks() {
    return this.props.tasks;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  set tags(tags: Tag[] | null | undefined) {
    this.props.tags = tags;
  }

  set tasks(tasks: Task[] | null | undefined) {
    this.props.tasks = tasks;
  }
}
