import {Inject, Injectable} from '@angular/core';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {CountDownTokenService} from './count-down-token.service';
import {RefTokenTimer, TokenTimer} from '../injection-tokens/tokens';


export interface LoginResponse {
  token: string;
  refreshT: string;
  tokenExp: number;
  refTokenExp: number;
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

  constructor(private httpClient: HttpClient,
              @Inject(TokenTimer) private tokenT: CountDownTokenService,
              @Inject(RefTokenTimer) private refTokenT: CountDownTokenService) { }

  LogIn(email: string, password: string): void {
    this.GetUserCredentials(email, password).subscribe(
      result => {
        console.log(`Response: ${result.body}`);

        const loginResponse = result.body;
        localStorage.setItem('token', loginResponse.token);
        localStorage.setItem('refresh_token', loginResponse.refreshT);

        this.tokenT.timeSeconds = loginResponse.tokenExp;
        this.refTokenT.timeSeconds = loginResponse.refTokenExp;

        this.loginResult = true;
      },
      error => {
        console.error(error);
        this.loginResult = false;
      });
  }

  LogOut(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('refresh_token', '');
    this.loginResult = false;
    this.tokenT.timeSeconds = 0;
    this.refTokenT.timeSeconds = 0;
  }

  GetUserCredentials(email: string, password: string): Observable<HttpResponse<LoginResponse>> {
    console.log('Sending login request ...');

    const loginBody = {
      Email: email,
      UserName: '',
      Password: password
    };
    return this.httpClient.post<HttpResponse<LoginResponse>>(
      loginUrl,
      loginBody, loginOptions).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `Returned body was: ${error.error}`);
    }

    this.loginResult = false;

    return throwError(
      `Error:\n status: ${error.status}\n ${error.statusText}`);
  }
}
