import {Component, OnInit} from '@angular/core';
import {Info} from '../../coop-order/models/info';
import {MatTableDataSource} from '@angular/material/table';
import {BasketViewService} from '../services/basket-view.service';
import {ProductInBasket} from '../models/product-in-basket';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-basket-view',
  templateUrl: './basket-view.component.html',
  styleUrls: ['./basket-view.component.css']
})
export class BasketViewComponent implements OnInit {

  displayedColumns: string[] = [
    // 'orderedItemId',
    // 'orderId',
    // 'productId',
    // 'firstName',
    // 'lastName',
    'productName',
    // 'description',
    'unit',
    // 'orderStatus',
    'decreaseButton',
    'quantity',
    'increaseButton',
    'unitPrice',
    'price',
    'delButton'
  ];
  info: Info;
  problem: string;
  dataSource: MatTableDataSource<ProductInBasket>;
  arraySource: ProductInBasket[];
  userId: string;

  constructor(private service: BasketViewService,
              private snackBarInfo: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getBasket();
  }

  getBasket(): void {
    this.userId = localStorage.getItem('login_userId');
    if (this.service.isUserLogin()) {
      this.service.getProductsInBasket(this.userId)
        .subscribe((data) => {
            if ('info' in data) {
              this.info = data;
              this.dataSource = undefined;
              this.problem = undefined;
            } else {
              this.info = undefined;
              this.problem = undefined;
              this.dataSource = new MatTableDataSource(data);
              this.arraySource = data;

              return this.dataSource;
            }
          },
          err => {
            this.info = undefined;
            this.dataSource = undefined;
            this.problem = err.error.errors;
          });
    }
  }

  changeProductByOne(orderedItemId: string, quantity: number): void {
    if (quantity > 0) {
      this.service.setProductQuantity(orderedItemId, quantity.toString())
        .subscribe((res) => {
            this.getBasket();
            this.service.editBasketQuantity();
          },
          error => {
            this.openSnackBarInfo('Błąd zmiany ilości produktu.');
          });
    } else {
      this.delProduct(orderedItemId);
    }
  }

  delProduct(orderedItemId: string): void {
    this.service.removeProductFromBasket(orderedItemId)
      .subscribe((res) => {
          this.getBasket();
          this.service.editBasketQuantity();
        },
        error => {
          this.openSnackBarInfo('Błąd usuwania produktu z koszyka.');
        });
  }

  openSnackBarInfo(message: string, action?: string): void {
    this.snackBarInfo.open(message, action, {
      duration: 3000,
      panelClass: 'snack-bar-red'
    });
  }

  getTotalQuantity(): number {
    return this.arraySource.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
  }

  getTotalPrice(): number {
    return this.arraySource.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }
}
