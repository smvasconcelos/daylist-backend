import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/global/exceptions/app.exception';

export class TaskNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Task não encontrada',
      status: HttpStatus.NOT_FOUND
    });
  }
}
