import { Injectable } from '@angular/core';
import {AppUrl} from '../../urls/app-url';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, ObservableInput, throwError} from 'rxjs';
import {ErrorResponse} from '../../admin/admin-interfaces/errorResponse';
import {catchError} from 'rxjs/operators';

export interface AvailQuantities {
  quantity: number;
  productId: string;
  availableQuantityId: string;
}

const requestOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json'),
  observe: 'response',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class OrderMakerService {
  orderedItemsCount: BehaviorSubject<number>;
  orderUrl = AppUrl.BASE_URL + 'test/order/make';
  getProductAvailQuantitiesUrl = AppUrl.BASE_URL + 'test/product/availQuantities';
  getOrderQuantityUrl = AppUrl.BASE_URL + 'test/order/orderedItems/count';
  productAvailability = AppUrl.BASE_URL + 'test/product/isAvailable';
  errorResponse: ErrorResponse;
  constructor(private httpClient: HttpClient) {
    this.orderedItemsCount = new BehaviorSubject<number>(0);
  }

  makeOrder(productId: string, quantity: string): Observable<any> {
    return this.httpClient.get<HttpResponse<Observable<ErrorResponse>>>(this.orderUrl, {
      params: new HttpParams()
        .set('productId', productId)
        .set('quantity', quantity)
    })
      .pipe(
        catchError(this.handleError.bind(this)));
  }

  getProductAvailQuantities(productId: string): Observable<any> {
    return this.httpClient.get<HttpResponse<Observable<AvailQuantities[]>>>(this.getProductAvailQuantitiesUrl, {
      params: new HttpParams().set('productId', productId)
    }).pipe(
      catchError(this.handleError.bind(this)));
  }

  setBadge(): void {
    if (localStorage.getItem('token') === '') {
      this.orderedItemsCount.next(0);
    } else {
      this.httpClient.get<Observable<ErrorResponse>>(this.getOrderQuantityUrl).pipe(
        catchError(this.handleError.bind(this))).subscribe(result => {
        console.log(`quantity: ${result.detail}`);
        this.orderedItemsCount.next(result.detail);
      });
    }
  }

  isProductAvailable(productId: string): Observable<any> {
    return this.httpClient.get<HttpResponse<Observable<ErrorResponse[]>>>(this.productAvailability, {
      params: new HttpParams().set('productId', productId)
    }).pipe(
      catchError(this.handleError.bind(this)));
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
