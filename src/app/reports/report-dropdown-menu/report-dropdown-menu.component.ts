import { Component, OnInit } from '@angular/core';
import {AppUrl} from '../../urls/app-url';

@Component({
  selector: 'app-report-dropdown-menu',
  templateUrl: './report-dropdown-menu.component.html',
  styleUrls: ['./report-dropdown-menu.component.css']
})
export class ReportDropdownMenuComponent implements OnInit {

  urls = AppUrl.ROUTE;

  constructor() { }

  ngOnInit(): void {
  }
}
