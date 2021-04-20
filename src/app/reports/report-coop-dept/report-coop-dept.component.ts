import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Observable} from 'rxjs';
import {CoopDept} from '../models/coop-dept';
import {Guid} from 'guid-typescript';
import {MatTableDataSource} from '@angular/material/table';
import {SupplierReceivables} from '../models/supplier-receivables';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-report-coop-dept',
  templateUrl: './report-coop-dept.component.html',
  styleUrls: ['./report-coop-dept.component.css']
})
export class ReportCoopDeptComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    // 'id',
    'firstName',
    'lastName',
    'debt',
    'email',
    'phoneNumber'
  ];
  dataSource: MatTableDataSource<CoopDept>;
  itemsPerPage = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: ReportService) {
    this.getDataFromObservable();
  }

  ngOnInit(): void {
  }

  getDataFromObservable(): void {
    this.service.getReportCoopDept()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  ngAfterViewInit(): void {
    this.service.getReportCoopDept()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
