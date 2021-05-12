import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {LoginService} from '../services/login.service';
import {ProductService} from '../services/product.service';
import {CategoriesService} from '../services/categories.service';
import {CountDownTokenService} from '../services/count-down-token.service';
import {RefTokenTimer, TokenTimer} from '../injection-tokens/tokens';
import {AppUrl} from '../urls/app-url';
import {Visibility} from './visibility/visibility';
import {Role} from './visibility/role';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatBadgeModule} from '@angular/material/badge';
import {OrderMakerService} from '../shop/services/order-maker.service';
import {BasketViewService} from '../basket-view/services/basket-view.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loginService: LoginService;
  tokenTimer: CountDownTokenService;
  refTokenTimer: CountDownTokenService;
  productService: ProductService;
  categoriesService: CategoriesService;

  urls = AppUrl.ROUTE;
  visibility = Visibility;
  role = Role;

  quantities: number;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private loginS: LoginService,
              private productS: ProductService,
              private categorieS: CategoriesService,
              private jwtHelper: JwtHelperService,
              private orderMakerService: OrderMakerService,
              @Inject(TokenTimer) private tokenT: CountDownTokenService,
              @Inject(RefTokenTimer) private refTokenT: CountDownTokenService,
              private basketService: BasketViewService) {
  }

  ngOnInit(): void {
    this.loginService = this.loginS;
    this.productService = this.productS;
    this.tokenTimer = this.tokenT;
    this.categoriesService = this.categorieS;
    this.refTokenTimer = this.refTokenT;

    this.orderMakerService.orderedItemsCount.subscribe(result => {
      this.quantities = result;
    });
  }

  LoginAction(): void {
    if (!this.isTokenExpired()) {
      this.loginService.LogOut();
      this.basketService.editBasketQuantity();
    }
    this.basketService.editBasketQuantity();
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }
}
