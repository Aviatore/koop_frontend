import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoopDept} from '../models/coop-dept';
import {PackList} from '../models/pack-list';
import {SupplierReceivables} from '../models/supplier-receivables';
import {AppUrl} from '../../urls/app-url';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReportCoopDept(): Observable<CoopDept[]> {
    return this.http.get<CoopDept[]>(`${AppUrl.BASE_URL}Report/Cooperators/Debt`);
  }

  getReportForPackers(): Observable<PackList[]> {
    return this.http.get<PackList[]>(`${AppUrl.BASE_URL}Report/Packers/Last/Grande`);
  }

  getReportSupplierReceivables(): Observable<SupplierReceivables[]> {
    return this.http.get<SupplierReceivables[]>(`${AppUrl.BASE_URL}Report/Debts/To/Suppliers`);
  }
}
