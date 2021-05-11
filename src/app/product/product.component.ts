import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../services/product.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUrl} from '../urls/app-url';
import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent, OrderDialogData} from '../order-dialog/order-dialog.component';
import {OrderMakerService} from '../services/order-maker.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;
  domain = AppUrl.DOMAIN;
  emptyImage = AppUrl.EMPTYIMAGE;
  quantities: number;

  constructor(private productS: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private orderMakerService: OrderMakerService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const categoryIdFromRoute = String(routeParams.get('categoryId'));
    console.log(`Getting products ...`);
    this.products = this.productS.GetProducts(categoryIdFromRoute);
    console.log(this.products);
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
          this.orderMakerService.isProductAvailable(productId).subscribe(result => {

          });
          this.orderMakerService.setBadge();
        });
      }
    });
  }
}
