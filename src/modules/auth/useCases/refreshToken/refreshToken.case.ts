import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserPayload } from '../../models/UserPayload.model';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private jwtService: JwtService) { }

  execute(refreshToken: string | undefined): { access_token: string } {
    if (!refreshToken?.trim()) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const payload = this.jwtService.verify<UserPayload>(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET
    });

    const access_token = this.jwtService.sign<UserPayload>(
      {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
        createdAt: payload.createdAt
      },
      {
        expiresIn: (process.env.JWT_EXPIRE as JwtSignOptions['expiresIn']) ?? '5h'
      }
    );

    return { access_token };
  }
}
