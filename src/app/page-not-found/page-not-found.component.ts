import {Component, OnInit} from '@angular/core';
import {AppUrl} from '../urls/app-url';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  homePage = AppUrl.HOME_PAGE_URL;

  constructor() {
  }

  ngOnInit(): void {
  }

}
