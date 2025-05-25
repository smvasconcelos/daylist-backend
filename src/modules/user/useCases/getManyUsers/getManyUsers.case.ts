import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

export interface GetManyUsersRequest {
  perPage: string;
  page: string;
}

@Injectable()
export class GetManyUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ page, perPage }: GetManyUsersRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    return await this.userRepository.getManyUsers(currentPage, currentPerPage);
  }
}
