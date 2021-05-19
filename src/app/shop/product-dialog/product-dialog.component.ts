import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProductDialog, ProductDialogService} from '../services/product-dialog.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})

export class ProductDialogComponent implements OnInit {
  // product: ProductDialog;
  product: Observable<ProductDialog>;
  constructor(private productS: ProductDialogService, @Inject(MAT_DIALOG_DATA) public data) {}
  ngOnInit(): void {
    //  this.productS.GetProductsById(this.data.productID).subscribe(result => {
    //    this.product = result;
    //    console.log(JSON.stringify(result));
    // });
    this.product = this.productS.GetProductsById(this.data.productID);
    console.log('XD' + this.data.productID);
  }
}
