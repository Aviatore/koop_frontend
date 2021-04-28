import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoopOrder} from '../models/coop-order';
import {AppUrl} from '../../urls/app-url';

@Injectable({
  providedIn: 'root'
})
export class CoopOrderService {

  constructor(private http: HttpClient) { }

  getCoopOrdersHistory(coopId: string): Observable<CoopOrder[]> {
    return this.http.get<CoopOrder[]>(`${AppUrl.BASE_URL}Cooperator/${coopId}/Orders/Grande`);
  }
}
