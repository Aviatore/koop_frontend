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
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { LayoutComponent } from './layout/layout.component';
import { HamburgerMenuComponent } from './menu/hamburger-menu/hamburger-menu.component';
import {MaterialModule} from './material/material.module';
import { CategoriesComponent } from './categories/categories.component';
import { ProductComponent } from './shop/product/product.component';
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
import {CategoryModule} from './categories/category.module';
import {JwtParserService} from './services/jwt-parser.service';
import {BasketViewModule} from './basket-view/basket-view.module';
import {MatBadgeModule} from '@angular/material/badge';
import { OrderDialogComponent } from './shop/order-dialog/order-dialog.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {ShopModule} from './shop/shop.module';

export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}
import {MatMenuModule} from '@angular/material/menu';
import { SuppliersListComponent } from './admin/modules/suppliers/suppliers-list/suppliers-list.component';
import { SupplierDetailComponent } from './admin/modules/suppliers/supplier-detail/supplier-detail.component';
import {MatTableModule} from '@angular/material/table';
import { SuppliersModule } from './admin/modules/suppliers/suppliers.module';
import { SupplierInfoComponent } from './admin/modules/suppliers/supplier-info/supplier-info.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { OrderGrandeComponent } from './order-grande/order-grande.component';
import { OrderGrandeRoutingModule } from './order-grande/order-grande-routing.module';
import { OrdersListComponent } from './order-grande/orders-list/orders-list.component';
import { OrderDetailComponent } from './order-grande/order-detail/order-detail.component';
// import { BasketsComponent } from './order-grande/baskets/baskets.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {OrderGrandeModule} from './order-grande/order-grande.module';

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
    EmailFormComponent
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
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [],
        disallowedRoutes: []
      }
    }),
    CoopOrderModule,
    StoreModule,
    CategoryModule,
    BasketViewModule,
    AdminModule,
    ShopModule,
    UserPanelModule,
    PasswordResetModule,
    MatBadgeModule,
    MatOptionModule,
    MatDialogModule,
    MaterialModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    OrderGrandeModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    AppRoutingModule
  ],
  providers: [
    UnitsService,
    CookieService,
    CategoriesService,
    JwtParserService,
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
