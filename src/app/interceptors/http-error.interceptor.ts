import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../config/config';
import { noop } from 'lodash';

const RESPONSE_CODE = config.responseCodes;
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _toaster: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }

    return next.handle(req).pipe(
      tap(noop, err => {
        this.handleError(err);
      })
    );
  }

  // eslint-disable-next-line complexity
  handleError(error: HttpErrorResponse) {
    let message = error.error?.message || null;
    switch (error.status) {
      case RESPONSE_CODE.BAD_REQUEST:
        {
          this._toaster.error(
            message || 'Oops! Looks like you may be missing some required information. Please check your entries and try again',
            'Bad Request'
          );
        }
        break;
      case RESPONSE_CODE.INTERNAL_SERVER_ERROR:
        {
          this._toaster.error(message || 'Oops! Something went wrong on the server.', 'Internal Server Error');
        }
        break;
      case RESPONSE_CODE.FORBIDDEN:
      case RESPONSE_CODE.UNAUTHORISED:
        {
          this._router.navigate(['/unauthorised']);
        }
        break;
      case RESPONSE_CODE.NOT_FOUND:
        {
          this._toaster.error(message || 'Oops! The requested resource could not be found.', 'Not Found');
        }
        break;
      default:
        {
          this._toaster.error(
            message || 'Oops! Something went wrong. Please contact support if the problem persists.',
            'Unidentified Error'
          );
        }
        break;
    }
  }
}
