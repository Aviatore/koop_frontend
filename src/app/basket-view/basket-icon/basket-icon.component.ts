import { Component, OnInit } from '@angular/core';
import {AppUrl} from '../../urls/app-url';

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.css']
})
export class BasketIconComponent implements OnInit {

  url = AppUrl.ROUTE;

  constructor() { }

  ngOnInit(): void {
  }

}
