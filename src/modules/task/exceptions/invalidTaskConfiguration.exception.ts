import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/global/exceptions/app.exception';

export class TaskInvalidConfiguration extends AppException {
  constructor() {
    super({
      message:
        'Configuração de task invalida, para configurar os dias da semana, as ocorrencias devem ser do tipo CUSTOM',
      status: HttpStatus.NOT_ACCEPTABLE
    });
  }
}
