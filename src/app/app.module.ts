import {inject, Inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UnitsService} from './services/units.service';
import {UnitComponent} from './unit/unit.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {UnauthorizeInterceptor} from './http-interceptors/unauthorize-interceptor';
import {Router} from '@angular/router';
import {RefreshTokenService} from './services/refresh-token.service';
import {RoutingStateService} from './services/routing-state.service';
import {LoginService} from './services/login.service';
import {CounterComponent} from './counter/counter.component';
import {CountDownTokenService} from './services/count-down-token.service';
import {RefTokenTimer, TokenTimer} from './injection-tokens/tokens';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ReportModule} from './reports/report.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppPaginatorConfig} from './app-paginator-config';

import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePL from '@angular/common/locales/pl';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LayoutComponent } from './layout/layout.component';
import { HamburgerMenuComponent } from './menu/hamburger-menu/hamburger-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { SuppliersListComponent } from './suppliers/suppliers-list/suppliers-list.component';
import { SupplierDetailComponent } from './suppliers/supplier-detail/supplier-detail.component';
import {MatTableModule} from '@angular/material/table';
import { SuppliersModule } from './suppliers/suppliers.module';

registerLocaleData(localePL);


@NgModule({
  declarations: [
    AppComponent,
    UnitComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    CounterComponent,
    PageNotFoundComponent,
    LayoutComponent,
    HamburgerMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ReportModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FlexLayoutModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    SuppliersModule,
    AppRoutingModule
  ],
  exports: [AppRoutingModule, LayoutComponent],
  providers: [
    UnitsService,
    CookieService,
    {provide: LOCALE_ID, useValue: 'pl'},
    { provide: MatPaginatorIntl, useValue: AppPaginatorConfig() },
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
        CountDownTokenService,
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
