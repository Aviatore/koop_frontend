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
  productQuantity: number;

  constructor(private service: BasketViewService) {
  }

  ngOnInit(): void {
    this.service.basketQuantity.subscribe(num => {
      this.productQuantity = num;
    });
  }
}
