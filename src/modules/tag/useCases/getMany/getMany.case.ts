import { Injectable } from '@nestjs/common';
import { TagRepository } from '../../repositories/tag.repository';

interface GetManyTagRequest {
  userId: string;
  page?: string;
  perPage?: string;
  noteId?: string;
  search?: string;
}

@Injectable()
export class GetManyTagUseCase {
  constructor(private noteRepository: TagRepository) {}

  async execute({ userId, page, perPage, noteId, search }: GetManyTagRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    return await this.noteRepository.findMany(
      currentPage,
      currentPerPage,
      userId,
      noteId,
      search
    );
  }
}
