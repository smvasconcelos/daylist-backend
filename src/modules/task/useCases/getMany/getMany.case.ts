import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/task.repository';

interface GetManyTaskRequest {
  userId: string;
  page?: string;
  perPage?: string;
  search?: string;
}

@Injectable()
export class GetManyTaskUseCase {
  constructor(private noteRepository: TaskRepository) {}

  async execute({ userId, page, perPage, search }: GetManyTaskRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    return await this.noteRepository.findMany(
      currentPage,
      currentPerPage,
      userId,
      search
    );
  }
}
