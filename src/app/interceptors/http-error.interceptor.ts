import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { responseCodes } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _toaster: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: err => {
          this.handleError(err);
        },
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    let message = error.error?.message || null;
    switch (error.status) {
      case responseCodes.BAD_REQUEST:
        {
          this._toaster.error(
            message ||
              'Oops! Looks like you may be missing some required information. Please check your entries and try again',
            'Bad Request'
          );
        }
        break;
      case responseCodes.INTERNAL_SERVER_ERROR:
        {
          this._toaster.error(
            message || 'Oops! Something went wrong on the server.',
            'Internal Server Error'
          );
        }
        break;
      case responseCodes.FORBIDDEN:
      case responseCodes.NOT_FOUND:
        {
          this._toaster.error(
            message || 'Oops! The requested resource could not be found.',
            'Not Found'
          );
        }
        break;
      default:
        {
          this._toaster.error(
            message ||
              'Oops! Something went wrong. Please contact support if the problem persists.',
            'Unidentified Error'
          );
        }
        break;
    }
  }
}
