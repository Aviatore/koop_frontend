import {Component, OnInit} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Observable, Subscription} from 'rxjs';
import {SupplierReceivables} from '../models/supplier-receivables';

@Component({
  selector: 'app-report-supplier-receivables',
  templateUrl: './report-supplier-receivables.component.html',
  styleUrls: ['./report-supplier-receivables.component.css']
})
export class ReportSupplierReceivablesComponent implements OnInit {

  displayedColumns: string[] = [
    // 'supplierId',
    'supplierName',
    'supplierAbbr',
    'receivables',
    'email',
    'phone'
  ];
  size = 3;
  pageIndex = 0;
  dataSource: SupplierReceivables[];
  // data: SupplierReceivables[] = [];

  constructor(private service: ReportService) {
  }

  ngOnInit(): void {
    this.getDataFromObservable();
    console.log();
  }

  getDataFromObservable(): void {
    this.service.getReportSupplierReceivables()
      .subscribe((data) => {
        this.dataSource = this.sliceDataSource(data);
      });
  }

  sliceDataSource(suppliers: SupplierReceivables[]): SupplierReceivables[] {
    return  suppliers.slice(0, 3);
  }

  /*paginate(event: any): void {
    this.pageIndex = event;
    this.dataSource = this.data.slice(event * this.size - this.size, event * this.size);
  }*/

}
