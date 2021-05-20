import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {GrandeOrder} from '../models/grande-order';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ReportService} from '../services/report.service';
import {GrandeOrderItem} from '../models/grande-order-item';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrderStartDate} from '../models/order-start-date';

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

  dates$: Observable<OrderStartDate[]>;
  dates: string[] = [];
  startDate: Date;
  endDate: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  grandeOrder: GrandeOrder;
  grandeOrderLen: number;

  constructor(private service: ReportService) {
    this.getDataFromObservable();
    this.dates$ = service.getGrandeStartDates();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getDataFromObservable();
  }

  getDates(): void {
    if (this.startDate !== undefined && this.endDate !== undefined) {
      this.dates = this.getArrayFromObservable(new Date(this.startDate), new Date(this.endDate));
    }
  }

  getArrayFromObservable(startDate: Date, endDate: Date): string[] {
    const tmpArray: string[] = [];
    this._filter(startDate, endDate).forEach(x => {
      x.forEach(item => {
        tmpArray.push(`${item.orderStartDate}`.replace('T', ' '));
      });
    });

    return tmpArray;
  }

  getDataFromObservable(dateStart?: string): void {
    if (dateStart === undefined){
      dateStart = '';
    }

    this.service.getReportGrandeOrder(dateStart)
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
        this.grandeOrderLen = this.dataSource.data.length;

        return this.grandeOrder;
      });
  }

  private _filter(startDate: Date, endDate: Date): Observable<OrderStartDate[]> {
    return this.dates$.pipe(
      map(dates => dates.filter(item =>
        new Date(item.orderStartDate) >= startDate &&
        new Date(item.orderStartDate) <= endDate))
    );
  }

}
