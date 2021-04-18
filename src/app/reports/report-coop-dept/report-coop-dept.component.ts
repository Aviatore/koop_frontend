import {Component, OnInit} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Observable} from 'rxjs';
import {CoopDept} from '../models/coop-dept';

@Component({
  selector: 'app-report-coop-dept',
  templateUrl: './report-coop-dept.component.html',
  styleUrls: ['./report-coop-dept.component.css']
})
export class ReportCoopDeptComponent implements OnInit {

  coopDept$: Observable<CoopDept[]>;

  constructor(private service: ReportService) {
  }

  ngOnInit(): void {
    this.coopDept$ = this.service.getReportCoopDept();
  }
}
