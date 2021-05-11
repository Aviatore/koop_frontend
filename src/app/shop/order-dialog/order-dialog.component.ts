import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {AvailQuantities, OrderMakerService} from '../services/order-maker.service';
import {Observable} from 'rxjs';

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
export class OrderDialogComponent implements OnInit {
  availableQuantities: Observable<AvailQuantities[]>;

  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
              private orderMakerService: OrderMakerService,
              @Inject(MAT_DIALOG_DATA) public data: OrderDialogData) { }

  ngOnInit(): void {
    this.availableQuantities = this.orderMakerService.getProductAvailQuantities(this.data.productId);
    this.orderMakerService.getProductAvailQuantities(this.data.productId).subscribe(result => {
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
}
