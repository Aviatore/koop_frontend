import {inject, Inject, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken} from '@angular/core';

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
import {Router, RouterState} from '@angular/router';
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
import {MatPaginatorIntl} from '@angular/material/paginator';
import { LayoutComponent } from './layout/layout.component';
import { HamburgerMenuComponent } from './menu/hamburger-menu/hamburger-menu.component';
import {MaterialModule} from './material/material.module';
import { CategoriesComponent } from './categories/categories.component';
import { ProductComponent } from './product/product.component';
import {CategoriesService} from './services/categories.service';
import {AdminModule} from './admin/admin.module';
import {ProductService} from './services/product.service';
import {CoopOrderModule} from './coop-order/coop-order.module';
import {JwtModule} from '@auth0/angular-jwt';
import {StoreModule} from './stores/store.module';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {LoggerService} from './services/logger.service';
import {UserPanelModule} from './user-panel/user-panel.module';
import { EmailFormComponent } from './password-reset/email-form/email-form.component';
import {PasswordResetModule} from './password-reset/password-reset.module';
import {Visibility} from './menu/visibility/visibility';
import {MatSelectModule} from '@angular/material/select';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

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
    CategoriesComponent,
    ProductComponent,
    EmailFormComponent,
    ProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    NgbModule,
    MaterialModule,
    ReportModule,
    CoopOrderModule,
    StoreModule,
    AdminModule,
    UserPanelModule,
    PasswordResetModule,
    AppRoutingModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    UnitsService,
    CookieService,
    CategoriesService,
    ProductService,
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
          inject(TokenTimer), inject(RefTokenTimer), inject(LoggerService));
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
export class AppModule {
}
