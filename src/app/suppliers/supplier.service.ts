import { Injectable } from '@angular/core';

import {baseUrl} from '../../environments/environment';

import { Observable, of } from 'rxjs';
import {Supplier} from './supplier';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Guid} from 'guid-typescript';
import {UserName} from './userName';
import {catchError} from 'rxjs/operators';

const supplierOptions: object = {
  headers: new HttpHeaders().set('Content-Type', 'application/json-patch+json'),
  observe: 'response',
  responseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${baseUrl}Supplier/allsuppliers`);
  }

  getSupplier(suppId: Guid | string): Observable<Supplier> {
    return this.http.get<Supplier>(`${baseUrl}Supplier/supplier/${suppId}`);
  }

  getUsers(): Observable<UserName[]> {
  return this.http.get<UserName[]>(`${baseUrl}Cooperator/allNames`);
  }

  editSupplier(supplier: Supplier): void {
    console.log(`Raw data: ${JSON.stringify(supplier)}`);
    this.http.post<HttpResponse<any>>(`${baseUrl}Supplier/supplier/update`, supplier, supplierOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  addSupplier(supplier: Supplier): void {
    console.log(`Raw data: ${JSON.stringify(supplier)}`);
    this.http.post<HttpResponse<any>>(`${baseUrl}Supplier/supplier/add`, supplier, supplierOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  toggleAvail(supplierId: Guid): void {
    console.log(`Raw data: ${JSON.stringify(supplierId)}`);
    this.http.get<any>(`${baseUrl}Supplier/supplier/${supplierId}/toggleAvail`, supplierOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  toggleBlocked(supplierId: Guid): void {
    console.log(`Raw data: ${JSON.stringify(supplierId)}`);
    this.http.get<any>(`${baseUrl}Supplier/supplier/${supplierId}/toggleBlocked`, supplierOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}