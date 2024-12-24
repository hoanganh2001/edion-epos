import { catchError, from, lastValueFrom, Observable, throwError } from 'rxjs';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseCodeEnum } from '../enums/response-code.enums';
import { AuthService } from './auth.service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    return await lastValueFrom(
      next.handle(req).pipe(
        catchError((error) => {
          // Catch "401 Unauthorized" responses
          if (
            error instanceof HttpErrorResponse &&
            error.status === ResponseCodeEnum.UNAUTHORIZED
          ) {
            // Sign out
            this._authService.logout();

            // Reload the app
            location.reload();
          }

          return throwError(error);
        })
      )
    );
  }
}
