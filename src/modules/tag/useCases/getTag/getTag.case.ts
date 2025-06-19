import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { TagRepository } from '../../repositories/tag.repository';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';

interface GetTagRequest {
  tagId: string;
  userId: string;
}

@Injectable()
export class GetTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute({ tagId, userId }: GetTagRequest) {
    const tag = await this.tagRepository.findById(tagId);

    if (!tag) throw new TagNotFoundException();

    if (tag.userId !== userId)
      throw new TagWithoutPermissionException({
        actionName: 'view'
      });

    return tag;
  }
}
