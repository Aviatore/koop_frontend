import { Injectable } from '@angular/core';
import { Basket } from './basket';

import { Observable, of } from 'rxjs';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Guid} from 'guid-typescript';
import {catchError} from 'rxjs/operators';
import {OrderGrande} from './order-grande';
import {AppUrl} from '../urls/app-url';

const orderGrandeOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json-patch+json'),
  observe: 'response',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class OrderGrandeService {

  constructor(private http: HttpClient) {}


  getOrders(): Observable<OrderGrande[]> {
      return this.http.get<OrderGrande[]>(`${AppUrl.BASE_URL}Order/bigorders`);
  }

  getBaskets(): Observable<Basket[]> {
    return this.http.get<Basket[]>(`${AppUrl.BASE_URL}Order/order/baskets`);
  }

  addOrder(order: OrderGrande): void {
    console.log(`Raw data: ${JSON.stringify(order)}`);
    this.http.post<HttpResponse<any>>(`${AppUrl.BASE_URL}Order/order/add`, order, orderGrandeOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  changeStatus(orderId: Guid, statusName: string): Observable<any> {
    console.log(`Raw data: ${JSON.stringify(orderId + statusName)}`);
    return this.http.get<any>(`${AppUrl.BASE_URL}Order/order/${orderId}/${statusName}`, orderGrandeOptions);
  }

  getStatuses(): Observable<string[]> {
    return this.http.get<string[]>(`${AppUrl.BASE_URL}Order/statuses`);

  }
}
