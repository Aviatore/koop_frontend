import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../services/product.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private productS: ProductService) { }

  ngOnInit(): void {
    console.log(`Getting products ...`);
    this.products = this.productS.GetProducts();
    console.log(this.products);
  }

}
