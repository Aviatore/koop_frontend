import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDataEdit} from '../models/dialog-data-edit';
import {CoopOrderService} from '../service/coop-order.service';

@Component({
  selector: 'app-coop-last-order-edit-dialog',
  templateUrl: './coop-last-order-edit-dialog.component.html',
  styleUrls: ['./coop-last-order-edit-dialog.component.css'],
})
export class CoopLastOrderEditDialogComponent implements OnInit {

  msg: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataEdit,
              private service: CoopOrderService,
              private dialogRef: MatDialogRef<CoopLastOrderEditDialogComponent>) { }

  ngOnInit(): void {
  }

  editProduct(orderItemId: string, quantity: string): void {
    const num = +quantity;
    const result = this.service.editOrderItemQuantity(orderItemId, num);
    result.subscribe((data) => {
      if ('traceId' in data) {
        this.msg = data.detail;
        this.dialogRef.close({msg: data.detail});
      } else if ('error' in data) {
        this.msg = data.error;
        this.dialogRef.close({msg: data.error});
      } else {
        this.msg = data.info;
        this.dialogRef.close({msg: data.info});
      }
    });
  }
}
