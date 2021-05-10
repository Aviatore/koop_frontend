import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ProductInBasket} from '../models/product-in-basket';
import {Info} from '../models/info';
import {AppUrl} from '../../urls/app-url';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketViewService {

  constructor(private http: HttpClient) { }

  getProductsInBasket(userId: string): Observable<ProductInBasket[] | Info> {
    return this.http.get<ProductInBasket[] | Info>(`${AppUrl.BASE_URL}Test/User/${userId}/Order/In/Basket`)
      .pipe(map(res => {
          if ('info' in res) {
            return res;
          } else {
            return res;
          }
        }),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
