import {Component, OnInit} from '@angular/core';
import {homePageUrl} from '../../environments/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  homePage = homePageUrl;

  constructor() {
  }

  ngOnInit(): void {
  }

}
