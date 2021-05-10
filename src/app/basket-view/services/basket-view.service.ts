import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {ProductInBasket} from '../models/product-in-basket';
import {Info} from '../models/info';
import {AppUrl} from '../../urls/app-url';
import {catchError, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class BasketViewService {

  private quantity = new BehaviorSubject<number>(null);
  basketQuantity = this.quantity.asObservable();

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
  }

  editBasketQuantity(): void {
    const userId = localStorage.getItem('login_userId');
    console.log(`${userId} - user`);
    this.getQuantityOfProducts(userId)
      .subscribe(amount => {
        this.quantity.next(amount);
      });
  }

  getProductsInBasket(userId: string): Observable<ProductInBasket[] | Info> {
    return this.http.get<ProductInBasket[] | Info>(`${AppUrl.BASE_URL}Test/User/${userId}/Order/In/Basket`)
      .pipe(map(res => {
          if ('info' in res) {
            return res;
          } else {
            return res;
          }
        }),
        catchError(this.handleError));
  }

  getQuantityOfProducts(userId: string): Observable<number> {
    let quantity: number;
    if (this.isUserLogin()) {
      return this.getProductsInBasket(userId).pipe(
        map(res => {
            if ('info' in res) {
              return quantity = null;
            } else {
              return quantity = res.reduce(
                (accumulator, amount) => {
                  return accumulator + amount.quantity;
                }, 0);
            }
          },
          error => {
            console.log(error.errors);
            return quantity = null;
          })
      );
    }
    return of(null);
  }

  isUserLogin(): boolean {
    const userId = localStorage.getItem('login_userId');
    const token = localStorage.getItem('token');
    return userId !== '' && userId !== undefined && userId !== null && !this.jwtHelper.isTokenExpired(token);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}

/*
quantity = productsInBasket.reduce(
  (accumulator, amount) => {
    return accumulator + amount.quantity;
  }, 0);*/
