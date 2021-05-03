import { Component, OnInit } from '@angular/core';
import {StoreService} from '../service/store.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {SupplierList} from '../models/supplier-list';
import {filter, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-store-supplier',
  templateUrl: './store-supplier.component.html',
  styleUrls: ['./store-supplier.component.css']
})
export class StoreSupplierComponent implements OnInit {

  suppId: string;

  control = new FormControl();
  filteredSuppliers: Observable<SupplierList[]>;

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
  }
}
