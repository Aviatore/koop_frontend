import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSidenavClose(): void {
    this.sidenavClose.emit();
  }

  getCoopDept(): void {
    this.router.navigate(['report-coop-debt']);
  }

  getPackList(): void {
    this.router.navigate(['report-pack-list']);
  }

  getSupplierReceivables(): void {
    this.router.navigate(['report-supplier-receivables']);
  }
}
