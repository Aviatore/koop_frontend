import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoopOrder} from '../models/coop-order';
import {AppUrl} from '../../urls/app-url';
import {Info} from '../models/Info';
import {map} from 'rxjs/operators';

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
}
