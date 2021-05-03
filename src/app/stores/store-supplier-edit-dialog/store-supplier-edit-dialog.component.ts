import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StoreSupplierDataDialog} from '../models/store-supplier-data-dialog';

@Component({
  selector: 'app-store-supplier-edit-dialog',
  templateUrl: './store-supplier-edit-dialog.component.html',
  styleUrls: ['./store-supplier-edit-dialog.component.css']
})
export class StoreSupplierEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: StoreSupplierDataDialog) { }

  ngOnInit(): void {
  }

  editProduct(productId: string, value: string): void {
  }
}
