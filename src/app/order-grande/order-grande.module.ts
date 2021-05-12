import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {OrdersListComponent} from './orders-list/orders-list.component';
import {OrderGrandeService} from './order-grande.service';
import {HttpClientModule} from '@angular/common/http';
import {OrderGrandeRoutingModule} from './order-grande-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {BasketsComponent} from './baskets/baskets.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';


@NgModule({
  declarations: [
    OrdersListComponent,
    BasketsComponent,
    OrderDetailComponent
  ],
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    OrderGrandeRoutingModule
  ],
  exports: [
    OrdersListComponent,
    OrderDetailComponent,
    BasketsComponent
  ],
  providers: [
  OrderGrandeService
  ]
})
export class OrderGrandeModule { }
