import { Injectable } from '@nestjs/common';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { User } from 'src/modules/user/entities/User';
import { UserPayload } from '../../models/UserPayload.model';

interface SignInRequest {
  user: User;
}

export interface SignInResult {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) { }

  async execute({ user }: SignInRequest): Promise<SignInResult> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON()
    };

    const access_token = this.jwtService.sign(payload);

    const refresh_token = this.jwtService.sign<UserPayload>(payload, {
      secret: process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRE as JwtSignOptions['expiresIn'] ?? '7d'
    });

    return { access_token, refresh_token };
  }
}
