import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this.authService.getJwtToken()) {
      req = this.addToken(req, this.authService.getJwtToken());
    }

    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);

          return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token.token);
              return next.handle(this.addToken(req, token.token));
            }));

        } else {
          return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
              return next.handle(this.addToken(req, jwt));
            }));
        }
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
