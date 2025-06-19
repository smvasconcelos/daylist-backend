import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/global/exceptions/app.exception';

interface TagWithoutPermissionExceptionProps {
  actionName: string;
}

export class TagWithoutPermissionException extends AppException {
  constructor({ actionName }: TagWithoutPermissionExceptionProps) {
    super({
      message: `Sem permissão para ${actionName} tag`,
      status: HttpStatus.UNAUTHORIZED
    });
  }
}
