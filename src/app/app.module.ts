import {inject, Inject, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UnitsService} from './services/units.service';
import { UnitComponent } from './unit/unit.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {UnauthorizeInterceptor} from './http-interceptors/unauthorize-interceptor';
import {Router, RouterState} from '@angular/router';
import {RefreshTokenService} from './services/refresh-token.service';
import {RoutingStateService} from './services/routing-state.service';
import {LoginService} from './services/login.service';
import { CounterComponent } from './counter/counter.component';
import {CountDownTokenService} from './services/count-down-token.service';
import {RefTokenTimer, TokenTimer} from './injection-tokens/tokens';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AdminModule} from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
    UnitComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    UnitsService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (refreshToken: RefreshTokenService,
                   routeState: RoutingStateService,
                   router: Router,
                   loginService: LoginService,
                   tokenT: CountDownTokenService,
                   refTokenT: CountDownTokenService) => {
        return new UnauthorizeInterceptor(refreshToken, routeState, router, loginService,
          inject(TokenTimer), inject(RefTokenTimer));
      },
      multi: true,
      deps: [
        RefreshTokenService,
        RoutingStateService,
        Router,
        LoginService,
        CountDownTokenService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
