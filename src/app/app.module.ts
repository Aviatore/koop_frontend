import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UnitsService} from './units.service';
import { UnitComponent } from './unit/unit.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {UnauthorizeInterceptor} from './http-interceptors/unauthorize-interceptor';
import {Router, RouterState} from '@angular/router';
import {TokenRefreshInterceptor} from './http-interceptors/token-refresh-interceptor';
import {RefreshTokenService} from './refresh-token.service';
import {RoutingStateService} from './routing-state.service';


@NgModule({
  declarations: [
    AppComponent,
    UnitComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UnitsService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (refreshToken: RefreshTokenService,
                   routeState: RoutingStateService,
                   router: Router) => {
        return new UnauthorizeInterceptor(refreshToken, routeState, router);
      },
      multi: true,
      deps: [
        RefreshTokenService,
        RoutingStateService,
        Router
      ]
    },
    /*{
      provide: HTTP_INTERCEPTORS,
      useFactory: (refreshToken: RefreshTokenService,
                   routeState: RoutingStateService,
                   router: Router) => {
        return new TokenRefreshInterceptor(refreshToken, routeState, router);
      },
      multi: true,
      deps: [
        RefreshTokenService,
        RoutingStateService,
        Router
      ]
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
