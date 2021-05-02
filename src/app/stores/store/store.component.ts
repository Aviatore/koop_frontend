import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../service/store.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductsStore} from '../models/products-store';
import {Info} from '../models/info';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'stockSupplierId',
    'supplierName',
    'supplierAbbr',
    // 'productId',
    'productName',
    // 'categoryName',
    'price',
    // 'description',
    'amountInMagazine',
    'amountMax',
    // 'magazine',
    // 'deposit',
    // 'picture',
    // 'unitId',
    // 'supplierId',
    'unitName',
    'available',
    'blocked',
    'actionButtons'
  ];
  info: Info;
  problem: string;
  storedProducts: ProductsStore[];
  dataSource: MatTableDataSource<ProductsStore>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StoreService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.service.getProductsInStore()
      .subscribe((data) => {
          if ('info' in data) {
            this.info = data;
            this.storedProducts = undefined;
            this.problem = undefined;
          } else {
            this.info = undefined;
            this.storedProducts = data;
            this.problem = undefined;

            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            return this.storedProducts;
          }
        },
        err => {
          this.info = undefined;
          this.storedProducts = undefined;
          this.problem = err.error.detail;
        });
  }

}
