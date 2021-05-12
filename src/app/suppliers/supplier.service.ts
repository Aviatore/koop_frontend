import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Supplier} from './supplier';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Guid} from 'guid-typescript';
import {UserName} from './userName';
import {catchError} from 'rxjs/operators';
import {AppUrl} from '../urls/app-url';

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
    return this.http.get<Supplier[]>(`${AppUrl.BASE_URL}Supplier/allsuppliers`);
  }

  getSupplier(suppId: Guid | string): Observable<Supplier> {
    return this.http.get<Supplier>(`${AppUrl.BASE_URL}Supplier/supplier/${suppId}`);
  }

  getUsers(): Observable<UserName[]> {
  return this.http.get<UserName[]>(`${AppUrl.BASE_URL}Cooperator/allNames`);
  }

  editSupplier(supplier: Supplier): void {
    console.log(`Raw data: ${JSON.stringify(supplier)}`);
    this.http.post<HttpResponse<any>>(`${AppUrl.BASE_URL}Supplier/supplier/update`, supplier, supplierOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  addSupplier(supplier: Supplier): void {
    console.log(`Raw data: ${JSON.stringify(supplier)}`);
    this.http.post<HttpResponse<any>>(`${AppUrl.BASE_URL}Supplier/supplier/add`, supplier, supplierOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  toggleAvail(supplierId: Guid): void {
    console.log(`Raw data: ${JSON.stringify(supplierId)}`);
    this.http.get<any>(`${AppUrl.BASE_URL}Supplier/supplier/${supplierId}/toggleAvail`, supplierOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  toggleBlocked(supplierId: Guid): void {
    console.log(`Raw data: ${JSON.stringify(supplierId)}`);
    this.http.get<any>(`${AppUrl.BASE_URL}Supplier/supplier/${supplierId}/toggleBlocked`, supplierOptions)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
