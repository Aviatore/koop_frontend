import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Product {
  productId: number;
  productName: string;
  price: number;
  unit: string;
  categoryNames: any;
  available: boolean;
  picture: string;
  productId: string;
  blocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  GetProducts(categoryIdFromRoute, sort = 'name'): Observable<Product[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Product[]>(`http://localhost:5000/api/Test/products?orderBy=${sort}&orderDir=asc&categoryId=${categoryIdFromRoute}`);
  }
}
