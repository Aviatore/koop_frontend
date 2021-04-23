import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {GrandeOrder} from '../models/grande-order';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ReportService} from '../services/report.service';
import {GrandeOrderItem} from '../models/grande-order-item';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-report-grande-order',
  templateUrl: './report-grande-order.component.html',
  styleUrls: ['./report-grande-order.component.css']
})
export class ReportGrandeOrderComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'orderedItemId',
    // 'productId',
    'productName',
    'price',
    'fundPrice',
    'totalPrice',
    'totalFundPrice',
    'quantity',
    'unitName',
    // 'coopId',
    'coopFirstName',
    'coopLastName',
    'coopFundValue',
    // 'supplierId',
    'supplierName',
    // 'supplierAbbr'
  ];
  dataSource: MatTableDataSource<GrandeOrderItem>;
  itemsPerPage = [10, 25, 50, 100];

  control = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  grandeOrder: GrandeOrder;

  constructor(private service: ReportService) {
    this.getDataFromObservable();
  }

  ngOnInit(): void {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit(): void {
    this.getDataFromObservable();
  }

  getDataFromObservable(): void {
    this.service.getReportGrandeOrder()
      .subscribe(o => {
        this.grandeOrder = {
          orderId: o.orderId,
          orderStartDate: o.orderStartDate,
          orderStopDate: o.orderStopDate,
          orderStatus: o.orderStatus,
          totalGrandePrice: o.totalGrandePrice,
          totalGrandeFundPrice: o.totalGrandeFundPrice,
          grandeOrderItem: o.grandeOrderItem
        };
        this.dataSource = new MatTableDataSource(o.grandeOrderItem);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        return this.grandeOrder;
      });
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
