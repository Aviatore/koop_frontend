import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {LoggerService} from '../../services/logger.service';
import {PasswordResetUrls} from '../urls';
import {catchError} from 'rxjs/operators';
import {PasswordErrorResponse} from '../interfaces/errorResponse';
import {IPasswordReset} from '../interfaces/passwordReset';

const httpRequestOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  result: boolean;
  errorResponse: PasswordErrorResponse;

  constructor(private httpClient: HttpClient,
              private logger: LoggerService) {
    this.errorResponse = {
      detail: '',
      status: 0,
      data: null
    };
  }

  sendPasswordResetLink(email: string): Observable<any> {
    console.log(...this.logger.info('Sending request for password-reset link ...'));
    const data: IPasswordReset = {
      email,
      hostname: `${window.location.protocol}//${window.location.host}`,
      token: null,
      userId: null,
      password: null
    };

    const url = PasswordResetUrls.ResetPassword;

    return this.httpClient.post<HttpResponse<Observable<PasswordErrorResponse>>>(url, data, httpRequestOptions).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  resetPassword(userId: string, password: string, token: string): Observable<any> {
    console.log(...this.logger.info('Sending request to reset password ...'));
    const data: IPasswordReset = {
      email: null,
      hostname: null,
      token,
      userId,
      password
    };

    const url = PasswordResetUrls.SelfSetNewPassword;

    return this.httpClient.post<HttpResponse<Observable<PasswordErrorResponse>>>(url, data, httpRequestOptions).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  selfResetPassword(userId: string, password: string): Observable<any> {
    console.log(...this.logger.info('Sending request to reset password ...'));
    const data: IPasswordReset = {
      email: null,
      hostname: null,
      token: null,
      userId,
      password
    };

    const url = PasswordResetUrls.SelfSetNewPassword;

    return this.httpClient.post<HttpResponse<Observable<PasswordErrorResponse>>>(url, data, httpRequestOptions).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);

      this.errorResponse.detail = error.message;
    } else {
      console.error(
        `Backend returned code ${error.status},\n` +
        `Returned body was: ${JSON.stringify(error.error)},\n` +
        `Error message: ${error.message}`);

      this.errorResponse = error.error;
    }

    return throwError(
      `Error:\n status: ${error.status}\n ${error.statusText}`);
  }
}
