import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../services/report.service';
import {SupplierReceivables} from '../models/supplier-receivables';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-report-supplier-receivables',
  templateUrl: './report-supplier-receivables.component.html',
  styleUrls: ['./report-supplier-receivables.component.css']
})
export class ReportSupplierReceivablesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'supplierId',
    'supplierName',
    'supplierAbbr',
    'receivables',
    'email',
    'phone'
  ];
  dataSource: MatTableDataSource<SupplierReceivables>;
  itemsPerPage = [10, 25, 50, 100];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ReportService) {
    this.getDataFromObservable();
  }

  ngOnInit(): void {
  }

  getDataFromObservable(): void {
    this.service.getReportSupplierReceivables()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  ngAfterViewInit(): void {
    this.service.getReportSupplierReceivables()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     });
  }

}
