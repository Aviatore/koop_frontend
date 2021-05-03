import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StoreDataDialog} from '../models/store-data-dialog';

@Component({
  selector: 'app-store-edit-dialog',
  templateUrl: './store-edit-dialog.component.html',
  styleUrls: ['./store-edit-dialog.component.css']
})
export class StoreEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: StoreDataDialog) { }

  ngOnInit(): void {
  }

  editProduct(productId: string, amountInMagazine: string, amountMax: string): void {

  }
}
