import {Component, OnInit} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Observable} from 'rxjs';
import {SupplierReceivables} from '../models/supplier-receivables';

@Component({
  selector: 'app-report-supplier-receivables',
  templateUrl: './report-supplier-receivables.component.html',
  styleUrls: ['./report-supplier-receivables.component.css']
})
export class ReportSupplierReceivablesComponent implements OnInit {

  supplierReceivables$: Observable<SupplierReceivables[]>;

  constructor(private service: ReportService) {
  }

  ngOnInit(): void {
    this.supplierReceivables$ = this.service.getReportSupplierReceivables();
  }

}
