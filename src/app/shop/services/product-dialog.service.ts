import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ProductDialog {
  productName: string;
  price: number;
  unit: string;
  amountInMagazine: number;
  description: string;
  amountMax: number;
  supplier: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductDialogService {

  constructor(private httpClient: HttpClient) { }

  GetProductsById(productId): Observable<ProductDialog> {
    return this.httpClient.get<ProductDialog>(`http://localhost:5000/api/Test/product/${productId}/get`);
  }
}
