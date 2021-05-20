import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {AvailQuantities, OrderMakerService} from '../services/order-maker.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface OrderDialogData {
  productName: string;
  productId: string;
  quantities: number;
}

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  availableQuantities: Observable<AvailQuantities[]>;

  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
              private orderMakerService: OrderMakerService,
              @Inject(MAT_DIALOG_DATA) public data: OrderDialogData) { }

  ngOnInit(): void {
    this.availableQuantities = this.orderMakerService.getProductAvailQuantities(this.data.productId).pipe(takeUntil(this.onDestroy$));
    this.orderMakerService.getProductAvailQuantities(this.data.productId).pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      console.log('results');
      console.log(this.data.productId);
      result.forEach(p => console.log(p.quantity));
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selected(event: MatSelectChange): void {
    this.data.quantities = event.value;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
