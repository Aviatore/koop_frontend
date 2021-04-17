import { Injectable } from '@angular/core';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {LoginResponse} from './login.service';


const loginUrl = 'http://localhost:5000/api/auth/user/refreshToken';
const loginOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  constructor(private httpClient: HttpClient) { }

  RefreshToken(): Observable<HttpResponse<LoginResponse>> {
    console.log('Sending request ...');

    return this.httpClient.post<HttpResponse<LoginResponse>>(
      loginUrl,
      null,
      loginOptions).pipe(
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

    return throwError(
      `Error:\n status: ${error.status}\n ${error.statusText}`);
  }
}
