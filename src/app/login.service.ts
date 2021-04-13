import { Injectable } from '@angular/core';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import * as url from 'url';

export interface LoginResponse {
  token: string;
  refreshT: string;
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
  loginResponse: LoginResponse;
  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) { }

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
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      `Error:\n status: ${error.status}\n ${error.statusText}`);
  }

  LogIn(email: string, password: string): void {
    this.GetUserCredentials(email, password).subscribe(
      result => {
        console.log(`Response: ${result.body}`);
        this.loginResponse = result.body;
        localStorage.setItem('token', this.loginResponse.token);
        this.cookieService.set('refresh_token', this.loginResponse.refreshT);
      },
      error => console.log(error));
  }
}
