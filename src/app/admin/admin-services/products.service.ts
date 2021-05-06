import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoggerService} from '../../services/logger.service';
import {Observable, ObservableInput, throwError} from 'rxjs';
import {Funds} from '../admin-interfaces/funds';
import {Urls} from '../urls';
import {catchError} from 'rxjs/operators';
import {ErrorResponse} from '../admin-interfaces/errorResponse';
import {Category} from '../admin-interfaces/categories';
import {Unit} from '../admin-interfaces/unit';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  errorResponse: ErrorResponse;

  constructor(private httpClient: HttpClient,
              private logger: LoggerService) { }

  GetAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(Urls.GetAllCategories).pipe(
      catchError(this.handleError));
  }

  GetAllUnits(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(Urls.GetAllUnits).pipe(
      catchError(this.handleError));
  }

  GetAllSuppliers(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(Urls.GetAllSuppliers).pipe(
      catchError(this.handleError));
  }

  GetAvailQuantities(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(Urls.GetAvailQuantities).pipe(
      catchError(this.handleError));
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
