import { JwtService } from '@nestjs/jwt';
import { makeUser } from 'src/modules/user/factories/user.factory';
import { UserPayload } from '../../models/UserPayload.model';
import { SignInUseCase } from './signIn.case';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sign in', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Should be able to create valid access_token', async () => {
    const user = makeUser({});

    const { access_token } = await signInUseCase.execute({
      user
    });

    const payload = jwtService.decode(access_token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
