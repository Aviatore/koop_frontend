import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../admin-interfaces/user';
import {Urls} from '../urls';
import {catchError} from 'rxjs/operators';
import {ObservableInput, throwError} from 'rxjs';

const createUserOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {
  }

  CreateUser(user: User): void {
    this.httpClient.post<User>(Urls.CreateUserUrl, user).pipe(
      catchError(this.handleError)).subscribe(
        result => {
          console.log(`User created.`);
        },
      error => {
        console.error(error);
      }
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
