import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RefreshTokenService} from '../services/refresh-token.service';
import {RoutingStateService} from '../services/routing-state.service';
import {LoginService} from '../services/login.service';
import {CountDownTokenService} from '../services/count-down-token.service';
import {RefTokenTimer, TokenTimer} from '../injection-tokens/tokens';
import {LoggerService} from '../services/logger.service';


@Injectable({
  providedIn: 'root'
})
export class UnauthorizeInterceptor implements HttpInterceptor {
  isActive = false;
  constructor(private refreshToken: RefreshTokenService,
              private routeState: RoutingStateService,
              private router: Router,
              private loginService: LoginService,
              private tokenT: CountDownTokenService,
              private refTokenT: CountDownTokenService,
              private logger: LoggerService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        TokenRefresh: localStorage.getItem('refresh_token') ?? ''
      })
    });

    // console.log(`Authorization header: ${req.headers.get('Authorization')}`);
    // console.log(`TokenRefresh header: ${req.headers.get('TokenRefresh')}`);

    return next.handle(req).pipe(
      retry(1),
      catchError(err => this.handleAuthError(err))
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (!this.isActive && (err.status === 401 || err.status === 403)) {
      this.isActive = true;
      this.routeState.loadRouting();

      console.log('JEDEN');

      console.log(...this.logger.info(`Refresh token before: ${localStorage.getItem('refresh_token')}`));
      return this.refreshToken.RefreshToken().pipe(
        switchMap(result => {
          console.log(...this.logger.info(`Response: ${result.body}`));

          const loginResponse = result.body;
          localStorage.setItem('token', loginResponse.token);
          localStorage.setItem('refresh_token', loginResponse.refreshT);

          this.tokenT.timeSeconds = loginResponse.tokenExp;
          this.refTokenT.timeSeconds = loginResponse.refTokenExp;

          console.log(...this.logger.info('Refresh success'));

          console.log(...this.logger.info(`Refresh token after: ${localStorage.getItem('refresh_token')}`));

          const redirectUrl = this.routeState.getPreviousUrl();
          console.log(...this.logger.info(`Redirect to ${redirectUrl}`));

          // Hack to reload the current page
          // Without it, the page after refreshing the token will be incomplete
          // this.router.navigateByUrl('/').then(() => this.router.navigateByUrl(redirectUrl));
          console.log('DWA');
          this.isActive = false;
          return of(err);
        })
      );
        /*.subscribe(
        result => {

        },
        error => {
          console.log(...this.logger.error(error));

          /!*localStorage.setItem('token', '');
          localStorage.setItem('refresh_token', '');*!/

          console.log(...this.logger.error('Refresh failed.'));

          this.loginService.loginResult = false;
          this.router.navigateByUrl(`login`);
          this.isActive = false;
        });*/
    }
    return throwError(err);
  }
}
