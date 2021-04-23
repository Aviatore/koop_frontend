import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Inject} from '@angular/core';
import {CountDownTokenService} from '../services/count-down-token.service';
import {RefTokenTimer, TokenTimer} from '../injection-tokens/tokens';
import {AppUrl} from '../urls/app-url';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  loginService: LoginService;
  tokenTimer: CountDownTokenService;
  refTokenTimer: CountDownTokenService;

  urls = AppUrl.ROUTE;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private loginS: LoginService,
              @Inject(TokenTimer) private tokenT: CountDownTokenService,
              @Inject(RefTokenTimer) private refTokenT: CountDownTokenService) {
  }

  ngOnInit(): void {
    this.loginService = this.loginS;
    this.tokenTimer = this.tokenT;
    this.refTokenTimer = this.refTokenT;
  }

  LoginAction(): void {
    if (this.loginService.loginResult) {
      this.loginService.LogOut();
    }
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
