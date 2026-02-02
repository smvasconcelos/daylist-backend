import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    const code = response.statusCode;

    return next.handle().pipe(
      map(data => ({
        success: true,
        code,
        data,
        timestamp: new Date().toISOString()
      }))
    );
  }
}

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  data: T;
  timestamp: string;
}