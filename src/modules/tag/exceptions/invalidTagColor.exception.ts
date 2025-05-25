import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/global/exceptions/app.exception';

export class TagInvalidColor extends AppException {
  constructor() {
    super({
      message: 'Cor de tag invalida',
      status: HttpStatus.BAD_REQUEST
    });
  }
}
