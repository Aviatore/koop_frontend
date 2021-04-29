import {Component, OnInit} from '@angular/core';
import {CoopOrderService} from '../service/coop-order.service';
import {CoopOrder} from '../models/coop-order';
import {Info} from '../models/info';
import {map, tap} from 'rxjs/operators';
import {subscribeTo, subscribeToObservable} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-coop-orders',
  templateUrl: './coop-orders.component.html',
  styleUrls: ['./coop-orders.component.css']
})
export class CoopOrdersComponent implements OnInit {

  userId: string;
  coopOrders: CoopOrder[];
  info: Info;
  panelOpenState = false;

  displayedColumns: string[] = [
    // 'orderId',
    // 'orderedItemId',
    // 'productId',
    'productName',
    'price',
    'fundPrice',
    'quantity',
    'totalPrice',
    'totalFundPrice',
    'orderStatusName'
  ];

  constructor(private service: CoopOrderService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.userId = localStorage.getItem('login_userId');
    }
    this.getOrders();
  }

  ngOnInit(): void {
  }

  getOrders(): void {
    if (this.userId !== undefined) {
      this.service.getCoopOrdersHistory(this.userId)
        .subscribe( (data) => {
          if ('info' in data){
            this.info = data;
          } else {
            this.coopOrders = data;
          }
        });
    }
  }

}
