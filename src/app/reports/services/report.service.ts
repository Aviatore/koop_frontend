import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoopDept} from '../models/coop-dept';
import {PackList} from '../models/pack-list';
import {SupplierReceivables} from '../models/supplier-receivables';
import {AppUrl} from '../../urls/app-url';
import {GrandeOrder} from '../models/grande-order';
import {map} from 'rxjs/operators';
import {GrandeOrderItem} from '../models/grande-order-item';
import {OrderStartDate} from '../models/order-start-date';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  getReportCoopDept(): Observable<CoopDept[]> {
    return this.http.get<CoopDept[]>(`${AppUrl.BASE_URL}Report/Cooperators/Debt`);
  }

  getReportForPackers(): Observable<PackList[]> {
    return this.http.get<PackList[]>(`${AppUrl.BASE_URL}Report/Packers/Last/Grande`);
  }

  getReportSupplierReceivables(): Observable<SupplierReceivables[]> {
    return this.http.get<SupplierReceivables[]>(`${AppUrl.BASE_URL}Report/Debts/To/Suppliers`);
  }

  getReportGrandeOrderItems(dateStart?: string): Observable<GrandeOrderItem[]> {
    if (dateStart === undefined) {
      return this.http.get<GrandeOrder>(`${AppUrl.BASE_URL}Report/Order/Grande`)
        .pipe(map((value) => value.grandeOrderItem));
    }
    return this.http.get<GrandeOrder>(`${AppUrl.BASE_URL}Report/Order/Grande/${dateStart}`)
      .pipe(map((value) => value.grandeOrderItem));
  }

  getReportGrandeOrder(dateStart?: string): Observable<GrandeOrder> {
    if (dateStart === undefined) {
      return this.http.get<GrandeOrder>(`${AppUrl.BASE_URL}Report/Order/Grande`);
    }
    return this.http.get<GrandeOrder>(`${AppUrl.BASE_URL}Report/Order/Grande/${dateStart}`);
  }

  getGrandeStartDates(): Observable<OrderStartDate> {
    return this.http.get<OrderStartDate>(`${AppUrl.BASE_URL}Order/Grande/StartDates`);
  }
}
