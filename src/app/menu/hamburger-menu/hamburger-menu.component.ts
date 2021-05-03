import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AppUrl} from '../../urls/app-url';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  urls = AppUrl.ROUTE;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSidenavClose(): void {
    this.sidenavClose.emit();
  }
}
