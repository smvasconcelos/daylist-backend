import { Injectable } from '@nestjs/common';
import { TagNotFoundException } from '../../exceptions/tagNotFound.exception';
import { TagWithoutPermissionException } from '../../exceptions/tagWithoutPermission.exception';
import { TagRepository } from '../../repositories/tag.repository';

interface DeleteTagRequest {
  tagId: string;
  userId: string;
}

@Injectable()
export class DeleteTagUseCase {
  constructor(private tagRepository: TagRepository) {}

  async execute({ tagId, userId }: DeleteTagRequest) {
    const tag = await this.tagRepository.findById(tagId);

    if (!tag) throw new TagNotFoundException();

    if (tag.userId !== userId)
      throw new TagWithoutPermissionException({
        actionName: 'delete'
      });

    await this.tagRepository.delete(tagId);
  }
}
