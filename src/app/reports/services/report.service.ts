import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CoopDept} from '../models/coop-dept';
import {PackList} from '../models/pack-list';
import {SupplierReceivables} from '../models/supplier-receivables';
import {AppUrl} from '../../urls/app-url';
import {GrandeOrder} from '../models/grande-order';
import {catchError, map} from 'rxjs/operators';
import {GrandeOrderItem} from '../models/grande-order-item';
import {OrderStartDate} from '../models/order-start-date';
import {Supplier} from '../models/supplier';
import {SupplierReport} from '../models/supplier-report';
import {Info} from '../models/info';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  getReportCoopDept(): Observable<CoopDept[]| Info> {
    return this.http.get<CoopDept[] | Info>(`${AppUrl.BASE_URL}Report/Cooperators/Debt`)
      .pipe(map(res => {
          if ('info' in res) {
            return res;
          } else {
            return res;
          }
        }),
        catchError(this.handleError));
  }

  getReportForPackers(): Observable<PackList[] | Info> {
    return this.http.get<PackList[] | Info>(`${AppUrl.BASE_URL}Report/Packers/Last/Grande`)
      .pipe(map(res => {
          if ('info' in res) {
            return res;
          } else {
            return res;
          }
        }),
        catchError(this.handleError));
  }

  getReportSupplierReceivables(): Observable<SupplierReceivables[] | Info> {
    return this.http.get<SupplierReceivables[]| Info>(`${AppUrl.BASE_URL}Report/Debts/To/Suppliers`)
      .pipe(map(res => {
          if ('info' in res) {
            return res;
          } else {
            return res;
          }
        }),
        catchError(this.handleError));
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

  getGrandeStartDates(): Observable<OrderStartDate[]> {
    return this.http.get<OrderStartDate[]>(`${AppUrl.BASE_URL}Report/Order/Grande/StartDates`);
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${AppUrl.BASE_URL}Report/Get/Suppliers`);
  }

  getReportLastGrandeOrderBySupplier(supplierId: string): Observable<SupplierReport> {
    return this.http.get<SupplierReport>(`${AppUrl.BASE_URL}Report/Last/Order/Grande/By/Supplier/${supplierId}`);
  }

  getReportOrdersGrandeBySupplier(supplierId: string): Observable<SupplierReport> {
    return this.http.get<SupplierReport>(`${AppUrl.BASE_URL}Report/Orders/Grande/By/Supplier/${supplierId}`);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
