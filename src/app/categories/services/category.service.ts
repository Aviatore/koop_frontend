import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Category} from '../models/category';
import {Info} from '../models/info';
import {AppUrl} from '../../urls/app-url';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoriesService(): Observable<Category[] | Info> {
    return this.http.get<Category[] | Info>(`${AppUrl.BASE_URL}Category/Get/Categories`)
      .pipe(map(res => {
          if ('info' in res) {
            return res;
          } else {
            return res;
          }
        }),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
