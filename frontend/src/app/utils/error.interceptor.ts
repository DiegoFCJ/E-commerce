import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ERRORS_CONSTANT } from '../constants/error.constant';
import { LoaderSpinnerService } from '../services/transfer-data/loader-spinner.service';
import { NotificationService } from '../services/transfer-data/notification.service';

/** A class to intercept Http calls and handle errors */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * The constructor of the class
   * @param {LoaderSpinnerService} loaderSpinnerService The Injectable of the LoaderSpinner service
   */
  constructor(
    private loaderSpinnerService: LoaderSpinnerService
  ) {}

  /**
   * Intercept the Http request and handle any errors.
   * If the error status code is >= 300, an error message is shown in a snackbar open for 2500 ms
   * @param {HttpRequest} request The Http request
   * @param {HttpHandler} next Handler of the Http request that transforms it into an HttpEvent stream
   * @returns {Observable<any>}
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (
          err.status >= 300 
        ) {
          NotificationService.showDynamicResponseAlert(err.error.message, ERRORS_CONSTANT.genericError, 8000);
          this.loaderSpinnerService.hide();
        }
        return request.url.includes('profile-image')
          ? EMPTY
          : throwError(err);
      })
    );
  }
}