import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoopOrderRoutingModule } from './coop-order-routing.module';
import { CoopOrdersComponent } from './coop-orders/coop-orders.component';
import {MaterialModule} from '../material/material.module';
import {NgReplacePipeModule} from 'angular-pipes';
import { CoopLastOrderComponent } from './coop-last-order/coop-last-order.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    CoopOrdersComponent,
    CoopLastOrderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgReplacePipeModule,
    CoopOrderRoutingModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class CoopOrderModule { }
