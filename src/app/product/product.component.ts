import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../services/product.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private productS: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const categoryIdFromRoute = String(routeParams.get('categoryId'));
    console.log(`Getting products ...`);
    this.products = this.productS.GetProducts(categoryIdFromRoute);
    console.log(this.products);
  }

}
