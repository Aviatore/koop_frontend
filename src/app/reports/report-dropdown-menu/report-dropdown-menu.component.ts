import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
    this.router.navigate(['report-coop-dept']);
  }
}
