import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/global/exceptions/app.exception';

interface TaskWithoutPermissionExceptionProps {
  actionName: string;
}

export class TaskWithoutPermissionException extends AppException {
  constructor({ actionName }: TaskWithoutPermissionExceptionProps) {
    super({
      message: `Sem permissão para ${actionName} task`,
      status: HttpStatus.UNAUTHORIZED
    });
  }
}
