import {Component, OnInit} from '@angular/core';
import {AppUrl} from '../../urls/app-url';
import {BasketViewService} from '../services/basket-view.service';
import {Info} from '../models/info';
import {ProductInBasket} from '../models/product-in-basket';

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.css']
})
export class BasketIconComponent implements OnInit {

  url = AppUrl.ROUTE;
  userId = localStorage.getItem('login_userId');
  info: Info;
  problem: string;
  productsInBasket: ProductInBasket[];
  productQuantity: number;

  constructor(private service: BasketViewService) {
  }

  ngOnInit(): void {
    this.getQuantityOfProducts();
  }

  getQuantityOfProducts(): void {
    this.service.getProductsInBasket(this.userId)
      .subscribe((data) => {
          if ('info' in data) {
            this.info = data;
          } else {
            this.productsInBasket = data;
            this.productQuantity = this.productsInBasket.reduce(
              (accumulator, quantity) => {
              return accumulator + quantity.quantity;
            }, 0);
          }
        },
        error => {
          this.problem = error.error.detail;
        });
  }

  /*productsQuantity(): number {
    return this.productsInBasket.reduce((accumulator, quantity) => {
      return accumulator + quantity.quantity;
    }, 0);
  }*/

}
