import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../services/product.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';

export enum SortDirections {
  name,
  price,
  unit,
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;
  categoryIdFromRoute: string;
  selected: string;
  sortD = SortDirections;

  constructor(private productS: ProductService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.categoryIdFromRoute = String(routeParams.get('categoryId'));
    console.log(`Getting products ...`);
    this.products = this.productS.GetProducts(this.categoryIdFromRoute);
    console.log(this.products);
  }

  Sort(orderBy: string): void {
    this.products = this.productS.GetProducts(this.categoryIdFromRoute, orderBy);
  }

  SortDirEnumToString(orderBy: string): string {
    let direction: string;
    const ord = Number(orderBy);
    switch (ord) {
      case SortDirections.name:
        direction = 'name';
        break;
      case SortDirections.price:
        direction = 'price';
        break;
      case SortDirections.unit:
        direction = 'unit';
        break;
      default:
        direction = 'name';
        break;
    }
    return direction;
  }
  openDialog(productId: number): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: {
        productID: productId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
