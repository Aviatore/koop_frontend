import {Component, OnInit} from '@angular/core';
import {AppUrl} from '../urls/app-url';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToHomePage(): void {
    this.router.navigate([AppUrl.ROUTE.getHome]);
  }
}
