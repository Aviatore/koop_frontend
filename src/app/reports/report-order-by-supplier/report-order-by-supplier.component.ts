import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {filter, map, startWith, switchMap} from 'rxjs/operators';
import {Supplier} from '../models/supplier';
import {ReportService} from '../services/report.service';
import {SupplierReport} from '../models/supplier-report';


@Component({
  selector: 'app-report-order-by-supplier',
  templateUrl: './report-order-by-supplier.component.html',
  styleUrls: ['./report-order-by-supplier.component.css']
})
export class ReportOrderBySupplierComponent implements OnInit {

  displayedColumns: string[] = [
    // 'productId',
    'productName',
    'price',
    'quantity',
    'unitName',
    'totalPrice'
  ];
  slideLabel = 'Ostatnie zamówienie';
  slideChecked = false;
  suppId: string;

  control = new FormControl();
  filteredSuppliers: Observable<Supplier[]>;
  supplierReport: SupplierReport;
  orderReport$: Observable<SupplierReport>;

  panelOpenState = false;

  constructor(private service: ReportService) {
  }

  ngOnInit(): void {
    this.filteredSuppliers = this.filterSuppliers();
  }

  filterSuppliers(): Observable<Supplier[]> {
    return this.control.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value))
      );
  }

  private _filter(value: string): Observable<Supplier[]> {
    const enteredValue = value.toLowerCase();
    return this.service.getSuppliers().pipe(
      filter(data => !!data),
      map((data) => {
        return data.filter(option => option.supplierName.toLowerCase().includes(enteredValue));
      })
    );
  }

  onChange(value): void {
    this.slideLabel = value ? 'Historia zamówień' : 'Ostatnie zamówienie';
    this.getReport(this.suppId);
  }

  getReport(selectedField: string): void {
    this.suppId = selectedField;

    if (this.slideChecked) {
      this.orderReport$ = this.service.getReportOrdersGrandeBySupplier(selectedField);
    }
    else {
      this.orderReport$ = this.service.getReportLastGrandeOrderBySupplier(selectedField);
    }

    if (selectedField !== undefined) {
      this.orderReport$
        .subscribe(o => {
          this.supplierReport = {
            supplierId: o.supplierId,
            supplierName: o.supplierName,
            supplierAbbr: o.supplierAbbr,
            email: o.email,
            totalProfit: o.totalProfit,
            supplierReportOrder: o.supplierReportOrder
          };

          return this.supplierReport;
        });
    }
  }
}
