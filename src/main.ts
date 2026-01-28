import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { IncorrectValuesException } from './global/exceptions/IncorrectValues.exception';
import { ResponseInterceptor } from './global/interceptors/response.interceptor';
import { mapperClassValidationErrorToAppException } from './global/utils/mappers.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]) {
        throw new IncorrectValuesException({
          fields: mapperClassValidationErrorToAppException(errors)
        });
      }
    })
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
