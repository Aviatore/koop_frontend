import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AppUrl} from '../../urls/app-url';
import {Visibility} from '../visibility/visibility';
import {Role} from '../visibility/role';
import {BasketViewService} from '../../basket-view/services/basket-view.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  urls = AppUrl.ROUTE;
  visibility = Visibility;
  role = Role;

  constructor(private basketService: BasketViewService,
              private jwtHelper: JwtHelperService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  onSidenavClose(): void {
    this.sidenavClose.emit();
  }

  LoginAction(): void {
    if (!this.isTokenExpired()) {
      this.loginService.LogOut();
      this.basketService.editBasketQuantity();
    }
    this.basketService.editBasketQuantity();
  }

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }
}
