import { Replace } from 'src/global/utils/replace.util';
import { randomUUID } from 'crypto';
import { Note } from 'src/modules/note/entities/note';

interface TagProps {
  title: string;
  color: string;
  userId: string;
  noteId?: string | null;
  createdAt: Date;
}

export class Tag {
  private props: TagProps;
  private _id: string;

  constructor(
    props: Replace<TagProps, { createdAt?: Date; noteId?: string | null }>,
    id?: string
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      title: props.title,
      color: props.color,
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

  get color(): string {
    return this.props.color;
  }

  set color(color: string) {
    this.props.color = color;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set noteId(noteId: string | null | undefined) {
    this.props.noteId = noteId;
  }
}
