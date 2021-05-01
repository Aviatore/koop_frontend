import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../models/dialog-data';
import {CoopOrderService} from '../service/coop-order.service';

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
    result.subscribe((data) => {
      if ('traceId' in data) {
        this.dialogRef.close({msg: data.detail});
      } else {
        this.dialogRef.close({msg: data.info});
      }
    });
  }
}
