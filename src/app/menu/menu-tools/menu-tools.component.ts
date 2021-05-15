import { Component, OnInit } from '@angular/core';
import {AppUrl} from '../../urls/app-url';
import {Visibility} from '../visibility/visibility';
import {Role} from '../visibility/role';

@Component({
  selector: 'app-menu-tools',
  templateUrl: './menu-tools.component.html',
  styleUrls: ['./menu-tools.component.css']
})
export class MenuToolsComponent implements OnInit {

  urls = AppUrl.ROUTE;
  visibility = Visibility;
  role = Role;

  constructor() { }

  ngOnInit(): void {
  }

}
