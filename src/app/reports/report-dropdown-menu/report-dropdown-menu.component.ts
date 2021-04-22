import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppUrl} from '../../urls/app-url';

@Component({
  selector: 'app-report-dropdown-menu',
  templateUrl: './report-dropdown-menu.component.html',
  styleUrls: ['./report-dropdown-menu.component.css']
})
export class ReportDropdownMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getCoopDept(): void {
    this.router.navigate([AppUrl.ROUTE.getReportCoopDebt]);
  }

  getPackList(): void {
    this.router.navigate([AppUrl.ROUTE.getReportPackList]);
  }

  getSupplierReceivables(): void {
    this.router.navigate([AppUrl.ROUTE.getReportSupReceivables]);
  }
}
