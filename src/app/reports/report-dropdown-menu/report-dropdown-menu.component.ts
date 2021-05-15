import { Component, OnInit } from '@angular/core';
import {AppUrl} from '../../urls/app-url';
import {Visibility} from '../../menu/visibility/visibility';
import {Role} from '../../menu/visibility/role';

@Component({
  selector: 'app-report-dropdown-menu',
  templateUrl: './report-dropdown-menu.component.html',
  styleUrls: ['./report-dropdown-menu.component.css']
})
export class ReportDropdownMenuComponent implements OnInit {

  urls = AppUrl.ROUTE;
  visibility = Visibility;
  role = Role;

  constructor() { }

  ngOnInit(): void {
  }
}
