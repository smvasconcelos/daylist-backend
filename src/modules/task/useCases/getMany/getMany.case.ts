import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/task.repository';

interface GetManyTaskRequest {
  userId: string;
  page?: string;
  perPage?: string;
  search?: string;
  noteId?: string;
}

@Injectable()
export class GetManyTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ userId, page, perPage, search, noteId }: GetManyTaskRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    return await this.taskRepository.findMany(
      currentPage,
      currentPerPage,
      userId,
      search,
      noteId
    );
  }
}
