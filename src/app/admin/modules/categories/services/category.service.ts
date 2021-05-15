import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Category} from '../models/category';
import {Info} from '../models/info';
import {AppUrl} from '../../../../urls/app-url';
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

  addEditCategoryService(categoryId: string, categoryName: string, picture: string): Observable<Info> {
    return this.http.post<Info>(`${AppUrl.BASE_URL}Category/Update/Insert`,
      {
        categoryId,
        categoryName,
        picture
      })
      .pipe(map(res => {
          return res;
        }),
        catchError(this.handleError));
  }

  uploadFileService(formData: FormData): Observable<any> {
    return this.http.post(`${AppUrl.BASE_URL}Category/Upload/Image`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  updateImageNameService(categoryId: string, picture: string): Observable<Info> {
    return this.http.post<Info>(`${AppUrl.BASE_URL}Category/Update/Image/Name`,
      {
        categoryId,
        picture
      })
      .pipe(map(res => {
          return res;
        }),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
