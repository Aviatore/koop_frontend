import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Observable} from 'rxjs';
import {CoopDept} from '../models/coop-dept';
import {Guid} from 'guid-typescript';
import {MatTableDataSource} from '@angular/material/table';
import {SupplierReceivables} from '../models/supplier-receivables';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Info} from '../models/info';

@Component({
  selector: 'app-report-coop-debt',
  templateUrl: './report-coop-debt.component.html',
  styleUrls: ['./report-coop-debt.component.css']
})
export class ReportCoopDebtComponent implements OnInit, AfterViewInit {

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

  info: Info;
  problem: string;

  constructor(private service: ReportService) {
    this.getDataFromObservable();
  }

  ngOnInit(): void {
  }

  getDataFromObservable(): void {
    this.service.getReportCoopDept()
      .subscribe((data) => {
          if ('info' in data) {
            this.info = data;
            this.problem = undefined;
            this.dataSource = undefined;
          } else {
            this.info = undefined;
            this.problem = undefined;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error => {
          this.problem = error.error;
          this.problem = undefined;
          this.dataSource = undefined;
        });
  }

  ngAfterViewInit(): void {
    this.getDataFromObservable();
    /*this.service.getReportCoopDept()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });*/
  }
}
