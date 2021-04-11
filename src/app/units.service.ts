import { Injectable, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface Unit {
  unitName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UnitsService implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  GetUnits() {
    return this.httpClient.get<Unit[]>('http://localhost:5000/api/test/allunits');
  }
}
