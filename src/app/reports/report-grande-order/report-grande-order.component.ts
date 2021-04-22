import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {GrandeOrder} from '../models/grande-order';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ReportService} from '../services/report.service';
import {GrandeOrderItem} from '../models/grande-order-item';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  grandeOrder: GrandeOrder;

  constructor(private service: ReportService) {
    this.getDataFromObservable();
  }

  ngOnInit(): void {
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
      });
  }
}
