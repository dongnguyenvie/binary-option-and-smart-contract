import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, of, Subject, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigInterceptor implements HttpInterceptor {
  ERROR_MESSAGE_TOKEN = 'invalid_token';
  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/api/')) {
      const contentType = req.headers.get('Content-Type');
      const token = this.accountService.getToken();
      req = req.clone({
        headers: new HttpHeaders({
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
          ...(contentType === 'multipart'
            ? {}
            : {
                'Content-Type': !contentType
                  ? 'application/json; charset=utf-8'
                  : contentType,
              }),
        }),
      });
      return next.handle(req).pipe(
        catchError(error => {
          return this.handleResponseError(error, req, next) as Observable<any>;
        }),
      );
    }
    return next.handle(req);
  }

  refreshToken() {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(data => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      const refresh_token = this.accountService.getRefreshToken();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa('hh-ecommerce:1'),
        }),
      };
      return this.http.post('', httpOptions).pipe(
        map(data => data),
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next(null);
        }),
        catchError(err => {
          this.refreshTokenInProgress = false;
          this.logout();
          return of(null);
        }),
      );
    }
  }

  handleResponseError(error: any, request?: any, next?: any): any {
    // Business error
    if (error.status === 400) {
      // Show message
    }
    // Invalid token error
    else if (
      error.status === 401 &&
      error.error.error === this.ERROR_MESSAGE_TOKEN
    ) {
      return this.refreshToken().pipe(
        switchMap(() => {
          request = this.addAuthHeader(request);
          return next.handle(request);
        }),
        catchError((e: any) => {
          if (e.status !== 401) {
            return this.handleResponseError(e);
          } else {
            this.logout();
          }
        }),
      );
    }
    // Access denied error
    else if (error.status === 403) {
      // Show message
      // Logout
      this.logout();
    }
    // Server error
    else if (error.status === 500) {
      // Show message
    }
    // Maintenance error
    else if (error.status === 503) {
      // Show message
      // Redirect to the maintenance page
    }
    return throwError(error);
  }
  addAuthHeader(request: any): any {
    const contentType = request.headers.get('content-type');
    const token = this.accountService.getToken();
    request = request.clone({
      headers: new HttpHeaders({
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        'Content-Type': !contentType
          ? 'application/json; charset=utf-8'
          : contentType,
      }),
    });
    return request;
  }

  logout() {
    this.accountService.logout();
  }
}
