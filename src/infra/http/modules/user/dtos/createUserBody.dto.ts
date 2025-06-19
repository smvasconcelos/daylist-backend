import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/minLengthCustom';

export class CreateUserBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsEmailCustom()
  email: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;
}
