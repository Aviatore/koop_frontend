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
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';

export enum SortDirections {
  name,
  price,
  unit,
}

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

  selected: string;
  sortD = SortDirections;
  categoryIdFromRoute: string;

  constructor(private productS: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private orderMakerService: OrderMakerService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.categoryIdFromRoute = String(routeParams.get('categoryId'));
    console.log(`Getting products ...`);
    this.products = this.productS.GetProducts(this.categoryIdFromRoute).pipe(takeUntil(this.onDestroy$));
    console.log(this.products);
    this.orderMakerService.checkOrderStatus().subscribe(result => {
      this.orderStatus = result;
    });
  }

  Sort(orderBy: string): void {
    this.products = this.productS.GetProducts(this.categoryIdFromRoute, orderBy);
  }

  SortDirEnumToString(orderBy: string): string {
    let direction: string;
    const ord = Number(orderBy);
    switch (ord) {
      case SortDirections.name:
        direction = 'name';
        break;
      case SortDirections.price:
        direction = 'price';
        break;
      case SortDirections.unit:
        direction = 'unit';
        break;
      default:
        direction = 'name';
        break;
    }
    return direction;
  }
  openDialog(productId: number): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        productID: productId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
