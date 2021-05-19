import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Category {
  categoryId: number;
  categoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  GetCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('http://localhost:5000/api/test/categories');
  }
}
