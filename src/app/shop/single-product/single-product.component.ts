import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from '../../services/product.service';
import {Router} from '@angular/router';
import {AppUrl} from '../../urls/app-url';
import {OrderDialogComponent} from '../order-dialog/order-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderMakerService} from '../services/order-maker.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  @Input() product: Product;
  emptyImage = AppUrl.EMPTYIMAGE;
  domain = AppUrl.DOMAIN;
  quantities: number;
  available = true;
  constructor(private router: Router,
              public dialog: MatDialog,
              private orderMakerService: OrderMakerService) { }

  ngOnInit(): void {
    if (!this.product.available) {
      this.available = false;
    }
  }

  editProduct(productId: string): void {
    console.log(`productId: ${productId}`);
    this.router.navigate(['/admin/product/new'], {
      queryParams: {
        productId
      }
    });
  }

  openDialog(productName: string, productId: string): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '250px',
      data: {productName, productId, quantities: this.quantities}
    });

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      if (result) {
        this.orderMakerService.makeOrder(productId, result).pipe(takeUntil(this.onDestroy$)).subscribe(r => {
          this.orderMakerService.isProductAvailable(productId).pipe(takeUntil(this.onDestroy$)).subscribe(availResult => {
            this.available = availResult.detail === 'True';
            console.log(`Is available: ${this.available}`);
          });
          this.orderMakerService.setBadge();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
