import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product, ProductService} from '../../services/product.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUrl} from '../../urls/app-url';
import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent, OrderDialogData} from '../order-dialog/order-dialog.component';
import {OrderMakerService} from '../services/order-maker.service';
import {takeUntil} from 'rxjs/operators';
import {ErrorResponse} from '../../admin/admin-interfaces/errorResponse';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  products: Observable<Product[]>;
  domain = AppUrl.DOMAIN;
  emptyImage = AppUrl.EMPTYIMAGE;
  quantities: number;
  orderStatus: ErrorResponse;

  constructor(private productS: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private orderMakerService: OrderMakerService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const categoryIdFromRoute = String(routeParams.get('categoryId'));
    console.log(`Getting products ...`);
    this.products = this.productS.GetProducts(categoryIdFromRoute).pipe(takeUntil(this.onDestroy$));
    console.log(this.products);
    this.orderMakerService.checkOrderStatus().subscribe(result => {
      this.orderStatus = result;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
