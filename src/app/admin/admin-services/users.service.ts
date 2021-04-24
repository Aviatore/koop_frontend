import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../admin-interfaces/user';
import {Urls} from '../urls';
import {catchError, tap} from 'rxjs/operators';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {Funds} from '../admin-interfaces/funds';
import {EmailCheck} from '../admin-interfaces/emailCheck';
import {ResponseResult} from '../admin-interfaces/responseResult';

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

  constructor(private httpClient: HttpClient) {
    this.responseResult = {
      statusCode: 0,
      message: ''
    };
  }

  CreateUser(user: User): void {
    console.log(`Raw data: ${JSON.stringify(user)}`);
    this.httpClient.post<HttpResponse<any>>(Urls.CreateUserUrl, user, createUserOptions).pipe(
      catchError(this.handleError)).subscribe(
        result => {
          console.log(`User created.`);
          this.responseResult = {
            statusCode: 200,
            message: `Konto użytkownika ${user.firstName} ${user.lastName} zostało utworzone.`
          };
        },
      error => {
        console.error(error);
        console.log(`DEBUG: ${error.body}`);

        this.responseResult = {
          statusCode: 1,
          message: error
        };
      }
    );
  }

  GetAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(Urls.GetAllUsers).pipe(
      catchError(this.handleError));
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

  private handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);

      this.responseResult = {
        statusCode: 2,
        message: '2'
      };
    } else {
      console.error(
        `Backend returned code ${error.status},\n` +
        `Returned body was: ${error.error},\n` +
        `Error message: ${error.message}`);

      this.responseResult = {
        statusCode: 3,
        message: '3'
      };
    }

    return throwError(
      `Error:\n status: ${error.status}\n ${error.statusText}`);
  }

  getResult(): ResponseResult {
    return this.responseResult;
  }
}
