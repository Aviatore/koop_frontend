import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product {
  productName: string;
  price: number;
  unit: string;
  categoryNames: any;
  available: boolean;
  picture: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  GetProducts(categoryIdFromRoute): Observable<Product[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Product[]>('http://localhost:5000/api/Test/products?orderBy=name&start=1&&orderDir=asc&categoryId=' + categoryIdFromRoute);
  }
}
