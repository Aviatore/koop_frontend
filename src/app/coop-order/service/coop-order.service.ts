import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CoopOrder} from '../models/coop-order';
import {AppUrl} from '../../urls/app-url';
import {Info} from '../models/info';
import {catchError, map} from 'rxjs/operators';
import {CoopNames} from '../models/coop-names';


@Injectable({
  providedIn: 'root'
})
export class CoopOrderService {

  constructor(private http: HttpClient) {
  }

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

  getCoopLastOrder(coopId: string): Observable<CoopOrder[] | Info> {
    return this.http.get<CoopOrder[] | Info>(`${AppUrl.BASE_URL}Cooperator/${coopId}/Last/Order/Grande`)
      .pipe(map(res => {
          if ('info' in res) {
            return res;
          } else {
            return res;
          }
        }),
        catchError(this.handleError));
  }

  getCooperators(): Observable<CoopNames[]> {
    return this.http.get<CoopNames[]>(`${AppUrl.BASE_URL}Cooperator/Get/Cooperators`);
  }

  deleteOrderedItem(orderItemId: string): Observable<Info> {
    return this.http.delete<Info>(`${AppUrl.BASE_URL}Cooperator/Delete/OrderItem/${orderItemId}`)
      .pipe(map(res => {
          return res;
        }),
        catchError(this.handleError));
  }

  editOrderItemQuantity(orderItemId: string, quantity: number): Observable<Info> {
    return this.http.post<Info>(`${AppUrl.BASE_URL}Cooperator/Update/OrderItem/Quantity`,
      {
        orderedItemId: orderItemId,
        quantity
      })
      .pipe(map(res => {
          return res;
        }),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
