import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { SignInUseCase } from 'src/modules/auth/useCases/signIn/signIn.case';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUser/validateUser.case';
import { DatabaseModule } from '../../../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { SignInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRE) || '3600s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
})

export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn');
  }
}