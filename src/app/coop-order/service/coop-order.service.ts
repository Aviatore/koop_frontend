import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CoopOrder} from '../models/coop-order';
import {AppUrl} from '../../urls/app-url';
import {Info} from '../models/info';
import {catchError, map} from 'rxjs/operators';
import {CoopNames} from '../models/coop-names';
import {Problem} from '../models/problem';
import {BadRequest} from '../models/bad-request';

@Injectable({
  providedIn: 'root'
})
export class CoopOrderService {

  constructor(private http: HttpClient) { }

  getCoopOrdersHistory(coopId: string): Observable<CoopOrder[] | Info> {
    return this.http.get<CoopOrder[] | Info>(`${AppUrl.BASE_URL}Cooperator/${coopId}/Orders/Grande`)
      .pipe(map(res => {
        if ('info' in res) {
          return res;
        } else {
          return res;
        }
      }));
  }

  getCoopLastOrder(coopId: string): Observable<CoopOrder[] | Info | Problem> {
    return this.http.get<CoopOrder[] | Info | Problem>(`${AppUrl.BASE_URL}Cooperator/${coopId}/Last/Order/Grande`)
      .pipe(map(res => {
        if ('info' in res) {
          return res;
        } else if ('traceId' in res) {
          return res;
        } else {
          return res;
        }
      }));
  }

  getCooperators(): Observable<CoopNames[]> {
    return this.http.get<CoopNames[]>(`${AppUrl.BASE_URL}Cooperator/Get/Cooperators`);
  }

  deleteOrderedItem(orderItemId: string): Observable<Info | Problem> {
    return this.http.delete<Info | Problem>(`${AppUrl.BASE_URL}Cooperator/Delete/OrderItem/${orderItemId}`)
      .pipe(map(res => {
        if ('traceId' in res){
          return res;
        } else {
          return res;
        }
      }));
  }

  editOrderItemQuantity(orderItemId: string, quantity: number): Observable<Info | BadRequest | Problem> {
    console.log(orderItemId);
    return this.http.post<Info | BadRequest | Problem>(`${AppUrl.BASE_URL}Cooperator/Update/OrderItem/Quantity`,
      {
        orderedItemId: orderItemId,
        quantity
      })
      .pipe(map(res => {
        if ('traceId' in res) {
          return res;
        } else if ('error' in res) {
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