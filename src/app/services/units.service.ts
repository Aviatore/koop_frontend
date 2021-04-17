import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface Unit {
  unitName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor(private httpClient: HttpClient) { }

  GetUnits(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>('http://localhost:5000/api/test/allunits');
  }
}
