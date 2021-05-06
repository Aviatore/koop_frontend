import {Inject, Injectable} from '@angular/core';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {CountDownTokenService} from './count-down-token.service';
import {RefTokenTimer, TokenTimer} from '../injection-tokens/tokens';
import {ErrorResponse} from '../admin/admin-interfaces/errorResponse';
import {NGXLogger} from 'ngx-logger';
import {LoggerService} from './logger.service';


export interface LoginResponse {
  token: string;
  refreshT: string;
  tokenExp: number;
  refTokenExp: number;
  userId: string;
}

const loginUrl = 'http://localhost:5000/api/auth/signin';
const loginOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginResult: boolean;
  errorResponse: ErrorResponse = {
    detail: '',
    status: 0
  };

  constructor(private httpClient: HttpClient,
              private logger: LoggerService,
              @Inject(TokenTimer) private tokenT: CountDownTokenService,
              @Inject(RefTokenTimer) private refTokenT: CountDownTokenService) { }

  LogIn(email: string, password: string): Observable<HttpResponse<LoginResponse>> {
    return this.GetUserCredentials(email, password);

    // return this.errorResponse;
  }

  LogOut(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('refresh_token', '');
    localStorage.setItem('login_userId', '');
    this.loginResult = false;
    this.tokenT.timeSeconds = 0;
    this.refTokenT.timeSeconds = 0;
  }

  GetUserCredentials(email: string, password: string): Observable<HttpResponse<LoginResponse>> {
    console.log(...this.logger.info('Sending login request ...'));

    const loginBody = {
      Email: email,
      UserName: '',
      Password: password
    };
    return this.httpClient.post<HttpResponse<LoginResponse>>(
      loginUrl,
      loginBody, loginOptions).pipe(
        catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      console.log(...this.logger.info(`An error occurred:, ${error.error.message}`));
    } else {
      console.log(...this.logger.error(error.error.detail));
    }

    this.loginResult = false;

    this.errorResponse = error.error;

    return throwError(
      `Error:\n status: ${error.status}\n ${error.statusText}`);
  }
}
