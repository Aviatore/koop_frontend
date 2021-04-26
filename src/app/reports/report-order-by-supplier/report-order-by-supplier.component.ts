import {Component, OnInit} from '@angular/core';
import {Guid} from 'guid-typescript';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-report-order-by-supplier',
  templateUrl: './report-order-by-supplier.component.html',
  styleUrls: ['./report-order-by-supplier.component.css']
})
export class ReportOrderBySupplierComponent implements OnInit {

  displayedColumns: string[] = [
    'productId',
    'productName',
    'price',
    'quantity',
    'unitName',
    'totalPrice'
  ];
  dataSource: string[];
  slideLabel = 'Ostatnie zamówienie';

  control = new FormControl();
  streets: string[] = ['Champs-Élysées test test test', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onChange(value): void {
   this.slideLabel = value ? 'Historia zamówień' : 'Ostatnie zamówienie';
  }

}
