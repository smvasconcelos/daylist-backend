import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/global/exceptions/app.exception';

export class TagNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Tag não encontrada',
      status: HttpStatus.NOT_FOUND
    });
  }
}
