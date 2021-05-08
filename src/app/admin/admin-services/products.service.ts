import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoggerService} from '../../services/logger.service';
import {Observable, ObservableInput, of, throwError} from 'rxjs';
import {Funds} from '../admin-interfaces/funds';
import {Urls} from '../urls';
import {catchError} from 'rxjs/operators';
import {ErrorResponse} from '../admin-interfaces/errorResponse';
import {Category} from '../admin-interfaces/categories';
import {Unit} from '../admin-interfaces/unit';
import {Supplier} from '../admin-interfaces/supplier';
import {AvailQuantity} from '../admin-interfaces/availQuantity';
import {Product} from '../admin-interfaces/product';

const requestOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

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

  GetProductCategories(productId: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(Urls.GetProductCategories, {
      params: new HttpParams().set('productId', productId)
    }).pipe(
      catchError(this.handleError));
  }

  GetAllUnits(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(Urls.GetAllUnits).pipe(
      catchError(this.handleError));
  }

  GetAllSuppliers(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(Urls.GetAllSuppliers).pipe(
      catchError(this.handleError));
  }

  GetAvailQuantities(productId: string = ''): Observable<AvailQuantity[]> {
    if (productId === undefined || productId === '') {
      return new Observable<AvailQuantity[]>(observer => {
        const tmp: AvailQuantity[] = [];
        observer.next(tmp);
      });
    }

    return this.httpClient.get<AvailQuantity[]>(Urls.GetAvailAllQuantities, {
      params: new HttpParams().set('productId', productId)
    }).pipe(
      catchError(this.handleError));
  }

  GetProductById(productId: string): Observable<Product> {
    const url = `${Urls.GetProductById}/${productId}/get`;
    return this.httpClient.get<Product>(url).pipe(
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
