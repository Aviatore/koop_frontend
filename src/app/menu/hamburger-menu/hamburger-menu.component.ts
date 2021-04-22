import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {AppUrl} from '../../urls/app-url';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  urls = AppUrl.ROUTE;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSidenavClose(): void {
    this.sidenavClose.emit();
  }

  getCoopDept(): void {
    this.router.navigate([this.urls.getReportCoopDebt]);
  }

  getPackList(): void {
    this.router.navigate([this.urls.getReportPackList]);
  }

  getSupplierReceivables(): void {
    this.router.navigate([this.urls.getReportSupReceivables]);
  }
}
