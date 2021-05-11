import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../services/product.service';
import {Router} from '@angular/router';
import {AppUrl} from '../../urls/app-url';
import {OrderDialogComponent} from '../order-dialog/order-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderMakerService} from '../services/order-maker.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderMakerService.makeOrder(productId, result).subscribe(r => {
          this.orderMakerService.isProductAvailable(productId).subscribe(availResult => {
            this.available = availResult.detail === 'True';
            console.log(`Is available: ${this.available}`);
          });
          this.orderMakerService.setBadge();
        });
      }
    });
  }
}
