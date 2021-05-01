import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoopOrderRoutingModule } from './coop-order-routing.module';
import { CoopOrdersComponent } from './coop-orders/coop-orders.component';
import {MaterialModule} from '../material/material.module';
import {NgReplacePipeModule} from 'angular-pipes';
import {CoopLastOrderComponent} from './coop-last-order/coop-last-order.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CoopLastOrderDelDialogComponent } from './coop-last-order-del-dialog/coop-last-order-del-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    CoopOrdersComponent,
    CoopLastOrderComponent,
    CoopLastOrderDelDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgReplacePipeModule,
    CoopOrderRoutingModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule
  ]
})
export class CoopOrderModule { }
