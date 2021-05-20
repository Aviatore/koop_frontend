import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StoreDataDialog} from '../models/store-data-dialog';
import {StoreService} from '../service/store.service';

@Component({
  selector: 'app-store-edit-dialog',
  templateUrl: './store-edit-dialog.component.html',
  styleUrls: ['./store-edit-dialog.component.css']
})
export class StoreEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: StoreDataDialog,
              private service: StoreService,
              private dialogRef: MatDialogRef<StoreEditDialogComponent>) { }

  ngOnInit(): void {
  }

  editProduct(productId: string, amountInMagazine: string): void {
    const amount = +amountInMagazine;
    this.service.editAmountsInStore(productId, amount, amount)
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
