import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RefreshTokenService} from '../services/refresh-token.service';
import {RoutingStateService} from '../services/routing-state.service';
import {LoginService} from '../services/login.service';
import {CountDownTokenService} from '../services/count-down-token.service';
import {RefTokenTimer, TokenTimer} from '../injection-tokens/tokens';


@Injectable({
  providedIn: 'root'
})
export class UnauthorizeInterceptor implements HttpInterceptor {
  constructor(private refreshToken: RefreshTokenService,
              private routeState: RoutingStateService,
              private router: Router,
              private loginService: LoginService,
              private tokenT: CountDownTokenService,
              private refTokenT: CountDownTokenService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        TokenRefresh: localStorage.getItem('refresh_token') ?? ''
      })
    });

    console.log(`Authorization header: ${req.headers.get('Authorization')}`);
    console.log(`TokenRefresh header: ${req.headers.get('TokenRefresh')}`);

    return next.handle(req).pipe(
      catchError(err => this.handleAuthError(err))
    );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    console.log(`Token refresh, err code: ${err.status}`);
    if (err.status === 401 || err.status === 403) {
      this.routeState.loadRouting();

      console.log(`Refresh token before: ${localStorage.getItem('refresh_token')}`);
      this.refreshToken.RefreshToken().subscribe(
        result => {
          console.log(`Response: ${result.body}`);

          const loginResponse = result.body;
          localStorage.setItem('token', loginResponse.token);
          localStorage.setItem('refresh_token', loginResponse.refreshT);

          this.tokenT.timeSeconds = loginResponse.tokenExp;
          this.refTokenT.timeSeconds = loginResponse.refTokenExp;

          console.log('Refresh success.');

          console.log(`Refresh token after: ${localStorage.getItem('refresh_token')}`);

          const redirectUrl = this.routeState.getPreviousUrl();
          console.log(`Redirect to ${redirectUrl}`);

          // Hack to reload the current page
          // Without it, the page after refreshing the token will be incomplete
          this.router.navigateByUrl('/').then(() => this.router.navigateByUrl(redirectUrl));
        },
        error => {
          console.log(error);

          localStorage.setItem('token', '');
          localStorage.setItem('refresh_token', '');

          console.log('Refresh failed.');

          this.loginService.loginResult = false;
          this.router.navigateByUrl(`login`);
        });
    }
    return throwError(err);
  }
}
