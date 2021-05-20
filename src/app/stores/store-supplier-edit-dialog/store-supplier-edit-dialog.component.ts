import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StoreSupplierDataDialog} from '../models/store-supplier-data-dialog';
import {StoreService} from '../service/store.service';

@Component({
  selector: 'app-store-supplier-edit-dialog',
  templateUrl: './store-supplier-edit-dialog.component.html',
  styleUrls: ['./store-supplier-edit-dialog.component.css']
})
export class StoreSupplierEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: StoreSupplierDataDialog,
              private service: StoreService,
              private dialogRef: MatDialogRef<StoreSupplierEditDialogComponent>) { }

  ngOnInit(): void {
  }

  editProduct(productId: string, amountMax: string, available: boolean, blocked: boolean): void {
    const amount = +amountMax;
    this.service.editProductAvailability(productId, amount, available, blocked)
      .subscribe((data) => {
          this.dialogRef.close({msg: data.info});
        },
        err => {
          if ('error' in err.error) {
            this.dialogRef.close({msg: err.error.error});
          } else if ('detail' in err.error) {
            this.dialogRef.close({msg: err.error.detail});
          }
        });
  }
}
