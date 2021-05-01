import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../models/dialog-data';
import {CoopOrderService} from '../service/coop-order.service';
import {CoopLastOrderComponent} from '../coop-last-order/coop-last-order.component';

@Component({
  selector: 'app-coop-last-order-del-dialog',
  templateUrl: './coop-last-order-del-dialog.component.html',
  styleUrls: ['./coop-last-order-del-dialog.component.css']
})
export class CoopLastOrderDelDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private service: CoopOrderService,
              private dialogRef: MatDialogRef<CoopLastOrderDelDialogComponent>) { }

  ngOnInit(): void {
  }

  delProduct(orderItemId: string): void {
    const result = this.service.deleteOrderedItem(orderItemId);
    this.dialogRef.close();
    result.subscribe((data) => {
      if ('traceId' in data) {
        console.log(data.detail);
      } else {
        console.log(data.info);
      }
    });

  }
}
