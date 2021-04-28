import {Component, OnInit} from '@angular/core';
import {CoopOrderService} from '../service/coop-order.service';
import {CoopOrder} from '../models/coop-order';

@Component({
  selector: 'app-coop-orders',
  templateUrl: './coop-orders.component.html',
  styleUrls: ['./coop-orders.component.css']
})
export class CoopOrdersComponent implements OnInit {

  userId: string;
  coopOrders: CoopOrder[] = [];
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
    console.log(this.coopOrders);
  }

  getOrders(): void {
    if (this.userId !== undefined) {
      this.service.getCoopOrdersHistory(this.userId)
        .subscribe((data) =>
          this.coopOrders = data
        );
    }
  }

}
