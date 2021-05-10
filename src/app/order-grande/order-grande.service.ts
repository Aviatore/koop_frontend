import { Injectable } from '@angular/core';
import { Basket } from './basket';

import {baseUrl} from '../../environments/environment';

import { Observable, of } from 'rxjs';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Guid} from 'guid-typescript';
import {catchError} from 'rxjs/operators';
import {OrderGrande} from './order-grande';
import {Status} from './status';

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
      return this.http.get<OrderGrande[]>(`${baseUrl}Order/bigorders`);
  }

  getBaskets(): Observable<Basket[]> {
    return this.http.get<Basket[]>(`${baseUrl}Order/order/baskets`);
  }

  changeStatus(orderId: Guid, statusName: string): void {
    console.log(`Raw data: ${JSON.stringify(orderId + statusName)}`);
    this.http.get<any>(`${baseUrl}Order/order/${orderId}/${statusName}`, orderGrandeOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${baseUrl}Order/statuses`);
  }
}
