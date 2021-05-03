import {Component, OnInit, ViewChild} from '@angular/core';
import {StoreService} from '../service/store.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {SupplierList} from '../models/supplier-list';
import {filter, map, startWith, switchMap} from 'rxjs/operators';
import {Info} from '../models/info';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SupplierProductsList} from '../models/supplier-products-list';
import {SupplierStore} from '../models/supplier-store';

@Component({
  selector: 'app-store-supplier',
  templateUrl: './store-supplier.component.html',
  styleUrls: ['./store-supplier.component.css']
})
export class StoreSupplierComponent implements OnInit {

  suppId: string;

  control = new FormControl();
  filteredSuppliers: Observable<SupplierList[]>;

  info: Info;
  problem: string;
  supplierStore: SupplierStore;
  productsList: SupplierProductsList[];
  dataSource: MatTableDataSource<SupplierProductsList>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StoreService) { }

  ngOnInit(): void {
    this.filteredSuppliers = this.filterSuppliers();
  }

  filterSuppliers(): Observable<SupplierList[]> {
    return this.control.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value))
      );
  }

  private _filter(value: string): Observable<SupplierList[]> {
    const enteredValue = value.toLowerCase();
    return this.service.getSuppliers().pipe(
      filter(data => !!data),
      map((data) => {
        return data.filter(option => option.supplierName.toLowerCase().includes(enteredValue));
      })
    );
  }

  getSupplierProducts(supplierId: string): void {
    this.suppId = supplierId;
    this.service.getSupplierStore(supplierId)
      .subscribe((data) => {
          if ('info' in data) {
            this.info = data;
            this.supplierStore = undefined;
            this.problem = undefined;
          } else {
            this.info = undefined;
            this.supplierStore = data;
            this.problem = undefined;

            this.dataSource = new MatTableDataSource(data.supplierProductsList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            return this.supplierStore;
          }
        },
        err => {
          this.info = undefined;
          this.supplierStore = undefined;
          this.problem = err.error.detail;
        });
  }
}
