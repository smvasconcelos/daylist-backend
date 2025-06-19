import { Injectable } from '@nestjs/common';
import { Tag } from '../../entities/tag';
import { TagRepository } from '../../repositories/tag.repository';
import { TagInvalidColor } from '../../exceptions/invalidTagColor.exception';

interface CreateTagRequest {
  title: string;
  color: string;
  userId: string;
  noteId?: string;
}

@Injectable()
export class CreateTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute({ title, color, noteId, userId }: CreateTagRequest) {
    const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(color);

    if (!isValidHex) {
      throw new TagInvalidColor();
    }

    const tag = new Tag({
      title,
      color,
      userId,
      noteId
    });

    await this.tagRepository.create(tag);

    return tag;
  }
}
