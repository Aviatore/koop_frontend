import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {RefreshTokenService} from '../refresh-token.service';
import {RoutingStateService} from '../routing-state.service';
import {Router} from '@angular/router';

@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  constructor(private refreshToken: RefreshTokenService,
              private routeState: RoutingStateService,
              private router: Router){}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {

      this.router.navigateByUrl(`login`);
      return of(err.message);

/*      if (localStorage.getItem('token') === '') {
        this.router.navigateByUrl(`login`);
        return of(err.message);
      }*/
    }

    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(req).pipe(
      tap(p => console.log(p)),
      catchError(p => this.handleAuthError(p))
    );
  }
}
