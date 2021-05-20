import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUrl} from '../../urls/app-url';
import {BasketViewService} from '../services/basket-view.service';
import {Info} from '../models/info';
import {ProductInBasket} from '../models/product-in-basket';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.css']
})
export class BasketIconComponent implements OnInit, OnDestroy {

  url = AppUrl.ROUTE;
  productQuantity: number;
  subscription: Subscription;

  constructor(private service: BasketViewService) {
  }

  ngOnInit(): void {
    this.service.editBasketQuantity();
    this.subscription = this.service.basketQuantity.subscribe(num => {
      this.productQuantity = num;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
