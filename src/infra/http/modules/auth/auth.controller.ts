import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RefreshTokenUseCase } from '../../../../modules/auth/useCases/refreshToken/refreshToken.case';
import { SignInUseCase } from '../../../../modules/auth/useCases/signIn/signIn.case';
import { Public } from './decorators/IsPublic';
import { LocalAuthGuard } from './guards/LocalAuth.guard';
import { AuthRequestModel } from './models/authRequest.model';

const REFRESH_TOKEN_COOKIE = 'refresh_token';
const COOKIE_MAX_AGE_DAYS = 7 * 24 * 60 * 60;

function cookieOptions(res: Response): { httpOnly: boolean; secure: boolean; sameSite: 'lax' | 'strict'; path: string; maxAge: number } {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE_DAYS
  };
}

@Controller()
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase
  ) { }

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() request: AuthRequestModel, @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token } = await this.signInUseCase.execute({
      user: request.user
    });

    res.cookie(REFRESH_TOKEN_COOKIE, refresh_token, cookieOptions(res));

    return { access_token };
  }

  @Get('auth/refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];
    const { access_token } = this.refreshTokenUseCase.execute(refreshToken ?? '');
    return { access_token };
  }

  @Post('auth/logout')
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(REFRESH_TOKEN_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
  }
}
