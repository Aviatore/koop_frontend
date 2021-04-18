import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoopDept} from '../models/coop-dept';
import {baseUrl} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReportCoopDept(): Observable<CoopDept[]> {
    return this.http.get<CoopDept[]>(`${baseUrl}Report/Cooperators/Debt`);
  }
}
