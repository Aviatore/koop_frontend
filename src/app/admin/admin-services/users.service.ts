import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../admin-interfaces/user';
import {Urls} from '../urls';
import {catchError, delay, tap} from 'rxjs/operators';
import {Observable, ObservableInput, of, throwError} from 'rxjs';
import {Funds} from '../admin-interfaces/funds';
import {EmailCheck} from '../admin-interfaces/emailCheck';
import {ResponseResult} from '../admin-interfaces/responseResult';
import {ErrorResponse} from '../admin-interfaces/errorResponse';
import {LoggerService} from '../../services/logger.service';

const getAllUsersOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

const createUserOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  responseResult: ResponseResult;
  errorResponse: ErrorResponse;

  constructor(private httpClient: HttpClient,
              private logger: LoggerService) {
    this.responseResult = {
      statusCode: 0,
      message: ''
    };

    this.errorResponse = {
      detail: '',
      status: 0
    };
  }

  CreateUser(user: User): void {
    console.log(...this.logger.info(`Raw data:\n${JSON.stringify(user)}`));
    this.httpClient.post<HttpResponse<any>>(Urls.CreateUserUrl, user, createUserOptions).pipe(
      catchError(this.handleError.bind(this))).subscribe(
        result => {
          console.log(...this.logger.info(`User created.`));
          this.errorResponse = {
            detail: `Konto użytkownika '${user.firstName} ${user.lastName}' zostało utworzone.`,
            status: 200
          };
        },
      error => {
        console.error(error);
      }
    );
  }

  GetAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(Urls.GetAllUsers).pipe(
      catchError(this.handleError)
    );
  }

  GetUserById(userId: string): Observable<User> {
    const url = `${Urls.BaseAuthUrl}/user/${userId}/get`;
    return this.httpClient.get<User>(url).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  GetAllUnits(): Observable<Funds[]> {
    return this.httpClient.get<Funds[]>(Urls.GetAllFunds).pipe(
      catchError(this.handleError));
  }

  CheckEmail(email: string): Observable<EmailCheck> {
    const url = `${Urls.CheckEmail}?email=${encodeURIComponent(email)}`;
    return this.httpClient.get<EmailCheck>(url).pipe(
      catchError(this.handleError));
  }

  CheckUsername(username: string): Observable<EmailCheck> {
    const url = `${Urls.CheckUsername}?username=${encodeURIComponent(username)}`;
    return this.httpClient.get<EmailCheck>(url).pipe(
      catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);

      this.errorResponse.detail = error.message;
    } else {
      console.error(
        `Backend returned code ${error.status},\n` +
        `Returned body was: ${error.error},\n` +
        `Error message: ${error.message}`);

      this.errorResponse = error.error;
    }

    return throwError(
      `Error:\n status: ${error.status}\n ${error.statusText}`);
  }

  getResult(): ResponseResult {
    return this.responseResult;
  }

  remUser(userId: string): Observable<any> {
    const url = `${Urls.RemoveUser}/${userId}/remove`;
/*    return of(1).pipe(
      delay(2000),
      tap(p => {
        console.log(...this.logger.info(`User with Id: ${userId} was removed.`));
        this.errorResponse = {
          detail: `Konto użytkownika zostało usunięte.`,
          status: 200
        };
      })
    );*/
    return this.httpClient.delete<ErrorResponse>(url).pipe(
      catchError(this.handleError.bind(this)));
  }
}
