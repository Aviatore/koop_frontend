import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../admin-interfaces/user';
import {Urls} from '../urls';
import {catchError} from 'rxjs/operators';
import {Observable, ObservableInput, throwError} from 'rxjs';
import * as Url from 'url';

const getAllUsersOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

const createUserOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {
  }

  CreateUser(user: User): void {
    console.log(`Raw data: ${JSON.stringify(user)}`);
    this.httpClient.post<User>(Urls.CreateUserUrl, user, createUserOptions).pipe(
      catchError(this.handleError)).subscribe(
        result => {
          console.log(`User created.`);
        },
      error => {
        console.error(error);
      }
    );
  }
  GetAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(Urls.GetAllUsers).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status},\n` +
        `Returned body was: ${error.error},\n` +
        `Error message: ${error.message}`);
    }

    return throwError(
      `Error:\n status: ${error.status}\n ${error.statusText}`);
  }
}
