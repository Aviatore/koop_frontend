import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from '../../services/product.service';
import {Router} from '@angular/router';
import {AppUrl} from '../../urls/app-url';
import {OrderDialogComponent} from '../order-dialog/order-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderMakerService} from '../services/order-maker.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ErrorResponse} from '../../admin/admin-interfaces/errorResponse';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  @Input() product: Product;
  @Input() orderStatusContainer: ErrorResponse;
  orderStatus: string;
  orderStart: string;
  isClosed: boolean;

  emptyImage = AppUrl.EMPTYIMAGE;
  domain = AppUrl.DOMAIN;
  quantities: number;
  available = true;
  alertVisibility: number;
  alertVisibilityTimeSec = 5;
  orderMakerS: OrderMakerService;
  constructor(private router: Router,
              public dialog: MatDialog,
              private orderMakerService: OrderMakerService) { }

  ngOnInit(): void {
    this.orderMakerS = this.orderMakerService;
    if (!this.product.available) {
      this.available = false;
    }

    const os = this.orderStatusContainer.detail.split(';');
    if (os.length === 3) {
      this.orderStart = `Sklep zostanie otwarty ${os[1]} o godz. ${os[2]}`;
    }
    this.orderStatus = os[0];

    if (this.orderStatus === 'closed' || this.orderStatus === 'planned') {
      this.isClosed = true;
    } else {
      this.isClosed = false;
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
        this.orderMakerService.errorResponse.detail = 'Aktualizowanie danych użytkownika. Proszę czekać ...';
        this.orderMakerService.errorResponse.status = 300;
        this.alertVisibility = 1;

        this.orderMakerService.makeOrder(productId, result).pipe(takeUntil(this.onDestroy$)).subscribe(r => {
          this.orderMakerS.errorResponse = r.body;
          console.log(`Response: ${JSON.stringify(r.body)}`);
          this.orderMakerService.isProductAvailable(productId).pipe(takeUntil(this.onDestroy$)).subscribe(availResult => {
            this.available = availResult.detail === 'True';
            console.log(`Is available: ${this.available}`);
            this.showAlert().subscribe();
          });
          this.orderMakerService.setBadge();
        });
      }
    });
  }

  showAlert(): Observable<any> {
    return new Observable(observer => {
      this.alertVisibility = this.alertVisibilityTimeSec;

      const handler = setInterval(() => {
        this.alertVisibility--;

        if (this.alertVisibility === 0) {
          clearInterval(handler);
        }
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
