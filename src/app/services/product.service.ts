import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product {
  productName: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  GetProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:5000/api/Test/products?orderBy=name&start=1&count=10&orderDir=asc');
  }
}
