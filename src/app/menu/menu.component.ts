import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {ProductService} from '../services/product.service';
import {Inject} from '@angular/core';
import {CountDownTokenService} from '../services/count-down-token.service';
import {RefTokenTimer, TokenTimer} from '../injection-tokens/tokens';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  loginService: LoginService;
  tokenTimer: CountDownTokenService;
  refTokenTimer: CountDownTokenService;
  productService: ProductService;

  constructor(private loginS: LoginService,
              @Inject(TokenTimer) private tokenT: CountDownTokenService,
              @Inject(RefTokenTimer) private refTokenT: CountDownTokenService,
              private productS: ProductService) { }

  ngOnInit(): void {
    this.loginService = this.loginS;
    this.productService = this.productS;
    this.tokenTimer = this.tokenT;
    this.refTokenTimer = this.refTokenT;
  }

  LoginAction(): void {
    if (this.loginService.loginResult)
    {
      this.loginService.LogOut();
    }
  }
}
