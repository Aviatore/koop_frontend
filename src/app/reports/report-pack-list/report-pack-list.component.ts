import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PackList} from '../models/PackList';
import {ReportService} from '../services/report.service';

@Component({
  selector: 'app-report-pack-list',
  templateUrl: './report-pack-list.component.html',
  styleUrls: ['./report-pack-list.component.css']
})
export class ReportPackListComponent implements OnInit {

  packList$: Observable<PackList[]>;

  constructor(private service: ReportService) {
  }

  ngOnInit(): void {
    this.packList$ = this.service.getReportForPackers();
  }

}
