import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RefreshTokenService} from '../refresh-token.service';
import {RoutingStateService} from '../routing-state.service';

@Injectable()
export class UnauthorizeInterceptor implements HttpInterceptor {
  constructor(private refreshToken: RefreshTokenService,
              private routeState: RoutingStateService,
              private router: Router){}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log(`Token refresh, err code: ${err.status}`);
    if (err.status === 401 || err.status === 403) {
      console.log('Err code is 401');
      this.routeState.loadRouting();

      this.refreshToken.RefreshToken();
      /*if (this.refreshToken.result) {
        this.router.navigateByUrl(this.routeState.getPreviousUrl());
      }*/
    }
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.headers);
    req = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        AccessControlAllowOrigin: '*'
      })
    });

    return next.handle(req).pipe(
      catchError(p => this.handleAuthError(p))
    );
  }
}
