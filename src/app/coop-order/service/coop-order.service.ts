import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoopOrder} from '../models/coop-order';
import {AppUrl} from '../../urls/app-url';
import {Info} from '../models/info';
import {map} from 'rxjs/operators';
import {CoopNames} from '../models/coop-names';
import {Problem} from '../models/problem';

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
}
